import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.2,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const revealIfVisible = () => {
      const { bottom, top } = element.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) {
        setInView(true);
      }
    };

    // A page restored from the back/forward cache does not always trigger a
    // fresh IntersectionObserver callback. Check the current viewport as well
    // so sections cannot remain transparent after returning to the page.
    revealIfVisible();

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(element);
    window.addEventListener("pageshow", revealIfVisible);

    return () => {
      observer.disconnect();
      window.removeEventListener("pageshow", revealIfVisible);
    };
  }, [threshold]);

  return { ref, inView };
}
