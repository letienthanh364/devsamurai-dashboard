import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "../../rules/auth.rule";
import { useForm } from "react-hook-form";
import { get } from "lodash";

import { useState } from "react";
import AuthServices from "@/services/auth.service";
import { toast } from "sonner";

const useSignupPage = () => {
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState<string>();
  const [newEmail, setNewEmail] = useState<string | undefined>(undefined);

  const formMethods = useForm<RegisterSchema>({
    defaultValues: {
      password: "",
      email: "",
      name: "",
    },
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });
  const { handleSubmit } = formMethods;

  //! Handle register
  const registerAccountMutation = AuthServices.mutations.useRegister();

  const onSubmit = handleSubmit(async (data) => {
    setRegistering(true);
    toast.promise(
      registerAccountMutation.mutateAsync(data, {
        onSuccess: (res) => {
          setNewEmail(res.data.data.email);
          console.log(res.data.data);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError(error: any) {
          setError(error.response.data.message);
        },
        onSettled() {
          setRegistering(false);
        },
      }),
      {
        loading: "Registering account",
        success: "Registered account successfully",
        error: (err) => get(err, "message", "Failed to registere account"),
      }
    );
  });

  return {
    onSubmit,
    registering,
    newEmail,
    formMethods,
    error,
    setNewEmail,
  };
};

export default useSignupPage;
