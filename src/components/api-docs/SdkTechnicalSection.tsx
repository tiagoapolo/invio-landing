import { ApiCodeBlock } from "./ApiCodeBlock";

const safeSdkExample = `import { buildDpsFromJson, type DpsJsonRequest } from "@useinvio/nfse-sdk";

const nota: DpsJsonRequest = {
  ambiente: "restrita",
  prestador: {
    cnpj: "12345678000195",
    cLocEmi: "4106902",
    serie: "1601",
    opSimpNac: "1",
    regEspTrib: "0"
  },
  servico: {
    cTribNac: "010201",
    xDescServ: "Desenvolvimento de software — exemplo",
    cLocPrestacao: "4106902"
  },
  emissao: {
    nDPS: "1",
    dhEmi: "2026-08-06T10:00:00-03:00",
    dCompet: "2026-08-01",
    valores: { vServ: "1000.00" },
    tributacaoMunicipal: { tribISSQN: "3", cPaisResult: "BR", tpRetISSQN: "1" },
    tributacaoFederal: { piscofins: { CST: "07" } },
    totTrib: { pTotTribFed: "0.00", pTotTribEst: "0.00", pTotTribMun: "5.00" }
  }
};

const { id, xml } = buildDpsFromJson(nota);
console.log(id, xml); // apenas gera XML local; não transmite`;

const sdkEntries = [
  ["NfseClient", "Cliente orientado a recursos; concentra ambiente, certificado e defaults."],
  ["buildDpsFromJson", "Valida JSON e gera DPS XML não assinada, sem chamada de rede."],
  ["prepararNota", "Valida no XSD, assina e verifica a XMLDSIG sem transmitir."],
  ["emitirNfse", "Prepara e transmite; retorna chave, DPS ID e XML autorizado."],
  ["consultarNfse", "Consulta a SEFIN pela chave de acesso."],
  ["enviarEvento", "Transmite evento fiscal já assinado e compactado."],
  ["EmitirNotaError", "Preserva status HTTP, DPS ID, corpo bruto e rejeições normalizadas."],
  ["createSefinLatencyTracker", "Agrega latência externa por operação e ambiente."],
];

export function SdkTechnicalSection() {
  return (
    <section className="api-docs-section" id="sdk">
      <p className="api-section-kicker">SDK TypeScript</p>
      <h2>@useinvio/nfse-sdk: a camada protocolar da NFS-e Nacional</h2>
      <p>O pacote público atende Node.js 20 ou superior, usa ESM e não depende de banco, tenant ou estado da aplicação. Ele transforma dados declarativos em DPS, valida, assina, compacta e transporta — sem decidir o tratamento fiscal pelo integrador.</p>

      <div className="api-sdk-boundary">
        <div><span>A SDK faz</span><p>XML 1.01, validação estrutural, XMLDSIG, GZip/Base64, PFX A1, mTLS, consulta, eventos e normalização de rejeições.</p></div>
        <div><span>A aplicação decide</span><p>Códigos fiscais, tributação, numeração, persistência, idempotência, regras contábeis e autorização do usuário.</p></div>
      </div>

      <h3>Pontos de entrada públicos</h3>
      <div className="api-sdk-entries">
        {sdkEntries.map(([name, description]) => <div key={name}><code>{name}</code><p>{description}</p></div>)}
      </div>

      <h3>Exemplo seguro: gerar a DPS sem transmitir</h3>
      <p>Este exemplo apenas valida o objeto e produz o XML localmente. Use dados fictícios em desenvolvimento e valide escolhas fiscais com a contabilidade.</p>
      <ApiCodeBlock label="TypeScript · sem chamada de rede" code={safeSdkExample} />

      <h3>Validações e invariantes</h3>
      <ul className="api-invariant-list">
        <li><strong>Layout:</strong> <code>DPS_SCHEMA_VERSION = 1.01</code>.</li>
        <li><strong>Sem defaults fiscais silenciosos:</strong> blocos obrigatórios, como tributação municipal e total de tributos, precisam ser explícitos.</li>
        <li><strong>totTrib:</strong> segue um <code>xs:choice</code>; informe exatamente uma modalidade de totalização.</li>
        <li><strong>Certificado:</strong> aceita PFX em arquivo, Buffer ou base64; a chave privada e o certificado PEM são usados no handshake mTLS.</li>
        <li><strong>XML:</strong> a DPS é validada no XSD antes de ser assinada; a assinatura é verificada antes da transmissão.</li>
        <li><strong>Limite atual:</strong> o bloco RTC <code>IBSCBS</code> do layout nacional ainda não está implementado na SDK.</li>
      </ul>

      <h3>Pipeline de emissão da SDK</h3>
      <div className="api-sdk-pipeline">
        <span>validateDpsJsonRequest</span><i>→</i><span>buildDpsFromJson</span><i>→</i><span>validateDpsXmlAgainstXsd</span><i>→</i><span>signDps + verifyDps</span><i>→</i><span>gzipBase64</span><i>→</i><span>transmitirDpsCompactada</span>
      </div>

      <div className="api-callout api-callout-info"><strong>Observabilidade</strong><p>As métricas de round-trip da SEFIN ficam desligadas por padrão. Ative com <code>NFSE_SEFIN_LATENCY_METRICS=1</code>; percentis p50, p95 e p99 exigem <code>includePercentiles: true</code>.</p></div>
    </section>
  );
}
