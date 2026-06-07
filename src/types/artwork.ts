export type ArtworkCategory =
  | "Acrylic"
  | "Watercolor"
  | "Oil"
  | "Sketch"
  | "Mixed Media"
  | "Digital Art";

export type Artwork = {
  id: number;
  title: string;
  category: ArtworkCategory;
  medium: string;
  year: string;
  dimensions: string;
  image: string;
  description: string;
  featured: boolean;
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
