import { type ReactNode } from "react";
import { SectionLabel } from "./SectionLabel";
import { ScrollReveal } from "./ScrollReveal";

export function PageIntro({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: ReactNode;
  copy: string;
}) {
  return (
    <section className="paper-grid border-b border-[#ded6c7] bg-[#f3eee4] min-h-[70vh] flex flex-col justify-center py-16 md:py-24">
      <div className="container-wide grid gap-10 lg:grid-cols-12 lg:gap-16 items-center">
        <div className="lg:col-span-8">
          <ScrollReveal>
            <SectionLabel>{kicker}</SectionLabel>
            <h1 className="serif mt-4 text-xl sm:text-2xl md:text-3xl font-semibold leading-tight tracking-wider text-[#011330] uppercase">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm md:text-base leading-7 text-[#5d6971]">{copy}</p>
          </ScrollReveal>
        </div>
        <div className="lg:col-span-4">
          <ScrollReveal delay={0.15}>
            <div className="rounded-xl border border-[#BA780E]/40 bg-[#fbf9f5] p-6 shadow-md">
              <p className="eyebrow text-[#BA780E]">Executive Guidance</p>
              <p className="serif text-sm sm:text-base font-semibold text-[#011330] mt-2 uppercase tracking-wider">
                Curated Opportunities. Dedicated Support.
              </p>
              <p className="text-xs text-[#69747b] mt-3 leading-relaxed">
                We partner closely with ambitious candidates and forward-thinking companies to establish enduring, high-impact career alignments.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
