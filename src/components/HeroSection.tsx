import { motion, useReducedMotion } from "framer-motion";
import { scrollToSection } from "../utils/smoothScroll";

const tagline =
  "Where pigment meets poetry — contemporary works crafted with intention, depth, and luminous restraint.";

export default function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center px-6 pt-28 pb-20 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 font-sans text-xs uppercase tracking-[0.4em] text-[#c9a962]"
        >
          Contemporary Art Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display max-w-4xl text-5xl leading-[1.05] text-[#f4f1ec] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Prashrey Palette
          <span className="mt-2 block text-[#f4f1ec]/60">Art Studio</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl font-sans text-base leading-relaxed text-[#f4f1ec]/55 md:text-lg"
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <button
            type="button"
            onClick={() => scrollToSection("#gallery")}
            className="rounded-full bg-[#c9a962] px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-[#08080a] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            View Gallery
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("#collections")}
            className="rounded-full border border-[#f4f1ec]/20 px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-[#f4f1ec] transition-all hover:border-[#c9a962]/50 hover:text-[#c9a962]"
          >
            Explore Collections
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("#contact")}
            className="rounded-full border border-transparent px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-[#f4f1ec]/60 underline-offset-4 transition-colors hover:text-[#c9a962] hover:underline"
          >
            Contact
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#f4f1ec]/30">
          Scroll
        </span>
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-gradient-to-b from-[#c9a962]/60 to-transparent"
        />
      </motion.div>

      <div className="pointer-events-none absolute right-0 top-1/3 hidden h-[420px] w-[320px] overflow-hidden rounded-l-2xl border border-white/5 lg:block">
        <img
          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-transparent to-transparent" />
      </div>
    </section>
  );
}
