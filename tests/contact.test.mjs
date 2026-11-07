import test from "node:test";
import assert from "node:assert/strict";
import { createContactHandler } from "../src/lib/contact-handler.ts";

const values = {
  name: "Egar",
  email: "visitor@example.com",
  message: "Let's build a website.",
};
function request(body = values, headers = {}) {
  return new Request("https://egarworks.example/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
function setup(options = {}) {
  const sent = [];
  const handler = createContactHandler({
    isConfigured: () => true,
    sendMail: async (body) => {
      sent.push(body);
    },
    ...options,
  });
  return { sent, handler };
}

test("valid submissions are trimmed and sent once", async () => {
  const { sent, handler } = setup();
  const response = await handler(
    request({ ...values, name: " Egar ", message: " Hello " }),
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.deepEqual(sent, [{ ...values, name: "Egar", message: "Hello" }]);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
});

test("rejects invalid fields and header injection without sending", async () => {
  const { sent, handler } = setup();
  for (const body of [
    null,
    [],
    {},
    { ...values, name: 42 },
    { ...values, message: " " },
    { ...values, name: "a".repeat(121) },
    { ...values, message: "a".repeat(5001) },
    { ...values, email: "invalid" },
    { ...values, email: "a@example.com\r\nBcc: victim@example.com" },
    { ...values, name: "Name\r\nInjected" },
    { ...values, message: "Hello\0" },
  ]) {
    assert.equal((await handler(request(body))).status, 400);
  }
  assert.equal(sent.length, 0);
});

test("accepts unicode at the configured length limit", async () => {
  const { handler } = setup();
  assert.equal(
    (await handler(request({ ...values, message: "漢".repeat(5000) }))).status,
    200,
  );
});

test("rejects malformed JSON, wrong content type, and cross-origin requests", async () => {
  const { handler, sent } = setup();
  assert.equal((await handler(request("{"))).status, 400);
  assert.equal(
    (await handler(request(values, { "Content-Type": "text/plain" }))).status,
    415,
  );
  assert.equal(
    (await handler(request(values, { Origin: "https://attacker.example" })))
      .status,
    403,
  );
  assert.equal(
    (await handler(request(values, { Origin: "null" }))).status,
    403,
  );
  assert.equal(sent.length, 0);
  assert.equal(
    (await handler(request(values, { Origin: "https://egarworks.example" })))
      .status,
    200,
  );
});

test("limits actual request bytes even without a Content-Length header", async () => {
  const { handler, sent } = setup();
  assert.equal(
    (await handler(request({ ...values, message: "a".repeat(24_001) }))).status,
    413,
  );
  assert.equal(sent.length, 0);
});

test("honeypot submissions return success without sending", async () => {
  const { handler, sent } = setup();
  assert.equal(
    (await handler(request({ ...values, website: "https://spam.example" })))
      .status,
    200,
  );
  assert.equal(sent.length, 0);
});

test("missing mail credentials returns 503 without sending", async () => {
  const { handler, sent } = setup({ isConfigured: () => false });
  assert.equal((await handler(request())).status, 503);
  assert.equal(sent.length, 0);
});

test("SMTP failures return a generic 502 and do not expose internal errors", async () => {
  const { handler } = setup({
    sendMail: async () => {
      throw new Error("secret SMTP credentials");
    },
  });
  const response = await handler(request());
  assert.equal(response.status, 502);
  const body = await response.json();
  assert.equal(body.success, false);
  assert.ok(!JSON.stringify(body).includes("secret"));
  assert.ok(!("error" in body));
});

test("rate limits concurrent submissions by normalized email and expires the window", async () => {
  let time = 1_000;
  const { handler, sent } = setup({ now: () => time });
  const responses = await Promise.all(
    Array.from({ length: 5 }, (_, i) =>
      handler(
        request({
          ...values,
          email: i % 2 ? "VISITOR@example.com" : values.email,
        }),
      ),
    ),
  );
  assert.equal(
    responses.filter((response) => response.status === 200).length,
    3,
  );
  assert.equal(
    responses.filter((response) => response.status === 429).length,
    2,
  );
  assert.equal(sent.length, 3);
  assert.equal(
    responses
      .find((response) => response.status === 429)
      .headers.get("Retry-After"),
    "900",
  );
  time += 15 * 60 * 1000;
  assert.equal((await handler(request())).status, 200);
});

test("global limit prevents bypassing the cap with different email addresses", async () => {
  const { handler, sent } = setup();
  for (let i = 0; i < 20; i++) {
    assert.equal(
      (await handler(request({ ...values, email: `visitor${i}@example.com` })))
        .status,
      200,
    );
  }
  assert.equal(
    (await handler(request({ ...values, email: "another@example.com" })))
      .status,
    429,
  );
  assert.equal(sent.length, 20);
});
