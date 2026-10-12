#!/usr/bin/env node
/**
 * Reforça titles/descriptions das homes e loja/onde-comprar com termos locais
 * de sensor trincado/quebrado (Crash Fix). Evita regressão para copy de tatuagem.
 * Preferir scripts/enrich-seo-campanha.mjs para a campanha completa.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const enrich = path.join(ROOT, 'scripts', 'enrich-seo-campanha.mjs');
const r = spawnSync(process.execPath, [enrich], { stdio: 'inherit' });
process.exit(r.status || 0);
