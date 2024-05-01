"use client";

import { signOut } from "next-auth/react";
import { PropsWithChildren } from "react";

type ButtonProps = {};

export default function LogoutButton({
  children,
}: PropsWithChildren<ButtonProps>) {
  const onClick = () => {
    signOut();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
