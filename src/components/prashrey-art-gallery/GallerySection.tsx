import { useMemo, useState } from "react";
import { artworkCategories, artworks } from "../../data/artworks";
import GalleryCard from "./GalleryCard";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArtworks = useMemo(() => {
    if (activeCategory === "All") return artworks;
    return artworks.filter((art) => art.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="gallery" className="relative z-10 py-28 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Featured Works"
            title="The Gallery"
            description="Eight signature pieces across four disciplines. Filter by category or hover to explore depth and detail."
          />
        </ScrollReveal>

        <ScrollReveal delayMs={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {artworkCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest border transition ${
                  activeCategory === category
                    ? "bg-violet-900/70 border-violet-600/40 text-zinc-100"
                    : "bg-zinc-900/40 border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork, index) => (
            <ScrollReveal key={artwork.title} delayMs={index * 80}>
              <GalleryCard artwork={artwork} compact />
            </ScrollReveal>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <p className="text-center text-zinc-500 py-16">
            No works in this category yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
