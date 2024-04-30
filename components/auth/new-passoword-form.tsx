"use client";

import CardWrapper from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import { useState, useTransition } from "react";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loginState, updateLoginState] = useState({
    error: "",
    success: "",
  });
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    startTransition(() => {
      newPassword(values, token).then((resp) => {
        if (resp) {
          const { error, success } = resp;
          updateLoginState((a) => ({
            ...a,
            error: error || "",
            success: success || "",
          }));
        }
      });
      // reset(values).then((resp) => {
      //   if (resp) {
      //     const { error, success } = resp;
      //     updateLoginState((a) => ({
      //       ...a,
      //       error: error || "",
      //       success: success || "",
      //     }));
      //   }
      // });
    });
  };

  return (
    <>
      <CardWrapper
        headerLabel="Enter a new password"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center justify-start">
                      <FormLabel>Password</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isPending}
                        {...field}
                        placeholder="******"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={loginState?.error} />
            <FormSuccess message={loginState.success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Reset Password
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
}
