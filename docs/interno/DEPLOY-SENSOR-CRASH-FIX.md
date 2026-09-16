# Deploy — Sensor Crash Fix (ops paralelo ao Tattoo)

Site/marca/produto públicos são **Sensor Crash Fix** (`sensorcrashfix.com.br` / `.com`).

**Provedores** (Asaas, Mercado Pago, Correios, PayPal…): pode reutilizar as **mesmas contas/chaves** do Tattoo — copie os secrets no Worker Crash.

**Dados** (pedidos, cliques, sessões, fórum, OAuth ML/Amazon/Shopee): **100% separados**. Nunca aponte `STORE_KV` / D1 do Crash para os IDs do Tattoo.

## O que é novo (público)

| Item | Valor |
|------|--------|
| Repo | `nardoniF/site-sensorcrashfix` |
| Domínios | `www.sensorcrashfix.com.br`, `www.sensorcrashfix.com` |
| API host | `api.sensorcrashfix.com.br` |
| Worker pagamentos | `sensorcrashfix-payments` |
| Worker proxy | `scf-com-proxy` (`cloudflare/scf-com-proxy.js`) |
| CNAME Pages | `www.sensorcrashfix.com.br` |
| KV (pedidos/sessão) | `scf-store` — **exclusivo Crash** |
| D1 (pedidos/cliques) | `scf-data` — **exclusivo Crash** |

## O que reutilizar vs o que apartar

| Reutilizar (secrets / contas) | Apartar (bindings / dados) |
|-------------------------------|----------------------------|
| `MP_*`, `ASAAS_*`, `PAYPAL_*`, `STRIPE_*` | `STORE_KV` → namespace `scf-store` novo |
| `CORREIOS_*`, `ZAPI_*`, `RESEND_*` | `CLICKS_DB` → D1 `scf-data` novo |
| `ADMIN_PASSWORD`, `CF_API_TOKEN` | Worker `sensorcrashfix-payments` (já é outro) |
| Mesma conta Cloudflare | Webhooks MP/Asaas também para `api.sensorcrashfix.com.br` |

## Isolar dados agora (Admin Crash listando pedidos do Tattoo)

No Mac, pasta `api/` deste repo (já logado no wrangler):

```bash
cd api
npm run isolate-store
```

Isso cria KV `scf-store` + D1 `scf-data`, atualiza `wrangler.toml`, aplica migrations e faz deploy.
O Admin Crash fica **vazio** (0 pedidos). O Tattoo **não** é apagado.

Manual equivalente:

```bash
npx wrangler kv namespace create scf-store --config wrangler.toml
npx wrangler d1 create scf-data --config wrangler.toml
# cole os ids em wrangler.toml (STORE_KV id + database_id + CF_D1_DATABASE_ID)
# database_name = "scf-data"
npx wrangler d1 migrations apply scf-data --remote --config wrangler.toml
npx wrangler deploy --config wrangler.toml
```

## Passos rápidos (setup completo)

```bash
# 1) DNS Cloudflare: zonas sensorcrashfix.com.br e .com
#    A/CNAME Pages → GitHub Pages; api → Worker route

# 2) Dados isolados (obrigatório — não herda do Tattoo)
cd api
npm run isolate-store

# 3) Secrets no Worker Crash (mesmos valores do Tattoo, put de novo)
npx wrangler secret put ADMIN_PASSWORD --config wrangler.toml
npx wrangler secret put MP_ACCESS_TOKEN --config wrangler.toml
npx wrangler secret put ASAAS_API_KEY --config wrangler.toml
# …demais secrets já usados no Tattoo
npx wrangler secret list --config wrangler.toml

# 4) Proxy .com/.com.br (pin COMMIT após cada push)
cd ../cloudflare
# edite COMMIT em scf-com-proxy.js para o SHA do push
npx wrangler deploy
```

### Se o admin diz “ADMIN_PASSWORD não configurado”

Isso vem do Worker **`sensorcrashfix-payments`**, não do Tattoo.

```bash
cd api
npx wrangler secret put ADMIN_PASSWORD --config wrangler.toml
```

### Se o admin Crash mostra pedidos do Tattoo

KV/D1 ainda compartilhados → `npm run isolate-store` (acima).

## Produto (posicionamento)

- **Problema:** sensor trincado / pedaço faltando → perde vedação e/ou leitura; risco de piorar.
- **Solução:** lente/cobertura com adesivo forte à prova d’água; mm um pouco maiores (~27).
- **Caveat FAQ:** se caiu **metade** do módulo, lente sozinha é arriscada — suporte caso a caso.
- **Não é** solução para tatuagem / pele que bloqueia sensor (isso é a outra linha).

## Checklist humano ainda pendente

- [ ] Rodar `npm run isolate-store` e confirmar Admin Crash com 0 pedidos
- [ ] Webhooks MP/Asaas apontando também (ou só) para `https://api.sensorcrashfix.com.br/...`
- [ ] Contas sociais Crash (`@sensorcrashfix`) ou esconder canais até existir
- [ ] E-mails `contato@` / `support@` / `EMAIL_FROM` nos domínios Crash
- [ ] Listagens ML/Shopee/Amazon do Crash (apps/oauth separados se quiser catálogo distinto)
- [ ] Atualizar `COMMIT` no `scf-com-proxy.js` após merge/push
- [ ] GA4 / Formsubmit / Apple Pay domain verification nos hosts Crash
