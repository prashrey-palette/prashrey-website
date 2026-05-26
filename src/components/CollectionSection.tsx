import { motion } from "framer-motion";
import { collections } from "../data/collections";
import ScrollReveal from "./ScrollReveal";

export default function CollectionSection() {
  return (
    <section id="collections" className="relative px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#c9a962]">
            Curated Series
          </p>
          <h2 className="mt-4 font-display text-4xl text-[#f4f1ec] md:text-5xl">
            Featured Collections
          </h2>
          <p className="mt-4 max-w-lg font-sans text-sm text-[#f4f1ec]/50">
            Editorial groupings — each collection tells a distinct visual
            narrative across medium and mood.
          </p>
        </ScrollReveal>

        <div className="mt-14 -mx-6 overflow-x-auto px-6 pb-4 scrollbar-thin lg:-mx-8 lg:px-8">
          <div className="flex gap-6 md:gap-8" style={{ width: "max-content" }}>
            {collections.map((collection, i) => (
              <motion.article
                key={collection.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative w-[280px] shrink-0 overflow-hidden rounded-xl border border-white/5 sm:w-[340px] md:w-[420px]"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={collection.coverImage}
                    alt={collection.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#c9a962]">
                    {collection.artworkCount} Works
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-[#f4f1ec] md:text-3xl">
                    {collection.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-[#f4f1ec]/50">
                    {collection.subtitle}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
