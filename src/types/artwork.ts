export type ArtworkCategory =
  | "Acrylic"
  | "Pichwai"
  | "Textured Art"
  | "Mixed Media";

export type Artwork = {
  id: number;
  title: string;
  category: ArtworkCategory;
  medium: string;
  year: string;
  dimensions: string;
  image: string;
  images?: string[];
  description: string;
  featured: boolean;
  availability: ArtworkAvailability;
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

export type ArtworkAvailability = "Available" | "Sold" | "Commission Only" |"Customisation Available";
