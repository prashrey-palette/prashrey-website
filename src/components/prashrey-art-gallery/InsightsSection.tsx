import { insights } from "../../data/insights";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

export default function InsightsSection() {
  return (
    <section id="insights" className="relative z-10 py-28 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Journal"
            title="Studio Insights"
            description="Essays and notes from our creative process, exhibition design, and digital craft."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((post, index) => (
            <ScrollReveal key={post.title} delayMs={index * 100}>
              <article className="group rounded-3xl border border-white/5 bg-zinc-900/40 overflow-hidden hover:border-violet-700/25 transition">
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-zinc-500 mb-3">
                    <span className="text-violet-300/70">{post.tag}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-violet-200/90 transition">
                    {post.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <p className="text-zinc-600 text-xs">{post.date}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
