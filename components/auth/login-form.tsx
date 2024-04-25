"use client";

import CardWrapper from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
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

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    const { password, email } = values;
    console.log({ email, password });
  };

  return (
    <>
      <CardWrapper
        headerLabel="Welcome back!"
        backButtonLabel="Don't have an account?"
        backButtonHref="/atuh/register"
        showSocial
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
                        {...field}
                        placeholder="password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormError message="" />
            <FormSuccess message="" />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
}
