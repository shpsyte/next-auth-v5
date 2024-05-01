import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "*",
  }),
  password: z.string().min(1, { message: "*" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "*",
  }),
  password: z.string().min(6, { message: "Minimum 6 character required" }),
  name: z.string().min(1, { message: "*" }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "*",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 character required" }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string().min(1, { message: "*" })),
    isToEnableTwoFactor: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email({ message: "*" })),
    password: z.optional(
      z.string().min(6, { message: "Minimum 6 character required" }),
    ),
    newPassword: z.optional(
      z.string().min(6, { message: "Minimum 6 character required" }),
    ),
  })
  .refine((data) => {
    if (data.password && data.newPassword) {
      return data.password !== data.newPassword;
    }
    return true;
  });
