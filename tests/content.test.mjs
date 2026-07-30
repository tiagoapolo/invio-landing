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

test("migration page keeps factual, non-affiliated positioning", async () => {
  const [html, page] = await Promise.all([
    read("../migrar-da-nuvem-fiscal/index.html"),
    read("../src/pages/MigrationPage.tsx"),
  ]);

  assert.match(html, /Migração da Nuvem Fiscal para o Invio/);
  assert.match(html, /Programa de migração assistida para SaaS, ERPs e plataformas/);
  assert.match(html, /name="twitter:description"/);
  assert.match(page, /31 de julho de 2026/);
  assert.match(page, /não possui afiliação com a Nuvem Fiscal/);
  assert.match(page, /não prometemos compatibilidade automática/);
  assert.match(page, /sem promessa de prazo genérico/);
  assert.match(page, /Plano especial de migração/);
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
  assert.match(builder, /leadType: "plan_builder"/);
  assert.doesNotMatch(builder, /desconto de|% de desconto/);
});

test("lead form requires persistence before showing success", async () => {
  const form = await read("../src/components/LeadForm.tsx");

  assert.match(form, /VITE_LEADS_ENDPOINT/);
  assert.match(form, /if \(!response\.ok\) throw/);
  assert.match(form, /migracao_nuvem_fiscal/);
  assert.match(form, /homepage/);
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

test("remote landing follows the product, SEO and transparency brief", async () => {
  const [html, page, home, footer, sitemap, analytics] = await Promise.all([
    read("../remote/index.html"),
    read("../src/pages/RemotePage.tsx"),
    read("../src/pages/HomePage.tsx"),
    read("../src/components/Footer.tsx"),
    read("../public/sitemap.xml"),
    read("../src/analytics.ts"),
  ]);

  assert.match(html, /Invio Remote — NFS-e para quem trabalha para o exterior/);
  assert.match(html, /https:\/\/useinvio\.com\/remote/);
  assert.match(html, /summary_large_image/);
  assert.match(html, /remote-og\.png/);
  assert.match(html, /SoftwareApplication/);
  assert.match(html, /FAQPage/);
  assert.match(page, /Seu trabalho é global\. Suas notas não precisam ser complicadas\./);
  assert.match(page, /Plano grátis com até 2 notas por mês e 1 emitente/);
  assert.match(page, /Certificado digital A1 necessário/);
  assert.match(page, /A Invio não recebe pagamentos nem realiza operações de câmbio/);
  assert.match(page, /A Invio não substitui sua contabilidade/);
  assert.match(page, /https:\/\/app\.useinvio\.com/);
  assert.match(page, /remote_signup_click/);
  assert.match(home, /href="\/remote"/);
  assert.match(footer, /href="\/remote">Invio Remote/);
  assert.match(sitemap, /https:\/\/useinvio\.com\/remote/);
  assert.match(analytics, /dataLayer/);
  assert.doesNotMatch(page, /redução de impostos|receba pagamentos|câmbio automático/i);
  assert.doesNotMatch(page, /clientes atendidos|notas processadas|depoimento/i);
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
