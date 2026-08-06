import { useState, type ReactNode } from "react";
import { trackMarketingCta } from "../analytics";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Icon, type IconName } from "../components/Icon";

const appUrl = "https://app.useinvio.com";
const contactUrl = "https://wa.me/5541999735882";

const internationalPains = [
  "Cadastrar um tomador estrangeiro, sem CNPJ ou CPF brasileiro",
  "Preencher país e endereço do cliente nos campos da nota",
  "Definir com o contador como informar em reais um serviço pago em dólar ou euro",
  "Confirmar o código de serviço e o tratamento de ISS com seu contador",
  "Descobrir o motivo quando a prefeitura rejeita a emissão",
  "Refazer o mesmo preenchimento para o mesmo cliente todo mês",
];

const steps: Array<{ icon: IconName; title: string; text: string }> = [
  {
    icon: "building",
    title: "Cadastre seu emitente",
    text: "Informe o CNPJ que vai emitir a nota e configure o perfil do serviço com a orientação do seu contador.",
  },
  {
    icon: "key",
    title: "Adicione o certificado A1",
    text: "Associe ao emitente o arquivo .pfx usado para assinar e enviar a NFS-e.",
  },
  {
    icon: "document",
    title: "Emita e acompanhe",
    text: "Crie a NFS-e, consulte o status ou a rejeição e baixe o XML no painel.",
  },
];

const savedData: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: "users", title: "O cliente do exterior", text: "Nome, país e endereço do tomador ficam salvos depois do primeiro cadastro." },
  { icon: "document", title: "A descrição do serviço", text: "Descrição, código do serviço e o texto que você já usou voltam preenchidos." },
  { icon: "building", title: "O emitente e o perfil fiscal", text: "O CNPJ, o certificado e a configuração alinhada com seu contador continuam ali." },
];

const freeFeatures = [
  "Até 2 NFS-e por mês",
  "1 emitente",
  "Painel de acompanhamento",
  "Histórico de emissões",
  "Download do XML",
  "Visualização de rejeições",
];

const transparency = [
  "A Invio não recebe pagamentos nem faz câmbio.",
  "A Invio não substitui seu contador.",
  "A configuração fiscal e o tratamento tributário devem seguir a orientação da sua contabilidade.",
];

const faqs = [
  [
    "Como emitir nota fiscal para cliente do exterior?",
    "Cadastre o CNPJ emitente e o perfil do serviço, associe um certificado A1 válido e crie a NFS-e para o cliente estrangeiro. Os dados fiscais e o tratamento tributário devem seguir a orientação do seu contador.",
  ],
  [
    "Preciso preencher tudo de novo a cada nota?",
    "Não. Os dados do cliente estrangeiro, do serviço e do emitente ficam salvos como modelo. Na emissão seguinte você abre o modelo, revisa o que mudou — como o valor do mês — e emite.",
  ],
  ["O plano grátis é realmente gratuito?", "Sim. Ele permite emitir até 2 NFS-e por mês com 1 emitente."],
  [
    "O que acontece quando atinjo o limite de 2 notas?",
    "O plano grátis cobre até 2 NFS-e no mês. Se precisar emitir mais, fale com a Invio antes da próxima nota para avaliar a opção adequada ao seu caso.",
  ],
  [
    "O que é o certificado digital A1?",
    "É um arquivo .pfx que funciona como a identidade digital do CNPJ e permite assinar a NFS-e. Você precisa ter um certificado A1 válido para emitir pelo Invio Remote.",
  ],
  ["O que é um emitente?", "É o CNPJ responsável pela emissão da nota fiscal. O plano grátis permite cadastrar 1 emitente."],
  [
    "A Invio recebe meus pagamentos em dólar?",
    "Não. A Invio cuida da emissão e do acompanhamento da NFS-e. O recebimento e o câmbio ficam no serviço financeiro escolhido por você.",
  ],
  [
    "A Invio substitui meu contador?",
    "Não. A Invio facilita a emissão, mas as decisões fiscais e tributárias devem ser validadas com sua contabilidade.",
  ],
  [
    "O que acontece quando uma nota é rejeitada?",
    "A emissão fica registrada. Você pode acompanhar o status e consultar os detalhes da rejeição no painel.",
  ],
];

function SignupCta({ location, className = "button button-primary", children }: { location: string; className?: string; children: ReactNode }) {
  return (
    <a className={className} href={appUrl} target="_blank" rel="noreferrer" onClick={() => trackMarketingCta("remote_signup_click", location)}>
      {children}
    </a>
  );
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const answerId = `remote-faq-answer-${index}`;

  return (
    <div className={`remote-faq-item ${open ? "is-open" : ""}`}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={answerId} onClick={() => setOpen((current) => !current)}>
          <span>{question}</span>
          <i aria-hidden="true">+</i>
        </button>
      </h3>
      <div id={answerId} hidden={!open}>
        <p>{answer}</p>
      </div>
    </div>
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
              <p className="remote-eyebrow"><span /> Para contractors e PJ que faturam para fora</p>
              <h1>
                Emita NFS-e para<span className="remote-mobile-break"><br /></span> clientes
                <br className="remote-desktop-break" />
                no exterior<span className="remote-mobile-break"><br /></span> sem depender
                <br className="remote-desktop-break" />
                do portal<span className="remote-mobile-break"><br /></span> da prefeitura.
              </h1>
              <p>Cadastre seu CNPJ e o certificado A1 uma vez. Depois, emita suas notas, acompanhe o status ou a rejeição e baixe o XML no mesmo painel.</p>
              <div className="remote-hero-actions">
                <SignupCta location="hero">Criar conta grátis <Icon name="arrow" size={17} /></SignupCta>
                <a className="button button-secondary" href="#demo">Ver o produto</a>
              </div>
              <p className="remote-plan-note">
                <Icon name="check" size={15} />
                <span>Grátis até 2 notas por mês. Precisa de <a href="#certificado-a1">certificado digital A1</a>.</span>
              </p>
            </div>

            <div className="remote-product" role="img" aria-label="Visualização ilustrativa do painel Invio com uma NFS-e autorizada, histórico e download do XML">
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
              <p className="remote-eyebrow">O processo hoje</p>
              <h2>Emitir nota para um cliente no exterior ainda exige lidar com várias etapas.</h2>
              <p>Na prática, muitos profissionais enfrentam hoje este processo nos portais fiscais: reunir os dados do cliente, preencher as exigências da nota, alinhar o tratamento tributário com o contador e corrigir eventuais rejeições.</p>
            </div>
            <ul className="remote-pain-list">
              {internationalPains.map((pain, index) => (
                <li key={pain}><span>{String(index + 1).padStart(2, "0")}</span><strong>{pain}</strong></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="remote-how section" id="como-funciona">
          <div className="container">
            <div className="remote-section-heading remote-centered-heading">
              <p className="remote-eyebrow">Como funciona</p>
              <h2>Do seu CNPJ ao XML, em três etapas.</h2>
              <p>Configure os dados uma vez e reaproveite o cadastro nas próximas emissões.</p>
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
          </div>
        </section>

        <section className="remote-templates section" id="modelos">
          <div className="container remote-templates-layout">
            <div className="remote-section-heading">
              <p className="remote-eyebrow">Emissões recorrentes</p>
              <h2>Preencheu uma vez. A nota do mês seguinte sai em segundos.</h2>
              <p>Se você fatura o mesmo cliente todo mês, não precisa refazer o mesmo formulário. O Invio guarda os dados da emissão como um modelo: você abre, confere o que mudou e emite.</p>
              <div className="remote-saved-list">
                {savedData.map((item) => (
                  <article key={item.title}>
                    <span><Icon name={item.icon} size={20} /></span>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </article>
                ))}
              </div>
              <SignupCta location="templates">Criar conta grátis <Icon name="arrow" size={17} /></SignupCta>
            </div>

            <div className="remote-templates-visual" role="img" aria-label="Visualização ilustrativa: um modelo salvo é reaproveitado e abre a nova NFS-e já preenchida, com apenas o valor do mês a revisar">
              <div className="remote-templates-card">
                <div className="remote-templates-card-head"><span><Icon name="layers" size={16} /> Modelos salvos</span><small>3</small></div>
                <div className="remote-templates-rows">
                  <div className="is-selected">
                    <b>Northstar LLC</b>
                    <small>Desenvolvimento de software · Estados Unidos</small>
                    <button type="button" tabIndex={-1}>Usar modelo</button>
                  </div>
                  <div>
                    <b>Bright Labs Inc</b>
                    <small>Consultoria técnica · Estados Unidos</small>
                    <button type="button" tabIndex={-1}>Usar modelo</button>
                  </div>
                  <div>
                    <b>Vantis GmbH</b>
                    <small>Design de produto · Alemanha</small>
                    <button type="button" tabIndex={-1}>Usar modelo</button>
                  </div>
                </div>
              </div>

              <div className="remote-templates-arrow"><i /><Icon name="arrow" size={17} /><i /></div>

              <div className="remote-templates-card remote-templates-form">
                <div className="remote-templates-card-head"><span><Icon name="document" size={16} /> Nova NFS-e</span><small className="is-prefilled">Preenchida pelo modelo</small></div>
                <div className="remote-templates-fields">
                  <label>Tomador<strong>Northstar LLC <i><Icon name="check" size={13} /></i></strong></label>
                  <label>País<strong>Estados Unidos <i><Icon name="check" size={13} /></i></strong></label>
                  <label>Serviço<strong>Desenvolvimento de software <i><Icon name="check" size={13} /></i></strong></label>
                  <label className="is-editable">Valor do mês<strong>R$ 18.400,00 <em>revisar</em></strong></label>
                </div>
                <div className="remote-templates-form-footer"><Icon name="check" size={15} /> Pronta para emitir</div>
              </div>
            </div>
          </div>
        </section>

        <section className="remote-demo section" id="demo">
          <div className="container">
            <div className="remote-section-heading remote-demo-heading">
              <div>
                <p className="remote-eyebrow">Por dentro do produto</p>
                <h2>Veja o caminho da emissão.</h2>
              </div>
              <p>As telas abaixo são ilustrativas e usam dados fictícios. Elas mostram o fluxo disponível no painel.</p>
            </div>
            <div className="remote-demo-grid">
              <figure>
                <div className="remote-demo-window">
                  <div className="remote-demo-bar"><i /><i /><i /><span>Emitente</span></div>
                  <div className="remote-demo-form">
                    <small>CNPJ emitente</small><strong>12.345.678/0001-90</strong>
                    <small>Perfil de serviço</small><strong>Desenvolvimento de software</strong>
                    <div><Icon name="check" size={16} /> Cadastro pronto para emitir</div>
                  </div>
                </div>
                <figcaption><span>01</span><strong>Cadastre o emitente</strong><p>Salve o CNPJ e o perfil do serviço.</p></figcaption>
              </figure>
              <figure>
                <div className="remote-demo-window">
                  <div className="remote-demo-bar"><i /><i /><i /><span>Nova NFS-e</span></div>
                  <div className="remote-demo-form">
                    <small>Tomador</small><strong>Northstar LLC</strong>
                    <small>País</small><strong>Estados Unidos</strong>
                    <small>Serviço</small><strong>Desenvolvimento de software</strong>
                  </div>
                </div>
                <figcaption><span>02</span><strong>Informe o cliente</strong><p>Revise os dados do tomador estrangeiro.</p></figcaption>
              </figure>
              <figure>
                <div className="remote-demo-window">
                  <div className="remote-demo-bar"><i /><i /><i /><span>Emissões</span></div>
                  <div className="remote-demo-status">
                    <span><Icon name="check" size={19} /></span>
                    <p><small>NFS-e 0042</small><strong>Nota autorizada</strong></p>
                    <b>XML ↓</b>
                  </div>
                  <div className="remote-demo-timeline"><i /><span>Enviada</span><i /><span>Autorizada</span></div>
                </div>
                <figcaption><span>03</span><strong>Acompanhe o status</strong><p>Consulte a emissão e baixe o XML.</p></figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="remote-certificate section" id="certificado-a1">
          <div className="container remote-certificate-layout">
            <div className="remote-section-heading">
              <p className="remote-eyebrow">Certificado digital A1</p>
              <h2>É a identidade digital do seu CNPJ.</h2>
              <p>O A1 é um arquivo no formato <strong>.pfx</strong>. Ele é associado ao emitente e usado para assinar a NFS-e antes do envio.</p>
              <a className="button button-secondary" href={contactUrl}>Ainda não tenho certificado</a>
            </div>
            <div className="remote-certificate-cards">
              <article>
                <span><Icon name="key" size={22} /></span>
                <div><h3>Por que preciso dele?</h3><p>Sem um certificado A1 válido, a nota não pode ser assinada e emitida pelo Invio Remote.</p></div>
              </article>
              <article>
                <span><Icon name="building" size={22} /></span>
                <div>
                  <h3>Onde consigo?</h3>
                  <p>Com uma autoridade certificadora credenciada pela ICP-Brasil. Confirme preço e validade diretamente com a empresa escolhida.</p>
                  <a href="https://www.gov.br/iti/pt-br/assuntos/icp-brasil/autoridades-certificadoras" target="_blank" rel="noreferrer">Consultar autoridades credenciadas <Icon name="arrow" size={15} /></a>
                </div>
              </article>
              <article className="remote-security-card">
                <span><Icon name="shield" size={22} /></span>
                <div><h3>Quer entender o uso do arquivo?</h3><p>Fale com a Invio antes de enviar seu certificado para tirar dúvidas sobre acesso, guarda e exclusão.</p><a href={contactUrl}>Falar com a Invio <Icon name="arrow" size={15} /></a></div>
              </article>
            </div>
          </div>
        </section>

        {/* TODO: Render verified customer testimonials when approved quotes and assets are available. */}

        <section className="remote-pricing section" id="plano-gratis">
          <div className="container remote-price-layout">
            <div className="remote-section-heading">
              <p className="remote-eyebrow">Plano grátis</p>
              <h2>Comece sem mensalidade.</h2>
              <p>Para emitir suas primeiras notas e acompanhar tudo pelo painel.</p>
              <div className="remote-price"><small>R$</small><strong>0</strong><span>para começar</span></div>
              <SignupCta location="free_plan">Criar conta grátis <Icon name="arrow" size={17} /></SignupCta>
            </div>
            <div className="remote-price-card">
              <div className="remote-price-card-head"><span>Incluído no plano</span><b>Grátis</b></div>
              <ul>
                {freeFeatures.map((feature) => <li key={feature}><Icon name="check" size={15} /> {feature}</li>)}
              </ul>
              <div className="remote-certificate-note"><Icon name="key" size={19} /><p><strong>Certificado A1 necessário</strong><span>Você precisa ter um certificado digital A1 válido.</span></p></div>
              <p className="remote-price-next">Precisa de mais notas ou mais de um emitente? <a href={contactUrl}>Fale com a Invio.</a></p>
            </div>
          </div>
        </section>

        <section className="remote-transparency section">
          <div className="container remote-transparency-layout">
            <div className="remote-section-heading">
              <p className="remote-eyebrow">Transparência</p>
              <h2>O que a Invio faz e o que fica com você.</h2>
              <p>Você emite e acompanha a NFS-e. Pagamento, câmbio e decisões tributárias ficam fora do produto.</p>
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
              <p>Não encontrou sua dúvida? <a href={contactUrl}>Fale com a Invio.</a></p>
            </div>
            <div className="faq-list remote-faq-list">
              {faqs.map(([question, answer], index) => <FaqItem key={question} question={question} answer={answer} index={index} />)}
            </div>
          </div>
        </section>

        <section className="remote-final-cta section">
          <div className="remote-final-orbit" aria-hidden="true" />
          <div className="container remote-final-inner">
            <p className="remote-eyebrow">Invio Remote</p>
            <h2>A nota do seu cliente lá fora começa aqui.</h2>
            <p>Crie sua conta e emita até 2 NFS-e por mês no plano grátis.</p>
            <SignupCta location="final_cta" className="button remote-light-button">Criar conta grátis <Icon name="arrow" size={17} /></SignupCta>
            <small>1 emitente no plano grátis. Certificado digital A1 necessário.</small>
          </div>
        </section>
      </main>

      <Footer remote />
    </div>
  );
}
