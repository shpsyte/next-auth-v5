"use client";
import { useCurrentRole } from "@/hooks/use-current-role";
import React from "react";

export default function AdminPage() {
  const role = useCurrentRole();
  return (
    <>
      <div>Thios ios the admihn</div>
      <p>User is:: {role}</p>
    </>
  );
}
