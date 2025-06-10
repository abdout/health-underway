import { getServerSession } from "next-auth/next"
import authConfig from "../../auth"

export const currentUser = async () => {
  const session = await getServerSession(authConfig);

  return session?.user;
};

export const currentRole = async () => {
  const session = await getServerSession(authConfig);

  return session?.user?.role;
};
