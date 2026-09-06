import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, ShieldCheck, Mail } from "lucide-react";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  type?: "application" | "enquiry";
  referenceInfo?: string;
}

export function ThankYouModal({
  isOpen,
  onClose,
  title = "Thank You!",
  subtitle,
  type = "enquiry",
  referenceInfo,
}: ThankYouModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const defaultSubtitle =
    type === "application"
      ? `We have received your application${
          referenceInfo ? ` for "${referenceInfo}"` : ""
        }. Our recruitment specialists will review your credentials and contact you within 24 business hours.`
      : `We have received your enquiry${
          referenceInfo ? ` regarding "${referenceInfo}"` : ""
        }. A dedicated recruitment advisor from our team will get in touch with you shortly.`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="thank-you-title"
        >
          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#102944]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.25 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#BA780E]/40 bg-[#fbf9f5] p-6 sm:p-8 shadow-2xl text-center"
          >
            {/* Top decorative warm gold glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-b from-[#BA780E]/20 to-transparent blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 rounded-full p-2 text-[#6c7781] hover:bg-[#ede6d8] hover:text-[#102944] transition-colors"
            >
              <X size={20} />
            </button>

            {/* Animated Success Badge matching Logo #102944 and #BA780E */}
            <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#102944] text-[#BA780E] shadow-lg ring-4 ring-[#BA780E]/30">
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 25 }}
              >
                <CheckCircle2 size={34} strokeWidth={2.4} />
              </motion.div>
            </div>

            {/* Title */}
            <h3
              id="thank-you-title"
              className="serif text-2xl sm:text-3xl font-bold tracking-tight text-[#102944]"
            >
              {title}
            </h3>

            {/* Description */}
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#5d6971]">
              {subtitle || defaultSubtitle}
            </p>

            {/* Email notice badge */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#BA780E]/40 bg-[#f5efe3] px-3.5 py-1.5 text-xs font-semibold text-[#BA780E]">
              <Mail size={14} className="shrink-0" />
              <span>Confirmation sent to your email</span>
            </div>

            {/* The Inclined Promise strip */}
            <div className="mt-5 rounded-xl border border-[#ded6c7] bg-white/70 p-3.5 text-left flex items-start gap-3">
              <ShieldCheck size={18} className="text-[#BA780E] shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-[#5d6971]">
                <strong className="text-[#102944] font-semibold">The Inclined Promise:</strong> Direct 1:1 human guidance · 0% commission from your salary.
              </div>
            </div>

            {/* Close / Done Action */}
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-[#102944] py-3.5 px-6 text-sm font-bold uppercase tracking-[.14em] text-white shadow-md transition-all hover:bg-[#102944] active:scale-[0.98]"
            >
              Continue Browsing
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
