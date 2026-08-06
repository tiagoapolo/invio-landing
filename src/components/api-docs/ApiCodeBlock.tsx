import { useState } from "react";

type CopyState = "idle" | "copied" | "error";

export function ApiCodeBlock({ code, label }: { code: string; label: string }) {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  const buttonLabel = copyState === "copied" ? "Copiado" : copyState === "error" ? "Não foi possível copiar" : "Copiar";

  return (
    <div className="api-code-block">
      <div className="api-code-toolbar">
        <span>{label}</span>
        <button type="button" onClick={copyCode} aria-live="polite">{buttonLabel}</button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}
