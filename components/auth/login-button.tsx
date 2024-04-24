"use client";

import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

type LoginButtonProps = {
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: PropsWithChildren<LoginButtonProps>) {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
