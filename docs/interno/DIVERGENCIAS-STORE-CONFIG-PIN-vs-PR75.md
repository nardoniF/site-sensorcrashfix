# Divergências store-config: PIN vs PR #75 (para decisão)

**Integração:** mantivemos o arquivo do PIN. Nada de preço/link do PR foi aplicado.

| Chave | Campo | PIN (mantido) | PR #75 (não adotado) |
|-------|-------|---------------|----------------------|
| `optical-lens-intl` | price | 72.9 | 62.9 |
| `optical-lens-intl` | intlMarkupPercent | 130 | None |
| `optical-lens-intl` | intlBaseBrl | 167.67 | None |
| `optical-lens-intl` | priceUsd | None | 12.99 |
| `optical-lens-intl` | priceEur | None | 11.99 |
| `optical-lens-smartband-intl` | intlMarkupPercent | 130 | None |
| `optical-lens-smartband-intl` | intlBaseBrl | 144.67 | None |
| `optical-lens-smartband-intl` | priceUsd | None | 12.99 |
| `optical-lens-smartband-intl` | priceEur | None | 11.99 |
| `channels.stores.mercadolivre.url` | url | https://produto.mercadolivre.com.br/MLB-6831525504-smartwatch-x-rachadura-sensor-nao-funciona-lentes-reparadoras-_JM | https://www.mercadolivre.com.br/reparo-sensor-trincado-smartwatch-lente-optica-restaura/p/MLB2115658430 |
| `homeFaq` | ids | faq-1,faq-2,faq-3,faq-4,faq-5,faq-6,faq-7,faq-8,faq-9,faq-10,faq-11,faq-12,faq-13 | faq-compat,faq-charge,faq-duration,faq-warranty,faq-water,faq-tattoofix,faq-module,faq-install |

## Decisão pendente do usuário
- Preço `optical-lens-intl`: PIN **72,9** (com markup 130%) vs PR **62,9** → **mantido PIN** por regra explícita.
- Link Mercado Livre: PIN MLB-683… vs PR MLB2115658430 → **mantido PIN** até ok.
- FAQ homeFaq: PIN 13 itens vs PR 8 (SEO estático no HTML; JSON do PIN permanece).
- Fretes intl no git PIN podem diferir do KV live (`/config`) — a UI usa KV; regressão headless compara o que o visitante vê.