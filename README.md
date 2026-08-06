# Invio Landing

Website público da Invio em React, Vite e TypeScript.

## Rotas

- `/` — homepage permanente do produto.
- `/migrar-da-nuvem-fiscal` — campanha de migração assistida.
- `/remote` — NFS-e para profissionais que atendem clientes internacionais.
- `/api` — documentação pública da API.
- `/consulta/lc116`, `/consulta/nbs`, `/consulta/codigo-municipio` — consultas públicas gratuitas das tabelas de referência da NFS-e Nacional.

Todas as rotas possuem entradas HTML próprias para título, descrição, canonical, Open Graph, Twitter Cards e dados estruturados. O app também atualiza os metadados no cliente para preservar o SEO quando a hospedagem usa fallback de SPA.

## Consultas públicas

As tabelas ficam em `src/data` e são carregadas sob demanda (`import()`), então só entram no bundle da página que as usa. `src/data/consulta.ts` é o registro que liga slug, metadados, campo da NFS-e e carregador — adicionar uma consulta é acrescentar uma entrada ali, uma entrada HTML em `consulta/<slug>/index.html` e o input correspondente no `vite.config.ts`.

`lc116.ts` e `nbs.ts` são cópias das tabelas do app. `municipalities.ts` é um snapshot versionado da API de localidades do IBGE — o conteúdo precisa existir no HTML renderizado para ser indexável, então não é buscado no browser. Regenere quando o IBGE publicar alterações:

```bash
npm run build:municipalities
```

A estrutura já prevê as páginas por código (`/consulta/<tabela>/<codigo>-<slug>`): `entryPath` e `parseEntryCode` definem o contrato da URL, e uma URL com código hoje abre a tabela filtrada, sem link quebrado nem canonical duplicado.

O Google Analytics usa a propriedade `G-K6BXVEHZKV` e registra page views por rota, CTAs e conversões dos formulários sem enviar dados pessoais.

## Desenvolvimento

```bash
npm install
npm run dev
```

Verificações:

```bash
npm run typecheck
npm test
npm run build
```

## Variáveis de ambiente

Copie `.env.example` e ajuste quando necessário:

- `VITE_APP_URL`: URL pública do dashboard Next.js.
- `VITE_LEADS_ENDPOINT`: endpoint server-side que recebe os leads. O padrão é `/api/leads`.
- `ATTIO_LEADS_WEBHOOK_URL`: URL privada do webhook que recebe os leads no Attio.

A função server-side em `/api/leads` valida o payload padronizado e o encaminha ao Attio. O formulário só exibe sucesso depois da confirmação do webhook e não envia segredos pelo browser.

## Hospedagem

Publique o diretório `dist` gerado pelo build. A plataforma deve servir as entradas HTML de cada rota limpa ou usar fallback para `index.html`; ambos os cenários são tratados pelo frontend.
