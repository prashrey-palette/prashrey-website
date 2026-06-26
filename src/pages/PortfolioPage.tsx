import ArtworkGrid from "../components/ArtworkGrid";
import { usePageMeta } from "../hooks/usePageMeta";

export default function PortfolioPage() {
  usePageMeta({
    title: "Portfolio",
    description:
      "Explore the full portfolio of Prashrey Palette Art Studio — acrylic, watercolor, oil, sketch, and mixed-media originals.",
  });

  return (
    <div className="pt-16">
      <ArtworkGrid />
    </div>
  );
}
