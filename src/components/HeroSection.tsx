import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const tagline =
  "Where pigment meets poetry — contemporary works crafted with intention, depth, and luminous restraint.";

export default function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col justify-center px-6 pt-28 pb-20 lg:px-8">
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
          <Link
            to="/portfolio"
            className="rounded-full bg-[#c9a962] px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-[#08080a] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            View Portfolio
          </Link>
          <Link
            to="/about"
            className="rounded-full border border-[#f4f1ec]/20 px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-[#f4f1ec] transition-all hover:border-[#c9a962]/50 hover:text-[#c9a962]"
          >
            About the Artist
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-transparent px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-[#f4f1ec]/60 underline-offset-4 transition-colors hover:text-[#c9a962] hover:underline"
          >
            Contact
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#f4f1ec]/30">
          Explore
        </span>
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-gradient-to-b from-[#c9a962]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
