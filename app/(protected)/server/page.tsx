import UserInfo from "@/components/auth/user-info";
import { currentUser } from "@/lib/auth";
import React from "react";

export default async function ServerPage() {
  const user = await currentUser();
  return <UserInfo label="Server componente" user={user} />;
}
