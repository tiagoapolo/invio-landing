// Registro das consultas públicas gratuitas em /consulta/*.
//
// Cada tabela é carregada sob demanda: os dados só entram no bundle da página que
// os usa, e a homepage não paga por eles. A estrutura já prevê as páginas por
// código (/consulta/<tabela>/<codigo>-<slug>) que virão depois — `entryPath` e
// `parseEntryCode` são o contrato entre a URL e o registro.

export interface ConsultaEntry {
  /** Valor exato aceito pelo campo correspondente da NFS-e Nacional. */
  code: string;
  /** Descrição oficial. */
  label: string;
  /** Qualificador curto: item da LC 116 ou UF do município. */
  badge?: string;
}

export type ConsultaSlug = "lc116" | "nbs" | "codigo-municipio";

export interface ConsultaDataset {
  slug: ConsultaSlug;
  /** Rótulo curto usado em navegação e breadcrumbs. */
  name: string;
  title: string;
  description: string;
  heading: string;
  lead: string;
  /** Campo da NFS-e que recebe este código. */
  field: string;
  fieldNote: string;
  codeLabel: string;
  labelHeading: string;
  badgeHeading?: string;
  /** Norma ou fonte oficial, citada na página. */
  source: { label: string; url: string };
  searchPlaceholder: string;
  load: () => Promise<ConsultaEntry[]>;
}

/** `1.05 — Licenciamento…` vira o item (badge) e a descrição do serviço. */
function splitLc116(label: string): { badge: string; label: string } {
  const separator = label.indexOf(" — ");
  if (separator < 0) return { badge: "", label };
  return { badge: label.slice(0, separator), label: label.slice(separator + 3) };
}

export const CONSULTA_DATASETS: Record<ConsultaSlug, ConsultaDataset> = {
  lc116: {
    slug: "lc116",
    name: "LC 116/2003",
    title: "Tabela LC 116/2003 completa — códigos de serviço da NFS-e | Invio",
    description:
      "Consulta gratuita da lista de serviços da LC 116/2003 com o código de 6 dígitos que a NFS-e Nacional exige no campo cTribNac. Busque por item ou por descrição.",
    heading: "Tabela LC 116/2003 e os códigos de tributação nacional",
    lead:
      "A lista de serviços da Lei Complementar 116/2003 define o item de ISS de cada atividade. Na NFS-e Nacional o item vira um código de 6 dígitos — item, subitem e desdobro — enviado no campo cTribNac.",
    field: "cTribNac",
    fieldNote:
      "O código de 6 dígitos combina item (2), subitem (2) e desdobro (2). O item 1.05, por exemplo, é enviado como 010501.",
    codeLabel: "cTribNac",
    labelHeading: "Serviço",
    badgeHeading: "Item",
    source: {
      label: "Lei Complementar 116/2003",
      url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm",
    },
    searchPlaceholder: "Busque por 1.05, 010501 ou “licenciamento de software”",
    load: async () => {
      const { LC116 } = await import("./lc116");
      return LC116.map((item) => ({ code: item.code, ...splitLc116(item.label) }));
    },
  },
  nbs: {
    slug: "nbs",
    name: "NBS 2.0",
    title: "Tabela NBS completa — códigos da Nomenclatura Brasileira de Serviços | Invio",
    description:
      "Consulta gratuita dos 920 códigos de nível-folha da NBS 2.0, a Nomenclatura Brasileira de Serviços usada no campo cNBS da NFS-e Nacional. Busque por código ou descrição.",
    heading: "Tabela NBS 2.0 — Nomenclatura Brasileira de Serviços",
    lead:
      "A NBS classifica serviços, intangíveis e demais operações que produzam variações no patrimônio. Na NFS-e Nacional ela aparece no campo cNBS, que aceita apenas os códigos de nível-folha, com 9 dígitos.",
    field: "cNBS",
    fieldNote:
      "Somente os 920 códigos de nível-folha são valores válidos. Os agregadores de capítulo, posição e subposição da tabela oficial não podem ser enviados.",
    codeLabel: "cNBS",
    labelHeading: "Serviço",
    source: {
      label: "NBS — MDIC",
      url: "https://www.gov.br/mdic/pt-br/assuntos/sdic/comercio-e-servicos/nbs-nomenclatura-brasileira-de-servicos",
    },
    searchPlaceholder: "Busque por 115011000 ou “desenvolvimento de software”",
    load: async () => {
      const { NBS } = await import("./nbs");
      return NBS.map((item) => ({ code: item.code, label: item.label }));
    },
  },
  "codigo-municipio": {
    slug: "codigo-municipio",
    name: "Código de município",
    title: "Código IBGE de município — tabela completa para NFS-e | Invio",
    description:
      "Consulta gratuita dos códigos IBGE de 7 dígitos dos 5.571 municípios brasileiros, exigidos nos campos cLocEmi, cLocPrestacao e cMun da NFS-e Nacional.",
    heading: "Código IBGE de município para a NFS-e Nacional",
    lead:
      "O leiaute da NFS-e Nacional não aceita o nome da cidade: os campos de localidade recebem o código IBGE de 7 dígitos. Busque pelo nome do município, pela UF ou pelo próprio código.",
    field: "cLocEmi · cLocPrestacao · cMun",
    fieldNote:
      "O mesmo código identifica o município de emissão, o de prestação do serviço e o endereço das partes envolvidas.",
    codeLabel: "Código IBGE",
    labelHeading: "Município",
    badgeHeading: "UF",
    source: {
      label: "API de localidades do IBGE",
      url: "https://servicodados.ibge.gov.br/api/docs/localidades",
    },
    searchPlaceholder: "Busque por Curitiba, PR ou 4106902",
    load: async () => {
      const { MUNICIPALITIES } = await import("./municipalities");
      return MUNICIPALITIES.map((item) => ({ code: item.code, label: item.name, badge: item.uf }));
    },
  },
};

export const CONSULTA_SLUGS = Object.keys(CONSULTA_DATASETS) as ConsultaSlug[];

export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function slugify(value: string): string {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** URL da página individual de um código. Ainda não publicada, já estável. */
export function entryPath(slug: ConsultaSlug, entry: ConsultaEntry): string {
  return `/consulta/${slug}/${entry.code}-${slugify(entry.label)}`;
}

/** Lê o código de um segmento `<codigo>-<slug>` da URL. */
export function parseEntryCode(segment: string): string {
  const digits = segment.split("-")[0]?.replace(/\D/g, "") ?? "";
  return digits;
}

export function searchEntries(entries: ConsultaEntry[], query: string): ConsultaEntry[] {
  const trimmed = query.trim();
  if (!trimmed) return entries;

  // Busca numérica: o código completo (010501) e a notação do item (1.05) apontam
  // para a mesma linha, então as duas formas casam.
  const digits = trimmed.replace(/\D/g, "");
  if (digits && /^[\d.\s-]+$/.test(trimmed)) {
    const item = trimmed.replace(/\s/g, "");
    return entries.filter((entry) => entry.code.startsWith(digits) || entry.badge?.startsWith(item));
  }

  const term = normalize(trimmed);
  return entries.filter(
    (entry) => normalize(entry.label).includes(term) || (entry.badge ? normalize(entry.badge) === term : false),
  );
}
