import { motion } from "framer-motion";
import { testimonials } from "../data/testimonials";
import ScrollReveal from "./ScrollReveal";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#c9a962]">
            Testimonials
          </p>
          <h2 className="mt-4 font-display text-4xl text-[#f4f1ec] md:text-5xl">
            Words from our collectors
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-xl border border-white/5 bg-[#0e0e10]/60 p-8 backdrop-blur-sm"
            >
              <p className="font-display text-lg leading-relaxed text-[#f4f1ec]/90 md:text-xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-white/5 pt-6">
                <cite className="not-italic">
                  <span className="block font-sans text-sm text-[#f4f1ec]">
                    {t.author}
                  </span>
                  <span className="mt-1 block font-sans text-xs text-[#f4f1ec]/40">
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
