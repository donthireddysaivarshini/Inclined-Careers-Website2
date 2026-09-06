import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Meta } from "@/components/shared/Meta";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal, staggerContainer, staggerChild } from "@/components/shared/ScrollReveal";
import { IMAGES } from "@/constants/images";
import { services } from "@/constants/content";

export default function Services() {
  return (
    <main>
      <Meta
        title="Recruitment & Staffing Services | Inclined Careers"
        description="Explore talent acquisition, staffing, sourcing, screening, recruitment process support, and specialized recruitment services from Inclined Careers."
      />
      {/* SERVICES HERO SECTION - Minimalist, Compact, Centered */}
      <section className="relative overflow-hidden paper-grid border-b border-[#ded6c7] bg-[#f3eee4] px-6 py-10 md:py-14 text-center">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h1 className="serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-[-.025em] text-[#102944]">
              Recruitment solutions built around{" "}
              <em className="font-medium text-[#BA780E]">your needs.</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* 1. EMPLOYER INTRO */}
      <section className="container-wide border-b border-[#ded6c7] py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
          <ScrollReveal>
            <SectionLabel>Employer recruitment solutions</SectionLabel>
            <h2 className="serif mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-[#102944]">
              The right conversation comes first.
            </h2>
            <ul className="mt-5 max-w-xl space-y-2.5 text-sm sm:text-base leading-7 text-[#5d6971]">
              <li className="flex items-start gap-2.5">
                <span className="text-[#BA780E] font-bold">✓</span>
                <span><strong>Targeted Alignment:</strong> Connecting your team with qualified professionals matching your exact skill criteria.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#BA780E] font-bold">✓</span>
                <span><strong>Screened &amp; Vetted:</strong> Minimizing interview fatigue with day-one ready candidates.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#BA780E] font-bold">✓</span>
                <span><strong>Flexible Models:</strong> Supporting contract, permanent, and specialized hiring needs.</span>
              </li>
            </ul>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block mt-6">
              <Link
                href="/contact"
                data-testid="link-services-enquiry-top"
                className="inline-flex items-center gap-3 bg-[#102944] px-5 py-3.5 text-[.74rem] font-bold uppercase tracking-[.14em] text-[#f8f4ec] shadow-md transition-all hover:bg-[#102944] hover:shadow-xl"
              >
                Tell us what talent you need <ArrowRight size={15} className="text-[#BA780E]" />
              </Link>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="relative">
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-2xl border border-[#BA780E]/35 shadow-xl group"
            >
              <img
                src={IMAGES.conferenceStrategy}
                alt="Executive talent interview in bright glass consulting conference room"
                className="h-[340px] md:h-[380px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102944]/65 via-transparent to-transparent" />
            </motion.div>
            <div className="absolute -bottom-4 -left-4 rounded-xl border border-[#BA780E]/40 bg-[#f8f4ec] p-4 shadow-xl max-w-xs backdrop-blur-md">
              <p className="eyebrow text-[#BA780E]">Screened &amp; Vetted</p>
              <p className="serif text-xs sm:text-sm font-semibold text-[#102944] mt-1">
                Rigorous technical and communication qualification before candidate submission.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="paper-grid border-b border-[#ded6c7] bg-[#f3eee4] py-12 md:py-16">
        <div className="container-wide">
          <ScrollReveal>
            <SectionLabel>Comprehensive Recruitment Capabilities</SectionLabel>
            <h2 className="serif mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-[#102944]">
              Solutions Engineered for Precision &amp; Speed
            </h2>
          </ScrollReveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map(([title, copy], index) => (
              <motion.div
                key={title}
                variants={staggerChild}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group rounded-2xl border border-[#ded6c7] bg-[#fbf9f5]/85 backdrop-blur-md p-7 shadow-sm hover:border-[#BA780E] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#ded6c7]/60 pb-3 mb-4">
                    <span className="serif text-3xl font-semibold text-[#BA780E]">0{index + 1}</span>
                    <span className="text-[.66rem] font-bold uppercase tracking-wider text-[#8a969f]">Service</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#102944] group-hover:text-[#BA780E] transition-colors">
                    {title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-6 text-[#69747b]">{copy}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. CTA */}
      <section className="container-wide py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <ScrollReveal>
            <SectionLabel>For employers</SectionLabel>
            <h2 className="serif mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-[#102944]">
              Tell us what talent you need.
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-sm sm:text-base text-[#5d6971]">
              Share your hiring requirements with our recruitment team and initiate a conversation
              designed around precision and speed.
            </p>
            <Link
              href="/contact"
              data-testid="link-services-enquiry-bottom"
              className="group mt-6 inline-flex items-center gap-3 border-b-2 border-[#BA780E] pb-1.5 text-xs sm:text-sm font-bold text-[#102944] transition-colors hover:text-[#BA780E]"
            >
              Start hiring consultation{" "}
              <ArrowRight
                size={16}
                className="text-[#BA780E] transition-transform group-hover:translate-x-1.5"
              />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-2xl border border-[#BA780E]/35 shadow-xl group"
            >
              <img
                src={IMAGES.corporateHq}
                alt="Modern corporate glass architecture representing enterprise hiring partnership"
                className="h-[280px] md:h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102944]/80 via-[#102944]/20 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-[#f8f4ec]">
                <p className="eyebrow text-[#BA780E]">Strategic Partnership</p>
                <p className="text-xs sm:text-sm text-[#e6e0d7] mt-1">
                  Flexible engagement models for contract, permanent, and specialized roles.
                </p>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
