import type { Metadata } from "next";
import type { ReactNode } from "react";

// import {SiteFooter} from "@/components/template/footer/site-footer";

import { SiteFooter } from "@/components/template/footer/site-footer";
  import { SiteHeader } from "@/components/template/header/site-header";
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
      {/* Sticky navigation container with horizontal centering */}
      <div className="sticky top-4 z-50 max-w-7xl mx-auto mt-4 bg-white rounded-2xl shadow-sm border">
        <div className="flex justify-center items-center w-full px-4 py-2">
          <SiteHeader />
        </div>
      </div>
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