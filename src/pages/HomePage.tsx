import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import ScrollReveal from "../components/ScrollReveal";
import TestimonialsSection from "../components/TestimonialsSection";
import { artworks } from "../data/artworks";
import { usePageMeta } from "../hooks/usePageMeta";
import OptimizedImage from "../components/OptimizedImage";

export default function HomePage() {
  usePageMeta({
    title: "Home",
    description:
      "Prashrey Palette Art Studio — contemporary art for collectors, interior designers, and commission clients.",
  });

  const featured = artworks.filter((a) => a.featured).slice(0, 6);

  return (
    <>
      <HeroSection />
      <section className="relative px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#c9a962]">
                Featured Works
              </p>
              <h2 className="mt-4 font-display text-4xl text-[#f4f1ec] md:text-5xl">
                Selected from the studio
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="rounded-full border border-[#c9a962]/40 px-6 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-[#c9a962] transition-colors hover:bg-[#c9a962]/10"
            >
              View full portfolio
            </Link>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((artwork, index) => (
              <ScrollReveal key={artwork.id} delay={index * 0.05}>
                <Link
                  to={`/portfolio/${artwork.id}`}
                  className="group block overflow-hidden rounded-lg border border-white/5 bg-[#121214]/50 transition-all duration-500 hover:border-[#c9a962]/25 hover:shadow-lg hover:shadow-[#c9a962]/5"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <OptimizedImage
                      src={artwork.image}
                      alt={artwork.title}
                      className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#c9a962]">
                      {artwork.category}
                    </p>
                    <h3 className="mt-1 font-display text-xl text-[#f4f1ec]">
                      {artwork.title}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <TestimonialsSection />
    </>
  );
}
