import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaediatricGatewayProps {
  className?: string;
}

/**
 * A simple gateway section that encourages paediatric doctors
 * to start the application process. Renders a call-to-action
 * with a prominent button that navigates to `/paediatric`.
 */
export function PaediatricGateway({ className }: PaediatricGatewayProps) {
  return (
    <section
      className={cn(
        "w-full border-y bg-muted/50 py-16 dark:bg-muted/40",
        className
      )}
    >
      <div className="container mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
        <h2 className="scroll-m-20 text-3xl font-bold tracking-tight md:text-4xl">
          Are you a Paediatric Doctor?
        </h2>
        <p className="max-w-prose text-balance text-muted-foreground md:text-lg">
          Proceed with the application form to join our hospital network and
          provide world-class care to children.
        </p>

        <Button asChild size="lg" className="mt-4">
          <Link href="/paediatric">Start Application</Link>
        </Button>
      </div>
    </section>
  );
} 