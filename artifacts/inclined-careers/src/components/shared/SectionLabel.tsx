import { type ReactNode } from "react";

export function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`eyebrow flex items-center gap-3 ${
        light ? "text-[#BA780E]" : "text-[#BA780E]"
      }`}
    >
      <span className={`h-px w-8 ${light ? "bg-[#BA780E]" : "bg-[#BA780E]"}`} />
      {children}
    </p>
  );
}
