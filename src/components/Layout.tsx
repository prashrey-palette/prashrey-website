import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useScrollToTop } from "../hooks/useScrollToTop";
import AnimatedPolygonBackground from "./AnimatedPolygonBackground";
import Footer from "./Footer";
import Navbar from "./Navbar";
import WhatsAppButton from "./WhatsAppButton";

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A24A]/30 border-t-[#C9A24A]" />
    </div>
  );
}

export default function Layout() {
  useScrollToTop();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="relative min-h-screen bg-[#2D4724] text-[#F5F5F0]">
      {!isHome && <AnimatedPolygonBackground />}
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
