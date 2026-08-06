import { ApiCodeBlock } from "../components/api-docs/ApiCodeBlock";
import { ConsultaTable } from "../components/consulta/ConsultaTable";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";
import type { ConsultaDataset, ConsultaSlug } from "../data/consulta";
import { CONSULTA_DATASETS, CONSULTA_SLUGS } from "../data/consulta";

const usageExample = `{
  "servico": {
    "cTribNac": "010501",
    "cNBS": "115011000",
    "cLocPrestacao": "4106902",
    "xDescServ": "Licenciamento de uso de software"
  }
}`;

export function ConsultaPage({ dataset, code = "" }: { dataset: ConsultaDataset; code?: string }) {
  const all = CONSULTA_SLUGS.map((slug) => CONSULTA_DATASETS[slug as ConsultaSlug]);
  const related = all.filter((item) => item.slug !== dataset.slug);

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" className="consulta-page">
        <section className="consulta-hero">
          <div className="container">
            <nav className="consulta-breadcrumb" aria-label="Você está em">
              <a href="/">Invio</a>
              <span aria-hidden="true">/</span>
              <span>Consultas</span>
              <span aria-hidden="true">/</span>
              <strong>{dataset.name}</strong>
            </nav>
            <nav className="consulta-switch" aria-label="Consultas gratuitas">
              {all.map((item) => (
                <a
                  key={item.slug}
                  href={`/consulta/${item.slug}`}
                  className={item.slug === dataset.slug ? "is-current" : ""}
                  aria-current={item.slug === dataset.slug ? "page" : undefined}
                >
                  <strong>{item.name}</strong>
                  <span>{item.codeLabel}</span>
                </a>
              ))}
            </nav>
            <p className="eyebrow"><span /> Consulta pública e gratuita</p>
            <h1>{dataset.heading}</h1>
            <p className="consulta-lead">{dataset.lead}</p>
            <dl className="consulta-facts">
              <div>
                <dt>Campo da NFS-e</dt>
                <dd><code>{dataset.field}</code></dd>
              </div>
              <div>
                <dt>Fonte oficial</dt>
                <dd>
                  <a href={dataset.source.url} target="_blank" rel="noreferrer">{dataset.source.label}</a>
                </dd>
              </div>
              <div>
                <dt>Acesso</dt>
                <dd>Sem cadastro e sem login</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="consulta-tool-section">
          <div className="container">
            <ConsultaTable dataset={dataset} initialQuery={code} />
            <p className="consulta-note">{dataset.fieldNote}</p>
          </div>
        </section>

        <section className="consulta-usage">
          <div className="container consulta-usage-layout">
            <div>
              <p className="api-section-kicker">Como usar na emissão</p>
              <h2>Do código na tabela ao campo na API</h2>
              <p>
                Os códigos desta página são enviados exatamente como aparecem, em texto, dentro do payload da emissão.
                A validação da Invio devolve o campo e o motivo quando um código não é aceito, antes de qualquer
                transmissão para a SEFIN.
              </p>
              <a className="button button-secondary button-small" href="/api">
                Ver a documentação da API <Icon name="arrow" size={16} />
              </a>
            </div>
            <ApiCodeBlock label="Trecho do payload de emissão" code={usageExample} />
          </div>
        </section>

        <section className="consulta-related">
          <div className="container">
            <h2>Outras consultas gratuitas</h2>
            <div className="consulta-related-grid">
              {related.map((item) => (
                <a key={item.slug} href={`/consulta/${item.slug}`}>
                  <strong>{item.name}</strong>
                  <span>{item.codeLabel}</span>
                  <p>{item.lead}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="consulta-cta">
          <div className="container consulta-cta-inner">
            <div>
              <h2>Emitir a NFS-e depois de escolher o código</h2>
              <p>
                A Invio emite e monitora NFS-e Nacional por API, com validação prévia, webhooks assinados e
                acompanhamento das rejeições. A consulta acima continua livre para qualquer pessoa.
              </p>
            </div>
            <div className="consulta-cta-actions">
              <a className="button button-primary" href="/#montar-plano">
                Montar meu plano <Icon name="arrow" size={16} />
              </a>
              <a className="button button-light" href="/api">Documentação da API</a>
            </div>
          </div>
        </section>

        <p className="container consulta-disclaimer">
          Conteúdo informativo reproduzido das fontes oficiais citadas. A Invio não substitui a orientação do seu
          contador na escolha do enquadramento fiscal de cada serviço.
        </p>
      </main>
      <Footer />
    </>
  );
}
