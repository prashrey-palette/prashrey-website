import { collections } from "../../data/collections";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { scrollToSection } from "../../utils/smoothScroll";

export default function CollectionsSection() {
  return (
    <section id="collections" className="relative z-10 py-28 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Curated Sets"
            title="Explore Collections"
            description="Themed bodies of work spanning abstract light, motion studies, and narrative digital sculpture."
          />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <ScrollReveal key={collection.id} delayMs={index * 80}>
              <article className="group rounded-3xl border border-white/5 bg-zinc-900/40 overflow-hidden hover:border-violet-700/25 transition-all duration-500">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  <span className="absolute top-4 right-4 text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-zinc-950/70 border border-white/10 text-zinc-400">
                    {collection.pieces} pieces
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-zinc-100 mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                    {collection.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollToSection("#gallery")}
                    className="text-sm text-violet-300/80 hover:text-violet-200 transition uppercase tracking-widest"
                  >
                    View Collection →
                  </button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
