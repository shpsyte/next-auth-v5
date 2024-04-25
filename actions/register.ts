"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
): Promise<{ success: string; error: string }> => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fiels", success: "" };
  }

  return { success: "Email sent!", error: "" };
  // console.log({ values });
};
