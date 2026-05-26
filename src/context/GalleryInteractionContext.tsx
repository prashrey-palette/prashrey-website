import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type MousePosition = {
  x: number;
  y: number;
};

type GalleryInteractionContextValue = {
  mouse: MousePosition;
  reducedMotion: boolean;
};

const GalleryInteractionContext =
  createContext<GalleryInteractionContextValue | null>(null);

export function GalleryInteractionProvider({ children }: { children: ReactNode }) {
  const [mouse, setMouse] = useState<MousePosition>({ x: 0.5, y: 0.5 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setMouse({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <GalleryInteractionContext.Provider value={{ mouse, reducedMotion }}>
      {children}
    </GalleryInteractionContext.Provider>
  );
}

export function useGalleryInteraction() {
  const context = useContext(GalleryInteractionContext);
  if (!context) {
    throw new Error(
      "useGalleryInteraction must be used within GalleryInteractionProvider",
    );
  }
  return context;
}
