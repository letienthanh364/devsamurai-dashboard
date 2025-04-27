"use client";

import { useEffect } from "react";
import useAppStore from "@/stores/useAppStore";
import { getObjectCookie } from "@/utils/auth.util";
import { getCookie } from "cookies-next";
import { User } from "@/types/user/user.type";

export default function AppStoreInitializer() {
  const { setUser, setIsAuthenticated, isInitialized, setInitialized } =
    useAppStore();

  useEffect(() => {
    // Only run this once
    if (isInitialized) return;

    // This code only runs on the client
    const userProfileCookie = getObjectCookie("user_profile");
    const accessToken = getCookie("access_token");

    if (userProfileCookie) {
      setUser(userProfileCookie as User);
    }

    setIsAuthenticated(!!accessToken);
    setInitialized(true);
  }, [setUser, setIsAuthenticated, isInitialized, setInitialized]);

  return null; // This component doesn't render anything
}
