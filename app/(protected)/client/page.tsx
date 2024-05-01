"use client";

import UserInfo from "@/components/auth/user-info";

import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";

export default function ServerPage() {
  const user = useCurrentUser();
  return <UserInfo label="Client componente" user={user} />;
}
