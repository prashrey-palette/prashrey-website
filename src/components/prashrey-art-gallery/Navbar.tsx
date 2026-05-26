import { useEffect, useState } from "react";
import { navLinks } from "../../data/navigation";
import { scrollToSection } from "../../utils/smoothScroll";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionElements = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((element): element is HTMLElement => element !== null);

    const onScroll = () => {
      const scrollPosition = window.scrollY + 160;
      let current = "";

      for (const element of sectionElements) {
        if (element.offsetTop <= scrollPosition) {
          current = `#${element.id}`;
        }
      }

      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-xl bg-zinc-950/70 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl md:text-3xl font-black tracking-widest bg-gradient-to-r from-zinc-200 via-violet-300/90 to-slate-400 bg-clip-text text-transparent hover:opacity-80 transition"
        >
          PRASHREY
        </button>

        <div className="hidden lg:flex gap-6 xl:gap-8 text-sm uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollToSection(link.href)}
              className={`transition relative pb-1 ${
                activeSection === link.href
                  ? "text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {link.label}
              {activeSection === link.href && (
                <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-violet-400/70" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
