import type { Artwork, ArtworkCategory } from "../types/artwork";

export const artworkCategories: ArtworkCategory[] = [
  "Abstract",
  "Portrait",
  "Landscape",
  "Sketches",
  "Mixed Media",
  "Digital Art",
];

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Celestial Bloom",
    category: "Abstract",
    image:
      "https://images.unsplash.com/photo-1549490349-864fa9c1c0d4?q=80&w=1200&auto=format&fit=crop",
    description:
      "A luminous exploration of color fields and organic geometry, where light dissolves into layered translucency.",
    medium: "Acrylic on canvas",
    dimensions: '48" × 36"',
    year: 2025,
  },
  {
    id: "2",
    title: "Silent Reverie",
    category: "Portrait",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200&auto=format&fit=crop",
    description:
      "An intimate portrait study capturing quiet introspection through restrained brushwork and warm undertones.",
    medium: "Oil on linen",
    dimensions: '30" × 40"',
    year: 2024,
  },
  {
    id: "3",
    title: "Horizon Line",
    category: "Landscape",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    description:
      "Mist-draped mountains rendered in atmospheric perspective, evoking stillness at the edge of dawn.",
    medium: "Watercolor",
    dimensions: '24" × 18"',
    year: 2025,
  },
  {
    id: "4",
    title: "Gesture Study VII",
    category: "Sketches",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
    description:
      "Rapid charcoal marks exploring movement and form—raw energy captured in a single sitting.",
    medium: "Charcoal on paper",
    dimensions: '18" × 24"',
    year: 2024,
  },
  {
    id: "5",
    title: "Fragmented Light",
    category: "Mixed Media",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb5850280fee?q=80&w=1200&auto=format&fit=crop",
    description:
      "Collaged textures and metallic leaf intersect with painted passages, creating a tactile dialogue of surfaces.",
    medium: "Mixed media on board",
    dimensions: '36" × 36"',
    year: 2025,
  },
  {
    id: "6",
    title: "Neon Silence",
    category: "Digital Art",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    description:
      "Digital gradients pulse with restrained luminosity—a meditation on space, hue, and negative form.",
    medium: "Digital print on archival paper",
    dimensions: '40" × 30"',
    year: 2025,
  },
  {
    id: "7",
    title: "Ethereal Drift",
    category: "Abstract",
    image:
      "https://images.unsplash.com/photo-1550684846-fac9c7b0f1f9?q=80&w=1200&auto=format&fit=crop",
    description:
      "Soft veils of pigment drift across the surface, suggesting motion without defining contour.",
    medium: "Acrylic and ink",
    dimensions: '42" × 32"',
    year: 2024,
  },
  {
    id: "8",
    title: "The Gaze",
    category: "Portrait",
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9e0c5a8c?q=80&w=1200&auto=format&fit=crop",
    description:
      "A contemporary portrait balancing classical composition with expressive, contemporary mark-making.",
    medium: "Oil on canvas",
    dimensions: '28" × 36"',
    year: 2025,
  },
  {
    id: "9",
    title: "Coastal Haze",
    category: "Landscape",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    description:
      "Sea and sky merge in a palette of pearl and slate—an ode to the quiet drama of coastal light.",
    medium: "Oil on panel",
    dimensions: '32" × 48"',
    year: 2024,
  },
  {
    id: "10",
    title: "Contour Notes",
    category: "Sketches",
    image:
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1200&auto=format&fit=crop",
    description:
      "Delicate ink lines trace the architecture of the human form with economy and precision.",
    medium: "Ink on cotton paper",
    dimensions: '12" × 16"',
    year: 2025,
  },
  {
    id: "11",
    title: "Resonance",
    category: "Mixed Media",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    description:
      "Layered ephemera and pigment build a visual rhythm—memory, texture, and color in conversation.",
    medium: "Collage and acrylic",
    dimensions: '30" × 30"',
    year: 2024,
  },
  {
    id: "12",
    title: "Prism Field",
    category: "Digital Art",
    image:
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format&fit=crop",
    description:
      "Geometric light fractures across a digital plane—precision meets the poetry of chromatic interference.",
    medium: "Limited edition digital print",
    dimensions: '36" × 24"',
    year: 2025,
  },
];
