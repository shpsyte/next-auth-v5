import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function SettingPage() {
  const session = await auth();
  return (
    <div>
      <span>My protected page</span>
      <p>{JSON.stringify(session)}</p>

      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button variant="destructive" type="submit">
          Sign out
        </Button>
      </form>
    </div>
  );
}
