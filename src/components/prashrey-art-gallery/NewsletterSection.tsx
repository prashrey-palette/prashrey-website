import ScrollReveal from "./ScrollReveal";

export default function NewsletterSection() {
  return (
    <section className="relative z-10 px-6 pb-8">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto rounded-3xl border border-white/5 bg-zinc-900/40 p-8 md:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-violet-300/70 mb-3">
              Stay in the loop
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-2">
              Get new drops & exhibition invites
            </h3>
            <p className="text-zinc-500 text-sm">
              Monthly digest — no spam. Unsubscribe anytime.
            </p>
          </div>
          <form
            className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-md"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 px-5 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-700/40 transition"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-violet-900/80 border border-violet-700/30 text-zinc-100 font-medium hover:bg-violet-800/80 transition shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </ScrollReveal>
    </section>
  );
}
