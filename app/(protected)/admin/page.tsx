"use client";
import { admin } from "@/actions/admin";
import RoleGate from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import React from "react";
import { toast } from "sonner";

export default function AdminPage() {
  const role = useCurrentRole();

  const onApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Success");
      } else {
        toast.error("Failed");
      }
    });
  };

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data?.error) {
        toast.error(data.error);
      }

      if (data?.succes) {
        toast.success(data.succes);
      }
    });
  };

  return (
    <>
      <Card className="w-[600px]">
        <CardHeader>
          <p className="text-2xl font-semibold">Admin</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <RoleGate allowedRole="ADMIN">
            <FormSuccess message="your are allowed" />
          </RoleGate>
          <div className="flex items-center justify-between rounded-lg p-3 shadow-md">
            <p className="text-sm font-medium">Admin-only API route</p>
            <Button onClick={onApiRouteClick}>Click to test</Button>
          </div>
          <div className="flex items-center justify-between rounded-lg p-3 shadow-md">
            <p className="text-sm font-medium">Admin-only Server Action</p>
            <Button onClick={onServerActionClick}>Click to test</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
