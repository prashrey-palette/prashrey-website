import { motion } from "framer-motion";
import { testimonials } from "../data/testimonials";
import ScrollReveal from "./ScrollReveal";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative bg-[#2D4724] px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#C9A24A]">
            Testimonials
          </p>
          <h2 className="mt-4 font-display text-4xl text-[#F5F5F0] md:text-5xl">
            Words from our collectors
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-sm border border-[#F5F5F0]/10 bg-[#243B1D]/60 p-8 backdrop-blur-sm"
            >
              <p className="font-display text-lg leading-relaxed text-[#F5F5F0]/90 md:text-xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-[#F5F5F0]/10 pt-6">
                <cite className="not-italic">
                  <span className="block font-sans text-sm text-[#F5F5F0]">
                    {t.author}
                  </span>
                  <span className="mt-1 block font-sans text-xs text-[#F5F5F0]/45">
                    {t.role}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
