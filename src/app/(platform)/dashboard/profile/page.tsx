import TwitterProfile from '@/components/twitter/profile'
import React from 'react'
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login?callbackUrl=/dashboard/profile");
  }
  return (
    <TwitterProfile />
  )
}

export default page

export const dynamic = 'force-dynamic';