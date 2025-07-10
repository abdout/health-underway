"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  return (
    <div className="rounded-2xl bg-[#e8563f] px-4 py-8 sm:px-6 md:px-8 md:py-10 lg:px-16 mr-0 sm:mr-0 md:mr-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-16">
          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left mb-6 lg:mb-0">
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Subscribe to <br className="hidden sm:block" /> our Newsletter</h2>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Subscribe for Updates: Stay informed about the latest investor updates, financial results, and
              announcements by subscribing to our newsletter.
            </p>
          </div>

          {/* Right side - Form */}
          <div className="flex-shrink-0 w-full sm:w-auto">
            <form className="flex flex-col sm:flex-row max-w-full sm:max-w-md lg:max-w-none gap-3 sm:gap-0">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 text-white placeholder:text-white/70 h-12 px-4 rounded-lg sm:rounded-l-lg sm:rounded-r-none border border-white/20 sm:border-r-0 flex-1 min-w-0 focus:ring-0 focus:ring-offset-0"
              />
              <Button type="submit" className="bg-[#ffffff] text-[#e8563f] hover:bg-[#ececec] font-semibold h-12 px-4 rounded-lg sm:rounded-r-lg sm:rounded-l-none whitespace-nowrap w-full sm:w-auto mt-2 sm:mt-0">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
