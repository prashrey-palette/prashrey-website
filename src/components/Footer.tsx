import { footerLinks, socialLinks } from "../data/navigation";
import { scrollToSection } from "../utils/smoothScroll";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 px-6 py-16 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-xl text-[#f4f1ec]">Prashrey Palette</p>
          <p className="mt-1 font-sans text-xs uppercase tracking-[0.3em] text-[#f4f1ec]/40">
            Art Studio
          </p>
          <p className="mt-4 max-w-xs font-sans text-xs text-[#f4f1ec]/35">
            Contemporary art for discerning spaces. Crafted with intention in
            Mumbai.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
            Navigate
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => scrollToSection(link.href)}
                  className="font-sans text-sm text-[#f4f1ec]/50 transition-colors hover:text-[#c9a962]"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
            Connect
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-[#f4f1ec]/50 transition-colors hover:text-[#c9a962]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl border-t border-white/5 pt-8 text-center md:text-left">
        <p className="font-sans text-xs text-[#f4f1ec]/30">
          © {year} Prashrey Palette Art Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
