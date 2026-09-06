import { useEffect } from "react";

export function Meta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };
    setMeta("description", description);
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:type", "website");
    const canonical =
      document.querySelector('link[rel="canonical"]') ?? document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", window.location.href);
    document.head.appendChild(canonical);
  }, [title, description]);

  return null;
}
