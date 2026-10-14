#!/usr/bin/env python3
"""Mirror PT home text/layout changes onto .com locale indexes.

Updates: hero badge/h1/p, problem, paliativos, 6 benefit cards, about story,
FAQ title, float CSS, removes guia-reparo.

Preserves: image srcs, kit-box hidden, optical-lens-intl CTAs, scripts,
pricing/markup data attributes, product-benefits-grid structure.
"""
from __future__ import annotations

import re
from pathlib import Path

FLOAT_CSS = """
    <!-- Intl home: feedback FAB below WhatsApp (bottom-right) -->
    <style>
      .whatsapp-float { bottom: 108px; right: 40px; }
      .stf-feedback-fab { left: auto !important; right: 40px; bottom: 40px; }
      #produtos .benefit-card h3 { font-size: clamp(0.92rem, 1.8vw, 1.1rem); }
      #produtos .benefit-card p { font-size: clamp(0.72rem, 1.5vw, 0.85rem); line-height: 1.35; }
      @media (max-width: 640px) {
        .whatsapp-float { bottom: 92px; right: 16px; }
        .stf-feedback-fab { left: auto !important; right: 16px; bottom: 24px; }
      }
    </style>
"""

# Translations mirrored from PT index.html (same meaning + layout).
LANGS = {
    "en": {
        "badge": "3N20 Technology",
        "h1": "To repair a cracked sensor or prevent future damage",
        "hero_p": "Sensor CrashFix is an optical repair and restoration kit. Our high-precision adhesive lens seals the crack, restores biometric reading and brings back water resistance — without replacing your watch module.",
        "problema_title": "The Problem",
        "problema_intro": "A crack in the sensor looks “only cosmetic” — until the seal fails. Water, sweat and moisture get in; optical reading becomes unstable; the watch stops being trustworthy day to day. And without protection, the crack can get worse.",
        "problema_cards": [
            ("Lost Seal", "With cracked glass, the smartwatch is no longer water-resistant as before."),
            ("Exposed Sensor", "The crack leaves the optical sensor vulnerable to impact, sweat and dirt."),
            ("Unstable Heart Rate", "The crack interferes with the optical interface — pulse reading can fail."),
            ("Afraid of Water", "Rain, washing hands or light swimming become a risk after sensor damage."),
            ("Expensive Repair", "Official sensor module replacement is costly and slow — many prefer an immediate cover."),
            ("Risk of further damage", "Without protection, the crack can grow — and sensor damage gets even worse."),
        ],
        "paliativos_h2": "Why DIY Fixes Fail",
        "paliativos_intro": "After a crack, many people improvise — and make it worse:",
        "paliativos_items": [
            ("<strong>Tape and generic stickers:</strong> Peel off with sweat and water; they don’t truly seal and dirty the sensor."),
            ("<strong>Home glue / resin:</strong> Can push moisture inside, leave residue and complicate a future repair."),
            ("<strong>“Keep it dry forever”:</strong> You give up training, rain and routine — the watch stops doing its job and can get damaged further."),
        ],
        "paliativos_danger": "Improvising doesn’t truly seal",
        "produtos_title": "Our Professional Solution",
        "cards": [
            ("Restores sensors", "Covers the crack and restores biometrics."),
            ("Seal", "Restores original water resistance."),
            ("Prevention", "Preventive protection against impacts."),
            ("Stops Cracks", "Stops the crack and prevents it from spreading."),
            ("Charging", "100% compatible with inductive charging."),
            ("Zero Lockouts", "No more lockouts and passcode prompts."),
        ],
        "about_title": "About Us",
        "about": 'Sensor CrashFix was born from the proprietary technology of <a href="https://www.sensortattoofix.com" target="_blank" rel="noopener">Sensor TattooFix</a>. We realized our advanced optical lens not only enabled biometric reading, but also fully sealed the back glass of the smartwatch. We then developed a larger-diameter version, designed specifically to cover the edge of the sensor, stop cracks and restore waterproof sealing without replacing the original part.',
        "role": "Founder · Sensor CrashFix · 3N20",
        "alt_founder": "Fábio Nardoni, founder of Sensor CrashFix",
        "faq_title": "Frequently Asked Questions (FAQ)",
    },
    "it": {
        "badge": "Tecnologia 3N20",
        "h1": "Per riparare un sensore incrinato o prevenire danni futuri",
        "hero_p": "Sensor CrashFix è un kit di riparazione e ripristino ottico. La nostra lente adesiva ad alta precisione sigilla la crepa, ripristina la lettura biometrica e restituisce l’impermeabilità — senza sostituire il modulo dell’orologio.",
        "problema_title": "Il problema",
        "problema_intro": "Una crepa nel sensore sembra “solo estetica” — finché la tenuta non fallisce. Acqua, sudore e umidità entrano; la lettura ottica diventa instabile; l’orologio smette di essere affidabile ogni giorno. E senza protezione, la crepa può peggiorare.",
        "problema_cards": [
            ("Tenuta persa", "Con il vetro incrinato, lo smartwatch non è più impermeabile come prima."),
            ("Sensore esposto", "La crepa lascia il sensore ottico vulnerabile a urti, sudore e sporco."),
            ("Battito instabile", "La crepa interferisce con l’interfaccia ottica — la lettura del polso può fallire."),
            ("Paura dell’acqua", "Pioggia, lavarsi le mani o nuoto leggero diventano un rischio dopo il danno al sensore."),
            ("Riparazione costosa", "La sostituzione ufficiale del modulo è cara e lenta — molti preferiscono una copertura immediata."),
            ("Rischio di danni maggiori", "Senza protezione, la crepa può allargarsi — e il danno al sensore peggiora."),
        ],
        "paliativos_h2": "Perché i rimedi fai-da-te falliscono",
        "paliativos_intro": "Dopo la crepa, molti improvvisano — e peggiorano il problema:",
        "paliativos_items": [
            ("<strong>Nastro e adesivi generici:</strong> Si staccano con sudore e acqua; non sigillano davvero e sporcano il sensore."),
            ("<strong>Colla / resina casalinga:</strong> Può spingere umidità dentro, lasciare residui e complicare una riparazione futura."),
            ("<strong>Usarlo “sempre all’asciutto”:</strong> Rinunci ad allenamento, pioggia e routine — l’orologio smette di fare il suo lavoro e può danneggiarsi di più."),
        ],
        "paliativos_danger": "L’improvvisazione non sigilla davvero",
        "produtos_title": "La nostra soluzione professionale",
        "cards": [
            ("Ripristina i sensori", "Copre la crepa e ripristina la biometria."),
            ("Tenuta", "Ripristina l’impermeabilità originale."),
            ("Prevenzione", "Protezione preventiva contro gli urti."),
            ("Ferma le crepe", "Ferma la crepa e ne evita l’espansione."),
            ("Ricarica", "100% compatibile con la ricarica a induzione."),
            ("Zero blocchi", "Fine dei blocchi e delle richieste di codice."),
        ],
        "about_title": "Chi siamo",
        "about": 'Sensor CrashFix nasce dalla tecnologia proprietaria di <a href="https://www.sensortattoofix.com" target="_blank" rel="noopener">Sensor TattooFix</a>. Abbiamo capito che la nostra lente ottica avanzata non solo permetteva la lettura biometrica, ma sigillava completamente il vetro posteriore dello smartwatch. Abbiamo quindi sviluppato una versione a diametro ampliato, progettata per coprire l’estremità del sensore, fermare le crepe e restituire la tenuta impermeabile senza sostituire il pezzo originale.',
        "role": "Fondatore · Sensor CrashFix · 3N20",
        "alt_founder": "Fábio Nardoni, fondatore di Sensor CrashFix",
        "faq_title": "Domande frequenti (FAQ)",
    },
    "de": {
        "badge": "3N20-Technologie",
        "h1": "Gerissenen Sensor reparieren oder zukünftige Schäden verhindern",
        "hero_p": "Sensor CrashFix ist ein optisches Reparatur- und Restaurationskit. Unsere hochpräzise Haftlinse schließt den Riss, stellt die biometrische Messung wieder her und bringt den Wasserschutz zurück — ohne das Modul Ihrer Uhr zu ersetzen.",
        "problema_title": "Das Problem",
        "problema_intro": "Ein Riss im Sensor wirkt „nur kosmetisch“ — bis die Abdichtung versagt. Wasser, Schweiß und Feuchtigkeit dringen ein; die optische Messung wird instabil; die Uhr ist im Alltag nicht mehr zuverlässig. Ohne Schutz kann der Riss schlimmer werden.",
        "problema_cards": [
            ("Abdichtung verloren", "Mit gerissenem Glas ist die Smartwatch nicht mehr wasserdicht wie zuvor."),
            ("Sensor freiliegend", "Der Riss lässt den optischen Sensor anfällig für Stöße, Schweiß und Schmutz."),
            ("Instabiler Puls", "Der Riss stört die optische Schnittstelle — die Pulsmessung kann ausfallen."),
            ("Angst vor Wasser", "Regen, Händewaschen oder leichtes Schwimmen werden nach Sensorschaden zum Risiko."),
            ("Teure Reparatur", "Der offizielle Modulwechsel ist teuer und langsam — viele wollen sofort eine Abdeckung."),
            ("Risiko weiterer Schäden", "Ohne Schutz kann der Riss wachsen — und der Sensorschaden wird noch schlimmer."),
        ],
        "paliativos_h2": "Warum Behelfslösungen scheitern",
        "paliativos_intro": "Nach einem Riss improvisieren viele — und machen es schlimmer:",
        "paliativos_items": [
            ("<strong>Klebeband und generische Aufkleber:</strong> Lösen sich bei Schweiß und Wasser; dichten nicht wirklich ab und verschmutzen den Sensor."),
            ("<strong>Haushaltkleber / Harz:</strong> Kann Feuchtigkeit hineindrücken, Rückstände hinterlassen und eine spätere Reparatur erschweren."),
            ("<strong>Für immer „trocken“ nutzen:</strong> Verzicht auf Training, Regen und Alltag — die Uhr erfüllt ihren Zweck nicht mehr und kann weiter beschädigt werden."),
        ],
        "paliativos_danger": "Improvisieren dichtet nicht wirklich ab",
        "produtos_title": "Unsere professionelle Lösung",
        "cards": [
            ("Stellt Sensoren wieder her", "Deckt den Riss ab und stellt die Biometrie wieder her."),
            ("Abdichtung", "Stellt die originale Wasserdichtigkeit wieder her."),
            ("Prävention", "Vorbeugender Schutz vor Stößen."),
            ("Stoppt Risse", "Stoppt den Riss und verhindert Ausbreitung."),
            ("Laden", "100 % kompatibel mit induktivem Laden."),
            ("Keine Sperren", "Keine Sperren und Code-Abfragen mehr."),
        ],
        "about_title": "Über uns",
        "about": 'Sensor CrashFix entstand aus der proprietären Technologie von <a href="https://www.sensortattoofix.com" target="_blank" rel="noopener">Sensor TattooFix</a>. Wir erkannten, dass unsere fortschrittliche optische Linse nicht nur die biometrische Messung ermöglichte, sondern auch das Rückglas der Smartwatch vollständig abdichtete. Daraufhin entwickelten wir eine Version mit größerem Durchmesser, speziell um den Sensorrand abzudecken, Risse zu stoppen und die Wasserdichtigkeit wiederherzustellen — ohne das Originalteil zu ersetzen.',
        "role": "Gründer · Sensor CrashFix · 3N20",
        "alt_founder": "Fábio Nardoni, Gründer von Sensor CrashFix",
        "faq_title": "Häufig gestellte Fragen (FAQ)",
    },
    "es": {
        "badge": "Tecnología 3N20",
        "h1": "Para reparar un sensor agrietado o prevenir daños futuros",
        "hero_p": "Sensor CrashFix es un kit de reparación y restauración óptica. Nuestra lente adhesiva de alta precisión sella la fisura, restaura la lectura biométrica y devuelve la resistencia al agua — sin sustituir el módulo de tu reloj.",
        "problema_title": "El problema",
        "problema_intro": "Una grieta en el sensor parece “solo estética” — hasta que falla el sellado. Entran agua, sudor y humedad; la lectura óptica se vuelve inestable; el reloj deja de ser fiable en el día a día. Y sin protección, la grieta puede empeorar.",
        "problema_cards": [
            ("Perdió el sellado", "Con el cristal agrietado, el smartwatch ya no es impermeable como antes."),
            ("Sensor expuesto", "La grieta deja el sensor óptico vulnerable a impactos, sudor y suciedad."),
            ("Ritmo inestable", "La grieta interfiere con la interfaz óptica — la lectura del pulso puede fallar."),
            ("Miedo al agua", "Lluvia, lavarse las manos o nadar un poco se vuelven un riesgo tras el daño del sensor."),
            ("Reparación cara", "El cambio oficial del módulo es caro y lento — muchos prefieren una cobertura inmediata."),
            ("Riesgo de más daño", "Sin protección, la grieta puede crecer — y el daño del sensor empeora."),
        ],
        "paliativos_h2": "Por qué fallan las soluciones improvisadas",
        "paliativos_intro": "Tras la grieta, mucha gente improvisa — y empeora el problema:",
        "paliativos_items": [
            ("<strong>Cinta y adhesivos genéricos:</strong> Se despegan con sudor y agua; no sellan de verdad y ensucian el sensor."),
            ("<strong>Cola / resina casera:</strong> Puede empujar humedad hacia dentro, dejar residuos y complicar una reparación futura."),
            ("<strong>Usarlo “siempre en seco”:</strong> Renuncias a entrenar, a la lluvia y a la rutina — el reloj deja de cumplir su función y puede dañarse más."),
        ],
        "paliativos_danger": "Improvisar no sella de verdad",
        "produtos_title": "Nuestra solución profesional",
        "cards": [
            ("Recupera sensores", "Cubre la fisura y restaura la biometría."),
            ("Sellado", "Restaura la impermeabilidad original."),
            ("Prevención", "Protección preventiva contra impactos."),
            ("Detiene fisuras", "Detiene la grieta y evita que se expanda."),
            ("Carga", "100% compatible con carga por inducción."),
            ("Cero bloqueos", "Fin de los bloqueos y peticiones de contraseña."),
        ],
        "about_title": "Quiénes somos",
        "about": 'Sensor CrashFix nació de la tecnología propietaria de <a href="https://www.sensortattoofix.com" target="_blank" rel="noopener">Sensor TattooFix</a>. Vimos que nuestra lente óptica avanzada no solo permitía la lectura biométrica, sino que también sellaba por completo el cristal trasero del smartwatch. Desarrollamos entonces una versión de diámetro ampliado, diseñada para cubrir el borde del sensor, detener grietas y devolver el sellado impermeable sin cambiar la pieza original.',
        "role": "Fundador · Sensor CrashFix · 3N20",
        "alt_founder": "Fábio Nardoni, fundador de Sensor CrashFix",
        "faq_title": "Preguntas frecuentes (FAQ)",
    },
    "pl": {
        "badge": "Technologia 3N20",
        "h1": "Aby naprawić pęknięty sensor lub zapobiec przyszłym uszkodzeniom",
        "hero_p": "Sensor CrashFix to zestaw do optycznej naprawy i regeneracji. Nasza precyzyjna soczewka samoprzylepna uszczelnia pęknięcie, przywraca odczyt biometryczny i wodoodporność — bez wymiany modułu zegarka.",
        "problema_title": "Problem",
        "problema_intro": "Pęknięcie sensora wygląda „tylko kosmetycznie” — aż uszczelnienie zawiedzie. Woda, pot i wilgoć wnikają; odczyt optyczny staje się niestabilny; zegarek przestaje być godny zaufania na co dzień. Bez ochrony pęknięcie może się pogorszyć.",
        "problema_cards": [
            ("Utrata uszczelnienia", "Przy pękniętym szkle smartwatch nie jest już wodoodporny jak wcześniej."),
            ("Odslonięty sensor", "Pęknięcie naraża sensor optyczny na uderzenia, pot i brud."),
            ("Niestabilne tętno", "Pęknięcie zakłóca interfejs optyczny — odczyt tętna może zawieść."),
            ("Strach przed wodą", "Deszcz, mycie rąk czy lekki pływanie stają się ryzykiem po uszkodzeniu sensora."),
            ("Droga naprawa", "Oficjalna wymiana modułu jest droga i wolna — wielu woli natychmiastową osłonę."),
            ("Ryzyko dalszych uszkodzeń", "Bez ochrony pęknięcie może rosnąć — a uszkodzenie sensora staje się jeszcze gorsze."),
        ],
        "paliativos_h2": "Dlaczego prowizorki zawodzą",
        "paliativos_intro": "Po pęknięciu wielu improwizuje — i pogarsza problem:",
        "paliativos_items": [
            ("<strong>Taśma i generyczne naklejki:</strong> Odpadają od potu i wody; nie uszczelniają naprawdę i brudzą sensor."),
            ("<strong>Domowy klej / żywica:</strong> Mogą wpychać wilgoć do środka, zostawiać osady i utrudniać przyszłą naprawę."),
            ("<strong>Używać „zawsze na sucho”:</strong> Rezygnujesz z treningu, deszczu i rutyny — zegarek przestaje spełniać rolę i może się bardziej uszkodzić."),
        ],
        "paliativos_danger": "Improwizacja nie uszczelnia naprawdę",
        "produtos_title": "Nasze profesjonalne rozwiązanie",
        "cards": [
            ("Przywraca sensory", "Zakrywa pęknięcie i przywraca biometrię."),
            ("Uszczelnienie", "Przywraca oryginalną wodoodporność."),
            ("Profilaktyka", "Ochrona zapobiegawcza przed uderzeniami."),
            ("Zatrzymuje pęknięcia", "Zatrzymuje pęknięcie i zapobiega rozszerzaniu."),
            ("Ładowanie", "W 100% kompatybilne z ładowaniem indukcyjnym."),
            ("Zero blokad", "Koniec blokad i próśb o kod."),
        ],
        "about_title": "O nas",
        "about": 'Sensor CrashFix powstał z technologii <a href="https://www.sensortattoofix.com" target="_blank" rel="noopener">Sensor TattooFix</a>. Zauważyliśmy, że nasza zaawansowana soczewka optyczna nie tylko umożliwia odczyt biometryczny, ale też w pełni uszczelnia tylne szkło smartwatcha. Opracowaliśmy więc wersję o większej średnicy, zaprojektowaną tak, by zakryć krawędź sensora, zatrzymać pęknięcia i przywrócić uszczelnienie wodoodporne bez wymiany oryginalnej części.',
        "role": "Założyciel · Sensor CrashFix · 3N20",
        "alt_founder": "Fábio Nardoni, założyciel Sensor CrashFix",
        "faq_title": "Często zadawane pytania (FAQ)",
    },
    "sl": {
        "badge": "Tehnologija 3N20",
        "h1": "Za popravilo počene tipala ali preprečevanje prihodnjih poškodb",
        "hero_p": "Sensor CrashFix je komplet za optično popravilo in obnovo. Naša visoko natančna lepilna leča zatesni razpoko, obnovi biometrično branje in vrne vodoodpornost — brez zamenjave modula ure.",
        "problema_title": "Težava",
        "problema_intro": "Razpoka na tipalu deluje »samo estetsko« — dokler tesnjenje ne odpove. Voda, znoj in vlaga vdrejo; optično branje postane nestabilno; ura ni več zanesljiva vsak dan. Brez zaščite se lahko razpoka poslabša.",
        "problema_cards": [
            ("Izgubljeno tesnjenje", "S počitim steklom pametna ura ni več vodoodporna kot prej."),
            ("Izpostavljeno tipalo", "Razpoka pusti optično tipalo ranljivo za udarce, znoj in umazanijo."),
            ("Nestabilen utrip", "Razpoka moti optični vmesnik — branje utripa lahko odpove."),
            ("Strah pred vodo", "Dež, umivanje rok ali lahka plavanje postanejo tveganje po poškodbi tipala."),
            ("Draga popravila", "Uradna zamenjava modula je draga in počasna — mnogi raje takojšnjo zaščito."),
            ("Tveganje večje škode", "Brez zaščite se lahko razpoka poveča — in poškodba tipala postane še hujša."),
        ],
        "paliativos_h2": "Zakaj začasne rešitve ne delujejo",
        "paliativos_intro": "Po razpoki mnogi improvizirajo — in poslabšajo težavo:",
        "paliativos_items": [
            ("<strong>Trak in generične nalepke:</strong> Odpadejo zaradi znoja in vode; ne zatesnijo resnično in umažejo tipalo."),
            ("<strong>Domače lepilo / smola:</strong> Lahko potisne vlago noter, pusti ostanke in oteži prihodnje popravilo."),
            ("<strong>Vedno »na suho«:</strong> Odrečete se treniranju, dežju in rutini — ura ne opravlja svoje vloge in se lahko še bolj poškoduje."),
        ],
        "paliativos_danger": "Improvizacija ne zatesni resnično",
        "produtos_title": "Naša profesionalna rešitev",
        "cards": [
            ("Obnovi tipala", "Pokrije razpoko in obnovi biometrijo."),
            ("Tesnjenje", "Obnovi originalno vodoodpornost."),
            ("Preprečevanje", "Preventivna zaščita pred udarci."),
            ("Ustavi razpoke", "Ustavi razpoko in prepreči širjenje."),
            ("Polnjenje", "100 % združljivo z induktivnim polnjenjem."),
            ("Brez zaklepov", "Konec zaklepov in zahtev za geslo."),
        ],
        "about_title": "O nas",
        "about": 'Sensor CrashFix je nastal iz lastniške tehnologije <a href="https://www.sensortattoofix.com" target="_blank" rel="noopener">Sensor TattooFix</a>. Ugotovili smo, da naša napredna optična leča ne omogoča le biometričnega branja, temveč tudi popolnoma zatesni zadnje steklo pametne ure. Razvili smo različico z večjim premerom, zasnovano za pokritje roba tipala, ustavitev razpok in vračilo vodotesnega tesnjenja brez zamenjave originalnega dela.',
        "role": "Ustanovitelj · Sensor CrashFix · 3N20",
        "alt_founder": "Fábio Nardoni, ustanovitelj Sensor CrashFix",
        "faq_title": "Pogosta vprašanja (FAQ)",
    },
    "fr": {
        "badge": "Technologie 3N20",
        "h1": "Pour réparer un capteur fissuré ou prévenir les dommages futurs",
        "hero_p": "Sensor CrashFix est un kit de réparation et de restauration optique. Notre lentille adhésive de haute précision scelle la fissure, restaure la lecture biométrique et redonne l’étanchéité — sans remplacer le module de votre montre.",
        "problema_title": "Le problème",
        "problema_intro": "Une fissure sur le capteur paraît « seulement esthétique » — jusqu’à ce que l’étanchéité cède. Eau, sueur et humidité entrent ; la lecture optique devient instable ; la montre n’est plus fiable au quotidien. Sans protection, la fissure peut empirer.",
        "problema_cards": [
            ("Étanchéité perdue", "Avec le verre fissuré, la montre connectée n’est plus étanche comme avant."),
            ("Capteur exposé", "La fissure laisse le capteur optique vulnérable aux chocs, à la sueur et à la saleté."),
            ("Rythme instable", "La fissure perturbe l’interface optique — la lecture du pouls peut échouer."),
            ("Peur de l’eau", "Pluie, lavage des mains ou natation légère deviennent un risque après le dommage du capteur."),
            ("Réparation coûteuse", "Le remplacement officiel du module est cher et lent — beaucoup préfèrent une couverture immédiate."),
            ("Risque de dégâts supplémentaires", "Sans protection, la fissure peut s’agrandir — et le dommage du capteur empire."),
        ],
        "paliativos_h2": "Pourquoi les solutions de fortune échouent",
        "paliativos_intro": "Après la fissure, beaucoup improvisent — et aggravent le problème :",
        "paliativos_items": [
            ("<strong>Ruban et stickers génériques :</strong> Se décollent avec la sueur et l’eau ; ne scellent pas vraiment et salissent le capteur."),
            ("<strong>Colle / résine maison :</strong> Peut pousser l’humidité à l’intérieur, laisser des résidus et compliquer une réparation future."),
            ("<strong>L’utiliser « toujours au sec » :</strong> Vous renoncez à l’entraînement, à la pluie et au quotidien — la montre ne remplit plus son rôle et peut s’endommager davantage."),
        ],
        "paliativos_danger": "Improviser ne scelle pas vraiment",
        "produtos_title": "Notre solution professionnelle",
        "cards": [
            ("Restaure les capteurs", "Couvre la fissure et restaure la biométrie."),
            ("Étanchéité", "Restaure l’imperméabilité d’origine."),
            ("Prévention", "Protection préventive contre les chocs."),
            ("Stoppe les fissures", "Stoppe la fissure et évite qu’elle s’étende."),
            ("Charge", "100 % compatible avec la charge par induction."),
            ("Zéro verrouillage", "Fini les verrouillages et demandes de code."),
        ],
        "about_title": "Qui sommes-nous",
        "about": 'Sensor CrashFix est né de la technologie propriétaire de <a href="https://www.sensortattoofix.com" target="_blank" rel="noopener">Sensor TattooFix</a>. Nous avons constaté que notre lentille optique avancée permettait non seulement la lecture biométrique, mais scellait aussi complètement le verre arrière de la montre. Nous avons alors développé une version à diamètre élargi, conçue pour couvrir le bord du capteur, stopper les fissures et rétablir l’étanchéité sans remplacer la pièce d’origine.',
        "role": "Fondateur · Sensor CrashFix · 3N20",
        "alt_founder": "Fábio Nardoni, fondateur de Sensor CrashFix",
        "faq_title": "Questions fréquentes (FAQ)",
    },
    "nl": {
        "badge": "3N20-technologie",
        "h1": "Om een gebarsten sensor te repareren of toekomstige schade te voorkomen",
        "hero_p": "Sensor CrashFix is een optische reparatie- en herstelkit. Onze hoogprecieze kleeflens dicht de barst, herstelt biometrische meting en brengt waterdichtheid terug — zonder de module van je horloge te vervangen.",
        "problema_title": "Het probleem",
        "problema_intro": "Een barst in de sensor lijkt “alleen cosmetisch” — tot de afdichting faalt. Water, zweet en vocht komen binnen; de optische meting wordt onstabiel; het horloge is dagelijks niet meer betrouwbaar. Zonder bescherming kan de barst erger worden.",
        "problema_cards": [
            ("Afdichting verloren", "Met gebarsten glas is de smartwatch niet meer waterdicht zoals eerder."),
            ("Sensor blootgesteld", "De barst maakt de optische sensor kwetsbaar voor schokken, zweet en vuil."),
            ("Onstabiele hartslag", "De barst verstoort de optische interface — hartslagmeting kan falen."),
            ("Bang voor water", "Regen, handen wassen of licht zwemmen worden een risico na sensorschade."),
            ("Dure reparatie", "Officiële modulevervanging is duur en traag — velen willen meteen een afdekking."),
            ("Risico op meer schade", "Zonder bescherming kan de barst groeien — en de sensorschade wordt erger."),
        ],
        "paliativos_h2": "Waarom noodreparaties mislukken",
        "paliativos_intro": "Na een barst improviseren velen — en maken het erger:",
        "paliativos_items": [
            ("<strong>Tape en generieke stickers:</strong> Laten los door zweet en water; dichten niet echt af en maken de sensor vies."),
            ("<strong>Huis-tuin-keukenlijm / hars:</strong> Kan vocht naar binnen duwen, resten achterlaten en een latere reparatie bemoeilijken."),
            ("<strong>Voor altijd “droog” gebruiken:</strong> Je geeft training, regen en routine op — het horloge doet zijn werk niet meer en kan verder beschadigd raken."),
        ],
        "paliativos_danger": "Improviseren dicht niet echt af",
        "produtos_title": "Onze professionele oplossing",
        "cards": [
            ("Herstelt sensoren", "Dekt de barst af en herstelt biometrie."),
            ("Afdichting", "Herstelt de originele waterdichtheid."),
            ("Preventie", "Preventieve bescherming tegen schokken."),
            ("Stopt barsten", "Stopt de barst en voorkomt uitbreiding."),
            ("Opladen", "100% compatibel met inductieladen."),
            ("Geen vergrendelingen", "Geen vergrendelingen en codevragen meer."),
        ],
        "about_title": "Over ons",
        "about": 'Sensor CrashFix is ontstaan uit de eigen technologie van <a href="https://www.sensortattoofix.com" target="_blank" rel="noopener">Sensor TattooFix</a>. We zagen dat onze geavanceerde optische lens niet alleen biometrische meting mogelijk maakte, maar ook het achterglas van de smartwatch volledig afdichtte. Daarom ontwikkelden we een versie met grotere diameter, ontworpen om de sensorrand te bedekken, barsten te stoppen en waterdichte afdichting terug te brengen zonder het originele onderdeel te vervangen.',
        "role": "Oprichter · Sensor CrashFix · 3N20",
        "alt_founder": "Fábio Nardoni, oprichter van Sensor CrashFix",
        "faq_title": "Veelgestelde vragen (FAQ)",
    },
    "sv": {
        "badge": "3N20-teknik",
        "h1": "För att reparera en sprucken sensor eller förebygga framtida skador",
        "hero_p": "Sensor CrashFix är ett optiskt reparations- och återställningskit. Vår högprecisionslimmade lins tätar sprickan, återställer biometrisk avläsning och ger tillbaka vattentåligheten — utan att byta urens modul.",
        "problema_title": "Problemet",
        "problema_intro": "En spricka i sensorn ser ”bara kosmetisk” ut — tills tätningen ger upp. Vatten, svett och fukt tar sig in; den optiska avläsningen blir ostabil; klockan är inte längre pålitlig i vardagen. Utan skydd kan sprickan bli värre.",
        "problema_cards": [
            ("Förlorad tätning", "Med sprucket glas är smartklockan inte längre vattentät som förr."),
            ("Exponerad sensor", "Sprickan lämnar den optiska sensorn sårbar för stötar, svett och smuts."),
            ("Instabil puls", "Sprickan stör det optiska gränssnittet — pulsavläsning kan misslyckas."),
            ("Rädd för vatten", "Regn, handtvätt eller lätt simning blir en risk efter sensorskadan."),
            ("Dyr reparation", "Officiellt modulbyte är dyrt och långsamt — många vill ha omedelbart skydd."),
            ("Risk för mer skada", "Utan skydd kan sprickan växa — och sensorskadan blir ännu värre."),
        ],
        "paliativos_h2": "Varför provisoriska lösningar misslyckas",
        "paliativos_intro": "Efter en spricka improviserar många — och gör det värre:",
        "paliativos_items": [
            ("<strong>Tejp och generiska dekaler:</strong> Lossnar av svett och vatten; tätar inte på riktigt och smutsar sensorn."),
            ("<strong>Hemmalim / harts:</strong> Kan trycka in fukt, lämna rester och försvåra en framtida reparation."),
            ("<strong>Använda ”alltid torrt”:</strong> Du ger upp träning, regn och rutin — klockan fyller inte sin roll och kan skadas mer."),
        ],
        "paliativos_danger": "Improvisation tätar inte på riktigt",
        "produtos_title": "Vår professionella lösning",
        "cards": [
            ("Återställer sensorer", "Täcker sprickan och återställer biometri."),
            ("Tätning", "Återställer original vattentäthet."),
            ("Förebyggande", "Förebyggande skydd mot stötar."),
            ("Stoppar sprickor", "Stoppar sprickan och förhindrar spridning."),
            ("Laddning", "100 % kompatibel med induktiv laddning."),
            ("Inga låsningar", "Slut på låsningar och kodförfrågningar."),
        ],
        "about_title": "Om oss",
        "about": 'Sensor CrashFix föddes ur den proprietära tekniken hos <a href="https://www.sensortattoofix.com" target="_blank" rel="noopener">Sensor TattooFix</a>. Vi såg att vår avancerade optiska lins inte bara möjliggjorde biometrisk avläsning utan också helt tätade smartklockans bakglas. Vi utvecklade därför en version med större diameter, utformad för att täcka sensorns kant, stoppa sprickor och återställa vattentät tätning utan att byta originaldelen.',
        "role": "Grundare · Sensor CrashFix · 3N20",
        "alt_founder": "Fábio Nardoni, grundare av Sensor CrashFix",
        "faq_title": "Vanliga frågor (FAQ)",
    },
    "no": {
        "badge": "3N20-teknologi",
        "h1": "For å reparere en sprukket sensor eller forebygge fremtidig skade",
        "hero_p": "Sensor CrashFix er et optisk reparasjons- og restaureringssett. Vår høyprecisions limlinse tetter sprekken, gjenoppretter biometrisk avlesning og gir tilbake vanntettheten — uten å bytte klokkens modul.",
        "problema_title": "Problemet",
        "problema_intro": "En sprekk i sensoren ser «bare kosmetisk» ut — til tetningen svikter. Vann, svette og fukt kommer inn; den optiske avlesningen blir ustabil; klokken er ikke lenger til å stole på i hverdagen. Uten beskyttelse kan sprekken bli verre.",
        "problema_cards": [
            ("Mistet tetning", "Med sprukket glass er smartklokken ikke lenger vanntett som før."),
            ("Eksponert sensor", "Sprekken lar den optiske sensoren være sårbar for støt, svette og skitt."),
            ("Ustabil puls", "Sprekken forstyrrer det optiske grensesnittet — pulsavlesning kan svikte."),
            ("Redd for vann", "Regn, håndvask eller lett svømming blir en risiko etter sensorskaden."),
            ("Dyr reparasjon", "Offisiell modulbytte er dyrt og tregt — mange vil ha umiddelbar dekning."),
            ("Fare for mer skade", "Uten beskyttelse kan sprekken vokse — og sensorskaden blir enda verre."),
        ],
        "paliativos_h2": "Hvorfor provisoriske løsninger feiler",
        "paliativos_intro": "Etter en sprekk improviserer mange — og gjør det verre:",
        "paliativos_items": [
            ("<strong>Tape og generiske klistremerker:</strong> Løsner av svette og vann; tetter ikke egentlig og skitner til sensoren."),
            ("<strong>Hjemmelaget lim / harpiks:</strong> Kan presse fukt inn, etterlate rester og gjøre senere reparasjon vanskeligere."),
            ("<strong>Bruke «alltid tørt»:</strong> Du gir opp trening, regn og rutine — klokken gjør ikke jobben sin og kan skades mer."),
        ],
        "paliativos_danger": "Improvisering tetter ikke egentlig",
        "produtos_title": "Vår profesjonelle løsning",
        "cards": [
            ("Gjenoppretter sensorer", "Dekker sprekken og gjenoppretter biometri."),
            ("Tetning", "Gjenoppretter original vanntetthet."),
            ("Forebygging", "Forebyggende beskyttelse mot støt."),
            ("Stopper sprekker", "Stopper sprekken og forhindrer utvidelse."),
            ("Lading", "100 % kompatibel med induktiv lading."),
            ("Ingen låsinger", "Slutt på låsinger og kodeforespørsler."),
        ],
        "about_title": "Om oss",
        "about": 'Sensor CrashFix ble født ut av den proprietære teknologien til <a href="https://www.sensortattoofix.com" target="_blank" rel="noopener">Sensor TattooFix</a>. Vi så at vår avanserte optiske linse ikke bare muliggjorde biometrisk avlesning, men også forseglet smartklokkens bakglass helt. Vi utviklet derfor en versjon med større diameter, laget for å dekke sensorkanten, stoppe sprekker og gjenopprette vanntett forsegling uten å bytte originaldelen.',
        "role": "Gründer · Sensor CrashFix · 3N20",
        "alt_founder": "Fábio Nardoni, gründer av Sensor CrashFix",
        "faq_title": "Ofte stilte spørsmål (FAQ)",
    },
    "fi": {
        "badge": "3N20-teknologia",
        "h1": "Haljenneen sensorin korjaamiseen tai tulevien vaurioiden ehkäisyyn",
        "hero_p": "Sensor CrashFix on optinen korjaus- ja palautussarja. Korkean tarkkuuden liimalinssimme sulkee halkeaman, palauttaa biometrisen lukemisen ja vedenkestävyyden — vaihtamatta kellon moduulia.",
        "problema_title": "Ongelma",
        "problema_intro": "Sensorin halkeama näyttää ”vain kosmeettiselta” — kunnes tiivistys pettää. Vesi, hiki ja kosteus pääsevät sisään; optinen lukema muuttuu epävakaaksi; kello ei ole enää luotettava arjessa. Ilman suojaa halkeama voi pahentua.",
        "problema_cards": [
            ("Tiivistys menetetty", "Haljenneella lasilla älykello ei ole enää vedenkestävä kuten ennen."),
            ("Paljastunut sensori", "Halkeama jättää optisen sensorin alttiiksi iskuille, hielle ja lialle."),
            ("Epävakaa syke", "Halkeama häiritsee optista rajapintaa — sykelukema voi pettää."),
            ("Veden pelko", "Sade, käsienpesu tai kevyt uinti muuttuvat riskiksi sensorivaurion jälkeen."),
            ("Kallis korjaus", "Virallinen moduulin vaihto on kallis ja hidas — monet haluavat heti peitteen."),
            ("Riski lisävaurioista", "Ilman suojaa halkeama voi kasvaa — ja sensorivaurio pahenee entisestään."),
        ],
        "paliativos_h2": "Miksi hätäratkaisut epäonnistuvat",
        "paliativos_intro": "Halkeaman jälkeen monet improvisoi — ja pahentavat ongelmaa:",
        "paliativos_items": [
            ("<strong>Teippi ja geneeriset tarrat:</strong> Irtoavat hierestä ja vedestä; eivät tiivistä oikeasti ja likaavat sensorin."),
            ("<strong>Kotiliima / hartsi:</strong> Voi työntää kosteutta sisään, jättää jäämiä ja vaikeuttaa myöhempää korjausta."),
            ("<strong>Käyttö ”aina kuivana”:</strong> Luovut treenistä, sateesta ja arjesta — kello ei täytä tehtäväänsä ja voi vaurioitua lisää."),
        ],
        "paliativos_danger": "Improvisointi ei tiivistä oikeasti",
        "produtos_title": "Ammattimainen ratkaisumme",
        "cards": [
            ("Palauttaa sensorit", "Peittää halkeaman ja palauttaa biometrian."),
            ("Tiivistys", "Palauttaa alkuperäisen vedenkestävyyden."),
            ("Ennaltaehkäisy", "Ennaltaehkäisevä suoja iskuja vastaan."),
            ("Pysäyttää halkeamat", "Pysäyttää halkeaman ja estää leviämisen."),
            ("Lataus", "100 % yhteensopiva induktiolatauksen kanssa."),
            ("Ei lukituksia", "Ei enää lukituksia eikä koodipyyntöjä."),
        ],
        "about_title": "Meistä",
        "about": 'Sensor CrashFix syntyi <a href="https://www.sensortattoofix.com" target="_blank" rel="noopener">Sensor TattooFixin</a> omasta teknologiasta. Huomasimme, että edistynyt optinen linssimme ei vain mahdollistanut biometristä lukemista, vaan myös tiivisti älykellon takalasin täysin. Kehitimme siksi suuremman halkaisijan version, joka peittää sensorin reunan, pysäyttää halkeamat ja palauttaa vesitiiviin tiivistyksen ilman alkuperäisen osan vaihtoa.',
        "role": "Perustaja · Sensor CrashFix · 3N20",
        "alt_founder": "Fábio Nardoni, Sensor CrashFixin perustaja",
        "faq_title": "Usein kysytyt kysymykset (UKK)",
    },
}


def replace_card_texts(block: str, pairs: list[tuple[str, str]]) -> str:
    h3s = list(re.finditer(r"<h3[^>]*>[\s\S]*?</h3>", block))
    ps = list(re.finditer(r"<p(?:\s+[^>]*)?>[\s\S]*?</p>", block))
    if len(h3s) < len(pairs) or len(ps) < len(pairs):
        raise SystemExit(f"expected {len(pairs)} cards, got h3={len(h3s)} p={len(ps)}")
    events = sorted(
        [(x.start(), x.end(), "h", i) for i, x in enumerate(h3s[: len(pairs)])]
        + [(x.start(), x.end(), "p", i) for i, x in enumerate(ps[: len(pairs)])]
    )
    pieces: list[str] = []
    last = 0
    for start, end, kind, i in events:
        pieces.append(block[last:start])
        title, sub = pairs[i]
        if kind == "h":
            # Keep existing style attrs on h3 when present
            open_tag = re.match(r"<h3[^>]*>", block[start:end])
            style = open_tag.group(0) if open_tag else "<h3>"
            if 'style="' not in style:
                style = '<h3 style="color: #5EC8D8; margin-bottom: 10px;">'
            elif "margin-bottom" not in style:
                style = style.replace('">', '; margin-bottom: 10px;">') if '">' in style else style
            pieces.append(f"{style}{title}</h3>")
        else:
            pieces.append(f"<p>{sub}</p>")
        last = end
    pieces.append(block[last:])
    return "".join(pieces)


def patch(lang: str, t: dict) -> None:
    path = Path(f"{lang}/index.html")
    html = path.read_text(encoding="utf-8")
    before_imgs = re.findall(r'<img[^>]+src="([^"]+)"', html)
    before_scripts = re.findall(r'<script[^>]+src="([^"]+)"', html)
    before_cta = "optical-lens-intl" in html

    if not before_cta:
        raise SystemExit(f"{lang}: missing optical-lens-intl CTA before patch")
    if "kit-box" not in html or "hidden" not in html:
        raise SystemExit(f"{lang}: kit-box must stay hidden")

    if "stf-feedback-fab { left: auto" not in html:
        html = html.replace("</head>", FLOAT_CSS + "\n</head>", 1)

    html = re.sub(
        r'(<span class="badge">)[^<]+(</span>)',
        rf"\g<1>{t['badge']}\2",
        html,
        count=1,
    )
    html = re.sub(
        r'(<section id="top" class="hero">[\s\S]*?<h1>)[^<]+(</h1>)',
        rf"\g<1>{t['h1']}\2",
        html,
        count=1,
    )
    html = re.sub(
        r'(<section id="top" class="hero">[\s\S]*?</h1>\s*<p>)[\s\S]*?(</p>\s*<div class="hero-btns">)',
        rf"\g<1>{t['hero_p']}\2",
        html,
        count=1,
    )

    # Problem section — inject PT-equivalent 6-card grid when missing (many intl shells only had intro)
    problema_icons = [
        '<i class="fas fa-tint"></i>',
        '<i class="fas fa-shield-alt"></i>',
        '<i class="fas fa-heartbeat"></i>',
        '<i class="fas fa-swimmer"></i>',
        '<i class="fas fa-tools"></i>',
        '<span class="icon-cracked-sphere" aria-hidden="true"></span>',
    ]
    cards_html = "\n".join(
        f"""                <div class="card">
                    {problema_icons[i]}
                    <h3>{title}</h3>
                    <p>{sub}</p>
                </div>"""
        for i, (title, sub) in enumerate(t["problema_cards"])
    )
    problema_block = f"""    <section id="problema" class="content-section grey-bg">
        <div class="container">
            <h2 class="section-title">{t['problema_title']}</h2>
            <div class="problem-intro">
                <p>{t['problema_intro']}</p>
            </div>
            <div class="problem-grid">
{cards_html}
            </div>
        </div>
    </section>"""
    html = re.sub(
        r'<section id="problema" class="content-section grey-bg">[\s\S]*?</section>',
        problema_block,
        html,
        count=1,
    )

    # Paliativos
    html = re.sub(
        r'(id="paliativos"[\s\S]*?<div class="text-block">\s*<h2>)[^<]+(</h2>)',
        rf"\g<1>{t['paliativos_h2']}\2",
        html,
        count=1,
    )
    html = re.sub(
        r'(id="paliativos"[\s\S]*?<div class="text-block">\s*<h2>[^<]*</h2>\s*<p>)[\s\S]*?(</p>\s*<ul class="fail-list">)',
        rf"\g<1>{t['paliativos_intro']}\2",
        html,
        count=1,
    )
    fm = re.search(r'(<ul class="fail-list">)([\s\S]*?)(</ul>)', html)
    if not fm:
        raise SystemExit(f"{lang}: fail-list missing")
    lis = list(re.finditer(r"<li>[\s\S]*?</li>", fm.group(2)))
    if len(lis) < 3:
        raise SystemExit(f"{lang}: expected 3 paliativos items")
    new_lis = []
    for i, item in enumerate(t["paliativos_items"]):
        new_lis.append(
            f'<li><i class="fas fa-times-circle"></i> <div>{item}</div></li>'
        )
    rest = fm.group(2)[lis[2].end() :]
    html = html[: fm.start(2)] + "\n                    ".join([""] + new_lis) + "\n                " + rest + html[fm.end(2) :]
    html = re.sub(
        r'(<div class="danger-box">\s*)[\s\S]*?(</div>)',
        rf"\g<1>{t['paliativos_danger']}\n                \2",
        html,
        count=1,
    )

    # Produtos title + benefit cards
    html = re.sub(
        r'(id="produtos"[\s\S]*?<h2 class="section-title">)[^<]+(</h2>)',
        rf"\g<1>{t['produtos_title']}\2",
        html,
        count=1,
    )
    m = re.search(
        r'(<div class="product-benefits-grid"[^>]*>)([\s\S]*?)(</div>\s*<div class="product-solution-media">)',
        html,
    )
    if not m:
        raise SystemExit(f"{lang}: benefits grid not found")
    html = html[: m.start(2)] + replace_card_texts(m.group(2), t["cards"]) + html[m.end(2) :]

    # About
    html = re.sub(
        r'(id="quem-somos"[\s\S]*?<h2 class="section-title">)[^<]+(</h2>)',
        rf"\g<1>{t['about_title']}\2",
        html,
        count=1,
    )
    about_re = re.compile(
        r'(<div class="about-card about-card--story">)([\s\S]*?)(<div class="about-signature">)',
    )
    am = about_re.search(html)
    if not am:
        raise SystemExit(f"{lang}: about card missing")
    middle = f"""
                <p class="about-body">{t['about']}</p>

                <h3 class="about-story-heading" hidden>Patents</h3>
                <p class="about-body" hidden>Optical lens and adhesion technology is registered to protect authenticity in Brazil and abroad:</p>
                <div class="about-patents" hidden aria-label="Patent registrations">
                    <div class="about-patent">
                        <i class="fas fa-award" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">National patent · INPI</span>
                            <span class="about-patent-num">BR 20 2026 010875 3</span>
                        </div>
                    </div>
                    <div class="about-patent">
                        <i class="fas fa-globe-americas" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">International patent · PCT</span>
                            <span class="about-patent-num">PCT BR 2026 050304</span>
                        </div>
                    </div>
                </div>

                """
    html = about_re.sub(r"\1" + middle + r"\3", html, count=1)
    html = re.sub(
        r'(<p class="about-signature-role">)[^<]+(</p>)',
        rf"\g<1>{t['role']}\2",
        html,
        count=1,
    )
    html = re.sub(
        r'<img src="([^"]*fundador-fabio[^"]*)"[^>]*alt="[^"]*"',
        rf'<img src="\1" alt="{t["alt_founder"]}"',
        html,
        count=1,
    )

    html = re.sub(
        r"\n\s*<section id=\"guia-reparo\" class=\"content-section\">[\s\S]*?</section>\s*",
        "\n\n",
        html,
        count=1,
    )

    html = re.sub(
        r'(id="faq"[\s\S]*?<h2 class="section-title">)[^<]+(</h2>)',
        rf"\g<1>{t['faq_title']}\2",
        html,
        count=1,
    )

    after_imgs = re.findall(r'<img[^>]+src="([^"]+)"', html)
    after_scripts = re.findall(r'<script[^>]+src="([^"]+)"', html)
    if after_imgs != before_imgs:
        raise SystemExit(f"{lang}: image srcs changed — abort")
    if after_scripts != before_scripts:
        raise SystemExit(f"{lang}: script srcs changed — abort")
    if "optical-lens-intl" not in html:
        raise SystemExit(f"{lang}: optical-lens-intl CTA lost")
    if "kit-box" not in html or "hidden" not in html:
        raise SystemExit(f"{lang}: kit-box hidden lost")
    if "product-benefits-grid" not in html:
        raise SystemExit(f"{lang}: benefits grid lost")

    path.write_text(html, encoding="utf-8")
    print("OK", lang)


def main() -> None:
    for lang, t in LANGS.items():
        patch(lang, t)


if __name__ == "__main__":
    main()
