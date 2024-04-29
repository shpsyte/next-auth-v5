import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default async function SettingPage() {
  const session = await auth();

  return (
    <div>
      <span>My protected page</span>
      <p>{JSON.stringify(session)}</p>

      <form
        action={async () => {
          "use server";

          await signOut({ redirectTo: DEFAULT_LOGIN_REDIRECT, redirect: true });
        }}
      >
        <Button variant="destructive" type="submit">
          Sign out
        </Button>
      </form>
    </div>
  );
}
