import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // Add your authentication providers here
    // Example with GitHub:
    /*
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    */
    // Add more providers here
  ],
  callbacks: {
    async session({ session, user }) {
      // Add user ID to the session
      if (session.user) {
        session.user.id = user.id.toString();
      }
      return session;
    },
  },
  // Enable debug messages in development
  debug: process.env.NODE_ENV === 'development',
  // Use JWT for session management
  session: {
    strategy: "jwt" as const,
  },
  // Customize your pages
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
};
