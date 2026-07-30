import type { ReactNode } from "react";
import { trackMarketingCta } from "../analytics";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Icon, type IconName } from "../components/Icon";

const appUrl = "https://app.useinvio.com";

const benefits: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: "check", title: "Configure uma vez", text: "Cadastre seu emitente, certificado A1 e perfil de serviço para não recomeçar do zero a cada nota." },
  { icon: "document", title: "Emita com mais simplicidade", text: "Centralize a emissão das suas NFS-e em uma interface feita para operações recorrentes." },
  { icon: "eye", title: "Acompanhe tudo", text: "Consulte o status das emissões, identifique rejeições e baixe seus XMLs em um único painel." },
];

const steps: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: "building", title: "Cadastre seu emitente", text: "Informe os dados do CNPJ e configure seu perfil de serviço." },
  { icon: "key", title: "Adicione o certificado A1", text: "O certificado digital A1 é necessário para assinar e emitir as notas." },
  { icon: "document", title: "Emita e acompanhe", text: "Crie suas NFS-e e acompanhe cada etapa diretamente no painel." },
];

const freeFeatures = [
  "Até 2 NFS-e por mês",
  "1 emitente",
  "Painel de acompanhamento",
  "Histórico de emissões",
  "Download do XML",
  "Visualização de rejeições",
];

const professions = [
  "Contractors",
  "Desenvolvedores",
  "Designers",
  "Consultores",
  "Profissionais de produto",
  "Profissionais de marketing",
  "Prestadores de serviços digitais",
];

const transparency = [
  "O plano grátis permite emitir até 2 notas por mês.",
  "É possível cadastrar apenas 1 emitente no plano grátis.",
  "É necessário possuir um certificado digital A1 válido.",
  "A Invio não recebe pagamentos nem realiza operações de câmbio.",
  "A Invio não substitui sua contabilidade.",
  "A configuração tributária deve seguir a orientação do seu contador.",
];

const faqs = [
  ["O plano grátis é realmente gratuito?", "Sim. Ele permite emitir até 2 NFS-e por mês com 1 emitente."],
  ["Preciso de certificado digital?", "Sim. É necessário possuir um certificado digital A1 válido para realizar as emissões."],
  ["O que é um emitente?", "É o CNPJ responsável pela emissão da nota fiscal. O plano grátis permite cadastrar 1 emitente."],
  ["A Invio recebe meus pagamentos em dólar?", "Não. A Invio cuida da emissão e do acompanhamento da NFS-e. O recebimento e o câmbio continuam sendo realizados pelo serviço financeiro escolhido por você."],
  ["A Invio substitui meu contador?", "Não. A Invio facilita a emissão, mas as decisões tributárias devem ser validadas com sua contabilidade."],
  ["Posso emitir para clientes estrangeiros?", "A plataforma permite configurar operações relacionadas à prestação de serviços ao exterior. Os dados fiscais e o tratamento tributário devem seguir a orientação da sua contabilidade."],
  ["O que acontece quando uma nota é rejeitada?", "Você pode acompanhar o status da emissão e consultar os detalhes da rejeição no painel."],
];

function SignupCta({ location, className = "button button-primary", children }: { location: string; className?: string; children: ReactNode }) {
  return (
    <a className={className} href={appUrl} target="_blank" onClick={() => trackMarketingCta("remote_signup_click", location)}>
      {children}
    </a>
  );
}

export function RemotePage() {
  return (
    <div className="remote-page">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header remote />

      <main id="conteudo">
        <section className="remote-hero" id="produto">
          <div className="remote-orbit remote-orbit-one" aria-hidden="true" />
          <div className="remote-orbit remote-orbit-two" aria-hidden="true" />
          <div className="container remote-hero-layout">
            <div className="remote-hero-copy">
              <p className="remote-eyebrow"><span /> NFS-e para quem trabalha com o mundo</p>
              <h1>Seu trabalho é global. Suas notas não precisam ser complicadas.</h1>
              <p>Configure seu CNPJ e emita suas NFS-e para clientes internacionais sem enfrentar o mesmo processo todos os meses.</p>
              <div className="remote-hero-actions">
                <SignupCta location="hero">Começar grátis <Icon name="arrow" size={17} /></SignupCta>
                <a className="button button-secondary" href="#como-funciona">Ver como funciona</a>
              </div>
              <p className="remote-plan-note"><Icon name="check" size={15} /> Plano grátis com até 2 notas por mês e 1 emitente. Certificado digital A1 necessário.</p>
            </div>

            <div className="remote-product" role="img" aria-label="Exemplo do painel Invio com uma NFS-e autorizada, histórico e download do XML">
              <div className="remote-product-topbar">
                <span><i /><i /><i /></span>
                <small>app.useinvio.com</small>
                <b>Remote</b>
              </div>
              <div className="remote-product-body">
                <aside aria-hidden="true">
                  <strong>i</strong>
                  <span className="active"><Icon name="document" size={16} /></span>
                  <span><Icon name="building" size={16} /></span>
                  <span><Icon name="pulse" size={16} /></span>
                </aside>
                <div className="remote-dashboard">
                  <div className="remote-dashboard-head">
                    <div><small>Emissões</small><strong>Histórico de NFS-e</strong></div>
                    <button type="button" tabIndex={-1}>+ Nova nota</button>
                  </div>
                  <div className="remote-authorized-card">
                    <span><Icon name="check" size={18} /></span>
                    <div><small>Última emissão</small><strong>Nota autorizada</strong><p>Cliente internacional · Serviço digital</p></div>
                    <b>Autorizada</b>
                  </div>
                  <div className="remote-history">
                    <div className="remote-history-head"><span>Emissão</span><span>Status</span><span>Arquivo</span></div>
                    <div><span><Icon name="document" size={15} /> NFS-e 0042</span><b>Autorizada</b><button type="button" tabIndex={-1}>XML ↓</button></div>
                    <div><span><Icon name="document" size={15} /> NFS-e 0041</span><b>Autorizada</b><button type="button" tabIndex={-1}>XML ↓</button></div>
                    <div><span><Icon name="document" size={15} /> NFS-e 0040</span><b className="review">Em análise</b><button type="button" tabIndex={-1}>Ver</button></div>
                  </div>
                </div>
              </div>
              <div className="remote-product-float"><Icon name="document" size={17} /><span><small>Documento disponível</small><strong>XML da NFS-e</strong></span><Icon name="check" size={15} /></div>
            </div>
          </div>
        </section>

        <section className="remote-problem section">
          <div className="container remote-problem-layout">
            <div className="remote-section-heading">
              <p className="remote-eyebrow">A operação continua aqui</p>
              <h2>Você trabalha para fora. Mas sua empresa continua operando no Brasil.</h2>
              <p>A Invio concentra essa operação em uma experiência simples e organizada.</p>
            </div>
            <ul className="remote-pain-list">
              {["Repetir os mesmos dados todos os meses", "Enfrentar portais fiscais pouco intuitivos", "Descobrir por que uma nota foi rejeitada", "Procurar XMLs e documentos antigos", "Depender de processos manuais para cada emissão"].map((pain, index) => (
                <li key={pain}><span>{String(index + 1).padStart(2, "0")}</span><strong>{pain}</strong><Icon name="arrow" size={17} /></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="remote-benefits section" id="beneficios">
          <div className="container">
            <div className="remote-section-heading remote-centered-heading">
              <p className="remote-eyebrow">Feito para a rotina</p>
              <h2>Menos repetição. Mais clareza a cada emissão.</h2>
            </div>
            <div className="remote-benefit-grid">
              {benefits.map((benefit, index) => (
                <article key={benefit.title}>
                  <span><Icon name={benefit.icon} size={22} /></span>
                  <small>0{index + 1}</small>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="remote-how section" id="como-funciona">
          <div className="container">
            <div className="remote-section-heading remote-centered-heading">
              <p className="remote-eyebrow">Como funciona</p>
              <h2>Do seu CNPJ ao XML, em três etapas.</h2>
              <p>Você configura a base da operação e reaproveita as informações nas próximas emissões.</p>
            </div>
            <div className="remote-step-grid">
              {steps.map((step, index) => (
                <article key={step.title}>
                  <div><span>0{index + 1}</span><Icon name={step.icon} size={23} /></div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
            <div className="remote-flow" aria-label="CNPJ e certificado A1, perfil do serviço, emissão, acompanhamento e XML">
              {["CNPJ + certificado A1", "Perfil do serviço", "Emissão", "Acompanhamento e XML"].map((item, index) => (
                <div key={item}><span>{item}</span>{index < 3 && <Icon name="arrow" size={17} />}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="remote-pricing section" id="plano-gratis">
          <div className="container remote-price-layout">
            <div className="remote-section-heading">
              <p className="remote-eyebrow">Plano grátis</p>
              <h2>Comece gratuitamente</h2>
              <p>Para quem quer organizar as primeiras emissões recorrentes sem começar por um plano maior.</p>
              <div className="remote-price"><small>R$</small><strong>0</strong><span>para começar</span></div>
              <SignupCta location="free_plan">Criar minha conta grátis <Icon name="arrow" size={17} /></SignupCta>
            </div>
            <div className="remote-price-card">
              <div className="remote-price-card-head"><span>Incluído no plano</span><b>Grátis</b></div>
              <ul>
                {freeFeatures.map((feature) => <li key={feature}><Icon name="check" size={15} /> {feature}</li>)}
              </ul>
              <div className="remote-certificate-note"><Icon name="key" size={19} /><p><strong>Certificado A1 necessário</strong><span>Você precisa ter um certificado digital A1 válido.</span></p></div>
            </div>
          </div>
        </section>

        <section className="remote-audience section" id="para-quem">
          <div className="container">
            <div className="remote-section-heading remote-centered-heading">
              <p className="remote-eyebrow">Para quem é</p>
              <h2>Feito para profissionais brasileiros com clientes internacionais</h2>
              <p>A Invio é indicada para profissionais que possuem CNPJ no Brasil e precisam emitir NFS-e pelos serviços prestados.</p>
            </div>
            <div className="remote-profession-grid">
              {professions.map((profession, index) => <span key={profession}><small>{String(index + 1).padStart(2, "0")}</small>{profession}</span>)}
            </div>
          </div>
        </section>

        <section className="remote-transparency section">
          <div className="container remote-transparency-layout">
            <div className="remote-section-heading">
              <p className="remote-eyebrow">Transparência</p>
              <h2>O que você precisa saber antes de começar</h2>
              <p>Sem esconder os limites do plano ou o papel da Invio na sua operação.</p>
            </div>
            <div className="remote-transparency-list">
              {transparency.map((item, index) => <p key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</p>)}
            </div>
          </div>
        </section>

        <section className="remote-faq section" id="faq">
          <div className="container faq-layout">
            <div className="remote-section-heading">
              <p className="remote-eyebrow">Dúvidas frequentes</p>
              <h2>Respostas diretas antes da primeira emissão.</h2>
            </div>
            <div className="faq-list remote-faq-list">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<span>+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="remote-final-cta section">
          <div className="remote-final-orbit" aria-hidden="true" />
          <div className="container remote-final-inner">
            <p className="remote-eyebrow">Invio Remote</p>
            <h2>Seu próximo cliente pode estar em qualquer lugar. Sua emissão fica em um só lugar.</h2>
            <p>Crie sua conta e comece com até 2 notas por mês no plano grátis.</p>
            <SignupCta location="final_cta" className="button remote-light-button">Começar grátis <Icon name="arrow" size={17} /></SignupCta>
            <small>1 emitente no plano grátis. Certificado digital A1 necessário.</small>
          </div>
        </section>
      </main>

      <Footer remote />
    </div>
  );
}
