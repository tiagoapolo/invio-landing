export type LeadOrigin = "homepage" | "migracao_nuvem_fiscal";
export type LeadFormType = "lead_form" | "plan_builder";

type NullableString = string | null;

type LeadPayloadInput = {
  formType: LeadFormType;
  origin: LeadOrigin;
  contact: {
    name?: string;
    email: string;
    phone: string;
    role?: string;
  };
  company?: {
    name?: string;
    site?: string;
  };
  qualification?: Partial<{
    operation: string;
    cnpjRange: string;
    monthlyVolume: string;
    support: string;
    integration: string;
    timeline: string;
    currentSolution: string;
    mainNeed: string;
    currentSpend: string;
    additionalDetails: string;
    recommendedPlan: string;
    monthlyPrice: number;
  }>;
};

function text(value?: string): NullableString {
  const normalized = value?.trim();
  return normalized || null;
}

export function buildLeadPayload(input: LeadPayloadInput) {
  const query = new URLSearchParams(window.location.search);

  return {
    schemaVersion: "1.0",
    formType: input.formType,
    origin: input.origin,
    submittedAt: new Date().toISOString(),
    contact: {
      name: text(input.contact.name),
      email: input.contact.email.trim(),
      phone: input.contact.phone.trim(),
      role: text(input.contact.role),
    },
    company: {
      name: text(input.company?.name),
      site: text(input.company?.site),
    },
    qualification: {
      operation: text(input.qualification?.operation),
      cnpjRange: text(input.qualification?.cnpjRange),
      monthlyVolume: text(input.qualification?.monthlyVolume),
      support: text(input.qualification?.support),
      integration: text(input.qualification?.integration),
      timeline: text(input.qualification?.timeline),
      currentSolution: text(input.qualification?.currentSolution),
      mainNeed: text(input.qualification?.mainNeed),
      currentSpend: text(input.qualification?.currentSpend),
      additionalDetails: text(input.qualification?.additionalDetails),
      recommendedPlan: text(input.qualification?.recommendedPlan),
      monthlyPrice: input.qualification?.monthlyPrice ?? null,
    },
    consent: {
      contact: true,
    },
    attribution: {
      pageUrl: window.location.href,
      path: window.location.pathname,
      referrer: text(document.referrer),
      utmSource: text(query.get("utm_source") ?? undefined),
      utmMedium: text(query.get("utm_medium") ?? undefined),
      utmCampaign: text(query.get("utm_campaign") ?? undefined),
      utmContent: text(query.get("utm_content") ?? undefined),
      utmTerm: text(query.get("utm_term") ?? undefined),
    },
  };
}
