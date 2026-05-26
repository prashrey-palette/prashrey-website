import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { socialLinks } from "../data/navigation";
import ScrollReveal from "./ScrollReveal";
import SocialIcon from "./SocialIcon";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <ScrollReveal>
            <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#c9a962]">
              Contact
            </p>
            <h2 className="mt-4 font-display text-4xl text-[#f4f1ec] md:text-5xl">
              Begin a conversation
            </h2>
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-[#f4f1ec]/50">
              Commissions, acquisitions, and studio visits — we welcome thoughtful
              inquiries from collectors, curators, and collaborators worldwide.
            </p>

            <address className="mt-10 not-italic">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#f4f1ec]/40">
                Studio Address
              </p>
              <p className="mt-2 font-sans text-sm text-[#f4f1ec]/70">
                42 Palette Lane, Art District
                <br />
                Mumbai, Maharashtra 400001
                <br />
                India
              </p>
            </address>

            <div className="mt-10 flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#f4f1ec]/50 transition-all hover:border-[#c9a962]/40 hover:text-[#c9a962]"
                  aria-label={link.label}
                >
                  <SocialIcon label={link.label} />
                </a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <motion.form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/5 bg-[#0e0e10]/50 p-8 backdrop-blur-sm md:p-10"
            >
              {submitted ? (
                <p className="py-12 text-center font-sans text-sm text-[#c9a962]">
                  Thank you — your message has been received. We will respond
                  within 48 hours.
                </p>
              ) : (
                <>
                  <label className="block">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
                      Email
                    </span>
                    <input
                      type="email"
                      required
                      name="email"
                      placeholder="you@example.com"
                      className="mt-2 w-full border-b border-white/10 bg-transparent py-3 font-sans text-sm text-[#f4f1ec] outline-none transition-colors placeholder:text-[#f4f1ec]/25 focus:border-[#c9a962]/50"
                    />
                  </label>
                  <label className="mt-8 block">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
                      Message
                    </span>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder="Tell us about your inquiry..."
                      className="mt-2 w-full resize-none border-b border-white/10 bg-transparent py-3 font-sans text-sm text-[#f4f1ec] outline-none transition-colors placeholder:text-[#f4f1ec]/25 focus:border-[#c9a962]/50"
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-10 w-full rounded-full bg-[#c9a962] py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-[#08080a] transition-transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Send Message
                  </button>
                </>
              )}
            </motion.form>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-24 text-center">
          <p className="font-display text-2xl text-[#f4f1ec]/80 md:text-3xl">
            Ready to bring a piece into your space?
          </p>
          <a
            href="#gallery"
            className="mt-6 inline-block font-sans text-xs uppercase tracking-[0.25em] text-[#c9a962] transition-opacity hover:opacity-80"
          >
            Explore the gallery →
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
