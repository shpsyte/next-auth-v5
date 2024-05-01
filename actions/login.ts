"use server";
import { signIn } from "@/auth";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/data/tokens";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmations";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/email";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import error from "next/error";
import * as z from "zod";

type loginResponse = {
  success?: string | undefined;
  error?: string | undefined;
  twoFactor?: boolean;
};

export const login = async (
  values: z.infer<typeof LoginSchema>,
): Promise<loginResponse | undefined> => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fiels", success: "" };
  }

  const { email, password, code } = validateFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid Credentials", success: "" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );
    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: "Invalid code", success: "", twoFactor: true };
      }

      const expired = new Date(twoFactorToken.expires) < new Date();
      if (expired) {
        return { error: "Code expired", success: "", twoFactor: true };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingCOnfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingCOnfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingCOnfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/settings",
    });
  } catch (error) {
    console.log({ error });
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Invalid Credentials", success: "" };
        }
        default: {
          return { error: "Something went wrong", success: "" };
        }
      }
    }

    throw error;
  }
};
