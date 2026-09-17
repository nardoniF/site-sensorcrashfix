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
        "active": true,
        "order": 1,
        "question": "Depois que o sensor quebrou, meu relógio fica pedindo senha o tempo todo. Por quê?",
        "questionEn": "After my sensor cracked, my watch keeps asking for the passcode. Why?",
        "questionIt": "Dopo che il sensore si è incrinato, l’orologio chiede continuamente il codice. Perché?",
        "answer": "Porque o trinco atrapalha a <strong>detecção de braço/pulso</strong>: o relógio acha que foi tirado do pulso e pede a senha de novo (em alguns modelos, várias vezes por minuto). A lente/adesivo Sensor Crash Fix <strong>pode ou não</strong> fazer essa funcionalidade voltar — em muitos casos a leitura estabiliza e as pedidas de senha param; em outros, o dano no sensor é grande demais. Vale testar com o mm certo do seu modelo.",
        "answerEn": "Because the crack interferes with <strong>wrist/on-arm detection</strong>: the watch thinks it was removed and asks for the passcode again (on some models, many times per minute). The Sensor Crash Fix lens/adhesive <strong>may or may not</strong> restore that — in many cases reading stabilizes and the passcode prompts stop; in others the sensor damage is too severe. Worth trying with the right mm for your model.",
        "answerIt": "Perché la crepa interferisce con il <strong>rilevamento del polso</strong>: l’orologio crede di essere stato tolto e chiede di nuovo il codice. La lente/adesivo Sensor Crash Fix <strong>può o meno</strong> ripristinare questa funzione — in molti casi la lettura si stabilizza; in altri il danno è troppo grave. Vale la pena provare con i mm giusti.",
        "media": []
    },
    {
        "id": "faq-2",
        "active": true,
        "order": 2,
        "question": "Depois que o sensor trincou / o relógio caiu, ele não mede mais batimento cardíaco. Por quê?",
        "questionEn": "After the sensor cracked / the watch fell, it no longer reads heart rate. Why?",
        "questionIt": "Dopo che il sensore si è incrinato / l’orologio è caduto, non legge più il battito. Perché?",
        "answer": "O sensor ótico usa luz para ler o pulso. Com o vidro <strong>trincado</strong>, o sinal fica irregular ou some — batimento zerado, falhando no treino ou sumindo do app. A lente Sensor Crash Fix cobre o dano e <strong>pode fazer a leitura voltar</strong> a funcionar; não é garantia em 100% dos casos (depende do tamanho do trinco), mas é o caminho mais simples antes de um reparo caro.",
        "answerEn": "The optical sensor uses light to read your pulse. With <strong>cracked</strong> glass the signal becomes unstable or disappears — zero HR, dropouts mid-workout, or nothing in the app. The Sensor Crash Fix lens covers the damage and <strong>can restore reading</strong>; it’s not a 100% guarantee (depends how bad the crack is), but it’s the simplest step before an expensive repair.",
        "answerIt": "Il sensore ottico usa la luce per leggere il polso. Con il vetro <strong>incrinato</strong> il segnale diventa irregolare o sparisce. La lente Sensor Crash Fix copre il danno e <strong>può far tornare</strong> la lettura; non è garanzia al 100% (dipende dalla crepa), ma è il passo più semplice prima di una riparazione costosa.",
        "media": []
    },
    {
        "id": "faq-3",
        "active": true,
        "order": 3,
        "question": "Meu sensor está trincado e o relógio desconecta / perde o pulso sozinho. Por quê?",
        "questionEn": "My sensor is cracked and the watch disconnects / loses the wrist by itself. Why?",
        "questionIt": "Il sensore è incrinato e l’orologio si disconnette / perde il polso da solo. Perché?",
        "answer": "Sem um sinal estável no sensor, o smartwatch interpreta que <strong>saiu do braço</strong>: desbloqueia a tela, “desconecta” do pulso, interrompe monitoramento ou pede senha. Com o sensor trincado isso é comum. A lente/adesivo <strong>pode estabilizar</strong> de novo a detecção de pulso — testando no seu modelo você vê se o comportamento some.",
        "answerEn": "Without a stable sensor signal, the smartwatch thinks it <strong>left your wrist</strong>: unlocks, “disconnects” from the arm, stops health tracking or asks for the passcode. That’s common with a cracked sensor. The lens/adhesive <strong>can stabilize</strong> wrist detection again — try it on your model to see if the behavior stops.",
        "answerIt": "Senza un segnale stabile, lo smartwatch crede di essere <strong>tolto dal polso</strong>: si sblocca, “si disconnette”, interrompe il monitoraggio o chiede il codice. Con sensore incrinato è frequente. La lente/adesivo <strong>può ristabilizzare</strong> il rilevamento — prova sul tuo modello.",
        "media": []
    },
    {
        "id": "faq-4",
        "active": true,
        "order": 4,
        "question": "Por que meu relógio pausa os treinos e atividades sozinho com o sensor trincado?",
        "questionEn": "Why does my watch pause workouts and activities by itself with a cracked sensor?",
        "questionIt": "Perché l’orologio mette in pausa allenamenti e attività da solo con il sensore incrinato?",
        "answer": "Porque, com o trinco, ele deixa de calcular bem o batimento/pulso e o sistema entende que você <strong>interrompeu o treino</strong> ou tirou o aparelho — e pausa sozinho para “economizar”. A lente Sensor Crash Fix <strong>pode fazer os treinos voltarem</strong> a rodar sem pausas falsas, ao restaurar a interface ótica sobre o sensor danificado.",
        "answerEn": "Because with the crack it can’t compute heart rate/wrist well, so the system thinks you <strong>stopped the workout</strong> or removed the watch — and pauses on its own. The Sensor Crash Fix lens <strong>can let workouts run again</strong> without false pauses by restoring the optical interface over the damaged sensor.",
        "answerIt": "Perché con la crepa non calcola bene battito/polso e il sistema pensa che tu abbia <strong>interrotto l’allenamento</strong> o tolto l’orologio — e mette in pausa. La lente Sensor Crash Fix <strong>può far ripartire</strong> gli allenamenti senza pause false, ripristinando l’interfaccia ottica sul sensore danneggiato.",
        "media": []
    },
    {
        "id": "faq-5",
        "active": true,
        "order": 5,
        "question": "Como a lente Sensor Crash Fix corrige o sensor?",
        "questionEn": "How does the Sensor Crash Fix lens fix the sensor?",
        "questionIt": "Come la lente Sensor Crash Fix corregge il sensore?",
        "answer": "É como uma <strong>lente sobressalente</strong>: uma cobertura óptica adesiva que a gente coloca <strong>por cima</strong> do sensor trincado. Ela veda de novo a área danificada, protege o vidro e, em muitos casos, devolve a leitura ótica (pulso, batimento, detecção de braço) sem abrir o relógio nem trocar o módulo.",
        "answerEn": "It’s like a <strong>spare/replacement lens</strong>: an adhesive optical cover you place <strong>on top of</strong> the cracked sensor. It reseals the damaged area, protects the glass and, in many cases, restores optical reading (wrist, heart rate, on-arm detection) without opening the watch or replacing the module.",
        "answerIt": "È come una <strong>lente di ricambio</strong>: una copertura ottica adesiva che si mette <strong>sopra</strong> il sensore incrinato. Risigilla l’area danneggiata, protegge il vetro e in molti casi ripristina la lettura ottica senza aprire l’orologio né sostituire il modulo.",
        "media": []
    },
    {
        "id": "faq-6",
        "active": true,
        "order": 6,
        "question": "Funciona em Apple Watch?",
        "questionEn": "Does it work on Apple Watch?",
        "questionIt": "Funziona su Apple Watch?",
        "answer": "Sim. Funciona em <strong>todos os smartwatches</strong> (e smartbands) com sensor ótico na parte de trás — Apple Watch inclusive. O que muda é o <strong>diâmetro (mm)</strong> da lente; na loja você escolhe o tamanho do seu modelo.",
        "answerEn": "Yes. It works on <strong>all smartwatches</strong> (and bands) with an optical sensor on the back — including Apple Watch. What changes is the lens <strong>diameter (mm)</strong>; pick your model’s size in the store.",
        "answerIt": "Sì. Funziona su <strong>tutti gli smartwatch</strong> (e band) con sensore ottico sul retro — incluso Apple Watch. Cambia il <strong>diametro (mm)</strong> della lente; nello store scegli la misura del tuo modello.",
        "media": []
    },
    {
        "id": "faq-7",
        "active": true,
        "order": 7,
        "question": "Funciona em Samsung Galaxy Watch?",
        "questionEn": "Does it work on Samsung Galaxy Watch?",
        "questionIt": "Funziona su Samsung Galaxy Watch?",
        "answer": "Sim. Funciona em <strong>todos os smartwatches</strong> — Galaxy Watch, Ultra e demais Samsung com sensor ótico, e também Apple, Garmin, Xiaomi, Amazfit e afins. Escolha o <strong>mm</strong> compatível na loja oficial.",
        "answerEn": "Yes. It works on <strong>all smartwatches</strong> — Galaxy Watch, Ultra and other Samsung models with an optical sensor, plus Apple, Garmin, Xiaomi, Amazfit and similar. Pick the matching <strong>mm</strong> in the official store.",
        "answerIt": "Sì. Funziona su <strong>tutti gli smartwatch</strong> — Galaxy Watch, Ultra e altri Samsung con sensore ottico, più Apple, Garmin, Xiaomi, Amazfit e simili. Scegli i <strong>mm</strong> giusti nello store ufficiale.",
        "media": []
    },
    {
        "id": "faq-8",
        "active": true,
        "order": 8,
        "question": "A lente restaura a vedação / à prova d’água?",
        "questionEn": "Does the lens restore waterproofing?",
        "questionIt": "La lente ripristina l’impermeabilità?",
        "answer": "Esse é um dos objetivos principais: cobrir o trinco e <strong>vedar de novo</strong> para suor, chuva, lavar as mãos e natação leve. Não substitui reparo oficial em dano estrutural grave da caixa.",
        "answerEn": "That’s one of the main goals: cover the crack and <strong>reseal</strong> for sweat, rain, hand washing and light swimming. It doesn’t replace official repair for severe structural case damage.",
        "answerIt": "È uno degli obiettivi principali: coprire la crepa e <strong>risigillare</strong> per sudore, pioggia, mani e nuoto leggero. Non sostituisce la riparazione ufficiale in caso di danno strutturale grave.",
        "media": []
    },
    {
        "id": "faq-9",
        "active": true,
        "order": 9,
        "question": "Como é feita a instalação da lente?",
        "questionEn": "How do I install the lens?",
        "questionIt": "Come si installa la lente?",
        "answer": "Limpe o sensor (lenço do kit), retire a película do adesivo, alinhe a lente no centro do sensor e pressione cerca de 30 segundos. É uma cobertura que vai <strong>por cima</strong> do vidro trincado — sem abrir o relógio.",
        "answerEn": "Clean the sensor (kit wipe), peel the adhesive backing, align the lens on the sensor center and press for about 30 seconds. It’s a cover that goes <strong>on top of</strong> the cracked glass — no need to open the watch.",
        "answerIt": "Pulisci il sensore, togli la pellicola dell’adesivo, allinea la lente al centro e premi circa 30 secondi. È una copertura che va <strong>sopra</strong> il vetro incrinato — senza aprire l’orologio.",
        "media": []
    },
    {
        "id": "faq-10",
        "active": true,
        "order": 10,
        "question": "A lente atrapalha o carregamento do relógio?",
        "questionEn": "Does the lens interfere with charging?",
        "questionIt": "La lente interferisce con la ricarica?",
        "answer": "Não. É ultrafina — você carrega normalmente, inclusive no carregador magnético/indutivo, <strong>com a lente colada</strong>.",
        "answerEn": "No. It’s ultra-thin — you charge normally, including magnetic/inductive chargers, <strong>with the lens on</strong>.",
        "answerIt": "No. È ultra sottile — ricarichi normalmente, anche sul caricatore magnetico/induttivo, <strong>con la lente applicata</strong>.",
        "media": []
    }
]

# Home FAQ Crash (sintomas do sensor trincado)
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
cfg["homeReviews"] = []  # sem seção de depoimentos

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
