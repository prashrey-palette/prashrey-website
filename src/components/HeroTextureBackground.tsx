import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const PARTICLE_COUNT = 18;

export default function HeroTextureBackground() {
  const reducedMotion = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        x: (i * 17 + 11) % 100,
        y: (i * 23 + 7) % 100,
        size: 2 + (i % 3),
        duration: 14 + (i % 6) * 3,
        delay: (i % 5) * 0.6,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#F7F3EB]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_60%_at_12%_18%,rgba(184,132,53,0.16),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_88%_82%,rgba(167,83,56,0.10),transparent_60%)]" />

      {/* Watercolor paper grain */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Soft floating polygons */}
      <svg
        className="absolute inset-0 h-full w-full text-[#A75338]/[0.16]"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.polygon
          points="10,20 25,5 40,22 28,38"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.15"
          animate={reducedMotion ? {} : { rotate: [0, 4, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "25px 20px" }}
        />
        <motion.polygon
          points="75,15 92,28 88,48 68,42 62,25"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.12"
          animate={reducedMotion ? {} : { rotate: [0, -5, 0], y: [0, 3, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="55"
          cy="78"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.1"
          animate={reducedMotion ? {} : { scale: [1, 1.08, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[#B88435]/25"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -18, 0],
                  x: [0, 6, 0],
                  opacity: [0.15, 0.45, 0.15],
                }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
