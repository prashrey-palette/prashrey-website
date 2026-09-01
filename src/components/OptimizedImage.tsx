import { useEffect, useRef, useState } from "react";
import type { ArtworkImage } from "../types/artwork";

type OptimizedImageProps = {
  image: ArtworkImage;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
};

function markLoaded(
  img: HTMLImageElement | null,
  setLoaded: (value: boolean) => void,
) {
  if (img?.complete && img.naturalWidth > 0) setLoaded(true);
}

export default function OptimizedImage({
  image,
  alt,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  objectFit = "cover",
}: OptimizedImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [useOriginal, setUseOriginal] = useState(false);
  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";

  useEffect(() => {
    setLoaded(false);
    setUseOriginal(false);
  }, [image.src]);

  useEffect(() => {
    markLoaded(imgRef.current, setLoaded);
  }, [image.src, useOriginal]);

  const responsiveSrcSet = image.srcSet
    ?.map(({ src, width }) => `${src} ${width}w`)
    .join(", ");
  const optimizedSrcSet = responsiveSrcSet || image.optimizedSrc;
  const canUseOptimized = !useOriginal && Boolean(optimizedSrcSet);
  const imgClasses = `${fitClass} h-full w-full transition-opacity duration-300 ${
    loaded ? "opacity-100" : "opacity-0"
  } ${className}`;

  const img = (
    <img
      ref={imgRef}
      src={image.src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      sizes={sizes}
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (canUseOptimized) {
          setUseOriginal(true);
          setLoaded(false);
        }
      }}
      className={`relative ${imgClasses}`}
    />
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#121214]">
      {!loaded && <div className="absolute inset-0 bg-[#121214]" aria-hidden />}
      {canUseOptimized ? (
        <picture className="block h-full w-full">
          <source srcSet={optimizedSrcSet} type="image/webp" sizes={sizes} />
          {img}
        </picture>
      ) : (
        img
      )}
    </div>
  );
}
