import { useState } from "react";
import { faqItems } from "../../data/faq";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative z-10 py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Questions"
            title="Frequently Asked"
            description="Everything you need to know about commissions, licensing, and exhibitions."
          />
        </ScrollReveal>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <ScrollReveal key={item.question} delayMs={index * 60}>
                <div className="rounded-2xl border border-white/5 bg-zinc-900/40 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-zinc-800/30 transition"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-zinc-100">{item.question}</span>
                    <span className="text-violet-300/70 text-xl shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="px-5 pb-5 text-zinc-500 leading-relaxed text-sm">
                      {item.answer}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
