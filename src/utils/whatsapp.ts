import { siteConfig } from "../config/site";

function encode(text: string) {
  return encodeURIComponent(text);
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encode(message)}`;
}

export const whatsappMessages = {
  general:
    "Hi! I came across your website and would like to know more about your artworks.",

  artwork: (title: string) =>
    `Hi! I'm interested in the artwork "${title}". Could you please share more details?`,

  commission:
    "Hi! I'm interested in commissioning a custom artwork. Could we discuss my requirements?",
} as const;
