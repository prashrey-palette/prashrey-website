import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";

type PolygonShape = {
  id: number;
  type: "hexagon" | "triangle" | "diamond" | "abstract";
  x: number;
  y: number;
  size: number;
  rotation: number;
  layer: number;
  duration: number;
  delay: number;
};

function hexagonPath(size: number) {
  const r = size / 2;
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${r + r * Math.cos(angle)},${r + r * Math.sin(angle)}`;
  });
  return `M ${points.join(" L ")} Z`;
}

function trianglePath(size: number) {
  const r = size / 2;
  const p1 = `${r},${size * 0.08}`;
  const p2 = `${size * 0.92},${size * 0.85}`;
  const p3 = `${size * 0.08},${size * 0.85}`;
  return `M ${p1} L ${p2} L ${p3} Z`;
}

function diamondPath(size: number) {
  const r = size / 2;
  return `M ${r},0 L ${size},${r} L ${r},${size} L 0,${r} Z`;
}

function abstractPath(size: number) {
  const s = size;
  return `M ${s * 0.2},${s * 0.5} L ${s * 0.45},${s * 0.1} L ${s * 0.8},${s * 0.35} L ${s * 0.65},${s * 0.9} L ${s * 0.15},${s * 0.75} Z`;
}

function PolygonShape({
  shape,
  scrollProgress,
  reducedMotion,
}: {
  shape: PolygonShape;
  scrollProgress: number;
  reducedMotion: boolean;
}) {
  const parallaxY = (shape.layer - 2) * scrollProgress * 120;
  const scale = 1 + scrollProgress * (shape.layer * 0.08 - 0.12);
  const opacity = 0.06 + shape.layer * 0.04;

  const pathD = useMemo(() => {
    switch (shape.type) {
      case "hexagon":
        return hexagonPath(shape.size);
      case "triangle":
        return trianglePath(shape.size);
      case "diamond":
        return diamondPath(shape.size);
      default:
        return abstractPath(shape.size);
    }
  }, [shape.type, shape.size]);

  const blur = shape.layer === 0 ? 2 : shape.layer === 1 ? 1 : 0;

  return (
    <motion.g
      style={{
        transformOrigin: `${shape.x}px ${shape.y}px`,
        filter: blur ? `blur(${blur}px)` : undefined,
      }}
      animate={
        reducedMotion
          ? {}
          : {
              x: [0, 12, -8, 0],
              y: [0, -10, 6, 0],
              rotate: [shape.rotation, shape.rotation + 6, shape.rotation - 4, shape.rotation],
              scale: [1, 1.04, 0.98, 1],
            }
      }
      transition={
        reducedMotion
          ? {}
          : {
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      <motion.g
        style={{
          translateX: shape.x,
          translateY: shape.y + parallaxY,
          scale,
          rotate: shape.rotation + scrollProgress * 15 * (shape.layer - 1),
        }}
      >
        <path
          d={pathD}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.6 + shape.layer * 0.15}
          opacity={opacity}
          vectorEffect="non-scaling-stroke"
        />
      </motion.g>
    </motion.g>
  );
}

export default function AnimatedPolygonBackground() {
  const scrollProgress = useScrollProgress();
  const reducedMotion = useReducedMotion();

  const shapes = useMemo<PolygonShape[]>(() => {
    const types: PolygonShape["type"][] = [
      "hexagon",
      "triangle",
      "diamond",
      "abstract",
    ];
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      type: types[i % types.length],
      x: (i * 137 + 40) % 100,
      y: (i * 89 + 20) % 100,
      size: 40 + (i % 5) * 28,
      rotation: (i * 37) % 360,
      layer: i % 3,
      duration: 18 + (i % 7) * 4,
      delay: (i % 5) * 0.8,
    }));
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden text-[#c9a962]"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#08080a]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0f] via-transparent to-[#08080a]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(201,169,98,0.08),transparent)]" />

      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
      >
        <g className="text-[#c9a962]/80">
          {shapes.map((shape) => (
            <PolygonShape
              key={shape.id}
              shape={{
                ...shape,
                x: shape.x,
                y: shape.y,
              }}
              scrollProgress={scrollProgress}
              reducedMotion={!!reducedMotion}
            />
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(201,169,98,0.04),transparent_50%)]" />
      <div className="absolute inset-0 backdrop-blur-[0.5px]" />
    </div>
  );
}
