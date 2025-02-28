import axios from "axios";
import { useAuthentication } from "./stores/authentication-store";
import { refreshToken } from "./clients/token-client";

export const BASE_URL = "http://localhost:8080";

export const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.request.use(
  (request) => {
    const authentication = useAuthentication.getState().authentication;
    console.log("Current Auth State:", authentication);

    if (authentication && typeof request.url === "string") {
      if (!request.url.includes("/anonymous/signup/otp-verification"))
        request.headers["Authorization"] = authentication.accessToken;
    }
    console.log(request.url);

    return request;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { authentication, setAuthentication } = useAuthentication.getState();

    if (error.response.status == 410 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("hello");

      if (authentication) {
        try {
          console.log("Refreshing token...");

          const response = await refreshToken({
            refreshToken: authentication?.refreshToken,
          });
          console.log("New token received:", response.accessToken);

          setAuthentication(response);
          client.defaults.headers.common["Authorization"] =
            response.accessToken;

          return client(originalRequest);
        } catch (e) {
          setAuthentication(undefined);
          window.location.href = "/anonymous/signin";
        }
      }
    }

    if (error.response.status == 401) {
      setAuthentication(undefined);
      window.location.href = "/anonymous/signin";
      return;
    }

    return Promise.reject(error);
  }
);
