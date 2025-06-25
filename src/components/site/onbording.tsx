import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ExpandButton from "../atom/expand-button";
import { ArrowRight } from "lucide-react";

interface PaediatricOnbordingProps {
  className?: string;
}

/**
 * A simple gateway section that encourages paediatric doctors
 * to start the application process. Renders a call-to-action
 * with a prominent button that navigates to `/paediatric`.
 */
export function PaediatricOnbording({ className }: PaediatricOnbordingProps) {
  return (
    <section
     
    >
      <div className=" mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl tracking-tight">
            Paediatric Doctor?
            </h1>
            <p className="max-w-xl mx-auto text-muted-foreground text-2xl leading-8">Join the community of Sudanese paediatric care—connect, share, and inspire healing.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ExpandButton className="group flex items-center">
                <span className="order-1 transition-all duration-300 group-hover:order-2">
                  Join the community
                </span>
                <ArrowRight className="order-2 ml-2 group-hover:ml-0 group-hover:mr-2 h-4 w-4 transition-all duration-300 group-hover:order-1 group-hover:translate-x-1" />
              </ExpandButton>
            </div>
          </div>
        </div>
    </section>
  );
} 