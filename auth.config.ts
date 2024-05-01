import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import bcrypt from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./data/user";
import { db } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export default {
  // adapter: PrismaAdapter(db),
  providers: [
    // Resend,
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) {
        const validateFiels = LoginSchema.safeParse(credentials);

        if (validateFiels.success) {
          const { email, password } = validateFiels.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }

          const pwdmatch = await bcrypt.compare(password, user.password);

          if (pwdmatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
