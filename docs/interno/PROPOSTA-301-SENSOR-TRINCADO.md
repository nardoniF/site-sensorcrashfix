# Proposta 301 — `/sensor-trincado.html` (não aplicada)

## Contexto
O Search Console mostra impressões para `https://www.sensorcrashfix.com.br/sensor-trincado.html` (e eventualmente `.com`), mas o arquivo **não existe** no pin `c4ac0135` nem no PR #75.

## Destino sugerido (301)
| Origem | Destino 301 | Motivo |
|--------|-------------|--------|
| `https://www.sensorcrashfix.com.br/sensor-trincado.html` | `https://www.sensorcrashfix.com.br/` | Home PT concentra o intent “sensor trincado / reparo óptico”; título/H1 alinhados. |
| `https://www.sensorcrashfix.com/sensor-trincado.html` (se houver hits) | `https://www.sensorcrashfix.com/` | Home EN equivalente. |

## Alternativa
`/loja.html` — se a prioridade for conversão direta em vez de conteúdo SEO da home.

## Implementação (após ok)
No Worker proxy (`cloudflare/scf-com-proxy.js` e equivalente `.com.br`): regra de path exact match → `301` com `Location`. Não criar HTML stub indexável.

**Aguardando ok explícito antes de aplicar.**
