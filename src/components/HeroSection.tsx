import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { artworks } from "../data/artworks";
import BrandLogo from "./BrandLogo";
import HeroTextureBackground from "./HeroTextureBackground";
import OptimizedImage from "./OptimizedImage";

const featuredArtwork = artworks.find((artwork) => artwork.title === "Shiva-Shakti") ?? artworks[0];
const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F7F3EB]">
      <HeroTextureBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-28 pt-28 lg:px-8 lg:pb-24 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
              <div>
                  <BrandLogo variant="hero" className="mx-auto lg:mx-0" />
              </div>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} className="mt-7 font-sans text-[10px] uppercase tracking-[0.36em] text-[#A75338]">
              Mumbai · India · Fine Art Studio
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15, ease }} className="mt-5 font-display text-4xl leading-[1.02] text-[#282820] sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-7xl">
              A quiet studio<br />for vivid stories.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease }} className="mt-6 max-w-lg font-sans text-base leading-relaxed text-[#282820]/70 md:text-lg lg:mt-8">
              Original paintings shaped by memory, texture, and the patient ritual of making. Welcome to Prashrey Palette Art Studio.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45, ease }} className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row lg:mt-12">
              <Link to="/portfolio" className="rounded-full bg-[#282820] px-8 py-3.5 text-center font-sans text-xs uppercase tracking-[0.22em] text-[#F7F3EB] shadow-lg shadow-[#282820]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A75338]">
                Explore Gallery
              </Link>
              <Link to="/commission" className="rounded-full border border-[#B88435]/60 bg-white/40 px-8 py-3.5 text-center font-sans text-xs uppercase tracking-[0.22em] text-[#282820] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A75338] hover:bg-white/80">
                Commission an Artwork
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.35, ease }} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <Link to={`/portfolio/${featuredArtwork.id}`} className="group block" aria-label={`View ${featuredArtwork.title}`}>
              <motion.div animate={reducedMotion ? {} : { y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="relative">
                <div className="absolute -left-6 top-10 h-32 w-32 rounded-full border border-[#B88435]/30" />
                <div className="absolute -right-3 -top-4 h-24 w-24 rounded-full bg-[#A75338]/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-sm border-[10px] border-[#6E5131] bg-[#6E5131] p-2 shadow-2xl shadow-[#282820]/25 md:border-[14px] md:p-3">
                  <div className="overflow-hidden rounded-sm border border-[#F7F3EB]/60">
                    <div className="aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
                      <img
                        src={featuredArtwork.image}
                        alt={featuredArtwork.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"/>
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-center lg:text-left">
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#A75338]">On the easel · featured work</p>
                  <p className="mt-1 font-display text-2xl text-[#282820] md:text-3xl">{featuredArtwork.title}</p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <motion.span animate={reducedMotion ? {} : { y: [0, 6, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} className="font-display text-lg text-[#A75338]/80" aria-hidden>↓</motion.span>
        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#282820]/45">Scroll to Explore</span>
      </motion.div>
    </section>
  );
}
