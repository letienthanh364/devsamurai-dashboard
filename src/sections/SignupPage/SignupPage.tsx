"use client";

import useSignupPage from "./useSignupPage.hook";
import Link from "next/link";
import AuthFormHeader from "../AuthPages/_components/AuthFormHeader";
import ControlledInput from "@/components/inputs/ControlledInput";
import { Button } from "@/components/ui/button";
import LoadingCircle from "@/components/animations/LoadingCircle";
import AuthGoogleButton from "../AuthPages/_components/AuthGoogleButton";
import AuthMicrosoftButton from "../AuthPages/_components/AuthMicrosoftButton";
import { DotIcon } from "lucide-react";
import SignupSuccess from "./SignupSuccess";

export default function SignupPage() {
  const { formMethods, onSubmit, registering, newEmail, error, setNewEmail } =
    useSignupPage();

  const { control } = formMethods;

  return (
    <div className="mx-auto font-[Inter] text-utility-blue-light-600 w-full min-w-[360px] space-y-4 max-w-md justify-center flex flex-col">
      <AuthFormHeader />
      {newEmail ? (
        <SignupSuccess email={newEmail} setNewEmail={setNewEmail} />
      ) : (
        <div className="rounded-[14px] border bg-[#090901] text-[#fafafa] shadow text-left border-[#27272a]">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-xl font-semibold leading-none tracking-tight">
              Sign up
            </h3>
            <p className="text-sm text-[#a1a1aa]">
              Already have an account?{" "}
              <a className="text-[#fafafa] underline" href="/auth/login">
                Log in
              </a>
            </p>
          </div>
          <div className="p-6 pt-0 flex flex-col gap-4">
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e);
              }}
            >
              <ControlledInput
                control={control}
                fieldName="name"
                labelName="Name"
              />
              <ControlledInput
                control={control}
                fieldName="email"
                labelName="Email"
              />
              <ControlledInput
                control={control}
                fieldName="password"
                labelName="Password"
                isPassword
              />

              {error && (
                <div
                  role="alert"
                  className="relative w-full rounded-lg border p-4 text-[#fafafa] bg-[#7f1d1d1a]"
                >
                  <div className="flex flex-row items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-alert size-[18px] shrink-0"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" x2="12" y1="8" y2="12"></line>
                      <line x1="12" x2="12.01" y1="16" y2="16"></line>
                    </svg>
                    <div className="text-sm ">{error}</div>
                  </div>
                </div>
              )}

              <ul className="list-none space-y-1">
                <li className="flex flex-row items-center px-2 text-[#a1a1aa]">
                  <DotIcon />
                  <p className="text-sm">
                    Mix of uppercase &amp; lowercase letters
                  </p>
                </li>
                <li className="flex flex-row items-center px-2 text-[#a1a1aa]">
                  <DotIcon />

                  <p className="text-sm">Minimum 8 characters long</p>
                </li>
                <li className="flex flex-row items-center px-2 text-[#a1a1aa]">
                  <DotIcon />
                  <p className="text-sm">Contain at least 1 number</p>
                </li>
              </ul>

              <Button
                className="inline-flex !normal-case items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 bg-white text-black hover:bg-white/90 shadow h-9 px-4 py-2 w-full"
                type="submit"
                disabled={registering}
              >
                {registering && <LoadingCircle />}
                Create account
              </Button>
            </form>
            <p className="flex items-center gap-x-3 text-sm text-[#a1a1aa] before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
              Or continue with
            </p>
            <div className="flex flex-row gap-4">
              <AuthGoogleButton loading={registering} />
              <AuthMicrosoftButton loading={registering} />
            </div>
          </div>
          <div className="items-center p-6 inline-block rounded-b-[14px] bg-[#27272a] pt-6 text-xs text-[#a1a1aa]">
            By signing up, you agree to our{" "}
            <Link className="text-[#fafafa] underline" href="/terms-of-use">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link className="text-[#fafafa] underline" href="/privacy-policy">
              Privacy Policy
            </Link>
            . Need help?{" "}
            <Link className="text-[#fafafa] underline" href="/contact">
              Get in touch
            </Link>
            .
          </div>
        </div>
      )}
    </div>
  );
}
