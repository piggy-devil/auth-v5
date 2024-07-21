import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./actions/users/user";
import { AUTH_ERROR_URL, LOGIN_URL } from "./lib/config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: `${LOGIN_URL}`,
    error: `${AUTH_ERROR_URL}`,
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token; // Not Login

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token; // No User

      token.role = existingUser.role;

      return token;
    },
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }

        if (token.role) {
          session.user.role = token.role;
        }
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
