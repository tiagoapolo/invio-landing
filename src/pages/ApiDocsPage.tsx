import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const readExamples = [
  {
    title: "Listar emitentes",
    description: "Retorna os emitentes ativos da organização e os metadados dos certificados associados.",
    scope: "Nenhum escopo adicional.",
    command: 'curl --fail-with-body "$INVIO_API_URL/v1/emitters" -H "Authorization: Bearer $INVIO_API_KEY"',
  },
  {
    title: "Listar perfis de serviço",
    description: "Use o emitterId retornado na lista de emitentes para ver seus perfis de serviço.",
    scope: "Nenhum escopo adicional.",
    command: 'curl --fail-with-body "$INVIO_API_URL/v1/service-profiles?emitterId=$EMITTER_ID" -H "Authorization: Bearer $INVIO_API_KEY"',
  },
  {
    title: "Listar emissões",
    description: "Consulta o histórico sem enviar uma DPS. A paginação começa em offset 0 e aceita até 100 itens por chamada.",
    scope: "emissions:read",
    command: 'curl --fail-with-body "$INVIO_API_URL/v1/emissions?limit=20&offset=0" -H "Authorization: Bearer $INVIO_API_KEY"',
  },
  {
    title: "Consultar uma emissão já existente",
    description: "Retorna o estado, erros e a linha do tempo de uma emissão existente da mesma organização.",
    scope: "emissions:read",
    command: 'curl --fail-with-body "$INVIO_API_URL/v1/emissions/$EMISSION_ID" -H "Authorization: Bearer $INVIO_API_KEY"',
  },
  {
    title: "Listar eventos fiscais",
    description: "Mostra os eventos fiscais vinculados a uma emissão; não envia um novo evento nem cancela a nota.",
    scope: "emissions:read",
    command: 'curl --fail-with-body "$INVIO_API_URL/v1/emissions/$EMISSION_ID/events" -H "Authorization: Bearer $INVIO_API_KEY"',
  },
  {
    title: "Listar webhooks configurados",
    description: "Retorna URL, eventos, estado e data de criação, sem revelar o segredo do webhook.",
    scope: "webhooks:read",
    command: 'curl --fail-with-body "$INVIO_API_URL/v1/webhooks" -H "Authorization: Bearer $INVIO_API_KEY"',
  },
];

const endpointGroups = [
  ["Operação", "GET /v1/emissions, GET /v1/emissions/:id, GET /v1/emissions/:id/events, GET /v1/emissions/:id/nfse.xml", "Leitura de emissões, eventos e URL temporária do XML."],
  ["Emitentes", "GET, POST, PATCH e DELETE /v1/emitters; PATCH /v1/emitters/:id/ndps", "Cadastro e manutenção de emitentes; alterações exigem decisão operacional."],
  ["Perfis e certificados", "GET, POST e DELETE /v1/service-profiles; GET, POST e DELETE /v1/certificates", "Certificados e configurações fiscais devem ser administrados no painel."],
  ["Webhooks", "GET, POST, PATCH e DELETE /v1/webhooks", "A criação revela o segredo somente uma vez; preserve-o fora do código."],
  ["Chaves e alertas", "GET /v1/api-keys; GET /v1/alerts/expiring-certs", "Leitura de chaves mascaradas e certificados próximos do vencimento."],
];

export function ApiDocsPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" className="api-docs-page">
        <section className="api-docs-hero">
          <div className="container">
            <p className="eyebrow"><span /> API Invio</p>
            <h1>Documentação para integrar com segurança.</h1>
            <p>Comece consultando sua configuração e operação atual. Os exemplos desta página usam somente endpoints de leitura: não criam, alteram, cancelam ou transmitem dados fiscais.</p>
            <div className="api-docs-nav" aria-label="Nesta página">
              <a href="#primeira-chamada">Primeira chamada</a>
              <a href="#leituras">Endpoints de leitura</a>
              <a href="#referencia">Mapa da API</a>
              <a href="#operacoes">Operações com efeito</a>
            </div>
          </div>
        </section>

        <section className="api-docs-section" id="primeira-chamada">
          <div className="container api-docs-grid">
            <div>
              <p className="eyebrow">Autenticação</p>
              <h2>Prepare variáveis locais, não dados reais no terminal.</h2>
              <p>A URL-base é fornecida no onboarding da sua organização. Crie uma API key no painel com o menor conjunto de escopos necessário.</p>
              <p className="api-docs-note">As chamadas autenticadas registram somente o último uso da chave. Nenhum exemplo abaixo modifica dados fiscais ou de configuração.</p>
            </div>
            <pre><code>{`export INVIO_API_URL="https://SUA_URL_DA_API"
export INVIO_API_KEY="sua_chave_de_api"

# Verificação sem autenticação
curl --fail-with-body "$INVIO_API_URL/health"`}</code></pre>
          </div>
        </section>

        <section className="api-docs-section api-docs-muted" id="leituras">
          <div className="container">
            <div className="api-docs-heading">
              <p className="eyebrow">Leitura segura</p>
              <h2>Consulte antes de operar.</h2>
              <p>Use IDs retornados pela própria API. Não substitua as variáveis por dados de outra organização.</p>
            </div>
            <div className="api-example-list">
              {readExamples.map((example) => (
                <article className="api-example" key={example.title}>
                  <div><h3>{example.title}</h3><p>{example.description}</p><small>Escopo: <strong>{example.scope}</strong></small></div>
                  <pre><code>{example.command}</code></pre>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="api-docs-section" id="referencia">
          <div className="container">
            <div className="api-docs-heading">
              <p className="eyebrow">Mapa da API</p>
              <h2>Recursos organizados pelo impacto.</h2>
              <p>A autenticação é obrigatória em todas as rotas <code>/v1</code>. A organização é resolvida a partir da chave de API ou da sessão do dashboard.</p>
            </div>
            <div className="api-route-list">
              {endpointGroups.map(([resource, routes, detail]) => (
                <article key={resource}><h3>{resource}</h3><code>{routes}</code><p>{detail}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="api-docs-section" id="operacoes">
          <div className="container api-docs-grid">
            <div>
              <p className="eyebrow">Operações com efeito</p>
              <h2>Valide o fluxo antes de executar.</h2>
              <p>Os endpoints abaixo não possuem exemplos executáveis nesta página porque podem criar ou alterar dados, transmitir uma DPS, consultar a SEFIN ou revelar um segredo uma única vez.</p>
            </div>
            <ul className="api-effect-list">
              <li><code>POST /v1/emissions/validate</code> valida o payload sem enfileirar emissão, mas requer dados fiscais reais ou de teste.</li>
              <li><code>POST /v1/emissions</code> cria uma emissão na fila; use <code>Idempotency-Key</code>.</li>
              <li><code>POST /v1/emissions/:id/consultar</code> realiza uma consulta externa à SEFIN.</li>
              <li><code>POST /v1/emissions/:id/events</code> pode registrar evento fiscal, incluindo cancelamento.</li>
              <li>Cadastros, alterações e remoções de emitentes, perfis, certificados, webhooks e chaves também têm efeito.</li>
            </ul>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
