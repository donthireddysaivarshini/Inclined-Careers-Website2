import { motion } from "framer-motion";

const INDUSTRIES = [
  "IT & Technology",
  "Healthcare",
  "Data Center Operations",
  "Embedded Systems",
  "Business & Professional",
];

export function InfiniteMarquee() {
  // Duplicate list to create a seamless infinite loop
  const list = [...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES];

  return (
    <div
      className="relative w-full overflow-hidden border-b border-[#ded6c7] bg-[#f5efe4] py-3.5 select-none"
      aria-label="Industries we specialize in"
    >
      {/* Side gradient scrims for clean fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f5efe4] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f5efe4] to-transparent z-10" />

      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 24,
        }}
      >
        {list.map((item, idx) => (
          <div key={idx} className="flex items-center gap-10">
            <span className="text-xs font-bold uppercase tracking-[.18em] text-[#102944]">
              {item}
            </span>
            <span className="text-[#BA780E] text-xs">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
