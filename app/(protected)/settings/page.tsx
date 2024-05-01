"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function SettingPage() {
  const user = useCurrentUser();

  const handleClick = async () => {
    signOut();
  };

  return (
    <div>
      <span className="font-bold">My protected page</span>
      <p>teste</p>
      <Image width={120} height={120} src={user?.image} alt="User Avatar" />
      <p className="min-h-40">{JSON.stringify(user, null, 2)}</p>

      {/* <form */}
      {/*   action={async () => { */}
      {/*     "use server"; */}
      {/*     await signOut({ */}
      {/*       redirectTo: "/auth/login", */}
      {/*     }); */}
      {/*   }} */}
      {/* > */}
      <div className="bg-white p-10 rounded-xl ">
        <Button variant="destructive" type="submit" onClick={handleClick}>
          Sign out
        </Button>
      </div>
      {/* </form> */}
    </div>
  );
}
