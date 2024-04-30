"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verifications-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const _token = await getVerificationTokenByToken(token);
  if (!_token) {
    return null;
  }

  const hasExpired = new Date(_token.expires) < new Date();
  if (hasExpired) {
    return {
      error: "Token has expired",
    };
  }

  const user = await getUserByEmail(_token.email);

  if (!user) {
    return {
      error: "User not found",
    };
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      email: _token.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: _token.id },
  });

  return {
    sucess: "Email verified",
  };
};
