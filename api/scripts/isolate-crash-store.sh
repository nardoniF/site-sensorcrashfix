#!/usr/bin/env bash
# Cria KV + D1 exclusivos do Crash e atualiza api/wrangler.toml.
# NÃO toca no Tattoo. Rode no Mac, na pasta api/, com wrangler logado.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TOML="$ROOT/wrangler.toml"
cd "$ROOT"

if [[ ! -f "$TOML" ]]; then
  echo "wrangler.toml não encontrado em $ROOT" >&2
  exit 1
fi

if ! grep -q 'name = "sensorcrashfix-payments"' "$TOML"; then
  echo "Abortado: wrangler.toml não é do Worker sensorcrashfix-payments." >&2
  exit 1
fi

OLD_KV="$(grep -A2 '\[\[kv_namespaces\]\]' "$TOML" | grep '^id =' | head -1 | sed -E 's/.*"([^"]+)".*/\1/')"
OLD_D1="$(grep -A3 '\[\[d1_databases\]\]' "$TOML" | grep '^database_id =' | head -1 | sed -E 's/.*"([^"]+)".*/\1/')"

echo "==> Conta / Worker"
npx wrangler whoami
echo
echo "KV atual (provavelmente Tattoo): $OLD_KV"
echo "D1 atual:                       $OLD_D1"
echo

echo "==> Criando KV namespace scf-store (Crash only)…"
KV_OUT="$(npx wrangler kv namespace create scf-store --config wrangler.toml 2>&1 | tee /dev/stderr)" || true
KV_ID="$(printf '%s\n' "$KV_OUT" | grep -Eo 'id = "[a-f0-9-]{32,}"' | head -1 | sed -E 's/.*"([^"]+)".*/\1/')"
if [[ -z "$KV_ID" ]]; then
  KV_ID="$(printf '%s\n' "$KV_OUT" | grep -Eo '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}' | head -1 || true)"
fi
if [[ -z "$KV_ID" ]]; then
  echo "Não consegui ler o id do KV. Cole manualmente em wrangler.toml [[kv_namespaces]] id." >&2
  exit 1
fi
echo "KV novo: $KV_ID"

echo
echo "==> Criando D1 scf-data (Crash only: pedidos + cliques + marketplace)…"
D1_OUT="$(npx wrangler d1 create scf-data --config wrangler.toml 2>&1 | tee /dev/stderr)" || true
D1_ID="$(printf '%s\n' "$D1_OUT" | grep -Eo 'database_id = "[a-f0-9-]{32,}"' | head -1 | sed -E 's/.*"([^"]+)".*/\1/')"
if [[ -z "$D1_ID" ]]; then
  D1_ID="$(printf '%s\n' "$D1_OUT" | grep -Eo '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}' | head -1 || true)"
fi
if [[ -z "$D1_ID" ]]; then
  echo "Não consegui ler o database_id do D1. Cole manualmente em wrangler.toml." >&2
  exit 1
fi
echo "D1 novo: $D1_ID"

python3 - <<PY
from pathlib import Path
path = Path("$TOML")
text = path.read_text()
old_kv, new_kv = "$OLD_KV", "$KV_ID"
old_d1, new_d1 = "$OLD_D1", "$D1_ID"
if old_kv and old_kv in text:
    text = text.replace(f'id = "{old_kv}"', f'id = "{new_kv}"', 1)
else:
    raise SystemExit("KV id antigo não encontrado no toml")
# database_id + CF_D1_DATABASE_ID
if old_d1 and old_d1 in text:
    text = text.replace(f'database_id = "{old_d1}"', f'database_id = "{new_d1}"')
    text = text.replace(f'CF_D1_DATABASE_ID = "{old_d1}"', f'CF_D1_DATABASE_ID = "{new_d1}"')
else:
    raise SystemExit("D1 id antigo não encontrado no toml")
text = text.replace('database_name = "scf-clicks"', 'database_name = "scf-data"', 1)
text = text.replace("# D1 scf-clicks", "# D1 scf-data")
path.write_text(text)
print("wrangler.toml atualizado.")
PY

echo
echo "==> Aplicando migrations D1 remotas…"
npx wrangler d1 migrations apply scf-data --remote --config wrangler.toml

echo
echo "==> Deploy Worker com bindings novos…"
npx wrangler deploy --config wrangler.toml

echo
echo "OK. Admin Crash deve mostrar 0 pedidos (base vazia)."
echo "Tattoo continua intacto (KV/D1 antigos não foram apagados)."
echo "Secrets de pagamento já no Worker Crash continuam válidos."
echo "Reabra https://www.sensorcrashfix.com.br/admin.html (hard refresh)."
