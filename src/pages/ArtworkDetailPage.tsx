import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";
import ScrollReveal from "../components/ScrollReveal";
import { artworks } from "../data/artworks";
import { usePageMeta } from "../hooks/usePageMeta";
import { whatsappMessages, whatsappUrl } from "../utils/whatsapp";

export default function ArtworkDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/portfolio");
    }
  };

  const artwork = useMemo(
    () => artworks.find((a) => a.id === Number(id)),
    [id],
  );

  const images = artwork?.images ?? (artwork ? [artwork.image] : []);
  const hasMultiple = images.length > 1;

  usePageMeta({
    title: artwork?.title ?? "Artwork",
    description: artwork?.description,
  });

  useEffect(() => {
    setActiveIndex(0);
  }, [artwork?.id]);

  if (!artwork) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-28 text-center">
        <h1 className="font-display text-3xl text-[#f4f1ec]">Artwork not found</h1>
        <Link
          to="/portfolio"
          className="mt-6 font-sans text-sm uppercase tracking-[0.2em] text-[#c9a962]"
        >
          Back to portfolio
        </Link>
      </div>
    );
  }

  const goToPrevious = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const goToNext = () => setActiveIndex((i) => (i + 1) % images.length);

  const availabilityColor =
    artwork.availability === "Available"
      ? "text-emerald-400/90 border-emerald-400/30 bg-emerald-400/10"
      : artwork.availability === "Sold"
        ? "text-[#f4f1ec]/50 border-white/10 bg-white/5"
        : "text-[#c9a962] border-[#c9a962]/30 bg-[#c9a962]/10";

  return (
    <div className="px-6 pb-24 pt-28 lg:px-8 lg:pb-32 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={handleBack}
          className="mb-8 font-sans text-xs uppercase tracking-[0.2em] text-[#f4f1ec]/50 transition-colors hover:text-[#c9a962]"
        >
          ← Back
        </button>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <div
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e10]"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(e) => {
                if (touchStartX.current === null || !hasMultiple) return;
                const delta =
                  (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
                if (Math.abs(delta) > 48) {
                  if (delta < 0) goToNext();
                  else goToPrevious();
                }
                touchStartX.current = null;
              }}
            >
              <div className="aspect-[4/5] sm:aspect-[3/4]">
                <OptimizedImage
                  key={images[activeIndex]}
                  src={images[activeIndex]}
                  alt={`${artwork.title} — view ${activeIndex + 1}`}
                  priority={activeIndex === 0}
                  objectFit="contain"
                  className="h-full w-full"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {hasMultiple && (
                <>
                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#08080a]/80 text-[#f4f1ec]/80 backdrop-blur hover:text-[#f4f1ec]"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#08080a]/80 text-[#f4f1ec]/80 backdrop-blur hover:text-[#f4f1ec]"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                  <div className="flex items-center justify-center gap-2 border-t border-white/10 px-4 py-3">
                    {images.map((src, index) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === activeIndex
                            ? "w-5 bg-[#c9a962]"
                            : "w-2 bg-[#f4f1ec]/30 hover:bg-[#f4f1ec]/50"
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-[#c9a962]">
              {artwork.category}
            </p>
            <h1 className="mt-3 font-display text-4xl text-[#f4f1ec] md:text-5xl">
              {artwork.title}
            </h1>

            <span
              className={`mt-4 inline-block rounded-full border px-3 py-1 font-sans text-[10px] uppercase tracking-[0.15em] ${availabilityColor}`}
            >
              {artwork.availability}
            </span>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 font-sans text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
                  Medium
                </dt>
                <dd className="mt-1 text-[#f4f1ec]/80">{artwork.medium}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
                  Size
                </dt>
                <dd className="mt-1 text-[#f4f1ec]/80">{artwork.dimensions}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
                  Year
                </dt>
                <dd className="mt-1 text-[#f4f1ec]/80">{artwork.year}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
                  Category
                </dt>
                <dd className="mt-1 text-[#f4f1ec]/80">{artwork.category}</dd>
              </div>
            </dl>

            <p className="mt-8 font-sans text-sm leading-relaxed text-[#f4f1ec]/55 md:text-base">
              {artwork.description}
            </p>

            <div className="mt-10 rounded-2xl border border-[#c9a962]/25 bg-[#c9a962]/5 p-8">
              <h2 className="font-display text-xl text-[#f4f1ec]">
                Interested in this artwork?
              </h2>
              <p className="mt-2 font-sans text-sm text-[#f4f1ec]/50">
                Enquire directly on WhatsApp for pricing, shipping, and availability.
              </p>
              <a
                href={whatsappUrl(whatsappMessages.artwork(artwork.title))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-[#25D366] px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-white transition-transform hover:scale-[1.02]"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-20 rounded-2xl border border-white/5 bg-[#0e0e10]/50 p-10 md:p-12">
          <h2 className="font-display text-2xl text-[#f4f1ec] md:text-3xl">
            Looking for a similar artwork?
          </h2>
          <p className="mt-4 max-w-3xl font-sans text-sm leading-relaxed text-[#f4f1ec]/55 md:text-base">
            If this artwork has already been sold or you&apos;re looking for something
            personalised, I also create custom commissioned artworks designed
            specifically for your home, office, or interior space.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={whatsappUrl(whatsappMessages.commission)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#c9a962] px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-[#08080a] transition-transform hover:scale-[1.02]"
            >
              Request a Commission
            </a>
            <Link
              to="/commission"
              className="rounded-full border border-[#f4f1ec]/20 px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-[#f4f1ec] transition-colors hover:border-[#c9a962]/50 hover:text-[#c9a962]"
            >
              Learn about commissions
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
