import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "./verifications-token";
import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "./password-reset-token";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  // 5 minutes expiration
  const expires = new Date(Date.now() + 5 * 60 * 1000);
  const existToken = await getPasswordResetTokenByEmail(email);

  if (existToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existToken.id,
      },
    });
  }

  const verificationToken = await db.passwordResetToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return verificationToken;
};
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  // 5 minutes expiration
  const expires = new Date(Date.now() + 5 * 60 * 1000);
  const existToken = await getVerificationTokenByEmail(email);

  if (existToken) {
    await db.verificationToken.delete({
      where: {
        id: existToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return verificationToken;
};
