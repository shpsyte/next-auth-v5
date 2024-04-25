"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";

export default function RegisterForm() {
  const [loginState, updateLoginState] = useState({
    error: "",
    success: "",
  });
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values).then(({ error, success }) => {
        updateLoginState((a) => ({ ...a, error, success }));
      });
    });
  };

  return (
    <>
      <CardWrapper
        headerLabel="Creat an account"
        backButtonLabel="Already have account"
        backButtonHref="/auth/login"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center justify-start">
                      <FormLabel>Name</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        type="string"
                        disabled={isPending}
                        {...field}
                        placeholder="name"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

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
                        placeholder="password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={loginState.error} />
            <FormSuccess message={loginState.success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Register
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
}
