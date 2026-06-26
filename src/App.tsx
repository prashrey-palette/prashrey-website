import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const CommissionPage = lazy(() => import("./pages/CommissionPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ArtworkDetailPage = lazy(() => import("./pages/ArtworkDetailPage"));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#c9a962]/30 border-t-[#c9a962]" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="portfolio"
            element={
              <Suspense fallback={<PageLoader />}>
                <PortfolioPage />
              </Suspense>
            }
          />
          <Route
            path="portfolio/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <ArtworkDetailPage />
              </Suspense>
            }
          />
          <Route
            path="commission"
            element={
              <Suspense fallback={<PageLoader />}>
                <CommissionPage />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
