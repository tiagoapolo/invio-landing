import { Brand } from "./Brand";

const appUrl = import.meta.env.VITE_APP_URL || "https://app.useinvio.com";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Brand />
          <p>Infraestrutura de NFS-e Nacional para SaaS, ERPs e plataformas.</p>
        </div>
        <div className="footer-column">
          <strong>Produto</strong>
          <a href="/#produto">Recursos</a>
          <a href="/#como-funciona">Como funciona</a>
          <a href="/#modelo-comercial">Modelo comercial</a>
        </div>
        <div className="footer-column">
          <strong>Para sua operação</strong>
          <a href="/#para-quem">SaaS e ERPs</a>
          <a href="/migrar-da-nuvem-fiscal">Migração Nuvem Fiscal</a>
          <a href={`${appUrl}/login`}>Entrar no app</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Invio.</span>
        <span>NFS-e Nacional, da integração à operação.</span>
      </div>
    </footer>
  );
}
