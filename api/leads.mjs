const allowedFormTypes = new Set(["lead_form", "plan_builder"]);
const allowedOrigins = new Set(["homepage", "migracao_nuvem_fiscal"]);

function parseBody(body) {
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }

  return body;
}

function isValidLead(payload) {
  return (
    payload &&
    typeof payload === "object" &&
    payload.schemaVersion === "1.0" &&
    allowedFormTypes.has(payload.formType) &&
    allowedOrigins.has(payload.origin) &&
    typeof payload.contact?.email === "string" &&
    payload.contact.email.length > 0 &&
    typeof payload.contact?.phone === "string" &&
    payload.contact.phone.length > 0 &&
    payload.consent?.contact === true
  );
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const webhookUrl = process.env.ATTIO_LEADS_WEBHOOK_URL;
  if (!webhookUrl) {
    return response.status(500).json({ error: "Lead endpoint is not configured" });
  }

  const payload = parseBody(request.body);
  if (!isValidLead(payload)) {
    return response.status(400).json({ error: "Invalid lead payload" });
  }

  try {
    const attioResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!attioResponse.ok) {
      return response.status(502).json({ error: "Attio rejected the lead" });
    }

    return response.status(200).json({ ok: true });
  } catch {
    return response.status(502).json({ error: "Attio is unavailable" });
  }
}
