import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
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
      },
    }),
  ],
} satisfies NextAuthConfig;
