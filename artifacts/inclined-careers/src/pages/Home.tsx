import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Meta } from "@/components/shared/Meta";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal, staggerContainer, staggerChild } from "@/components/shared/ScrollReveal";
import { IMAGES, imageUrl } from "@/constants/images";
import { industries, services } from "@/constants/content";
import { OrbitalHeroSection, INCLINED_SYSTEM } from "@/components/ui/orbital-hero-section";
import { InfiniteMarquee } from "@/components/shared/InfiniteMarquee";

function useIsMobile(query = "(max-width: 768px)") {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const sync = () => setIsMobile(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, [query]);
  return isMobile;
}

const HERO_PILLARS = [
  { num: "01", label: "Human-led support" },
  { num: "02", label: "Qualified talent" },
  { num: "03", label: "Personalized guidance" },
  { num: "04", label: "No salary commission" },
];

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <main>
      <Meta
        title="Inclined Careers | Connecting You to the Right Path | Career & Recruitment Support"
        description="Inclined Careers connects exceptional professionals with US career opportunities and empowers employers with qualified talent across Technology, Healthcare, Data Centers, and Embedded Systems. 100% human-led guidance with 0% salary commission."
        keywords="career guidance, US recruitment support, job placement, talent acquisition, IT recruiting, healthcare staffing, data center careers, embedded systems recruitment, resume preparation, no salary commission"
        canonicalPath="/"
        schema={{
          "@type": "EmploymentAgency",
          "@id": "https://inclinedcareers.in/#agency",
          "name": "Inclined Careers",
          "url": "https://inclinedcareers.in/",
          "logo": "https://inclinedcareers.in/logo.PNG",
          "description": "Connecting You to the Right Path. Human-led career guidance, dedicated recruitment support, and US job placement with 0% salary commission.",
          "telephone": "+1-808-400-3068",
          "email": "info@inclinedcareers.in",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "addressCountry": "IN"
          },
          "areaServed": [
            { "@type": "Country", "name": "United States" },
            { "@type": "Country", "name": "India" }
          ],
          "knowsAbout": [
            "Information Technology Staffing",
            "Healthcare Recruitment",
            "Data Center Operations",
            "Embedded Systems Engineering",
            "Executive and Technical Search"
          ]
        }}
      />

      {/* 1. HERO SECTION */}
      {isMobile ? (
        /* MOBILE HERO: Clean, simple, fast (no canvas animation), with 2-column pillars in solid cream bar */
        <section className="relative overflow-hidden bg-[#011330] text-[#f8f4ec] flex flex-col min-h-screen pt-20 justify-between">
          <div className="flex-1 flex flex-col justify-center px-5 py-10 max-w-xl mx-auto w-full">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BA780E]/40 bg-[#011330]/80 px-3 py-1 text-[.64rem] uppercase tracking-[.14em] text-[#BA780E] backdrop-blur-md mb-4 w-fit">
              <Sparkles size={12} />
              <span>Career &amp; Recruitment Support</span>
            </div>

            {/* 1. The Main H1 (Stacked Brand Name) */}
            <h1 className="serif text-3xl sm:text-4xl font-bold tracking-wide uppercase leading-none">
              <span className="block text-[#FFFFFF]">INCLINED</span>
              <span className="block text-[#BA780E]">CAREERS</span>
            </h1>

            {/* 2. The Sub-heading (The Tagline) */}
            <p className="mt-2.5 text-lg sm:text-xl font-medium text-[#FFFFFF]">
              Connecting You to the Right Path.
            </p>

            {/* 3. The Body Text */}
            <p className="mt-4 text-xs sm:text-sm font-normal leading-relaxed text-[#f0ebe1]">
              Helping professionals find the right opportunities and helping employers connect with the right talent.
            </p>

            <p className="mt-2 text-xs leading-5 text-[#9eafb8]">
              Personalized 1:1 guidance with dedicated recruiter attention and zero salary commission.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/careers"
                data-testid="link-home-careers-mobile"
                className="inline-flex items-center justify-center gap-2 bg-[#BA780E] px-5 py-3 text-xs font-bold uppercase tracking-[.12em] text-[#011330] shadow-md"
              >
                Explore opportunities
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                data-testid="link-home-contact-mobile"
                className="inline-flex items-center justify-center gap-2 border border-[#80909b] px-5 py-3 text-xs font-bold uppercase tracking-[.12em] text-[#f8f4ec]"
              >
                Talk to our team
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Mobile: 4 items in solid cream bar divided into two columns */}
          <div className="border-t border-[#ded6c7]/80 bg-[#FAF9F6] px-5 py-6 shadow-sm">
            <p className="text-[.68rem] uppercase tracking-wider text-[#727b80] mb-3 font-semibold text-center">
              Why Choose Inclined Careers
            </p>
            <div className="grid grid-cols-2 gap-3">
              {HERO_PILLARS.map((item) => (
                <div
                  key={item.num}
                  className="flex items-center gap-2.5 rounded-lg border border-gray-200/90 bg-white p-3 shadow-xs"
                >
                  <span className="text-[#BA780E] font-medium text-xs sm:text-sm">{item.num}</span>
                  <span className="text-[#011330] font-semibold tracking-wider text-xs uppercase leading-snug">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* DESKTOP HERO: Full screen flex-col wrapper with flex-1 relative canvas and bottom solid cream bar */
        <section className="relative overflow-hidden bg-[#011330] flex flex-col min-h-screen lg:h-screen pt-16 lg:pt-20 justify-between">
          {/* Top Part: OrbitalHeroSection taking up remaining space using flex-1 relative */}
          <div className="flex-1 relative flex flex-col justify-center overflow-hidden">
            <OrbitalHeroSection
              backgroundColor="#011330"
              sunColor="#BA780E"
              planets={INCLINED_SYSTEM}
              focus={[0.74, 0.44]}
              scrim="left"
              scrimStrength={0.92}
              viewRadius={3.1}
              lead={0.12}
              glow={1.1}
              driftSpeed={1.3}
              trailYears={2.8}
              className="w-full h-full flex flex-col justify-center"
            >
              <div className="container-wide relative z-10 py-8 flex flex-col justify-center">
                <div className="max-w-2xl">
                  <ScrollReveal>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#BA780E]/40 bg-[#011330]/80 px-3.5 py-1 text-[.66rem] uppercase tracking-[.16em] text-[#BA780E] backdrop-blur-md shadow-sm mb-4">
                      <Sparkles size={12} />
                      <span>Career &amp; Recruitment Support</span>
                    </div>

                    {/* 1. The Main H1 (Stacked Brand Name) */}
                    <h1 className="serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide uppercase leading-none">
                      <span className="block text-[#FFFFFF]">INCLINED</span>
                      <span className="block text-[#BA780E]">CAREERS</span>
                    </h1>

                    {/* 2. The Sub-heading (The Tagline) */}
                    <p className="mt-3 md:mt-4 text-xl md:text-2xl font-medium text-[#FFFFFF]">
                      Connecting You to the Right Path.
                    </p>

                    {/* 3. The Body Text */}
                    <p className="mt-5 max-w-xl text-base sm:text-lg font-normal leading-snug text-[#f0ebe1]">
                      Helping professionals find the right opportunities and helping employers connect with the right talent.
                    </p>

                    <p className="mt-2.5 max-w-lg text-xs sm:text-sm leading-relaxed text-[#9eafb8]">
                      At Inclined Careers, we believe the right opportunity shapes a person's future. Our team provides personalized 1:1 guidance with dedicated recruiter support and zero salary commission.
                    </p>

                    <div className="mt-6 flex items-center gap-4">
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          href="/careers"
                          data-testid="link-home-careers"
                          className="group inline-flex items-center gap-2.5 bg-[#BA780E] px-6 py-3.5 text-xs font-bold uppercase tracking-[.14em] text-[#011330] shadow-md transition-all hover:bg-[#BA780E] hover:shadow-xl"
                        >
                          Explore opportunities
                          <ArrowRight
                            size={15}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </Link>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          href="/contact"
                          data-testid="link-home-contact-hero"
                          className="group inline-flex items-center gap-2.5 border border-[#80909b] px-6 py-3.5 text-xs font-bold uppercase tracking-[.14em] text-[#f8f4ec] transition-all hover:border-[#BA780E] hover:text-[#BA780E]"
                        >
                          Talk to our team
                          <ArrowRight
                            size={15}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </Link>
                      </motion.div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </OrbitalHeroSection>
          </div>

          {/* 2. SOLID CREAM BAR (TRUST STRIP) - Anchors absolute bottom of viewport */}
          <div className="relative z-20 border-t border-[#ded6c7]/80 bg-[#FAF9F6] shadow-sm">
            <div className="container-wide grid grid-cols-4 py-6 px-4">
              {HERO_PILLARS.map((item, index) => (
                <div
                  key={item.num}
                  className={`flex items-center justify-center gap-3 py-1 px-4 ${
                    index < 3 ? "border-r border-gray-200" : ""
                  }`}
                >
                  <span className="text-[#BA780E] font-medium text-sm lg:text-base">{item.num}</span>
                  <span className="text-[#011330] font-semibold tracking-wider text-xs lg:text-sm uppercase">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TRENDING INFINITE MARQUEE (Directly below Hero Trust Strip) */}
      <InfiniteMarquee />

      {/* 2. TWO PATHS SECTION */}
      <section
        id="home-overview"
        className="section-slide border-b border-[#ded6c7]/60 py-16 md:py-24"
      >
        <div className="container-wide grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          <ScrollReveal className="lg:col-span-5 flex flex-col gap-6">
            <SectionLabel>Two paths, one purpose</SectionLabel>
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-xl border border-[#BA780E]/35 shadow-2xl group"
            >
              <img
                src={IMAGES.techWorkspace}
                alt="Two Paths, One Purpose - Dedicated Candidate and Employer Alignment"
                className="w-full h-auto aspect-[3/2] sm:aspect-auto sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011330]/80 via-[#011330]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-lg bg-[#011330]/90 backdrop-blur-md border border-[#BA780E]/30 text-[#f8f4ec]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#BA780E]">
                  Our Commitment
                </p>
                <p className="serif text-sm sm:text-base font-medium text-[#f8f4ec] mt-1 uppercase tracking-wide">
                  1:1 Recruiter Attention · Zero Hidden Placement Fees
                </p>
              </div>
            </motion.div>
          </ScrollReveal>

          <div className="lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <h2 className="serif text-lg sm:text-xl md:text-2xl font-semibold leading-tight tracking-wider text-[#011330] uppercase">
                Built Around People. Focused on the Right Opportunities.
              </h2>
              <p className="mt-5 max-w-xl text-sm sm:text-base leading-7 text-[#5d6971]">
                Whether you are building your career or building your team, our work begins with
                listening and ends with a more considered connection.
              </p>

              <div className="mt-8 grid gap-6 border-t border-[#d9d1c3] pt-6 sm:grid-cols-2">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl border border-[#d9d1c3] bg-[#fbf9f5] p-5 shadow-sm hover:border-[#BA780E] hover:shadow-lg transition-all"
                >
                  <p className="eyebrow text-[#BA780E]">For candidates</p>
                  <h3 className="serif mt-2 text-sm sm:text-base font-semibold leading-snug tracking-wider text-[#011330] uppercase">
                    Looking for Your Next Opportunity?
                  </h3>
                  <ul className="mt-3.5 space-y-2 text-xs sm:text-sm leading-6 text-[#5d6971]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#BA780E] font-bold">✓</span>
                      <span>Dedicated 1:1 recruiter support Monday through Friday.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#BA780E] font-bold">✓</span>
                      <span>Support with US job markets, work authorization &amp; visa timelines.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#BA780E] font-bold">✓</span>
                      <span>0% salary deduction — keep 100% of your earnings.</span>
                    </li>
                  </ul>
                  <Link
                    href="/careers"
                    data-testid="link-home-candidate-path"
                    className="group mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#011330] transition-colors hover:text-[#BA780E]"
                  >
                    Explore opportunities{" "}
                    <ArrowRight
                      size={15}
                      className="text-[#BA780E] transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl border border-[#d9d1c3] bg-[#fbf9f5] p-5 shadow-sm hover:border-[#BA780E] hover:shadow-lg transition-all"
                >
                  <p className="eyebrow text-[#BA780E]">For employers</p>
                  <h3 className="serif mt-2 text-sm sm:text-base font-semibold leading-snug tracking-wider text-[#011330] uppercase">
                    Looking for the Right Talent?
                  </h3>
                  <ul className="mt-3.5 space-y-2 text-xs sm:text-sm leading-6 text-[#5d6971]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#BA780E] font-bold">✓</span>
                      <span>Pre-screened candidates matching precise skill requirements.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#BA780E] font-bold">✓</span>
                      <span>Accelerated hiring with reduced interview fatigue.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#BA780E] font-bold">✓</span>
                      <span>Flexible permanent and contract staffing models.</span>
                    </li>
                  </ul>
                  <Link
                    href="/services"
                    data-testid="link-home-employer-path"
                    className="group mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#011330] transition-colors hover:text-[#BA780E]"
                  >
                    Hire the right talent{" "}
                    <ArrowRight
                      size={15}
                      className="text-[#BA780E] transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. SERVICES OVERVIEW */}
      <section className="section-slide container-wide border-t border-[#ded6c7] py-14 md:py-20">
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel>Our services</SectionLabel>
              <h2 className="serif mt-2 max-w-2xl text-lg sm:text-xl md:text-2xl font-semibold leading-tight tracking-wider text-[#011330] uppercase">
                Recruitment Support That Moves Careers Forward
              </h2>
            </div>
            <Link
              href="/services"
              data-testid="link-home-services"
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#011330] transition-colors hover:text-[#BA780E]"
            >
              Explore all services{" "}
              <ArrowRight
                size={15}
                className="text-[#BA780E] transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 grid gap-x-12 gap-y-0 border-t border-[#d9d1c3] md:grid-cols-2"
        >
          {services.map(([title, copy], index) => (
            <motion.div
              key={title}
              variants={staggerChild}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-[48px_1fr] gap-5 border-b border-[#d9d1c3] py-7 transition-colors hover:bg-[#fbf9f5] px-3 rounded-lg"
            >
              <span className="serif text-2xl sm:text-3xl text-[#BA780E] font-bold">0{index + 1}</span>
              <div>
                <h3 className="font-semibold text-[#011330] text-xs sm:text-sm uppercase tracking-wider">{title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-6 text-[#69747b]">{copy}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. CONDENSED HORIZONTAL HOW WE WORK */}
      <section className="section-slide-compact bg-[#f7f4ed] border-y border-[#ded6c7] py-14 md:py-18">
        <div className="container-wide">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <SectionLabel>A more human approach to recruitment</SectionLabel>
                <h2 className="serif mt-2 max-w-2xl text-lg sm:text-xl md:text-2xl font-semibold leading-tight tracking-wider text-[#011330] uppercase">
                  How we work
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#727b80] max-w-md">
                Our structured four-step methodology ensures clarity, speed, and precision for both candidates and employers.
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              ["01", "Understand", "We take the time to understand your goals, skills, experience, and requirements."],
              ["02", "Identify", "We identify matching opportunities and qualified candidate profiles with precision."],
              ["03", "Connect", "We facilitate direct, meaningful connections between candidates and employers."],
              ["04", "Support", "We provide proactive 1:1 guidance throughout the entire recruitment journey."],
            ].map(([num, title, copy], index) => (
              <motion.div
                key={title}
                variants={staggerChild}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-xl border border-[#ded6c7] bg-[#fbf9f5] p-5 shadow-sm hover:border-[#BA780E] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#ded6c7]/60 pb-3 mb-3.5">
                    <span className="serif text-2xl font-semibold text-[#BA780E]">{num}</span>
                    <span className="text-[.66rem] font-bold uppercase tracking-wider text-[#8a969f]">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#011330]">{title}</h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#69747b]">{copy}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. NO COMMISSION FROM YOUR JOB */}
      <section className="section-slide bg-[#011330] text-[#f8f4ec] py-16 md:py-24 relative overflow-hidden">
        <div className="container-wide grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <ScrollReveal>
            <SectionLabel light>No commission from your job</SectionLabel>
            <h2 className="serif mt-3 text-[0.95rem] sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold leading-tight tracking-normal sm:tracking-wider text-[#f8f4ec] uppercase whitespace-nowrap">
              Your success belongs to you.
            </h2>
            <ul className="mt-5 max-w-xl text-sm sm:text-base leading-7 text-[#c4cdd1] space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#BA780E] shrink-0 mt-1" />
                <span>
                  <strong>0% Salary Cut:</strong> We do not take any percentage or commission from your salary after placement.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#BA780E] shrink-0 mt-1" />
                <span>
                  <strong>Zero Deductions:</strong> You never owe us or any member of our team a single penny from your paycheck.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#BA780E] shrink-0 mt-1" />
                <span>
                  <strong>Transparent Support:</strong> No hidden placement commissions or post-placement charges.
                </span>
              </li>
            </ul>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block mt-7">
              <Link
                href="/contact"
                data-testid="link-home-trust-contact"
                className="inline-flex items-center gap-2.5 bg-[#BA780E] px-6 py-3.5 text-[.74rem] font-bold uppercase tracking-[.14em] text-[#011330] transition-all hover:bg-[#BA780E] shadow-lg"
              >
                Talk to our team <ArrowRight size={15} />
              </Link>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="relative">
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-xl border border-[#BA780E]/40 shadow-2xl group bg-[#011330]"
            >
              <img
                src={IMAGES.executiveConsulting}
                alt="Your Success Belongs To You - 0% Commission Policy"
                className="w-full h-auto aspect-[16/9] object-contain sm:object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011330]/80 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 rounded-xl border border-[#BA780E]/40 bg-[#011330]/95 p-4 sm:p-6 text-[#f8f4ec] shadow-2xl backdrop-blur-md max-w-sm sm:max-w-xs">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={24} className="text-[#BA780E] shrink-0" />
                <div>
                  <p className="text-[.7rem] sm:text-xs font-bold uppercase tracking-wider text-[#BA780E]">
                    Transparent Policy
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-[#f8f4ec]">
                    0% Salary Cut · Keep 100% of Your Earnings
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. LAUNCH SPECIAL */}
      <section className="section-slide-compact container-wide border-b border-[#ded6c7] py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          <ScrollReveal className="lg:col-span-6">
            <SectionLabel>Launch special</SectionLabel>
            <h2 className="serif mt-2 text-lg sm:text-xl md:text-2xl font-semibold leading-tight tracking-wider text-[#011330] uppercase">
              We're celebrating our launch with special pricing!
            </h2>
            <p className="mt-3.5 text-xs sm:text-sm leading-6 text-[#69747b]">
              Get comprehensive career navigation, dedicated recruiter matching, and personalized
              guidance at our introductory rate.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="lg:col-span-6">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-center rounded-2xl border border-[#BA780E]/40 bg-[#fbf9f5] p-7 sm:p-9 shadow-xl"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-2xl sm:text-3xl text-[#98a0a4] line-through font-semibold">$299</span>
                <span className="text-5xl md:text-6xl font-bold leading-none text-[#011330] tracking-tight">
                  $199
                </span>
                <span className="inline-flex items-center rounded-full bg-[#BA780E]/15 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-[#BA780E]">
                  Save $100
                </span>
              </div>
              <p className="mt-2.5 text-xs text-[#69747b] uppercase tracking-wider font-medium">
                Offer valid through December 2026 · Limited availability
              </p>

              {/* Exact Bullet Points */}
              <ul className="mt-5 space-y-3 border-t border-[#ded6c7] pt-5 text-xs sm:text-sm font-medium text-[#011330]">
                {[
                  "Dedicated 1:1 Recruiter Support",
                  "Targeted Job Search & Applications",
                  "Resume Support Based on Each Role",
                  "No Post-Placement Commission",
                  "No Hidden Fees & Charges",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#BA780E] shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <Link
                  href="/contact"
                  data-testid="link-home-launch"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl active:scale-[0.99]"
                >
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* 10. FINAL CTA BANNER */}
      <section className="bg-[#e8dfd0] py-16 md:py-20">
        <div className="container-wide flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <ScrollReveal>
            <SectionLabel>Take the next step</SectionLabel>
            <h2 className="serif mt-2 max-w-2xl text-lg sm:text-xl md:text-2xl font-semibold leading-tight tracking-wider text-[#011330] uppercase">
              Your Next Opportunity Could Be the Right One.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-[#5d6971]">
              Whether you're looking for your next career opportunity or searching for the right
              talent for your organization, we're here to help you take the next step.
            </p>
          </ScrollReveal>
          <div className="flex shrink-0 flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/careers"
                data-testid="link-home-final-careers"
                className="inline-flex items-center gap-3 bg-[#011330] px-6 py-4 text-[.74rem] font-bold uppercase tracking-[.12em] text-[#f8f4ec] shadow-md transition-all hover:bg-[#011330] hover:shadow-xl"
              >
                Explore opportunities <ArrowRight size={16} className="text-[#BA780E]" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/services"
                data-testid="link-home-final-employers"
                className="inline-flex items-center gap-3 border border-[#011330] px-6 py-4 text-[.74rem] font-bold uppercase tracking-[.12em] text-[#011330] transition-all hover:bg-[#011330]/5"
              >
                Hire the right talent <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
