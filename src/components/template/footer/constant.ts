export interface FooterLink {
  href: string
  label: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Services",
    links: [
      { href: "/appointments", label: "Book Appointment" },
      { href: "/departments", label: "Departments" },
      { href: "/doctors", label: "Find Doctors" },
      { href: "/emergency", label: "Emergency Care" },
      { href: "/telemedicine", label: "Telemedicine" },
    ],
  },
  {
    title: "Patients",
    links: [
      { href: "/patient-portal", label: "Patient Portal" },
      { href: "/medical-records", label: "Medical Records" },
      { href: "/insurance", label: "Insurance" },
      { href: "/billing", label: "Billing & Payments" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/health-library", label: "Health Library" },
      { href: "/wellness", label: "Wellness Tips" },
      { href: "/faq", label: "FAQs" },
      { href: "/patient-guide", label: "Patient Guide" },
    ],
  },
  {
    title: "About Us",
    links: [
      { href: "/about", label: "Our Hospital" },
      { href: "/careers", label: "Careers" },
      { href: "/news", label: "News & Updates" },
      { href: "/research", label: "Research" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/facebook", label: "Facebook" },
      { href: "/instagram", label: "Instagram" },
      { href: "/linkedin", label: "LinkedIn" },
      { href: "/youtube", label: "YouTube" },
    ],
  },
]

export const FOOTER_BOTTOM_LINKS: FooterLink[] = [
  { href: "/accessibility", label: "Accessibility" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/hipaa", label: "HIPAA Notice" },
]
