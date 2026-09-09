import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Users } from "lucide-react";
import { Meta } from "@/components/shared/Meta";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { IMAGES } from "@/constants/images";

export default function About() {
  return (
    <main>
      <Meta
        title="About Inclined Careers | Career & Recruitment Support"
        description="Learn how Inclined Careers supports professionals and employers with human-led recruitment and career guidance."
      />

      {/* ABOUT US HERO SECTION - Minimalist, Compact, Centered */}
      <section className="relative overflow-hidden paper-grid border-b border-[#ded6c7] bg-[#f3eee4] px-6 py-10 md:py-14 text-center">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h1 className="serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight uppercase tracking-wide text-[#011330]">
              Connecting people, opportunities, and organizations to the{" "}
              <span className="text-[#BA780E]">right path.</span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* BENTO GRID LAYOUT */}
      <section className="container-wide py-12 md:py-16">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1 (Large - Span 2 cols): "The Mission" */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25 }}
              className="md:col-span-2 relative overflow-hidden rounded-2xl border border-[#ded6c7] bg-[#fbf9f5] shadow-sm flex flex-col justify-between group"
            >
              <div className="p-7 sm:p-9 relative z-10">
                <SectionLabel>The Mission</SectionLabel>
                <h2 className="serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight uppercase tracking-wide text-[#011330] mt-3">
                  A Career Is More Than Just A Job.
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5d6971] max-w-xl">
                  At Inclined Careers, we believe the right opportunity shapes a person's future—representing dreams, family, stability, and years of hard work. We are dedicated to ensuring no professional navigates career transitions alone.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-[#727b80] font-semibold">
                  <span className="flex items-center gap-1.5"><span className="text-[#BA780E]">✦</span> Hyderabad, India</span>
                  <span className="flex items-center gap-1.5"><span className="text-[#BA780E]">✦</span> US-Focused Recruitment</span>
                  <span className="flex items-center gap-1.5"><span className="text-[#BA780E]">✦</span> 1:1 Human Guidance</span>
                </div>
              </div>
              <div className="relative h-56 sm:h-64 w-full overflow-hidden border-t border-[#ded6c7]/60">
                <img
                  src={IMAGES.teamCollaboration}
                  alt="Indian professionals collaborating in modern USA corporate office"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#011330]/65 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Bento Card 2 (Small - Accent background): "Real 1:1 Support" */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25 }}
              className="md:col-span-1 rounded-2xl border border-[#BA780E]/30 bg-[#011330] text-[#f8f4ec] p-7 sm:p-9 flex flex-col justify-between shadow-md relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#BA780E]/40 bg-[#011330] px-3 py-1 text-[.66rem] uppercase tracking-wider text-[#BA780E]">
                    <Users size={12} />
                    <span>Human-to-Human</span>
                  </span>
                  <span className="serif text-xl font-bold text-[#BA780E]">02</span>
                </div>
                <h3 className="serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#f8f4ec] mt-6">
                  Real 1:1 Support
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#c4cdd1]">
                  No automated application bots or impersonal queues. You work one-on-one with a dedicated recruiter Monday through Friday focused on legitimate opportunities that align with your experience and career goals.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-[#39516a]/70 flex items-center justify-between text-xs text-[#BA780E] font-semibold">
                <span>Direct Monday–Friday Access</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>

            {/* Bento Card 3 (Small): "Navigating US Careers" */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25 }}
              className="md:col-span-1 rounded-2xl border border-[#ded6c7] bg-[#fbf9f5] p-7 sm:p-9 flex flex-col justify-between shadow-sm hover:border-[#BA780E] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-[#BA780E]">Specialized Advisory</span>
                  <span className="serif text-xl font-semibold text-[#BA780E]">03</span>
                </div>
                <h3 className="serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#011330] mt-4">
                  Navigating US Careers
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5d6971]">
                  Finding the right path in the United States requires navigating visa timelines, work authorization, and changing job markets. We stand beside you with proactive guidance so you never navigate your career in isolation.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-[#ded6c7]/80 flex items-center gap-2 text-xs font-bold text-[#011330]">
                <CheckCircle2 size={16} className="text-[#BA780E] shrink-0" />
                <span>Work Authorization &amp; Timeline Support</span>
              </div>
            </motion.div>

            {/* Bento Card 4 (Wide - Span 2 cols): "The Zero Commission Promise" */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25 }}
              className="md:col-span-2 rounded-2xl border border-[#BA780E]/40 bg-[#011330] text-[#f8f4ec] p-7 sm:p-9 flex flex-col justify-between shadow-xl relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#BA780E]/40 bg-[#011330]/80 px-3.5 py-1 text-[.66rem] uppercase tracking-wider text-[#BA780E] font-bold">
                    <ShieldCheck size={13} />
                    <span>Transparent Policy</span>
                  </span>
                  <span className="serif text-xl font-semibold text-[#BA780E]">04</span>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr] items-center">
                  <div>
                    <h3 className="serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#f8f4ec]">
                      The Zero Commission Promise
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#c4cdd1]">
                      Your success belongs entirely to you. Inclined Careers does not take any percentage or commission from your salary after placement. Once you are hired, you never owe us a single penny from your paycheck.
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#BA780E]/30 bg-[#011330]/90 p-5 backdrop-blur-md text-center">
                    <span className="serif text-4xl sm:text-5xl font-bold text-[#BA780E]">0%</span>
                    <p className="text-xs uppercase tracking-wider text-[#f8f4ec] font-bold mt-1">
                      Salary Commission
                    </p>
                    <p className="text-[.72rem] text-[#9eafb8] mt-1">Keep 100% of your earnings</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#39516a]/70 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#9eafb8]">No post-placement charges · Complete financial transparency</span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#BA780E] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#011330] shadow hover:bg-[#BA780E] transition-all"
                >
                  Talk to our team
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
