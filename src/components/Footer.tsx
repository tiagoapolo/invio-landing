import { Brand } from "./Brand";

const appUrl = import.meta.env.VITE_APP_URL || "https://app.useinvio.com";

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
              <a href="#beneficios">Recursos</a>
              <a href="#como-funciona">Como funciona</a>
              <a href="/documentacao">Documentação</a>
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
          <strong>Para sua operação</strong>
          {!remote && <a href="/#para-quem">SaaS e ERPs</a>}
          <a href="/remote">Invio Remote</a>
          {!remote && <a href="/migrar-da-nuvem-fiscal">Migração Nuvem Fiscal</a>}
          <a href={remote ? appUrl : `${appUrl}/login`}>Entrar no app</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Invio.</span>
        {remote ? (
          <div className="footer-legal-links">
            <a href="/termos-de-uso">Termos de uso</a>
            <a href="/politica-de-privacidade">Política de privacidade</a>
          </div>
        ) : <span>NFS-e Nacional, da integração à operação.</span>}
      </div>
    </footer>
  );
}
