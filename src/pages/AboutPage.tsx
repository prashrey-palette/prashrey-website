import ScrollReveal from "../components/ScrollReveal";
import { usePageMeta } from "../hooks/usePageMeta";

const milestones = [
  { year: "2018", label: "Studio founded — a dedicated space for painting and exploration" },
  { year: "2020", label: "First solo exhibition showcasing figurative and devotional works" },
  { year: "2022", label: "Expanded into commissioned pieces for homes and corporate spaces" },
  { year: "2025", label: "Growing collection of acrylic, watercolor, and mixed-media originals" },
];

export default function AboutPage() {
  usePageMeta({
    title: "About",
    description:
      "Meet the artist behind Prashrey Palette Art Studio — biography, philosophy, and creative journey.",
  });

  return (
    <div className="px-6 pb-24 pt-28 lg:px-8 lg:pb-32 lg:pt-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 text-center md:mb-20">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#c9a962]">
            The Artist
          </p>
          <h1 className="mt-4 font-display text-4xl text-[#f4f1ec] md:text-6xl">
            About Prashrey
          </h1>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-2xl border border-white/5">
              <img
                src="/artist-placeholder.jpg"
                alt="Prashrey — artist portrait"
                loading="eager"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop";
                }}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/50 to-transparent" />
            </div>
            <p className="mt-4 text-center font-sans text-xs text-[#f4f1ec]/35">
              Replace with your photo: public/artist-placeholder.jpg
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-[#c9a962]">
              Prashrey
            </p>
            <h2 className="mt-3 font-display text-3xl text-[#f4f1ec] md:text-4xl">
              Contemporary Artist &amp; Founder
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-[#f4f1ec]/60">
              [Placeholder — Short introduction] Prashrey is a contemporary artist
              whose work spans devotional themes, nature, and expressive figurative
              compositions. Based in Mumbai, the studio welcomes collectors,
              interior designers, and patrons seeking original art with soul.
            </p>

            <div className="mt-10 space-y-8">
              <div>
                <h3 className="font-display text-xl text-[#f4f1ec]">Biography</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#f4f1ec]/55 md:text-base">
                  [Placeholder — Detailed biography] From early experiments with
                  color and form to a mature studio practice, Prashrey has developed
                  a distinctive visual language rooted in Indian cultural motifs and
                  contemporary aesthetics. Each piece is hand-crafted with patience,
                  layering, and an eye for luminous detail.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl text-[#f4f1ec]">
                  Artistic Philosophy
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#f4f1ec]/55 md:text-base">
                  [Placeholder] Art should invite pause — a moment of beauty,
                  devotion, or wonder in everyday life. The studio believes in
                  intentional mark-making: every stroke carries meaning, and every
                  finished work is meant to live harmoniously in its chosen space.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl text-[#f4f1ec]">
                  Journey as an Artist
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#f4f1ec]/55 md:text-base">
                  [Placeholder] What began as a personal passion evolved into a
                  professional studio serving clients across India and abroad.
                  Today, the practice includes original paintings, custom
                  commissions, and collaborative projects with designers and galleries.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl text-[#f4f1ec]">Background</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#f4f1ec]/55 md:text-base">
                  [Placeholder] Trained through years of studio practice and
                  mentorship, with influences ranging from classical Indian art to
                  modern contemporary expression. Mediums include acrylic, watercolor,
                  oil, sketch, and mixed media.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-24 border-t border-white/5 pt-20">
          <h3 className="font-sans text-xs uppercase tracking-[0.4em] text-[#c9a962]">
            Milestones
          </h3>
          <div className="mt-10">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="flex flex-col gap-2 border-b border-white/5 py-6 sm:flex-row sm:gap-16"
              >
                <span className="font-display text-2xl text-[#c9a962] sm:w-24">
                  {m.year}
                </span>
                <span className="font-sans text-sm text-[#f4f1ec]/70 md:text-base">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
