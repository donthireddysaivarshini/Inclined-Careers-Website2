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
            <h1 className="serif mt-6 text-3xl font-bold leading-[1.15] tracking-wide text-[#011330] sm:text-4xl md:text-5xl lg:text-6xl uppercase">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#5d6971]">{copy}</p>
          </ScrollReveal>
        </div>
        <div className="lg:col-span-4">
          <ScrollReveal delay={0.15}>
            <div className="rounded-xl border border-[#BA780E]/40 bg-[#fbf9f5] p-6 shadow-md">
              <p className="eyebrow text-[#BA780E]">Executive Guidance</p>
              <p className="serif text-xl font-bold text-[#011330] mt-2 uppercase tracking-wide">
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
