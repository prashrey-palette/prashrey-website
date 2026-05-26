import AnimatedPolygonBackground from "./components/AnimatedPolygonBackground";
import AboutSection from "./components/AboutSection";
import ArtworkGrid from "./components/ArtworkGrid";
import CollectionSection from "./components/CollectionSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import TestimonialsSection from "./components/TestimonialsSection";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#08080a] text-[#f4f1ec]">
      <AnimatedPolygonBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <ArtworkGrid />
          <CollectionSection />
          <AboutSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
