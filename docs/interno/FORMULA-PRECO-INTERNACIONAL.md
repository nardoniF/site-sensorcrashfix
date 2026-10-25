# Fórmula de preço internacional (Sensor CrashFix)

**Regra de integração (2026-10-24):** o preço-base da lente internacional é o do **PIN** (`optical-lens-intl.price = 72,9` BRL). **Não** adotar `62,9` do PR #75 em nenhum arquivo.

## Fórmula

```
preço_lista_moeda = arredondar_2(
  price_BRL × (1 + intlMarkupPercent / 100) × fx_rate
)
```

Onde:

| Símbolo | Valor (lente smartwatch intl) | Onde vive |
|--------|-------------------------------|-----------|
| `price_BRL` | **72,9** | `data/store-config.json` → `products[].id = optical-lens-intl` → `price` (e espelho no KV `/config` do Worker) |
| `intlMarkupPercent` | **130** (= ×2,3) | mesmo produto → `intlMarkupPercent` (default código: `DEFAULT_INTL_MARKUP_PERCENT = 130` em `api/intl-money.js`) |
| `intlBaseBrl` | **167,67** (= 72,9 × 2,3) | cache derivado no produto (`intlBaseBrl`); recalculado em saves Admin via `intlBaseBrl()` |
| `fx_rate` | 1 BRL → moeda visitante | Worker `GET /fx/rate?to=USD|EUR|PLN|SEK|NOK` (`api/worker.js`); cliente `js/stf-money.js` → `loadRate()` |
| Arredondamento produto | 2 casas (SEK/NOK: 0 no registry) | `applyFxAmount` / `roundFx` no checkout; SEK/NOK decimals=0 em `DEFAULT_INTL_CURRENCIES` |
| Frete intl | `internationalShipping[CC].price` em **BRL**, convertido **sem** markup de produto | `data/store-config.json` / KV `internationalShipping`; checkout aplica só `× fx_rate` |
| Total checkout | subtotal (linhas com markup×FX) + frete (FX puro) + taxas gateway se houver | `js/checkout.js` |

Exemplo com cotação congelada nesta regressão (`date=2026-10-23`, USD rate `0,19816`):

`72,9 × 2,3 × 0,19816 ≈ 33,23 USD` (lista teórica).

Na prática a **loja/.com** costuma exibir `priceUsd` / `priceEur` **já gravados** no KV (`/config`) quando existem (`js/stf-money.js` → `configuredForeignPrice` / `formatProductForVisitor`). Esses campos são o resultado da última aplicação Admin/markup×FX — podem divergir levemente da cotação “agora” até o próximo sync.

## Moedas por idioma/país (visitante)

| Path / host | Moeda de exibição |
|-------------|-------------------|
| `.com.br` / PT | BRL |
| `/` EN (`.com`) | USD |
| `/de` `/it` `/es` `/sl` `/fr` `/nl` `/fi` | EUR |
| `/pl` | PLN |
| `/sv` | SEK |
| `/no` | NOK |

Mapeamento: `js/stf-money.js` (`COUNTRY_CURRENCY` + `visitorCountry()`).

## Fontes e momento da cotação

- Endpoint: `https://api.sensorcrashfix.com.br/fx/rate?to=CODE`
- Cache cliente: 1 h em memória (`stf-money` `cache`)
- Cache Worker: conforme implementação de `/fx/rate` (resposta inclui `date`, `fetchedAt`)
- **Regressão:** cotação congelada em `/opt/cursor/artifacts/price-regression/fx-frozen.json` e interceptada no headless para antes×depois idênticos.

## Kit BR vs lente intl

| Produto | Mercado | `price` PIN (git) | Markup intl |
|---------|---------|-------------------|-------------|
| `kit-sensor-crashfix` | BR | 62,9 (git); **KV live pode diferir** (ex.: 82,9) | n/a no BR |
| `optical-lens-intl` | INT | **72,9** | **130%** |

A UI de produção lê prioritariamente o **Worker `/config` (KV)**. O arquivo git é fallback/espelho. Na integração SEO **não** alteramos preço nem links de compra do PIN.

## O que NÃO fazer

- Não gravar `optical-lens-intl.price = 62,9` (valor do PR #75).
- Não remover `intlMarkupPercent: 130` da lente.
- Não aplicar markup de produto sobre frete.
