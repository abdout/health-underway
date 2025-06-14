// RootLayout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Databayt",
  description: "Business automation",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
          GeistSans.className,
          GeistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <div className="layout-container">
            <Toaster position="bottom-right" />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
