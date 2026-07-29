import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Icon, type IconName } from "../components/Icon";
import { LeadForm } from "../components/LeadForm";

const migrationFaqs = [
  ["O Invio é afiliado à Nuvem Fiscal?", "Não. O Invio não possui afiliação com a Nuvem Fiscal. A marca é mencionada exclusivamente para contextualizar a migração entre soluções."],
  ["Preciso alterar meu código?", "A avaliação técnica mapeia endpoints, payloads, autenticação, idempotência e webhooks usados hoje. A necessidade de alteração depende desse diagnóstico; não prometemos compatibilidade automática."],
  ["Posso testar antes da troca?", "Sim. O processo prevê configuração e homologação antes da validação para entrada em produção."],
  ["Como evitar notas duplicadas?", "A estratégia de virada considera idempotência, estados tratados pela aplicação e o ponto de corte entre os fornecedores. O plano é definido conforme o fluxo atual."],
  ["Como configurar os certificados?", "O diagnóstico identifica emitentes e certificados A1. Depois, cada CNPJ é configurado e validado no ambiente de homologação."],
  ["Posso migrar vários CNPJs?", "Sim. O programa considera operações com múltiplos emitentes e dimensiona o plano pela quantidade de CNPJs, volume e complexidade."],
  ["Quanto tempo leva a avaliação?", "O prazo depende da integração existente e da disponibilidade das informações técnicas. O Invio não promete uma duração fixa antes do diagnóstico."],
  ["Como funciona a condição comercial?", "Ela considera o volume atual, a quantidade de CNPJs e a complexidade da integração. As condições específicas são apresentadas após a avaliação, antes de qualquer contratação."],
];

export function MigrationPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <div className="migration-source-bar">
        <span>Prazo informado pela Nuvem Fiscal: 31 de julho de 2026</span>
        <a href="https://nuvemfiscal.com.br/" target="_blank" rel="noreferrer">Consultar fonte pública <Icon name="arrow" size={14} /></a>
      </div>

      <Header migration />

      <main id="conteudo">
        <section className="migration-hero">
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="container migration-hero-layout">
            <div className="migration-hero-copy">
              <a className="back-link" href="/"><span>←</span> Voltar para o Invio</a>
              <p className="eyebrow"><span /> Programa de migração assistida</p>
              <h1>Saindo da Nuvem Fiscal? Planeje sua migração de NFS-e com o <em>Invio.</em></h1>
              <p className="hero-subtitle">Migração assistida para SaaS, ERPs e plataformas que precisam manter emitentes, integrações e fluxos de faturamento funcionando.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contato">Receber plano de migração <Icon name="arrow" size={17} /></a>
                <a className="button button-secondary" href="#processo">Ver como funciona</a>
              </div>
              <p className="hero-note"><Icon name="shield" size={15} /> Diagnóstico antes da proposta. Nenhuma troca acontece automaticamente.</p>
            </div>

            <div className="migration-map" aria-label="Representação das etapas de migração para o Invio">
              <div className="migration-map-head">
                <div><small>Plano da virada</small><strong>Mapeamento da integração</strong></div>
                <span>Em avaliação</span>
              </div>
              <div className="map-progress"><i /><i /><i /><i /><i /></div>
              <div className="map-list">
                <div><span className="map-icon done"><Icon name="check" size={15} /></span><p><strong>Endpoints e payloads</strong><small>Recursos usados hoje</small></p><b>Mapear</b></div>
                <div><span className="map-icon"><Icon name="building" size={15} /></span><p><strong>Emitentes e certificados</strong><small>CNPJs e certificado A1</small></p><b>Configurar</b></div>
                <div><span className="map-icon"><Icon name="webhook" size={15} /></span><p><strong>Webhooks e eventos</strong><small>Fluxos ligados ao faturamento</small></p><b>Validar</b></div>
                <div><span className="map-icon"><Icon name="layers" size={15} /></span><p><strong>Homologação</strong><small>Cenários antes da produção</small></p><b>Testar</b></div>
              </div>
              <div className="map-footer"><Icon name="route" size={17} /><span>Estratégia de virada</span><small>definida após o diagnóstico</small></div>
            </div>
          </div>
        </section>

        <section className="migration-context">
          <div className="container migration-context-inner">
            <div className="context-date"><small>Data anunciada</small><strong>31.07.2026</strong></div>
            <div>
              <h2>Uma mudança com prazo concreto e impacto direto na operação.</h2>
              <p>A Nuvem Fiscal anunciou o encerramento do serviço em 31/07/2026. Para empresas que dependem da API, a troca exige mais do que apontar para outro endpoint: é preciso entender o fluxo atual, homologar os cenários críticos e planejar a virada.</p>
            </div>
            <a href="https://nuvemfiscal.com.br/" target="_blank" rel="noreferrer">Ver anúncio público <Icon name="arrow" size={15} /></a>
          </div>
        </section>

        <section className="section migration-risks-section">
          <div className="container">
            <div className="section-heading split-heading">
              <div><p className="eyebrow">O que precisa entrar no plano</p><h2>Migre o fluxo, <em>não apenas a chamada da API.</em></h2></div>
              <p>Uma virada segura começa pelo inventário do que sustenta sua emissão hoje.</p>
            </div>
            <div className="risk-grid">
              {[
                ["code" as IconName, "Endpoints atuais", "Chamadas, campos e respostas que sua aplicação realmente utiliza."],
                ["building" as IconName, "Emitentes e certificados", "CNPJs ativos, configurações tributárias e certificados cadastrados."],
                ["webhook" as IconName, "Webhooks no faturamento", "Eventos que liberam cobrança, conciliação ou atendimento."],
                ["refresh" as IconName, "Risco de duplicidade", "Idempotência e ponto de corte para não emitir a mesma nota duas vezes."],
                ["layers" as IconName, "Homologação", "Casos críticos que precisam ser testados antes da mudança."],
                ["users" as IconName, "Tempo da equipe", "Disponibilidade técnica para mapear, validar e acompanhar a entrada."],
              ].map(([icon, title, text], index) => (
                <article key={title}><span>0{index + 1}</span><Icon name={icon as IconName} size={22} /><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section migration-process-section" id="processo">
          <div className="container migration-process-layout">
            <div className="section-heading sticky-heading">
              <p className="eyebrow eyebrow-light">Processo de migração</p>
              <h2>Decisões técnicas antes da virada.</h2>
              <p>Cada etapa reduz uma incerteza da troca. O cronograma é definido depois de entender a integração — sem promessa de prazo genérico.</p>
              <a className="button button-light" href="#contato">Avaliar minha migração <Icon name="arrow" size={16} /></a>
            </div>
            <ol className="process-timeline">
              {[
                ["Diagnóstico técnico", "Levantamos endpoints, autenticação, payloads, estados e recursos usados na operação atual."],
                ["Mapeamento da integração", "Relacionamos cada dependência ao fluxo do Invio e identificamos ajustes necessários."],
                ["Configuração e homologação", "Preparamos emitentes, certificados e cenários para validar o comportamento esperado."],
                ["Validação antes da troca", "Revisamos webhooks, erros tratados, idempotência e a estratégia para evitar duplicidade."],
                ["Acompanhamento em produção", "Apoiamos a entrada em operação e o monitoramento das primeiras emissões."],
              ].map(([title, text], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section migration-offer-section">
          <div className="container migration-offer-card">
            <div>
              <p className="eyebrow">Condição de migração</p>
              <h2>Condições especiais para empresas em migração.</h2>
              <p>O programa considera o volume atual, a quantidade de CNPJs e a complexidade da integração para oferecer uma condição comercial adequada à operação.</p>
              <a className="button button-primary" href="#contato">Calcular minha condição <Icon name="arrow" size={16} /></a>
            </div>
            <div className="offer-includes">
              <span>O programa pode incluir</span>
              {[
                ["Diagnóstico técnico", "Inventário do fluxo existente"],
                ["Homologação", "Validação antes da produção"],
                ["Migração assistida", "Plano adequado à integração"],
                ["Entrada em produção", "Acompanhamento da virada"],
                ["Condição comercial", "Baseada na operação atual"],
              ].map(([title, text]) => (
                <div key={title}><Icon name="check" size={16} /><p><strong>{title}</strong><small>{text}</small></p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section migration-faq-section">
          <div className="container faq-layout">
            <div className="section-heading">
              <p className="eyebrow">Perguntas sobre a migração</p>
              <h2>Clareza antes de começar.</h2>
              <p>A avaliação existe para responder o que muda no seu caso, sem presumir compatibilidade ou cronograma.</p>
            </div>
            <div className="faq-list">
              {migrationFaqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<span>+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section migration-contact" id="contato">
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">Comece pelo diagnóstico</p>
              <h2>Receba um plano de migração para a sua operação.</h2>
              <p>Compartilhe volume, quantidade de CNPJs e o contexto da integração. O time técnico usa essas informações para preparar a primeira conversa.</p>
              <div className="contact-points">
                <span><Icon name="check" size={16} /> Diagnóstico do fluxo atual</span>
                <span><Icon name="check" size={16} /> Mapeamento das dependências</span>
                <span><Icon name="check" size={16} /> Condição comercial após a avaliação</span>
              </div>
              <p className="legal-note"><Icon name="shield" size={16} /> O Invio não possui afiliação com a Nuvem Fiscal. A marca é mencionada exclusivamente para contextualizar a migração entre soluções.</p>
            </div>
            <LeadForm origin="migracao_nuvem_fiscal" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
