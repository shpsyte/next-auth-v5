import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendTwoFactorEmail = async (email: string, token: string) => {
  // send email
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink =
    `http://localhost:3000/auth/new-verification?token=${token}`;

  console.log("Sending email to", confirmLink);

  return;

  await resend.emails.send({
    from: "onboarding@heapify.io",
    to: email,
    subject: "Please confirm your email",
    html: `
      <h1>Confirm your email</h1>
      <p>Click the link below to confirm your email:</p>
      <a href="${confirmLink}">Confirm email</a>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;

  console.log("Sending email to", confirmLink);

  return;

  await resend.emails.send({
    from: "onboarding@heapify.io",
    to: email,
    subject: "Please confirm your email",
    html: `
      <h1>Confirm your email</h1>
      <p>Click the link below to confirm your email:</p>
      <a href="${confirmLink}">Confirm email</a>
    `,
  });
};
