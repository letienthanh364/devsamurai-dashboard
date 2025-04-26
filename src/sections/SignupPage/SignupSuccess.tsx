import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import mainPaths from "@/constants/path";

interface SignupSuccessProps {
  email?: string;
  setNewEmail: (value: string | undefined) => void;
}

export default function SignupSuccess({
  email,
  setNewEmail,
}: SignupSuccessProps) {
  return (
    <div className="rounded-[14px] border bg-[#090901] text-[#fafafa] shadow flex flex-col items-center py-4 border-[#27272a]">
      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mb-4">
        <CheckCircle className="w-6 h-6 text-white" />
      </div>

      <h1 className="text-2xl font-bold mb-2">Registration Successful</h1>

      <p className="text-gray-400 text-center mb-6">
        {email ? (
          <>
            Congratulations{" "}
            <span className="text-blue-500 font-medium">{email}</span>! Your
            account has been created successfully.
          </>
        ) : (
          "Congratulations! Your account has been created successfully."
        )}
      </p>

      <Link href={mainPaths.login} passHref>
        <Button
          type="button"
          onClick={() => {
            setNewEmail(undefined);
          }}
          className="w-full bg-white text-black hover:bg-gray-200"
        >
          Go to Login
        </Button>
      </Link>

      <p className="text-gray-500 text-sm mt-6">
        Need help?{" "}
        <Link href="/contact" className="text-blue-500 hover:underline">
          Get in touch
        </Link>
      </p>
    </div>
  );
}
