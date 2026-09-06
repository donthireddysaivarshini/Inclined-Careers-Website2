import { Router, type IRouter } from "express";
import multer from "multer";
import {
  SendEnquiryBody,
  SendEnquiryResponse,
  SubmitApplicationBody,
  SubmitApplicationResponse,
} from "@workspace/api-zod";
import { submissionRateLimit } from "../lib/rate-limit";
import { sendConfirmationEmail, sendSubmissionEmail } from "../lib/submission";

const router: IRouter = Router();
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const allowedResumeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_RESUME_BYTES, files: 1 },
  fileFilter: (_req, file, callback) => {
    callback(null, allowedResumeTypes.has(file.mimetype));
  },
});

router.post(
  "/enquiries",
  submissionRateLimit,
  async (req, res): Promise<void> => {
    const parsed = SendEnquiryBody.safeParse(req.body);
    if (!parsed.success || !emailPattern.test(parsed.data?.email ?? "")) {
      req.log.warn({ errors: parsed.success ? "Invalid email" : parsed.error.message }, "Invalid website enquiry");
      res.status(400).json({ error: "Please check the information in your enquiry." });
      return;
    }

    try {
      const delivered = await sendSubmissionEmail({
        subject: `New Website Enquiry - ${parsed.data.audience} - ${parsed.data.fullName}`,
        intro: `${parsed.data.audience} enquiry from the website`,
        rows: [
          ["Audience", parsed.data.audience],
          ["Name", parsed.data.fullName],
          ["Email", parsed.data.email],
          ["Phone", parsed.data.phone],
          ["Company", parsed.data.companyName ?? ""],
          ["Area of interest / role", parsed.data.areaOfInterest],
        ],
        message: parsed.data.message,
      });

      if (!delivered) {
        req.log.warn("SMTP configuration is incomplete. Website enquiry recorded.");
      } else {
        // Send thank you confirmation email to the person who submitted the form
        sendConfirmationEmail({
          to: parsed.data.email,
          recipientName: parsed.data.fullName,
          type: "enquiry",
          subject: "Thank You for Contacting Inclined Careers",
          areaOfInterest: parsed.data.areaOfInterest,
        }).catch((err) => {
          req.log.warn({ err }, "Could not send confirmation email to enquiry sender");
        });
      }

      res.json(
        SendEnquiryResponse.parse({
          success: true,
          message: "Thank you for reaching out. Our team will get back to you soon.",
        }),
      );
    } catch (error) {
      req.log.error({ err: error }, "Failed to send website enquiry email");
      res.json(
        SendEnquiryResponse.parse({
          success: true,
          message: "Thank you for reaching out. Our team will get back to you soon.",
        }),
      );
    }
  },
);

router.post(
  "/applications",
  submissionRateLimit,
  (req, res, next): void => {
    resumeUpload.single("resume")(req, res, (error) => {
      if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
        res.status(413).json({ error: "Resume must be 5 MB or smaller." });
        return;
      }
      if (error || !req.file) {
        res.status(400).json({
          error: "Please attach a PDF, DOC, or DOCX resume.",
        });
        return;
      }
      next();
    });
  },
  async (req, res): Promise<void> => {
    const file = req.file;
    const parsed = SubmitApplicationBody.safeParse({
      ...req.body,
      resume: file?.originalname,
    });
    if (
      !parsed.success ||
      !file ||
      !allowedResumeTypes.has(file.mimetype) ||
      !emailPattern.test(parsed.data?.email ?? "")
    ) {
      req.log.warn(
        { errors: parsed.success ? "Invalid email or resume" : parsed.error.message },
        "Invalid career application",
      );
      res.status(400).json({ error: "Please check your application and resume." });
      return;
    }

    try {
      const delivered = await sendSubmissionEmail({
        subject: `New Career Application - ${parsed.data.role} - ${parsed.data.fullName}`,
        intro: "New career application from the website",
        rows: [
          ["Name", parsed.data.fullName],
          ["Email", parsed.data.email],
          ["Phone", parsed.data.phone],
          ["Current location", parsed.data.currentLocation],
          ["Job / role", parsed.data.role],
          ["Years of experience", parsed.data.yearsOfExperience],
          ["LinkedIn", parsed.data.linkedin ?? ""],
          ["Resume", file.originalname],
        ],
        message: parsed.data.message,
        attachment: {
          filename: file.originalname,
          content: file.buffer,
          contentType: file.mimetype,
        },
      });

      if (!delivered) {
        req.log.warn("SMTP configuration is incomplete. Career application recorded.");
      } else {
        // Send thank you confirmation email to the candidate
        sendConfirmationEmail({
          to: parsed.data.email,
          recipientName: parsed.data.fullName,
          type: "application",
          subject: `Application Received - ${parsed.data.role} | Inclined Careers`,
          role: parsed.data.role,
        }).catch((err) => {
          req.log.warn({ err }, "Could not send confirmation email to applicant");
        });
      }

      res.json(
        SubmitApplicationResponse.parse({
          success: true,
          message: "Your application has been submitted. Our team will be in touch soon.",
        }),
      );
    } catch (error) {
      req.log.error({ err: error }, "Failed to send career application email");
      res.json(
        SubmitApplicationResponse.parse({
          success: true,
          message: "Your application has been submitted. Our team will be in touch soon.",
        }),
      );
    }
  },
);

export default router;
