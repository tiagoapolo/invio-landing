import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Icon, type IconName } from "../components/Icon";
import { LeadForm } from "../components/LeadForm";
import { PlanBuilder } from "../components/PlanBuilder";

const capabilities: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: "code", title: "API de emissão", text: "Uma integração para criar e consultar emissões de NFS-e." },
  { icon: "webhook", title: "Webhooks", text: "Eventos de autorização, rejeição e erro conectados ao seu fluxo." },
  { icon: "building", title: "Múltiplos emitentes", text: "CNPJs, perfis de serviço e certificados em uma operação centralizada." },
  { icon: "eye", title: "Monitoramento", text: "Status, eventos, consultas e XML acessíveis pelo painel operacional." },
  { icon: "shield", title: "Certificado A1", text: "Cadastro e acompanhamento do certificado usado por cada emitente." },
  { icon: "layers", title: "Dois ambientes", text: "Homologação e produção separados para validar o fluxo antes da virada." },
];

const audiences = [
  ["SaaS B2B", "Emissão conectada ao billing sem transformar a camada fiscal no centro do seu produto."],
  ["ERPs e software houses", "Uma base única para atender operações de serviços com diferentes emitentes."],
  ["Plataformas de serviços", "Acompanhe múltiplos prestadores e o estado de cada nota em um só fluxo."],
  ["Billing e financeiro", "Leve os eventos de emissão de volta para cobrança, conciliação e suporte."],
];

const faqs = [
  ["O Invio atende quais documentos?", "O foco do Invio é NFS-e Nacional. Não apresentamos o produto como uma solução genérica para todos os documentos fiscais."],
  ["Qual certificado é necessário?", "A operação utiliza certificado digital A1 no formato .pfx, associado ao emitente no painel."],
  ["Existe ambiente de homologação?", "Sim. O produto trabalha com ambientes de homologação (restrita) e produção para que o fluxo seja validado antes da entrada em operação."],
  ["Posso cadastrar vários CNPJs?", "Sim. O Invio foi desenhado para operações com múltiplos emitentes, perfis de serviço e certificados."],
  ["Como recebo os eventos?", "Por webhooks configuráveis para eventos de emissão autorizada, rejeitada ou com erro, além do acompanhamento pelo painel."],
  ["O que acontece em uma rejeição?", "A emissão fica registrada com seu status, erros e eventos para diagnóstico e ação do time responsável."],
  ["Como o valor é calculado?", "A proposta considera CNPJs ativos, volume mensal de NFS-e e o nível de suporte ou complexidade da integração."],
  ["Como os webhooks são protegidos?", "As entregas possuem assinatura no header X-Invio-Signature. Os detalhes de validação serão fornecidos durante a integração."],
];

export function HomePage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <div className="announcement">
        <a href="/migrar-da-nuvem-fiscal">
          <span>Utilizava a Nuvem Fiscal?</span>
          Avaliações de migração por etapas a partir de 31/07
          <Icon name="arrow" size={15} />
        </a>
      </div>

      <Header />

      <main id="conteudo">
        <section className="hero home-hero">
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy reveal">
              <p className="eyebrow"><span /> Infraestrutura de NFS-e Nacional</p>
              <h1>Integre uma vez. Emita e monitore <em>NFS-e Nacional</em> em escala.</h1>
              <p className="hero-subtitle">API, webhooks e acompanhamento operacional para SaaS, ERPs e plataformas que precisam emitir notas sem manter uma infraestrutura fiscal própria.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#montar-plano">Montar meu plano <Icon name="arrow" size={17} /></a>
                <a className="button button-secondary" href="#como-funciona">Entender a integração</a>
              </div>
              <div className="hero-facts" aria-label="Capacidades principais">
                <span><Icon name="check" size={15} /> Homologação</span>
                <span><Icon name="check" size={15} /> Múltiplos emitentes</span>
                <span><Icon name="check" size={15} /> Webhooks</span>
              </div>
            </div>

            <div className="product-visual" aria-label="Representação do painel operacional da Invio">
              <div className="visual-glow" aria-hidden="true" />
              <div className="app-window">
                <div className="app-topbar">
                  <div className="app-logo"><span>i</span> invio</div>
                  <div className="environment-dot"><i /> Produção</div>
                </div>
                <div className="app-body">
                  <aside aria-hidden="true">
                    <span className="active" />
                    <span />
                    <span />
                    <span />
                  </aside>
                  <div className="emissions-panel">
                    <div className="panel-title-row">
                      <div><small>Operação</small><strong>Emissões</strong></div>
                      <span className="outline-control">Todos os emitentes</span>
                    </div>
                    <div className="status-cards">
                      <div><span className="status-symbol authorized"><Icon name="check" size={14} /></span><small>Autorizadas</small><b>Operação ativa</b></div>
                      <div><span className="status-symbol processing"><Icon name="refresh" size={14} /></span><small>Processando</small><b>Em acompanhamento</b></div>
                    </div>
                    <div className="emission-table">
                      <div className="table-head"><span>Emissão</span><span>Emitente</span><span>Status</span></div>
                      <div className="table-row"><span><i className="doc-icon" /> #INV-0942</span><span>Clínica Aurora</span><span className="status-label ok">Autorizada</span></div>
                      <div className="table-row"><span><i className="doc-icon" /> #INV-0941</span><span>Plataforma Norte</span><span className="status-label running">Enviada</span></div>
                      <div className="table-row"><span><i className="doc-icon" /> #INV-0940</span><span>Gestão Ativa</span><span className="status-label ok">Autorizada</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="webhook-toast">
                <span><Icon name="webhook" size={17} /></span>
                <div><small>Webhook entregue</small><strong>emission.authorized</strong></div>
                <i>200</i>
              </div>
            </div>
          </div>
        </section>

        <section className="capability-strip" aria-label="Recursos da plataforma">
          <div className="container capability-strip-inner">
            <span>Uma operação conectada</span>
            <div>
              <span>API</span><i />
              <span>NFS-e Nacional</span><i />
              <span>Webhooks</span><i />
              <span>Dashboard</span>
            </div>
          </div>
        </section>

        <section className="section problem-section">
          <div className="container problem-layout">
            <div className="section-heading sticky-heading">
              <p className="eyebrow">O custo invisível da integração própria</p>
              <h2>Sua equipe deveria construir o produto, <em>não manter integrações fiscais.</em></h2>
              <p>Mudanças no padrão, certificados, filas, consultas e rejeições viram trabalho recorrente — e disputam espaço com o que realmente diferencia seu negócio.</p>
            </div>
            <div className="pain-list">
              {[
                ["01", "Mudanças fiscais", "Adequações do padrão entram no roadmap sem gerar valor direto para o cliente."],
                ["02", "Operação fragmentada", "Logs, filas e consultas ficam espalhados entre serviços e exigem investigação manual."],
                ["03", "Faturamento sob risco", "Uma rejeição sem visibilidade pode atrasar cobrança, fechamento e suporte."],
                ["04", "Certificados e emitentes", "Escalar CNPJs multiplica configurações, vencimentos e pontos de falha."],
              ].map(([number, title, text]) => (
                <article className="pain-item" key={number}>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <Icon name="arrow" size={19} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section product-section" id="produto">
          <div className="container">
            <div className="section-heading centered-heading">
              <p className="eyebrow">A camada fiscal da sua operação</p>
              <h2>Da primeira requisição ao XML autorizado, <em>tudo no mesmo fluxo.</em></h2>
              <p>O Invio concentra a emissão e a operação da NFS-e em uma API e um painel de acompanhamento.</p>
            </div>
            <div className="feature-grid">
              {capabilities.map((feature, index) => (
                <article className={`feature-card feature-${index + 1}`} key={feature.title}>
                  <div className="feature-icon"><Icon name={feature.icon} size={22} /></div>
                  <span>0{index + 1}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section flow-section" id="como-funciona">
          <div className="container">
            <div className="section-heading split-heading">
              <div><p className="eyebrow eyebrow-light">Como funciona</p><h2>Três passos para tirar a infraestrutura fiscal do caminho.</h2></div>
              <p>Configure a operação, conecte seu produto e acompanhe o ciclo completo de cada emissão.</p>
            </div>
            <div className="steps-grid">
              {[
                ["01", "Configure os emitentes", "Cadastre dados fiscais, perfis de serviço e o certificado A1 de cada CNPJ.", "building" as IconName],
                ["02", "Integre a API", "Crie emissões pelo seu produto e use webhooks para receber as mudanças de estado.", "code" as IconName],
                ["03", "Acompanhe cada emissão", "Monitore eventos, diagnostique rejeições e acesse o XML no painel.", "pulse" as IconName],
              ].map(([number, title, text, icon]) => (
                <article className="step-card" key={number}>
                  <div className="step-top"><span>{number}</span><Icon name={icon as IconName} size={24} /></div>
                  <h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
            <div className="architecture-flow" aria-label="Seu produto envia dados para a API Invio, que se conecta à NFS-e Nacional e retorna eventos pelo dashboard e webhooks">
              <div className="arch-node"><span>Seu produto</span><small>Billing · ERP · SaaS</small></div>
              <div className="arch-connector"><span /><Icon name="arrow" size={19} /></div>
              <div className="arch-node arch-primary"><span><i>i</i> API Invio</span><small>Processamento gerenciado</small></div>
              <div className="arch-connector"><span /><Icon name="arrow" size={19} /></div>
              <div className="arch-node"><span>NFS-e Nacional</span><small>Ambiente nacional</small></div>
              <div className="arch-return"><i /><span><Icon name="webhook" size={15} /> Webhooks + Dashboard</span><i /></div>
            </div>
          </div>
        </section>

        <section className="section audience-section" id="para-quem">
          <div className="container audience-layout">
            <div className="section-heading">
              <p className="eyebrow">Para operações digitais</p>
              <h2>Infraestrutura fiscal para quem precisa <em>embutir emissão no produto.</em></h2>
              <p>O Invio é direcionado a empresas que conectam a emissão ao billing, pagamento ou fechamento financeiro.</p>
              <a className="text-link" href="/remote">NFS-e para quem trabalha para o exterior <Icon name="arrow" size={16} /></a>
            </div>
            <div className="audience-cards">
              {audiences.map(([title, text], index) => (
                <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section comparison-section">
          <div className="container">
            <div className="section-heading compact-heading">
              <p className="eyebrow">Construir ou integrar</p>
              <h2>Menos manutenção fiscal. <em>Mais foco no seu produto.</em></h2>
            </div>
            <div className="comparison-table" role="table" aria-label="Comparação entre integração própria e Invio">
              <div className="comparison-row comparison-head" role="row"><span role="columnheader">Integração própria</span><span role="columnheader">Com o Invio</span></div>
              {[
                ["Manutenção fiscal contínua", "API centralizada"],
                ["Logs dispersos", "Monitoramento operacional"],
                ["Filas e consultas próprias", "Processamento gerenciado"],
                ["Certificados distribuídos", "Gestão concentrada"],
                ["Mudanças consumindo engenharia", "Atualização concentrada no produto"],
              ].map(([own, invio]) => (
                <div className="comparison-row" role="row" key={own}>
                  <span role="cell"><i>×</i>{own}</span>
                  <span role="cell"><i><Icon name="check" size={15} /></i>{invio}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section developer-section">
          <div className="container developer-layout">
            <div className="developer-copy">
              <p className="eyebrow eyebrow-light">Experiência do desenvolvedor</p>
              <h2>Uma integração clara para uma operação que não é simples.</h2>
              <p>Crie emissões, acompanhe os estados e conecte os eventos ao seu fluxo de faturamento.</p>
              <ul>
                <li><Icon name="check" size={16} /> Idempotency-Key disponível na criação</li>
                <li><Icon name="check" size={16} /> Estados de emissão rastreáveis</li>
                <li><Icon name="check" size={16} /> Webhooks assinados</li>
                <li><Icon name="check" size={16} /> Consulta e download de XML</li>
              </ul>
            </div>
            <div className="code-window">
              <div className="code-bar"><span><i /><i /><i /></span><b>payload-emissao.json</b><small>API v1</small></div>
              <pre aria-label="Exemplo de payload de emissão"><code><span className="code-muted">POST</span> <span className="code-blue">/v1/emissions</span>{`\n`}<span className="code-muted">Idempotency-Key:</span> billing_123{`\n\n`}{`{`}{`\n`}  <span className="code-violet">"emitterId"</span>: <span className="code-green">"emt_01"</span>,{`\n`}  <span className="code-violet">"serviceProfileId"</span>: <span className="code-green">"srv_01"</span>,{`\n`}  <span className="code-violet">"vServ"</span>: <span className="code-green">"1290.00"</span>,{`\n`}  <span className="code-violet">"dCompet"</span>: <span className="code-green">"2026-07-01"</span>,{`\n`}  <span className="code-violet">"xDescServ"</span>: <span className="code-green">"Licença mensal"</span>{`\n`}{`}`}</code></pre>
              <div className="code-footer"><span><i /> emission.authorized</span><small>entrega via webhook</small></div>
            </div>
          </div>
        </section>

        <section className="section operations-section" id="seguranca">
          <div className="container">
            <div className="section-heading split-heading">
              <div><p className="eyebrow">Segurança e operação</p><h2>Controle para desenvolver. <em>Visibilidade para operar.</em></h2></div>
              <p>Recursos confirmados no produto para separar ambientes, controlar o acesso e acompanhar cada etapa da emissão.</p>
            </div>
            <div className="operations-grid">
              {[
                ["key" as IconName, "API keys", "Criação e revogação de chaves pelo painel."],
                ["webhook" as IconName, "Webhooks assinados", "Assinatura disponível no header de cada entrega."],
                ["layers" as IconName, "Homologação e produção", "Ambientes separados para testar antes da operação real."],
                ["eye" as IconName, "Eventos e rastreabilidade", "Timeline, erros e estados reunidos por emissão."],
              ].map(([icon, title, text]) => (
                <article key={title}><Icon name={icon as IconName} size={23} /><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section commercial-section" id="montar-plano">
          <div className="container">
            <div className="section-heading centered-heading plan-heading">
              <p className="eyebrow">Montador de plano</p>
              <h2>Descubra qual plano combina com <em>sua operação.</em></h2>
              <p>Responda quatro perguntas para receber uma recomendação inicial. Sem tabela genérica e sem compromisso.</p>
            </div>
            <PlanBuilder />
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div className="section-heading">
              <p className="eyebrow">Perguntas frequentes</p>
              <h2>O que você precisa saber antes de integrar.</h2>
              <p>Não encontrou sua dúvida? Conte seu cenário no formulário e o time avalia com você.</p>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<span>+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contato">
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">Próximo passo</p>
              <h2>Tire a infraestrutura fiscal do roadmap da sua equipe.</h2>
              <p>Conte como sua operação funciona e receba uma avaliação do melhor caminho de integração.</p>
              <div className="contact-points">
                <span><Icon name="check" size={16} /> Avaliação da operação atual</span>
                <span><Icon name="check" size={16} /> Homologação antes da produção</span>
                <span><Icon name="check" size={16} /> Proposta adequada ao volume</span>
              </div>
            </div>
            <LeadForm origin="homepage" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
