import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { useGalleryInteraction } from "../../context/GalleryInteractionContext";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const { reducedMotion } = useGalleryInteraction();

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setTransform(
      `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale3d(1.02, 1.02, 1.02)`,
    );
    setGlare({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    });
  };

  const resetTilt = () => {
    setTransform("");
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{ transform: transform || undefined }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-30 rounded-[2rem] transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.14), transparent 45%)`,
        }}
        aria-hidden
      />
      {children}
    </div>
  );
}
