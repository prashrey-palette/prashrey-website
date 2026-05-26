import { GalleryInteractionProvider } from "../../context/GalleryInteractionContext";
import AboutSection from "./AboutSection";
import ArtistsSection from "./ArtistsSection";
import CollectionsSection from "./CollectionsSection";
import ContactSection from "./ContactSection";
import CreativeProcessSection from "./CreativeProcessSection";
import CursorGlow from "./CursorGlow";
import ExhibitionBanner from "./ExhibitionBanner";
import FAQSection from "./FAQSection";
import FeaturedStats from "./FeaturedStats";
import Footer from "./Footer";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import InsightsSection from "./InsightsSection";
import MarqueeBanner from "./MarqueeBanner";
import Navbar from "./Navbar";
import NewsletterSection from "./NewsletterSection";
import StarryBackground from "./StarryBackground";
import TestimonialsSection from "./TestimonialsSection";

export default function PrashreyArtGallery() {
  return (
    <GalleryInteractionProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden relative">
        <StarryBackground />
        <CursorGlow />

        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <FeaturedStats />
          <MarqueeBanner />
          <ExhibitionBanner />
          <GallerySection />
          <CollectionsSection />
          <CreativeProcessSection />
          <ArtistsSection />
          <AboutSection />
          <TestimonialsSection />
          <InsightsSection />
          <FAQSection />
          <NewsletterSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </GalleryInteractionProvider>
  );
}
