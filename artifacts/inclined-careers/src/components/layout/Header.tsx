import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { navItems } from "@/constants/navigation";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 45);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Transparent when at the very top of the Hero page; frosted glass otherwise
  const isTransparent = isHome && !scrolled;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none transition-all duration-300 ease-in-out">
      {/* Floating Pill Navigation Container */}
      <div
        className={`pointer-events-auto mx-auto max-w-6xl rounded-full transition-all duration-300 ease-in-out flex items-center justify-between px-4 sm:px-6 md:px-8 ${
          isTransparent
            ? "mt-3 sm:mt-4 h-[66px] bg-transparent border border-white/10 shadow-none"
            : "mt-2.5 sm:mt-3 h-[60px] bg-[#102944]/85 backdrop-blur-md border border-white/15 shadow-xl shadow-black/30"
        }`}
      >
        {/* Brand Logo - Light variant matching exact #102944, #BA780E, #FFFFFF */}
        <Logo light />

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 lg:gap-9 md:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`link-nav-${item.label.toLowerCase().replaceAll(" ", "-")}`}
                className={`relative py-1.5 text-[.74rem] font-bold uppercase tracking-[.14em] transition-colors ${
                  isActive
                    ? "text-[#BA780E]"
                    : "text-white/80 hover:text-[#BA780E]"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#BA780E]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Action Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact"
            data-testid="link-header-enquiry"
            className={`group inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-[.72rem] font-bold uppercase tracking-[.14em] transition-all ${
              isTransparent
                ? "border border-[#BA780E]/70 bg-[#BA780E]/15 text-white hover:bg-[#BA780E] hover:text-[#102944] shadow-sm"
                : "bg-[#BA780E] text-[#102944] hover:bg-[#BA780E] shadow-md active:scale-95"
            }`}
          >
            <span>Talk to our team</span>
            <ArrowRight
              size={13}
              className={`transition-transform duration-200 group-hover:translate-x-1 ${
                isTransparent ? "text-[#BA780E] group-hover:text-[#102944]" : "text-[#102944]"
              }`}
            />
          </Link>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          data-testid="button-mobile-menu"
          className="rounded-full p-2 text-white hover:bg-white/10 md:hidden transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Frosted Glass Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-[#102944]/95 backdrop-blur-xl p-5 shadow-2xl md:hidden"
          >
            <nav className="flex flex-col space-y-1" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(" ", "-")}`}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[.12em] transition-colors ${
                      isActive
                        ? "bg-white/10 text-[#BA780E]"
                        : "text-white/85 hover:bg-white/5 hover:text-[#BA780E]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={15} className={isActive ? "text-[#BA780E]" : "text-white/40"} />
                  </Link>
                );
              })}

              <div className="pt-3 mt-2 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#BA780E] py-3 text-xs font-bold uppercase tracking-[.14em] text-[#102944] shadow-md hover:bg-[#BA780E] transition-colors"
                >
                  <span>Talk to our team</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
