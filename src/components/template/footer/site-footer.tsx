import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { FOOTER_SECTIONS, FOOTER_BOTTOM_LINKS } from "./constant"
import ExpandButton from "@/components/atom/expand-button"

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-slate-900 -mx-6 py-20 rounded-t-2xl">
      {/* Mesh Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image 
          src="https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/6679d424b15ec493e1500f69_gradient-noise-purple-azure-dark.jpg" 
          alt="Mesh gradient background" 
          className="w-full h-full object-cover opacity-100"
          layout="fill"
          loading="lazy"
        />
      </div>

      {/* Footer Content */}
      <div className="relative z-10">
        {/* Call to Action Section */}
        <div className=" mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-white">
              Start your healing
            </h1>
            <p className="text-background text-2xl">with Shifa</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ExpandButton variant="white" className="group flex items-center">
                <span className="order-1 transition-all duration-300 group-hover:order-2">
                  Get started
                </span>
                <ArrowRight className="order-2 ml-2 group-hover:ml-0 group-hover:mr-2 h-4 w-4 transition-all duration-300 group-hover:order-1 group-hover:translate-x-1" />
              </ExpandButton>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {FOOTER_SECTIONS.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h5 className="font-semibold text-white">{section.title}</h5>
                  <ul className="space-y-3 text-sm">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col text-sm text-gray-300  md:flex-row justify-center items-center gap-4">
              
                © {new Date().getFullYear()} Tiptap
              
              <div className="flex flex-wrap gap-6 text-sm">
                {FOOTER_BOTTOM_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}