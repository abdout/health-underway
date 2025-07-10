"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BarChart3, Facebook, Instagram, Twitter, ArrowRight, ChevronUp } from "lucide-react"
import Link from "next/link"
import ExpandButton from "../atom/expand-button"

export default function Message() {
    return (
       
            <div className="bg-white rounded-2xl p-14 space-y-10">
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <Input
                            className="border-0 border-b border-muted-foreground focus:border-[#e8563f] rounded-none bg-transparent px-0 py-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <Input
                            className="border-0 border-b border-muted-foreground focus:border-[#e8563f] rounded-none bg-transparent px-0 py-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Email Address"
                        />
                    </div>
                    <div>
                        <Input
                            className="border-0 border-b border-muted-foreground focus:border-[#e8563f] rounded-none bg-transparent px-0 py-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Phone Number (optional)"
                        />
                    </div>
                </div>

                <div>
                    <Textarea
                        className="border-0 border-b border-muted-foreground focus:border-[#e8563f] rounded-none bg-transparent px-0 py-0 mt-20 min-h-[40px] resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Message"
                    />
                </div>
                <ExpandButton href="/paediatric" className="group flex items-center w-32 bg-[#e8563f] border-none max-w-60">
                    <span className="order-1 transition-all duration-300 group-hover:order-2">
                        <span className="hidden sm:inline">Leave us a Message</span>
                        <span className="sm:hidden">Send</span>
                    </span>
                    <ArrowRight className="order-2 ml-2 group-hover:ml-0 group-hover:mr-2 h-4 w-4 transition-all duration-300 group-hover:order-1 group-hover:translate-x-1" />
                </ExpandButton>

            </div>
    )
}
