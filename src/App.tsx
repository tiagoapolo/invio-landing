import { useEffect } from "react";
import { trackPageView } from "./analytics";
import { HomePage } from "./pages/HomePage";
import { MigrationPage } from "./pages/MigrationPage";
import { RemotePage } from "./pages/RemotePage";
import { ApiDocsPage } from "./pages/ApiDocsPage";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`;
  const existing = document.querySelector(selector);

  if (!content) {
    existing?.remove();
    return;
  }

  const meta = existing || document.createElement("meta");
  meta.setAttribute(attribute, key);
  meta.setAttribute("content", content);
  if (!existing) document.head.append(meta);
}

export function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const isMigration = path === "/migrar-da-nuvem-fiscal";
  const isRemote = path === "/remote";
  const isApiDocs = path === "/api";

  useEffect(() => {
    const metadata = isApiDocs
      ? {
          title: "Documentação da API | Invio",
          description: "Referência segura da API Invio: autenticação, endpoints de leitura e exemplos executáveis sem alterar dados fiscais.",
          url: "https://useinvio.com/api",
          image: "",
          imageAlt: "",
          twitterCard: "summary",
        }
      : isRemote
      ? {
          title: "Como emitir nota fiscal para cliente do exterior | Invio",
          description: "Emita e acompanhe NFS-e para clientes no exterior. Plano grátis com até 2 notas por mês, 1 emitente e certificado A1.",
          url: "https://useinvio.com/remote",
          image: "https://useinvio.com/remote-og.png",
          imageAlt: "Invio Remote — NFS-e para clientes no exterior",
          twitterCard: "summary_large_image",
        }
      : isMigration
      ? {
          title: "Migração da Nuvem Fiscal para o Invio",
          description: "Avaliações de migração assistida por etapas a partir de 31/07 para SaaS, ERPs e plataformas que utilizavam a API da Nuvem Fiscal.",
          url: "https://useinvio.com/migrar-da-nuvem-fiscal",
          image: "",
          imageAlt: "",
          twitterCard: "summary",
        }
      : {
          title: "Invio — API de NFS-e Nacional para SaaS e plataformas",
          description: "Emita e monitore NFS-e Nacional com API, webhooks, múltiplos emitentes e acompanhamento operacional.",
          url: "https://useinvio.com/",
          image: "",
          imageAlt: "",
          twitterCard: "summary",
        };

    document.title = metadata.title;
    setMeta("name", "description", metadata.description);
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    setMeta("property", "og:url", metadata.url);
    setMeta("property", "og:image", metadata.image);
    setMeta("property", "og:image:width", metadata.image ? "1200" : "");
    setMeta("property", "og:image:height", metadata.image ? "630" : "");
    setMeta("property", "og:image:alt", metadata.imageAlt);
    setMeta("name", "twitter:card", metadata.twitterCard);
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);
    setMeta("name", "twitter:image", metadata.image);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", metadata.url);
    trackPageView(metadata.title);
  }, [isApiDocs, isMigration, isRemote]);

  if (isApiDocs) {
    return <ApiDocsPage />;
  }

  if (isRemote) {
    return <RemotePage />;
  }

  if (isMigration) {
    return <MigrationPage />;
  }

  return <HomePage />;
}
