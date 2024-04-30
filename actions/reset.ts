"use server";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { ResetSchema } from "@/schemas";
import { sendPasswordResetEmail } from "@/lib/email";
import { generatePasswordResetToken } from "@/data/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid email", success: "" };
  }

  const { email } = validateFields.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "Verify that email", success: "" };
  }

  const passwordToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(passwordToken.email, passwordToken.token);

  return {
    success: "Check your email for the reset link",
  };
};
