import { Button } from "@/components/ui/button";
import mainPaths, { dashboardPaths } from "@/constants/path";
import { ArrowRight, LayoutDashboard, LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <div className="max-w-3xl w-full space-y-12">
        {/* Header */}
        <header className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Welcome to Our Platform
          </h1>
          <p className="text-xl text-slate-300">
            Get started by logging in or accessing your dashboard
          </p>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dashboard Card */}
          <div className="group relative rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 text-blue-300">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Dashboard</h2>
                <p className="text-slate-300">
                  View your analytics and manage content
                </p>
              </div>
            </div>
            <Link
              href={dashboardPaths.home}
              className="absolute inset-0 rounded-lg"
              aria-label="Go to Dashboard"
            >
              <span className="sr-only">Go to Dashboard</span>
            </Link>
            <div className="mt-4 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 group-hover:bg-blue-900 group-hover:text-blue-200"
              >
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Login Card */}
          <div className="group relative rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-900 text-green-300">
                <LogIn className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Login</h2>
                <p className="text-slate-300">
                  Access your account and preferences
                </p>
              </div>
            </div>
            <Link
              href={mainPaths.login}
              className="absolute inset-0 rounded-lg"
              aria-label="Go to Login"
            >
              <span className="sr-only">Go to Login</span>
            </Link>
            <div className="mt-4 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 group-hover:bg-green-900 group-hover:text-green-200"
              >
                Go to Login <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
