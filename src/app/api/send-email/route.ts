import nodemailer from "nodemailer";
import { createContactHandler } from "@/lib/contact-handler";

export const runtime = "nodejs";

export const POST = createContactHandler({
  isConfigured: () => Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS),
  sendMail: async ({ name, email, message }) => {
    const user = process.env.EMAIL_USER!;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass: process.env.EMAIL_PASS },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
    await transporter.sendMail({
      from: { name: "EGARWORKS Contact", address: user },
      to: user,
      replyTo: { name, address: email },
      subject: `Pesan dari ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
  },
});
