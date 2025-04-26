import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="py-8 w-full">
      <div className="w-full flex flex-col items-center justify-center p-2">
        {children}
      </div>
    </div>
  );
}
