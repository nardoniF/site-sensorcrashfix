#!/usr/bin/env python3
"""Gera landings SEO (sensor trincado/quebrado) + atualiza H1/meta das homes."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Cluster hreflang: slug localizado por idioma
SLUGS = {
    "pt": "sensor-trincado.html",
    "en": "cracked-sensor.html",
    "it": "sensore-incrinato.html",
    "de": "sensor-gerissen.html",
    "es": "sensor-roto.html",
    "pl": "pekniety-czujnik.html",
    "sl": "poceno-tipalo.html",
    "fr": "capteur-fissure.html",
    "no": "sprukket-sensor.html",
    "sv": "sprucken-sensor.html",
    "nl": "gebarsten-sensor.html",
}

LANG_HTML = {
    "pt": "pt-br",
    "en": "en",
    "it": "it",
    "de": "de",
    "es": "es",
    "pl": "pl",
    "sl": "sl",
    "fr": "fr",
    "no": "nb",
    "sv": "sv",
    "nl": "nl",
}

OG_LOCALE = {
    "pt": "pt_BR",
    "en": "en_US",
    "it": "it_IT",
    "de": "de_DE",
    "es": "es_ES",
    "pl": "pl_PL",
    "sl": "sl_SI",
    "fr": "fr_FR",
    "no": "nb_NO",
    "sv": "sv_SE",
    "nl": "nl_NL",
}

LOCKUP = {
    "pt": "logo-lockup.webp",
    "en": "logo-lockup-en.webp",
    "it": "logo-lockup-it.webp",
    "de": "logo-lockup-de.webp",
    "es": "logo-lockup-es.webp",
    "pl": "logo-lockup-pl.webp",
    "sl": "logo-lockup-sl.webp",
    "fr": "logo-lockup-fr.webp",
    "no": "logo-lockup-no.webp",
    "sv": "logo-lockup-sv.webp",
    "nl": "logo-lockup-nl.webp",
}

COPY = {
    "pt": {
        "title": "Sensor Trincado ou Quebrado no Smartwatch? Solução | Sensor CrashFix",
        "description": "Sensor trincado, rachado ou quebrado no Apple Watch, Samsung ou Garmin? A lente Sensor CrashFix restaura a vedação e a leitura de batimentos sem trocar o módulo.",
        "keywords": "sensor trincado, sensor quebrado smartwatch, sensor rachado, vidro do sensor rachado, apple watch sensor trincado, samsung watch sensor quebrado, garmin sensor rachado, restaurar vedação smartwatch",
        "og_title": "Sensor Trincado ou Quebrado? | Sensor CrashFix",
        "og_description": "Cobre o sensor trincado, lacra a vedação e devolve batimentos — sem trocar o módulo.",
        "h1": "Sensor trincado ou quebrado no smartwatch?",
        "lead": "Um trinco no sensor ótico parece só estético — até a vedação falhar, a água entrar e os batimentos sumirem. A lente Sensor CrashFix cobre o dano, lacra e devolve o uso do relógio.",
        "cta_buy": "Comprar agora",
        "cta_how": "Ver como funciona",
        "nav_problem": "O Problema",
        "nav_products": "Produtos",
        "nav_faq": "FAQ",
        "nav_buy": "Comprar",
        "home": "Início",
        "store": "Loja",
        "h2_what": "O que acontece quando o sensor trinca",
        "p_what": "O vidro do sensor (a “lente” na parte de trás do smartwatch) faz a vedação e passa a luz do sensor óptico. Quando trinca, rachadura ou quebra:",
        "li1_t": "Perde a vedação",
        "li1": "Água, suor e umidade entram — o relógio deixa de ser à prova d’água como antes.",
        "li2_t": "Leitura instável",
        "li2": "Batimentos, SpO₂ e detecção de pulso falham ou somem no meio do treino.",
        "li3_t": "Trinco piora",
        "li3": "Sem proteção, impacto e sujeira alargam a rachadura e o módulo fica mais exposto.",
        "h2_solution": "Como a lente Sensor CrashFix resolve",
        "p_solution": "É uma cobertura óptica adesiva que vai <strong>por cima</strong> do sensor trincado ou quebrado. Não abre o relógio e não troca o módulo. Em muitos casos:",
        "sol1": "Restaura a vedação na área danificada",
        "sol2": "Estabiliza de novo a leitura óptica (pulso e batimentos)",
        "sol3": "Protege o vidro para o trinco não avançar",
        "h2_models": "Funciona em Apple Watch, Samsung, Garmin e mais",
        "p_models": "A lente foi pensada para o sensor óptico traseiro dos principais smartwatches e smartbands. Confira o tamanho no anúncio e no checkout antes de comprar — o encaixe certo é o que garante a vedação.",
        "h2_when": "Quando vale a pena (e quando não)",
        "p_when": "Ideal se o sensor está trincado, rachado ou com o vidro quebrado e o relógio ainda liga. Se o módulo interno já está morto (sem luz nenhuma, placa danificada), a lente não substitui um reparo de hardware. Para a maioria dos casos de vidro trincado com leitura falhando, é o passo mais simples e barato antes de uma troca de módulo.",
        "h2_faq": "Perguntas frequentes sobre sensor trincado",
        "faq": [
            (
                "Sensor trincado ainda dá para usar o relógio?",
                "Sim, em muitos casos — mas sem vedação e com leitura instável. A lente cobre o dano para você voltar a usar com mais segurança no dia a dia.",
            ),
            (
                "Sensor quebrado é a mesma coisa que trincado?",
                "Trincado/rachado = fissura no vidro. Quebrado pode ser pedaço faltando ou vidro estilhaçado. Em ambos a lente cobre a área do sensor se ainda houver superfície para aderir.",
            ),
            (
                "A lente devolve a prova d’água?",
                "Ela restaura a vedação na zona do sensor. Não é certificação de fábrica; o objetivo é lacrar o dano para uso normal (mãos, suor, chuva leve).",
            ),
            (
                "Precisa trocar o módulo do sensor?",
                "Na maioria dos casos de vidro trincado, não. A CrashFix é uma cobertura — bem mais barata que peça + mão de obra.",
            ),
        ],
        "h2_cta": "Pronto para cobrir o sensor trincado?",
        "p_cta": "Escolha o kit na loja oficial ou veja onde comprar. Entrega no Brasil e envio internacional.",
        "breadcrumb_seo": "Sensor trincado",
        "home_h1": "Sensor trincado ou quebrado? Proteja ou restaure",
        "home_lead": "Proteja o sensor antes do dano — ou restaure um sensor já trincado, rachado ou quebrado com a lente Sensor CrashFix.",
        "lockup_alt": "Sensor CrashFix — Blindagem Óptica Graduada. Prevenção e reparo.",
        "seo_link_label": "Guia: sensor trincado ou quebrado",
        "img_alt": "Sensor de smartwatch trincado — problema que a lente Sensor CrashFix cobre e lacra",
    },
    "en": {
        "title": "Cracked or Broken Smartwatch Sensor? Fix | Sensor CrashFix",
        "description": "Cracked, broken or shattered smartwatch sensor glass? Sensor CrashFix covers the damage, restores the seal and helps heart-rate reading — Apple Watch, Samsung, Garmin.",
        "keywords": "cracked sensor, broken smartwatch sensor, cracked sensor glass, apple watch cracked sensor, samsung cracked sensor, garmin sensor glass, restore waterproofing smartwatch",
        "og_title": "Cracked or Broken Sensor? | Sensor CrashFix",
        "og_description": "Cover the cracked sensor, reseal waterproofing and restore heart-rate reading — no module swap.",
        "h1": "Cracked or broken smartwatch sensor?",
        "lead": "A crack in the optical sensor often looks cosmetic — until waterproofing fails, moisture gets in and heart rate drops out. Sensor CrashFix covers the damage, reseals and brings the watch back into daily use.",
        "cta_buy": "Buy now",
        "cta_how": "See how it works",
        "nav_problem": "The problem",
        "nav_products": "Products",
        "nav_faq": "FAQ",
        "nav_buy": "Buy",
        "home": "Home",
        "store": "Store",
        "h2_what": "What happens when the sensor cracks",
        "p_what": "The sensor glass on the back of the watch seals the case and passes light for optical HR. When it cracks or breaks:",
        "li1_t": "Seal is lost",
        "li1": "Water, sweat and moisture get in — the watch is no longer water-resistant as before.",
        "li2_t": "Unstable readings",
        "li2": "Heart rate, SpO₂ and wrist detection fail or drop mid-workout.",
        "li3_t": "Crack gets worse",
        "li3": "Without a cover, impacts and dirt widen the crack and expose the module.",
        "h2_solution": "How the Sensor CrashFix lens helps",
        "p_solution": "It is an adhesive optical cover that goes <strong>on top of</strong> the cracked or broken sensor glass. No opening the watch, no module swap. In many cases it:",
        "sol1": "Restores the seal over the damaged area",
        "sol2": "Stabilizes optical reading again (wrist and heart rate)",
        "sol3": "Protects the glass so the crack does not spread",
        "h2_models": "Works with Apple Watch, Samsung, Garmin and more",
        "p_models": "Designed for the rear optical sensor on major smartwatches and bands. Check size on the product page before you buy — the right fit is what restores the seal.",
        "h2_when": "When it is worth it (and when it is not)",
        "p_when": "Best when the sensor glass is cracked or broken and the watch still powers on. If the internal module is dead (no LEDs, board damage), a lens will not replace hardware repair. For most cracked-glass cases with failing HR, it is the simplest step before an expensive module swap.",
        "h2_faq": "FAQ: cracked or broken sensor",
        "faq": [
            (
                "Can I still use a watch with a cracked sensor?",
                "Often yes — but without a proper seal and with unstable readings. The lens covers the damage so daily use is safer again.",
            ),
            (
                "Is a broken sensor the same as cracked?",
                "Cracked means a fissure in the glass. Broken may mean missing pieces or shattered glass. The lens can cover the sensor area if there is still a surface to adhere to.",
            ),
            (
                "Does the lens restore waterproofing?",
                "It reseals the sensor zone. It is not a factory IP rating — the goal is to seal the damage for normal use (hands, sweat, light rain).",
            ),
            (
                "Do I need to replace the sensor module?",
                "Usually not for cracked glass. CrashFix is a cover — far cheaper than parts plus labour.",
            ),
        ],
        "h2_cta": "Ready to cover the cracked sensor?",
        "p_cta": "Pick the kit in the official store or see where to buy. Shipping worldwide.",
        "breadcrumb_seo": "Cracked sensor",
        "home_h1": "Cracked or broken sensor? Protect or restore",
        "home_lead": "Protect the sensor before damage — or restore an already cracked, broken or shattered sensor with the Sensor CrashFix lens.",
        "lockup_alt": "Sensor CrashFix — Graduated Optical Shield. Prevention and repair.",
        "seo_link_label": "Guide: cracked or broken sensor",
        "img_alt": "Cracked smartwatch sensor — the damage Sensor CrashFix covers and seals",
    },
    "it": {
        "title": "Sensore incrinato o rotto dello smartwatch? | Sensor CrashFix",
        "description": "Vetro del sensore incrinato, crepato o rotto? La lente Sensor CrashFix ripristina la tenuta e la lettura del battito senza sostituire il modulo — Apple Watch, Samsung, Garmin.",
        "keywords": "sensore incrinato, sensore rotto smartwatch, vetro sensore crepato, apple watch sensore incrinato, ripristinare impermeabilità",
        "og_title": "Sensore incrinato o rotto? | Sensor CrashFix",
        "og_description": "Copre il sensore incrinato, ripristina la tenuta e il battito — senza cambiare il modulo.",
        "h1": "Sensore dello smartwatch incrinato o rotto?",
        "lead": "Una crepa nel sensore ottico sembra solo estetica — finché la tenuta fallisce e il battito sparisce. Sensor CrashFix copre il danno, sigilla e restituisce l’uso quotidiano.",
        "cta_buy": "Acquista ora",
        "cta_how": "Come funziona",
        "nav_problem": "Il problema",
        "nav_products": "Prodotti",
        "nav_faq": "FAQ",
        "nav_buy": "Acquista",
        "home": "Home",
        "store": "Negozio",
        "h2_what": "Cosa succede quando il sensore si incrina",
        "p_what": "Il vetro del sensore sul retro sigilla la cassa e lascia passare la luce ottica. Quando si incrina o si rompe:",
        "li1_t": "Si perde la tenuta",
        "li1": "Acqua, sudore e umidità entrano — lo smartwatch non è più impermeabile come prima.",
        "li2_t": "Letture instabili",
        "li2": "Battito, SpO₂ e rilevamento al polso falliscono o si interrompono.",
        "li3_t": "La crepa peggiora",
        "li3": "Senza protezione, urti e sporco allargano il danno.",
        "h2_solution": "Come aiuta la lente Sensor CrashFix",
        "p_solution": "È una copertura ottica adesiva che va <strong>sopra</strong> il vetro incrinato o rotto. Non apre l’orologio e non sostituisce il modulo. In molti casi:",
        "sol1": "Ripristina la tenuta sulla zona danneggiata",
        "sol2": "Stabilizza di nuovo la lettura ottica",
        "sol3": "Protegge il vetro affinché la crepa non si allarghi",
        "h2_models": "Apple Watch, Samsung, Garmin e altri",
        "p_models": "Pensata per il sensore ottico posteriore dei principali smartwatch. Controlla la misura prima dell’acquisto.",
        "h2_when": "Quando conviene",
        "p_when": "Ideale se il vetro è incrinato o rotto e l’orologio si accende ancora. Se il modulo interno è morto, la lente non sostituisce una riparazione hardware.",
        "h2_faq": "FAQ: sensore incrinato",
        "faq": [
            ("Posso usare l’orologio con sensore incrinato?", "Spesso sì, ma senza tenuta e con letture instabili. La lente copre il danno per un uso più sicuro."),
            ("Rotto e incrinato sono la stessa cosa?", "Incrinato = fessura. Rotto può significare pezzi mancanti. La lente aderisce se c’è ancora una superficie."),
            ("Ripristina l’impermeabilità?", "Sigilla la zona del sensore per l’uso quotidiano — non è una certificazione di fabbrica."),
            ("Devo sostituire il modulo?", "Di solito no per vetro incrinato. CrashFix è una copertura, molto più economica."),
        ],
        "h2_cta": "Pronto a coprire il sensore incrinato?",
        "p_cta": "Scegli il kit nel negozio ufficiale. Spedizione internazionale.",
        "breadcrumb_seo": "Sensore incrinato",
        "home_h1": "Sensore incrinato o rotto? Proteggi o ripristina",
        "home_lead": "Proteggi il sensore prima del danno — o ripristina un sensore già incrinato o rotto con la lente Sensor CrashFix.",
        "lockup_alt": "Sensor CrashFix — Blindatura ottica graduata. Prevenzione e riparazione.",
        "seo_link_label": "Guida: sensore incrinato o rotto",
        "img_alt": "Sensore smartwatch incrinato — il danno che Sensor CrashFix copre e sigilla",
    },
    "de": {
        "title": "Gerissener oder kaputter Smartwatch-Sensor? | Sensor CrashFix",
        "description": "Sensorglas gerissen, gesprungen oder kaputt? Die Sensor-CrashFix-Linse stellt die Dichtung und Pulsablesung wieder her — ohne Modulwechsel. Apple Watch, Samsung, Garmin.",
        "keywords": "Sensor gerissen, Smartwatch Sensor kaputt, Sensorglas gesprungen, Apple Watch Sensor gerissen, Wasserdichtigkeit wiederherstellen",
        "og_title": "Sensor gerissen oder kaputt? | Sensor CrashFix",
        "og_description": "Deckt den gerissenen Sensor ab, dichtet ab und hilft der Pulsablesung — ohne Modulwechsel.",
        "h1": "Gerissener oder kaputter Smartwatch-Sensor?",
        "lead": "Ein Riss im optischen Sensor wirkt oft nur kosmetisch — bis die Dichtung versagt und der Puls ausfällt. Sensor CrashFix deckt den Schaden ab, dichtet ab und macht die Uhr wieder alltagstauglich.",
        "cta_buy": "Jetzt kaufen",
        "cta_how": "So funktioniert’s",
        "nav_problem": "Das Problem",
        "nav_products": "Produkte",
        "nav_faq": "FAQ",
        "nav_buy": "Kaufen",
        "home": "Start",
        "store": "Shop",
        "h2_what": "Was passiert, wenn der Sensor reißt",
        "p_what": "Das Sensorglas auf der Rückseite dichtet das Gehäuse und lässt Licht für die optische Messung durch. Bei Riss oder Bruch:",
        "li1_t": "Dichtung weg",
        "li1": "Wasser, Schweiß und Feuchtigkeit gelangen hinein.",
        "li2_t": "Instabile Werte",
        "li2": "Puls, SpO₂ und Handgelenkerkennung fallen aus.",
        "li3_t": "Riss wird schlimmer",
        "li3": "Ohne Schutz weiten Stöße und Schmutz den Schaden.",
        "h2_solution": "So hilft die Sensor-CrashFix-Linse",
        "p_solution": "Eine haftende optische Abdeckung <strong>auf</strong> dem gerissenen oder kaputten Sensorglas. Uhr bleibt zu, kein Modulwechsel. Oft:",
        "sol1": "Dichtet die beschädigte Zone wieder ab",
        "sol2": "Stabilisiert die optische Ablesung",
        "sol3": "Schützt das Glas vor weiterem Reißen",
        "h2_models": "Apple Watch, Samsung, Garmin und mehr",
        "p_models": "Für den hinteren optischen Sensor gängiger Smartwatches. Größe vor dem Kauf prüfen.",
        "h2_when": "Wann es sich lohnt",
        "p_when": "Ideal bei gerissenem Glas und noch funktionierender Uhr. Bei totem Modul hilft keine Linse — dann braucht es Hardware-Reparatur.",
        "h2_faq": "FAQ: gerissener Sensor",
        "faq": [
            ("Kann ich die Uhr mit gerissenem Sensor noch tragen?", "Oft ja — aber ohne Dichtung und mit instabilen Werten. Die Linse macht den Alltag sicherer."),
            ("Kaputt gleich gerissen?", "Gerissen = Riss. Kaputt kann fehlende Stücke heißen. Die Linse haftet, wenn noch Fläche da ist."),
            ("Wird die Uhr wieder wasserdicht?", "Die Sensorzone wird abgedichtet — keine Werks-IP, aber Alltagsschutz."),
            ("Muss das Modul getauscht werden?", "Bei gerissenem Glas meist nicht. CrashFix ist die günstigere Abdeckung."),
        ],
        "h2_cta": "Bereit, den gerissenen Sensor abzudecken?",
        "p_cta": "Kit im offiziellen Shop wählen. Internationaler Versand.",
        "breadcrumb_seo": "Sensor gerissen",
        "home_h1": "Sensor gerissen oder kaputt? Schützen oder wiederherstellen",
        "home_lead": "Schützen Sie den Sensor vor Schaden — oder stellen Sie einen bereits gerissenen Sensor mit der Sensor-CrashFix-Linse wieder her.",
        "lockup_alt": "Sensor CrashFix — Abgestufte optische Abschirmung. Vorbeugung und Reparatur.",
        "seo_link_label": "Guide: gerissener oder kaputter Sensor",
        "img_alt": "Gerissener Smartwatch-Sensor — der Schaden, den Sensor CrashFix abdeckt",
    },
    "es": {
        "title": "¿Sensor roto o agrietado del smartwatch? | Sensor CrashFix",
        "description": "¿Cristal del sensor agrietado, roto o astillado? La lente Sensor CrashFix restaura el sellado y la lectura de pulsaciones sin cambiar el módulo — Apple Watch, Samsung, Garmin.",
        "keywords": "sensor roto, sensor agrietado smartwatch, cristal sensor roto, apple watch sensor agrietado, restaurar impermeabilidad",
        "og_title": "¿Sensor roto o agrietado? | Sensor CrashFix",
        "og_description": "Cubre el sensor agrietado, sella y ayuda a las pulsaciones — sin cambiar el módulo.",
        "h1": "¿Sensor del smartwatch roto o agrietado?",
        "lead": "Una grieta en el sensor óptico parece solo estética — hasta que falla el sellado y desaparece el pulso. Sensor CrashFix cubre el daño, sella y devuelve el uso diario.",
        "cta_buy": "Comprar ahora",
        "cta_how": "Cómo funciona",
        "nav_problem": "El problema",
        "nav_products": "Productos",
        "nav_faq": "FAQ",
        "nav_buy": "Comprar",
        "home": "Inicio",
        "store": "Tienda",
        "h2_what": "Qué ocurre cuando el sensor se agrieta",
        "p_what": "El cristal del sensor en la parte trasera sella la caja y deja pasar la luz óptica. Cuando se agrieta o rompe:",
        "li1_t": "Se pierde el sellado",
        "li1": "Entran agua, sudor y humedad.",
        "li2_t": "Lecturas inestables",
        "li2": "Pulsaciones, SpO₂ y detección de muñeca fallan.",
        "li3_t": "La grieta empeora",
        "li3": "Sin protección, golpes y suciedad amplían el daño.",
        "h2_solution": "Cómo ayuda la lente Sensor CrashFix",
        "p_solution": "Es una cubierta óptica adhesiva que va <strong>encima</strong> del cristal agrietado o roto. No abre el reloj ni cambia el módulo. En muchos casos:",
        "sol1": "Restaura el sellado en la zona dañada",
        "sol2": "Estabiliza de nuevo la lectura óptica",
        "sol3": "Protege el cristal para que la grieta no avance",
        "h2_models": "Apple Watch, Samsung, Garmin y más",
        "p_models": "Pensada para el sensor óptico trasero de los principales smartwatches. Comprueba la talla antes de comprar.",
        "h2_when": "Cuándo merece la pena",
        "p_when": "Ideal si el cristal está agrietado o roto y el reloj aún enciende. Si el módulo interno está muerto, la lente no sustituye una reparación de hardware.",
        "h2_faq": "FAQ: sensor agrietado o roto",
        "faq": [
            ("¿Puedo usar el reloj con sensor agrietado?", "A menudo sí, pero sin sellado y con lecturas inestables. La lente cubre el daño para un uso más seguro."),
            ("¿Roto y agrietado son lo mismo?", "Agrietado = fisura. Roto puede ser cristal astillado. La lente adhiere si aún hay superficie."),
            ("¿Devuelve la impermeabilidad?", "Sella la zona del sensor para el uso diario — no es certificación de fábrica."),
            ("¿Hay que cambiar el módulo?", "Suele no hacer falta con cristal agrietado. CrashFix es una cubierta más barata."),
        ],
        "h2_cta": "¿Listo para cubrir el sensor agrietado?",
        "p_cta": "Elige el kit en la tienda oficial. Envío internacional.",
        "breadcrumb_seo": "Sensor roto",
        "home_h1": "¿Sensor roto o agrietado? Protege o restaura",
        "home_lead": "Protege el sensor antes del daño — o restaura un sensor ya agrietado o roto con la lente Sensor CrashFix.",
        "lockup_alt": "Sensor CrashFix — Blindaje óptico graduado. Prevención y reparación.",
        "seo_link_label": "Guía: sensor roto o agrietado",
        "img_alt": "Sensor de smartwatch agrietado — el daño que Sensor CrashFix cubre y sella",
    },
    "pl": {
        "title": "Pęknięty lub zepsuty czujnik smartwatcha? | Sensor CrashFix",
        "description": "Pęknięte, spękane lub zbite szkło czujnika? Soczewka Sensor CrashFix przywraca uszczelnienie i odczyt tętna bez wymiany modułu — Apple Watch, Samsung, Garmin.",
        "keywords": "pęknięty czujnik, zepsuty czujnik smartwatch, szkło czujnika pęknięte, apple watch pęknięty czujnik",
        "og_title": "Pęknięty lub zepsuty czujnik? | Sensor CrashFix",
        "og_description": "Zasłania pęknięty czujnik, uszczelnia i pomaga w odczycie tętna — bez wymiany modułu.",
        "h1": "Pęknięty lub zepsuty czujnik smartwatcha?",
        "lead": "Pęknięcie w czujniku optycznym wygląda kosmetycznie — aż uszczelnienie zawodzi i tętno znika. Sensor CrashFix zasłania uszkodzenie, uszczelnia i przywraca codzienność.",
        "cta_buy": "Kup teraz",
        "cta_how": "Jak działa",
        "nav_problem": "Problem",
        "nav_products": "Produkty",
        "nav_faq": "FAQ",
        "nav_buy": "Kup",
        "home": "Start",
        "store": "Sklep",
        "h2_what": "Co się dzieje, gdy czujnik pęka",
        "p_what": "Szkło czujnika z tyłu uszczelnia obudowę i przepuszcza światło. Gdy pęknie:",
        "li1_t": "Utrata uszczelnienia",
        "li1": "Woda, pot i wilgoć dostają się do środka.",
        "li2_t": "Niestabilne odczyty",
        "li2": "Tętno, SpO₂ i wykrywanie nadgarstka zawodzą.",
        "li3_t": "Pęknięcie się pogarsza",
        "li3": "Bez ochrony uderzenia i brud powiększają uszkodzenie.",
        "h2_solution": "Jak pomaga soczewka Sensor CrashFix",
        "p_solution": "To klejąca osłona optyczna <strong>na</strong> pękniętym szkle. Bez otwierania zegarka i wymiany modułu. Często:",
        "sol1": "Przywraca uszczelnienie uszkodzonej strefy",
        "sol2": "Stabilizuje ponownie odczyt optyczny",
        "sol3": "Chroni szkło przed dalszym pękaniem",
        "h2_models": "Apple Watch, Samsung, Garmin i inne",
        "p_models": "Do tylnego czujnika optycznego popularnych smartwatchy. Sprawdź rozmiar przed zakupem.",
        "h2_when": "Kiedy warto",
        "p_when": "Idealne przy pękniętym szkle, gdy zegarek nadal działa. Martwy moduł wymaga naprawy sprzętowej.",
        "h2_faq": "FAQ: pęknięty czujnik",
        "faq": [
            ("Czy mogę nosić zegarek z pękniętym czujnikiem?", "Często tak — bez uszczelnienia i ze słabym odczytem. Soczewka poprawia bezpieczeństwo."),
            ("Zepsuty to to samo co pęknięty?", "Pęknięty = rysa. Zepsuty może oznaczać braki. Soczewka klei się, gdy jest powierzchnia."),
            ("Czy wraca wodoszczelność?", "Uszczelnia strefę czujnika do codziennego użytku — to nie certyfikat fabryczny."),
            ("Czy trzeba wymieniać moduł?", "Przy pękniętym szkle zwykle nie. CrashFix to tańsza osłona."),
        ],
        "h2_cta": "Gotowy zasłonić pęknięty czujnik?",
        "p_cta": "Wybierz zestaw w oficjalnym sklepie. Wysyłka międzynarodowa.",
        "breadcrumb_seo": "Pęknięty czujnik",
        "home_h1": "Pęknięty lub zepsuty czujnik? Chroń lub przywróć",
        "home_lead": "Chroń czujnik przed uszkodzeniem — lub przywróć już pęknięty czujnik soczewką Sensor CrashFix.",
        "lockup_alt": "Sensor CrashFix — Stopniowana osłona optyczna. Profilaktyka i naprawa.",
        "seo_link_label": "Poradnik: pęknięty lub zepsuty czujnik",
        "img_alt": "Pęknięty czujnik smartwatcha — uszkodzenie, które zasłania Sensor CrashFix",
    },
    "sl": {
        "title": "Počeno ali zlomljeno tipalo pametne ure? | Sensor CrashFix",
        "description": "Počeno, razpokano ali zlomljeno steklo tipala? Leča Sensor CrashFix obnovi tesnjenje in branje utripa brez zamenjave modula — Apple Watch, Samsung, Garmin.",
        "keywords": "počeno tipalo, zlomljeno tipalo smartwatch, steklo tipala počeno, apple watch počeno tipalo",
        "og_title": "Počeno ali zlomljeno tipalo? | Sensor CrashFix",
        "og_description": "Pokrije počeno tipalo, zatesni in pomaga pri utripu — brez zamenjave modula.",
        "h1": "Počeno ali zlomljeno tipalo pametne ure?",
        "lead": "Razpoka v optičnem tipalu izgleda le estetsko — dokler ne odpove tesnjenje in izgine utrip. Sensor CrashFix pokrije škodo, zatesni in vrne vsakodnevno uporabo.",
        "cta_buy": "Kupi zdaj",
        "cta_how": "Kako deluje",
        "nav_problem": "Težava",
        "nav_products": "Izdelki",
        "nav_faq": "FAQ",
        "nav_buy": "Kupi",
        "home": "Domov",
        "store": "Trgovina",
        "h2_what": "Kaj se zgodi, ko tipalo poči",
        "p_what": "Steklo tipala na hrbtu tesni ohišje in prepušča svetlobo. Ko poči ali se zlomi:",
        "li1_t": "Izguba tesnjenja",
        "li1": "Voda, znoj in vlaga prodrejo noter.",
        "li2_t": "Nestabilna branja",
        "li2": "Utrip, SpO₂ in zaznava zapestja odpovedo.",
        "li3_t": "Razpoka se poslabša",
        "li3": "Brez zaščite udarci in umazanija povečajo škodo.",
        "h2_solution": "Kako pomaga leča Sensor CrashFix",
        "p_solution": "Je lepilni optični pokrov <strong>na</strong> počenem steklu. Ne odpre ure in ne zamenja modula. Pogosto:",
        "sol1": "Obnovi tesnjenje poškodovanega območja",
        "sol2": "Ponovno stabilizira optično branje",
        "sol3": "Ščiti steklo, da se razpoka ne širi",
        "h2_models": "Apple Watch, Samsung, Garmin in več",
        "p_models": "Za zadnje optično tipalo glavnih pametnih ur. Preverite velikost pred nakupom.",
        "h2_when": "Kdaj se splača",
        "p_when": "Idealno pri počenem steklu, če ura še deluje. Mrtev modul zahteva strojno popravilo.",
        "h2_faq": "FAQ: počeno tipalo",
        "faq": [
            ("Ali lahko uporabljam uro s počenim tipalom?", "Pogosto da — brez tesnjenja in z nestabilnimi branji. Leča omogoči varnejšo uporabo."),
            ("Zlomljeno je enako počenemu?", "Počeno = razpoka. Zlomljeno lahko pomeni manjkajoče kose. Leča se prime, če je še površina."),
            ("Ali se vrne vodoodpornost?", "Zatesni območje tipala za vsakdan — to ni tovarniški IP."),
            ("Ali moram zamenjati modul?", "Pri počenem steklu običajno ne. CrashFix je cenejši pokrov."),
        ],
        "h2_cta": "Pripravljeni pokriti počeno tipalo?",
        "p_cta": "Izberite komplet v uradni trgovini. Mednarodna dostava.",
        "breadcrumb_seo": "Počeno tipalo",
        "home_h1": "Počeno ali zlomljeno tipalo? Zaščitite ali obnovite",
        "home_lead": "Zaščitite tipalo pred poškodbo — ali obnovite že počeno tipalo z lečo Sensor CrashFix.",
        "lockup_alt": "Sensor CrashFix — Stopnjevana optična zaščita. Preprečevanje in popravilo.",
        "seo_link_label": "Vodič: počeno ali zlomljeno tipalo",
        "img_alt": "Počeno tipalo pametne ure — škoda, ki jo Sensor CrashFix pokrije",
    },
    "fr": {
        "title": "Capteur fissuré ou cassé de smartwatch ? | Sensor CrashFix",
        "description": "Verre du capteur fissuré, fêlé ou cassé ? La lentille Sensor CrashFix restaure l’étanchéité et la lecture du rythme cardiaque sans changer le module — Apple Watch, Samsung, Garmin.",
        "keywords": "capteur fissuré, capteur cassé smartwatch, verre capteur fêlé, apple watch capteur fissuré, restaurer étanchéité",
        "og_title": "Capteur fissuré ou cassé ? | Sensor CrashFix",
        "og_description": "Couvre le capteur fissuré, restaure l’étanchéité et aide au rythme cardiaque — sans changer le module.",
        "h1": "Capteur de smartwatch fissuré ou cassé ?",
        "lead": "Une fissure dans le capteur optique paraît cosmétique — jusqu’à ce que l’étanchéité lâche et que le rythme cardiaque disparaisse. Sensor CrashFix couvre le dégât, scelle et rend l’usage quotidien.",
        "cta_buy": "Acheter",
        "cta_how": "Comment ça marche",
        "nav_problem": "Le problème",
        "nav_products": "Produits",
        "nav_faq": "FAQ",
        "nav_buy": "Acheter",
        "home": "Accueil",
        "store": "Boutique",
        "h2_what": "Ce qui se passe quand le capteur se fissure",
        "p_what": "Le verre du capteur à l’arrière assure l’étanchéité et laisse passer la lumière optique. Quand il se fissure ou casse :",
        "li1_t": "Perte d’étanchéité",
        "li1": "Eau, sueur et humidité s’infiltrent.",
        "li2_t": "Lectures instables",
        "li2": "Rythme cardiaque, SpO₂ et détection au poignet échouent.",
        "li3_t": "La fissure s’aggrave",
        "li3": "Sans protection, chocs et saleté élargissent le dégât.",
        "h2_solution": "Comment aide la lentille Sensor CrashFix",
        "p_solution": "C’est une couverture optique adhésive placée <strong>par-dessus</strong> le verre fissuré ou cassé. Sans ouvrir la montre ni changer le module. Souvent :",
        "sol1": "Restaure l’étanchéité de la zone endommagée",
        "sol2": "Restabilise la lecture optique",
        "sol3": "Protège le verre pour que la fissure n’avance pas",
        "h2_models": "Apple Watch, Samsung, Garmin et plus",
        "p_models": "Conçue pour le capteur optique arrière des principaux smartwatches. Vérifiez la taille avant d’acheter.",
        "h2_when": "Quand cela vaut le coup",
        "p_when": "Idéal si le verre est fissuré ou cassé et que la montre s’allume encore. Module mort = réparation hardware, pas une lentille.",
        "h2_faq": "FAQ : capteur fissuré",
        "faq": [
            ("Puis-je porter la montre avec un capteur fissuré ?", "Souvent oui — sans étanchéité et avec des lectures instables. La lentille sécurise l’usage."),
            ("Cassé et fissuré, c’est pareil ?", "Fissuré = fêlure. Cassé peut signifier des morceaux manquants. La lentille adhère s’il reste une surface."),
            ("Ça restaure l’étanchéité ?", "Elle scelle la zone du capteur pour l’usage quotidien — pas une IP d’usine."),
            ("Faut-il changer le module ?", "En général non pour un verre fissuré. CrashFix est une couverture bien moins chère."),
        ],
        "h2_cta": "Prêt à couvrir le capteur fissuré ?",
        "p_cta": "Choisissez le kit dans la boutique officielle. Livraison internationale.",
        "breadcrumb_seo": "Capteur fissuré",
        "home_h1": "Capteur fissuré ou cassé ? Protégez ou restaurez",
        "home_lead": "Protégez le capteur avant le dégât — ou restaurez un capteur déjà fissuré ou cassé avec la lentille Sensor CrashFix.",
        "lockup_alt": "Sensor CrashFix — Blindage optique progressif. Prévention et réparation.",
        "seo_link_label": "Guide : capteur fissuré ou cassé",
        "img_alt": "Capteur de smartwatch fissuré — le dégât que Sensor CrashFix couvre et scelle",
    },
    "no": {
        "title": "Sprukket eller ødelagt smartklokkesensor? | Sensor CrashFix",
        "description": "Sprukket, knust eller ødelagt sensorglass? Sensor CrashFix-linsen gjenoppretter tetning og pulsavlesning uten å bytte modul — Apple Watch, Samsung, Garmin.",
        "keywords": "sprukket sensor, ødelagt smartklokke sensor, sensorglass sprukket, apple watch sprukket sensor",
        "og_title": "Sprukket eller ødelagt sensor? | Sensor CrashFix",
        "og_description": "Dekker den sprukne sensoren, tetter og hjelper pulsen — uten modulbytte.",
        "h1": "Sprukket eller ødelagt smartklokkesensor?",
        "lead": "En sprekk i den optiske sensoren ser ofte kosmetisk ut — til tetningen svikter og pulsen forsvinner. Sensor CrashFix dekker skaden, tetter og gir daglig bruk tilbake.",
        "cta_buy": "Kjøp nå",
        "cta_how": "Slik fungerer det",
        "nav_problem": "Problemet",
        "nav_products": "Produkter",
        "nav_faq": "FAQ",
        "nav_buy": "Kjøp",
        "home": "Hjem",
        "store": "Butikk",
        "h2_what": "Hva skjer når sensoren sprekker",
        "p_what": "Sensorglasset bak tetter huset og slipper lys gjennom. Når det sprekker eller knuser:",
        "li1_t": "Tetning tapt",
        "li1": "Vann, svette og fukt kommer inn.",
        "li2_t": "Ustabil avlesning",
        "li2": "Puls, SpO₂ og håndleddsdeteksjon svikter.",
        "li3_t": "Sprekken blir verre",
        "li3": "Uten beskyttelse utvider støt og smuss skaden.",
        "h2_solution": "Slik hjelper Sensor CrashFix-linsen",
        "p_solution": "Et klebende optisk deksel <strong>oppå</strong> sprukket eller ødelagt glass. Uten å åpne klokken eller bytte modul. Ofte:",
        "sol1": "Gjenoppretter tetning over skadet sone",
        "sol2": "Stabiliserer optisk avlesning igjen",
        "sol3": "Beskytter glasset så sprekken ikke sprer seg",
        "h2_models": "Apple Watch, Samsung, Garmin med mer",
        "p_models": "For bakre optiske sensor på vanlige smartklokker. Sjekk størrelse før kjøp.",
        "h2_when": "Når det er verdt det",
        "p_when": "Best når glasset er sprukket og klokken fortsatt starter. Død modul krever hardwarereparasjon.",
        "h2_faq": "FAQ: sprukket sensor",
        "faq": [
            ("Kan jeg bruke klokken med sprukket sensor?", "Ofte ja — uten tetning og med ustabil avlesning. Linsen gjør hverdagsbruk tryggere."),
            ("Ødelagt det samme som sprukket?", "Sprukket = sprekk. Ødelagt kan bety manglende biter. Linsen festes hvis det finnes flate."),
            ("Blir den vanntett igjen?", "Den tetter sensorsonen for daglig bruk — ikke fabrikk-IP."),
            ("Må modulen byttes?", "Vanligvis ikke ved sprukket glass. CrashFix er et billigere deksel."),
        ],
        "h2_cta": "Klar til å dekke den sprukne sensoren?",
        "p_cta": "Velg settet i den offisielle butikken. Internasjonal frakt.",
        "breadcrumb_seo": "Sprukket sensor",
        "home_h1": "Sprukket eller ødelagt sensor? Beskytt eller gjenopprett",
        "home_lead": "Beskytt sensoren før skade — eller gjenopprett en allerede sprukket sensor med Sensor CrashFix-linsen.",
        "lockup_alt": "Sensor CrashFix — Gradert optisk skjerming. Forebygging og reparasjon.",
        "seo_link_label": "Guide: sprukket eller ødelagt sensor",
        "img_alt": "Sprukket smartklokkesensor — skaden Sensor CrashFix dekker og tetter",
    },
    "sv": {
        "title": "Sprucken eller trasig smartwatch-sensor? | Sensor CrashFix",
        "description": "Sprucket, krossat eller trasigt sensorglas? Sensor CrashFix-linsen återställer tätning och pulsavläsning utan modulbyte — Apple Watch, Samsung, Garmin.",
        "keywords": "sprucken sensor, trasig smartwatch sensor, sensorglas sprucket, apple watch sprucken sensor",
        "og_title": "Sprucken eller trasig sensor? | Sensor CrashFix",
        "og_description": "Täcker den spruckna sensorn, tätar och hjälper pulsen — utan modulbyte.",
        "h1": "Sprucken eller trasig smartwatch-sensor?",
        "lead": "En spricka i den optiska sensorn ser ofta kosmetisk ut — tills tätningen sviker och pulsen försvinner. Sensor CrashFix täcker skadan, tätar och ger tillbaka vardagsbruket.",
        "cta_buy": "Köp nu",
        "cta_how": "Så fungerar det",
        "nav_problem": "Problemet",
        "nav_products": "Produkter",
        "nav_faq": "FAQ",
        "nav_buy": "Köp",
        "home": "Hem",
        "store": "Butik",
        "h2_what": "Vad händer när sensorn spricker",
        "p_what": "Senseglaset bak tätar huset och släpper igenom ljus. När det spricker eller går sönder:",
        "li1_t": "Tätning borta",
        "li1": "Vatten, svett och fukt tar sig in.",
        "li2_t": "Instabila värden",
        "li2": "Puls, SpO₂ och handledsdetektering fallerar.",
        "li3_t": "Sprickan blir värre",
        "li3": "Utan skydd vidgar stötar och smuts skadan.",
        "h2_solution": "Så hjälper Sensor CrashFix-linsen",
        "p_solution": "Ett självhäftande optiskt skydd <strong>ovanpå</strong> sprucket eller trasigt glas. Utan att öppna klockan eller byta modul. Ofta:",
        "sol1": "Återställer tätning över skadad zon",
        "sol2": "Stabiliserar optisk avläsning igen",
        "sol3": "Skyddar glaset så sprickan inte sprids",
        "h2_models": "Apple Watch, Samsung, Garmin med mera",
        "p_models": "För bakre optiska sensorn på vanliga smartwatches. Kontrollera storlek före köp.",
        "h2_when": "När det lönar sig",
        "p_when": "Bäst när glaset är sprucket och klockan fortfarande startar. Död modul kräver hårdvarureparation.",
        "h2_faq": "FAQ: sprucken sensor",
        "faq": [
            ("Kan jag använda klockan med sprucken sensor?", "Ofta ja — utan tätning och med instabil avläsning. Linsen gör vardagsbruk säkrare."),
            ("Trasig samma sak som sprucken?", "Sprucken = spricka. Trasig kan betyda saknade bitar. Linsen fäster om det finns yta."),
            ("Blir den vattentät igen?", "Den tätar sensorzonen för vardagsbruk — inte fabriks-IP."),
            ("Måste modulen bytas?", "Vanligtvis inte vid sprucket glas. CrashFix är ett billigare skydd."),
        ],
        "h2_cta": "Redo att täcka den spruckna sensorn?",
        "p_cta": "Välj kitet i den officiella butiken. Internationell frakt.",
        "breadcrumb_seo": "Sprucken sensor",
        "home_h1": "Sprucken eller trasig sensor? Skydda eller återställ",
        "home_lead": "Skydda sensorn före skada — eller återställ en redan sprucken sensor med Sensor CrashFix-linsen.",
        "lockup_alt": "Sensor CrashFix — Gradvis optiskt skydd. Förebyggande och reparation.",
        "seo_link_label": "Guide: sprucken eller trasig sensor",
        "img_alt": "Sprucken smartwatch-sensor — skadan Sensor CrashFix täcker och tätar",
    },
    "nl": {
        "title": "Gebarsten of kapotte smartwatch-sensor? | Sensor CrashFix",
        "description": "Gebarsten, gebroken of kapot sensorgals? De Sensor CrashFix-lens herstelt de afdichting en hartslagmeting zonder module te vervangen — Apple Watch, Samsung, Garmin.",
        "keywords": "gebarsten sensor, kapotte smartwatch sensor, sensorgals gebarsten, apple watch gebarsten sensor",
        "og_title": "Gebarsten of kapotte sensor? | Sensor CrashFix",
        "og_description": "Dekt de gebarsten sensor af, hermetiseert en helpt de hartslag — zonder modulewissel.",
        "h1": "Gebarsten of kapotte smartwatch-sensor?",
        "lead": "Een barst in de optische sensor lijkt vaak cosmetisch — tot de afdichting faalt en de hartslag wegvalt. Sensor CrashFix dekt de schade af, hermetiseert en brengt dagelijks gebruik terug.",
        "cta_buy": "Nu kopen",
        "cta_how": "Hoe het werkt",
        "nav_problem": "Het probleem",
        "nav_products": "Producten",
        "nav_faq": "FAQ",
        "nav_buy": "Kopen",
        "home": "Home",
        "store": "Winkel",
        "h2_what": "Wat gebeurt er als de sensor barst",
        "p_what": "Het sensorgals op de achterkant dicht de behuizing af en laat licht door. Bij barst of breuk:",
        "li1_t": "Afdichting weg",
        "li1": "Water, zweet en vocht komen binnen.",
        "li2_t": "Instabiele metingen",
        "li2": "Hartslag, SpO₂ en polsdetectie falen.",
        "li3_t": "Barst wordt erger",
        "li3": "Zonder bescherming vergroten stoten en vuil de schade.",
        "h2_solution": "Hoe de Sensor CrashFix-lens helpt",
        "p_solution": "Een klevende optische cover <strong>bovenop</strong> gebarsten of kapot glas. Zonder de horloge te openen of de module te wisselen. Vaak:",
        "sol1": "Herstelt de afdichting over de beschadigde zone",
        "sol2": "Stabiliseert opnieuw de optische meting",
        "sol3": "Beschermt het glas zodat de barst niet verder gaat",
        "h2_models": "Apple Watch, Samsung, Garmin en meer",
        "p_models": "Voor de achterste optische sensor van populaire smartwatches. Controleer de maat voor aankoop.",
        "h2_when": "Wanneer het de moeite waard is",
        "p_when": "Ideaal bij gebarsten glas terwijl het horloge nog aangaat. Dode module vraagt hardware-reparatie.",
        "h2_faq": "FAQ: gebarsten sensor",
        "faq": [
            ("Kan ik het horloge met gebarsten sensor nog dragen?", "Vaak ja — zonder afdichting en met instabiele metingen. De lens maakt dagelijks gebruik veiliger."),
            ("Kapot hetzelfde als gebarsten?", "Gebarsten = scheur. Kapot kan ontbrekende stukken betekenen. De lens hecht als er nog oppervlak is."),
            ("Wordt het weer waterdicht?", "Het hermetiseert de sensorzone voor dagelijks gebruik — geen fabrieks-IP."),
            ("Moet de module vervangen?", "Bij gebarsten glas meestal niet. CrashFix is een goedkopere cover."),
        ],
        "h2_cta": "Klaar om de gebarsten sensor af te dekken?",
        "p_cta": "Kies de kit in de officiële winkel. Internationale verzending.",
        "breadcrumb_seo": "Gebarsten sensor",
        "home_h1": "Gebarsten of kapotte sensor? Bescherm of herstel",
        "home_lead": "Bescherm de sensor vóór schade — of herstel een al gebarsten sensor met de Sensor CrashFix-lens.",
        "lockup_alt": "Sensor CrashFix — Graduele optische afscherming. Preventie en reparatie.",
        "seo_link_label": "Gids: gebarsten of kapotte sensor",
        "img_alt": "Gebarsten smartwatch-sensor — de schade die Sensor CrashFix afdekt en hermetiseert",
    },
}


def canonical_for(lang: str, file: str) -> str:
    if lang == "pt":
        return f"https://www.sensorcrashfix.com.br/{file}"
    if lang == "en":
        return f"https://www.sensorcrashfix.com/{file}"
    return f"https://www.sensorcrashfix.com/{lang}/{file}"


def asset_prefix(lang: str) -> str:
    return "" if lang == "pt" else "../"


def hreflang_block() -> str:
    lines = []
    order = ["pt", "en", "it", "de", "es", "pl", "sl", "fr", "no", "sv", "nl"]
    hreflang_code = {
        "pt": "pt-BR",
        "en": "en",
        "it": "it",
        "de": "de",
        "es": "es",
        "pl": "pl",
        "sl": "sl",
        "fr": "fr",
        "no": "no",
        "sv": "sv",
        "nl": "nl",
    }
    for lang in order:
        href = canonical_for(lang, SLUGS[lang])
        lines.append(f'    <link rel="alternate" hreflang="{hreflang_code[lang]}" href="{href}">')
    lines.append(f'    <link rel="alternate" hreflang="x-default" href="{canonical_for("pt", SLUGS["pt"])}">')
    return "\n".join(lines)


def faq_html(c: dict) -> str:
    parts = []
    for q, a in c["faq"]:
        parts.append(
            f"""            <details class="faq-item">
                <summary>{q}</summary>
                <p>{a}</p>
            </details>"""
        )
    return "\n".join(parts)


def landing_html(lang: str) -> str:
    c = COPY[lang]
    file = SLUGS[lang]
    pref = asset_prefix(lang)
    canon = canonical_for(lang, file)
    lockup = LOCKUP[lang]
    index_href = "index.html" if lang == "pt" else "index.html"
    loja_href = "loja.html" if lang == "pt" else "loja.html"
    comprar_href = "#onde-comprar" if False else (
        "index.html#onde-comprar" if lang == "pt" else "index.html#onde-comprar"
    )
    return f"""<!DOCTYPE html>
<html lang="{LANG_HTML[lang]}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow">
    <script src="{pref}js/stf-lang-nav.js?v=8"></script>
    <title>{c['title']}</title>
    <meta name="description" content="{c['description']}">
    <meta name="keywords" content="{c['keywords']}">
    <link rel="canonical" href="{canon}">
{hreflang_block()}
    <meta property="og:type" content="article">
    <meta property="og:locale" content="{OG_LOCALE[lang]}">
    <meta property="og:url" content="{canon}">
    <meta property="og:title" content="{c['og_title']}">
    <meta property="og:description" content="{c['og_description']}">
    <meta property="og:image" content="https://www.sensorcrashfix.com.br/images/home/sensor-rachado-dedo.jpg?v=crash3">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{c['og_title']}">
    <meta name="twitter:description" content="{c['og_description']}">
    <link rel="stylesheet" href="{pref}style.css?v=3.55-crash">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L852DLJ9KV"></script>
    <script src="{pref}js/gtag-init.js?v=2"></script>
</head>
<body class="home-page seo-landing-page">
    <header>
        <nav class="container site-nav">
            <input type="checkbox" id="mobile-menu-toggle" class="mobile-menu-checkbox" aria-hidden="true">
            <div class="logo-area">
                <a href="{index_href}" class="logo-img-link"><img src="{pref}images/brand/logo-icon-lockup.png?v=crash1" alt="Sensor CrashFix" class="main-logo-img"></a>
                <a href="{index_href}" class="logo-lockup logo-lockup--img" aria-label="Sensor CrashFix">
                    <img src="{pref}images/brand/{lockup}?v=crash2" alt="{c['lockup_alt']}" class="logo-lockup-img" width="434" height="145">
                </a>
            </div>
            <div class="nav-panel">
                <ul class="nav-links nav-main">
                    <li><a href="{index_href}">{c['home']}</a></li>
                    <li><a href="{index_href}#problema">{c['nav_problem']}</a></li>
                    <li><a href="{index_href}#produtos">{c['nav_products']}</a></li>
                    <li><a href="{index_href}#faq">{c['nav_faq']}</a></li>
                </ul>
            </div>
            <ul class="nav-links nav-actions">
                <li data-account-nav></li>
                <li><a href="{loja_href}" class="btn-nav btn-nav-comprar" title="{c['nav_buy']}" aria-label="{c['nav_buy']}"><i class="fas fa-shopping-bag" aria-hidden="true"></i><span class="btn-nav-label">{c['nav_buy']}</span></a></li>
                <li class="nav-lang-stack" aria-label="Language"></li>
            </ul>
            <label for="mobile-menu-toggle" class="mobile-menu-icon" aria-label="Menu">
                <i class="fas fa-bars"></i>
            </label>
        </nav>
    </header>

    <section id="top" class="hero">
        <div class="container hero-grid">
            <div class="hero-text">
                <p class="seo-breadcrumb"><a href="{index_href}">{c['home']}</a> · {c['breadcrumb_seo']}</p>
                <h1>{c['h1']}</h1>
                <p>{c['lead']}</p>
                <div class="hero-btns">
                    <a href="{loja_href}" class="btn-primary btn-cta-primary">{c['cta_buy']}</a>
                    <a href="{index_href}#produtos" class="btn-outline">{c['cta_how']}</a>
                </div>
            </div>
            <div class="hero-visual">
                <img src="{pref}images/home/sensor-rachado-dedo.jpg?v=crash3" alt="{c['img_alt']}" class="product-img">
            </div>
        </div>
    </section>

    <section class="content-section grey-bg">
        <div class="container">
            <h2 class="section-title">{c['h2_what']}</h2>
            <p>{c['p_what']}</p>
            <div class="problem-grid">
                <div class="card">
                    <i class="fas fa-tint"></i>
                    <h3>{c['li1_t']}</h3>
                    <p>{c['li1']}</p>
                </div>
                <div class="card">
                    <i class="fas fa-heartbeat"></i>
                    <h3>{c['li2_t']}</h3>
                    <p>{c['li2']}</p>
                </div>
                <div class="card">
                    <i class="fas fa-shield-alt"></i>
                    <h3>{c['li3_t']}</h3>
                    <p>{c['li3']}</p>
                </div>
            </div>
        </div>
    </section>

    <section class="content-section">
        <div class="container">
            <h2 class="section-title">{c['h2_solution']}</h2>
            <p>{c['p_solution']}</p>
            <ul class="seo-solution-list">
                <li>{c['sol1']}</li>
                <li>{c['sol2']}</li>
                <li>{c['sol3']}</li>
            </ul>
            <h2 class="section-title">{c['h2_models']}</h2>
            <p>{c['p_models']}</p>
            <h2 class="section-title">{c['h2_when']}</h2>
            <p>{c['p_when']}</p>
        </div>
    </section>

    <section id="faq" class="content-section grey-bg">
        <div class="container">
            <h2 class="section-title">{c['h2_faq']}</h2>
            <div class="faq-list">
{faq_html(c)}
            </div>
        </div>
    </section>

    <section class="content-section">
        <div class="container">
            <h2 class="section-title">{c['h2_cta']}</h2>
            <p>{c['p_cta']}</p>
            <div class="hero-btns">
                <a href="{loja_href}" class="btn-primary btn-cta-primary">{c['cta_buy']}</a>
                <a href="{comprar_href}" class="btn-outline">{c['store']}</a>
            </div>
        </div>
    </section>

    <footer class="site-footer">
        <div class="container" data-site-footer="full" data-lang="{lang if lang != 'pt' else 'pt'}"></div>
    </footer>
    <script src="{pref}js/stf-page-lang.js?v=3"></script>
    <script src="{pref}js/seo-schema.js?v=12"></script>
    <script src="{pref}js/site-footer.js?v=18"></script>
    <script src="{pref}js/account-nav.js"></script>
    <script src="{pref}js/analytics.js"></script>
</body>
</html>
"""


def update_home_h1(path: Path, lang: str) -> None:
    c = COPY[lang]
    text = path.read_text(encoding="utf-8")
    text2, n = re.subn(
        r"(<section id=\"top\" class=\"hero\">[\s\S]*?<h1>)[^<]+(</h1>)",
        rf"\1{c['home_h1']}\2",
        text,
        count=1,
    )
    if n:
        text = text2
    # First <p> after h1 in hero
    text2, n = re.subn(
        r"(<section id=\"top\" class=\"hero\">[\s\S]*?<h1>[^<]*</h1>\s*<p>)[^<]+(</p>)",
        rf"\1{c['home_lead']}\2",
        text,
        count=1,
    )
    if n:
        text = text2

    # Internal SEO link in problem intro (once)
    slug = SLUGS[lang]
    link = f'<p class="seo-hub-link"><a href="{slug}">{c["seo_link_label"]}</a></p>'
    if 'class="seo-hub-link"' not in text:
        text = text.replace(
            '<div class="problem-intro">',
            f'<div class="problem-intro">\n                {link}',
            1,
        )

    # Bump seo-schema cache
    text = text.replace("seo-schema.js?v=11", "seo-schema.js?v=12")
    path.write_text(text, encoding="utf-8")


def main() -> None:
    for lang, slug in SLUGS.items():
        if lang == "pt":
            out = ROOT / slug
        else:
            out = ROOT / lang / slug
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(landing_html(lang), encoding="utf-8")
        print(f"wrote {out.relative_to(ROOT)}")

    homes = {
        "pt": ROOT / "index.html",
        "en": ROOT / "en" / "index.html",
        "it": ROOT / "it" / "index.html",
        "de": ROOT / "de" / "index.html",
        "es": ROOT / "es" / "index.html",
        "pl": ROOT / "pl" / "index.html",
        "sl": ROOT / "sl" / "index.html",
        "fr": ROOT / "fr" / "index.html",
        "no": ROOT / "no" / "index.html",
        "sv": ROOT / "sv" / "index.html",
        "nl": ROOT / "nl" / "index.html",
    }
    for lang, path in homes.items():
        if path.exists():
            update_home_h1(path, lang)
            print(f"updated home H1 {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
