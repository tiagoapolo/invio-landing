import { useState } from "react";
import { trackMarketingCta } from "../analytics";
import { Brand } from "./Brand";
import { Icon } from "./Icon";

const appUrl = import.meta.env.VITE_APP_URL || "https://app.useinvio.com";

export function Header({ migration = false, remote = false }: { migration?: boolean; remote?: boolean }) {
  const [open, setOpen] = useState(false);
  const prefix = migration ? "/" : "";

  const close = () => setOpen(false);

  return (
    <header className={`site-header ${remote ? "remote-header" : ""}`}>
      <div className="container header-inner">
        {remote ? (
          <div className="remote-brand-lockup">
            <Brand href="https://useinvio.com" />
            <span>Remote</span>
          </div>
        ) : <Brand />}
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
        <div className={`nav-wrap ${open ? "is-open" : ""}`}>
          {remote ? (
            <nav aria-label="Navegação do Invio Remote">
              <a href="#demo" onClick={close}>Produto</a>
              <a href="#como-funciona" onClick={close}>Como funciona</a>
              <a href="#plano-gratis" onClick={close}>Plano grátis</a>
              <a href="#faq" onClick={close}>Dúvidas</a>
            </nav>
          ) : (
            <nav aria-label="Navegação principal">
              <a href={`${prefix}#produto`} onClick={close}>Produto</a>
              <a href={`${prefix}#como-funciona`} onClick={close}>Como funciona</a>
              <a href={`${prefix}#para-quem`} onClick={close}>Para quem</a>
              <a href="#montar-plano" onClick={close}>Planos</a>
              <a href="/migrar-da-nuvem-fiscal" onClick={close}>Migração</a>
            </nav>
          )}
          <div className="header-actions">
            <a className="login-link" href={remote ? appUrl : `${appUrl}/login`}>Entrar</a>
            <a
              className="button button-primary button-small"
              href={remote ? appUrl : migration ? "#montar-plano" : "#contato"}
              onClick={() => {
                close();
                if (remote) trackMarketingCta("remote_signup_click", "header");
              }}
            >
              {remote ? "Criar conta grátis" : migration ? "Montar plano" : "Solicitar acesso"} <Icon name="arrow" size={16} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
