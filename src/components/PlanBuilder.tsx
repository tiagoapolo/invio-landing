import { FormEvent, useState } from "react";
import { Icon, type IconName } from "./Icon";

type PlanBuilderMode = "standard" | "migration";
type StepKey = "operation" | "cnpjs" | "volume" | "support" | "integration" | "timeline";
type LeadState = "idle" | "submitting" | "success" | "error";

type Option = {
  value: string;
  label: string;
  description: string;
  icon: IconName;
};

type Step = {
  key: StepKey;
  question: string;
  hint: string;
  options: Option[];
};

const cnpjOptions: Option[] = [
  { value: "1", label: "1 CNPJ", description: "Uma operação emitente", icon: "building" },
  { value: "2-5", label: "2–5 CNPJs", description: "Operação começando a escalar", icon: "building" },
  { value: "6-20", label: "6–20 CNPJs", description: "Múltiplos emitentes ativos", icon: "layers" },
  { value: "21-100", label: "21–100 CNPJs", description: "Operação de plataforma", icon: "layers" },
  { value: "100+", label: "Mais de 100", description: "Escala personalizada", icon: "users" },
];

const volumeOptions: Option[] = [
  { value: "0-200", label: "Até 200", description: "NFS-e por mês", icon: "document" },
  { value: "201-1000", label: "201–1.000", description: "NFS-e por mês", icon: "document" },
  { value: "1001-5000", label: "1.001–5.000", description: "NFS-e por mês", icon: "pulse" },
  { value: "5001-20000", label: "5.001–20.000", description: "NFS-e por mês", icon: "pulse" },
  { value: "20000+", label: "Mais de 20.000", description: "NFS-e por mês", icon: "layers" },
];

const standardSteps: Step[] = [
  {
    key: "operation",
    question: "Qual produto você opera?",
    hint: "Isso ajuda a entender como a emissão entra no seu fluxo.",
    options: [
      { value: "saas", label: "SaaS B2B", description: "Emissão conectada ao billing", icon: "code" },
      { value: "erp", label: "ERP ou software house", description: "Fiscal dentro do produto", icon: "building" },
      { value: "platform", label: "Plataforma de serviços", description: "Múltiplos prestadores", icon: "users" },
      { value: "finance", label: "Billing ou financeiro", description: "Cobrança e conciliação", icon: "pulse" },
    ],
  },
  { key: "cnpjs", question: "Quantos CNPJs estarão ativos?", hint: "Considere os emitentes que usarão o Invio no mês.", options: cnpjOptions },
  { key: "volume", question: "Qual é o volume mensal?", hint: "Uma estimativa já é suficiente para a recomendação inicial.", options: volumeOptions },
  {
    key: "support",
    question: "Quanto apoio sua equipe precisa?",
    hint: "O nível de acompanhamento também compõe a proposta.",
    options: [
      { value: "autonomous", label: "Integração autônoma", description: "Time técnico conduz a implementação", icon: "code" },
      { value: "assisted", label: "Onboarding assistido", description: "Apoio para homologar o primeiro fluxo", icon: "route" },
      { value: "complex", label: "Operação complexa", description: "Mais cenários e acompanhamento", icon: "shield" },
    ],
  },
];

const migrationSteps: Step[] = [
  {
    key: "integration",
    question: "O que sua integração usa hoje?",
    hint: "Selecione o cenário mais próximo da sua operação atual.",
    options: [
      { value: "emission", label: "Emissão e consulta", description: "Fluxo principal de NFS-e", icon: "document" },
      { value: "webhooks", label: "Emissão + webhooks", description: "Eventos ligados ao faturamento", icon: "webhook" },
      { value: "complex", label: "Múltiplos fluxos", description: "Webhooks, consultas e regras próprias", icon: "route" },
    ],
  },
  { key: "cnpjs", question: "Quantos CNPJs precisam migrar?", hint: "Considere todos os emitentes em uso atualmente.", options: cnpjOptions },
  { key: "volume", question: "Qual é o volume que será migrado?", hint: "Use a média mensal de NFS-e da operação atual.", options: volumeOptions },
  {
    key: "timeline",
    question: "Quando a operação precisa estar pronta?",
    hint: "O prazo orienta a priorização, mas só é confirmado após o diagnóstico.",
    options: [
      { value: "urgent", label: "O quanto antes", description: "Prioridade imediata", icon: "pulse" },
      { value: "30-days", label: "Em até 30 dias", description: "Janela já definida", icon: "route" },
      { value: "60-90-days", label: "Em 60–90 dias", description: "Migração planejada", icon: "layers" },
      { value: "researching", label: "Estou avaliando", description: "Primeiro entender o esforço", icon: "eye" },
    ],
  },
];

const cnpjRank: Record<string, number> = { "1": 0, "2-5": 1, "6-20": 2, "21-100": 3, "100+": 4 };
const volumeRank: Record<string, number> = { "0-200": 0, "201-1000": 1, "1001-5000": 2, "5001-20000": 3, "20000+": 4 };

const standardPlans = [
  { name: "Essencial", monthlyPrice: 149, migrationPrice: 249, description: "Para uma operação enxuta que quer integrar a emissão e ganhar visibilidade sem manter infraestrutura fiscal própria." },
  { name: "Crescimento", monthlyPrice: 349, migrationPrice: 449, description: "Para operações ganhando volume ou adicionando emitentes, com espaço para crescer sem refazer a integração." },
  { name: "Plataforma", monthlyPrice: 699, migrationPrice: 799, description: "Para produtos com múltiplos CNPJs e volume relevante, onde monitoramento e operação centralizada são críticos." },
  { name: "Plataforma", monthlyPrice: 1199, migrationPrice: 1299, description: "Para produtos com múltiplos CNPJs e volume relevante, onde monitoramento e operação centralizada são críticos." },
  { name: "Alto Volume", monthlyPrice: 2499, migrationPrice: 2499, description: "Para operações de grande escala que precisam de dimensionamento e acompanhamento personalizados." },
];

const priceFormatter = new Intl.NumberFormat("pt-BR");

function selectedLabel(steps: Step[], answers: Partial<Record<StepKey, string>>, key: StepKey) {
  const step = steps.find((item) => item.key === key);
  return step?.options.find((option) => option.value === answers[key])?.label ?? "Não informado";
}

export function PlanBuilder({ mode = "standard" }: { mode?: PlanBuilderMode }) {
  const steps = mode === "migration" ? migrationSteps : standardSteps;
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<StepKey, string>>>({});
  const [leadState, setLeadState] = useState<LeadState>("idle");
  const showingResult = stepIndex === steps.length;
  const currentStep = steps[stepIndex];
  const selected = currentStep ? answers[currentStep.key] : undefined;
  const scale = Math.max(cnpjRank[answers.cnpjs ?? "1"] ?? 0, volumeRank[answers.volume ?? "0-200"] ?? 0);
  const plan = standardPlans[scale];
  const complexityAdjustment = mode === "migration"
    ? answers.integration === "complex" ? 200 : answers.integration === "webhooks" ? 100 : 0
    : answers.support === "complex" ? 300 : answers.support === "assisted" ? 100 : 0;
  const monthlyPrice = (mode === "migration" ? plan.migrationPrice : plan.monthlyPrice) + complexityAdjustment;

  const restart = () => {
    setAnswers({});
    setStepIndex(0);
    setLeadState("idle");
  };

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLeadState("submitting");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    if (payload.website) {
      setLeadState("success");
      return;
    }

    delete payload.website;

    try {
      const response = await fetch(import.meta.env.VITE_LEADS_ENDPOINT || "/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...payload,
          origin: mode === "migration" ? "migracao_nuvem_fiscal" : "homepage",
          leadType: "plan_builder",
          recommendedPlan: mode === "migration" ? "Migração Assistida" : `Invio ${plan.name}`,
          monthlyPrice,
          answers,
        }),
      });

      if (!response.ok) throw new Error("Lead endpoint unavailable");

      form.reset();
      setLeadState("success");
    } catch {
      setLeadState("error");
    }
  }

  return (
    <div className={`plan-builder ${mode === "migration" ? "plan-builder-migration" : ""}`}>
      <aside className="plan-builder-summary">
        {mode === "migration" ? (
          <>
            <span className="special-plan-badge">Plano especial</span>
            <p className="eyebrow eyebrow-light">Para quem está migrando</p>
            <h3>Migração Assistida</h3>
            <p>Um plano para mapear a integração atual, homologar os fluxos críticos e acompanhar a entrada em produção.</p>
            <ul>
              <li><Icon name="check" size={15} /> Diagnóstico técnico</li>
              <li><Icon name="check" size={15} /> Configuração e homologação</li>
              <li><Icon name="check" size={15} /> Plano de virada</li>
              <li><Icon name="check" size={15} /> Acompanhamento em produção</li>
            </ul>
            <div className="special-condition"><small>Condição comercial especial</small><strong>Calculada sobre sua operação atual</strong></div>
          </>
        ) : (
          <>
            <p className="eyebrow eyebrow-light">Como calculamos</p>
            <h3>Seu plano nasce da sua operação.</h3>
            <p>Responda quatro perguntas. A recomendação considera as mesmas dimensões usadas na proposta comercial.</p>
            <ol>
              <li><span>01</span> Perfil do produto</li>
              <li><span>02</span> CNPJs ativos</li>
              <li><span>03</span> Volume mensal</li>
              <li><span>04</span> Nível de suporte</li>
            </ol>
            <small>Nenhuma contratação acontece automaticamente.</small>
          </>
        )}
      </aside>

      <div className="plan-wizard" aria-live="polite">
        {!showingResult && currentStep ? (
          <>
            <div className="wizard-progress">
              <div><span>Etapa {stepIndex + 1} de {steps.length}</span><b>{Math.round(((stepIndex + 1) / steps.length) * 100)}%</b></div>
              <div className="progress-track" aria-hidden="true"><i style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }} /></div>
            </div>
            <div className="wizard-question">
              <h3>{currentStep.question}</h3>
              <p>{currentStep.hint}</p>
            </div>
            <div className={`wizard-options ${currentStep.options.length > 4 ? "wizard-options-compact" : ""}`}>
              {currentStep.options.map((option) => (
                <button
                  className={selected === option.value ? "is-selected" : ""}
                  type="button"
                  aria-pressed={selected === option.value}
                  key={option.value}
                  onClick={() => {
                    setAnswers((current) => ({ ...current, [currentStep.key]: option.value }));
                    setLeadState("idle");
                  }}
                >
                  <span className="wizard-option-icon"><Icon name={option.icon} size={19} /></span>
                  <span><strong>{option.label}</strong><small>{option.description}</small></span>
                  <i className="option-check"><Icon name="check" size={13} /></i>
                </button>
              ))}
            </div>
            <div className="wizard-actions">
              <button className="wizard-back" type="button" disabled={stepIndex === 0} onClick={() => setStepIndex((current) => current - 1)}>← Voltar</button>
              <button className="button button-primary" type="button" disabled={!selected} onClick={() => setStepIndex((current) => current + 1)}>
                {stepIndex === steps.length - 1 ? "Ver recomendação" : "Continuar"} <Icon name="arrow" size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="plan-result" role="status">
            <div className="result-topline"><span><Icon name="check" size={16} /> Recomendação pronta</span><button type="button" onClick={restart}>Refazer</button></div>
            <p className="eyebrow">{mode === "migration" ? "Plano especial recomendado" : "Plano recomendado"}</p>
            <h3>{mode === "migration" ? "Migração Assistida" : `Invio ${plan.name}`}</h3>
            <p className="result-description">{mode === "migration" ? "Seu cenário pede uma migração dimensionada para preservar emitentes, eventos e o fluxo de faturamento durante a troca." : plan.description}</p>
            <div className="result-price">
              <span>Valor estimado para o seu cenário</span>
              <strong><small>R$</small> {priceFormatter.format(monthlyPrice)} <small>/mês</small></strong>
              <p>{mode === "migration" ? `Perfil ${plan.name} com migração assistida incluída.` : "Calculado a partir das respostas acima."}</p>
            </div>
            <div className="result-scale">
              <span><small>CNPJs</small><strong>{selectedLabel(steps, answers, "cnpjs")}</strong></span>
              <span><small>Volume mensal</small><strong>{selectedLabel(steps, answers, "volume")}</strong></span>
            </div>
            <div className="result-includes">
              <span>O plano considera</span>
              {(mode === "migration"
                ? ["Diagnóstico da integração atual", "Homologação dos cenários críticos", "Estratégia para evitar duplicidade", "Apoio na entrada em produção"]
                : ["API de emissão e consulta", "Webhooks e monitoramento", "Múltiplos emitentes", answers.support === "autonomous" ? "Integração conduzida pelo seu time" : "Onboarding e suporte na integração"]
              ).map((item) => <p key={item}><Icon name="check" size={14} /> {item}</p>)}
            </div>
            {leadState === "success" ? (
              <div className="plan-lead-success" role="status">
                <span><Icon name="check" size={16} /></span>
                <p><strong>Contato recebido.</strong><small>O time da Invio entrará em contato sobre este plano.</small></p>
              </div>
            ) : (
              <form className="plan-lead-form" onSubmit={submitLead}>
                <div className="honeypot" aria-hidden="true">
                  <label>Não preencha<input name="website" tabIndex={-1} autoComplete="off" /></label>
                </div>
                <div className="plan-lead-heading">
                  <strong>Quer contratar este plano?</strong>
                  <span>Deixe seus contatos e leve esta estimativa para o time da Invio.</span>
                </div>
                <div className="plan-lead-fields">
                  <label>E-mail corporativo<input name="email" type="email" autoComplete="email" required placeholder="voce@empresa.com" /></label>
                  <label>Telefone / WhatsApp<input name="phone" type="tel" autoComplete="tel" required placeholder="(11) 99999-9999" /></label>
                </div>
                <label className="plan-consent">
                  <input name="contactConsent" type="checkbox" value="yes" required />
                  <span>Autorizo o contato da Invio sobre este plano.</span>
                </label>
                <button className="button button-primary" type="submit" disabled={leadState === "submitting"}>
                  {leadState === "submitting" ? "Enviando…" : "Quero contratar este plano"}
                  {leadState !== "submitting" && <Icon name="arrow" size={16} />}
                </button>
                {leadState === "error" && <p className="plan-lead-error" role="alert">Não foi possível enviar agora. Tente novamente em instantes.</p>}
              </form>
            )}
            <div className="result-actions">
              <button type="button" onClick={() => {
                setLeadState("idle");
                setStepIndex(steps.length - 1);
              }}>Ajustar respostas</button>
            </div>
            <small className="result-note">Estimativa inicial. Limites e condições finais são confirmados pelo time antes da contratação.</small>
          </div>
        )}
      </div>
    </div>
  );
}
