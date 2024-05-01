"use client";

import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";
import { useTransition } from "react";

export default function SettingPage() {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  function generateRandomName() {
    const firstNames = ["John", "Jane", "Alice", "Bob"];
    const lastNames = ["Doe", "Smith", "Johnson", "Brown"];
    const randomFirstName =
      firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName =
      lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirstName} ${randomLastName}`;
  }

  const onClick = () => {
    startTransition(() => {
      settings({
        name: generateRandomName(),
      }).then(() => {
        update();
      });
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold ">Settings</p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onClick}>
          Update name {user?.name}
        </Button>
      </CardContent>
    </Card>
  );
}
