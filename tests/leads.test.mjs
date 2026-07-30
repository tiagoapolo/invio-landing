import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import handler from "../api/leads.mjs";

const originalFetch = globalThis.fetch;
const originalWebhookUrl = process.env.ATTIO_LEADS_WEBHOOK_URL;

afterEach(() => {
  globalThis.fetch = originalFetch;

  if (originalWebhookUrl === undefined) {
    delete process.env.ATTIO_LEADS_WEBHOOK_URL;
  } else {
    process.env.ATTIO_LEADS_WEBHOOK_URL = originalWebhookUrl;
  }
});

function createResponse() {
  return {
    headers: {},
    statusCode: null,
    body: null,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

const validPayload = {
  schemaVersion: "1.0",
  formType: "lead_form",
  origin: "homepage",
  submittedAt: "2026-07-30T18:30:00.000Z",
  contact: {
    name: "João Silva",
    email: "joao@acme.com.br",
    phone: "(11) 99999-9999",
    role: null,
  },
  company: {
    name: "Acme",
    site: null,
  },
  qualification: {},
  consent: {
    contact: true,
  },
  attribution: {},
};

test("leads endpoint forwards a valid payload to Attio", async () => {
  process.env.ATTIO_LEADS_WEBHOOK_URL = "https://hooks.attio.test/leads";
  let forwardedRequest;

  globalThis.fetch = async (url, options) => {
    forwardedRequest = { url, options };
    return { ok: true };
  };

  const response = createResponse();
  await handler({ method: "POST", body: validPayload }, response);

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, { ok: true });
  assert.equal(forwardedRequest.url, process.env.ATTIO_LEADS_WEBHOOK_URL);
  assert.deepEqual(JSON.parse(forwardedRequest.options.body), validPayload);
});

test("leads endpoint rejects an invalid payload without calling Attio", async () => {
  process.env.ATTIO_LEADS_WEBHOOK_URL = "https://hooks.attio.test/leads";
  let fetchCalled = false;
  globalThis.fetch = async () => {
    fetchCalled = true;
    return { ok: true };
  };

  const response = createResponse();
  await handler({ method: "POST", body: { formType: "lead_form" } }, response);

  assert.equal(response.statusCode, 400);
  assert.equal(fetchCalled, false);
});

test("leads endpoint reports Attio failures without exposing its response", async () => {
  process.env.ATTIO_LEADS_WEBHOOK_URL = "https://hooks.attio.test/leads";
  globalThis.fetch = async () => ({ ok: false });

  const response = createResponse();
  await handler({ method: "POST", body: JSON.stringify(validPayload) }, response);

  assert.equal(response.statusCode, 502);
  assert.deepEqual(response.body, { error: "Attio rejected the lead" });
});
