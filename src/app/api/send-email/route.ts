import nodemailer from "nodemailer";
import { createContactHandler } from "@/lib/contact-handler";
import { contactMailConfigured, contactMailOptions } from "@/lib/contact-mail";

export const runtime = "nodejs";

export const POST = createContactHandler({
  isConfigured: contactMailConfigured,
  sendMail: async (values) => {
    const user = process.env.EMAIL_USER!.trim();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass: process.env.EMAIL_PASS },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    await transporter.sendMail(contactMailOptions(values, user));
  },
});
