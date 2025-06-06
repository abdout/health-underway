import type { Metadata } from "next";
import type { ReactNode } from "react";

// import {SiteFooter} from "@/components/template/footer/site-footer";
import { SiteHeader } from "@/components/template/header/site-header";
import { SiteFooter } from "@/components/template/footer/site-footer";
// import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Shifa",
    default: "Shifa",
  },
  description: "Health automation",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
};

interface SiteLayoutProps {
  readonly children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div 
      className="relative flex min-h-screen flex-col bg-background text-foreground antialiased"
      data-slot="site-layout"
    >
      <SiteHeader />
      <main 
        className="flex-1 focus-visible:outline-hidden" 
        data-slot="main-content"
        role="main"
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}