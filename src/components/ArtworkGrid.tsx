import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { artworks, artworkCategories } from "../data/artworks";
import type { Artwork, ArtworkCategory } from "../types/artwork";
import ArtworkCard from "./ArtworkCard";
import CategoryFilter from "./CategoryFilter";
import ModalArtworkViewer from "./ModalArtworkViewer";
import ScrollReveal from "./ScrollReveal";

export default function ArtworkGrid() {
  const [activeCategory, setActiveCategory] = useState<
    ArtworkCategory | "All"
  >("All");
  const [selected, setSelected] = useState<Artwork | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return artworks;
    return artworks.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="gallery" className="relative px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#c9a962]">
            Portfolio
          </p>
          <h2 className="mt-4 font-display text-4xl text-[#f4f1ec] md:text-5xl">
            Selected Works
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm text-[#f4f1ec]/50">
            A curated glimpse into abstract, figurative, and experimental
            pieces from the studio.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-12" delay={0.1}>
          <CategoryFilter
            categories={artworkCategories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </ScrollReveal>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((artwork, index) => (
              <div key={artwork.id} className="mb-6">
                <ArtworkCard
                  artwork={artwork}
                  index={index}
                  onSelect={setSelected}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center font-sans text-sm text-[#f4f1ec]/40">
            No works in this category yet.
          </p>
        )}
      </div>

      <ModalArtworkViewer artwork={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
