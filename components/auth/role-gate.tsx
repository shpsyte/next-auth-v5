import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import React, { PropsWithChildren } from "react";
import FormError from "../form-error";

type PropsRoleGate = {
  allowedRole: UserRole;
};

export default function RoleGate({
  children,
  allowedRole,
}: PropsWithChildren<PropsRoleGate>) {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <div>
        <FormError message="You don't have permission to see this data" />
      </div>
    );
  }
  return <>{children}</>;
}
