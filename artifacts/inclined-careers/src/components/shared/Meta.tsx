import { useEffect } from "react";

export interface MetaProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  noindex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  breadcrumbs?: Array<{ name: string; path: string }>;
}

const SITE_ORIGIN = "https://inclinedcareers.in";
const DEFAULT_IMAGE = `${SITE_ORIGIN}/logo.PNG`;
const DEFAULT_KEYWORDS =
  "career guidance, US recruitment support, IT staffing, healthcare recruiting, data center careers, embedded systems hiring, talent acquisition, no commission recruitment, job placement";

export function Meta({
  title,
  description,
  keywords = DEFAULT_KEYWORDS,
  canonicalPath,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  noindex = false,
  schema,
  breadcrumbs,
}: MetaProps) {
  useEffect(() => {
    // 1. Page Title
    document.title = title;

    // Helper to set or create meta tag by name or property
    const setMetaTag = (attribute: "name" | "property", key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Standard Search Meta
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);
    setMetaTag(
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );

    // 3. Clean Canonical URL
    const pathname = canonicalPath ?? (window.location.pathname.replace(/\/$/, "") || "/");
    const cleanCanonicalUrl = `${SITE_ORIGIN}${pathname === "/" ? "" : pathname}`;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", cleanCanonicalUrl);

    // 4. OpenGraph Metadata (Facebook, LinkedIn, Slack, WhatsApp)
    setMetaTag("property", "og:site_name", "Inclined Careers");
    setMetaTag("property", "og:locale", "en_US");
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", cleanCanonicalUrl);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:image:alt", title);

    // 5. Twitter / X Cards
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:url", cleanCanonicalUrl);
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);

    // 6. Dynamic JSON-LD Structured Data
    const scriptId = "page-structured-data";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const jsonLdGraph: Array<Record<string, unknown>> = [];

    // Optional BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      jsonLdGraph.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": SITE_ORIGIN,
          },
          ...breadcrumbs.map((b, idx) => ({
            "@type": "ListItem",
            "position": idx + 2,
            "name": b.name,
            "item": `${SITE_ORIGIN}${b.path.startsWith("/") ? "" : "/"}${b.path}`,
          })),
        ],
      });
    }

    // Optional Page-Specific Schema
    if (schema) {
      if (Array.isArray(schema)) {
        jsonLdGraph.push(...schema);
      } else {
        jsonLdGraph.push(schema);
      }
    }

    if (jsonLdGraph.length > 0) {
      script.textContent = JSON.stringify(
        jsonLdGraph.length === 1 ? jsonLdGraph[0] : { "@context": "https://schema.org", "@graph": jsonLdGraph },
        null,
        2,
      );
    } else {
      script.textContent = "";
    }
  }, [title, description, keywords, canonicalPath, ogType, ogImage, noindex, schema, breadcrumbs]);

  return null;
}
