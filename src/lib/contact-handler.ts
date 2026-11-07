import { createHash } from "node:crypto";
import { CONTACT_LIMITS, validateContact } from "./contact-validation.ts";
import type { ContactValues } from "./contact-validation.ts";

interface HandlerOptions {
  isConfigured: () => boolean;
  sendMail: (values: ContactValues) => Promise<void>;
  now?: () => number;
}

const WINDOW_MS = 15 * 60 * 1000;
const EMAIL_LIMIT = 3;
const TOTAL_LIMIT = 20;

function json(
  body: object,
  status = 200,
  headers: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

// This bounded limiter protects one server instance. See README for multi-instance hosting.
export function createContactHandler({
  isConfigured,
  sendMail,
  now = Date.now,
}: HandlerOptions) {
  let windowEnd = 0;
  let total = 0;
  const senders = new Map<string, number>();

  return async function handleContact(request: Request): Promise<Response> {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) {
      return json(
        { success: false, message: "This request is not allowed." },
        403,
      );
    }
    if (
      request.headers
        .get("content-type")
        ?.split(";")[0]
        .trim()
        .toLowerCase() !== "application/json"
    ) {
      return json(
        { success: false, message: "Please submit the form as JSON." },
        415,
      );
    }

    let input: unknown;
    try {
      const reader = request.body?.getReader();
      if (!reader)
        return json(
          { success: false, message: "Please provide a message." },
          400,
        );
      const decoder = new TextDecoder();
      let size = 0;
      let body = "";
      try {
        while (true) {
          const chunk = await reader.read();
          if (chunk.done) break;
          size += chunk.value.byteLength;
          if (size > CONTACT_LIMITS.bodyBytes) {
            await reader.cancel();
            return json(
              { success: false, message: "Your message is too large." },
              413,
            );
          }
          body += decoder.decode(chunk.value, { stream: true });
        }
        body += decoder.decode();
      } finally {
        reader.releaseLock();
      }
      input = JSON.parse(body);
    } catch {
      return json(
        { success: false, message: "Please provide a valid JSON message." },
        400,
      );
    }

    // Filled only by automated submissions; return the same success response without sending mail.
    if (
      input &&
      typeof input === "object" &&
      "website" in input &&
      input.website
    ) {
      return json({ success: true });
    }
    const validation = validateContact(input);
    if (!validation.success) {
      return json({ success: false, message: validation.message }, 400);
    }
    if (!isConfigured()) {
      return json(
        {
          success: false,
          message:
            "The contact form is temporarily unavailable. Please email me directly.",
        },
        503,
      );
    }

    const time = now();
    if (time >= windowEnd) {
      windowEnd = time + WINDOW_MS;
      total = 0;
      senders.clear();
    }
    const sender = createHash("sha256")
      .update(validation.values.email.toLowerCase())
      .digest("hex");
    const count = senders.get(sender) ?? 0;
    if (total >= TOTAL_LIMIT || count >= EMAIL_LIMIT) {
      return json(
        {
          success: false,
          message:
            "Too many messages. Please try again later or email me directly.",
        },
        429,
        {
          "Retry-After": String(
            Math.max(1, Math.ceil((windowEnd - time) / 1000)),
          ),
        },
      );
    }
    // Reserve before awaiting SMTP so concurrent requests cannot bypass the limit.
    total += 1;
    senders.set(sender, count + 1);

    try {
      await sendMail(validation.values);
      return json({ success: true });
    } catch {
      return json(
        {
          success: false,
          message:
            "Your message could not be sent. Please try again or email me directly.",
        },
        502,
      );
    }
  };
}
