# Invio Landing

Website público da Invio em React, Vite e TypeScript.

## Rotas

- `/` — homepage permanente do produto.
- `/migrar-da-nuvem-fiscal` — campanha de migração assistida.

As duas rotas possuem entradas HTML próprias para título, descrição, canonical e Open Graph. O app também atualiza os metadados no cliente para preservar o SEO quando a hospedagem usa fallback de SPA.

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

O endpoint de leads deve persistir os dados e responder com status `2xx`. O formulário só exibe sucesso depois dessa confirmação e não envia segredos pelo browser.

## Hospedagem

Publique o diretório `dist` gerado pelo build. A plataforma deve servir `migrar-da-nuvem-fiscal/index.html` na rota limpa `/migrar-da-nuvem-fiscal` ou usar fallback para `index.html`; ambos os cenários são tratados pelo frontend.
