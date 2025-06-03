import NextAuth from "next-auth"
 import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByCredentials } from "./lib/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [   CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      authorize: async (credentials: {
        email?: unknown;
        password?: unknown;
      }) => {
        const email = typeof credentials?.email === "string" ? credentials.email : "";
        const password = typeof credentials?.password === "string" ? credentials.password : "";

        const user = await findUserByCredentials(email, password);

        if (user) {
          return {
            id: user.id?.toString() || "",
            name: user.name || null,
            email: user.email || "",
            createdAt: null, // Explicitly set as null to match the expected type
          };
        }

        return null; // Return null if user not found
      },
    }),

],
})