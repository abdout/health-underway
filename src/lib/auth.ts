import { auth as baseAuth } from "../../auth";

// Re-export auth so that consumers can import it from "@/lib/auth"
export const auth = baseAuth;

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
