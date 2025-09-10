export const siteConfig = {
    name: "Shifa",
    url: "https://ui.shadcn.com",
    ogImage: "https://ui.shadcn.com/og.jpg",
    description:
      "A comprehensive healthcare platform providing quality medical services and connecting patients with healthcare professionals.",
    links: {
      twitter: "https://twitter.com/shadcn",
      github: "https://github.com/shadcn-ui/ui",
    },
    navigation: [
      {
        title: "Patient",
        href: "/patient",
      },
      {
        title: "Services",
        href: "/services",
      },
      {
        title: "Doctors",
        href: "/doctors",
      },
      {
        title: "Departments",
        href: "/departments",
      },
      {
        title: "Platform",
        href: "/platform",
      },
    ],
  }
  
  export type SiteConfig = typeof siteConfig
  
  export const META_THEME_COLORS = {
    light: "#ffffff",
    dark: "#09090b",
  }