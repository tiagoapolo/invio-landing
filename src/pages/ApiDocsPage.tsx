import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ApiCodeBlock } from "../components/api-docs/ApiCodeBlock";
import { ApiEndpoint } from "../components/api-docs/ApiEndpoint";
import { SdkTechnicalSection } from "../components/api-docs/SdkTechnicalSection";
import { SefinTechnicalSection } from "../components/api-docs/SefinTechnicalSection";

const navigation = [
  ["Visão geral", "#visao-geral"],
  ["Autenticação", "#autenticacao"],
  ["Primeira chamada", "#primeira-chamada"],
  ["Emissões", "#emissoes"],
  ["Paginação", "#paginacao"],
  ["Estados", "#estados"],
  ["SEFIN", "#sefin"],
  ["SDK TypeScript", "#sdk"],
  ["Erros", "#erros"],
  ["Webhooks", "#webhooks"],
  ["Mapa de recursos", "#recursos"],
  ["Operações com efeito", "#operacoes"],
];

const emissionStatuses = [
  ["queued", "Recebida e aguardando processamento."],
  ["validating", "Dados e contexto fiscal em validação."],
  ["signing", "DPS em preparação e assinatura."],
  ["transmitting", "Transmissão para o ambiente nacional iniciada."],
  ["sent", "DPS transmitida; resultado ainda em processamento."],
  ["authorized", "NFS-e autorizada e XML disponível."],
  ["rejected", "Rejeitada com erros fiscais para diagnóstico."],
  ["error", "Falha técnica definitiva após as tentativas previstas."],
  ["cancelled", "NFS-e autorizada que recebeu evento de cancelamento."],
];

const errorStatuses = [
  ["400", "Parâmetros ou payload inválidos."],
  ["401", "Authorization ausente, chave inválida, revogada ou sessão expirada."],
  ["403", "Escopo insuficiente ou operação bloqueada no ambiente informado."],
  ["404", "Recurso não encontrado na organização autenticada."],
  ["409", "Conflito de estado, como tentar revogar uma chave já revogada."],
  ["422", "Validação fiscal ou regra de negócio não atendida."],
  ["429", "Limite de criação de emissões atingido; respeite retryAfter."],
  ["500", "Falha interna. Registre endpoint, horário e resposta sem credenciais."],
];

const resourceGroups = [
  ["Emitentes", "GET · POST · PATCH · DELETE", "/v1/emitters", "CNPJ, ambiente e parâmetros fiscais do prestador."],
  ["Perfis de serviço", "GET · POST · DELETE", "/v1/service-profiles", "Defaults declarativos usados na emissão."],
  ["Certificados", "GET · POST · DELETE", "/v1/certificates", "Certificado A1 associado ao emitente."],
  ["Emissões", "GET · POST", "/v1/emissions", "Validação, criação, consulta, eventos e XML."],
  ["Webhooks", "GET · POST · PATCH · DELETE", "/v1/webhooks", "Destinos HTTPS e eventos assinados."],
  ["Chaves e alertas", "GET · POST · DELETE", "/v1/api-keys · /v1/alerts", "Credenciais mascaradas e vencimento de certificados."],
];

const setupCommand = `export INVIO_API_URL="https://SUA_URL_DA_API"
export INVIO_API_KEY="sua_chave_de_api"

curl --fail-with-body "$INVIO_API_URL/health"`;

const listCommand = `curl --fail-with-body \
  "$INVIO_API_URL/v1/emissions?status=authorized&limit=20&offset=0" \
  -H "Authorization: Bearer $INVIO_API_KEY"`;

const listResponse = `{
  "data": [
    {
      "id": "00000000-0000-0000-0000-000000000000",
      "emitter_id": "00000000-0000-0000-0000-000000000000",
      "status": "authorized",
      "ambiente": "restrita",
      "chave_acesso": "00000000000000000000000000000000000000000000000000",
      "created_at": "2026-08-06T12:00:00.000Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}`;

const webhookPayload = `{
  "event": "emission.authorized",
  "emission_id": "00000000-0000-0000-0000-000000000000",
  "chave_acesso": "00000000000000000000000000000000000000000000000000",
  "timestamp": "2026-08-06T12:00:00.000Z"
}`;

const signatureExample = `import { createHmac, timingSafeEqual } from "node:crypto";

export function isValidInvioSignature(rawBody, signature, secret) {
  const received = signature.replace(/^sha256=/, "");
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(received, "hex");
  const b = Buffer.from(expected, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}`;

export function ApiDocsPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" className="api-docs-page">
        <section className="api-docs-hero">
          <div className="container api-docs-hero-layout">
            <div>
              <p className="eyebrow"><span /> Referência técnica · API v1</p>
              <h1>Integre a NFS-e com contexto, previsibilidade e segurança.</h1>
              <p>Da primeira consulta ao acompanhamento da emissão: contratos, estados, erros e webhooks explicados a partir do comportamento real da API.</p>
            </div>
            <div className="api-docs-hero-aside">
              <dl className="api-docs-facts">
                <div><dt>Protocolo</dt><dd>REST · JSON</dd></div>
                <div><dt>Autenticação</dt><dd>Bearer token</dd></div>
                <div><dt>Ambientes</dt><dd>restrita · producao</dd></div>
              </dl>
              <div className="api-docs-assistant">
                <strong>Dúvidas sobre a documentação?</strong>
                <p>Converse sobre endpoints, SEFIN, SDK e fluxos de integração.</p>
                <a href="https://chatgpt.com/g/g-6a7492a961148191b0ae637b64f478d1-invio-api-assistente" target="_blank" rel="noreferrer">
                  Fale com o Invio API Assistente <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="container api-docs-shell">
          <aside className="api-docs-sidebar" aria-label="Navegação da documentação">
            <strong>Documentação</strong>
            <nav>{navigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
            <div className="api-sidebar-note"><span>Princípio seguro</span><p>Os comandos desta página não criam, alteram, cancelam ou transmitem dados fiscais.</p></div>
          </aside>

          <div className="api-docs-content">
            <section className="api-docs-section" id="visao-geral">
              <p className="api-section-kicker">Visão geral</p>
              <h2>O modelo mental da integração</h2>
              <p className="api-section-lead">A configuração fiscal vive em recursos reutilizáveis. Cada emissão referencia um emitente e um perfil de serviço, entra em uma fila assíncrona e evolui até um estado final.</p>
              <ol className="api-overview-steps">
                <li><span>1</span><div><strong>Configure</strong><p>Emitente, perfil de serviço e certificado A1 válido.</p></div></li>
                <li><span>2</span><div><strong>Valide e envie</strong><p>Valide o payload e crie a emissão com uma chave de idempotência.</p></div></li>
                <li><span>3</span><div><strong>Acompanhe</strong><p>Consulte o estado ou processe os webhooks assinados.</p></div></li>
                <li><span>4</span><div><strong>Concilie</strong><p>Relacione o resultado ao seu billing e obtenha o XML autorizado.</p></div></li>
              </ol>
              <div className="api-callout api-callout-info"><strong>Antes de começar</strong><p>A URL-base da API é fornecida durante o onboarding. Não use a URL da landing page como endpoint.</p></div>
            </section>

            <section className="api-docs-section" id="autenticacao">
              <p className="api-section-kicker">Autenticação</p>
              <h2>Uma credencial por integração, com o menor escopo possível</h2>
              <p>Todas as rotas <code>/v1</code> exigem o header <code>Authorization: Bearer &lt;API_KEY&gt;</code>. A chave identifica a organização automaticamente.</p>
              <div className="api-auth-grid">
                <div><strong>emissions:read</strong><p>Listar emissões, consultar detalhes, eventos e XML.</p></div>
                <div><strong>emissions:write</strong><p>Validar payloads, criar emissões e registrar eventos fiscais.</p></div>
                <div><strong>webhooks:read</strong><p>Listar destinos configurados.</p></div>
                <div><strong>webhooks:write</strong><p>Criar, alterar ou remover destinos.</p></div>
              </div>
              <div className="api-callout api-callout-warning"><strong>Credenciais</strong><p>Nunca exponha API keys no frontend, em logs ou em exemplos compartilhados. A criação e a revogação de chaves exigem uma sessão do dashboard.</p></div>
            </section>

            <section className="api-docs-section" id="primeira-chamada">
              <p className="api-section-kicker">Primeira chamada</p>
              <h2>Confirme a URL e a disponibilidade do serviço</h2>
              <p>Defina as variáveis no seu shell. O healthcheck é público e não acessa dados da organização.</p>
              <ApiCodeBlock label="Shell" code={setupCommand} />
              <p className="api-footnote">Chamadas autenticadas atualizam apenas o campo operacional <code>last_used_at</code> da chave.</p>
            </section>

            <section className="api-docs-section" id="emissoes">
              <p className="api-section-kicker">Referência principal</p>
              <h2>Emissões</h2>
              <ApiEndpoint method="GET" path="/v1/emissions" scope="emissions:read" safe description="Lista as emissões da organização, da mais recente para a mais antiga.">
                <h3>Query parameters</h3>
                <div className="api-params" role="table" aria-label="Parâmetros para listar emissões">
                  <div role="row"><code role="cell">status</code><span role="cell">Opcional</span><p role="cell">Filtra por um estado válido da emissão.</p></div>
                  <div role="row"><code role="cell">emitterId</code><span role="cell">Opcional</span><p role="cell">UUID de um emitente da organização.</p></div>
                  <div role="row"><code role="cell">limit</code><span role="cell">1–100</span><p role="cell">Quantidade por página. Padrão: 50.</p></div>
                  <div role="row"><code role="cell">offset</code><span role="cell">≥ 0</span><p role="cell">Itens ignorados antes da página. Padrão: 0.</p></div>
                </div>
                <ApiCodeBlock label="cURL · somente leitura" code={listCommand} />
                <ApiCodeBlock label="200 · application/json" code={listResponse} />
              </ApiEndpoint>

              <ApiEndpoint method="GET" path="/v1/emissions/:id" scope="emissions:read" safe description="Retorna a emissão completa com os erros persistidos e a linha do tempo de eventos." />
              <ApiEndpoint method="GET" path="/v1/emissions/:id/events" scope="emissions:read" safe description="Lista eventos fiscais, como o cancelamento, vinculados à emissão." />
              <ApiEndpoint method="GET" path="/v1/emissions/:id/nfse.xml" scope="emissions:read" safe description="Retorna uma URL assinada para o XML. A URL expira em 300 segundos e só existe quando o XML já está disponível." />
            </section>

            <section className="api-docs-section" id="paginacao">
              <p className="api-section-kicker">Paginação</p>
              <h2>Navegue com limit e offset</h2>
              <p>A resposta de listagem sempre inclui <code>data</code>, <code>total</code>, <code>limit</code> e <code>offset</code>. Para a próxima página, some o <code>limit</code> atual ao <code>offset</code>.</p>
              <div className="api-formula"><code>proximoOffset = offset + limit</code><span>Continue enquanto <code>proximoOffset &lt; total</code>.</span></div>
            </section>

            <section className="api-docs-section" id="estados">
              <p className="api-section-kicker">Ciclo de vida</p>
              <h2>Estados de uma emissão</h2>
              <div className="api-status-flow" aria-label="Fluxo principal: queued, validating, signing, transmitting, sent e authorized">
                {emissionStatuses.map(([status, description], index) => (
                  <div className={`api-status api-status-${status}`} key={status}><span>{String(index + 1).padStart(2, "0")}</span><code>{status}</code><p>{description}</p></div>
                ))}
              </div>
              <div className="api-callout api-callout-info"><strong>Estados finais</strong><p><code>authorized</code>, <code>rejected</code> e <code>error</code> encerram o processamento. <code>cancelled</code> acontece depois de uma autorização e de um evento fiscal aceito.</p></div>
            </section>

            <SefinTechnicalSection />

            <SdkTechnicalSection />

            <section className="api-docs-section" id="erros">
              <p className="api-section-kicker">Tratamento de falhas</p>
              <h2>Leia o status HTTP e preserve o corpo da resposta</h2>
              <p>A API ainda possui formatos de erro específicos por rota. Sempre trate o status e o campo <code>error</code>; respostas de validação também podem incluir <code>issues</code>, <code>warnings</code> ou um relatório fiscal.</p>
              <div className="api-error-table">
                {errorStatuses.map(([status, meaning]) => <div key={status}><strong>{status}</strong><p>{meaning}</p></div>)}
              </div>
              <ApiCodeBlock label="429 · exemplo" code={`{
  "error": "Muitas requisições",
  "message": "Limite de emissões atingido. Tente novamente em 30s.",
  "retryAfter": 30
}`} />
            </section>

            <section className="api-docs-section" id="webhooks">
              <p className="api-section-kicker">Eventos assíncronos</p>
              <h2>Webhooks assinados com HMAC-SHA256</h2>
              <p>A Invio envia JSON por <code>POST</code> para uma URL HTTPS pública. O header <code>X-Invio-Signature</code> contém <code>sha256=&lt;hex&gt;</code>, calculado sobre os bytes exatos do corpo.</p>
              <div className="api-webhook-events"><span>emission.authorized</span><span>emission.rejected</span><span>emission.error</span></div>
              <ApiCodeBlock label="Payload · emission.authorized" code={webhookPayload} />
              <h3>Validação da assinatura em Node.js</h3>
              <p>Valide o corpo bruto antes de fazer o parse do JSON e compare os hashes em tempo constante.</p>
              <ApiCodeBlock label="Node.js" code={signatureExample} />
              <div className="api-callout api-callout-warning"><strong>Entrega</strong><p>Responda rapidamente com 2xx e processe o evento de forma idempotente. Não confie apenas na ordem de chegada; consulte a emissão quando precisar reconciliar o estado.</p></div>
            </section>

            <section className="api-docs-section" id="recursos">
              <p className="api-section-kicker">Mapa de recursos</p>
              <h2>Superfície da API v1</h2>
              <div className="api-resource-list">
                {resourceGroups.map(([name, methods, path, description]) => (
                  <article key={name}><div><h3>{name}</h3><span>{methods}</span></div><code>{path}</code><p>{description}</p></article>
                ))}
              </div>
            </section>

            <section className="api-docs-section" id="operacoes">
              <p className="api-section-kicker">Operações com efeito</p>
              <h2>Entenda o impacto antes de executar</h2>
              <p>Estas rotas são parte da API, mas não recebem comandos copiáveis nesta documentação pública.</p>
              <div className="api-impact-list">
                <ApiEndpoint method="POST" path="/v1/emissions/validate" scope="emissions:write" description="Valida dados fiscais sem enfileirar uma emissão. Não transmite para a SEFIN." />
                <ApiEndpoint method="POST" path="/v1/emissions" scope="emissions:write" description="Cria e enfileira uma emissão. Envie Idempotency-Key para evitar duplicidade." />
                <ApiEndpoint method="POST" path="/v1/emissions/:id/consultar" scope="emissions:read" description="Faz uma nova consulta externa à SEFIN e registra o evento de consulta." />
                <ApiEndpoint method="POST" path="/v1/emissions/:id/events" scope="emissions:write" description="Registra e transmite um evento fiscal de cancelamento para uma NFS-e autorizada." />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
