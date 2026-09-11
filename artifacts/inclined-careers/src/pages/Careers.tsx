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
        title="Find Your Next Opportunity | Practice Areas & Careers | Inclined Careers"
        description="Explore career opportunities across IT & Technology, Healthcare, Data Center Operations, Embedded Systems, and Business. 100% confidential review with 0% post-placement commission."
        keywords="career opportunities, IT jobs, healthcare roles, data center careers, embedded systems positions, recruiter support, US job placement, 0 commission recruitment"
        canonicalPath="/careers"
        breadcrumbs={[{ name: "Careers", path: "/careers" }]}
        schema={{
          "@type": "EmploymentAgency",
          "@id": "https://inclinedcareers.in/careers#agency",
          "name": "Inclined Careers - Practice Areas",
          "url": "https://inclinedcareers.in/careers",
          "description": "Dedicated recruiter support connecting exceptional professionals with top US employers across high-growth practice areas.",
          "knowsAbout": [
            "Information Technology & Cloud Infrastructure",
            "Healthcare & Clinical Operations",
            "Mission-Critical Data Center Operations",
            "Embedded Systems & Firmware Engineering",
            "Corporate Operations & Business Support"
          ]
        }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden paper-grid border-b border-[#ded6c7] bg-[#f3eee4] px-6 py-10 md:py-14 text-center">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h1 className="serif text-lg sm:text-xl md:text-2xl font-semibold leading-tight uppercase tracking-wider text-[#011330]">
              Find Your Next <span className="font-semibold text-[#BA780E]">Opportunity</span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION STRIP */}
      <section className="border-b border-[#ded6c7] bg-[#f8f4ec] py-3">
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
      <section className="container-wide py-10 md:py-14">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <SectionLabel>Supported Practice Areas</SectionLabel>
            <h2 className="serif mt-2 text-lg sm:text-xl md:text-2xl font-semibold leading-tight text-[#011330] uppercase tracking-wider">
              Career Areas &amp; Supported Roles
            </h2>
          </div>

          {/* Explainer Text Callout */}
          <div className="mt-7 rounded-2xl border-l-4 border-l-[#BA780E] border border-[#ded6c7] bg-[#fbf9f5] p-5 sm:p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#011330] text-[#BA780E]">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#BA780E]">
                  Personalized Candidate Guidance
                </h3>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#011330] font-medium">
                  These roles are just examples of the career areas and positions we support. We will
                  understand each candidate’s background, skills, experience, and needs, and then
                  guide them toward suitable roles.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Categorized Role Lists Under Each Department */}
        <div className="mt-8 space-y-8">
          {roleGroups.map(([department, roles], deptIndex) => (
            <ScrollReveal key={department} delay={deptIndex * 0.08}>
              <div className="rounded-2xl border border-[#ded6c7] bg-[#fbf9f5] p-5 sm:p-7 shadow-sm transition-all hover:border-[#BA780E]/40 hover:shadow-md">
                {/* Department Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#ded6c7] pb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#011330] text-[.68rem] font-bold text-[#BA780E]">
                      0{deptIndex + 1}
                    </span>
                    <h3 className="serif text-sm sm:text-base font-semibold uppercase tracking-wider text-[#011330]">
                      {department}
                    </h3>
                  </div>
                  <span className="text-[.68rem] font-semibold uppercase tracking-wider text-[#BA780E]">
                    {roles.length} Supported Roles
                  </span>
                </div>

                {/* Role Names Clean Grid */}
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2 md:grid-cols-3">
                  {roles.map((roleTitle) => (
                    <motion.div
                      key={roleTitle}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2.5 rounded-lg border border-[#ded6c7]/80 bg-[#f8f4ec] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#011330] transition-colors hover:border-[#BA780E] hover:bg-white hover:text-[#BA780E]"
                    >
                      <Briefcase size={14} className="text-[#BA780E] shrink-0" />
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
          <div className="mt-12 rounded-2xl border border-[#BA780E]/70 bg-[#011330] p-7 sm:p-9 text-center text-[#f8f4ec] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-[#BA780E]/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-[#BA780E]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#BA780E]/20 text-[#BA780E]">
                <HelpCircle size={22} />
              </div>

              <h3 className="serif text-base sm:text-lg md:text-xl font-semibold leading-tight uppercase tracking-wider text-[#f8f4ec]">
                Don’t See The Role You’re Looking For?
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-[#c4cdd1]">
                Connect with us, and we’ll work with you based on your background, career goals, and needs.
              </p>

              <div className="pt-2">
                <Link
                  href="/contact"
                  data-testid="button-careers-connect-cta"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[#BA780E] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#011330] shadow-lg transition-all hover:bg-[#d48b16] hover:shadow-xl active:scale-[0.99]"
                >
                  Connect With Us <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
