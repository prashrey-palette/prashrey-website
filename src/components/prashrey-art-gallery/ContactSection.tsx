import ScrollReveal from "./ScrollReveal";

export default function ContactSection() {
  return (
    <section id="contact" className="relative z-10 px-6 pb-24 scroll-mt-24">
      <ScrollReveal>
        <div className="max-w-5xl mx-auto rounded-[3rem] border border-white/5 bg-zinc-900/40 backdrop-blur-2xl overflow-hidden relative p-12 md:p-20 text-center group hover:border-violet-700/25 transition-colors duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-950/20 via-transparent to-slate-900/20 group-hover:from-violet-900/25 transition-colors duration-500" />

          <h2 className="relative text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-zinc-100 via-violet-200/90 to-slate-300 bg-clip-text text-transparent">
            Let&apos;s Create Magic.
          </h2>

          <p className="relative text-zinc-400 max-w-2xl mx-auto text-lg mb-10">
            Open for collaborations, exhibitions, digital experiences, and
            immersive visual storytelling projects.
          </p>

          <div className="relative flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@prashrey.gallery"
              className="px-8 py-4 rounded-2xl bg-violet-900/80 border border-violet-700/30 text-zinc-100 font-semibold hover:bg-violet-800/80 hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              Contact Gallery
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-2xl border border-zinc-700/80 text-zinc-300 hover:bg-zinc-800/60 hover:text-zinc-100 hover:scale-[1.03] active:scale-[0.98] transition"
            >
              Instagram Showcase
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
