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
      "Prashrey Palette Art Studio — original paintings inspired by nature, emotion, culture, and timeless artistic expression.",
  });

  const featured = artworks.filter((a) => a.featured).slice(0, 6);

  return (
    <>
      <HeroSection />

      <section className="relative bg-[#F5F5F0] px-6 py-24 text-[#2f4222] lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#C9A24A]">
                Featured Works
              </p>
              <h2 className="mt-4 font-display text-4xl text-[#2f4222] md:text-5xl">
                Selected from the studio
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="rounded-full border border-[#C9A24A]/50 px-6 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-[#2f4222] transition-colors hover:bg-[#C9A24A]/15"
            >
              View full portfolio
            </Link>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((artwork, index) => (
              <ScrollReveal key={artwork.id} delay={index * 0.05}>
                <Link
                  to={`/portfolio/${artwork.id}`}
                  className="group block overflow-hidden rounded-sm border border-[#2f4222]/10 bg-white shadow-md shadow-[#2f4222]/5 transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A24A]/40 hover:shadow-lg hover:shadow-[#C9A24A]/10"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <OptimizedImage
                      src={artwork.image}
                      alt={artwork.title}
                      className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C9A24A]">
                      {artwork.category}
                    </p>
                    <h3 className="mt-1 font-display text-xl text-[#2f4222]">
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
