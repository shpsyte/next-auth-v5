"use client";

import CardWrapper from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas";
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
import { login } from "@/actions/login";
import Link from "next/link";
import { reset } from "@/actions/reset";

export default function ResetForm() {
  const [loginState, updateLoginState] = useState({
    error: "",
    success: "",
  });
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    startTransition(() => {
      reset(values).then((resp) => {
        if (resp) {
          const { error, success } = resp;
          updateLoginState((a) => ({
            ...a,
            error: error || "",
            success: success || "",
          }));
        }
      });
      // login(values).then((resp) => {
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
        headerLabel="Forgot your password?"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center justify-start">
                      <FormLabel>Email</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={isPending}
                        {...field}
                        placeholder="john@example.com"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={loginState?.error} />
            <FormSuccess message={loginState.success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Send reset email
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
}
