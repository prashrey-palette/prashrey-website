import { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../config/site";

type BrandLogoProps = {
  variant?: "hero" | "nav";
  linked?: boolean;
  className?: string;
};

const sizeClass = {
  hero: "h-auto w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px]",
  nav: "h-10 w-auto md:h-12",
};

export default function BrandLogo({
  variant = "hero",
  linked = false,
  className = "",
}: BrandLogoProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const candidates = siteConfig.logoPaths;
  const src = candidates[srcIndex] ?? candidates[0];

  const img = (
    <img
      src={src}
      alt={siteConfig.logoAlt}
      width={variant === "hero" ? 360 : 160}
      height={variant === "hero" ? 120 : 48}
      decoding="async"
      fetchPriority={variant === "hero" ? "high" : "auto"}
      onError={() => {
        if (srcIndex < candidates.length - 1) {
          setSrcIndex((i) => i + 1);
        }
      }}
      className={`object-contain ${sizeClass[variant]} ${className}`}
    />
  );

  if (linked) {
    return (
      <Link to="/" className="inline-block shrink-0" aria-label="Prashrey Palette home">
        {img}
      </Link>
    );
  }

  return img;
}
