import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";
import ScrollReveal from "../components/ScrollReveal";
import { siteConfig } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { whatsappMessages, whatsappUrl } from "../utils/whatsapp";

export default function ContactPage() {
  usePageMeta({
    title: "Contact",
    description:
      "Contact Prashrey Palette Art Studio — WhatsApp, email, Instagram, YouTube, and commission enquiries.",
  });

  return (
    <div className="px-6 pb-24 pt-28 lg:px-8 lg:pb-32 lg:pt-32">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#c9a962]">
            Get in Touch
          </p>
          <h1 className="mt-4 font-display text-4xl text-[#f4f1ec] md:text-6xl">
            Contact
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-[#f4f1ec]/55">
            Commissions, acquisitions, and general enquiries — we welcome thoughtful
            conversations from collectors, designers, and art lovers worldwide.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-16 grid gap-6 sm:grid-cols-2" delay={0.1}>
          <a
            href={whatsappUrl(whatsappMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/5 bg-[#0e0e10]/50 p-8 transition-all hover:border-[#25D366]/40"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
              WhatsApp
            </p>
            <p className="mt-2 font-display text-xl text-[#f4f1ec] group-hover:text-[#25D366]">
              Message on WhatsApp
            </p>
            <p className="mt-2 font-sans text-sm text-[#f4f1ec]/45">
              Fastest way to enquire about artworks and commissions.
            </p>
          </a>

          <a
            href={`mailto:${siteConfig.email}`}
            className="group rounded-2xl border border-white/5 bg-[#0e0e10]/50 p-8 transition-all hover:border-[#c9a962]/40"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
              Email
            </p>
            <p className="mt-2 font-display text-xl text-[#f4f1ec] group-hover:text-[#c9a962]">
              {siteConfig.email}
            </p>
            <p className="mt-2 font-sans text-sm text-[#f4f1ec]/45">
              For detailed proposals and formal enquiries.
            </p>
          </a>
        </ScrollReveal>

        <ScrollReveal className="mt-12 grid gap-4 sm:grid-cols-2" delay={0.12}>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/5 bg-[#0e0e10]/50 p-6 transition-all hover:border-[#c9a962]/40"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
              Instagram
            </p>
            <p className="mt-2 font-display text-lg text-[#f4f1ec] group-hover:text-[#c9a962]">
              @prashreypalette
            </p>
          </a>
          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/5 bg-[#0e0e10]/50 p-6 transition-all hover:border-[#c9a962]/40"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
              YouTube
            </p>
            <p className="mt-2 font-display text-lg text-[#f4f1ec] group-hover:text-[#c9a962]">
              Watch studio videos
            </p>
          </a>
        </ScrollReveal>

        <ScrollReveal className="mt-12 text-center" delay={0.15}>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
            Follow the studio
          </p>
          <SocialLinks className="mt-6 justify-center" size="lg" />
        </ScrollReveal>

        <ScrollReveal className="mt-16 rounded-2xl border border-[#c9a962]/20 bg-[#c9a962]/5 p-10 text-center">
          <h2 className="font-display text-2xl text-[#f4f1ec]">
            Interested in a custom piece?
          </h2>
          <p className="mx-auto mt-3 max-w-md font-sans text-sm text-[#f4f1ec]/50">
            Commission a personalised artwork designed for your space.
          </p>
          <Link
            to="/commission"
            className="mt-6 inline-block rounded-full bg-[#c9a962] px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-[#08080a] transition-transform hover:scale-[1.02]"
          >
            Commission enquiry
          </Link>
        </ScrollReveal>

        <ScrollReveal className="mt-12 text-center">
          <p className="font-sans text-sm text-[#f4f1ec]/40">{siteConfig.studio.address}</p>
        </ScrollReveal>
      </div>
    </div>
  );
}
