import type { SendMailOptions } from "nodemailer";
import type { ContactValues } from "./contact-validation.ts";

/** Visitors can set replyTo and message text, never the SMTP sender or recipient. */
export function contactMailOptions(
  { name, email, message }: ContactValues,
  sender: string,
): SendMailOptions {
  return {
    from: { name: "EGARWORKS Contact", address: sender },
    to: sender,
    replyTo: { name, address: email },
    subject: `Pesan dari ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}

export function contactMailConfigured(): boolean {
  return Boolean(
    process.env.EMAIL_USER?.trim() && process.env.EMAIL_PASS?.trim(),
  );
}
