import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { artworks } from "../data/artworks";
import BrandLogo from "./BrandLogo";
import HeroTextureBackground from "./HeroTextureBackground";
import OptimizedImage from "./OptimizedImage";

const featuredArtwork =
  artworks.find((a) => a.featured) ?? artworks[0];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2D4724]">
      <HeroTextureBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-28 pt-28 lg:px-8 lg:pb-24 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Left — brand & copy */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <BrandLogo variant="hero" className="mx-auto lg:mx-0" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease }}
              className="mt-10 font-display text-4xl leading-[1.08] text-[#F5F5F0] sm:text-5xl md:text-6xl lg:mt-12 lg:text-[3.5rem] xl:text-7xl"
            >
              Every Canvas Tells A Story
            </motion.h1>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease }}
              className="mt-6 max-w-lg font-sans text-base leading-relaxed text-[#F5F5F0]/75 md:text-lg lg:mt-8"
            >
              Original paintings inspired by nature, emotion, culture, and
              timeless artistic expression.
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease }}
              className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row lg:mt-12"
            >
              <Link
                to="/portfolio"
                className="group rounded-full bg-[#C9A24A] px-8 py-3.5 text-center font-sans text-xs uppercase tracking-[0.22em] text-[#2D4724] shadow-lg shadow-black/15 transition-all duration-300 hover:bg-[#D4B366] hover:shadow-[#C9A24A]/25"
              >
                Explore Gallery
              </Link>
              <Link
                to="/commission"
                className="rounded-full border border-[#C9A24A]/70 bg-transparent px-8 py-3.5 text-center font-sans text-xs uppercase tracking-[0.22em] text-[#F5F5F0] transition-all duration-300 hover:border-[#C9A24A] hover:bg-[#C9A24A]/10"
              >
                Commission an Artwork
              </Link>
            </motion.div>
          </div>

          {/* Right — featured artwork */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <Link
              to={`/portfolio/${featuredArtwork.id}`}
              className="group block"
              aria-label={`View ${featuredArtwork.title}`}
            >
              <motion.div
                animate={
                  reducedMotion
                    ? {}
                    : { y: [0, -10, 0] }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Frame */}
                <div className="relative overflow-hidden rounded-sm border border-[#C9A24A]/30 bg-[#243B1D] p-3 shadow-2xl shadow-black/30 md:p-4">
                  <div className="overflow-hidden rounded-sm border border-[#F5F5F0]/10">
                    <div className="aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
                      <OptimizedImage
                        src={featuredArtwork.image}
                        alt={featuredArtwork.title}
                        priority
                        className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 90vw, 45vw"
                      />
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-5 text-center lg:text-left">
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C9A24A]">
                    Featured Work
                  </p>
                  <p className="mt-1 font-display text-xl text-[#F5F5F0] md:text-2xl">
                    {featuredArtwork.title}
                  </p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <motion.span
          animate={reducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="font-display text-lg text-[#C9A24A]/80"
          aria-hidden
        >
          ↓
        </motion.span>
        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#F5F5F0]/45">
          Scroll to Explore
        </span>
      </motion.div>
    </section>
  );
}
