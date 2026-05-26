import { useGalleryInteraction } from "../../context/GalleryInteractionContext";
import { ABOUT_IMAGE } from "../../data/artworks";
import ScrollReveal from "./ScrollReveal";
import { scrollToSection } from "../../utils/smoothScroll";

export default function AboutSection() {
  const { mouse, reducedMotion } = useGalleryInteraction();
  const imageShift = reducedMotion ? 0 : (mouse.x - 0.5) * 16;

  return (
    <section id="about" className="relative z-10 py-28 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <ScrollReveal>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-950/40 to-slate-900/30 blur-3xl rounded-full" />
            <img
              src={ABOUT_IMAGE}
              alt="About Art"
              className="relative rounded-[2rem] border border-white/5 shadow-2xl shadow-black/40 transition-transform duration-200 ease-out"
              style={{ transform: `translate3d(${imageShift}px, 0, 0)` }}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <div>
            <p className="uppercase tracking-[0.4em] text-violet-300/60 text-sm mb-5">
              About The Vision
            </p>

            <h2 className="text-5xl md:text-6xl font-black leading-tight mb-8 bg-gradient-to-r from-zinc-100 to-violet-200/80 bg-clip-text text-transparent">
              Creating Emotion Through Digital Art.
            </h2>

            <p className="text-zinc-400 leading-relaxed text-lg mb-6">
              Prashrey Art Gallery is a modern immersive visual portfolio built
              to blend creativity, storytelling, and futuristic design into a
              captivating digital experience.
            </p>

            <p className="text-zinc-500 leading-relaxed mb-10">
              Every composition is designed to create emotional depth with bold
              gradients, cinematic lighting, and interactive visuals that feel
              alive.
            </p>

            <button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="px-8 py-4 rounded-2xl bg-violet-900/80 border border-violet-700/30 text-zinc-100 font-semibold hover:bg-violet-800/80 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg shadow-black/30"
            >
              Learn More
            </button>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-6xl mx-auto mt-20 grid sm:grid-cols-3 gap-6">
        {[
          {
            title: "Curated Quality",
            text: "Every piece is selected for narrative depth, craft, and exhibition readiness.",
          },
          {
            title: "Global Reach",
            text: "Virtual and physical shows across 12 cities with interactive companion sites.",
          },
          {
            title: "Artist-Led",
            text: "Studio-driven work with transparent collaboration from concept to launch.",
          },
        ].map((item, index) => (
          <ScrollReveal key={item.title} delayMs={index * 80}>
            <div className="rounded-2xl border border-white/5 bg-zinc-900/40 p-6 h-full">
              <h3 className="text-lg font-bold text-zinc-100 mb-2">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
