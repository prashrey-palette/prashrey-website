import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const CommissionPage = lazy(() => import("./pages/CommissionPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ArtworkDetailPage = lazy(() => import("./pages/ArtworkDetailPage"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="portfolio/:id" element={<ArtworkDetailPage />} />
          <Route path="commission" element={<CommissionPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
