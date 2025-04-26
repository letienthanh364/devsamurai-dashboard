// auth.service.ts

import authApi from "@/apis/auth.api";
import { COOKIE_NAMES } from "@/constants/cookies.const";
import mainPaths, { dashboardPaths } from "@/constants/path";
import { LoginSchema } from "@/rules/auth.rule";
import useAppStore from "@/stores/useAppStore";
import { removeCookie, setObjectCookie } from "@/utils/auth.util";
import httpInstance from "@/utils/axios.util";
import { useMutation } from "@tanstack/react-query";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const AUTH_KEY = "auth";

const useAuth = () => {
  const { setUser, setIsAuthenticated, user, isAuthenticated } = useAppStore();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: authApi.login,
  });

  const getProfileMutation = useMutation({
    mutationFn: authApi.getProfile,
  });

  const handleLogin = async (body: LoginSchema) => {
    try {
      // This function will be executed and its result will be returned
      const loginRes = await loginMutation.mutateAsync(body);
      const token = loginRes.data.data;

      if (!token) {
        throw new Error("Invalid login response");
      }

      // Set token in cookie
      setCookie(COOKIE_NAMES.ACCESS_TOKEN, token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      // Update httpInstance for the current session
      httpInstance.setAccessToken(token);

      try {
        const userRes = await getProfileMutation.mutateAsync();
        const user = userRes.data.data;

        // Store user in state
        setIsAuthenticated(true);
        setUser(user);

        // Store profile in cookie
        setObjectCookie("user_profile", user);

        // Redirect to dashboard or previous page
        const redirectUrl =
          new URL(window.location.href).searchParams.get("redirect") ||
          dashboardPaths.home;

        router.push(redirectUrl);

        return user; // Return the user object for the success message
      } catch (profileError) {
        throw profileError;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    // Remove cookies
    removeCookie("access_token");
    removeCookie("user_profile");

    // Reset HTTP instance
    httpInstance.setAccessToken(null);

    // Update authentication state
    setIsAuthenticated(false);
    setUser(null);

    // Notification
    toast.success("Logged out successfully");

    // Redirect to login page
    router.push(mainPaths.login);
  };

  const checkAuthStatus = () => {
    const token = getCookie("access_token");
    const userProfile = getCookie("user_profile");

    if (token && userProfile) {
      try {
        const user = JSON.parse(userProfile as string);
        setUser(user);
        setIsAuthenticated(true);
        httpInstance.setAccessToken(token as string);
        return true;
      } catch (e) {
        console.error("Failed to parse user profile from cookie", e);
      }
    }

    return false;
  };

  return {
    handleLogin,
    handleLogout,
    checkAuthStatus,
    user,
    isAuthenticated,
    isLoading: loginMutation.isPending || getProfileMutation.isPending,
  };
};

const useRegister = () => {
  return useMutation({ mutationFn: authApi.register });
};

const AuthServices = {
  querries: {},
  mutations: { useRegister },
  useAuth,
};

export default AuthServices;
