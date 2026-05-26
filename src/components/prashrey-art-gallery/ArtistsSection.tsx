import { artists } from "../../data/artists";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

export default function ArtistsSection() {
  return (
    <section id="artists" className="relative z-10 py-28 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            eyebrow="The Studio"
            title="Meet the Artists"
            description="A collective of visual thinkers shaping immersive digital experiences across disciplines."
          />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.map((artist, index) => (
            <ScrollReveal key={artist.name} delayMs={index * 90}>
              <article className="rounded-3xl border border-white/5 bg-zinc-900/40 p-5 text-center hover:border-violet-700/25 hover:-translate-y-1 transition-all duration-500">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border border-white/10 mb-4"
                />
                <h3 className="text-lg font-bold text-zinc-100">{artist.name}</h3>
                <p className="text-violet-300/60 text-xs uppercase tracking-widest mt-1">
                  {artist.role}
                </p>
                <p className="text-zinc-500 text-sm mt-3">{artist.specialty}</p>
                <p className="text-zinc-600 text-xs mt-4 uppercase tracking-widest">
                  {artist.pieces} works in gallery
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
