# Deploy — Sensor Crash Fix (reusa infra do Tattoo)

Site/marca/produto públicos são **Sensor Crash Fix** (`sensorcrashfix.com.br` / `.com`).
A operação (pagamentos, frete, e-mail, WhatsApp) **reaproveita a mesma infraestrutura** que você já tem no Sensor Tattoo Fix — não precisa recriar Asaas, Mercado Pago, Correios, Uber, PayPal/Stripe, Z-API, Resend do zero.

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

- `CF_ACCOUNT_ID` e IDs de KV/D1 apontam para a **mesma conta** (podem ser os mesmos namespaces do Tattoo se quiser **um único Admin/pedidos**, ou crie `scf-*` novos se preferir separar dados).
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
