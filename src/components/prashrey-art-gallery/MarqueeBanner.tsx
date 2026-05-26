import { marqueeItems } from "../../data/marquee";

export default function MarqueeBanner() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <section className="relative z-10 py-6 border-y border-white/5 bg-zinc-950/50 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="mx-8 text-sm uppercase tracking-[0.35em] text-zinc-500 flex items-center gap-8 shrink-0"
          >
            {item}
            <span className="text-violet-500/40">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
