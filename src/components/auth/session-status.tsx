"use client";

import { useSession } from "next-auth/react";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";

export const SessionStatus = () => {
  const { data, status } = useSession();
  const user = data?.user;

  if (status === "loading") {
    return (
      <span className="text-xs text-muted-foreground">Loading…</span>
    );
  }

  return user ? (
    <LogoutButton>
      <span className="text-sm font-medium hover:underline">Logout</span>
    </LogoutButton>
  ) : (
    <Link href="/login" className="text-sm font-medium hover:underline">
      Login
    </Link>
  );
}; 