"use client";

import CardWrapper from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
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
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaBackward } from "react-icons/fa";

type initialState = {
  error?: string | undefined;
  success?: string | undefined;
};

export default function LoginForm() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email Already exists!"
    : "";
  const [loginState, updateLoginState] = useState<
    initialState | null | undefined
  >();
  const [twoFactor, setTwoFactor] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "jose.iscosistemas@gmail.com",
      password: "123456",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values)
        .then((resp) => {
          if (resp) {
            const { error, success, twoFactor } = resp;

            if (error) {
              form.reset();
              updateLoginState((a) => ({ ...a, error, twoFactor }));
            }

            if (success) {
              form.reset();

              updateLoginState((a) => ({ ...a, success, twoFactor }));
            }

            if (twoFactor) {
              setTwoFactor(true);
            }
          }
        })
        .catch(() => {
          updateLoginState({
            error: "Something went wrong!",
            success: "",
          });
        });
    });
  };

  return (
    <>
      <CardWrapper
        headerLabel="Welcome back!"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {twoFactor && (
                <>
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-2 items-center justify-start">
                          <FormLabel>Tow factor code</FormLabel>
                          <FormMessage />
                        </div>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={isPending}
                            {...field}
                            placeholder="code"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    size="sm"
                    variant="link"
                    className="gap-2"
                    onClick={() => {
                      setTwoFactor(false);
                      updateLoginState({ error: "", success: "" });
                    }}
                  >
                    <span>{`<-- Back`}</span>
                  </Button>
                </>
              )}
              {!twoFactor && (
                <>
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
                        <Button
                          size="sm"
                          variant="link"
                          asChild
                          className="px-0 font-normal"
                        >
                          <Link href="/auth/reset">Forgot password?</Link>
                        </Button>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormError message={loginState?.error || urlError} />
            <FormSuccess message={loginState?.success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              {twoFactor ? "Verify" : "Login"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
}
