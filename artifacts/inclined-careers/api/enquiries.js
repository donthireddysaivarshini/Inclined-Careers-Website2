import nodemailer from "nodemailer";

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
  // CORS headers
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

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        // keep as is
      }
    }
    body = body || {};

    const { audience, fullName, email, phone, companyName, areaOfInterest, message } = body;

    if (!email || !fullName) {
      res.status(400).json({ error: "Name and email are required." });
      return;
    }

    const transporter = getTransporter();
    const mailTo = process.env.MAIL_TO || "info@inclinedcareers.in";

    if (transporter) {
      // 1. Send submission notification to info@inclinedcareers.in
      try {
        await transporter.sendMail({
          from: process.env.MAIL_FROM || "info@inclinedcareers.in",
          to: mailTo,
          subject: `New Website Enquiry - ${audience || "General"} - ${fullName}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:680px;color:#101828;background-color:#ffffff;border:1px solid #eaecf0;border-radius:8px;padding:24px;margin:0 auto">
              <div style="border-bottom:2px solid #BA780E;padding-bottom:16px;margin-bottom:24px">
                <h2 style="color:#011330;margin:0">Inclined Careers</h2>
                <p style="color:#667085;margin:4px 0 0">${escapeHtml(audience || "Website")} Enquiry</p>
              </div>
              <table style="border-collapse:collapse;width:100%;font-size:14px">
                <tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600;width:32%">Audience</td><td>${escapeHtml(audience || "Not specified")}</td></tr>
                <tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600">Name</td><td>${escapeHtml(fullName)}</td></tr>
                <tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
                <tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600">Phone</td><td><a href="tel:${escapeHtml(phone || "")}">${escapeHtml(phone || "Not specified")}</a></td></tr>
                ${companyName ? `<tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600">Company</td><td>${escapeHtml(companyName)}</td></tr>` : ""}
                <tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600">Area of Interest</td><td>${escapeHtml(areaOfInterest || "General Enquiry")}</td></tr>
              </table>
              ${message ? `<h3 style="color:#011330;margin:24px 0 8px">Message</h3><p style="white-space:pre-wrap;color:#344054;line-height:1.6">${escapeHtml(message)}</p>` : ""}
              <p style="color:#667085;font-size:12px;margin-top:28px;border-top:1px solid #f2f4f7;padding-top:14px">Submitted ${escapeHtml(new Date().toISOString())}</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error("Error sending admin enquiry email:", mailErr);
      }

      // 2. Send Thank-You Confirmation to the applicant/enquirer
      if (email.toLowerCase() !== mailTo.toLowerCase() && email.toLowerCase() !== "info@inclinedcareers.in") {
        transporter.sendMail({
          from: process.env.MAIL_FROM || "Inclined Careers <info@inclinedcareers.in>",
          to: email,
          subject: "Thank You for Contacting Inclined Careers",
          html: `
            <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;color:#011330;background-color:#ffffff;border:1px solid #ded6c7;border-radius:8px;overflow:hidden">
              <div style="background-color:#011330;padding:24px 28px;">
                <h1 style="color:#f8f4ec;font-size:22px;margin:0;font-family:Georgia,serif;letter-spacing:1px;font-weight:700">INCLINED CAREERS</h1>
                <p style="color:#BA780E;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:4px 0 0">Connecting You to the Right Path</p>
              </div>
              <div style="padding:36px 28px">
                <h2 style="color:#011330;font-size:20px;margin-top:0;font-family:Georgia,serif">Thank You For Contacting Inclined Careers</h2>
                <p style="font-size:15px;color:#5d6971;line-height:1.6">Dear ${escapeHtml(fullName)},</p>
                <p style="font-size:15px;color:#5d6971;line-height:1.6">We have received your enquiry regarding <strong>${escapeHtml(areaOfInterest || "career & recruitment support")}</strong>. A dedicated recruitment advisor from our team will review your information and get in touch with you within 24 business hours.</p>
                <div style="background-color:#fbf9f5;border-left:3px solid #BA780E;padding:16px 20px;margin:24px 0;border-radius:4px">
                  <p style="margin:0;font-size:13px;font-weight:bold;color:#011330;text-transform:uppercase;letter-spacing:1px">The Inclined Promise</p>
                  <p style="margin:6px 0 0;font-size:13px;color:#69747b;line-height:1.5">Direct 1:1 human guidance · 0% commission from your salary · Transparent support throughout your career journey.</p>
                </div>
                <p style="font-size:14px;color:#5d6971;line-height:1.6">If you have any urgent questions, reach us at <a href="mailto:info@inclinedcareers.in" style="color:#011330;font-weight:600;text-decoration:none">info@inclinedcareers.in</a> or <a href="tel:+18084003068" style="color:#011330;font-weight:600;text-decoration:none">+1808-400-3068</a>.</p>
                <p style="font-size:15px;color:#011330;margin-top:28px">Warm regards,<br><strong>The Inclined Careers Team</strong></p>
              </div>
              <div style="background-color:#f8f4ec;padding:18px 28px;text-align:center;border-top:1px solid #ded6c7">
                <p style="font-size:12px;color:#8a949b;margin:0">© 2026 Inclined Careers. All rights reserved. · Hyderabad, India</p>
              </div>
            </div>
          `,
        }).catch(err => console.error("Error sending confirmation email to user:", err));
      }
    } else {
      console.warn("SMTP Transporter not configured. Recording enquiry in logs:", body);
    }

    res.status(200).json({
      success: true,
      message: "Thank you for reaching out. Our team will get back to you soon.",
    });
  } catch (error) {
    console.error("Enquiry submission error:", error);
    res.status(200).json({
      success: true,
      message: "Thank you for reaching out. Our team will get back to you soon.",
    });
  }
}
