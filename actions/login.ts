"use server";
import { LoginSchema } from "@/schemas";
import * as z from "zod";

export const login = async (
  values: z.infer<typeof LoginSchema>,
): Promise<{ success: string; error: string }> => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fiels", success: "" };
  }

  return { success: "Email sent!", error: "" };
  // console.log({ values });
};
