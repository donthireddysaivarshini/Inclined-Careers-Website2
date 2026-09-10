import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

const MAIL_TO = process.env.MAIL_TO ?? "info@inclinedcareers.in";

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
  cid?: string;
};

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getLogoAttachment(): MailAttachment | null {
  const candidatePaths = [
    path.resolve(__dirname, "../assets/logo.png"),
    path.resolve(__dirname, "../../assets/logo.png"),
    path.resolve(process.cwd(), "assets/logo.png"),
    path.resolve(process.cwd(), "artifacts/api-server/assets/logo.png"),
    path.resolve(process.cwd(), "../inclined-careers/public/logo.PNG"),
    path.resolve(process.cwd(), "artifacts/inclined-careers/public/logo.PNG"),
  ];

  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      try {
        const content = fs.readFileSync(p);
        return {
          filename: "inclined-logo.png",
          content,
          cid: "inclined_logo",
          contentType: "image/png",
        };
      } catch {
        // Continue checking candidates
      }
    }
  }
  return null;
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const port = Number(process.env.SMTP_PORT ?? 587);

  if (!host || !user || !password || !Number.isInteger(port) || port <= 0) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass: password },
  });
}

export async function sendSubmissionEmail(input: {
  subject: string;
  intro: string;
  rows: Array<[string, string]>;
  message?: string;
  attachment?: MailAttachment;
}): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) return false;

  const logo = getLogoAttachment();
  const attachments: MailAttachment[] = [];
  if (logo) attachments.push(logo);
  if (input.attachment) attachments.push(input.attachment);

  const rowsHtml = input.rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600;vertical-align:top;width:32%">${escapeHtml(label)}</td><td style="padding:8px 0;color:#101828">${escapeHtml(value || "Not provided")}</td></tr>`,
    )
    .join("");
  const messageHtml = input.message
    ? `<h3 style="color:#011330;margin:24px 0 8px">Message</h3><p style="white-space:pre-wrap;color:#344054;line-height:1.6">${escapeHtml(input.message)}</p>`
    : "";

  const logoHeaderHtml = logo
    ? `<table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="width:52px;vertical-align:middle;">
            <img src="cid:inclined_logo" alt="Inclined Careers" style="width:48px;height:48px;border-radius:50%;display:block;" />
          </td>
          <td style="padding-left:14px;vertical-align:middle;text-align:left;">
            <div style="font-size:20px;font-weight:700;color:#011330;font-family:Georgia,serif;letter-spacing:0.5px">Inclined Careers</div>
            <div style="font-size:12px;color:#667085;margin-top:2px">${escapeHtml(input.intro)}</div>
          </td>
        </tr>
      </table>`
    : `<div>
        <div style="font-size:20px;font-weight:700;color:#011330">Inclined Careers</div>
        <div style="font-size:13px;color:#667085;margin-top:4px">${escapeHtml(input.intro)}</div>
      </div>`;

  await transporter.sendMail({
    from: process.env.MAIL_FROM ?? process.env.SMTP_USER,
    to: MAIL_TO,
    subject: input.subject,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;color:#101828;background-color:#ffffff;border:1px solid #eaecf0;border-radius:8px;padding:24px;margin:0 auto">
        <div style="border-bottom:2px solid #BA780E;padding-bottom:16px;margin-bottom:24px">
          ${logoHeaderHtml}
        </div>
        <table style="border-collapse:collapse;width:100%;font-size:14px">${rowsHtml}</table>
        ${messageHtml}
        <p style="color:#667085;font-size:12px;margin-top:28px;border-top:1px solid #f2f4f7;padding-top:14px">Submitted ${escapeHtml(new Date().toISOString())}</p>
      </div>
    `,
    attachments: attachments.length > 0 ? attachments : undefined,
  });

  return true;
}

export async function sendConfirmationEmail(input: {
  to: string;
  recipientName: string;
  type: "enquiry" | "application";
  subject: string;
  role?: string;
  areaOfInterest?: string;
}): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) return false;

  const logo = getLogoAttachment();
  const attachments: MailAttachment[] = [];
  if (logo) attachments.push(logo);

  const isApplication = input.type === "application";
  const headline = isApplication
    ? "Thank You For Your Application"
    : "Thank You For Contacting Inclined Careers";
  const bodyText = isApplication
    ? `We have received your application for the <strong>${escapeHtml(input.role || "requested role")}</strong> opportunity. Our recruitment specialists are currently reviewing your background and qualifications.`
    : `We have received your enquiry regarding <strong>${escapeHtml(input.areaOfInterest || "career & recruitment support")}</strong>. A dedicated recruitment advisor from our team will review your information and get in touch with you within 24 business hours.`;

  const headerLogoHtml = logo
    ? `<table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="width:52px;vertical-align:middle;">
            <img src="cid:inclined_logo" alt="Inclined Careers" style="width:48px;height:48px;border-radius:50%;display:block;border:1px solid #BA780E;" />
          </td>
          <td style="padding-left:14px;vertical-align:middle;text-align:left;">
            <div style="color:#f8f4ec;font-size:22px;margin:0;font-family:Georgia,serif;letter-spacing:1px;font-weight:700;line-height:1.2;">INCLINED CAREERS</div>
            <div style="color:#BA780E;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin-top:4px;">Connecting You to the Right Path</div>
          </td>
        </tr>
      </table>`
    : `<div style="text-align:left;">
        <h1 style="color:#f8f4ec;font-size:24px;margin:0;font-family:Georgia,serif;letter-spacing:1px">INCLINED CAREERS</h1>
        <p style="color:#BA780E;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:8px 0 0">Connecting You to the Right Path</p>
      </div>`;

  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;color:#011330;background-color:#ffffff;border:1px solid #ded6c7;border-radius:8px;overflow:hidden">
      <div style="background-color:#011330;padding:24px 28px;">
        ${headerLogoHtml}
      </div>
      <div style="padding:36px 28px">
        <h2 style="color:#011330;font-size:20px;margin-top:0;font-family:Georgia,serif">${headline}</h2>
        <p style="font-size:15px;color:#5d6971;line-height:1.6">Dear ${escapeHtml(input.recipientName)},</p>
        <p style="font-size:15px;color:#5d6971;line-height:1.6">${bodyText}</p>
        <div style="background-color:#fbf9f5;border-left:3px solid #BA780E;padding:16px 20px;margin:24px 0;border-radius:4px">
          <p style="margin:0;font-size:13px;font-weight:bold;color:#011330;text-transform:uppercase;letter-spacing:1px">The Inclined Promise</p>
          <p style="margin:6px 0 0;font-size:13px;color:#69747b;line-height:1.5">Direct 1:1 human guidance · 0% commission from your salary · Transparent support throughout your career journey.</p>
        </div>
        <p style="font-size:14px;color:#5d6971;line-height:1.6">If you have any urgent questions, feel free to reply directly to this email or reach us at <a href="mailto:info@inclinedcareers.in" style="color:#011330;font-weight:600;text-decoration:none">info@inclinedcareers.in</a> or <a href="tel:+18084003068" style="color:#011330;font-weight:600;text-decoration:none">+1808-400-3068</a>.</p>
        <p style="font-size:15px;color:#011330;margin-top:28px">Warm regards,<br><strong>The Inclined Careers Team</strong></p>
      </div>
      <div style="background-color:#f8f4ec;padding:18px 28px;text-align:center;border-top:1px solid #ded6c7">
        <p style="font-size:12px;color:#8a949b;margin:0">© 2026 Inclined Careers. All rights reserved. · Hyderabad, India</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.MAIL_FROM ?? "Inclined Careers <info@inclinedcareers.in>",
    to: input.to,
    subject: input.subject,
    html,
    attachments: attachments.length > 0 ? attachments : undefined,
  });

  return true;
}
