import Busboy from "busboy";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: false,
  },
};

function escapeHtml(value) {
  if (!value) return "";
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const user = process.env.SMTP_USER || "info@inclinedcareers.in";
  const pass = process.env.SMTP_PASSWORD;
  const port = Number(process.env.SMTP_PORT || 465);

  if (!pass) {
    console.warn("SMTP_PASSWORD is not set in environment variables!");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  return new Promise((resolve) => {
    try {
      const busboy = Busboy({ headers: req.headers });
      const fields = {};
      let fileBuffer = null;
      let fileName = "";
      let fileType = "";

      busboy.on("field", (fieldname, val) => {
        fields[fieldname] = val;
      });

      busboy.on("file", (fieldname, fileStream, info) => {
        const { filename, mimeType } = info;
        fileName = filename;
        fileType = mimeType;
        const chunks = [];

        fileStream.on("data", (chunk) => {
          chunks.push(chunk);
        });

        fileStream.on("end", () => {
          fileBuffer = Buffer.concat(chunks);
        });
      });

      busboy.on("finish", async () => {
        try {
          const { fullName, email, phone, role, areaOfInterest, linkedinUrl, portfolioUrl, notes } = fields;
          const transporter = getTransporter();
          const mailTo = process.env.MAIL_TO || "info@inclinedcareers.in";

          if (transporter) {
            const attachments = [];
            if (fileBuffer && fileName) {
              attachments.push({
                filename: fileName,
                content: fileBuffer,
                contentType: fileType,
              });
            }

            // 1. Send Application to info@inclinedcareers.in
            await transporter.sendMail({
              from: process.env.MAIL_FROM || "info@inclinedcareers.in",
              to: mailTo,
              subject: `New Career Application - ${role || "Candidate"} - ${fullName || "Applicant"}`,
              html: `
                <div style="font-family:Arial,sans-serif;max-width:680px;color:#101828;background-color:#ffffff;border:1px solid #eaecf0;border-radius:8px;padding:24px;margin:0 auto">
                  <div style="border-bottom:2px solid #BA780E;padding-bottom:16px;margin-bottom:24px">
                    <h2 style="color:#011330;margin:0">Inclined Careers</h2>
                    <p style="color:#667085;margin:4px 0 0">New Candidate Application: ${escapeHtml(role || "General Application")}</p>
                  </div>
                  <table style="border-collapse:collapse;width:100%;font-size:14px">
                    <tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600;width:32%">Role Applied</td><td><strong>${escapeHtml(role || "General Application")}</strong></td></tr>
                    <tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600">Candidate Name</td><td>${escapeHtml(fullName || "Not provided")}</td></tr>
                    <tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600">Email</td><td><a href="mailto:${escapeHtml(email || "")}">${escapeHtml(email || "")}</a></td></tr>
                    <tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600">Phone</td><td><a href="tel:${escapeHtml(phone || "")}">${escapeHtml(phone || "")}</a></td></tr>
                    ${areaOfInterest ? `<tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600">Specialization</td><td>${escapeHtml(areaOfInterest)}</td></tr>` : ""}
                    ${linkedinUrl ? `<tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600">LinkedIn</td><td><a href="${escapeHtml(linkedinUrl)}" target="_blank">${escapeHtml(linkedinUrl)}</a></td></tr>` : ""}
                    ${portfolioUrl ? `<tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600">Portfolio</td><td><a href="${escapeHtml(portfolioUrl)}" target="_blank">${escapeHtml(portfolioUrl)}</a></td></tr>` : ""}
                    <tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600">Resume Attached</td><td>${fileName ? `${escapeHtml(fileName)} (${Math.round((fileBuffer?.length || 0) / 1024)} KB)` : "None"}</td></tr>
                  </table>
                  ${notes ? `<h3 style="color:#011330;margin:24px 0 8px">Candidate Notes</h3><p style="white-space:pre-wrap;color:#344054;line-height:1.6">${escapeHtml(notes)}</p>` : ""}
                  <p style="color:#667085;font-size:12px;margin-top:28px;border-top:1px solid #f2f4f7;padding-top:14px">Submitted ${escapeHtml(new Date().toISOString())}</p>
                </div>
              `,
              attachments: attachments.length > 0 ? attachments : undefined,
            }).catch(err => console.error("Error sending admin application email:", err));

            // 2. Send Confirmation to candidate
            if (email && email.toLowerCase() !== mailTo.toLowerCase() && email.toLowerCase() !== "info@inclinedcareers.in") {
              transporter.sendMail({
                from: process.env.MAIL_FROM || "Inclined Careers <info@inclinedcareers.in>",
                to: email,
                subject: "Thank You For Your Application - Inclined Careers",
                html: `
                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;color:#011330;background-color:#ffffff;border:1px solid #ded6c7;border-radius:8px;overflow:hidden">
                    <div style="background-color:#011330;padding:24px 28px;">
                      <h1 style="color:#f8f4ec;font-size:22px;margin:0;font-family:Georgia,serif;letter-spacing:1px;font-weight:700">INCLINED CAREERS</h1>
                      <p style="color:#BA780E;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:4px 0 0">Connecting You to the Right Path</p>
                    </div>
                    <div style="padding:36px 28px">
                      <h2 style="color:#011330;font-size:20px;margin-top:0;font-family:Georgia,serif">Thank You For Your Application</h2>
                      <p style="font-size:15px;color:#5d6971;line-height:1.6">Dear ${escapeHtml(fullName || "Applicant")},</p>
                      <p style="font-size:15px;color:#5d6971;line-height:1.6">We have received your application for the <strong>${escapeHtml(role || "career opportunity")}</strong>. Our talent specialists are reviewing your qualifications and credentials.</p>
                      <div style="background-color:#fbf9f5;border-left:3px solid #BA780E;padding:16px 20px;margin:24px 0;border-radius:4px">
                        <p style="margin:0;font-size:13px;font-weight:bold;color:#011330;text-transform:uppercase;letter-spacing:1px">The Inclined Promise</p>
                        <p style="margin:6px 0 0;font-size:13px;color:#69747b;line-height:1.5">Direct 1:1 human guidance · 0% commission from your salary · We never deduct a penny from your earnings.</p>
                      </div>
                      <p style="font-size:14px;color:#5d6971;line-height:1.6">If you have any questions or additional documents to share, feel free to reply to this email or reach us at <a href="mailto:info@inclinedcareers.in" style="color:#011330;font-weight:600;text-decoration:none">info@inclinedcareers.in</a>.</p>
                      <p style="font-size:15px;color:#011330;margin-top:28px">Warm regards,<br><strong>The Inclined Careers Recruitment Team</strong></p>
                    </div>
                    <div style="background-color:#f8f4ec;padding:18px 28px;text-align:center;border-top:1px solid #ded6c7">
                      <p style="font-size:12px;color:#8a949b;margin:0">© 2026 Inclined Careers. All rights reserved. · Hyderabad, India</p>
                    </div>
                  </div>
                `,
              }).catch(err => console.error("Error sending confirmation email to applicant:", err));
            }
          }

          res.status(200).json({
            success: true,
            message: "Thank you for applying! Our team will review your application and be in touch soon.",
          });
          resolve();
        } catch (innerErr) {
          console.error("Application processing error:", innerErr);
          res.status(200).json({
            success: true,
            message: "Thank you for applying! Our team will review your application and be in touch soon.",
          });
          resolve();
        }
      });

      req.pipe(busboy);
    } catch (err) {
      console.error("Busboy init error:", err);
      res.status(200).json({
        success: true,
        message: "Thank you for applying! Our team will review your application and be in touch soon.",
      });
      resolve();
    }
  });
}
