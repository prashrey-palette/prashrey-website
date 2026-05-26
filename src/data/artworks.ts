import type { Artwork } from "../types/artwork";

export const artworks: Artwork[] = [
  {
    title: "Celestial Bloom",
    category: "Digital Expression",
    image:
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Dreamscape",
    category: "Abstract Light",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Neon Silence",
    category: "Modern Collection",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Ethereal Motion",
    category: "Visual Story",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Midnight Canvas",
    category: "Digital Expression",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb5850280fee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Luminous Drift",
    category: "Abstract Light",
    image:
      "https://images.unsplash.com/photo-1550684846-fac9c7b0f1f9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Silent Horizon",
    category: "Modern Collection",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Fragmented Light",
    category: "Visual Story",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  },
];

export const artworkCategories = [
  "All",
  ...Array.from(new Set(artworks.map((art) => art.category))),
];

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop";

export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop";
