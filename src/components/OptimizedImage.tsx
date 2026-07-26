import { useEffect, useRef, useState } from "react";

type OptimizedImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
};

const WIDTHS = [640, 1024, 1536] as const;

function artworkBaseName(src: string) {
  if (!src.startsWith("/artworks/")) return null;
  const filename = decodeURIComponent(src.replace("/artworks/", ""));
  return filename.replace(/\.[^.]+$/, "");
}

function webpSrc(base: string, width?: number) {
  const suffix = width ? `-${width}` : "";
  return `/artworks/webp/${base}${suffix}.webp`;
}

function markLoaded(
  img: HTMLImageElement | null,
  setLoaded: (v: boolean) => void,
) {
  if (img?.complete && img.naturalWidth > 0) {
    setLoaded(true);
  }
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  objectFit = "cover",
}: OptimizedImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const base = artworkBaseName(src);
  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";

  useEffect(() => {
    setLoaded(false);
    setUseFallback(false);
  }, [src]);

  useEffect(() => {
    markLoaded(imgRef.current, setLoaded);
  }, [src, useFallback]);

  const imgClasses = `${fitClass} h-full w-full transition-opacity duration-300 ${
    loaded ? "opacity-100" : "opacity-0"
  } ${className}`;

  const handleLoad = () => setLoaded(true);

  const handleError = () => {
    if (!useFallback) {
      setUseFallback(true);
      setLoaded(false);
    }
  };

  const placeholder = !loaded && (
    <div className="absolute inset-0 bg-[#121214]" aria-hidden />
  );

  if (base && !useFallback) {
    const srcSet = WIDTHS.map((w) => `${webpSrc(base, w)} ${w}w`).join(", ");

    return (
      <div className="relative h-full w-full overflow-hidden bg-[#121214]">
        {placeholder}
        <picture className="block h-full w-full">
          <source srcSet={srcSet} type="image/webp" sizes={sizes} />
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            className={`relative ${imgClasses}`}
          />
        </picture>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#121214]">
      {placeholder}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={`relative ${imgClasses}`}
      />
    </div>
  );
}
