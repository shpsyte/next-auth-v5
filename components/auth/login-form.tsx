import CardWrapper from "@/components/auth/card-wrapper";

export default function LoginForm() {
  return (
    <>
      <CardWrapper
        headerLabel="Welcome back!"
        backButtonLabel="Don't have an account?"
        backButtonHref="/atuh/register"
        showSocial
      >
        Login Form
      </CardWrapper>
    </>
  );
}
