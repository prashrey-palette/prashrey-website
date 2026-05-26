import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const milestones = [
  { year: "2018", label: "Studio founded in Mumbai" },
  { year: "2020", label: "First solo exhibition — Luminous Forms" },
  { year: "2022", label: "International collector program launched" },
  { year: "2025", label: "Digital & mixed-media residency series" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal>
            <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#c9a962]">
              The Studio
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-[#f4f1ec] md:text-5xl">
              A sanctuary for contemporary expression
            </h2>
            <div className="mt-8 space-y-5 font-sans text-sm leading-relaxed text-[#f4f1ec]/55 md:text-base">
              <p>
                Prashrey Palette Art Studio was born from a belief that art
                should slow time — inviting viewers into spaces of reflection,
                wonder, and emotional resonance.
              </p>
              <p>
                Our philosophy centers on intentional mark-making: every stroke,
                layer, and composition is considered. We embrace both classical
                discipline and experimental courage.
              </p>
              <p>
                From initial sketch to final varnish, each piece moves through a
                deliberate creative process — research, gestural exploration,
                refinement, and quiet contemplation before it leaves the studio.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative overflow-hidden rounded-2xl border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop"
                alt="Artist at work in the studio"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/60 to-transparent" />
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-24 grid gap-12 border-t border-white/5 pt-20 md:grid-cols-3">
          {[
            {
              title: "Artistic Philosophy",
              body: "Balance, restraint, and luminosity guide every composition. We seek the poetic in the precise.",
            },
            {
              title: "Creative Process",
              body: "Sketch, layer, refine, pause. Works evolve through cycles of making and mindful distance.",
            },
            {
              title: "Studio Vision",
              body: "To cultivate a gallery-worthy practice that bridges intimate studio craft and global contemporary dialogue.",
            },
          ].map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <h3 className="font-display text-xl text-[#f4f1ec]">
                {item.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#f4f1ec]/50">
                {item.body}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-24">
          <h3 className="font-sans text-xs uppercase tracking-[0.4em] text-[#c9a962]">
            Milestones
          </h3>
          <div className="mt-10 space-y-0">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex gap-8 border-b border-white/5 py-6 md:gap-16"
              >
                <span className="font-display text-2xl text-[#c9a962] md:w-24">
                  {m.year}
                </span>
                <span className="font-sans text-sm text-[#f4f1ec]/70 md:text-base">
                  {m.label}
                </span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
