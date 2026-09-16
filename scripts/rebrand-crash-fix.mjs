#!/usr/bin/env node
/**
 * Mechanical rebrand: Sensor Crash Fix → Sensor Crash Fix
 * Domains, emails, worker names, utm, logo text. Does NOT rewrite narrative copy.
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');

const SKIP_DIRS = new Set([
  '.git',
  'node_modules',
  '.wrangler',
  'images', // binary + handled separately
]);

const SKIP_EXT = new Set([
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico',
  '.woff', '.woff2', '.ttf', '.eot', '.pdf', '.DS_Store',
  '.lock',
]);

/** Ordered longest-first replacements */
const REPLACEMENTS = [
  // Social handles BEFORE generic substring replace
  ['tiktok.com/@sensorcrashfix', 'tiktok.com/@sensorcrashfix'],
  ['youtube.com/@Sensorcrashfix', 'youtube.com/@Sensorcrashfix'],
  ['instagram.com/sensorcrashfix', 'instagram.com/sensorcrashfix'],

  // Domains / hosts
  ['www.sensorcrashfix.com.br', 'www.sensorcrashfix.com.br'],
  ['api.sensorcrashfix.com.br', 'api.sensorcrashfix.com.br'],
  ['sensorcrashfix.com.br', 'sensorcrashfix.com.br'],
  ['www.sensorcrashfix.com', 'www.sensorcrashfix.com'],
  ['sensorcrashfix.com', 'sensorcrashfix.com'],
  ['support@sensorcrashfix.com', 'support@sensorcrashfix.com'],
  ['contato@sensorcrashfix.com.br', 'contato@sensorcrashfix.com.br'],
  ['pedidos@sensorcrashfix.com.br', 'pedidos@sensorcrashfix.com.br'],

  // Workers / repos / packages
  ['sensorcrashfix-payments', 'sensorcrashfix-payments'],
  ['site-sensorcrashfix', 'site-sensorcrashfix'],
  ['scf-com-proxy', 'scf-com-proxy'],
  ['scf-clicks', 'scf-clicks'],

  // Brand display (order matters)
  ['Sensor Crash Fix', 'Sensor Crash Fix'],
  ['SENSOR CRASH FIX', 'SENSOR CRASH FIX'],
  ['SENSOR<span>CRASH FIX</span>', 'SENSOR<span>CRASH FIX</span>'],
  ['SENSOR<span class="logo-accent">Crash Fix</span>', 'SENSOR<span class="logo-accent">Crash Fix</span>'],
  ['Sensor <span class="logo-accent">Crash Fix</span>', 'Sensor <span class="logo-accent">Crash Fix</span>'],
  ['SensorCrashFix', 'SensorCrashFix'],
  ['Sensorcrashfix', 'Sensorcrashfix'],
  ['sensorcrashfix', 'sensorcrashfix'],

  // Product ids / slugs (common)
  ['kit-sensor-crashfix', 'kit-sensor-crashfix'],
  ['kit-smartband-crashfix', 'kit-smartband-crashfix'],
  ['Kit Smartband Crash Fix', 'Kit Smartband Crash Fix'],
  ['Smartband Crash Fix', 'Smartband Crash Fix'],

  // Image path rename
  ['/images/brand/sensorcrashfix.jpg', '/images/brand/sensorcrashfix.jpg'],
  ['images/brand/sensorcrashfix.jpg', 'images/brand/sensorcrashfix.jpg'],
  ['/site/sensorcrashfix.jpg', '/images/brand/sensorcrashfix.jpg'],
];

function shouldSkip(rel) {
  const parts = rel.split(path.sep);
  if (parts.some((p) => SKIP_DIRS.has(p))) return true;
  const ext = path.extname(rel).toLowerCase();
  if (SKIP_EXT.has(ext)) return true;
  return false;
}

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    const rel = path.relative(ROOT, full);
    if (ent.isDirectory()) walk(full, out);
    else if (!shouldSkip(rel)) out.push(full);
  }
  return out;
}

function transform(text) {
  let t = text;
  for (const [from, to] of REPLACEMENTS) {
    if (t.includes(from)) t = t.split(from).join(to);
  }
  return t;
}

const files = walk(ROOT);
let changed = 0;
for (const file of files) {
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  if (raw.includes('\u0000')) continue; // binary
  const next = transform(raw);
  if (next !== raw) {
    fs.writeFileSync(file, next);
    changed++;
    console.log('updated', path.relative(ROOT, file));
  }
}
console.log(`Done. ${changed} files updated.`);
