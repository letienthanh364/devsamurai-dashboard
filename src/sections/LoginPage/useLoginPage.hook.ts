import mainPaths from "@/constants/path";
import { loginSchema, LoginSchema } from "@/rules/auth.rule";
import AuthServices from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useLoginPage = () => {
  const router = useRouter();

  const [loggingIn, setLoggingIn] = useState(false);

  const formMethods = useForm<LoginSchema>({
    defaultValues: {
      password: "",
      email: "",
    },
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });
  const { handleSubmit } = formMethods;

  const [error, setError] = useState<string | null>(null);

  const { handleLogin } = AuthServices.useAuth();

  const onSubmit = handleSubmit(async (data) => {
    setLoggingIn(true);
    try {
      await handleLogin(data);
      router.push(mainPaths.home);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.data.message === "Invalid credentials") {
        setError("Email or password is not correct");
      }
    } finally {
      setLoggingIn(false);
    }
  });

  return {
    formMethods,
    error,
    onSubmit,
    loggingIn,
  };
};
