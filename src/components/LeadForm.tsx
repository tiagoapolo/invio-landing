import { FormEvent, useState } from "react";
import { Icon } from "./Icon";

type LeadOrigin = "homepage" | "migracao_nuvem_fiscal";
type FormState = "idle" | "submitting" | "success" | "error";

export function LeadForm({ origin }: { origin: LeadOrigin }) {
  const [state, setState] = useState<FormState>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    if (payload.address) {
      setState("success");
      return;
    }

    delete payload.address;

    try {
      const response = await fetch(import.meta.env.VITE_LEADS_ENDPOINT || "/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, origin }),
      });

      if (!response.ok) throw new Error("Lead endpoint unavailable");

      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="form-success" role="status">
        <span><Icon name="check" size={24} /></span>
        <p className="eyebrow">Solicitação recebida</p>
        <h3>Vamos entender sua operação.</h3>
        <p>O time da Invio vai analisar as informações e entrar em contato para definir o próximo passo.</p>
        <button type="button" onClick={() => setState("idle")}>Enviar outra solicitação</button>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="honeypot" aria-hidden="true">
        <label>Não preencha<input name="address" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="field-grid">
        <label>
          Nome
          <input name="name" autoComplete="name" required placeholder="Seu nome" />
        </label>
        <label>
          E-mail corporativo
          <input name="email" type="email" autoComplete="email" required placeholder="voce@empresa.com" />
        </label>
        <label>
          Telefone / WhatsApp
          <input name="phone" type="tel" autoComplete="tel" required placeholder="(11) 99999-9999" />
        </label>
        <label>
          Empresa
          <input name="company" autoComplete="organization" required placeholder="Nome da empresa" />
        </label>
        <label>
          Site <span>(opcional)</span>
          <input name="companySite" type="url" inputMode="url" placeholder="https://" />
        </label>
        <label>
          Quantos CNPJs emitem?
          <select name="cnpjRange" required defaultValue="">
            <option value="" disabled>Selecione</option>
            <option value="1">1</option>
            <option value="2-5">2–5</option>
            <option value="6-20">6–20</option>
            <option value="21-100">21–100</option>
            <option value="100+">Mais de 100</option>
          </select>
        </label>
        <label>
          NFS-e por mês
          <select name="monthlyVolume" required defaultValue="">
            <option value="" disabled>Selecione</option>
            <option value="0-200">Até 200</option>
            <option value="201-1000">201–1.000</option>
            <option value="1001-5000">1.001–5.000</option>
            <option value="5001-20000">5.001–20.000</option>
            <option value="20000+">Mais de 20.000</option>
          </select>
        </label>
        <label>
          Solução atual
          <input name="currentSolution" required placeholder={origin === "migracao_nuvem_fiscal" ? "Ex.: Nuvem Fiscal" : "Fornecedor ou integração própria"} />
        </label>
        <label>
          Prazo desejado
          <select name="timeline" required defaultValue="">
            <option value="" disabled>Selecione</option>
            <option value="urgent">O quanto antes</option>
            <option value="30-days">Em até 30 dias</option>
            <option value="60-90-days">Em 60–90 dias</option>
            <option value="researching">Estou avaliando</option>
          </select>
        </label>
      </div>

      <label>
        Qual é a necessidade principal?
        <textarea name="mainNeed" rows={4} required placeholder="Conte brevemente como a emissão funciona hoje e o que precisa mudar." />
      </label>

      <details className="optional-fields">
        <summary>Adicionar contexto opcional</summary>
        <div className="field-grid optional-grid">
          <label>
            Cargo
            <input name="role" autoComplete="organization-title" />
          </label>
          <label>
            Gasto atual
            <input name="currentSpend" inputMode="decimal" placeholder="Faixa mensal aproximada" />
          </label>
        </div>
        <label>
          Detalhes adicionais
          <textarea name="additionalDetails" rows={3} placeholder="Endpoints críticos, webhooks, certificados ou outras informações úteis." />
        </label>
      </details>

      <label className="consent-field">
        <input name="contactConsent" type="checkbox" value="yes" required />
        <span>Autorizo o contato da Invio sobre esta solicitação. Nenhuma contratação acontece automaticamente.</span>
      </label>

      <button className="button button-primary form-submit" type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Enviando…" : origin === "migracao_nuvem_fiscal" ? "Receber plano de migração" : "Solicitar avaliação"}
        {state !== "submitting" && <Icon name="arrow" size={17} />}
      </button>

      {state === "error" && (
        <p className="form-error" role="alert">Não foi possível enviar agora. Revise os dados e tente novamente em instantes.</p>
      )}
    </form>
  );
}
