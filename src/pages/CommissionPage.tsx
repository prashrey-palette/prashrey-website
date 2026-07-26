import { Link } from "react-router-dom";
import { whatsappMessages, whatsappUrl } from "../utils/whatsapp";
import ScrollReveal from "../components/ScrollReveal";
import { usePageMeta } from "../hooks/usePageMeta";

export default function CommissionPage() {
  usePageMeta({
    title: "Commission",
    description:
      "Commission a custom artwork from Prashrey Palette Art Studio — personalised paintings for home, office, and interior spaces.",
  });

  const steps = [
    {
      title: "Share your vision",
      body: "Tell us about the theme, size, colours, and space where the artwork will live.",
    },
    {
      title: "Concept & approval",
      body: "We discuss references, sketches, and direction before beginning the final piece.",
    },
    {
      title: "Creation & delivery",
      body: "Your artwork is crafted in the studio with progress updates, then carefully delivered.",
    },
  ];

  return (
    <div className="px-6 pb-24 pt-28 lg:px-8 lg:pb-32 lg:pt-32">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#c9a962]">
            Custom Art
          </p>
          <h1 className="mt-4 font-display text-4xl text-[#f4f1ec] md:text-6xl">
            Commission Artwork
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-[#f4f1ec]/55">
            [Placeholder] Bring a one-of-a-kind piece into your home, office, or
            sacred space. Commissions are designed around your story, aesthetic, and
            interior — from devotional subjects to landscapes and abstract expressions.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-16 grid gap-8 md:grid-cols-3" delay={0.1}>
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/5 bg-[#0e0e10]/50 p-8"
            >
              <span className="font-display text-3xl text-[#c9a962]/60">
                0{i + 1}
              </span>
              <h2 className="mt-4 font-display text-xl text-[#f4f1ec]">
                {step.title}
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#f4f1ec]/50">
                {step.body}
              </p>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal className="mt-20 rounded-2xl border border-[#c9a962]/20 bg-[#c9a962]/5 p-10 text-center md:p-14">
          <h2 className="font-display text-2xl text-[#f4f1ec] md:text-3xl">
            Ready to begin your commission?
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm text-[#f4f1ec]/55">
            Reach out on WhatsApp to discuss your requirements, timeline, and budget.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={whatsappUrl(whatsappMessages.commission)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#c9a962] px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-[#08080a] transition-transform hover:scale-[1.02]"
            >
              Request a Commission
            </a>
            <Link
              to="/portfolio"
              className="rounded-full border border-[#f4f1ec]/20 px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-[#f4f1ec] transition-colors hover:border-[#c9a962]/50 hover:text-[#c9a962]"
            >
              Browse portfolio
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
