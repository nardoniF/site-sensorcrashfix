# Deploy — Sensor Crash Fix (reusa infra do Tattoo)

Site/marca/produto públicos são **Sensor Crash Fix** (`sensorcrashfix.com.br` / `.com`).
A operação **reaproveita os mesmos provedores** do Tattoo (Asaas, MP, Correios, PayPal/Stripe…), mas o **Worker Crash é separado**: copie os secrets e use KV/D1 exclusivos (`scf-store` / `scf-data`).

## O que é novo (público)

| Item | Valor |
|------|--------|
| Repo | `nardoniF/site-sensorcrashfix` |
| Domínios | `www.sensorcrashfix.com.br`, `www.sensorcrashfix.com` |
| API host | `api.sensorcrashfix.com.br` |
| Worker pagamentos | `sensorcrashfix-payments` |
| Worker proxy | `scf-com-proxy` (`cloudflare/scf-com-proxy.js`) |
| CNAME Pages | `www.sensorcrashfix.com.br` |

## O que reutilizar do Tattoo (ops)

Copie os **mesmos secrets** já configurados no Worker do Tattoo (mesma conta Cloudflare / mesmos provedores):

- `MP_ACCESS_TOKEN`, `ASAAS_API_KEY`, `ASAAS_WEBHOOK_TOKEN`
- `PAYPAL_*`, `STRIPE_*` (se usar no .com)
- `CORREIOS_*`, Z-API (`ZAPI_*`), `RESEND_API_KEY`, `EMAIL_FROM`
- `ADMIN_PASSWORD`, `CF_API_TOKEN`
- ML / Amazon / Shopee — só se for vender Crash nesses canais com as mesmas apps

No `api/wrangler.toml` desta branch:

- `CF_ACCOUNT_ID` na mesma conta Cloudflare.
- **KV `scf-store` + D1 `scf-data` exclusivos do Crash** (não reutilizar IDs do Tattoo — senão o Admin mistura vendas/pedidos/cliques).
- Rotas públicas já vão para `api.sensorcrashfix.com.br` / zonas Crash.

## Passos rápidos

```bash
# 1) DNS Cloudflare: zonas sensorcrashfix.com.br e .com
#    A/CNAME Pages → GitHub Pages; api → Worker route

# 2) Secrets (iguais aos do Tattoo)
cd api
npx wrangler secret put MP_ACCESS_TOKEN
npx wrangler secret put ASAAS_API_KEY
# …demais secrets já usados no Tattoo

# 3) Deploy API
npx wrangler deploy

# 4) Proxy .com/.com.br (pin COMMIT após cada push)
cd ../cloudflare
# edite COMMIT em scf-com-proxy.js para o SHA do push
npx wrangler deploy
```

## Produto (posicionamento)

- **Problema:** sensor trincado / pedaço faltando → perde vedação e/ou leitura; risco de piorar.
- **Solução:** lente/cobertura com adesivo forte à prova d’água; mm um pouco maiores (~27).
- **Caveat FAQ:** se caiu **metade** do módulo, lente sozinha é arriscada — suporte caso a caso.
- **Não é** solução para tatuagem / pele que bloqueia sensor (isso é a outra linha).

## Checklist humano ainda pendente

- [ ] Contas sociais Crash (`@sensorcrashfix`) ou esconder canais até existir
- [ ] E-mails `contato@` / `support@` nos domínios novos
- [ ] Listagens ML/Shopee/Amazon do Crash (links da home apontam à loja oficial por enquanto)
- [ ] Fotos reais de produto (placeholders gerados no repo; ver `docs/interno/INVENTARIO-IMAGENS-CRASH.md`)
- [ ] Atualizar `COMMIT` no `scf-com-proxy.js` após merge/push
- [ ] GA4 / Formsubmit / Apple Pay domain verification nos hosts Crash


## Copiar secrets (obrigatório)

O Worker Crash hoje pode ter só `ADMIN_PASSWORD`. Sem o restante, a aba **API → Status das integrações** fica “Não configurado”.

No Mac (com wrangler logado), para cada secret do Tattoo:

```bash
cd api
# Liste o que falta no Crash:
npx wrangler secret list --name sensorcrashfix-payments

# Cole os mesmos valores do Tattoo (Dashboard → Workers → sensortattoofix-payments → Settings → Variables
# ou re-cole do cofre/1Password):
npx wrangler secret put MP_ACCESS_TOKEN
npx wrangler secret put ASAAS_API_KEY
npx wrangler secret put ASAAS_WEBHOOK_TOKEN
npx wrangler secret put PAYPAL_CLIENT_ID
npx wrangler secret put PAYPAL_CLIENT_SECRET
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_PUBLISHABLE_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put CORREIOS_USER
npx wrangler secret put CORREIOS_PASSWORD
npx wrangler secret put CORREIOS_CONTRACT
npx wrangler secret put CORREIOS_COMMERCIAL_CONTRACT
npx wrangler secret put SUPERFRETE_TOKEN
npx wrangler secret put UBER_DIRECT_CLIENT_ID
npx wrangler secret put UBER_DIRECT_CLIENT_SECRET
npx wrangler secret put UBER_DIRECT_CUSTOMER_ID
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CF_API_TOKEN
npx wrangler secret put GA4_API_SECRET
npx wrangler secret put STORE_URL
npx wrangler secret put ML_CLIENT_ID
npx wrangler secret put ML_CLIENT_SECRET
npx wrangler secret put ML_REFRESH_TOKEN
npx wrangler secret put AMZ_LWA_CLIENT_ID
npx wrangler secret put AMZ_LWA_CLIENT_SECRET
npx wrangler secret put AMZ_LWA_REFRESH_TOKEN
npx wrangler secret put SHOPEE_PARTNER_KEY
# Opcional WhatsApp:
# npx wrangler secret put ZAPI_INSTANCE_ID
# npx wrangler secret put ZAPI_TOKEN
```

Depois: `npx wrangler deploy` e confira Admin → API → Status das integrações.
