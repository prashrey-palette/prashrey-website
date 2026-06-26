import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useScrollToTop } from "../hooks/useScrollToTop";
import AnimatedPolygonBackground from "./AnimatedPolygonBackground";
import Footer from "./Footer";
import Navbar from "./Navbar";
import WhatsAppButton from "./WhatsAppButton";

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#c9a962]/30 border-t-[#c9a962]" />
    </div>
  );
}

export default function Layout() {
  useScrollToTop();

  return (
    <div className="relative min-h-screen bg-[#08080a] text-[#f4f1ec]">
      <AnimatedPolygonBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
}
