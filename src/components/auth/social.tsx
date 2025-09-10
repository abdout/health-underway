"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";

import { Button } from "@/components/ui/button";
import { ColoredGoogle, ColoredFacebook } from "@/components/atom/icon";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  
  const onClick = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
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
        <ColoredGoogle className="h-5 w-5 mr-2" />
        Google
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("facebook")}
      >
        <ColoredFacebook className="h-5 w-5 mr-2" />
        Facebook
      </Button>
    </div>
  );
};
