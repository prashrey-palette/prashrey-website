import { navLinks } from "../../data/navigation";
import { scrollToSection } from "../../utils/smoothScroll";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2">
          <p className="text-2xl font-black tracking-widest bg-gradient-to-r from-zinc-200 via-violet-300/90 to-slate-400 bg-clip-text text-transparent mb-4">
            PRASHREY
          </p>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
            An immersive digital art gallery crafting exhibitions, collections,
            and visual stories for collectors worldwide.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
            Navigate
          </p>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => scrollToSection(link.href)}
                  className="text-zinc-400 text-sm hover:text-zinc-200 transition"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
            Studio
          </p>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>Mon–Sat, 10am–7pm</li>
            <li>Mumbai · Virtual Studio</li>
            <li>
              <a
                href="mailto:hello@prashrey.gallery"
                className="hover:text-zinc-200 transition"
              >
                hello@prashrey.gallery
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-center text-zinc-600 text-xs tracking-widest uppercase">
        © 2026 Prashrey Art Gallery — Crafted under the stars.
      </p>
    </footer>
  );
}
