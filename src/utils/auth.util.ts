// auth.util.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const AUTH_COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const, // Changed from "strict" to "lax" for better compatibility
};

// Utility function to set an object in cookies
export const setObjectCookie = (
  key: string,
  value: any,
  options = AUTH_COOKIE_OPTIONS
) => {
  setCookie(key, JSON.stringify(value), options);
};

// Utility function to get an object from cookies
export const getObjectCookie = (key: string) => {
  const value = getCookie(key);
  if (!value) return null;

  try {
    return JSON.parse(value as string);
  } catch (error) {
    console.error(`Failed to parse cookie ${key}:`, error);
    return null;
  }
};

// Utility function to remove a cookie
export const removeCookie = (key: string) => {
  deleteCookie(key, { path: "/" }); // Ensure the cookie is removed with the same path
};
