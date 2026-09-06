import { type ReactNode } from "react";
import { useLocation } from "wouter";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

export function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const isHome = location === "/";

  return (
    <div className="site-noise min-h-[100dvh] overflow-x-hidden flex flex-col">
      <Header />
      <div className={`flex-1 ${!isHome ? "pt-24 sm:pt-28" : ""}`}>{children}</div>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}
