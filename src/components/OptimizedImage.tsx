import { useState } from "react";

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
  return `/artworks/webp/${encodeURIComponent(base)}${suffix}.webp`;
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  objectFit = "cover",
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const base = artworkBaseName(src);
  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";

  const imgClasses = `${fitClass} h-full w-full transition-opacity duration-500 ${
    loaded ? "opacity-100" : "opacity-0"
  } ${className}`;

  const placeholder = (
    <div
      className="absolute inset-0 animate-pulse bg-[#121214]"
      aria-hidden
    />
  );

  if (base) {
    const srcSet = WIDTHS.map((w) => `${webpSrc(base, w)} ${w}w`).join(", ");
    const fallbackWebp = webpSrc(base);

    return (
      <div className="relative h-full w-full overflow-hidden bg-[#121214]">
        {!loaded && placeholder}
        <picture className="block h-full w-full">
          <source srcSet={srcSet} type="image/webp" sizes={sizes} />
          <source srcSet={fallbackWebp} type="image/webp" />
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            sizes={sizes}
            onLoad={() => setLoaded(true)}
            className={`relative ${imgClasses}`}
          />
        </picture>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#121214]">
      {!loaded && placeholder}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={`relative ${imgClasses}`}
      />
    </div>
  );
}
