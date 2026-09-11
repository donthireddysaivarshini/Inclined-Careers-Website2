import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, Loader2, Mail, Phone } from "lucide-react";
import { useSendEnquiry } from "@workspace/api-client-react";
import { Meta } from "@/components/shared/Meta";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Field, StatusMessage } from "@/components/shared/FormFields";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ThankYouModal } from "@/components/shared/ThankYouModal";

type Audience = "Candidate" | "Employer";

const INITIAL_FORM_STATE = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  areaOfInterest: "",
  message: "",
};

export default function Contact() {
  const sendEnquiry = useSendEnquiry();
  const [audience, setAudience] = useState<Audience>("Candidate");
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [submittedInfo, setSubmittedInfo] = useState<{ name: string; interest: string }>({
    name: "",
    interest: "",
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [feedback, setFeedback] = useState<"success" | "error" | "">("");
  const [feedbackText, setFeedbackText] = useState("");

  const update = (key: keyof typeof form) => (value: string) =>
    setForm((old) => ({ ...old, [key]: value }));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setFeedback("");
    const currentName = form.fullName;
    const currentInterest = form.areaOfInterest || (audience === "Candidate" ? "Career Advisory" : "Talent Search");

    sendEnquiry.mutate(
      {
        data: {
          ...form,
          type: audience,
          areaOfInterest: currentInterest,
        },
      },
      {
        onSuccess: () => {
          setSubmittedInfo({ name: currentName, interest: currentInterest });
          // Reset form fields back to default
          setForm(INITIAL_FORM_STATE);
          // Trigger dedicated Thank You Modal Popup
          setShowThankYou(true);
        },
        onError: () => {
          setFeedback("error");
          setFeedbackText("We could not submit your enquiry right now. Please try again.");
        },
      }
    );
  };

  return (
    <main>
      <Meta
        title="Contact Us | Connect with Recruiter Support | Inclined Careers"
        description="Get in touch with the team at Inclined Careers. Whether hiring qualified professionals or seeking career transition guidance, our dedicated advisors are here to help."
        keywords="contact inclined careers, recruiter support, hire talent, candidate application, US career consultation, recruitment advisor Hyderabad, employer talent inquiry"
        canonicalPath="/contact"
        breadcrumbs={[{ name: "Contact Us", path: "/contact" }]}
        schema={{
          "@type": "ContactPage",
          "@id": "https://inclinedcareers.in/contact#webpage",
          "url": "https://inclinedcareers.in/contact",
          "name": "Contact Us | Connect with Recruiter Support | Inclined Careers",
          "description": "Connect with recruitment advisors at Inclined Careers for career guidance or employer staffing support.",
          "mainEntity": {
            "@type": "Organization",
            "name": "Inclined Careers",
            "url": "https://inclinedcareers.in/",
            "telephone": "+1-808-400-3068",
            "email": "info@inclinedcareers.in",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Hyderabad",
              "addressRegion": "Telangana",
              "addressCountry": "IN"
            }
          }
        }}
      />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden paper-grid border-b border-[#ded6c7] bg-[#f3eee4] px-6 py-10 md:py-14 text-center">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h1 className="serif text-xl sm:text-2xl md:text-3xl font-semibold leading-tight tracking-wider uppercase text-[#011330]">
              Let's Find The <span className="font-semibold text-[#BA780E]">Right Path.</span>
            </h1>
            <p className="mt-3.5 max-w-xl mx-auto text-sm md:text-base text-[#5d6971]">
              Whether you're looking for your next opportunity or searching for the right talent, our team is here to help.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="container-wide py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-14 items-start">
          <ScrollReveal className="space-y-8">
            <div>
              <SectionLabel>Let's connect</SectionLabel>
              <h2 className="serif mt-2.5 text-lg sm:text-xl md:text-2xl font-semibold leading-tight tracking-wider uppercase text-[#011330]">
                We're Here To Help You Navigate Forward
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#5d6971]">
                Reach out to speak with an advisor. We'll connect you with the appropriate recruiter
                or hiring specialist.
              </p>
            </div>

            <div className="space-y-4 rounded-2xl border border-[#ded6c7] bg-[#fbf9f5] p-6 shadow-sm">
              <a
                href="tel:+18084003068"
                data-testid="link-contact-phone"
                className="flex items-center gap-3 text-sm font-medium text-[#011330] transition-colors hover:text-[#BA780E]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8dfd0] text-[#BA780E]">
                  <Phone size={16} />
                </div>
                +1808-400-3068
              </a>
              <a
                href="mailto:info@inclinedcareers.in"
                data-testid="link-contact-email"
                className="flex items-center gap-3 text-sm font-medium text-[#011330] transition-colors hover:text-[#BA780E]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8dfd0] text-[#BA780E]">
                  <Mail size={16} />
                </div>
                info@inclinedcareers.in
              </a>
              <div className="flex items-center gap-3 text-sm text-[#5d6971]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8dfd0] text-[#BA780E]">
                  <Award size={16} />
                </div>
                <span>Hyderabad, India · US-Focused Recruitment</span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#ded6c7] bg-[#011330] p-6 text-[#f8f4ec] shadow-xl">
              <p className="eyebrow text-[#BA780E]">Response Time</p>
              <p className="serif text-base sm:text-lg font-semibold mt-1">Within 24 Business Hours</p>
              <p className="text-xs text-[#b9c1c6] mt-2 leading-relaxed">
                Every enquiry is addressed directly by a senior recruitment team member.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <form
              onSubmit={submit}
              className="rounded-2xl border border-[#ded6c7] bg-[#fbf9f5] p-6 sm:p-8 shadow-lg"
            >
              <fieldset>
                <legend className="mb-3 text-[.72rem] font-bold uppercase tracking-[.12em] text-[#596770]">
                  I am a...
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  {(["Candidate", "Employer"] as Audience[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setAudience(item)}
                      aria-pressed={audience === item}
                      data-testid={`button-audience-${item.toLowerCase()}`}
                      className={`rounded-xl border px-4 py-3 text-center text-sm font-bold transition-all ${
                        audience === item
                          ? "border-[#011330] bg-[#011330] text-[#f8f4ec] shadow-md"
                          : "border-[#c6bdad] bg-transparent text-[#5d6971] hover:border-[#BA780E]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full name"
                  name="enquiry-fullName"
                  value={form.fullName}
                  onChange={update("fullName")}
                />
                <Field
                  label="Email"
                  name="enquiry-email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                />
                <Field
                  label="Phone"
                  name="enquiry-phone"
                  value={form.phone}
                  onChange={update("phone")}
                />
                {audience === "Employer" && (
                  <Field
                    label="Company name"
                    name="companyName"
                    value={form.companyName}
                    onChange={update("companyName")}
                  />
                )}
                <Field
                  label="Area of interest / role"
                  name="areaOfInterest"
                  value={form.areaOfInterest}
                  onChange={update("areaOfInterest")}
                  placeholder={
                    audience === "Employer"
                      ? "Employer recruitment solutions"
                      : "Candidate roles and application"
                  }
                />
              </div>

              <div className="mt-8">
                <label
                  htmlFor="enquiry-message"
                  className="mb-2 block text-[.72rem] font-bold uppercase tracking-[.1em] text-[#596770]"
                >
                  Message <span className="text-[#BA780E]">*</span>
                </label>
                <textarea
                  id="enquiry-message"
                  required
                  minLength={10}
                  rows={4}
                  value={form.message}
                  onChange={(event) => update("message")(event.target.value)}
                  data-testid="input-enquiry-message"
                  className="w-full resize-y border-b border-[#bdb5a6] bg-transparent px-0 py-3 text-[#011330] outline-none placeholder:text-[#a1a19b] focus:border-[#BA780E]"
                  placeholder="Tell us a little more about what you're looking for"
                />
              </div>

              {feedback && <StatusMessage type={feedback}>{feedbackText}</StatusMessage>}

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button
                  type="submit"
                  disabled={sendEnquiry.isPending}
                  data-testid="button-submit-enquiry"
                  className="mt-8 inline-flex items-center gap-3 bg-[#011330] px-7 py-4 text-[.74rem] font-bold uppercase tracking-[.14em] text-[#f8f4ec] shadow-md transition-all hover:bg-[#011330] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sendEnquiry.isPending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending
                    </>
                  ) : (
                    <>
                      Send enquiry <ArrowRight size={16} className="text-[#BA780E]" />
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER STRIP */}
      <section className="bg-[#e8dfd0] border-t border-[#ded6c7]">
        <div className="container-wide flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="serif text-lg sm:text-xl md:text-2xl font-semibold text-[#011330]">
            Connecting You to the Right Path.
          </p>
          <p className="text-xs uppercase tracking-wider text-[#69747b]">
            Inclined Careers · Hyderabad, India
          </p>
        </div>
      </section>

      {/* DEDICATED THANK YOU POPUP */}
      <ThankYouModal
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
        title="Thank You for Reaching Out!"
        subtitle={
          submittedInfo.name
            ? `Thank you, ${submittedInfo.name}. We have received your ${audience.toLowerCase()} enquiry and an advisor from our team will contact you within 24 business hours.`
            : undefined
        }
        type="enquiry"
        referenceInfo={submittedInfo.interest}
      />
    </main>
  );
}
