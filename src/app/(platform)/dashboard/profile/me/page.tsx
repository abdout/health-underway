import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";

export default async function MyProfileRedirect() {
  const user = await currentUser();
  if (!user?.id) {
    redirect("/login");
  }

  redirect(`/dashboard/profile/${user.id}`);
} 