import { motion } from "framer-motion";
import type { ArtworkCategory } from "../types/artwork";

type CategoryFilterProps = {
  categories: ArtworkCategory[];
  active: ArtworkCategory | "All";
  onChange: (category: ArtworkCategory | "All") => void;
};

const allCategories = ["All"] as const;

export default function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  const options: (ArtworkCategory | "All")[] = [...allCategories, ...categories];

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {options.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className="relative rounded-full px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] transition-colors md:px-5"
          >
            {isActive && (
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 rounded-full border border-[#c9a962]/50 bg-[#c9a962]/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 ${
                isActive ? "text-[#c9a962]" : "text-[#f4f1ec]/50 hover:text-[#f4f1ec]/80"
              }`}
            >
              {cat}
            </span>
          </button>
        );
      })}
    </div>
  );
}
