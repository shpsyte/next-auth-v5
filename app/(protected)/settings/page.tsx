"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function SettingPage() {
  const user = useCurrentUser();

  // const handleClick = async () => {
  //   signOut();
  // };

  return;
}
