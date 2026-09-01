export type ArtworkCategory =
  | "Acrylic"
  | "Pichwai"
  | "Textured Art"
  | "Mixed Media";

export type ArtworkImageSource = {
  src: string;
  width: number;
};

export type ArtworkImage = {
  src: string;
  optimizedSrc?: string;
  srcSet?: ArtworkImageSource[];
};

export type Artwork = {
  id: number;
  slug: string;
  title: string;
  category: ArtworkCategory;
  medium: string;
  year: string;
  dimensions: string;
  image: ArtworkImage;
  images: ArtworkImage[];
  description: string;
  featured: boolean;
  homepageOrder: number | null;
  hero: boolean;
  availability: ArtworkAvailability;
};

export type ArtworkMetadata = Omit<Artwork, "id" | "image" | "images"> & {
  primaryImage: string;
  additionalImages?: string[];
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

export type ArtworkAvailability =
  | "Available"
  | "Sold"
  | "Commission Only"
  | "Customisation Available";
