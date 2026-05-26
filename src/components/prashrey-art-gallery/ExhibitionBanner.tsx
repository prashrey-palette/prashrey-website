import ScrollReveal from "./ScrollReveal";
import { scrollToSection } from "../../utils/smoothScroll";

export default function ExhibitionBanner() {
  return (
    <section className="relative z-10 px-6 py-10">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto rounded-3xl border border-violet-800/20 bg-zinc-900/50 backdrop-blur-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-violet-300/70 mb-2">
              Now On Display
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-100">
              Starlight Reverie — Spring Exhibition 2026
            </h3>
            <p className="text-zinc-500 mt-2 text-sm md:text-base">
              48 new works · Virtual walkthrough · Live curator sessions every Friday
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection("#gallery")}
            className="shrink-0 px-6 py-3 rounded-xl bg-violet-900/80 border border-violet-700/30 text-zinc-100 font-medium hover:bg-violet-800/80 transition"
          >
            View Exhibition
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
}
