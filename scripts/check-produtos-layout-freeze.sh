#!/usr/bin/env bash
# Fail if #produtos layout freeze is violated.
# See .cursor/rules/produtos-layout-freeze.mdc
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
fail=0

if ! grep -q 'width: min(100%, 380px)' style.css; then
  echo "FAIL: style.css missing wrap width min(100%, 380px)"
  fail=1
fi

if ! grep -q '#produtos .btn-product-cta' style.css; then
  echo "FAIL: style.css missing #produtos .btn-product-cta"
  fail=1
fi

# Compact CTA (Tattoo): must be inline-block near the #produtos CTA rule
if ! awk '/#produtos \.btn-product-cta \{/,/^\}/ {print}' style.css | grep -q 'display: inline-block'; then
  echo "FAIL: #produtos .btn-product-cta must be display: inline-block"
  fail=1
fi

# Forbidden: JS that sizes the gallery from measured benefits/media
if grep -nE 'wrap\.style\.(width|height)\s*=\s*(width|height|mediaW|h)\b' js/stf-product-gallery.js; then
  echo "FAIL: gallery JS size sync reintroduced"
  fail=1
fi
if grep -nE 'cta\.style\.width\s*=\s*(width|mediaW|h)\b' js/stf-product-gallery.js; then
  echo "FAIL: CTA width sync reintroduced"
  fail=1
fi

for f in index.html en/index.html it/index.html de/index.html es/index.html pl/index.html sl/index.html; do
  if [[ -f "$f" ]] && grep -q 'product-image-wrap--lg' "$f"; then
    echo "FAIL: $f still has product-image-wrap--lg"
    fail=1
  fi
done

if [[ "$fail" -ne 0 ]]; then
  echo "produtos-layout-freeze: FAILED"
  exit 1
fi
echo "produtos-layout-freeze: OK"
exit 0
