"use client";

import Link from "next/link";
import React from "react";
import { useLoginPage } from "./useLoginPage.hook";
import { Button } from "@/components/ui/button";
import mainPaths from "@/constants/path";
import AuthGoogleButton from "../AuthPages/_components/AuthGoogleButton";
import AuthMicrosoftButton from "../AuthPages/_components/AuthMicrosoftButton";
import AuthFormHeader from "../AuthPages/_components/AuthFormHeader";
import ControlledInput from "@/components/inputs/ControlledInput";

export default function LoginPage() {
  const {
    onSubmit,

    error,
    formMethods,
    loggingIn,
  } = useLoginPage();

  const { control } = formMethods;

  return (
    <div className="mx-auto font-[Inter] text-utility-blue-light-600 w-full min-w-[360px] space-y-6 max-w-sm justify-center flex flex-col">
      <AuthFormHeader />
      <div className="rounded-[14px] border border-[#27272a] shadow text-left max-w-[382px] self-center">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-xl font-semibold ">Log in</h3>
          <p className="text-sm text-[#a1a1aa]">
            Enter your details below to sign into your account.
          </p>
        </div>
        <div className="p-6 pt-0 flex flex-col gap-4">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e);
            }}
            method="post"
          >
            <ControlledInput
              control={control}
              fieldName="email"
              labelName="Email"
              iconLabel={
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
                  className="lucide lucide-mail size-4 shrink-0"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              }
            />
            <ControlledInput
              control={control}
              fieldName="password"
              labelName="Password"
              iconLabel={
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
                  className="lucide lucide-lock size-4 shrink-0"
                >
                  <rect
                    width="18"
                    height="11"
                    x="3"
                    y="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              }
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

            <Button
              className="inline-flex !normal-case items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 bg-white text-black hover:bg-white/90 shadow h-9 px-4 py-2 w-full"
              type="submit"
              disabled={loggingIn}
            >
              {loggingIn && (
                <svg
                  aria-hidden="true"
                  className="mr-2 h-4 w-4 animate-spin fill-white text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
              Log in
            </Button>
          </form>
          <p className="flex items-center gap-x-3 text-sm text-[#a1a1a1] before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
            Or continue with
          </p>
          <div className="flex gap-4">
            <AuthGoogleButton loading={loggingIn} />
            <AuthMicrosoftButton loading={loggingIn} />
          </div>
        </div>
        <div className="items-center p-6 pt-0 flex justify-center gap-1 text-sm text-[#a1a1a1]">
          <span>Don&apos;t have an account?</span>
          <Link className="text-white underline" href={mainPaths.signup}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
