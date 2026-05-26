import { useGalleryInteraction } from "../../context/GalleryInteractionContext";
import { artworks, HERO_IMAGE } from "../../data/artworks";
import { scrollToSection } from "../../utils/smoothScroll";

const heroCategories = [
  "Abstract",
  "Digital",
  "Motion",
  "Portrait",
  "Landscape",
];

const floatingPieces = artworks.slice(0, 3);

export default function HeroSection() {
  const { mouse, reducedMotion } = useGalleryInteraction();

  const parallaxX = reducedMotion ? 0 : (mouse.x - 0.5) * 24;
  const parallaxY = reducedMotion ? 0 : (mouse.y - 0.5) * 24;
  const textShiftX = reducedMotion ? 0 : (mouse.x - 0.5) * -12;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pb-16">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center z-10 pt-24">
        <div
          style={{
            transform: `translate3d(${textShiftX}px, 0, 0)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-zinc-900/60 backdrop-blur-lg mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-400/70 animate-pulse" />
            <span className="text-sm tracking-widest uppercase text-zinc-400">
              Digital Art Portfolio · Est. 2018
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-none mb-6">
            <span className="bg-gradient-to-r from-zinc-100 via-violet-200/90 to-slate-300 bg-clip-text text-transparent">
              Art
            </span>
            <br />
            <span className="text-zinc-300">Gallery</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl mb-6">
            A living constellation of digital works — curated collections,
            studio artists, and immersive exhibitions under one starlit roof.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {heroCategories.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs uppercase tracking-widest border border-white/5 bg-zinc-900/50 text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mb-10">
            <button
              type="button"
              onClick={() => scrollToSection("#gallery")}
              className="px-8 py-4 rounded-2xl bg-violet-900/80 border border-violet-700/30 text-zinc-100 font-semibold hover:bg-violet-800/80 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg shadow-black/40"
            >
              Explore Gallery
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("#collections")}
              className="px-8 py-4 rounded-2xl border border-zinc-700/80 bg-zinc-900/50 backdrop-blur-lg text-zinc-300 hover:bg-zinc-800/60 hover:text-zinc-100 hover:scale-[1.03] active:scale-[0.98] transition"
            >
              View Collections
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {artistsPreview.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-9 h-9 rounded-full border-2 border-zinc-950 object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              <span className="text-zinc-300 font-medium">15K+</span> collectors
              · <span className="text-zinc-300 font-medium">120+</span> artworks
            </p>
          </div>
        </div>

        <div className="relative flex justify-center items-center min-h-[480px]">
          <div
            className="absolute w-[450px] h-[450px] bg-gradient-to-r from-violet-950/50 to-slate-900/40 rounded-full blur-3xl"
            style={{
              transform: `translate3d(${parallaxX * 0.6}px, ${parallaxY * 0.6}px, 0)`,
              transition: "transform 0.2s ease-out",
            }}
          />

          {floatingPieces.map((piece, index) => {
            const offsets = [
              { top: "8%", left: "-4%", size: "w-28 h-36" },
              { bottom: "12%", right: "-6%", size: "w-32 h-40" },
              { top: "55%", left: "-10%", size: "w-24 h-32" },
            ];
            const offset = offsets[index];

            return (
              <button
                key={piece.title}
                type="button"
                onClick={() => scrollToSection("#gallery")}
                className={`absolute hidden md:block ${offset.size} rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/40 hover:scale-105 transition z-20`}
                style={{
                  top: offset.top,
                  bottom: offset.bottom,
                  left: offset.left,
                  right: offset.right,
                  transform: `translate3d(${parallaxX * (index + 1) * 0.3}px, ${parallaxY * (index + 1) * 0.3}px, 0)`,
                }}
              >
                <img
                  src={piece.image}
                  alt={piece.title}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
                />
              </button>
            );
          })}

          <div
            className="relative group cursor-pointer z-10"
            style={{
              transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
              transition: "transform 0.2s ease-out",
            }}
            onClick={() => scrollToSection("#gallery")}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                scrollToSection("#gallery");
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Scroll to featured gallery"
          >
            <img
              src={HERO_IMAGE}
              alt="Hero Art"
              className="w-[340px] md:w-[450px] rounded-[2rem] object-cover shadow-2xl shadow-black/50 border border-white/5 group-hover:scale-[1.03] transition duration-500"
            />

            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-violet-950/25 via-transparent to-slate-950/20 group-hover:from-violet-900/30 transition-colors duration-500" />

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-zinc-950/80 border border-white/10 backdrop-blur-md text-xs uppercase tracking-widest text-zinc-400 whitespace-nowrap">
              Spring Exhibition · Live Now
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const artistsPreview = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
];
