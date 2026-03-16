import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://cloud-sheet.vercel.app" ,
  basePath: "/api/auth",
  fetchOptions: {
    credentials: "include",
     headers: {
      "Accept": "application/json",
    },
  }
});