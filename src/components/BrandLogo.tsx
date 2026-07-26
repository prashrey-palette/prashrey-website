import { Link } from "react-router-dom";
import { siteConfig } from "../config/site";

type BrandLogoProps = {
  variant?: "hero" | "nav";
  linked?: boolean;
  className?: string;
};

const sizeClass = {
  hero: "h-auto w-full max-w-[210px] sm:max-w-[240px] md:max-w-[280px]",
  nav: "h-20 w-20 rounded-full border border-[#B88435]/30 bg-[#F7F3EB] object-cover object-top p-0.5 shadow-sm md:h-14 md:w-14",
};

export default function BrandLogo({
  variant = "hero",
  linked = false,
  className = "",
}: BrandLogoProps) {
  const img = (
    <img
      src={siteConfig.logoPaths[0]}
      alt={siteConfig.logoAlt}
      width={variant === "hero" ? 280 : 56}
      height={variant === "hero" ? 296 : 56}
      decoding="async"
      fetchPriority={variant === "hero" ? "high" : "auto"}
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
