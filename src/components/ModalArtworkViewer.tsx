import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { Artwork } from "../types/artwork";

type ModalArtworkViewerProps = {
  artwork: Artwork | null;
  onClose: () => void;
};

export default function ModalArtworkViewer({
  artwork,
  onClose,
}: ModalArtworkViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = useMemo(
    () => artwork?.images ?? (artwork ? [artwork.image] : []),
    [artwork],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [artwork?.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!artwork || images.length <= 1) return;
      if (e.key === "ArrowLeft") {
        setActiveIndex((i) => (i - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((i) => (i + 1) % images.length);
      }
    };

    if (artwork) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [artwork, images.length, onClose]);

  const hasMultiple = images.length > 1;

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal
          aria-labelledby="artwork-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#08080a]/90 backdrop-blur-md"
            onClick={onClose}
            aria-label="Close artwork view"
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e10] shadow-2xl md:grid-cols-2"
          >
            <div className="relative flex max-h-[45vh] flex-col bg-[#08080a] md:max-h-[90vh]">
              <div className="relative flex-1">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[activeIndex]}
                    src={images[activeIndex]}
                    alt={`${artwork.title}${hasMultiple ? ` — view ${activeIndex + 1}` : ""}`}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="h-full w-full object-contain"
                  />
                </AnimatePresence>

                {hasMultiple && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex(
                          (i) => (i - 1 + images.length) % images.length,
                        )
                      }
                      className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#08080a]/80 text-[#f4f1ec]/80 backdrop-blur transition-colors hover:text-[#f4f1ec]"
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex((i) => (i + 1) % images.length)
                      }
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#08080a]/80 text-[#f4f1ec]/80 backdrop-blur transition-colors hover:text-[#f4f1ec]"
                      aria-label="Next image"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {hasMultiple && (
                <div className="flex items-center justify-center gap-2 border-t border-white/10 px-4 py-3">
                  {images.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        index === activeIndex
                          ? "w-5 bg-[#c9a962]"
                          : "bg-[#f4f1ec]/30 hover:bg-[#f4f1ec]/50"
                      }`}
                      aria-label={`View image ${index + 1} of ${images.length}`}
                      aria-current={index === activeIndex}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center overflow-y-auto p-8 md:p-10">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#c9a962]">
                {artwork.category}
              </p>
              <h2
                id="artwork-modal-title"
                className="mt-3 font-display text-3xl text-[#f4f1ec] md:text-4xl"
              >
                {artwork.title}
              </h2>
              <p className="mt-6 font-sans text-sm leading-relaxed text-[#f4f1ec]/60">
                {artwork.description}
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 font-sans text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
                    Medium
                  </dt>
                  <dd className="mt-1 text-[#f4f1ec]/80">{artwork.medium}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
                    Dimensions
                  </dt>
                  <dd className="mt-1 text-[#f4f1ec]/80">
                    {artwork.dimensions}
                  </dd>
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
              <button
                type="button"
                onClick={onClose}
                className="mt-8 self-start rounded-full border border-[#c9a962]/40 px-6 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-[#c9a962] transition-colors hover:bg-[#c9a962]/10"
              >
                Close
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#08080a]/80 text-[#f4f1ec]/70 backdrop-blur transition-colors hover:text-[#f4f1ec]"
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
