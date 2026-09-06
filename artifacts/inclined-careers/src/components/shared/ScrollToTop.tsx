import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [location] = useLocation();
  const [visible, setVisible] = useState(false);

  // Scroll to top immediately upon route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  // Track scroll position to show/hide floating button
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          initial={{ opacity: 0, scale: 0.6, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 15 }}
          transition={{ duration: 0.25 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-24 right-7 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#011330] text-[#BA780E] border border-[#BA780E]/40 shadow-xl backdrop-blur-md transition-colors hover:bg-[#BA780E] hover:text-[#011330] focus:outline-none focus:ring-2 focus:ring-[#BA780E]/50 group"
        >
          <ArrowUp size={18} strokeWidth={2.4} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
          {/* Tooltip */}
          <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#011330] border border-white/10 px-2.5 py-1 text-[.7rem] font-semibold text-white shadow-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 hidden sm:block">
            Back to top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
