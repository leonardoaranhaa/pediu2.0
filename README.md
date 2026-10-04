# Pediu Web (pediu2.0)

Cliente **web/PWA** do Pediu: descoberta de restaurantes, sacola, checkout, acompanhamento e Clube — otimizado para preview e instalação no navegador.

> **Backend de produção:** use o repositório [pediu-mobile](https://github.com/leonardoaranhaa/pediu-mobile) (Express + tRPC + MySQL). Este projeto mantém estado e catálogo **localmente** para funcionar sem banco no preview.

## Rodar

```bash
npm install
npm run dev
```

O servidor escuta em `0.0.0.0:8080`. Para revive/hibernate:

```bash
sh startup.sh
```

## Fluxos no app

| Rota | Função |
|---|---|
| `/` | Home, categorias, flash, endereço |
| `/search`, `/taste` | Busca e coleções |
| `/restaurants/:id` | Cardápio e adicionais |
| `/cart`, `/checkout` | Sacola, cupom, pagamento |
| `/orders`, `/order/:id` | Histórico, mapa, chat entregador |
| `/market`, `/club` | Mercado e fidelidade |
| `/profile` | Nome, favoritos, endereços |

Estado persistido: `src/lib/store.ts` (Zustand + `localStorage`).

## Qualidade

```bash
npm run typecheck
npm run build
npm test
node scripts/browser-smoke.mjs
```

## Unificação com pediu-mobile

Documentação completa: [pediu-mobile/docs/UNIFICACAO_REPOSITORIOS.md](https://github.com/leonardoaranhaa/pediu-mobile/blob/main/docs/UNIFICACAO_REPOSITORIOS.md) e [README multi-repo](../README.md).
