"use client";

import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { Button } from "@/components/ui/button";
import { Facebook, Google } from "@/components/atom/icon";

export const Social = () => {
  const onClick = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    });
  };

  return (
    <div className="grid md:gap-4 gap-3 grid-cols-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <Google className="h-5 w-5" />
        Google
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("facebook")}
      >
        <Facebook className="h-5 w-5" />
        Facebook
      </Button>
    </div>
  );
};
