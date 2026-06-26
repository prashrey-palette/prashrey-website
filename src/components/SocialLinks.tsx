import { socialLinks } from "../data/navigation";
import SocialIcon from "./SocialIcon";

type SocialLinksProps = {
  className?: string;
  size?: "sm" | "lg";
};

export default function SocialLinks({
  className = "",
  size = "sm",
}: SocialLinksProps) {
  const iconSize = size === "lg" ? "h-5 w-5" : "h-4 w-4";
  const buttonSize =
    size === "lg" ? "h-12 w-12" : "h-10 w-10";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex ${buttonSize} items-center justify-center rounded-full border border-white/10 text-[#f4f1ec]/50 transition-all hover:border-[#c9a962]/40 hover:text-[#c9a962]`}
          aria-label={link.label}
        >
          <SocialIcon icon={link.icon} className={iconSize} />
        </a>
      ))}
    </div>
  );
}
