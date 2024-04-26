"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
): Promise<{ success?: string; error?: string }> => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fiels" };
  }

  const { password, name, email } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // check if the email already exists
  const user = await getUserByEmail(email);

  if (user) {
    return { error: "Email already exists" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send verification token email

  return { success: "Email sent!" };
  // console.log({ values });
};
