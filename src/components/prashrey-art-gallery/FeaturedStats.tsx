import { featuredStats } from "../../data/stats";
import ScrollReveal from "./ScrollReveal";

export default function FeaturedStats() {
  return (
    <section className="relative z-10 px-6 -mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {featuredStats.map((stat, index) => (
          <ScrollReveal key={stat.label} delayMs={index * 100}>
            <div className="backdrop-blur-xl bg-zinc-900/40 border border-white/5 rounded-3xl p-6 hover:-translate-y-2 hover:border-violet-700/30 hover:shadow-lg hover:shadow-violet-950/30 transition-all duration-500 cursor-default">
              <h2 className="text-4xl font-black bg-gradient-to-r from-violet-200/90 to-slate-400 bg-clip-text text-transparent">
                {stat.value}
              </h2>
              <p className="text-zinc-500 mt-2 uppercase tracking-widest text-sm">
                {stat.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
