import test from "node:test";
import assert from "node:assert/strict";
import nodemailer from "nodemailer";
import { contactMailOptions } from "../src/lib/contact-mail.ts";

test("Nodemailer composes the authenticated sender, fixed recipient, and visitor reply address", async () => {
  // Stream transport composes a real MIME message in memory; it never opens SMTP or sends mail.
  const transport = nodemailer.createTransport({
    streamTransport: true,
    buffer: true,
    newline: "unix",
  });
  const info = await transport.sendMail(
    contactMailOptions(
      {
        name: "Visitor",
        email: "visitor@example.com",
        message: "A portfolio enquiry.",
      },
      "owner@example.com",
    ),
  );
  assert.equal(info.envelope.from, "owner@example.com");
  assert.deepEqual(info.envelope.to, ["owner@example.com"]);
  const message = info.message.toString();
  assert.match(message, /From: EGARWORKS Contact <owner@example.com>/);
  assert.match(message, /Reply-To: Visitor <visitor@example.com>/);
  assert.match(message, /A portfolio enquiry\./);
});
