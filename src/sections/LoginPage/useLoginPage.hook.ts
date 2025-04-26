import mainPaths from "@/constants/path";
import { useBoolean } from "@/hooks/useBoolean.hook";
import { loginSchema, LoginSchema } from "@/rules/auth.rule";
import AuthServices from "@/services/auth.service";
import { ErrorRespone } from "@/types/_commons/response.type";
import { isAxiosBadRequestError } from "@/utils/error.util";
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
    } catch (error) {
      if (isAxiosBadRequestError<ErrorRespone>(error)) {
        const formError = error.response?.data;
        if (formError) {
          setError("Email or password is not correct");
        }
      } else {
        setError("Email or password is not correct");
      }
    } finally {
      setLoggingIn(false);
    }
  });

  const { value: showingPassword, onToggle: toggleShowingPassword } =
    useBoolean();

  return {
    formMethods,
    error,
    onSubmit,
    showingPassword,
    toggleShowingPassword,
    loggingIn,
  };
};
