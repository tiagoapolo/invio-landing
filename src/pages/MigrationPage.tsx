import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Icon, type IconName } from "../components/Icon";
import { PlanBuilder } from "../components/PlanBuilder";

const migrationFaqs = [
  ["O Invio é afiliado à Nuvem Fiscal?", "Não. O Invio não possui afiliação com a Nuvem Fiscal. A marca é mencionada exclusivamente para contextualizar a migração entre soluções."],
  ["Como funciona a entrada por etapas?", "As avaliações começam em 31/07. O time analisa urgência, volume, quantidade de CNPJs e complexidade da integração para definir a ordem de atendimento. A janela de implantação é confirmada após o diagnóstico técnico."],
  ["Preciso alterar meu código?", "A avaliação técnica mapeia endpoints, payloads, autenticação, idempotência e webhooks usados hoje. A necessidade de alteração depende desse diagnóstico; não prometemos compatibilidade automática."],
  ["Posso testar antes da troca?", "Sim. O processo prevê configuração e homologação antes da validação para entrada em produção."],
  ["Como evitar notas duplicadas?", "A estratégia de virada considera idempotência, estados tratados pela aplicação e o ponto de corte entre os fornecedores. O plano é definido conforme o fluxo atual."],
  ["Como configurar os certificados?", "O diagnóstico identifica emitentes e certificados A1. Depois, cada CNPJ é configurado e validado no ambiente de homologação."],
  ["Posso migrar vários CNPJs?", "Sim. O programa considera operações com múltiplos emitentes e dimensiona o plano pela quantidade de CNPJs, volume e complexidade."],
  ["Quanto tempo leva a avaliação?", "O prazo depende da integração existente e da disponibilidade das informações técnicas. O Invio não promete uma duração fixa antes do diagnóstico."],
  ["Como funciona a condição comercial?", "O montador mostra uma estimativa mensal baseada no volume, na quantidade de CNPJs e na complexidade da integração. As condições finais são confirmadas antes da contratação."],
];

export function MigrationPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <div className="migration-source-bar">
        <span>Avaliações do Invio por etapas a partir de 31/07 • Prazo informado pela Nuvem Fiscal: 31 de julho de 2026</span>
        <a href="https://nuvemfiscal.com.br/" target="_blank" rel="noreferrer">Consultar fonte pública <Icon name="arrow" size={14} /></a>
      </div>

      <Header migration />

      <main id="conteudo">
        <section className="migration-hero">
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="container migration-hero-layout">
            <div className="migration-hero-copy">
              <a className="back-link" href="/"><span>←</span> Voltar para o Invio</a>
              <p className="eyebrow"><span /> Avaliações abertas em 31/07</p>
              <h1>Saindo da Nuvem Fiscal? Planeje sua migração de NFS-e com o <em>Invio.</em></h1>
              <p className="hero-subtitle">Migração assistida com entrada por etapas para SaaS, ERPs e plataformas que precisam preservar emitentes, integrações e fluxos de faturamento.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#montar-plano">Solicitar avaliação de migração <Icon name="arrow" size={17} /></a>
                <a className="button button-secondary" href="#processo">Ver como funciona</a>
              </div>
              <p className="hero-note"><Icon name="shield" size={15} /> As solicitações são priorizadas após o diagnóstico. Nenhuma troca acontece automaticamente.</p>
            </div>

            <div className="migration-map" aria-label="Representação das etapas de migração para o Invio">
              <div className="migration-map-head">
                <div><small>Plano da virada</small><strong>Mapeamento da integração</strong></div>
                <span>Entrada por etapas</span>
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
            <div className="context-date"><small>Início das avaliações</small><strong>31.07.2026</strong></div>
            <div>
              <h2>As avaliações começam em 31/07, com entrada em operação por etapas.</h2>
              <p>O Invio receberá os cenários de migração, fará a triagem conforme urgência e complexidade e confirmará cada janela depois do diagnóstico técnico. A Nuvem Fiscal informou o prazo de 31/07/2026 para o encerramento do serviço.</p>
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
              <p>Cada etapa reduz uma incerteza da troca. A ordem de atendimento e o cronograma são definidos depois de entender a integração — sem promessa de prazo genérico.</p>
              <a className="button button-light" href="#montar-plano">Solicitar avaliação <Icon name="arrow" size={16} /></a>
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

        <section className="section migration-offer-section" id="montar-plano">
          <div className="container">
            <div className="section-heading centered-heading plan-heading">
              <p className="eyebrow">Avaliação por etapas</p>
              <h2>Envie seu cenário para <em>avaliação.</em></h2>
              <p>As solicitações começam em 31/07. A priorização considera integração atual, CNPJs, volume, urgência e capacidade de onboarding.</p>
            </div>
            <PlanBuilder mode="migration" />
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

      </main>

      <Footer />
    </>
  );
}
