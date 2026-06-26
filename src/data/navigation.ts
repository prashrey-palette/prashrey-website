import { siteConfig } from "../config/site";
import type { NavLink } from "../types/artwork";

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/commission", label: "Commission" },
  { href: "/contact", label: "Contact" },
];

export const footerLinks: NavLink[] = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/commission", label: "Commission" },
  { href: "/contact", label: "Contact" },
];

export { siteConfig };

export const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: "instagram" as const },
  { label: "YouTube", href: siteConfig.social.youtube, icon: "youtube" as const },
  { label: "WhatsApp", href: siteConfig.social.whatsapp, icon: "whatsapp" as const },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: "email" as const },
];
