import { FcGoogle } from "react-icons/fc";
import { FaCode, FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Link from "next/link";

export default function Social() {
  const onClick = (provider: "google" | "github" | "resend") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <>
      <div className="flex items-center w-full gap-x-2">
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={() => onClick("google")}
        >
          <FcGoogle className="w-5 h-5" />
        </Button>
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={() => onClick("github")}
        >
          <FaGithub className="w-5 h-5" />
        </Button>
        <Button size="lg" className="w-full" variant="outline">
          <Link href="/auth/sso-login">
            <FaCode className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </>
  );
}
