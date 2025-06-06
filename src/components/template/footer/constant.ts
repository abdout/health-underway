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
    title: "Product",
    links: [
      { href: "#editor", label: "Editor" },
      { href: "#collaboration", label: "Collaboration" },
      { href: "#content-ai", label: "Content AI" },
      { href: "#documents", label: "Documents" },
      { href: "#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#blog", label: "Blog" },
      { href: "#contact", label: "Contact us" },
    ],
  },
  {
    title: "Docs",
    links: [
      { href: "#docs-editor", label: "Editor" },
      { href: "#hocuspocus", label: "Hocuspocus" },
      { href: "#extensions", label: "Extensions" },
      { href: "#examples", label: "Examples" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#release-notes", label: "Release notes" },
      { href: "#roi-calculator", label: "ROI Calculator" },
      { href: "#experiments", label: "Experiments" },
      { href: "#mit-license", label: "MIT license" },
      { href: "#security", label: "Security" },
      { href: "#pro-license", label: "Pro license" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "#github", label: "GitHub" },
      { href: "#discord", label: "Discord" },
      { href: "#linkedin", label: "LinkedIn" },
      { href: "#x", label: "X" },
    ],
  },
]

export const FOOTER_BOTTOM_LINKS: FooterLink[] = [
  { href: "#system-status", label: "System status" },
  { href: "#privacy-policy", label: "Privacy policy" },
  { href: "#terms", label: "Terms" },
  { href: "#legal-notice", label: "Legal notice" },
]
