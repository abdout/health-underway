"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Facebook, Google } from "@/components/atom/icon";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

// Function to clean Facebook URL hash
const cleanUrlHash = () => {
  // Only run on client side
  if (typeof window !== "undefined") {
    // Check if URL has the Facebook hash fragment
    if (window.location.hash === "#_=_") {
      // Clean the hash
      const cleanUrl = window.location.href.replace(/#.*$/, "");
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }
};

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();
  
  // Clean URL hash on component mount - this will handle Facebook redirects
  useEffect(() => {
    cleanUrlHash();
  }, []);

  const onClick = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  }

  return (
    <div className="grid md:gap-4 gap-3 grid-cols-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <Google className="h-5 w-5 mr-2" />
        Google
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("facebook")}
      >
        <Facebook className="h-5 w-5 mr-2" />
        Facebook
      </Button>
    </div>
  );
};
