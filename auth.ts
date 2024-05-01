import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { JWT } from "next-auth/jwt"; // eslint-disable-line
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmations";

declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "USER";
      isTwoFactorEnabled: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role: "ADMIN" | "USER";
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // allow oauth withiouf email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      // prevent login if email is not verified
      if (user.id) {
        const existingUser = await getUserById(user.id);
        if (!existingUser || !existingUser.emailVerified) {
          return false;
        }

        if (existingUser.isTwoFactorEnabled) {
          const towFactorConfirmation = await getTwoFactorConfirmationByUserId(
            existingUser.id,
          );

          if (!towFactorConfirmation) {
            return false;
          }

          // Delete tow factor confirmation after login
          await db.twoFactorConfirmation.delete({
            where: {
              id: towFactorConfirmation.id,
            },
          });
        }
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (token.isTwoFactorEnabled && session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        if (token.email) {
          session.user.email = token.email;
        }
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await getUserById(token.sub);
      if (!user) return token;
      if (user.role) {
        token.role = user.role;
      }
      token.isTwoFactorEnabled = user.isTwoFactorEnabled;
      token.name = user.name;
      token.email = user.email;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
