export type ArtworkCategory =
  | "Abstract"
  | "Portrait"
  | "Landscape"
  | "Sketches"
  | "Mixed Media"
  | "Digital Art";

export type Artwork = {
  id: string;
  title: string;
  category: ArtworkCategory;
  image: string;
  description: string;
  medium: string;
  dimensions: string;
  year: number;
};

export type Collection = {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  artworkCount: number;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
};

export type NavLink = {
  href: string;
  label: string;
};
