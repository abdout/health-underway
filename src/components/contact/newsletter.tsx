"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  return (
    <div className="rounded-2xl bg-[#e8563f] px-8 py-10 lg:px-16 mr-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">Subscribe to <br /> our Newsletter</h2>
            <p className="text-white/90 text-lg leading-relaxed max-w-2xl">
              Subscribe for Updates: Stay informed about the latest investor updates, financial results, and
              announcements by subscribing to our newsletter.
            </p>
          </div>

          {/* Right side - Form */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className="flex max-w-md lg:max-w-none">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 h-12 px-4 rounded-l-lg rounded-r-none border-r-0 flex-1 min-w-[280px] focus:ring-0 focus:ring-offset-0"
              />
              <Button className="bg-[#ffffff] text-[#e8563f] hover:bg-[#ececec] font-semibold h-12 px-4 rounded-r-lg rounded-l-none whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
