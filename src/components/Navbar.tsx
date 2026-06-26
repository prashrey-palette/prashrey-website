import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../data/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `group relative font-sans text-xs uppercase tracking-[0.2em] transition-colors ${
      isActive
        ? "text-[#c9a962]"
        : "text-[#f4f1ec]/70 hover:text-[#c9a962]"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-[#08080a]/80 py-3 backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link to="/" className="group text-left">
          <span className="font-display text-lg tracking-wide text-[#f4f1ec] transition-colors group-hover:text-[#c9a962]">
            Prashrey
          </span>
          <span className="block font-sans text-[10px] uppercase tracking-[0.35em] text-[#f4f1ec]/50">
            Palette Art Studio
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink to={link.href} end={link.href === "/"} className={linkClass}>
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#c9a962] transition-all duration-300 group-hover:w-full [[aria-current=page]_&]:w-full" />
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="hidden rounded-full border border-[#c9a962]/40 px-5 py-2 font-sans text-xs uppercase tracking-[0.2em] text-[#c9a962] transition-all hover:border-[#c9a962] hover:bg-[#c9a962]/10 md:block"
        >
          Inquire
        </Link>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`h-px w-6 bg-[#f4f1ec] transition-all ${mobileOpen ? "translate-y-[5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-[#f4f1ec] transition-all ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-6 bg-[#f4f1ec] transition-all ${mobileOpen ? "-translate-y-[5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#08080a]/95 backdrop-blur-xl md:hidden"
          >
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex h-full flex-col items-center justify-center gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.href}
                    end={link.href === "/"}
                    className={({ isActive }) =>
                      `font-display text-2xl ${isActive ? "text-[#c9a962]" : "text-[#f4f1ec] hover:text-[#c9a962]"}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
