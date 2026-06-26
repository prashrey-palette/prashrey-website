import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Artwork } from "../types/artwork";
import OptimizedImage from "./OptimizedImage";

type ArtworkCardProps = {
  artwork: Artwork;
  index?: number;
};

export default function ArtworkCard({ artwork, index = 0 }: ArtworkCardProps) {
  const imageCount = artwork.images?.length ?? 1;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.45,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group break-inside-avoid"
    >
      <Link
        to={`/portfolio/${artwork.id}`}
        className="block"
        aria-label={`View ${artwork.title}`}
      >
        <div className="relative overflow-hidden rounded-lg border border-white/5 bg-[#121214]/50 shadow-lg shadow-black/20 transition-all duration-500 group-hover:border-[#c9a962]/25 group-hover:shadow-[#c9a962]/10 group-hover:-translate-y-1">
          <div className="aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
            <OptimizedImage
              src={artwork.image}
              alt={artwork.title}
              className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/90 via-[#08080a]/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
          {imageCount > 1 && (
            <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-[#08080a]/70 px-2 py-0.5 font-sans text-[10px] uppercase tracking-[0.12em] text-[#c9a962]/90 backdrop-blur">
              {imageCount} photos
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#c9a962]">
              {artwork.category}
            </p>
            <h3 className="mt-1 font-display text-xl text-[#f4f1ec]">
              {artwork.title}
            </h3>
            <p className="mt-1.5 font-sans text-xs text-[#f4f1ec]/60">
              {artwork.medium} · {artwork.year}
            </p>
            <p className="mt-2 line-clamp-2 font-sans text-xs leading-relaxed text-[#f4f1ec]/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {artwork.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
