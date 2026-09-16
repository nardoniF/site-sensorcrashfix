#!/usr/bin/env python3
"""Rewrite Crash Fix positioning: store-config + home narrative leftovers."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path("/workspace")

# --- store-config ---
cfg_path = ROOT / "data" / "store-config.json"
cfg = json.loads(cfg_path.read_text(encoding="utf-8"))

PRODUCT_COPY = {
    "kit-sensor-crashfix": {
        "name": "Kit Sensor Crash Fix",
        "nameEn": "Sensor Crash Fix Lens",
        "nameIt": "Lente Sensor Crash Fix",
        "nameDe": "Sensor Crash Fix Linse",
        "nameEs": "Lente Sensor Crash Fix",
        "namePl": "Soczewka Sensor Crash Fix",
        "nameSl": "Leča Sensor Crash Fix",
        "description": "Lente/cobertura para sensor de smartwatch rachado — restaura vedação e uso",
        "descriptionEn": "Lens cover for a cracked smartwatch sensor — restores seal and daily use",
        "descriptionIt": "Lente di copertura per sensore smartwatch incrinato — ripristina tenuta e uso",
        "descriptionDe": "Abdecklinse für gerissenen Smartwatch-Sensor — stellt Dichtung und Nutzung wieder her",
        "descriptionEs": "Lente de cobertura para sensor de smartwatch agrietado — restaura sellado y uso",
        "descriptionPl": "Soczewka ochronna na pęknięty czujnik smartwatcha — przywraca uszczelnienie i użytkowanie",
        "descriptionSl": "Zaščitna leča za počeno tipalo pametne ure — obnovi tesnjenje in uporabo",
        "sensorMm": 27,
        "image": "https://www.sensorcrashfix.com.br/images/brand/sensorcrashfix.jpg",
    },
    "kit-smartband-crashfix": {
        "name": "Kit Smartband Crash Fix",
        "nameEn": "Smartband Crash Fix Kit",
        "nameIt": "Kit Smartband Crash Fix",
        "nameDe": "Smartband Crash Fix Kit",
        "nameEs": "Kit Smartband Crash Fix",
        "namePl": "Zestaw Smartband Crash Fix",
        "nameSl": "Komplet Smartband Crash Fix",
        "description": "Lente para sensor de smartband rachado — kit completo",
        "descriptionEn": "Lens for cracked smartband sensor — full kit",
        "descriptionIt": "Lente per sensore smartband incrinato — kit completo",
        "descriptionDe": "Linse für gerissenen Smartband-Sensor — komplettes Kit",
        "descriptionEs": "Lente para sensor de smartband agrietado — kit completo",
        "descriptionPl": "Soczewka na pęknięty czujnik opaski — pełny zestaw",
        "descriptionSl": "Leča za počeno tipalo pametne zapestnice — celoten komplet",
        "sensorMm": 27,
    },
    "optical-lens-smartband-intl": {
        "name": "SensorCrashFix Smartband Lens",
        "nameEn": "SensorCrashFix Smartband Lens",
        "nameIt": "Lente Smartband SensorCrashFix",
        "nameDe": "SensorCrashFix Smartband-Linse",
        "nameEs": "Lente Smartband SensorCrashFix",
        "namePl": "Soczewka Smartband SensorCrashFix",
        "nameSl": "Leča SensorCrashFix za pametno zapestnico",
        "description": "Lente de cobertura para sensor de smartband rachado.",
        "descriptionEn": "Cover lens for a cracked smartband optical sensor.",
        "descriptionIt": "Lente di copertura per sensore ottico smartband incrinato.",
        "descriptionDe": "Abdecklinse für gerissenen optischen Smartband-Sensor.",
        "descriptionEs": "Lente de cobertura para sensor óptico de smartband agrietado.",
        "descriptionPl": "Soczewka ochronna na pęknięty czujnik optyczny opaski.",
        "descriptionSl": "Zaščitna leča za počeno optično tipalo pametne zapestnice.",
        "sensorMm": 27,
    },
    "optical-lens-intl": {
        "name": "SensorCrashFix Optical Lens",
        "nameEn": "SensorCrashFix Optical Lens",
        "nameIt": "Lente ottica SensorCrashFix",
        "nameDe": "SensorCrashFix Optische Linse",
        "nameEs": "Lente óptica SensorCrashFix",
        "namePl": "Soczewka optyczna SensorCrashFix",
        "nameSl": "Optična leča SensorCrashFix",
        "description": "Lente de cobertura para sensor de smartwatch rachado.",
        "descriptionEn": "Cover lens for a cracked smartwatch optical sensor.",
        "descriptionIt": "Lente di copertura per sensore ottico smartwatch incrinato.",
        "descriptionDe": "Abdecklinse für gerissenen optischen Smartwatch-Sensor.",
        "descriptionEs": "Lente de cobertura para sensor óptico de smartwatch agrietado.",
        "descriptionPl": "Soczewka ochronna na pęknięty czujnik optyczny smartwatcha.",
        "descriptionSl": "Zaščitna leča za počeno optično tipalo pametne ure.",
        "sensorMm": 27,
    },
}

# top-level product mirror
if "product" in cfg:
    p = cfg["product"]
    p["name"] = "Kit Sensor Crash Fix"
    p["nameEn"] = "Sensor Crash Fix Lens"
    p["nameIt"] = "Lente Sensor Crash Fix"
    p["description"] = PRODUCT_COPY["kit-sensor-crashfix"]["description"]
    p["descriptionEn"] = PRODUCT_COPY["kit-sensor-crashfix"]["descriptionEn"]
    p["descriptionIt"] = PRODUCT_COPY["kit-sensor-crashfix"]["descriptionIt"]
    p["image"] = PRODUCT_COPY["kit-sensor-crashfix"]["image"]
    p["sensorMm"] = 27

for prod in cfg.get("products", []):
    pid = prod.get("id") or ""
    # migrate old ids if any remain
    if "cracks" in pid.lower():
        prod["id"] = pid.replace("cracks", "crash").replace("cracks", "Crash")
        prod["slug"] = (prod.get("slug") or pid).replace("cracks", "crash").replace("cracks", "Crash")
        pid = prod["id"]
    if pid in PRODUCT_COPY:
        prod.update(PRODUCT_COPY[pid])
    elif prod.get("sensorMm") == 25:
        prod["sensorMm"] = 27
    # scrub residual cracks wording in any product fields
    for k, v in list(prod.items()):
        if isinstance(v, str) and re.search(r"cracks|tatuad|tinta|ink", v, re.I):
            if k.startswith("name"):
                prod[k] = re.sub(r"(?i)cracks\s*fix|cracks\s*friendly|Sensor Crash Fix", "Sensor Crash Fix", v)
                prod[k] = re.sub(r"(?i)cracks", "Crash", prod[k])
            elif k.startswith("description"):
                # will be overwritten for main kits; for others neutralize
                nv = v
                nv = re.sub(r"(?i)pele danificado|danificado|rachadura|cracked sensor|sensore incrinato|gerissenem Sensor|piel danificado|pękniętym czujniku|počenem tipalu", "sensor rachado", nv)
                nv = re.sub(r"(?i)cracked glass|tinta da rachadura|ink blocking", "vidro trincado", nv)
                prod[k] = nv

cfg["siteUrl"] = "https://www.sensorcrashfix.com.br"
if isinstance(cfg.get("api"), dict):
    cfg["api"]["baseUrl"] = "https://api.sensorcrashfix.com.br"
if isinstance(cfg.get("formsubmit"), dict):
    cfg["formsubmit"]["email"] = "contato@sensorcrashfix.com.br"
    cfg["formsubmit"]["subject"] = "Novo pedido — Loja Oficial Sensor Crash Fix"

FAQ = [
    {
        "id": "faq-1",
        "active": True,
        "order": 1,
        "question": "O que a Sensor Crash Fix resolve?",
        "questionEn": "What does Sensor Crash Fix fix?",
        "questionIt": "Cosa risolve Sensor Crash Fix?",
        "answer": "Quando o <strong>vidro/sensor do smartwatch racha</strong>, a vedação se perde e o relógio deixa de ficar à prova d’água. A lente/cobertura Sensor Crash Fix <strong>restaura a proteção</strong>, cobre o sensor danificado e permite voltar a usar o aparelho no dia a dia.",
        "answerEn": "When the smartwatch <strong>sensor glass cracks</strong>, the seal is lost and the watch is no longer water-resistant. The Sensor Crash Fix lens <strong>restores protection</strong>, covers the damaged sensor and lets you use the watch again daily.",
        "answerIt": "Quando il <strong>vetro/sensore dello smartwatch si incrina</strong>, si perde la tenuta e l’orologio non resta più impermeabile. La lente Sensor Crash Fix <strong>ripristina la protezione</strong>, copre il sensore danneggiato e permette di usare di nuovo il dispositivo.",
        "media": [],
    },
    {
        "id": "faq-2",
        "active": True,
        "order": 2,
        "question": "A lente restaura a vedação / à prova d’água?",
        "questionEn": "Does the lens restore waterproofing?",
        "questionIt": "La lente ripristina l’impermeabilità?",
        "answer": "Sim — o objetivo principal é <strong>recuperar a vedação</strong> após o trinco no sensor, para uso com suor, chuva, lavar as mãos e natação leve. Não substitui garantia oficial do fabricante nem reparo autorizado para danos estruturais graves.",
        "answerEn": "Yes — the main goal is to <strong>restore the seal</strong> after a cracked sensor for sweat, rain, hand washing and light swimming. It does not replace the manufacturer warranty or authorized repair for severe structural damage.",
        "answerIt": "Sì — l’obiettivo principale è <strong>ripristinare la tenuta</strong> dopo la crepa del sensore per sudore, pioggia, lavaggio mani e nuoto leggero. Non sostituisce la garanzia del produttore né una riparazione ufficiale in caso di danni strutturali gravi.",
        "media": [],
    },
    {
        "id": "faq-3",
        "active": True,
        "order": 3,
        "question": "O sensor rachado ainda lê batimentos?",
        "questionEn": "Can a cracked sensor still read heart rate?",
        "questionIt": "Un sensore incrinato legge ancora il battito?",
        "answer": "Muitas vezes o trinco atrapalha a leitura ótica. A cobertura alinha a interface ótica sobre o sensor e, em vários casos, <strong>a leitura de pulso/batimentos volta</strong> a funcionar de forma estável.",
        "answerEn": "Often the crack interferes with the optical reading. The cover restores the optical interface and in many cases <strong>heart-rate/wrist reading works again</strong> more reliably.",
        "answerIt": "Spesso la crepa interferisce con la lettura ottica. La copertura ripristina l’interfaccia ottica e in molti casi <strong>la lettura di polso/battito torna</strong> a funzionare in modo più stabile.",
        "media": [],
    },
    {
        "id": "faq-4",
        "active": True,
        "order": 4,
        "question": "As lentes Crash Fix são maiores?",
        "questionEn": "Are Crash Fix lenses larger?",
        "questionIt": "Le lenti Crash Fix sono più grandi?",
        "answer": "Sim. O catálogo Crash Fix usa diâmetros um pouco <strong>maiores</strong> (padrão ~27 mm no kit) para cobrir melhor a área do sensor danificado. Confira o mm do seu modelo na loja.",
        "answerEn": "Yes. Crash Fix lenses are slightly <strong>larger</strong> (kit default ~27 mm) to better cover the damaged sensor area. Check your model’s mm in the store.",
        "answerIt": "Sì. Le lenti Crash Fix sono leggermente <strong>più grandi</strong> (kit ~27 mm) per coprire meglio l’area del sensore danneggiato. Controlla i mm del tuo modello nello store.",
        "media": [],
    },
    {
        "id": "faq-5",
        "active": True,
        "order": 5,
        "question": "Serve para Apple Watch, Samsung, Garmin…?",
        "questionEn": "Does it work on Apple Watch, Samsung, Garmin…?",
        "questionIt": "Funziona su Apple Watch, Samsung, Garmin…?",
        "answer": "Sim — escolhemos a lente pelo <strong>diâmetro do sensor</strong> do seu modelo. A loja lista smartwatches e smartbands compatíveis.",
        "answerEn": "Yes — we match the lens to your model’s <strong>sensor diameter</strong>. The store lists compatible smartwatches and smartbands.",
        "answerIt": "Sì — la lente si sceglie in base al <strong>diametro del sensore</strong> del tuo modello. Lo store elenca smartwatch e smartband compatibili.",
        "media": [],
    },
    {
        "id": "faq-6",
        "active": True,
        "order": 6,
        "question": "Como aplicar a lente?",
        "questionEn": "How do I apply the lens?",
        "questionIt": "Come si applica la lente?",
        "answer": "Limpe o sensor, alinhe a lente com o aplicador e pressione de forma uniforme. O kit inclui lenço, aplicador e manual. Evite bolhas e aguarde a fixação antes de molhar.",
        "answerEn": "Clean the sensor, align the lens with the applicator and press evenly. The kit includes wipe, applicator and manual. Avoid bubbles and wait before getting it wet.",
        "answerIt": "Pulisci il sensore, allinea la lente con l’applicatore e premi in modo uniforme. Il kit include salvietta, applicatore e manuale. Evita bolle e attendi prima di bagnare.",
        "media": [],
    },
    {
        "id": "faq-7",
        "active": True,
        "order": 7,
        "question": "Substitui o reparo oficial da marca?",
        "questionEn": "Does it replace official brand repair?",
        "questionIt": "Sostituisce la riparazione ufficiale?",
        "answer": "É uma solução prática para <strong>continuar usando</strong> o relógio após dano no sensor. Para danos graves na caixa ou garantia ativa, avalie o serviço autorizado do fabricante.",
        "answerEn": "It’s a practical way to <strong>keep using</strong> the watch after sensor damage. For severe case damage or active warranty, consider authorized manufacturer service.",
        "answerIt": "È una soluzione pratica per <strong>continuare a usare</strong> l’orologio dopo il danno al sensore. Per danni gravi alla cassa o garanzia attiva, valuta il servizio ufficiale.",
        "media": [],
    },
]

# Keep more FAQs inactive/cleared cracks ones — replace list entirely for home
cfg["homeFaq"] = FAQ

REVIEWS = [
    {
        "id": "review-1",
        "active": True,
        "order": 1,
        "rating": 5,
        "body": "Sensor rachou e eu tinha medo de molhar o relógio. Depois da lente, voltei a lavar a mão e treinar sem paranoia.",
        "bodyEn": "Sensor cracked and I was afraid to get the watch wet. After the lens I wash my hands and train without worrying.",
        "bodyIt": "Il sensore si è incrinato e avevo paura di bagnare l’orologio. Con la lente lavo le mani e mi alleno senza ansia.",
        "author": "Marina S.",
        "authorEn": "Marina S.",
        "authorIt": "Marina S.",
        "source": "Loja oficial",
        "sourceEn": "Official store",
        "sourceIt": "Negozio ufficiale",
    },
    {
        "id": "review-2",
        "active": True,
        "order": 2,
        "rating": 5,
        "body": "Vidro do sensor trincado no Ultra. A cobertura maior fechou bem e a leitura de batimentos estabilizou.",
        "bodyEn": "Cracked sensor glass on my Ultra. The larger cover sealed well and heart rate stabilized.",
        "bodyIt": "Vetro del sensore incrinato sull’Ultra. La copertura più grande ha sigillato bene e il battito si è stabilizzato.",
        "author": "Rafael T.",
        "authorEn": "Rafael T.",
        "authorIt": "Rafael T.",
        "source": "WhatsApp",
        "sourceEn": "WhatsApp",
        "sourceIt": "WhatsApp",
    },
    {
        "id": "review-3",
        "active": True,
        "order": 3,
        "rating": 5,
        "body": "Salvou o relógio. Não é reparo oficial, mas para uso diário com suor e chuva resolveu.",
        "bodyEn": "Saved the watch. Not an official repair, but for daily sweat and rain it worked.",
        "bodyIt": "Ha salvato l’orologio. Non è una riparazione ufficiale, ma per sudore e pioggia quotidiani ha funzionato.",
        "author": "Camila P.",
        "authorEn": "Camila P.",
        "authorIt": "Camila P.",
        "source": "Google",
        "sourceEn": "Google",
        "sourceIt": "Google",
    },
    {
        "id": "review-4",
        "active": True,
        "order": 4,
        "rating": 5,
        "body": "Aplicação simples. Antes entrava umidade; depois da Crash Fix ficou selado.",
        "bodyEn": "Easy to apply. Moisture was getting in; after Crash Fix it sealed.",
        "bodyIt": "Applicazione semplice. Prima entrava umidità; dopo Crash Fix è sigillato.",
        "author": "Diego M.",
        "authorEn": "Diego M.",
        "authorIt": "Diego M.",
        "source": "Instagram",
        "sourceEn": "Instagram",
        "sourceIt": "Instagram",
    },
    {
        "id": "review-5",
        "active": True,
        "order": 5,
        "rating": 5,
        "body": "Comprei pelo mm maior. Cobriu o trinco todo e o relógio voltou a ser utilizável.",
        "bodyEn": "Bought the larger mm. Covered the whole crack and the watch is usable again.",
        "bodyIt": "Ho preso i mm più grandi. Ha coperto tutta la crepa e l’orologio è di nuovo utilizzabile.",
        "author": "Ana L.",
        "authorEn": "Ana L.",
        "authorIt": "Ana L.",
        "source": "Loja oficial",
        "sourceEn": "Official store",
        "sourceIt": "Negozio ufficiale",
    },
]
cfg["homeReviews"] = REVIEWS

cfg_path.write_text(json.dumps(cfg, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("store-config updated")

# --- Narrative replacements across locale HTML / JSON / JS ---
NARRATIVE = [
    # Taglines
    ("Proteção de novo após o trinco no sensor", "Proteção de novo após o trinco no sensor"),
    ("Protection again after a cracked sensor", "Protection again after a cracked sensor"),
    ("La pace tra inchiostro e silicio", "Di nuovo protetto dopo la crepa del sensore"),
    ("Der Frieden zwischen Tinte und Silizium", "Wieder Schutz nach dem Riss im Sensor"),
    ("La paz entre la tinta y el silicio", "Protección de nuevo tras la grieta del sensor"),
    ("Pokój między atramentem a krzemem", "Ochrona znowu po pęknięciu czujnika"),
    ("Mir med črnilom in silicijem", "Spet zaščita po razpoki tipala"),

    # Problem framing
    (
        "Em braços danificado, a tinta bloqueia o sensor ótico",
        "Com o sensor rachado, a vedação se perde e o relógio deixa de ficar à prova d’água",
    ),
    (
        "On cracked sensors, ink blocks the optical sensor",
        "With a cracked sensor, the seal is lost and the watch is no longer water-resistant",
    ),
    (
        "a rachadura impede a leitura correta do sensor óptico",
        "o vidro/sensor rachado compromete a vedação e a leitura ótica",
    ),
    (
        "the cracks is what stops the optical sensor from reading correctly",
        "the cracked sensor glass is what breaks the seal and optical reading",
    ),
    (
        "A rachadura impede o sensor de medir a frequência cardíaca corretamente.",
        "O trinco no sensor atrapalha a leitura ótica de frequência cardíaca.",
    ),
    (
        "The cracks stops the sensor from measuring heart rate correctly.",
        "The crack interferes with optical heart-rate measurement.",
    ),
    (
        "braço danificado",
        "sensor rachado",
    ),
    (
        "cracked sensor",
        "cracked sensor",
    ),
    (
        "cracked sensor",
        "a cracked sensor",
    ),
    (
        "pele danificado",
        "sensor rachado",
    ),
    (
        "cracked glass often blocks the optical sensor",
        "A cracked sensor glass often breaks the seal and optical reading",
    ),
    (
        "often cracked glass blocking the sensor",
        "often a cracked sensor glass losing waterproofing",
    ),
    (
        "Smartwatch na rachadura",
        "Sensor Rachado no Smartwatch",
    ),
    (
        "Smartwatch on cracked sensor",
        "Cracked Smartwatch Sensor",
    ),
    (
        "Passcode or Heart Rate Failing on cracks?",
        "Cracked Sensor? Lost Waterproofing?",
    ),
    (
        "smartwatch cracks",
        "cracked smartwatch sensor",
    ),
    (
        "smartwatch rachadura",
        "sensor smartwatch rachado",
    ),
    (
        "apple watch passcode cracks",
        "apple watch cracked sensor",
    ),
    (
        "apple watch heart rate cracks",
        "apple watch cracked sensor heart rate",
    ),
    (
        "wrist detection cracks",
        "cracked sensor waterproof",
    ),
    (
        "relógio não reconhece pulso rachadura",
        "sensor rachado perde vedação",
    ),
    (
        "detecção de pulso rachadura",
        "sensor rachado à prova d’água",
    ),
    (
        "Muitas vezes é a rachadura bloqueando o sensor",
        "Muitas vezes o sensor rachou e perdeu a vedação",
    ),
    (
        "Pode ser a rachadura no sensor",
        "Pode ser o sensor rachado",
    ),
    (
        "cracked glass may block the sensor",
        "A cracked sensor may break the seal",
    ),
    (
        "Solução para smartwatch em braço danificado",
        "Solução para smartwatch com sensor rachado",
    ),
    (
        "Official fix — Apple Watch, Samsung, Garmin.",
        "Cover lens for cracked sensors — Apple Watch, Samsung, Garmin.",
    ),
]

TEXT_GLOBS = [
    "index.html",
    "loja.html",
    "onde-comprar.html",
    "comprar.html",
    "comunidade.html",
    "minha-conta.html",
    "en/*.html",
    "it/*.html",
    "de/*.html",
    "es/*.html",
    "pl/*.html",
    "sl/*.html",
    "js/stf-i18n.js",
    "js/stf-i18n-*-overrides.js",
    "js/seo-schema.js",
    "js/site-footer.js",
    "data/home-content-l10n.json",
    "api/home-content-l10n.json",
    "data/letter-l10n.json",
]

files: list[Path] = []
for g in TEXT_GLOBS:
    files.extend(ROOT.glob(g))

changed = 0
for f in files:
    text = f.read_text(encoding="utf-8")
    orig = text
    for a, b in NARRATIVE:
        if a in text:
            text = text.replace(a, b)
    # generic residual scrubbers (careful)
    text = re.sub(r"(?i)Sensor\s*cracks\s*Fix", "Sensor Crash Fix", text)
    text = re.sub(r"SENSOR<span>cracks FIX</span>", "SENSOR<span>CRASH FIX</span>", text)
    if text != orig:
        f.write_text(text, encoding="utf-8")
        changed += 1
        print("narrative", f.relative_to(ROOT))
print(f"narrative files: {changed}")
