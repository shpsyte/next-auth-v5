import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "*",
  }),
  password: z.string().min(1, { message: "*" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "*",
  }),
  password: z.string().min(6, { message: "Minimum 6 character required" }),
  name: z.string().min(1, { message: "*" }),
});
