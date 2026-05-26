import { testimonials } from "../../data/testimonials";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

export default function TestimonialsSection() {
  return (
    <section className="relative z-10 py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Voices"
            title="What Collectors Say"
            description="Partners and curators who have experienced Prashrey exhibitions firsthand."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <ScrollReveal key={item.name} delayMs={index * 100}>
              <blockquote className="h-full rounded-3xl border border-white/5 bg-zinc-900/40 p-8 flex flex-col">
                <p className="text-zinc-300 leading-relaxed flex-1 text-lg">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-8 pt-6 border-t border-white/5">
                  <p className="font-semibold text-zinc-100">{item.name}</p>
                  <p className="text-zinc-500 text-sm mt-1">{item.role}</p>
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
