import { useEffect } from "react";
import { HomePage } from "./pages/HomePage";
import { MigrationPage } from "./pages/MigrationPage";
import { RemotePage } from "./pages/RemotePage";

export function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const isMigration = path === "/migrar-da-nuvem-fiscal";
  const isRemote = path === "/remote";

  useEffect(() => {
    const metadata = isRemote
      ? {
          title: "Invio Remote — NFS-e para quem trabalha para o exterior",
          description: "Emita e acompanhe NFS-e para clientes internacionais. Comece grátis com até 2 notas por mês e 1 emitente. Certificado A1 necessário.",
          url: "https://useinvio.com/remote",
          image: "https://useinvio.com/remote-og.png",
        }
      : isMigration
      ? {
          title: "Migração da Nuvem Fiscal para o Invio",
          description: "Programa de migração assistida para SaaS, ERPs e plataformas que utilizavam a API da Nuvem Fiscal.",
          url: "https://useinvio.com/migrar-da-nuvem-fiscal",
          image: "",
        }
      : {
          title: "Invio — API de NFS-e Nacional para SaaS e plataformas",
          description: "Emita e monitore NFS-e Nacional com API, webhooks, múltiplos emitentes e acompanhamento operacional.",
          url: "https://useinvio.com/",
          image: "",
        };

    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", metadata.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", metadata.url);
    if (metadata.image) document.querySelector('meta[property="og:image"]')?.setAttribute("content", metadata.image);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", metadata.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", metadata.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", metadata.url);
  }, [isMigration, isRemote]);

  if (isRemote) {
    return <RemotePage />;
  }

  if (isMigration) {
    return <MigrationPage />;
  }

  return <HomePage />;
}
