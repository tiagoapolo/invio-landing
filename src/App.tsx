import { useEffect } from "react";
import { HomePage } from "./pages/HomePage";
import { MigrationPage } from "./pages/MigrationPage";

export function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const isMigration = path === "/migrar-da-nuvem-fiscal";

  useEffect(() => {
    const metadata = isMigration
      ? {
          title: "Migração da Nuvem Fiscal para o Invio",
          description: "Programa de migração assistida para SaaS, ERPs e plataformas que utilizavam a API da Nuvem Fiscal.",
          url: "https://useinvio.com/migrar-da-nuvem-fiscal",
        }
      : {
          title: "Invio — API de NFS-e Nacional para SaaS e plataformas",
          description: "Emita e monitore NFS-e Nacional com API, webhooks, múltiplos emitentes e acompanhamento operacional.",
          url: "https://useinvio.com/",
        };

    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", metadata.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", metadata.url);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", metadata.url);
  }, [isMigration]);

  if (isMigration) {
    return <MigrationPage />;
  }

  return <HomePage />;
}
