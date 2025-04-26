"use client";

import { Input } from "@/components/ui/input";
import { useBoolean } from "@/hooks/useBoolean.hook";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import React, { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";

interface ControlledInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  fieldName: string;
  labelName: string;
  isPassword?: boolean;
  iconLabel?: ReactNode;
  type?: React.HTMLInputTypeAttribute;
}

export default function ControlledInput({
  control,
  fieldName,
  labelName,
  isPassword,
  iconLabel,
  type,
}: ControlledInputProps) {
  const { value: showingPassword, onToggle: toggleShowingPassword } =
    useBoolean();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message;
        return (
          <div className="flex flex-col space-y-2">
            <div className="w-full flex items-center gap-2">
              <Label htmlFor={fieldName}>{labelName}</Label>
              <p className="min-h-1.5 text-xs text-red-600">{errorMessage}</p>
            </div>
            <div className="relative w-full">
              {iconLabel && (
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  {iconLabel}
                </div>
              )}
              <Input
                type={
                  isPassword ? (showingPassword ? "text" : "password") : type
                }
                className={cn(
                  "bg-transparent border-gray-700 text-white w-full rounded-md",
                  {
                    "pr-10": isPassword,
                    "pl-10": Boolean(iconLabel),
                    "!border-red-500": errorMessage,
                  }
                )}
                {...field}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={toggleShowingPassword}
                  className="absolute inset-y-0.5 hover:bg-white/10 w-8 rounded-md justify-center right-0 flex items-center cursor-pointer"
                >
                  {!showingPassword ? (
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
                      className="lucide lucide-eye size-4 shrink-0"
                    >
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
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
                      className="lucide lucide-eye-off size-4 shrink-0"
                    >
                      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path>
                      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"></path>
                      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"></path>
                      <path d="m2 2 20 20"></path>
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}
