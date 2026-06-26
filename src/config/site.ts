/** Central site configuration — update contact details here. */
const whatsappNumber = "919876543210"; // e.g. 919876543210 for +91 98765 43210

export const siteConfig = {
  name: "Prashrey Palette Art Studio",
  domain: "prashreypalette.in",
  tagline:
    "Where pigment meets poetry — contemporary works crafted with intention, depth, and luminous restraint.",

  /** WhatsApp number in international format without + or spaces, e.g. 919876543210 */
  whatsappNumber,

  email: "hello@prashreypalette.com",

  social: {
    instagram: "https://instagram.com/prashreypalette", // update your handle
    youtube: "https://youtube.com/@prashreypalette", // update your channel
    whatsapp: `https://wa.me/${whatsappNumber}`,
  },

  studio: {
    city: "Mumbai, India",
    address: "Prashrey Palette Art Studio, Mumbai, Maharashtra, India",
  },
} as const;
