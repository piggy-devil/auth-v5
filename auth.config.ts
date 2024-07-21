import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./actions/users/user";
import { GOOGLE_ID, GOOGLE_SECRET } from "./lib/config";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
