"use server";

import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const session = await auth();
  const role = session?.user?.role;

  if (role === UserRole.ADMIN) {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" };
};
