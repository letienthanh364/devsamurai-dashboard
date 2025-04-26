// axios.util.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie } from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

class HttpClient {
  private instance: AxiosInstance;
  private accessToken: string | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Initialize token from cookies if available
    if (typeof window !== "undefined") {
      const token = getCookie("access_token");
      if (token) {
        this.accessToken = token as string;
      }
    }

    // Request interceptor for adding auth token
    this.instance.interceptors.request.use(
      (config) => {
        // First try to use the instance token
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        } else {
          // Fallback to cookie (useful after page refresh)
          const token = getCookie("access_token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for handling errors
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
          // You could implement refresh token logic here
          // For now, we'll just reject with the error

          // If running on client side, we might want to redirect to login
          if (typeof window !== "undefined") {
            // You could handle redirection here or through a centralized error handler
          }
        }

        return Promise.reject(error);
      }
    );
  }

  setAccessToken(token: string | null): void {
    this.accessToken = token;
  }

  get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }

  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }
}

const httpInstance = new HttpClient();
export default httpInstance;
