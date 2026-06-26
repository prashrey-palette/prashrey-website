import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import BrandMark from "./BrandMark";
import { navLinks } from "../data/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
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
        ? "text-[#C9A24A]"
        : "text-[#F5F5F0]/75 hover:text-[#C9A24A]"
    }`;

  const headerClass = scrolled
    ? "border-b border-[#F5F5F0]/10 bg-[#2f4222]/92 py-2.5 shadow-lg shadow-black/10 backdrop-blur-xl"
    : isHome
      ? "bg-[#2f4222]/30 py-4 backdrop-blur-md"
      : "border-b border-[#F5F5F0]/5 bg-[#2f4222]/80 py-3 backdrop-blur-lg";

  const mobileMenu =
    mobileOpen &&
    createPortal(
      <div className="fixed inset-0 z-[300] md:hidden">
        <button
          type="button"
          className="absolute inset-0 bg-[#2f4222]/98 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        />
        <nav
          className="relative z-10 flex h-full flex-col items-center justify-center px-6"
          aria-label="Mobile navigation"
        >
          <ul className="flex w-full max-w-xs flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  end={link.href === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3.5 text-center font-display text-xl transition-colors ${
                      isActive
                        ? "bg-[#C9A24A]/15 text-[#C9A24A]"
                        : "text-[#F5F5F0] hover:bg-[#F5F5F0]/5 hover:text-[#C9A24A]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-4">
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block rounded-full border border-[#C9A24A]/60 py-3.5 text-center font-sans text-xs uppercase tracking-[0.2em] text-[#C9A24A]"
              >
                Inquire
              </Link>
            </li>
          </ul>
        </nav>
      </div>,
      document.body,
    );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[200] transition-all duration-500 ${headerClass}`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <BrandMark variant="nav" linked showName />

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink to={link.href} end={link.href === "/"} className={linkClass}>
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C9A24A] transition-all duration-300 group-hover:w-full [[aria-current=page]_&]:w-full" />
                </NavLink>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            className="hidden rounded-full border border-[#C9A24A]/50 px-5 py-2 font-sans text-xs uppercase tracking-[0.2em] text-[#C9A24A] transition-all hover:bg-[#C9A24A]/15 md:block"
          >
            Inquire
          </Link>

          <button
            type="button"
            className="relative flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-[#F5F5F0]/10 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`h-0.5 w-5 bg-[#F5F5F0] transition-all ${mobileOpen ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-5 bg-[#F5F5F0] transition-all ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-5 bg-[#F5F5F0] transition-all ${mobileOpen ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </button>
        </nav>
      </header>
      {mobileMenu}
    </>
  );
}
