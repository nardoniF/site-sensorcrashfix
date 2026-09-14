# Aplicar POC Auto Key Supply no site-3n20

Esta pasta foi gerada porque o Cloud Agent rodou no ambiente do `site-sensortattoofix` e **não tinha push** em `nardoniF/site-3n20`.

## Opção A — bundle (recomendado)

```bash
git clone https://github.com/nardoniF/site-3n20.git
cd site-3n20
git fetch ../transfer/site-3n20-autokeysupply/autokeysupply-poc.bundle cursor/autokeysupply-poc-45cd:cursor/autokeysupply-poc-45cd
git checkout cursor/autokeysupply-poc-45cd
git push -u origin cursor/autokeysupply-poc-45cd
# abrir PR para main
```

## Opção B — copiar pasta

Copie `autokeysupply/` para a raiz do `site-3n20` e aplique o patch (ou edite `index.html` / `ecommerce/index.html` com o link “Ver POC”).

URL alvo após merge + GitHub Pages: `https://www.3n20.com.br/autokeysupply/`

## Conteúdo

- Mini-site estático em `/autokeysupply/`
- Link no portfólio e na página `/ecommerce/`
- Sem backend — só protótipo visual
