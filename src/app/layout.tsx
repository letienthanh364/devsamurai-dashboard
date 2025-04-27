import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { LocalizationProvider } from "@/locales/localization-provider";
import AppStoreInitializer from "@/components/AppStoreInitializer";
import { ReactQueryClientProvider } from "@/utils/ReactQueryClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acme",
  description: "Acme demo for DevSamurai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px #23232c inset !important;
            -webkit-text-fill-color: #FAFAFA !important;
            transition: background-color 5000s ease-in-out 0s;
          }
        `}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#09090b] text-[#FAFAFA]`}
      >
        <ReactQueryClientProvider>
          <LocalizationProvider>
            <AppStoreInitializer />
            {children}
            <Toaster position="top-center" duration={2000} />
          </LocalizationProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
