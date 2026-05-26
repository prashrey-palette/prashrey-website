import { useState } from "react";
import type { Artwork } from "../../types/artwork";
import TiltCard from "./TiltCard";

type GalleryCardProps = {
  artwork: Artwork;
  compact?: boolean;
};

export default function GalleryCard({ artwork, compact = false }: GalleryCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <TiltCard>
      <article className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-zinc-900/30 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10 pointer-events-none" />

        <img
          src={artwork.image}
          alt={artwork.title}
          className={`w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-[2000ms] ${
            compact ? "h-[360px]" : "h-[500px]"
          }`}
        />

        <button
          type="button"
          onClick={() => setLiked((prev) => !prev)}
          aria-pressed={liked}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-6 right-6 z-20 w-11 h-11 rounded-full border backdrop-blur-md transition-all duration-300 ${
            liked
              ? "bg-violet-900/80 border-violet-500/50 text-violet-200 scale-110"
              : "bg-zinc-900/70 border-white/10 text-zinc-400 hover:text-zinc-100 hover:scale-105"
          }`}
        >
          {liked ? "♥" : "♡"}
        </button>

        <div className="absolute bottom-0 z-20 p-8 w-full">
          <p className="uppercase tracking-[0.3em] text-xs text-violet-300/70 mb-3">
            {artwork.category}
          </p>
          <h3
            className={`font-black mb-4 text-zinc-100 ${
              compact ? "text-2xl" : "text-4xl"
            }`}
          >
            {artwork.title}
          </h3>

          <button
            type="button"
            className="px-6 py-3 rounded-full bg-zinc-800/80 backdrop-blur-xl border border-white/5 text-zinc-300 hover:bg-violet-900/60 hover:border-violet-700/30 hover:text-zinc-100 transition-all active:scale-95"
          >
            Discover Artwork
          </button>
        </div>
      </article>
    </TiltCard>
  );
}
