# Posicionamento — resistência à água / vedação (Sensor CrashFix)

**Branch:** `cursor/agua-vedacao-posicionamento-69c0` (base: `integracao/seo-sobre-pin`)  
**Escopo:** copy de marketing/FAQ HTML nos 12 idiomas. Sem preço, frete, checkout, analytics, pin ou deploy.

## Evidência disponível no repositório

| Fonte | O que sustenta | O que NÃO sustenta |
|-------|----------------|--------------------|
| `docs/manuais/manual-instalacao-sensor-crash-fix.html` | Finalidade: lente maior que o vidro do sensor **restaura a vedação**; cura **48 h** treino / **72 h** antes de molhar | Profundidade, ATM, IPX, laudo de laboratório |
| `docs/cartas/carta-agradecimento-intl.html` + `data/letter-l10n.json` | Cronograma de cura: **72 h** = exposição à água (natação/duchas na carta) | Certificação do relógio completo; garantia universal por modelo |
| Design do produto (diâmetro ampliado + adesivo óptico) descrito no manual e FAQs históricas | Mecanismo de **selagem da área danificada** | “À prova d’água 100%” / reemissão do rating de fábrica |
| Busca em `docs/`, `images/`, PDFs do repo | Nenhum laudo IPX/ATM/pressão anexado | Inventar certificação ou profundidade |

**Inconsistência histórica:** FAQ do `store-config` (pin) falava em **24 h** e “totalmente liberado para banho e treinos”; o **manual e a carta** usam **72 h** para água. Nesta revisão alinhamos a **72 h** (fonte mais conservadora e documentada no kit).

## Diferenciação usada no copy

1. **Proteção da região reparada** — cobre sujeira/impacto na zona do trinco.  
2. **Recuperação da vedação** — finalidade do produto no manual (selar a área danificada).  
3. **Resistência à água no ponto reparado / uso cotidiano após cura** — benefício comercial legítimo, condicionado à aplicação e à cura.  
4. **Rating IPX/ATM de fábrica do relógio completo / mergulho / profundidade** — **não alegado** (sem laudo no repo).

## Tabela — alegação atual (integração SEO) → proposta

| # | Contexto | Alegação atual (pós-SEO conservador) | Alegação proposta | Evidência | Status |
|---|----------|--------------------------------------|-------------------|-----------|--------|
| A1 | Hero / proposta | Só “cobre e protege”; silêncio sobre vedação/água | Cobre a fissura, **ajuda a recuperar a vedação** da região do sensor e a **resistência à água no ponto reparado**, sem trocar o módulo | Manual (“restaura a vedação”) | **Aplicar** |
| A2 | Benefício (#produtos) | “Proteção… não recomendado submergir” (água só como limite) | Benefício: **Recupera a vedação / resistência à água na região reparada**; após cura completa do adesivo | Manual + carta (cura) | **Aplicar** |
| A3 | Card problema | “Evite submergir até avaliar” | Manter como **problema do trinco sem cobertura** (perda de vedação / risco com água) | Lógica de produto + pin | **Manter/ajustar** |
| A4 | FAQ água | Protege de respingos; **não submergir**; sem laudo evite natação/banho | Sim: projetada para **reselar a área danificada** e ajudar a **restaurar a resistência à água nessa região**. Após **72 h** de cura (manual), uso com água no dia a dia (suor, chuva, ducha) conforme orientação do kit. **Não reemite** o IPX/ATM de fábrica nem garante profundidade/mergulho | Manual 72 h; ausência de laudo IPX | **Aplicar** |
| A5 | “À prova d’água 100%” / IPX inventado | Já removido no SEO | Continuar **sem** certificação inventada | Sem laudo no repo | **Preservar correção SEO** |
| A6 | FAQ store-config 24 h + “totalmente liberado” | Ainda no JSON (pode realimentar JS) | Alinhar respostas faq água à **72 h** + limites A4 (sem mudar preços/links) | Manual/carta | **Aplicar** (só texto FAQ água) |
| A7 | Natação livre sem condição | Proibida de forma absoluta no FAQ SEO | Permitir menção a natação/ducha **somente após cura 72 h** e **sem** garantir profundidade igual ao rating original | Carta cure72h | **Aplicar com limite** |
| A8 | Separação TattooFix / schema sem estrelas falsas | OK | Intactas | PR SEO | **Não mexer** |

## O que ainda depende de comprovação (não alegar até existir)

- Laudo IPX / ATM / pressão / profundidade para o kit aplicado  
- Garantia de que **todos** os modelos recuperam o **mesmo** rating de fábrica  
- Mergulho técnico ou uso profissional submerso  
- Qualquer número de metros/bar não presente no repo
