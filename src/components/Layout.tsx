import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollToTop } from "../hooks/useScrollToTop";
import AnimatedPolygonBackground from "./AnimatedPolygonBackground";
import Footer from "./Footer";
import Navbar from "./Navbar";
import WhatsAppButton from "./WhatsAppButton";

export default function Layout() {
  const location = useLocation();
  useScrollToTop();

  return (
    <div className="relative min-h-screen bg-[#08080a] text-[#f4f1ec]">
      <AnimatedPolygonBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
}
