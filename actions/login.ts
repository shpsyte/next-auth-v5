"use server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import error from "next/error";
import * as z from "zod";

type loginResponse = {
  success?: string | undefined;
  error?: string | undefined;
};

export const login = async (
  values: z.infer<typeof LoginSchema>,
): Promise<loginResponse | undefined> => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fiels", success: "" };
  }

  const { email, password } = validateFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
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
