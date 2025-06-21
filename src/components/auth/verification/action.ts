"use server";

import { db } from "@/lib/db";
import { getVerificationTokenByToken } from "./verificiation-token";
import { getUserByEmail } from "../user";


export const newVerification = async (token: string) => {
  console.log("New verification initiated. Token received:", token);

  const existingToken = await getVerificationTokenByToken(token);
  console.log("Token from database:", existingToken);

  if (!existingToken) {
    const existingUser = await getUserByEmail(token);
    if (existingUser && existingUser.emailVerified) {
      return { success: "Email already verified!" };
    } else {
      console.error("Token does not exist in the database.");
      return { error: "Token does not exist!" };
    }
  }

  console.log("Token exists in the database. Token identifier:", existingToken.identifier);
  console.log("Token exists in the database. Token value:", existingToken.token);
  console.log("Token exists in the database. Token expiration:", existingToken.expires);

  const hasExpired = new Date(existingToken.expires) < new Date();
  console.log("Token expiration status:", hasExpired);

  if (hasExpired) {
    console.error("Token has expired.");
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.identifier);
  console.log("User associated with the token:", existingUser);

  if (!existingUser) {
    console.error("Email associated with the token does not exist.");
    return { error: "Email does not exist!" };
  }

  if (existingUser.emailVerified) {
    return { success: "Email verified!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.identifier,
    }
  });
  console.log("User email verified and updated successfully.");

  setTimeout(async () => {
    await db.verificationToken.delete({
      where: { 
        identifier_token: {
          identifier: existingToken.identifier,
          token: existingToken.token
        }
      }
    });
    console.log("Verification token deleted successfully.");
  }, 9000);
  console.log("Verification token deleted successfully.");

  return { success: "Email verified!" };
};