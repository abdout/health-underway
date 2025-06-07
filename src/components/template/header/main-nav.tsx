"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { CalendarIcon, FileTextIcon, CreditCardIcon, HeartIcon, ChevronDownIcon, Activity, Phone, Stethoscope, Microscope, Brain, Zap, Users, Building } from "lucide-react"

import { siteConfig } from "@/components/template/header/constant"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const patientMenuSections = [
  {
    title: "Core Services",
    items: [
  {
    title: "Book Appointment",
    href: "/patient/appointment",
        description: "Schedule consultations with healthcare professionals",
    icon: CalendarIcon,
        badge: null,
  },
  {
    title: "Medical Records",
    href: "/patient/records",
        description: "Access and manage your medical history",
    icon: FileTextIcon,
        badge: "Secure",
      },
    ]
  },
  {
    title: "Health Management",
    items: [
      {
        title: "Health Portal",
        href: "/patient/portal",
        description: "Personal health dashboard and wellness tracking",
        icon: HeartIcon,
        badge: null,
      },
      {
        title: "Health Monitoring",
        href: "/patient/monitoring",
        description: "Real-time health metrics and vital signs",
        icon: Activity,
        badge: "Beta",
      },
    ]
  },
  {
    title: "Support & Billing",
    items: [
  {
    title: "Billing & Insurance",
    href: "/patient/billing",
        description: "View bills, payments, and insurance information",
    icon: CreditCardIcon,
        badge: null,
  },
  {
        title: "Emergency Contact",
        href: "/patient/emergency",
        description: "24/7 emergency consultation and support",
        icon: Phone,
        badge: "24/7",
      },
    ]
  }
]

const servicesMenuSections = [
  {
    title: "Medical Services",
    items: [
      {
        title: "General Consultation",
        href: "/services/consultation",
        description: "Comprehensive medical consultations with experienced doctors",
        icon: Stethoscope,
        badge: null,
      },
      {
        title: "Diagnostic Labs",
        href: "/services/diagnostics",
        description: "Advanced laboratory testing and diagnostic services",
        icon: Microscope,
        badge: "Advanced",
      },
    ]
  },
  {
    title: "Specialized Care",
    items: [
      {
        title: "Neurology",
        href: "/services/neurology",
        description: "Expert neurological care and brain health services",
        icon: Brain,
        badge: null,
      },
      {
        title: "Emergency Care",
        href: "/services/emergency",
        description: "24/7 emergency medical services and urgent care",
        icon: Zap,
        badge: "24/7",
      },
    ]
  },
  {
    title: "Healthcare Solutions",
    items: [
      {
        title: "Telemedicine",
        href: "/services/telemedicine",
        description: "Remote consultations and virtual healthcare services",
        icon: Users,
        badge: "Popular",
      },
      {
        title: "Corporate Health",
        href: "/services/corporate",
        description: "Comprehensive healthcare solutions for businesses",
        icon: Building,
        badge: null,
  },
    ]
  }
]

export function MainNav() {
  const pathname = usePathname()
  const [isPatientMenuOpen, setIsPatientMenuOpen] = useState(false)
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false)
  const [dropdownTop, setDropdownTop] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const servicesButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isPatientMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownTop(rect.bottom + window.scrollY + 8)
    } else if (isServicesMenuOpen && servicesButtonRef.current) {
      const rect = servicesButtonRef.current.getBoundingClientRect()
      setDropdownTop(rect.bottom + window.scrollY + 8)
    }
  }, [isPatientMenuOpen, isServicesMenuOpen])

  const handlePatientMouseEnter = () => {
    setIsPatientMenuOpen(true)
    setIsServicesMenuOpen(false)
  }

  const handlePatientMouseLeave = () => {
    setIsPatientMenuOpen(false)
  }

  const handleServicesMouseEnter = () => {
    setIsServicesMenuOpen(true)
    setIsPatientMenuOpen(false)
  }

  const handleServicesMouseLeave = () => {
    setIsServicesMenuOpen(false)
  }

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 text-foreground">
          <path fill="currentColor" d="M19.649 5.286L14 8.548V2.025h-4v6.523L4.351 5.286l-2 3.465l5.648 3.261l-5.648 3.261l2 3.465L10 15.477V22h4v-6.523l5.649 3.261l2-3.465l-5.648-3.261l5.648-3.261z"/>
        </svg>
        <span className="hidden font-bold lg:inline-block text-foreground">
          {siteConfig.name}
        </span>
      </Link>
      <div className="flex items-center gap-0 text-sm xl:gap-1">
        <nav className="flex items-center gap-1">
            {siteConfig.navigation.map((item) => {
              if (item.title === "Patient") {
                return (
                <div 
                  key={item.href}
                  className="relative"
                  onMouseEnter={handlePatientMouseEnter}
                  onMouseLeave={handlePatientMouseLeave}
                >
                  <button
                    ref={buttonRef}
                      className={cn(
                      "flex items-center gap-1 transition-all duration-300 ease-out hover:bg-muted rounded-lg px-2 py-1.5 hover:text-foreground h-auto bg-transparent",
                        pathname?.startsWith(item.href)
                          ? "text-foreground"
                          : "text-foreground/80"
                      )}
                    >
                      {item.title}
                    <ChevronDownIcon 
                      className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        isPatientMenuOpen && "rotate-180"
                      )} 
                    />
                  </button>
                  
                  {isPatientMenuOpen && (
                    <>
                      {/* Backdrop */}
                      <div className="fixed inset-0 z-40" />
                      
                      {/* Dropdown Menu */}
                      <div 
                        className="fixed left-0 right-0 z-50 bg-popover border shadow-lg rounded-md"
                        style={{ top: dropdownTop }}
                        onMouseEnter={handlePatientMouseEnter}
                        onMouseLeave={handlePatientMouseLeave}
                      >
                        <div className="mx-auto max-w-6xl px-6 py-6">
                          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {patientMenuSections.map((section) => (
                              <div key={section.title} className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">
                                  {section.title}
                                </h3>
                                <div className="space-y-1">
                                  {section.items.map((menuItem) => (
                            <PatientMenuItem
                              key={menuItem.title}
                              title={menuItem.title}
                              href={menuItem.href}
                              icon={menuItem.icon}
                                      badge={menuItem.badge}
                                      onClick={() => setIsPatientMenuOpen(false)}
                            >
                              {menuItem.description}
                            </PatientMenuItem>
                          ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )
            }

            if (item.title === "Services") {
              return (
                <div 
                  key={item.href}
                  className="relative"
                  onMouseEnter={handleServicesMouseEnter}
                  onMouseLeave={handleServicesMouseLeave}
                >
                  <button
                    ref={servicesButtonRef}
                    className={cn(
                      "flex items-center gap-1 transition-all duration-300 ease-out hover:bg-muted rounded-lg px-2 py-1.5 hover:text-foreground h-auto bg-transparent",
                      pathname?.startsWith(item.href)
                        ? "text-foreground"
                        : "text-foreground/80"
                    )}
                  >
                    {item.title}
                    <ChevronDownIcon 
                      className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        isServicesMenuOpen && "rotate-180"
                      )} 
                    />
                  </button>
                  
                  {isServicesMenuOpen && (
                    <>
                      {/* Backdrop */}
                      <div className="fixed inset-0 z-40" />
                      
                      {/* Dropdown Menu */}
                      <div 
                        className="fixed left-0 right-0 z-50 bg-popover border shadow-lg rounded-md"
                        style={{ top: dropdownTop }}
                        onMouseEnter={handleServicesMouseEnter}
                        onMouseLeave={handleServicesMouseLeave}
                      >
                        <div className="mx-auto max-w-6xl px-6 py-6">
                          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {servicesMenuSections.map((section) => (
                              <div key={section.title} className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">
                                  {section.title}
                                </h3>
                                <div className="space-y-1">
                                  {section.items.map((menuItem) => (
                                    <ServiceMenuItem
                                      key={menuItem.title}
                                      title={menuItem.title}
                                      href={menuItem.href}
                                      icon={menuItem.icon}
                                      badge={menuItem.badge}
                                      onClick={() => setIsServicesMenuOpen(false)}
                                    >
                                      {menuItem.description}
                                    </ServiceMenuItem>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                )
              }
              
                             return (
                     <Link
                key={item.href}
                       href={item.href}
                       className={cn(
                         "transition-all duration-300 ease-out hover:bg-muted rounded-lg px-2 py-1.5 hover:text-foreground",
                         pathname === item.href
                           ? "text-foreground"
                           : "text-foreground/80"
                       )}
                     >
                       {item.title}
                     </Link>
               )
            })}
        </nav>
      </div>
    </div>
  )
}

function PatientMenuItem({
  title,
  children,
  href,
  icon: Icon,
  badge,
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { 
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | null
  onClick?: () => void
}) {
  return (
    <div {...props}>
        <Link 
          href={href}
        onClick={onClick}
        className="flex items-start gap-3 rounded-md p-3 hover:bg-accent hover:text-accent-foreground transition-colors group"
        >
        <Icon className="h-5 w-5 mt-0.5 text-muted-foreground group-hover:text-accent-foreground" />
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium leading-none">{title}</div>
            {badge && (
              <Badge 
                variant={badge === "Beta" ? "secondary" : badge === "24/7" ? "destructive" : "outline"}
                className="text-xs"
              >
                {badge}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm leading-snug group-hover:text-accent-foreground/80">
              {children}
            </p>
          </div>
        </Link>
    </div>
  )
}

function ServiceMenuItem({
  title,
  children,
  href,
  icon: Icon,
  badge,
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { 
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | null
  onClick?: () => void
}) {
  return (
    <div {...props}>
      <Link 
        href={href}
        onClick={onClick}
        className="flex items-start gap-3 rounded-md p-3 hover:bg-accent hover:text-accent-foreground transition-colors group"
      >
        <Icon className="h-5 w-5 mt-0.5 text-muted-foreground group-hover:text-accent-foreground" />
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium leading-none">{title}</div>
            {badge && (
              <Badge 
                variant={badge === "Advanced" ? "secondary" : badge === "24/7" ? "destructive" : badge === "Popular" ? "default" : "outline"}
                className="text-xs"
              >
                {badge}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm leading-snug group-hover:text-accent-foreground/80">
            {children}
          </p>
        </div>
      </Link>
    </div>
  )
}