import { Brand } from "./Brand";

const appUrl = import.meta.env.VITE_APP_URL || "https://app.useinvio.com";
const whatsappUrl = "https://wa.me/5541999735882";

export function Footer({ remote = false }: { remote?: boolean }) {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Brand href={remote ? "https://useinvio.com" : "/"} />
          <p>{remote ? "NFS-e para profissionais brasileiros que trabalham com clientes internacionais." : "Infraestrutura de NFS-e Nacional para SaaS, ERPs e plataformas."}</p>
        </div>
        <div className="footer-column">
          <strong>Produto</strong>
          {remote ? (
            <>
              <a href="#demo">Ver o produto</a>
              <a href="#como-funciona">Como funciona</a>
              <a href="#certificado-a1">Certificado A1</a>
            </>
          ) : (
            <>
              <a href="/#produto">Recursos</a>
              <a href="/#como-funciona">Como funciona</a>
              <a href="/#montar-plano">Montar meu plano</a>
            </>
          )}
        </div>
        <div className="footer-column">
          <strong>{remote ? "Para você" : "Para sua operação"}</strong>
          {!remote && <a href="/#para-quem">SaaS e ERPs</a>}
          <a href="/remote">Invio Remote</a>
          {!remote && <a href="/migrar-da-nuvem-fiscal">Migração Nuvem Fiscal</a>}
          <a href={remote ? appUrl : `${appUrl}/login`}>Entrar no app</a>
          {remote && <a href={whatsappUrl}>Fale com a Invio</a>}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Invio.</span>
        {remote ? (
          <div className="footer-legal-links">
            <a href={whatsappUrl}>Contato</a>
            {/* TODO: Add verified legal name, CNPJ, terms and privacy links when the public pages are available. */}
          </div>
        ) : <span>NFS-e Nacional, da integração à operação.</span>}
      </div>
    </footer>
  );
}
