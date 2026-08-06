const sefinErrors = [
  ["E0004", "O Id da DPS diverge da concatenação exigida pelo leiaute."],
  ["E0010", "A série informada não é aceita para o emissor ou canal de API."],
  ["E1229", "O XML não contém a declaração UTF-8 esperada."],
  ["E1235", "dhEmi está fora do formato aceito, normalmente por milissegundos ou uso de Z."],
  ["HTTP 400", "O GZip/Base64 está malformado ou o XML não respeita o schema."],
  ["HTTP 403", "O certificado ou sua cadeia não foi aceito no handshake mTLS."],
];

export function SefinTechnicalSection() {
  return (
    <section className="api-docs-section" id="sefin">
      <p className="api-section-kicker">Integração nacional</p>
      <h2>SEFIN: protocolo, ambientes e regras de transporte</h2>
      <p>A API Invio encapsula a comunicação com o Sistema Nacional NFS-e. A unidade enviada é uma DPS no layout 1.01; a NFS-e é o documento autorizado devolvido pelo ambiente nacional.</p>

      <div className="api-sefin-pipeline" aria-label="Pipeline técnico da DPS até a NFS-e autorizada">
        {[
          ["01", "DPS", "JSON declarativo → XML 1.01"],
          ["02", "XMLDSIG", "Assinatura enveloped em infDPS"],
          ["03", "GZip + Base64", "Compactação do XML assinado"],
          ["04", "mTLS", "Certificado ICP-Brasil A1"],
          ["05", "NFS-e", "Resposta autorizada ou rejeições"],
        ].map(([step, title, description]) => <div key={step}><span>{step}</span><strong>{title}</strong><p>{description}</p></div>)}
      </div>

      <h3>Ambientes nacionais</h3>
      <div className="api-environment-table">
        <div><strong>restrita</strong><code>tpAmb = 2</code><p>https://sefin.producaorestrita.nfse.gov.br/SefinNacional</p></div>
        <div><strong>producao</strong><code>tpAmb = 1</code><p>https://sefin.nfse.gov.br/SefinNacional</p></div>
      </div>
      <div className="api-callout api-callout-warning"><strong>Separação de ambiente</strong><p>O ambiente pertence ao emitente e é copiado para cada emissão. Uma emissão criada em <code>restrita</code> não deve ser reaproveitada em <code>producao</code>.</p></div>

      <h3>Operações do protocolo nacional</h3>
      <div className="api-protocol-table">
        <div><span>Transmitir DPS</span><code>POST /nfse</code><p>Corpo JSON com <code>dpsXmlGZipB64</code>.</p></div>
        <div><span>Consultar NFS-e</span><code>GET /nfse/&#123;chave&#125;</code><p>Chave de acesso com 50 dígitos.</p></div>
        <div><span>Enviar evento</span><code>POST /nfse/&#123;chave&#125;/eventos</code><p>Corpo JSON com <code>pedRegXmlGZipB64</code>.</p></div>
      </div>
      <p className="api-footnote">Essas são operações entre a infraestrutura Invio e a SEFIN, não endpoints para consumo direto do cliente. O transporte usa timeout de 60 segundos e valida a cadeia TLS do servidor.</p>

      <h3>Regras que evitam rejeições recorrentes</h3>
      <div className="api-sefin-rules">
        <article><strong>Id da DPS</strong><p>Começa com <code>DPS</code>, possui 45 caracteres e precisa corresponder exatamente aos campos que o compõem.</p></article>
        <article><strong>Data e hora</strong><p><code>dhEmi</code> usa <code>YYYY-MM-DDTHH:mm:ss±HH:mm</code>, sem milissegundos e sem <code>Z</code>.</p></article>
        <article><strong>Códigos como texto</strong><p>CNPJ, CPF, série, códigos fiscais e decimais permanecem strings para preservar zeros à esquerda e precisão.</p></article>
        <article><strong>Ordem XML</strong><p>Os elementos precisam seguir a ordem do XSD nacional; XML semanticamente parecido pode ser rejeitado se estiver fora do leiaute.</p></article>
      </div>

      <h3>Diagnóstico rápido</h3>
      <div className="api-error-table api-sefin-errors">
        {sefinErrors.map(([code, meaning]) => <div key={code}><strong>{code}</strong><p>{meaning}</p></div>)}
      </div>
    </section>
  );
}
