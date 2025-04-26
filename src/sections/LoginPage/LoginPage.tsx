"use client";

import Link from "next/link";
import React from "react";
import { Controller } from "react-hook-form";
import { useLoginPage } from "./useLoginPage.hook";
import { Button } from "@/components/ui/button";
import mainPaths from "@/constants/path";
import { Input } from "@/components/ui/input";
import { LockIcon, MailIcon } from "lucide-react";

export default function LoginPage() {
  const {
    onSubmit,
    toggleShowingPassword,
    showingPassword,
    error,
    formMethods,
    loggingIn,
  } = useLoginPage();

  const { control } = formMethods;

  return (
    <div className="py-8 bg-black">
      <div className="flex flex-col items-center justify-center p-2">
        <div className="mx-auto w-full bg-black min-w-[360px] space-y-6 max-w-md justify-center flex flex-col">
          <Link href="#">
            <div className="flex items-center space-x-2 justify-center">
              <div className="flex size-9 items-center justify-center p-1">
                <div className="flex size-7 items-center justify-center rounded-md border text-primary">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="M7.81815 8.36373L12 0L24 24H15.2809L7.81815 8.36373Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M4.32142 15.3572L8.44635 24H-1.14809e-06L4.32142 15.3572Z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
              <span className="font-bold">DevSamurai</span>
            </div>
          </Link>
          <div className="rounded-xl border text-card-foreground shadow text-left max-w-[382px] self-center">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-xl font-semibold leading-none tracking-tight">
                Log in
              </h3>
              <p className="text-sm text-muted-foreground">
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
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          <MailIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          type="email"
                          className="pl-10 bg-transparent border-gray-700 text-white w-full rounded-md"
                          {...field}
                        />
                      </div>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          <LockIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          type="password"
                          className="pl-10 bg-transparent border-gray-700 text-white w-full rounded-md"
                          {...field}
                        />
                      </div>
                    );
                  }}
                />
                {error && (
                  <div
                    role="alert"
                    className="relative w-full rounded-lg border p-4 text-foreground bg-error-bg"
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
                      <div className="text-sm [&amp;_p]:leading-relaxed">
                        {error}
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  className="inline-flex !normal-case items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 !bg-primary !text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
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
              <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                Or continue with
              </p>
              <div className="flex flex-row gap-4">
                <Button
                  className="justify-center shadow rounded-md !text-foreground !normal-case text-sm font-medium !border-border-primary h-9 px-4 py-2 flex w-full flex-row items-center gap-2"
                  type="button"
                  disabled={loggingIn}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"
                    ></path>
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53"
                    ></path>
                    <path fill="none" d="M1 1h22v22H1z"></path>
                  </svg>
                  Google
                </Button>
                <Button
                  className="justify-center rounded-md !text-foreground shadow !normal-case text-sm font-medium !border-border-primary h-9 px-4 py-2 flex w-full flex-row items-center gap-2"
                  type="button"
                  disabled={loggingIn}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 21 21"
                  >
                    <path fill="#f25022" d="M1 1h9v9H1z"></path>
                    <path fill="#00a4ef" d="M1 11h9v9H1z"></path>
                    <path fill="#7fba00" d="M11 1h9v9h-9z"></path>
                    <path fill="#ffb900" d="M11 11h9v9h-9z"></path>
                  </svg>
                  Microsoft
                </Button>
              </div>
            </div>
            <div className="items-center p-6 pt-0 flex justify-center gap-1 text-sm text-muted-foreground">
              <span>Don&apos;t have an account?</span>
              <Link
                className="text-foreground underline"
                href={mainPaths.signup}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
