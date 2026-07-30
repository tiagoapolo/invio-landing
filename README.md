# Invio Landing

Website público da Invio em React, Vite e TypeScript.

## Rotas

- `/` — homepage permanente do produto.
- `/migrar-da-nuvem-fiscal` — campanha de migração assistida.
- `/remote` — NFS-e para profissionais que atendem clientes internacionais.

As três rotas possuem entradas HTML próprias para título, descrição, canonical, Open Graph, Twitter Cards e dados estruturados. O app também atualiza os metadados no cliente para preservar o SEO quando a hospedagem usa fallback de SPA.

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

O endpoint de leads deve persistir os dados e responder com status `2xx`. O formulário só exibe sucesso depois dessa confirmação e não envia segredos pelo browser.

## Hospedagem

Publique o diretório `dist` gerado pelo build. A plataforma deve servir as entradas HTML de cada rota limpa ou usar fallback para `index.html`; ambos os cenários são tratados pelo frontend.
