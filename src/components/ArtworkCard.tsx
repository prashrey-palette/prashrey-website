import { motion } from "framer-motion";
import type { Artwork } from "../types/artwork";

type ArtworkCardProps = {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
  index?: number;
};

export default function ArtworkCard({
  artwork,
  onSelect,
  index = 0,
}: ArtworkCardProps) {
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
      className="group cursor-pointer break-inside-avoid"
      onClick={() => onSelect(artwork)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(artwork);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${artwork.title}`}
    >
      <div className="relative overflow-hidden rounded-lg border border-white/5 bg-[#121214]/50 shadow-lg shadow-black/20 transition-all duration-500 group-hover:border-[#c9a962]/25 group-hover:shadow-[#c9a962]/5">
        <div className="aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
          <img
            src={artwork.image}
            alt={artwork.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/90 via-[#08080a]/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
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
    </motion.article>
  );
}
