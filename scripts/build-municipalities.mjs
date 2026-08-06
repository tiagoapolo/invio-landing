// Gera o snapshot versionado de municípios do IBGE em src/data/municipalities.ts.
//
// A consulta pública precisa do conteúdo no HTML renderizado, então os dados
// ficam no repositório em vez de serem buscados no browser a cada visita.
// Rode `npm run build:municipalities` quando o IBGE publicar alterações.

import { writeFile } from "node:fs/promises";
import { fileURLToPath, URL } from "node:url";

const IBGE_URL = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios";
const target = fileURLToPath(new URL("../src/data/municipalities.ts", import.meta.url));

function ufOf(municipality) {
  return (
    municipality.microrregiao?.mesorregiao?.UF?.sigla ||
    municipality["regiao-imediata"]?.["regiao-intermediaria"]?.UF?.sigla ||
    ""
  );
}

const response = await fetch(IBGE_URL);
if (!response.ok) throw new Error(`IBGE respondeu ${response.status}`);

const municipalities = (await response.json())
  .map((municipality) => ({
    code: String(municipality.id),
    name: municipality.nome,
    uf: ufOf(municipality),
  }))
  .filter((municipality) => municipality.code.length === 7 && municipality.name && municipality.uf)
  .sort((a, b) => a.code.localeCompare(b.code));

if (municipalities.length < 5000) {
  throw new Error(`Resposta do IBGE incompleta: ${municipalities.length} municípios`);
}

for (const municipality of municipalities) {
  if (municipality.name.includes("|") || municipality.name.includes("`")) {
    throw new Error(`Nome incompatível com o formato do snapshot: ${municipality.name}`);
  }
}

const rows = municipalities
  .map((municipality) => `${municipality.code}|${municipality.name}|${municipality.uf}`)
  .join("\n");

const file = `// Municípios do IBGE (cMun / cLocEmi / cLocPrestacao: o código de 7 dígitos que o
// schema da NFS-e exige no lugar do nome da cidade).
// Snapshot gerado por \`npm run build:municipalities\` a partir da API pública do IBGE:
// ${IBGE_URL}
// Gerado em ${new Date().toISOString().slice(0, 10)} · ${municipalities.length} municípios.
// Formato de cada linha: codigo|nome|uf

export interface MunicipalityItem {
  code: string;
  name: string;
  uf: string;
}

const RAW = \`${rows}\`;

export const MUNICIPALITIES: MunicipalityItem[] = RAW.split("\\n").map((line) => {
  const [code, name, uf] = line.split("|");
  return { code, name, uf };
});
`;

await writeFile(target, file, "utf8");
console.log(`municipalities.ts atualizado com ${municipalities.length} municípios`);
