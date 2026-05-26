import { useGalleryInteraction } from "../../context/GalleryInteractionContext";

export default function CursorGlow() {
  const { mouse, reducedMotion } = useGalleryInteraction();

  if (reducedMotion) return null;

  return (
    <div
      className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-300"
      style={{
        background: `radial-gradient(520px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(139, 92, 246, 0.09), transparent 42%)`,
      }}
      aria-hidden
    />
  );
}
