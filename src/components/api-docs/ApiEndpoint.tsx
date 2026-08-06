import type { ReactNode } from "react";

type ApiMethod = "GET" | "POST" | "PATCH" | "DELETE";

export function ApiEndpoint({
  method,
  path,
  description,
  scope,
  safe = false,
  children,
}: {
  method: ApiMethod;
  path: string;
  description: string;
  scope: string;
  safe?: boolean;
  children?: ReactNode;
}) {
  return (
    <article className="api-endpoint">
      <div className="api-endpoint-heading">
        <div className="api-endpoint-route"><span className={`api-method api-method-${method.toLowerCase()}`}>{method}</span><code>{path}</code></div>
        {safe && <span className="api-safe-badge">Somente leitura</span>}
      </div>
      <p>{description}</p>
      <div className="api-scope"><span>Escopo</span><code>{scope}</code></div>
      {children}
    </article>
  );
}
