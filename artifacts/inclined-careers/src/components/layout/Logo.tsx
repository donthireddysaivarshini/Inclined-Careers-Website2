import { Link } from "wouter";
import { motion } from "framer-motion";
import { imageUrl } from "@/constants/images";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3"
      data-testid="link-logo"
      title="Inclined Careers - Return to Homepage"
      aria-label="Inclined Careers - Return to Homepage"
    >
      <motion.img
        whileHover={{ scale: 1.08, rotate: 2 }}
        transition={{ duration: 0.3 }}
        src={imageUrl("logo.png")}
        alt="Inclined Careers - Connecting You to the Right Path"
        className="h-10 w-10 rounded-full object-contain ring-1 ring-[#BA780E]/60 shadow-sm"
      />
      <span
        className={`text-[.82rem] font-bold tracking-[.18em] leading-tight transition-colors ${
          light ? "text-[#FFFFFF] group-hover:text-[#BA780E]" : "text-[#011330] group-hover:text-[#BA780E]"
        }`}
      >
        INCLINED<br />
        <span className="font-medium tracking-[.26em]">CAREERS</span>
      </span>
    </Link>
  );
}
