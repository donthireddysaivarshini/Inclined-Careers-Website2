import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Check,
  CheckCircle2,
  FileText,
  Loader2,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";
import { useSubmitApplication } from "@workspace/api-client-react";
import { Meta } from "@/components/shared/Meta";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Field, StatusMessage } from "@/components/shared/FormFields";
import { ScrollReveal, staggerChild, staggerContainer } from "@/components/shared/ScrollReveal";
import { roleGroups } from "@/constants/content";
import { ThankYouModal } from "@/components/shared/ThankYouModal";

const INITIAL_APPLICATION_FORM = {
  fullName: "",
  email: "",
  phone: "",
  currentLocation: "",
  role: "",
  yearsOfExperience: "",
  linkedin: "",
  message: "",
};

export default function Careers() {
  const submitApplication = useSubmitApplication();
  const fileRef = useRef<HTMLInputElement>(null);

  // Filter state
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Modal & Selection state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Thank You Popup state
  const [showThankYou, setShowThankYou] = useState(false);
  const [submittedCandidate, setSubmittedCandidate] = useState({ name: "", role: "" });

  // Form state
  const [form, setForm] = useState(INITIAL_APPLICATION_FORM);

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [feedback, setFeedback] = useState<"success" | "error" | "">("");
  const [feedbackText, setFeedbackText] = useState("");

  const update = (key: keyof typeof form) => (value: string) =>
    setForm((old) => ({ ...old, [key]: value }));

  // Handle opening application modal with pre-filled role
  const handleOpenModal = (roleTitle: string, category: string = "General") => {
    setSelectedRole(roleTitle);
    setSelectedCategory(category);
    setForm({
      ...INITIAL_APPLICATION_FORM,
      role: roleTitle === "General Application" ? "" : roleTitle,
    });
    setFeedback("");
    setFeedbackText("");
    setFileError("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Lock body scroll when modal is open and handle ESC key
  useEffect(() => {
    if (!isModalOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const chooseFile = (next: File | undefined) => {
    if (!next) return;
    if (!/\.(pdf|doc|docx)$/i.test(next.name)) {
      setFile(null);
      setFileError("Please choose a PDF, DOC, or DOCX file.");
      return;
    }
    if (next.size > 5 * 1024 * 1024) {
      setFile(null);
      setFileError("This file is larger than 5 MB. Please choose a smaller file.");
      return;
    }
    setFileError("");
    setFile(next);
    setFeedback("");
  };

  const removeFile = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setFile(null);
    setFileError("");
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!file) {
      setFileError("Please attach your resume as a PDF, DOC, or DOCX file.");
      return;
    }
    setFeedback("");
    const applicantName = form.fullName;
    const appliedRole = form.role || selectedRole || "General Application";

    submitApplication.mutate(
      {
        data: {
          ...form,
          role: appliedRole,
          resume: file as unknown as string,
        },
      },
      {
        onSuccess: () => {
          setSubmittedCandidate({ name: applicantName, role: appliedRole });
          // Reset form fields back to default
          setForm(INITIAL_APPLICATION_FORM);
          setFile(null);
          setFileError("");
          if (fileRef.current) {
            fileRef.current.value = "";
          }
          // Close application input modal
          setIsModalOpen(false);
          // Show dedicated Thank You Popup
          setShowThankYou(true);
        },
        onError: () => {
          setFeedback("error");
          setFeedbackText("We could not submit your application. Please try again.");
        },
      }
    );
  };

  // Filtered categories
  const categoriesToDisplay =
    activeCategory === "All"
      ? roleGroups
      : roleGroups.filter(([group]) => group === activeCategory);

  const totalRoles = roleGroups.reduce((acc, [, roles]) => acc + roles.length, 0);

  return (
    <main>
      <Meta
        title="Careers & Job Opportunities | Inclined Careers"
        description="Explore open opportunities across IT & Technology, Healthcare, Data Center Operations, Embedded Systems, and Business roles with Inclined Careers."
      />

      {/* 1. MINIMALIST, COMPACT HERO */}
      <section className="relative overflow-hidden paper-grid border-b border-[#ded6c7] bg-[#f3eee4] px-6 py-10 md:py-14 text-center">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h1 className="serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-[-.025em] text-[#011330]">
              Find your next{" "}
              <em className="font-medium text-[#BA780E]">opportunity.</em>
            </h1>
            <p className="mt-3.5 max-w-xl mx-auto text-base md:text-lg text-[#5d6971]">
              Let's find the right path.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION STRIP */}
      <section className="border-b border-[#ded6c7] bg-[#f8f4ec] py-3.5">
        <div className="container-wide flex flex-wrap items-center justify-between gap-4 text-xs text-[#5d6971]">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-[#BA780E] shrink-0" />
            <span className="font-medium">100% Confidential Profile Review</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-[#BA780E] shrink-0" />
            <span className="font-medium">No Commission or Salary Reductions</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-[#BA780E] shrink-0" />
            <span className="font-medium">Direct Placement &amp; Visa Timeline Support</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-[#BA780E] shrink-0" />
            <span className="font-medium">Human-Led 1:1 Recruiter Advisory</span>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE JOB BOARD */}
      <section className="container-wide py-10 md:py-14">
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#ded6c7]">
          <div>
            <SectionLabel>Open Opportunities</SectionLabel>
            <h2 className="serif mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-[#011330]">
              Explore Active Positions
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#69747b] max-w-xl">
              Select an opening below to submit your application directly to our recruitment team.
              Showing {totalRoles} positions across {roleGroups.length} key industry sectors.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleOpenModal("General Application", "General")}
            data-testid="button-general-application"
            className="group self-start md:self-auto inline-flex items-center gap-2 rounded-lg border border-[#BA780E] bg-[#f8f4ec] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#011330] shadow-sm transition-all hover:bg-[#011330] hover:text-[#f8f4ec]"
          >
            <Sparkles size={14} className="text-[#BA780E]" />
            <span>General Application</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              activeCategory === "All"
                ? "bg-[#011330] text-[#f8f4ec] shadow-sm"
                : "border border-[#ded6c7] bg-[#f8f4ec] text-[#5d6971] hover:border-[#BA780E] hover:text-[#011330]"
            }`}
          >
            All Sectors ({totalRoles})
          </button>
          {roleGroups.map(([group, roles]) => (
            <button
              key={group}
              type="button"
              onClick={() => setActiveCategory(group)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === group
                  ? "bg-[#011330] text-[#f8f4ec] shadow-sm"
                  : "border border-[#ded6c7] bg-[#f8f4ec] text-[#5d6971] hover:border-[#BA780E] hover:text-[#011330]"
              }`}
            >
              {group} ({roles.length})
            </button>
          ))}
        </div>

        {/* Grouped Category Sections & Job Cards */}
        <div className="mt-8 space-y-10">
          {categoriesToDisplay.map(([category, roles], catIndex) => (
            <div key={category} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-[#ded6c7]/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#011330] text-xs font-bold text-[#BA780E]">
                    0{catIndex + 1}
                  </div>
                  <h3 className="serif text-xl sm:text-2xl font-semibold text-[#011330]">
                    {category}
                  </h3>
                </div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#BA780E]">
                  {roles.length} Roles Available
                </span>
              </div>

              {/* Grid of Distinct Job Cards */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {roles.map((roleTitle) => (
                  <motion.div
                    key={roleTitle}
                    variants={staggerChild}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col justify-between rounded-xl border border-[#ded6c7] bg-[#fbf9f5] p-5 shadow-sm hover:border-[#BA780E] hover:shadow-md transition-all group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 text-[.66rem] uppercase tracking-wider font-semibold text-[#80909b]">
                        <span className="flex items-center gap-1.5 text-[#BA780E]">
                          <Briefcase size={12} /> Full-time / Contract
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} /> US Nationwide
                        </span>
                      </div>

                      {/* Job Title */}
                      <h4 className="serif mt-3 text-lg sm:text-xl font-bold text-[#011330] group-hover:text-[#BA780E] transition-colors">
                        {roleTitle}
                      </h4>

                      {/* Description */}
                      <p className="mt-2 text-xs leading-relaxed text-[#69747b]">
                        Connecting qualified candidates with premier enterprise teams and forward-thinking organizations across the United States.
                      </p>

                      {/* Highlights */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        <span className="rounded bg-[#f3eee4] px-2 py-0.5 text-[.64rem] font-medium text-[#5d6971]">
                          Active Hiring
                        </span>
                        <span className="rounded bg-[#f3eee4] px-2 py-0.5 text-[.64rem] font-medium text-[#5d6971]">
                          Confidential
                        </span>
                        <span className="rounded bg-[#f3eee4] px-2 py-0.5 text-[.64rem] font-medium text-[#5d6971]">
                          Direct Review
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-5 pt-4 border-t border-[#ded6c7]/60 flex items-center justify-between">
                      <span className="text-[.68rem] uppercase tracking-wider font-semibold text-[#80909b]">
                        Zero fee to candidate
                      </span>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleOpenModal(roleTitle, category)}
                        data-testid={`button-apply-${roleTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#011330] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#f8f4ec] shadow-sm transition-all hover:bg-[#011330] group-hover:shadow-md"
                      >
                        Apply Now
                        <ArrowRight size={12} className="text-[#BA780E]" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* General Application Callout Banner */}
        <div className="mt-12 rounded-2xl border border-[#BA780E]/50 bg-gradient-to-br from-[#011330] to-[#011330] p-6 sm:p-8 text-[#f8f4ec] shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#BA780E] font-semibold">
                <Sparkles size={13} /> Don't see your specific title?
              </span>
              <h3 className="serif mt-2 text-xl sm:text-2xl font-semibold leading-tight text-[#f8f4ec]">
                Submit a General Application for Tailored Placement
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#c4cdd1]">
                We partner with employers across multiple technical and executive disciplines.
                Upload your resume and our recruitment advisors will proactively match you with
                current and unlisted openings.
              </p>
            </div>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenModal("General Application", "General")}
              className="inline-flex shrink-0 items-center gap-2.5 bg-[#BA780E] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#011330] shadow-md transition-all hover:bg-[#BA780E]"
            >
              Submit Your Resume <ArrowRight size={14} />
            </motion.button>
          </div>
        </div>
      </section>
      {/* 4. APPLICATION MODAL OVERLAY */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-[#011330]/75 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              className="relative w-full max-w-2xl rounded-2xl border border-[#ded6c7] bg-[#f8f4ec] p-6 sm:p-10 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                data-testid="button-close-modal"
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#ded6c7] bg-[#f3eee4] text-[#5d6971] transition-colors hover:border-[#011330] hover:text-[#011330]"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="pr-10 border-b border-[#ded6c7] pb-6">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#011330] px-3 py-1 text-[.68rem] font-bold uppercase tracking-wider text-[#BA780E]">
                    Application
                  </span>
                  {selectedCategory && selectedCategory !== "General" && (
                    <span className="text-xs font-semibold text-[#80909b]">
                      · {selectedCategory}
                    </span>
                  )}
                </div>
                <h3
                  id="modal-headline"
                  className="serif mt-3 text-2xl sm:text-3xl font-semibold text-[#011330]"
                >
                  {selectedRole === "General Application"
                    ? "General Candidate Application"
                    : `Apply for ${selectedRole}`}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#69747b]">
                  Direct recruiter review · 100% confidential · Zero salary cuts or candidate fees.
                </p>
              </div>

              {/* Success View */}
              {feedback === "success" ? (
                <div className="py-10 text-center space-y-5">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e8dfd0] text-[#BA780E]">
                    <Check size={32} />
                  </div>
                  <h4 className="serif text-2xl font-semibold text-[#011330]">
                    Application Submitted Successfully
                  </h4>
                  <p className="max-w-md mx-auto text-sm text-[#5d6971] leading-relaxed">
                    {feedbackText} A confirmation email has been dispatched to your inbox.
                  </p>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="inline-flex items-center gap-2 bg-[#011330] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#f8f4ec] rounded-lg shadow hover:bg-[#011330] transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={submit} className="mt-6 space-y-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Full Name"
                      name="fullName"
                      value={form.fullName}
                      onChange={update("fullName")}
                      placeholder="Jane Doe"
                    />
                    <Field
                      label="Email Address"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="jane@example.com"
                    />
                    <Field
                      label="Phone Number"
                      name="phone"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+1 (555) 000-0000"
                    />
                    <Field
                      label="Current Location"
                      name="currentLocation"
                      value={form.currentLocation}
                      onChange={update("currentLocation")}
                      placeholder="City, State / Country"
                    />
                    <Field
                      label="Target Role / Specialization"
                      name="role"
                      value={form.role || selectedRole}
                      onChange={update("role")}
                      placeholder="e.g. Software Engineer"
                    />
                    <Field
                      label="Years of Experience"
                      name="yearsOfExperience"
                      value={form.yearsOfExperience}
                      onChange={update("yearsOfExperience")}
                      placeholder="e.g. 5+ years"
                    />
                  </div>

                  <Field
                    label="LinkedIn Profile (Optional)"
                    name="linkedin"
                    value={form.linkedin}
                    onChange={update("linkedin")}
                    required={false}
                    placeholder="https://linkedin.com/in/username"
                  />

                  {/* Resume Upload Box */}
                  <div>
                    <span className="mb-2 block text-[.72rem] font-bold uppercase tracking-[.1em] text-[#596770]">
                      Resume / CV <span className="text-[#BA780E]">*</span>
                    </span>

                    {file ? (
                      /* Attached Resume Card with clear Remove button */
                      <div className="flex items-center justify-between gap-3 rounded-xl border border-[#BA780E]/60 bg-[#f8f4ec] p-4 shadow-xs">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#011330] text-[#BA780E]">
                            <FileText size={18} />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-[#011330]">{file.name}</p>
                            <p className="text-[.72rem] text-[#79848a]">
                              {(file.size / 1024 / 1024).toFixed(2)} MB · Ready to submit
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            data-testid="button-change-resume"
                            className="rounded-lg border border-[#ded6c7] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#5d6971] hover:text-[#011330] hover:border-[#BA780E] transition-colors"
                          >
                            Change
                          </button>
                          <button
                            type="button"
                            onClick={removeFile}
                            data-testid="button-remove-resume"
                            className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors shadow-xs"
                            title="Remove attached resume"
                          >
                            <X size={14} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Upload Button when no file is selected */
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        data-testid="button-upload-modal-resume"
                        className="flex w-full items-center gap-4 rounded-xl border border-dashed border-[#bdb5a6] bg-[#f3eee4]/60 px-5 py-4 text-left transition-colors hover:border-[#BA780E]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e8dfd0] text-[#BA780E]">
                          <FileText size={18} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-[#011330]">
                            Select or attach your resume
                          </span>
                          <span className="mt-0.5 block text-xs text-[#79848a]">
                            PDF, DOC or DOCX · Max 5 MB
                          </span>
                        </span>
                      </button>
                    )}

                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(event) => chooseFile(event.target.files?.[0])}
                      data-testid="input-modal-resume"
                      className="sr-only"
                    />
                    {fileError && (
                      <p className="mt-2 text-xs text-[#9b4540] font-medium" data-testid="text-modal-resume-error">
                        {fileError}
                      </p>
                    )}
                  </div>

                  {/* Message / Notes */}
                  <div>
                    <label
                      htmlFor="modal-application-message"
                      className="mb-2 block text-[.72rem] font-bold uppercase tracking-[.1em] text-[#596770]"
                    >
                      Candidate Notes (Optional)
                    </label>
                    <textarea
                      id="modal-application-message"
                      name="message"
                      rows={2}
                      value={form.message}
                      onChange={(event) => update("message")(event.target.value)}
                      placeholder="Brief note regarding your availability, visa timelines, or preferences..."
                      data-testid="input-modal-application-message"
                      className="w-full resize-y border-b border-[#bdb5a6] bg-transparent px-0 py-2 text-sm text-[#011330] outline-none placeholder:text-[#a1a19b] focus:border-[#BA780E]"
                    />
                  </div>

                  {feedback === "error" && (
                    <StatusMessage type="error">{feedbackText}</StatusMessage>
                  )}

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#ded6c7] flex items-center justify-end gap-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#5d6971] hover:text-[#011330] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitApplication.isPending}
                      data-testid="button-modal-submit"
                      className="inline-flex items-center gap-2.5 rounded-lg bg-[#011330] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#f8f4ec] shadow-md transition-all hover:bg-[#011330] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitApplication.isPending ? (
                        <>
                          <Loader2 size={15} className="animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application <ArrowRight size={14} className="text-[#BA780E]" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DEDICATED APPLICATION THANK YOU POPUP */}
      <ThankYouModal
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
        title="Application Submitted!"
        subtitle={
          submittedCandidate.name
            ? `Thank you, ${submittedCandidate.name}. Your application for "${submittedCandidate.role}" has been received. Our recruitment specialists will review your profile and contact you within 24 business hours.`
            : undefined
        }
        type="application"
        referenceInfo={submittedCandidate.role}
      />
    </main>
  );
}
