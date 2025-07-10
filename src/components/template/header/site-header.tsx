"use client"

import * as React from "react"
import Link from "next/link"
import { MobileNav } from "./mobile-nav"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { siteConfig } from "./constant"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function SiteHeader() {
  return (
    <header className="w-full">
      <div className="flex h-10 items-center">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 text-foreground">
                <path fill="currentColor" d="M19.649 5.286L14 8.548V2.025h-4v6.523L4.351 5.286l-2 3.465l5.648 3.261l-5.648 3.261l2 3.465L10 15.477V22h4v-6.523l5.649 3.261l2-3.465l-5.648-3.261l5.648-3.261z"/>
              </svg>
              <span className="hidden font-bold lg:inline-block text-foreground">
                {siteConfig.name}
              </span>
            </Link>
          
            {/* Desktop Navigation - Hidden on Mobile */}
            <div className="hidden md:block">
              <NavigationMenu viewport={false}>
                <NavigationMenuList>
                  {/* <NavigationMenuItem>
                    <NavigationMenuTrigger>Patient</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                              href="/"
                            >
                              <div className="mt-4 mb-2 text-lg font-medium">
                                shadcn/ui
                              </div>
                              <p className="text-muted-foreground text-sm leading-tight">
                                Beautifully designed components built with Tailwind CSS.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <ListItem href="/docs" title="Introduction">
                          Re-usable components built using Radix UI and Tailwind CSS.
                        </ListItem>
                        <ListItem href="/docs/installation" title="Installation">
                          How to install dependencies and structure your app.
                        </ListItem>
                        <ListItem href="/docs/primitives/typography" title="Typography">
                          Styles for headings, paragraphs, lists...etc
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Service</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {components.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem> */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href="/about">About</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href="/contact">Contact</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href="/doctors">Doctors</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href="/papers">Papers</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href="/blog">Blog</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href="/platform">Platform</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Mobile Navigation - Shown only on Mobile */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
