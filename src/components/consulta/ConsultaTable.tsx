import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "../../analytics";
import type { ConsultaDataset, ConsultaEntry } from "../../data/consulta";
import { searchEntries } from "../../data/consulta";

/** Acima disso os qualificadores viram ruído em vez de filtro (itens da LC 116). */
const MAX_BADGE_FILTERS = 32;

function CopyableCode({ code, dataset }: { code: string; dataset: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      className={`consulta-code ${copied ? "is-copied" : ""}`}
      title={`Copiar ${code}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          trackEvent("consulta_code_copy", { consulta_dataset: dataset });
        } catch {
          setCopied(false);
        }
      }}
    >
      <code>{code}</code>
      <span aria-live="polite">{copied ? "Copiado" : "Copiar"}</span>
    </button>
  );
}

export function ConsultaTable({ dataset, initialQuery = "" }: { dataset: ConsultaDataset; initialQuery?: string }) {
  const [entries, setEntries] = useState<ConsultaEntry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [badge, setBadge] = useState("");

  useEffect(() => {
    let active = true;
    setEntries(null);
    setFailed(false);
    dataset
      .load()
      .then((loaded) => {
        if (active) setEntries(loaded);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [dataset]);

  useEffect(() => {
    setQuery(initialQuery);
    setBadge("");
  }, [dataset, initialQuery]);

  const badges = useMemo(() => {
    if (!entries || !dataset.badgeHeading) return [];
    const unique = [...new Set(entries.map((entry) => entry.badge).filter(Boolean) as string[])].sort();
    return unique.length <= MAX_BADGE_FILTERS ? unique : [];
  }, [entries, dataset.badgeHeading]);

  const results = useMemo(() => {
    if (!entries) return [];
    const scoped = badge ? entries.filter((entry) => entry.badge === badge) : entries;
    return searchEntries(scoped, query);
  }, [entries, badge, query]);

  const total = entries?.length ?? 0;

  return (
    <div className="consulta-tool">
      <div className="consulta-controls">
        <label className="consulta-search">
          <span className="visually-hidden">Buscar na tabela {dataset.name}</span>
          <input
            type="search"
            value={query}
            placeholder={dataset.searchPlaceholder}
            autoComplete="off"
            enterKeyHint="search"
            onChange={(event) => setQuery(event.target.value)}
            onBlur={(event) => {
              if (event.target.value.trim()) trackEvent("consulta_search", { consulta_dataset: dataset.slug });
            }}
          />
        </label>
        {badges.length > 0 && (
          <div className="consulta-badges" role="group" aria-label={`Filtrar por ${dataset.badgeHeading}`}>
            <button type="button" className={badge === "" ? "is-active" : ""} onClick={() => setBadge("")}>
              Todos
            </button>
            {badges.map((value) => (
              <button
                key={value}
                type="button"
                className={badge === value ? "is-active" : ""}
                aria-pressed={badge === value}
                onClick={() => setBadge(badge === value ? "" : value)}
              >
                {value}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="consulta-count" role="status">
        {failed
          ? "Não foi possível carregar a tabela agora. Recarregue a página para tentar de novo."
          : entries === null
          ? "Carregando a tabela…"
          : `${results.length.toLocaleString("pt-BR")} de ${total.toLocaleString("pt-BR")} registros`}
      </p>

      {entries !== null && results.length === 0 && (
        <p className="consulta-empty">
          Nenhum resultado para <strong>{query}</strong>. Tente outro termo ou parte do código.
        </p>
      )}

      {results.length > 0 && (
        <div className="consulta-table-wrap">
          <table className="consulta-table">
            <caption className="visually-hidden">
              {dataset.heading}: {dataset.codeLabel} e descrição de cada registro.
            </caption>
            <thead>
              <tr>
                <th scope="col">{dataset.codeLabel}</th>
                {dataset.badgeHeading && <th scope="col">{dataset.badgeHeading}</th>}
                <th scope="col">{dataset.labelHeading}</th>
              </tr>
            </thead>
            <tbody>
              {results.map((entry) => (
                <tr key={entry.code}>
                  <td>
                    <CopyableCode code={entry.code} dataset={dataset.slug} />
                  </td>
                  {dataset.badgeHeading && <td className="consulta-badge-cell">{entry.badge}</td>}
                  <td>{entry.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
