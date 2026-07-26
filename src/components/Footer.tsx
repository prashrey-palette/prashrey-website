import { Link } from "react-router-dom";
import { footerLinks } from "../data/navigation";
import { siteConfig } from "../config/site";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#F5F5F0]/10 bg-[#243B1D] px-6 py-16 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-xl text-[#F5F5F0]">Prashrey Palette</p>
          <p className="mt-1 font-sans text-xs uppercase tracking-[0.3em] text-[#F5F5F0]/45">
            The Art Studio
          </p>
          <p className="mt-4 max-w-xs font-sans text-xs text-[#F5F5F0]/40">
            Original paintings for discerning spaces. Crafted with intention in{" "}
            {siteConfig.studio.city}.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="Footer navigation">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#F5F5F0]/40">
            Navigate
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="font-sans text-sm text-[#F5F5F0]/55 transition-colors hover:text-[#C9A24A]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#F5F5F0]/40">
            Contact
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-sans text-sm text-[#F5F5F0]/55 transition-colors hover:text-[#C9A24A]"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <Link
                to="/contact"
                className="font-sans text-sm text-[#F5F5F0]/55 transition-colors hover:text-[#C9A24A]"
              >
                Contact page
              </Link>
            </li>
            <li>
              <Link
                to="/commission"
                className="font-sans text-sm text-[#F5F5F0]/55 transition-colors hover:text-[#C9A24A]"
              >
                Commission enquiry
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl border-t border-[#F5F5F0]/10 pt-8 text-center md:text-left">
        <p className="font-sans text-xs text-[#F5F5F0]/35">
          © {year} Prashrey Palette Art Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
