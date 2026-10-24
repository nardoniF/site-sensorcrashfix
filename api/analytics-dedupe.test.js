import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const analytics = fs.readFileSync(path.join(root, 'js', 'analytics.js'), 'utf8');
const worker = fs.readFileSync(path.join(root, 'api', 'worker.js'), 'utf8');
const admin = fs.readFileSync(path.join(root, 'js', 'admin.js'), 'utf8');

test('analytics: WhatsApp dedupe window longer than default', () => {
  assert.match(analytics, /LOG_DEDUP_WHATSAPP_MS\s*=\s*8000/);
  assert.match(analytics, /destino === 'whatsapp' \? LOG_DEDUP_WHATSAPP_MS/);
});

test('analytics: flush reuses client_event_id (no forced q_ prefix)', () => {
  assert.match(analytics, /Reuse original client_event_id/);
  assert.doesNotMatch(analytics, /client_event_id:\s*'q_'\s*\+/);
});

test('worker: claimClickEvent before persist for click + pixel', () => {
  assert.match(worker, /claimClickEvent\(eventId\)/);
  const handleIdx = worker.indexOf('async function handleLogClick');
  const pixelIdx = worker.indexOf('async function handleLogClickPixel');
  const slice = worker.slice(handleIdx, handleIdx + 1200);
  assert.match(slice, /claimClickEvent/);
  assert.doesNotMatch(slice, /markClickEventSeen/);
  const pslice = worker.slice(pixelIdx, pixelIdx + 900);
  assert.match(pslice, /claimClickEvent/);
});

test('admin: WhatsApp intent summary (events vs visitors vs sessions)', () => {
  assert.match(admin, /function summarizeWhatsappIntent/);
  assert.match(admin, /WhatsApp \(visitantes com ≥1\)/);
  assert.match(admin, /WhatsApp \(sessões lógicas com ≥1\)/);
});
