import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteConfig } from "../config/site";

type PageMetaOptions = {
  title: string;
  description?: string;
};

export function usePageMeta({ title, description }: PageMetaOptions) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${title} | ${siteConfig.name}`;

    const desc = document.querySelector('meta[name="description"]');
    if (desc && description) {
      desc.setAttribute("content", description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    const url = `https://${siteConfig.domain}${pathname === "/" ? "" : pathname}`;
    if (canonical) {
      canonical.setAttribute("href", url);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", `${title} | ${siteConfig.name}`);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", url);
    }
  }, [title, description, pathname]);
}
