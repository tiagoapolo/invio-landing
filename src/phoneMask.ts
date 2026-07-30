import type { FormEvent } from "react";

export function formatBrazilianPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (!digits) return "";
  if (digits.length <= 2) return `(${digits}`;

  const areaCode = digits.slice(0, 2);
  const localNumber = digits.slice(2);

  if (localNumber.length <= 4) return `(${areaCode}) ${localNumber}`;

  const prefixLength = localNumber.length > 8 ? 5 : 4;
  return `(${areaCode}) ${localNumber.slice(0, prefixLength)}-${localNumber.slice(prefixLength)}`;
}

export function applyPhoneMask(event: FormEvent<HTMLInputElement>) {
  event.currentTarget.value = formatBrazilianPhone(event.currentTarget.value);
}
