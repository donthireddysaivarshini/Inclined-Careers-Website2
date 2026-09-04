import nodemailer from "nodemailer";

const MAIL_TO = process.env.MAIL_TO ?? "info@inclinedcareers.in";

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

  const rowsHtml = input.rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 0;color:#101828">${escapeHtml(value || "Not provided")}</td></tr>`,
    )
    .join("");
  const messageHtml = input.message
    ? `<h3 style="color:#01112b;margin:24px 0 8px">Message</h3><p style="white-space:pre-wrap;color:#344054;line-height:1.6">${escapeHtml(input.message)}</p>`
    : "";

  await transporter.sendMail({
    from: process.env.MAIL_FROM ?? process.env.SMTP_USER,
    to: MAIL_TO,
    subject: input.subject,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;color:#101828">
        <div style="border-bottom:3px solid #dba22b;padding-bottom:16px;margin-bottom:24px">
          <div style="font-size:20px;font-weight:700;color:#01112b">Inclined Careers</div>
          <div style="font-size:13px;color:#667085;margin-top:4px">${escapeHtml(input.intro)}</div>
        </div>
        <table style="border-collapse:collapse;width:100%;font-size:14px">${rowsHtml}</table>
        ${messageHtml}
        <p style="color:#667085;font-size:12px;margin-top:28px">Submitted ${escapeHtml(new Date().toISOString())}</p>
      </div>
    `,
    attachments: input.attachment ? [input.attachment] : undefined,
  });

  return true;
}
