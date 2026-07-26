/** Central site configuration — update contact details here. */
const whatsappNumber = "918734062305"; // international format, no + or spaces

export const siteConfig = {
  name: "Prashrey Palette Art Studio",
  domain: "prashreypalette.in",
  tagline:
    "Where pigment meets poetry — contemporary works crafted with intention, depth, and luminous restraint.",

  /** WhatsApp number in international format without + or spaces */
  whatsappNumber:918734062305,

  email: "prashreypalette@gmail.com",

  social: {
    instagram: "https://instagram.com/prashrey_palette",
    youtube: "https://youtube.com/@prashrey_palette",
    whatsapp: `https://wa.me/${whatsappNumber}`,
  },

  studio: {
    city: "Mumbai, India",
    address: "Prashrey Palette Art Studio, Mumbai, Maharashtra, India",
  },

  /** Primary brand mark, prepared from the supplied studio artwork. */
  logoAlt: "Prashrey Palette – The Art Studio",
  logoPaths: [
    "/brand/prashrey-palette-logo.png",
    "/Prashrey Palette Logo.png",
    "/Prashrey Palette Logo.PNG",
    "/Prashrey Palette Logo.jpg",
    "/Prashrey Palette Logo.webp",
  ],
} as const;
