import { Link } from "react-router-dom";
import { footerLinks } from "../data/navigation";
import { siteConfig } from "../config/site";
import SocialLinks from "./SocialLinks";

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
            Contemporary art for discerning spaces. Crafted with intention in{" "}
            {siteConfig.studio.city}.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="Footer navigation">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
            Navigate
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="font-sans text-sm text-[#f4f1ec]/50 transition-colors hover:text-[#c9a962]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#f4f1ec]/40">
            Contact
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-sans text-sm text-[#f4f1ec]/50 transition-colors hover:text-[#c9a962]"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <Link
                to="/contact"
                className="font-sans text-sm text-[#f4f1ec]/50 transition-colors hover:text-[#c9a962]"
              >
                Contact page
              </Link>
            </li>
            <li>
              <Link
                to="/commission"
                className="font-sans text-sm text-[#f4f1ec]/50 transition-colors hover:text-[#c9a962]"
              >
                Commission enquiry
              </Link>
            </li>
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
