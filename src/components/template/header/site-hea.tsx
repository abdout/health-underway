import Link from "next/link"

import { siteConfig } from "@/components/template/header/constant"
// import { CommandMenu } from "@/components/template/header/command-menu"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/template/header/main-nav"
import { MobileNav } from "@/components/template/header/mobile-nav"
import { ModeSwitcher } from "@/components/mode-switcher"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full    pt-3">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center justify-center gap-2 md:gap-4">
          <div className="bg-neutral-50 rounded-lg px-4 py-2 flex items-center gap-2 md:gap-4">
            <MainNav />
            <MobileNav />
            <div className="flex items-center gap-2">
              {/* <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
                <CommandMenu />
              </div> */}
              <nav className="flex items-center gap-0.5">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 px-0"
                >
                  <Link
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icons.gitHub className="h-4 w-4 text-foreground" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
                <ModeSwitcher />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}