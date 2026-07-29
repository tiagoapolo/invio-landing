import { useState } from "react";
import { Brand } from "./Brand";
import { Icon } from "./Icon";

const appUrl = import.meta.env.VITE_APP_URL || "https://app.useinvio.com";

export function Header({ migration = false }: { migration?: boolean }) {
  const [open, setOpen] = useState(false);
  const prefix = migration ? "/" : "";

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
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
          <nav aria-label="Navegação principal">
            <a href={`${prefix}#produto`} onClick={close}>Produto</a>
            <a href={`${prefix}#como-funciona`} onClick={close}>Como funciona</a>
            <a href={`${prefix}#para-quem`} onClick={close}>Para quem</a>
            <a href="#montar-plano" onClick={close}>Planos</a>
            <a href="/migrar-da-nuvem-fiscal" onClick={close}>Migração</a>
          </nav>
          <div className="header-actions">
            <a className="login-link" href={`${appUrl}/login`}>Entrar</a>
            <a className="button button-primary button-small" href="#contato" onClick={close}>
              Solicitar acesso <Icon name="arrow" size={16} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
