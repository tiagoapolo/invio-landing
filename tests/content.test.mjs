import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

const structuredData = (html) => {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, "expected JSON-LD structured data");
  return JSON.parse(match[1]);
};

test("homepage has the approved positioning and SEO metadata", async () => {
  const [html, page] = await Promise.all([
    read("../index.html"),
    read("../src/pages/HomePage.tsx"),
  ]);

  assert.match(html, /Invio — API de NFS-e Nacional para SaaS e plataformas/);
  assert.match(html, /Emita e monitore NFS-e Nacional com API, webhooks/);
  assert.match(html, /https:\/\/useinvio\.com\//);
  assert.match(html, /name="twitter:title"/);
  assert.match(page, /Integre uma vez\. Emita e monitore/);
  assert.match(page, /Descubra qual plano combina/);
  assert.match(page, /Montador de plano/);
  assert.match(page, /CNPJs ativos/);
  assert.match(page, /Idempotency-Key/);
  assert.doesNotMatch(page, /SLA de|99,9%|clientes atendidos|notas processadas/);
});

test("API documentation has a dedicated safe-read route", async () => {
  const [app, header, footer, docs] = await Promise.all([
    read("../src/App.tsx"),
    read("../src/components/Header.tsx"),
    read("../src/components/Footer.tsx"),
    read("../src/pages/ApiDocsPage.tsx"),
  ]);

  assert.match(app, /path === "\/api"/);
  assert.match(app, /<ApiDocsPage/);
  assert.match(header, /href="\/api"[^>]*>Documentação/);
  assert.match(footer, /href="\/api"[^>]*>Documentação da API/);
  assert.match(docs, /\/v1\/emitters/);
  assert.match(docs, /\/v1\/emissions/);
  assert.match(docs, /\/v1\/webhooks/);
  assert.match(docs, /não criam, alteram, cancelam ou transmitem/);
  assert.doesNotMatch(docs, /Prompt para GPT de suporte/);
  assert.doesNotMatch(docs, /curl[^`]*POST \/v1\/emissions/);
});

test("migration page keeps factual, non-affiliated positioning", async () => {
  const [html, page] = await Promise.all([
    read("../migrar-da-nuvem-fiscal/index.html"),
    read("../src/pages/MigrationPage.tsx"),
  ]);

  assert.match(html, /Migração da Nuvem Fiscal para o Invio/);
  assert.match(html, /Avaliações de migração assistida por etapas a partir de 31\/07/);
  assert.match(html, /name="twitter:description"/);
  assert.match(page, /31 de julho de 2026/);
  assert.match(page, /Avaliações abertas em 31\/07/);
  assert.match(page, /entrada em operação por etapas/);
  assert.match(page, /capacidade de onboarding/);
  assert.match(page, /não possui afiliação com a Nuvem Fiscal/);
  assert.match(page, /não prometemos compatibilidade automática/);
  assert.match(page, /sem promessa de prazo genérico/);
  assert.match(page, /Avaliação por etapas/);
  assert.doesNotMatch(page, /Comece pelo diagnóstico/);
  assert.doesNotMatch(page, /LeadForm/);
});

test("plan builder recommends standard and migration profiles", async () => {
  const builder = await read("../src/components/PlanBuilder.tsx");

  assert.match(builder, /name: "Essencial"/);
  assert.match(builder, /name: "Crescimento"/);
  assert.match(builder, /name: "Plataforma"/);
  assert.match(builder, /name: "Alto Volume"/);
  assert.match(builder, /monthlyPrice: 149/);
  assert.match(builder, /monthlyPrice: 349/);
  assert.match(builder, /monthlyPrice: 699/);
  assert.match(builder, /monthlyPrice: 1199/);
  assert.match(builder, /monthlyPrice: 2499/);
  assert.match(builder, /Migração Assistida/);
  assert.match(builder, /Condição comercial especial/);
  assert.match(builder, /Estimativa inicial/);
  assert.match(builder, /Valor estimado para o seu cenário/);
  assert.match(builder, /name="email"/);
  assert.match(builder, /name="phone"/);
  assert.match(builder, /Quero contratar este plano/);
  assert.match(builder, /Solicitar avaliação da migração/);
  assert.match(builder, /formType: "plan_builder"/);
  assert.doesNotMatch(builder, /desconto de|% de desconto/);
});

test("lead form requires persistence before showing success", async () => {
  const [form, payload] = await Promise.all([
    read("../src/components/LeadForm.tsx"),
    read("../src/leadPayload.ts"),
  ]);

  assert.match(form, /VITE_LEADS_ENDPOINT/);
  assert.match(form, /if \(!response\.ok\) throw/);
  assert.match(payload, /migracao_nuvem_fiscal/);
  assert.match(payload, /homepage/);
  assert.match(form, /name="phone"/);
  assert.match(form, /Nenhuma contratação acontece automaticamente/);
  assert.match(form, /name="address"/);
  assert.doesNotMatch(form, /console\.(log|error)/);
});

test("client routing corrects metadata when hosting falls back to the homepage", async () => {
  const [app, analytics, main] = await Promise.all([
    read("../src/App.tsx"),
    read("../src/analytics.ts"),
    read("../src/main.tsx"),
  ]);

  assert.match(app, /document\.title = metadata\.title/);
  assert.match(app, /link\[rel=\"canonical\"\]/);
  assert.match(app, /setMeta\("property", "og:image", metadata\.image\)/);
  assert.match(app, /trackPageView\(metadata\.title\)/);
  assert.match(app, /migrar-da-nuvem-fiscal/);
  assert.match(app, /path === "\/remote"/);
  assert.match(app, /<RemotePage/);
  assert.match(analytics, /G-K6BXVEHZKV/);
  assert.match(analytics, /send_page_view: false/);
  assert.match(analytics, /"page_view"/);
  assert.match(main, /initializeAnalytics\(\)/);
});

test("forms track starts, attempts, successful leads and errors without personal data", async () => {
  const [leadForm, planBuilder] = await Promise.all([
    read("../src/components/LeadForm.tsx"),
    read("../src/components/PlanBuilder.tsx"),
  ]);

  for (const form of [leadForm, planBuilder]) {
    assert.match(form, /"form_start"/);
    assert.match(form, /"form_submit"/);
    assert.match(form, /"generate_lead"/);
    assert.match(form, /"form_error"/);
    assert.doesNotMatch(form, /trackEvent\([^\n]+email/);
    assert.doesNotMatch(form, /trackEvent\([^\n]+phone/);
  }
});

test("forms send the same normalized lead payload contract", async () => {
  const [leadForm, planBuilder, payload] = await Promise.all([
    read("../src/components/LeadForm.tsx"),
    read("../src/components/PlanBuilder.tsx"),
    read("../src/leadPayload.ts"),
  ]);

  assert.match(leadForm, /buildLeadPayload/);
  assert.match(planBuilder, /buildLeadPayload/);
  assert.match(payload, /schemaVersion: "1\.0"/);
  assert.match(payload, /submittedAt/);
  assert.match(payload, /qualification:/);
  assert.match(payload, /attribution:/);
  assert.match(payload, /utmSource/);
  assert.match(payload, /contact: true/);
});

test("phone fields share the Brazilian phone mask", async () => {
  const [leadForm, planBuilder, phoneMask] = await Promise.all([
    read("../src/components/LeadForm.tsx"),
    read("../src/components/PlanBuilder.tsx"),
    read("../src/phoneMask.ts"),
  ]);

  for (const form of [leadForm, planBuilder]) {
    assert.match(form, /onInput=\{applyPhoneMask\}/);
    assert.match(form, /maxLength=\{15\}/);
    assert.match(form, /pattern=/);
  }

  assert.match(phoneMask, /replace\(\/\\D\/g, ""\)/);
  assert.match(phoneMask, /slice\(0, 11\)/);
  assert.match(phoneMask, /localNumber\.length > 8 \? 5 : 4/);
});

test("remote landing follows the product, SEO and transparency brief", async () => {
  const [html, page, home, footer, sitemap, analytics] = await Promise.all([
    read("../remote/index.html"),
    read("../src/pages/RemotePage.tsx"),
    read("../src/pages/HomePage.tsx"),
    read("../src/components/Footer.tsx"),
    read("../public/sitemap.xml"),
    read("../src/analytics.ts"),
  ]);

  assert.match(html, /Como emitir nota fiscal para cliente do exterior \| Invio/);
  assert.match(html, /https:\/\/useinvio\.com\/remote/);
  assert.match(html, /summary_large_image/);
  assert.match(html, /remote-og\.png/);
  assert.match(html, /SoftwareApplication/);
  assert.match(html, /FAQPage/);
  assert.match(page, /Emita NFS-e para/);
  assert.match(page, /no exterior/);
  assert.match(page, /sem depender/);
  assert.match(page, /O processo hoje/);
  assert.match(page, /muitos profissionais enfrentam hoje este processo nos portais fiscais/);
  assert.match(page, /informar em reais um serviço pago em dólar ou euro/);
  assert.doesNotMatch(page, /key=\{pain\}[^\n]+Icon name="arrow"/);
  assert.match(page, /Criar conta grátis/);
  assert.match(page, /Grátis até 2 notas por mês/);
  assert.match(page, /arquivo no formato <strong>\.pfx/);
  assert.match(page, /autoridade certificadora credenciada pela ICP-Brasil/);
  assert.match(page, /Northstar LLC/);
  assert.match(page, /As telas abaixo são ilustrativas e usam dados fictícios/);
  assert.match(page, /O que acontece quando atinjo o limite de 2 notas/);
  assert.match(page, /aria-expanded=\{open\}/);
  assert.match(page, /aria-controls=\{answerId\}/);
  assert.match(page, /Certificado digital A1 necessário/);
  assert.match(page, /A Invio não recebe pagamentos nem faz câmbio/);
  assert.match(page, /A Invio não substitui seu contador/);
  assert.match(page, /O que a Invio faz e o que fica com você/);
  assert.match(page, /https:\/\/app\.useinvio\.com/);
  assert.match(page, /https:\/\/wa\.me\/5541999735882/);
  assert.match(page, /remote_signup_click/);
  assert.match(home, /href="\/remote"/);
  assert.match(footer, /href="\/remote">Invio Remote/);
  assert.match(footer, /Fale com a Invio/);
  assert.match(footer, /https:\/\/wa\.me\/5541999735882/);
  assert.match(sitemap, /https:\/\/useinvio\.com\/remote/);
  assert.match(analytics, /dataLayer/);
  assert.doesNotMatch(page, /redução de impostos|receba pagamentos|câmbio automático/i);
  assert.doesNotMatch(page, /clientes atendidos|notas processadas|depoimento/i);
  assert.doesNotMatch(page, /criptograf|armazenado com segurança|acesso restrito/i);
});

test("AI discovery files expose factual product context", async () => {
  const [summary, full, robots, sitemap] = await Promise.all([
    read("../public/llms.txt"),
    read("../public/llms-full.txt"),
    read("../public/robots.txt"),
    read("../public/sitemap.xml"),
  ]);

  assert.match(summary, /^# Invio/m);
  assert.match(summary, /https:\/\/useinvio\.com\/llms-full\.txt/);
  assert.match(summary, /does not replace accounting advice/i);
  assert.match(full, /X-Invio-Signature/);
  assert.match(full, /https:\/\/useinvio\.com\/api/);
  assert.match(full, /Invio is not affiliated with Nuvem Fiscal/);
  assert.match(full, /Up to 2 NFS-e per month/);
  assert.match(robots, /User-agent: GPTBot\nAllow: \//);
  assert.match(robots, /User-agent: OAI-SearchBot\nAllow: \//);
  assert.match(robots, /User-agent: ClaudeBot\nAllow: \//);
  assert.match(sitemap, /<lastmod>2026-07-30<\/lastmod>/);
});

test("every public landing exposes linked AI context and valid entity schema", async () => {
  const pages = await Promise.all([
    read("../index.html"),
    read("../remote/index.html"),
    read("../migrar-da-nuvem-fiscal/index.html"),
  ]);

  for (const html of pages) {
    assert.match(html, /rel="alternate" type="text\/plain" href="\/llms\.txt"/);
    assert.match(html, /<noscript>[\s\S]*?<main>[\s\S]*?<h1>/);
    assert.match(html, /href="\/llms-full\.txt"/);
    const schema = structuredData(html);
    assert.equal(schema["@context"], "https://schema.org");
    assert.ok(Array.isArray(schema["@graph"]));
    assert.ok(schema["@graph"].some((entity) => entity["@type"] === "Organization"));
    assert.ok(schema["@graph"].some((entity) => entity["@type"] === "WebPage"));
  }
});
