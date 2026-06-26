import { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../config/site";
import { publicAssetUrl } from "../utils/publicAsset";

type BrandMarkProps = {
  variant?: "hero" | "nav";
  linked?: boolean;
  showName?: boolean;
  className?: string;
};

export default function BrandMark({
  variant = "hero",
  linked = false,
  showName = true,
  className = "",
}: BrandMarkProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const candidates = siteConfig.logoPaths;
  const src = publicAssetUrl(candidates[srcIndex] ?? candidates[0]);

  const isNav = variant === "nav";

  const content = (
    <div
      className={`flex items-center gap-3 ${isNav ? "min-w-0 max-w-[calc(100%-3rem)]" : "flex-col sm:flex-row sm:gap-4"} ${className}`}
    >
      <img
        src={src}
        alt={siteConfig.logoAlt}
        width={isNav ? 44 : 200}
        height={isNav ? 44 : 80}
        decoding="async"
        fetchPriority={isNav ? "auto" : "high"}
        onError={() => {
          if (srcIndex < candidates.length - 1) {
            setSrcIndex((i) => i + 1);
          }
        }}
        className={
          isNav
            ? "h-9 w-9 shrink-0 object-contain md:h-11 md:w-11"
            : "h-auto w-full max-w-[180px] shrink-0 object-contain sm:max-w-[220px] md:max-w-[260px]"
        }
      />
      {showName && (
        <div className={isNav ? "min-w-0 text-left" : "text-center sm:text-left"}>
          <p
            className={`font-display leading-tight text-[#F5F5F0] ${
              isNav
                ? "truncate text-base md:text-lg"
                : "text-2xl sm:text-3xl md:text-4xl"
            }`}
          >
            {siteConfig.brand.name}
          </p>
          <p
            className={`font-sans uppercase tracking-[0.25em] text-[#F5F5F0]/55 ${
              isNav
                ? "truncate text-[9px] md:text-[10px]"
                : "mt-1 text-[10px] md:text-xs"
            }`}
          >
            {siteConfig.brand.tagline}
          </p>
        </div>
      )}
    </div>
  );

  if (linked) {
    return (
      <Link
        to="/"
        className="inline-flex shrink-0"
        aria-label={`${siteConfig.brand.name} home`}
      >
        {content}
      </Link>
    );
  }

  return content;
}
