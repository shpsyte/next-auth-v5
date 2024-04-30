"use server";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null,
) => {
  const validateFields = NewPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid password", success: "" };
  }

  if (!token) {
    return;
  }

  const { password } = validateFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token", success: "" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token expired", success: "" };
  }

  const user = await getUserByEmail(existingToken.email);

  if (!user) {
    return { error: "User not found", success: "" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password updated" };
};
