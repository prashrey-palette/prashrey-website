import { processSteps } from "../../data/process";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

export default function CreativeProcessSection() {
  return (
    <section className="relative z-10 py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            eyebrow="How We Create"
            title="From Vision to Exhibition"
            description="Every piece follows a deliberate pipeline — balancing experimentation with refined presentation."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <ScrollReveal key={step.step} delayMs={index * 100}>
              <div className="h-full rounded-3xl border border-white/5 bg-zinc-900/40 p-6 hover:border-violet-700/20 transition">
                <span className="text-5xl font-black bg-gradient-to-r from-violet-300/40 to-slate-500/40 bg-clip-text text-transparent">
                  {step.step}
                </span>
                <h3 className="text-xl font-bold text-zinc-100 mt-4 mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
