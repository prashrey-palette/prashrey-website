import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { artworks } from "../data/artworks";
import BrandMark from "./BrandMark";
import HeroTextureBackground from "./HeroTextureBackground";
import OptimizedImage from "./OptimizedImage";

const featuredArtwork =
  artworks.find((a) => a.featured) ?? artworks[0];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[#2f4222]">
      <HeroTextureBackground />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-4 pb-24 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="w-full"
            >
              <BrandMark variant="hero" showName className="mx-auto lg:mx-0" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease }}
              className="mt-8 font-display text-3xl leading-[1.1] text-[#F5F5F0] sm:text-4xl md:text-5xl lg:mt-10 lg:text-6xl xl:text-7xl"
            >
              Every Canvas Tells A Story
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.24, ease }}
              className="mt-5 max-w-lg font-sans text-sm leading-relaxed text-[#F5F5F0]/75 sm:text-base md:text-lg lg:mt-6"
            >
              Original paintings inspired by nature, emotion, culture, and
              timeless artistic expression.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.36, ease }}
              className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row lg:mt-10"
            >
              <Link
                to="/portfolio"
                className="rounded-full bg-[#C9A24A] px-6 py-3.5 text-center font-sans text-xs uppercase tracking-[0.2em] text-[#2f4222] shadow-lg shadow-black/15 transition-all hover:bg-[#D4B366] sm:px-8"
              >
                Explore Gallery
              </Link>
              <Link
                to="/commission"
                className="rounded-full border border-[#C9A24A]/70 px-6 py-3.5 text-center font-sans text-xs uppercase tracking-[0.2em] text-[#F5F5F0] transition-all hover:border-[#C9A24A] hover:bg-[#C9A24A]/10 sm:px-8"
              >
                Commission an Artwork
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.28, ease }}
            className="relative mx-auto w-full max-w-[320px] sm:max-w-md lg:max-w-none"
          >
            <Link
              to={`/portfolio/${featuredArtwork.id}`}
              className="group block"
              aria-label={`View ${featuredArtwork.title}`}
            >
              <motion.div
                animate={reducedMotion ? {} : { y: [0, -8, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="overflow-hidden rounded-sm border border-[#C9A24A]/30 bg-[#253618] p-2.5 shadow-2xl shadow-black/30 sm:p-4">
                  <div className="overflow-hidden rounded-sm border border-[#F5F5F0]/10">
                    <div className="aspect-[4/5] overflow-hidden">
                      <OptimizedImage
                        src={featuredArtwork.image}
                        alt={featuredArtwork.title}
                        priority
                        className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 85vw, 45vw"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center lg:text-left">
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C9A24A]">
                    Featured Work
                  </p>
                  <p className="mt-1 font-display text-lg text-[#F5F5F0] sm:text-xl md:text-2xl">
                    {featuredArtwork.title}
                  </p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 sm:flex">
        <motion.span
          animate={reducedMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="font-display text-lg text-[#C9A24A]/80"
          aria-hidden
        >
          ↓
        </motion.span>
        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#F5F5F0]/45">
          Scroll to Explore
        </span>
      </div>
    </section>
  );
}
