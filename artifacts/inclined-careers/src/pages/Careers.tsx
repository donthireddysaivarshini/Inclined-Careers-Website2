import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Briefcase, Sparkles, HelpCircle } from "lucide-react";
import { Link } from "wouter";
import { Meta } from "@/components/shared/Meta";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal, staggerChild, staggerContainer } from "@/components/shared/ScrollReveal";
import { roleGroups } from "@/constants/content";

export default function Careers() {
  return (
    <main>
      <Meta
        title="Careers & Practice Areas | Inclined Careers"
        description="Explore example career areas and positions supported by Inclined Careers across IT & Technology, Healthcare, Data Center Operations, Embedded Systems, and Business roles."
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden paper-grid border-b border-[#ded6c7] bg-[#f3eee4] px-6 py-14 md:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <SectionLabel>Career Opportunities</SectionLabel>
            <h1 className="serif mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase tracking-wide text-[#011330]">
              Find Your Next <span className="text-[#BA780E]">Opportunity</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#5d6971]">
              Dedicated 1:1 recruiter support connecting exceptional professionals with top US employers.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION STRIP */}
      <section className="border-b border-[#ded6c7] bg-[#f8f4ec] py-4">
        <div className="container-wide flex flex-wrap items-center justify-between gap-4 text-xs text-[#5d6971]">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#BA780E] shrink-0" />
            <span className="font-semibold uppercase tracking-wider text-[#011330]">
              100% Confidential Review
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#BA780E] shrink-0" />
            <span className="font-semibold uppercase tracking-wider text-[#011330]">
              0% Post-Placement Commission
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#BA780E] shrink-0" />
            <span className="font-semibold uppercase tracking-wider text-[#011330]">
              Dedicated 1:1 Recruiter Support
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#BA780E] shrink-0" />
            <span className="font-semibold uppercase tracking-wider text-[#011330]">
              Resume &amp; Interview Alignment
            </span>
          </div>
        </div>
      </section>

      {/* 3. SIMPLIFIED CAREERS SECTION */}
      <section className="container-wide py-12 md:py-20">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <SectionLabel>Supported Practice Areas</SectionLabel>
            <h2 className="serif mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-[#011330] uppercase tracking-wide">
              Career Areas &amp; Example Roles
            </h2>
          </div>

          {/* Explainer Text Callout */}
          <div className="mt-8 rounded-2xl border-l-4 border-l-[#BA780E] border border-[#ded6c7] bg-[#fbf9f5] p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#011330] text-[#BA780E]">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#BA780E]">
                  Personalized Candidate Guidance
                </h3>
                <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-[#011330] font-medium">
                  These roles are just examples of the career areas and positions we support. We will
                  understand each candidate’s background, skills, experience, and needs, and then
                  guide them toward suitable roles.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Categorized Role Lists Under Each Department */}
        <div className="mt-12 space-y-12">
          {roleGroups.map(([department, roles], deptIndex) => (
            <ScrollReveal key={department} delay={deptIndex * 0.08}>
              <div className="rounded-2xl border border-[#ded6c7] bg-[#fbf9f5] p-6 sm:p-8 shadow-sm transition-all hover:border-[#BA780E]/40 hover:shadow-md">
                {/* Department Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#ded6c7] pb-4 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#011330] text-xs font-bold text-[#BA780E]">
                      0{deptIndex + 1}
                    </span>
                    <h3 className="serif text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#011330]">
                      {department}
                    </h3>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#BA780E]">
                    {roles.length} Example Positions
                  </span>
                </div>

                {/* Role Names Clean Grid */}
                <div className="mt-6 grid gap-3.5 sm:grid-cols-2 md:grid-cols-3">
                  {roles.map((roleTitle) => (
                    <motion.div
                      key={roleTitle}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 rounded-xl border border-[#ded6c7]/80 bg-[#f8f4ec] px-4 py-3.5 text-sm font-semibold text-[#011330] transition-colors hover:border-[#BA780E] hover:bg-white hover:text-[#BA780E]"
                    >
                      <Briefcase size={16} className="text-[#BA780E] shrink-0" />
                      <span>{roleTitle}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* 4. CAREERS BOTTOM CTA BOX */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16 rounded-2xl border-2 border-[#BA780E] bg-[#011330] p-8 sm:p-12 text-center text-[#f8f4ec] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-[#BA780E]/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-[#BA780E]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#BA780E]/20 text-[#BA780E]">
                <HelpCircle size={28} />
              </div>

              <h3 className="serif text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide text-[#f8f4ec]">
                Looking For A Different Position?
              </h3>

              <p className="text-base sm:text-lg leading-relaxed text-[#c4cdd1]">
                Don’t see the role you’re looking for? Connect with us, and we’ll work with you based on your background, career goals, and needs.
              </p>

              <div className="pt-2">
                <Link
                  href="/contact"
                  data-testid="button-careers-connect-cta"
                  className="inline-flex items-center gap-3 rounded-xl bg-[#BA780E] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#011330] shadow-lg transition-all hover:bg-[#d48b16] hover:shadow-xl active:scale-[0.99]"
                >
                  Connect With Us <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
