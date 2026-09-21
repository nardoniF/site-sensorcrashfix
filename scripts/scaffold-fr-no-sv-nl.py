#!/usr/bin/env python3
"""Scaffold FR/NO/SV/NL from EN: pages, lockups, minimal i18n overrides."""
from __future__ import annotations

import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PROBLEMA = {
    "fr": """    <section id="problema" class="content-section grey-bg">
        <div class="container">
            <h2 class="section-title">Le problème</h2>
            <div class="problem-intro">
                <p>Une fissure sur le capteur paraît « purement esthétique » — jusqu’à ce que l’étanchéité cède. Eau, sueur et humidité s’infiltrent ; la lecture optique devient instable ; la montre n’est plus fiable au quotidien. Sans protection, la fissure peut s’aggraver.</p>
            </div>
            <div class="problem-grid">
                <div class="card">
                    <i class="fas fa-tint"></i>
                    <h3>Étanchéité perdue</h3>
                    <p>Avec le verre fissuré, la smartwatch n’est plus étanche comme avant.</p>
                </div>
                <div class="card">
                    <i class="fas fa-shield-alt"></i>
                    <h3>Capteur exposé</h3>
                    <p>La fissure laisse le capteur optique vulnérable aux chocs, à la sueur et à la saleté.</p>
                </div>
                <div class="card">
                    <i class="fas fa-heartbeat"></i>
                    <h3>Rythme cardiaque instable</h3>
                    <p>La fissure perturbe l’interface optique — la lecture du pouls peut échouer.</p>
                </div>
                <div class="card">
                    <i class="fas fa-swimmer"></i>
                    <h3>Peur de l’eau</h3>
                    <p>Pluie, lavage des mains ou natation légère deviennent un risque après le dommage au capteur.</p>
                </div>
                <div class="card">
                    <i class="fas fa-tools"></i>
                    <h3>Réparation coûteuse</h3>
                    <p>Le remplacement officiel du module/capteur est cher et long — beaucoup préfèrent une couverture immédiate.</p>
                </div>
                <div class="card">
                    <span class="icon-cracked-sphere" aria-hidden="true"></span>
                    <h3>Risque d’aggraver les dégâts</h3>
                    <p>Sans protection, la fissure peut s’élargir — et le dommage au capteur empire encore.</p>
                </div>
            </div>
        </div>
    </section>""",
    "no": """    <section id="problema" class="content-section grey-bg">
        <div class="container">
            <h2 class="section-title">Problemet</h2>
            <div class="problem-intro">
                <p>En sprekk i sensoren ser «bare kosmetisk» ut — til tetningen svikter. Vann, svette og fukt trenger inn; den optiske avlesningen blir ustabil; klokken er ikke lenger til å stole på i hverdagen. Uten beskyttelse kan sprekken bli verre.</p>
            </div>
            <div class="problem-grid">
                <div class="card">
                    <i class="fas fa-tint"></i>
                    <h3>Mistet tetning</h3>
                    <p>Med sprukket glass er ikke smartklokken vanntett som før.</p>
                </div>
                <div class="card">
                    <i class="fas fa-shield-alt"></i>
                    <h3>Eksponert sensor</h3>
                    <p>Sprekken gjør den optiske sensoren sårbar for støt, svette og skitt.</p>
                </div>
                <div class="card">
                    <i class="fas fa-heartbeat"></i>
                    <h3>Ustabil puls</h3>
                    <p>Sprekken forstyrrer det optiske grensesnittet — pulsavlesningen kan svikte.</p>
                </div>
                <div class="card">
                    <i class="fas fa-swimmer"></i>
                    <h3>Redd for vann</h3>
                    <p>Regn, håndvask eller lett svømming blir en risiko etter skaden på sensoren.</p>
                </div>
                <div class="card">
                    <i class="fas fa-tools"></i>
                    <h3>Dyr reparasjon</h3>
                    <p>Offisiell bytte av modul/sensor er dyrt og tar tid — mange foretrekker en umiddelbar dekning.</p>
                </div>
                <div class="card">
                    <span class="icon-cracked-sphere" aria-hidden="true"></span>
                    <h3>Fare for mer skade</h3>
                    <p>Uten beskyttelse kan sprekken vokse — og skaden på sensoren blir enda verre.</p>
                </div>
            </div>
        </div>
    </section>""",
    "sv": """    <section id="problema" class="content-section grey-bg">
        <div class="container">
            <h2 class="section-title">Problemet</h2>
            <div class="problem-intro">
                <p>En spricka i sensorn ser »bara kosmetisk« ut — tills tätningen ger vika. Vatten, svett och fukt tränger in; den optiska avläsningen blir ostabil; klockan är inte längre pålitlig i vardagen. Utan skydd kan sprickan bli värre.</p>
            </div>
            <div class="problem-grid">
                <div class="card">
                    <i class="fas fa-tint"></i>
                    <h3>Förlorad tätning</h3>
                    <p>Med sprucket glas är smartklockan inte längre vattentät som tidigare.</p>
                </div>
                <div class="card">
                    <i class="fas fa-shield-alt"></i>
                    <h3>Exponerad sensor</h3>
                    <p>Sprickan gör den optiska sensorn sårbar för stötar, svett och smuts.</p>
                </div>
                <div class="card">
                    <i class="fas fa-heartbeat"></i>
                    <h3>Ostabil puls</h3>
                    <p>Sprickan stör det optiska gränssnittet — pulsavläsningen kan misslyckas.</p>
                </div>
                <div class="card">
                    <i class="fas fa-swimmer"></i>
                    <h3>Rädsla för vatten</h3>
                    <p>Regn, handtvätt eller lätt simning blir en risk efter skadan på sensorn.</p>
                </div>
                <div class="card">
                    <i class="fas fa-tools"></i>
                    <h3>Dyr reparation</h3>
                    <p>Officiellt byte av modul/sensor är dyrt och tar tid — många föredrar ett omedelbart skydd.</p>
                </div>
                <div class="card">
                    <span class="icon-cracked-sphere" aria-hidden="true"></span>
                    <h3>Risk för mer skada</h3>
                    <p>Utan skydd kan sprickan växa — och skadan på sensorn blir ännu värre.</p>
                </div>
            </div>
        </div>
    </section>""",
    "nl": """    <section id="problema" class="content-section grey-bg">
        <div class="container">
            <h2 class="section-title">Het probleem</h2>
            <div class="problem-intro">
                <p>Een barst in de sensor lijkt “alleen cosmetisch” — tot de afdichting faalt. Water, zweet en vocht komen binnen; de optische meting wordt onstabiel; het horloge is niet meer betrouwbaar in het dagelijks leven. Zonder bescherming kan de barst erger worden.</p>
            </div>
            <div class="problem-grid">
                <div class="card">
                    <i class="fas fa-tint"></i>
                    <h3>Afdichting verloren</h3>
                    <p>Met gebarsten glas is de smartwatch niet meer waterdicht zoals eerder.</p>
                </div>
                <div class="card">
                    <i class="fas fa-shield-alt"></i>
                    <h3>Sensor blootgesteld</h3>
                    <p>De barst maakt de optische sensor kwetsbaar voor stoten, zweet en vuil.</p>
                </div>
                <div class="card">
                    <i class="fas fa-heartbeat"></i>
                    <h3>Onstabiele hartslag</h3>
                    <p>De barst verstoort de optische interface — de polsslagmeting kan falen.</p>
                </div>
                <div class="card">
                    <i class="fas fa-swimmer"></i>
                    <h3>Bang voor water</h3>
                    <p>Regen, handen wassen of licht zwemmen worden een risico na schade aan de sensor.</p>
                </div>
                <div class="card">
                    <i class="fas fa-tools"></i>
                    <h3>Dure reparatie</h3>
                    <p>Officiële vervanging van module/sensor is duur en duurt lang — velen prefereren een directe afdekking.</p>
                </div>
                <div class="card">
                    <span class="icon-cracked-sphere" aria-hidden="true"></span>
                    <h3>Gevaar voor meer schade</h3>
                    <p>Zonder bescherming kan de barst groeien — en de schade aan de sensor wordt nog erger.</p>
                </div>
            </div>
        </div>
    </section>""",
}

LANGS = {
    "fr": {
        "label": "Français",
        "flag": "fr",
        "html_lang": "fr",
        "og_locale": "fr_FR",
        "global": "STF_I18N_FR",
        "tagline": "Blindage Optique Progressif. Prévention et réparation.",
        "lockup_alt": "Sensor CrashFix — Blindage Optique Progressif. Prévention et réparation.",
        "nav": {
            "The Problem": "Le problème",
            "Products": "Produits",
            "About Us": "Qui sommes-nous",
            "FAQ": "FAQ",
            "Contact": "Contact",
            "Buy Now": "Acheter",
            "Open menu": "Ouvrir le menu",
            "Social media": "Réseaux sociaux",
        },
        "hero": {
            "3N20 Technology": "Technologie 3N20",
            "Preventive protection or sensor restoration": "Protection préventive ou restauration du capteur",
            "Protect your sensor before damage happens, or restore an already cracked sensor.": "Protégez votre capteur avant les dégâts, ou restaurez un capteur déjà fissuré.",
            "Graduated Optical Shielding developed to preserve the sensor, without interfering with biometric functions and charging.": "Blindage Optique Progressif conçu pour préserver le capteur, sans interférer avec les fonctions biométriques ni la charge.",
            "Exceptional adhesion — waterproof against water, sweat, and time.": "Adhérence exceptionnelle — résiste à l’eau, à la sueur et au temps.",
            "See How It Works": "Voir comment ça marche",
        },
        "paliativos": {
            "Why DIY Fixes Fail": "Pourquoi les bricolages échouent",
            "After a crack, many people improvise — and make it worse:": "Après une fissure, beaucoup improvisent — et aggravent le problème :",
            "Tape and generic stickers:": "Ruban et stickers génériques :",
            "Peel off with sweat and water; they don’t truly seal and dirty the sensor.": "Se décollent avec la sueur et l’eau ; ils n’étanchéifient pas vraiment et salissent le capteur.",
            "Home glue / resin:": "Colle / résine maison :",
            "Can push moisture inside, leave residue and complicate a future repair.": "Peut faire entrer l’humidité, laisser des résidus et compliquer une réparation future.",
            "“Keep it dry forever”:": "« Garder au sec pour toujours » :",
            "You give up training, rain and routine — the watch stops doing its job and can get damaged further.": "Vous renoncez au sport, à la pluie et au quotidien — la montre ne fait plus son travail et peut s’abîmer davantage.",
            "Improvising doesn’t truly seal": "Improviser n’étanchéifie pas vraiment",
        },
        "produtos": {
            "Our Professional Solution": "Notre solution professionnelle",
            "Optical Recovery": "Récupération optique",
            "Restores precise sensor reading.": "Restaure une lecture précise du capteur.",
            "Full Seal": "Étanchéité complète",
            "Protects against water, sweat, and humidity.": "Protège contre l’eau, la sueur et l’humidité.",
            "Guided Application": "Application guidée",
            "Precise, clean fit over the sensor.": "Pose précise et propre sur le capteur.",
            "Watch Integrity": "Intégrité de la montre",
            "Contains the crack and helps prevent oxidation.": "Contient la fissure et aide à prévenir l’oxydation.",
            "Charging Preserved": "Charge préservée",
            "Ultra-thin and compatible with inductive charging.": "Ultra-fine et compatible avec la charge inductive.",
            "Impact Absorption": "Absorption des chocs",
            "Cushions impacts and protects the sensor.": "Amortit les impacts et protège le capteur.",
        },
        "about": {
            "About Us": "Qui sommes-nous",
            "was born from": "est né de",
            "the product made to restore smartwatch functions on": "le produit conçu pour restaurer les fonctions de la smartwatch sur",
            "tattooed skin": "peau tatouée",
            "That’s how Sensor CrashFix began": "C’est ainsi qu’est né Sensor CrashFix",
            "Frequently Asked Questions (FAQ)": "Questions fréquentes (FAQ)",
            "Where to Buy": "Où acheter",
            "Official store only — PayPal &amp; cards · tracked shipping.": "Boutique officielle uniquement — PayPal et cartes · envoi suivi.",
            "Official Store": "Boutique officielle",
            "Payment methods": "Moyens de paiement",
            "Card": "Carte",
            "Tracked shipping · price at checkout": "Envoi suivi · prix au paiement",
            "5.0 · verified buyers": "5,0 · acheteurs vérifiés",
            "Contact Us": "Nous contacter",
            "Questions about compatibility or wholesale orders?": "Questions sur la compatibilité ou les commandes en gros ?",
            "Full Name": "Nom complet",
            "Best Email": "Meilleur e-mail",
            "How can we help you today?": "Comment pouvons-nous vous aider ?",
            "Send Message": "Envoyer le message",
            "Contact — Sensor CrashFix": "Contact — Sensor CrashFix",
        },
        "meta": {
            "title": "Restaurez l’étanchéité de votre capteur fissuré | Sensor CrashFix",
            "description": "Verre de capteur de smartwatch fissuré ? Sensor CrashFix couvre le dommage, restaure l’étanchéité et aide la lecture cardiaque — Apple Watch, Samsung, Garmin.",
            "og_title": "Capteur fissuré ? Restaurez l’étanchéité | Sensor CrashFix",
            "og_description": "Un verre de capteur fissuré rompt l’étanchéité. Sensor CrashFix restaure la protection.",
            "tw_title": "Sensor CrashFix — Capteur de smartwatch fissuré",
            "tw_description": "Capteur fissuré ? Restaurez l’étanchéité avec Sensor CrashFix.",
        },
        "i18n": {
            "nav.cart": "Panier",
            "nav.back": "Retour",
            "nav.home": "Accueil",
            "nav.login": "Connexion",
            "nav.logout": "Déconnexion",
            "cart.title": "Votre panier",
            "cart.empty": "Le panier est vide",
            "summary.shipping": "Livraison",
            "summary.total": "Total",
            "page.checkoutTitle": "Paiement | Sensor CrashFix — Boutique officielle",
            "page.checkoutDesc": "Checkout officiel Sensor CrashFix — PayPal, cartes, envoi suivi.",
        },
    },
    "no": {
        "label": "Norsk",
        "flag": "no",
        "html_lang": "no",
        "og_locale": "nb_NO",
        "global": "STF_I18N_NO",
        "tagline": "Gradert Optisk Beskyttelse. Forebyggende og reparasjon.",
        "lockup_alt": "Sensor CrashFix — Gradert Optisk Beskyttelse. Forebyggende og reparasjon.",
        "nav": {
            "The Problem": "Problemet",
            "Products": "Produkter",
            "About Us": "Om oss",
            "FAQ": "FAQ",
            "Contact": "Kontakt",
            "Buy Now": "Kjøp nå",
            "Open menu": "Åpne meny",
            "Social media": "Sosiale medier",
        },
        "hero": {
            "3N20 Technology": "3N20-teknologi",
            "Preventive protection or sensor restoration": "Forebyggende beskyttelse eller sensorgjenoppretting",
            "Protect your sensor before damage happens, or restore an already cracked sensor.": "Beskytt sensoren før skaden skjer, eller gjenopprett en allerede sprukket sensor.",
            "Graduated Optical Shielding developed to preserve the sensor, without interfering with biometric functions and charging.": "Gradert Optisk Beskyttelse utviklet for å bevare sensoren, uten å forstyrre biometri og lading.",
            "Exceptional adhesion — waterproof against water, sweat, and time.": "Eksepsjonell festeevne — vanntett mot vann, svette og tid.",
            "See How It Works": "Se hvordan det fungerer",
        },
        "paliativos": {
            "Why DIY Fixes Fail": "Hvorfor hjemmelagde fikser feiler",
            "After a crack, many people improvise — and make it worse:": "Etter en sprekk improviserer mange — og gjør det verre:",
            "Tape and generic stickers:": "Teip og generiske klistremerker:",
            "Peel off with sweat and water; they don’t truly seal and dirty the sensor.": "Løsner med svette og vann; de tetter ikke skikkelig og skitner til sensoren.",
            "Home glue / resin:": "Hjemmelimt lim / resin:",
            "Can push moisture inside, leave residue and complicate a future repair.": "Kan presse fukt inn, etterlate rester og komplisere senere reparasjon.",
            "“Keep it dry forever”:": "«Hold den tørr for alltid»:",
            "You give up training, rain and routine — the watch stops doing its job and can get damaged further.": "Du dropper trening, regn og hverdag — klokken slutter å gjøre jobben og kan skades mer.",
            "Improvising doesn’t truly seal": "Improvisering tetter ikke skikkelig",
        },
        "produtos": {
            "Our Professional Solution": "Vår profesjonelle løsning",
            "Optical Recovery": "Optisk gjenoppretting",
            "Restores precise sensor reading.": "Gjenoppretter nøyaktig sensoravlesning.",
            "Full Seal": "Full tetning",
            "Protects against water, sweat, and humidity.": "Beskytter mot vann, svette og fukt.",
            "Guided Application": "Veiledet påføring",
            "Precise, clean fit over the sensor.": "Presis, ren passform over sensoren.",
            "Watch Integrity": "Klokkens integritet",
            "Contains the crack and helps prevent oxidation.": "Begrenser sprekken og hjelper mot oksidasjon.",
            "Charging Preserved": "Lading bevart",
            "Ultra-thin and compatible with inductive charging.": "Ultratykk og kompatibel med induktiv lading.",
            "Impact Absorption": "Støtabsorpsjon",
            "Cushions impacts and protects the sensor.": "Demper støt og beskytter sensoren.",
        },
        "about": {
            "About Us": "Om oss",
            "was born from": "oppsto fra",
            "the product made to restore smartwatch functions on": "produktet laget for å gjenopprette smartklokkefunksjoner på",
            "tattooed skin": "tatovert hud",
            "That’s how Sensor CrashFix began": "Slik startet Sensor CrashFix",
            "Frequently Asked Questions (FAQ)": "Ofte stilte spørsmål (FAQ)",
            "Where to Buy": "Hvor kjøpe",
            "Official store only — PayPal &amp; cards · tracked shipping.": "Kun offisiell butikk — PayPal og kort · sporet frakt.",
            "Official Store": "Offisiell butikk",
            "Payment methods": "Betalingsmetoder",
            "Card": "Kort",
            "Tracked shipping · price at checkout": "Sporet frakt · pris i kassen",
            "5.0 · verified buyers": "5,0 · verifiserte kjøpere",
            "Contact Us": "Kontakt oss",
            "Questions about compatibility or wholesale orders?": "Spørsmål om kompatibilitet eller engros?",
            "Full Name": "Fullt navn",
            "Best Email": "Beste e-post",
            "How can we help you today?": "Hvordan kan vi hjelpe deg?",
            "Send Message": "Send melding",
            "Contact — Sensor CrashFix": "Kontakt — Sensor CrashFix",
        },
        "meta": {
            "title": "Gjenopprett tetningen på den sprukne sensoren | Sensor CrashFix",
            "description": "Sprukket sensorglass på smartklokke? Sensor CrashFix dekker skaden, gjenoppretter tetningen og hjelper pulsmåling — Apple Watch, Samsung, Garmin.",
            "og_title": "Sprukket sensor? Gjenopprett tetningen | Sensor CrashFix",
            "og_description": "Sprukket sensorglass ødelegger vanntettheten. Sensor CrashFix gjenoppretter beskyttelsen.",
            "tw_title": "Sensor CrashFix — Sprukket smartklokkesensor",
            "tw_description": "Sprukket sensor? Gjenopprett vanntetthet med Sensor CrashFix.",
        },
        "i18n": {
            "nav.cart": "Handlekurv",
            "nav.back": "Tilbake",
            "nav.home": "Hjem",
            "nav.login": "Logg inn",
            "nav.logout": "Logg ut",
            "cart.title": "Handlekurven din",
            "cart.empty": "Handlekurven er tom",
            "summary.shipping": "Frakt",
            "summary.total": "Totalt",
            "page.checkoutTitle": "Kasse | Sensor CrashFix — Offisiell butikk",
            "page.checkoutDesc": "Offisiell Sensor CrashFix-kasse — PayPal, kort, sporet frakt.",
        },
    },
    "sv": {
        "label": "Svenska",
        "flag": "se",
        "html_lang": "sv",
        "og_locale": "sv_SE",
        "global": "STF_I18N_SV",
        "tagline": "Graderat Optiskt Skydd. Förebyggande och reparation.",
        "lockup_alt": "Sensor CrashFix — Graderat Optiskt Skydd. Förebyggande och reparation.",
        "nav": {
            "The Problem": "Problemet",
            "Products": "Produkter",
            "About Us": "Om oss",
            "FAQ": "FAQ",
            "Contact": "Kontakt",
            "Buy Now": "Köp nu",
            "Open menu": "Öppna meny",
            "Social media": "Sociala medier",
        },
        "hero": {
            "3N20 Technology": "3N20-teknik",
            "Preventive protection or sensor restoration": "Förebyggande skydd eller sensoråterställning",
            "Protect your sensor before damage happens, or restore an already cracked sensor.": "Skydda sensorn innan skadan sker, eller återställ en redan sprucken sensor.",
            "Graduated Optical Shielding developed to preserve the sensor, without interfering with biometric functions and charging.": "Graderat Optiskt Skydd utvecklat för att bevara sensorn, utan att störa biometri och laddning.",
            "Exceptional adhesion — waterproof against water, sweat, and time.": "Exceptionell vidhäftning — vattentät mot vatten, svett och tid.",
            "See How It Works": "Se hur det fungerar",
        },
        "paliativos": {
            "Why DIY Fixes Fail": "Varför hemmagjorda fixar misslyckas",
            "After a crack, many people improvise — and make it worse:": "Efter en spricka improviserar många — och gör det värre:",
            "Tape and generic stickers:": "Tejp och generiska klistermärken:",
            "Peel off with sweat and water; they don’t truly seal and dirty the sensor.": "Lossnar med svett och vatten; de tätar inte riktigt och smutsar sensorn.",
            "Home glue / resin:": "Hemmalim / harts:",
            "Can push moisture inside, leave residue and complicate a future repair.": "Kan trycka in fukt, lämna rester och försvåra framtida reparation.",
            "“Keep it dry forever”:": "»Håll den torr för alltid«:",
            "You give up training, rain and routine — the watch stops doing its job and can get damaged further.": "Du ger upp träning, regn och vardag — klockan slutar göra sitt jobb och kan skadas mer.",
            "Improvising doesn’t truly seal": "Improvisation tätar inte riktigt",
        },
        "produtos": {
            "Our Professional Solution": "Vår professionella lösning",
            "Optical Recovery": "Optisk återställning",
            "Restores precise sensor reading.": "Återställer precisionsavläsning.",
            "Full Seal": "Full tätning",
            "Protects against water, sweat, and humidity.": "Skyddar mot vatten, svett och fukt.",
            "Guided Application": "Guidad applicering",
            "Precise, clean fit over the sensor.": "Precision, ren passform över sensorn.",
            "Watch Integrity": "Klockans integritet",
            "Contains the crack and helps prevent oxidation.": "Begränsar sprickan och hjälper mot oxidation.",
            "Charging Preserved": "Laddning bevarad",
            "Ultra-thin and compatible with inductive charging.": "Ultratunn och kompatibel med induktiv laddning.",
            "Impact Absorption": "Stötabsorption",
            "Cushions impacts and protects the sensor.": "Dämpar stötar och skyddar sensorn.",
        },
        "about": {
            "About Us": "Om oss",
            "was born from": "föddes ur",
            "the product made to restore smartwatch functions on": "produkten som återställer smartklockefunktioner på",
            "tattooed skin": "tatuerad hud",
            "That’s how Sensor CrashFix began": "Så började Sensor CrashFix",
            "Frequently Asked Questions (FAQ)": "Vanliga frågor (FAQ)",
            "Where to Buy": "Var man köper",
            "Official store only — PayPal &amp; cards · tracked shipping.": "Endast officiell butik — PayPal och kort · spårbar frakt.",
            "Official Store": "Officiell butik",
            "Payment methods": "Betalningsmetoder",
            "Card": "Kort",
            "Tracked shipping · price at checkout": "Spårbar frakt · pris i kassan",
            "5.0 · verified buyers": "5,0 · verifierade köpare",
            "Contact Us": "Kontakta oss",
            "Questions about compatibility or wholesale orders?": "Frågor om kompatibilitet eller grossist?",
            "Full Name": "Fullständigt namn",
            "Best Email": "Bästa e-post",
            "How can we help you today?": "Hur kan vi hjälpa dig?",
            "Send Message": "Skicka meddelande",
            "Contact — Sensor CrashFix": "Kontakt — Sensor CrashFix",
        },
        "meta": {
            "title": "Återställ tätningen på den spruckna sensorn | Sensor CrashFix",
            "description": "Sprucket sensorgglas på smartklocka? Sensor CrashFix täcker skadan, återställer tätningen och hjälper pulsavläsning — Apple Watch, Samsung, Garmin.",
            "og_title": "Sprucken sensor? Återställ tätningen | Sensor CrashFix",
            "og_description": "Sprucket sensorgglas bryter vattentätheten. Sensor CrashFix återställer skyddet.",
            "tw_title": "Sensor CrashFix — Sprucken smartklockesensor",
            "tw_description": "Sprucken sensor? Återställ vattentäthet med Sensor CrashFix.",
        },
        "i18n": {
            "nav.cart": "Varukorg",
            "nav.back": "Tillbaka",
            "nav.home": "Hem",
            "nav.login": "Logga in",
            "nav.logout": "Logga ut",
            "cart.title": "Din varukorg",
            "cart.empty": "Varukorgen är tom",
            "summary.shipping": "Frakt",
            "summary.total": "Totalt",
            "page.checkoutTitle": "Kassa | Sensor CrashFix — Officiell butik",
            "page.checkoutDesc": "Officiell Sensor CrashFix-kassa — PayPal, kort, spårbar frakt.",
        },
    },
    "nl": {
        "label": "Nederlands",
        "flag": "nl",
        "html_lang": "nl",
        "og_locale": "nl_NL",
        "global": "STF_I18N_NL",
        "tagline": "Gegradueerde Optische Bescherming. Preventie en reparatie.",
        "lockup_alt": "Sensor CrashFix — Gegradueerde Optische Bescherming. Preventie en reparatie.",
        "nav": {
            "The Problem": "Het probleem",
            "Products": "Producten",
            "About Us": "Over ons",
            "FAQ": "FAQ",
            "Contact": "Contact",
            "Buy Now": "Nu kopen",
            "Open menu": "Menu openen",
            "Social media": "Sociale media",
        },
        "hero": {
            "3N20 Technology": "3N20-technologie",
            "Preventive protection or sensor restoration": "Preventieve bescherming of sensorherstel",
            "Protect your sensor before damage happens, or restore an already cracked sensor.": "Bescherm je sensor vóór schade, of herstel een al gebarsten sensor.",
            "Graduated Optical Shielding developed to preserve the sensor, without interfering with biometric functions and charging.": "Gegradueerde Optische Bescherming ontwikkeld om de sensor te behouden, zonder biometrie en opladen te verstoren.",
            "Exceptional adhesion — waterproof against water, sweat, and time.": "Uitzonderlijke hechting — waterdicht tegen water, zweet en tijd.",
            "See How It Works": "Bekijk hoe het werkt",
        },
        "paliativos": {
            "Why DIY Fixes Fail": "Waarom doe-het-zelf-oplossingen falen",
            "After a crack, many people improvise — and make it worse:": "Na een barst improviseren velen — en maken het erger:",
            "Tape and generic stickers:": "Tape en generieke stickers:",
            "Peel off with sweat and water; they don’t truly seal and dirty the sensor.": "Laten los door zweet en water; ze dichten niet echt en vervuilen de sensor.",
            "Home glue / resin:": "Huislĳm / hars:",
            "Can push moisture inside, leave residue and complicate a future repair.": "Kan vocht naar binnen duwen, resten achterlaten en latere reparatie bemoeilijken.",
            "“Keep it dry forever”:": "“Voor altijd droog houden”:",
            "You give up training, rain and routine — the watch stops doing its job and can get damaged further.": "Je geeft training, regen en routine op — het horloge doet zijn werk niet meer en kan verder beschadigd raken.",
            "Improvising doesn’t truly seal": "Improviseren dicht niet echt",
        },
        "produtos": {
            "Our Professional Solution": "Onze professionele oplossing",
            "Optical Recovery": "Optisch herstel",
            "Restores precise sensor reading.": "Herstelt precieze sensoruitlezing.",
            "Full Seal": "Volledige afdichting",
            "Protects against water, sweat, and humidity.": "Beschermt tegen water, zweet en vocht.",
            "Guided Application": "Begeleide aanbrenging",
            "Precise, clean fit over the sensor.": "Precieze, schone pasvorm over de sensor.",
            "Watch Integrity": "Integriteit van het horloge",
            "Contains the crack and helps prevent oxidation.": "Bevat de barst en helpt oxidatie voorkomen.",
            "Charging Preserved": "Opladen behouden",
            "Ultra-thin and compatible with inductive charging.": "Ultradun en compatibel met inductief opladen.",
            "Impact Absorption": "Schokabsorptie",
            "Cushions impacts and protects the sensor.": "Dempt schokken en beschermt de sensor.",
        },
        "about": {
            "About Us": "Over ons",
            "was born from": "ontstond uit",
            "the product made to restore smartwatch functions on": "het product om smartwatchfuncties te herstellen op",
            "tattooed skin": "getatoeëerde huid",
            "That’s how Sensor CrashFix began": "Zo begon Sensor CrashFix",
            "Frequently Asked Questions (FAQ)": "Veelgestelde vragen (FAQ)",
            "Where to Buy": "Waar te koop",
            "Official store only — PayPal &amp; cards · tracked shipping.": "Alleen officiële winkel — PayPal en kaarten · gevolgd verzenden.",
            "Official Store": "Officiële winkel",
            "Payment methods": "Betaalmethoden",
            "Card": "Kaart",
            "Tracked shipping · price at checkout": "Gevolgd verzenden · prijs bij checkout",
            "5.0 · verified buyers": "5,0 · geverifieerde kopers",
            "Contact Us": "Neem contact op",
            "Questions about compatibility or wholesale orders?": "Vragen over compatibiliteit of groothandel?",
            "Full Name": "Volledige naam",
            "Best Email": "Beste e-mail",
            "How can we help you today?": "Hoe kunnen we je helpen?",
            "Send Message": "Bericht verzenden",
            "Contact — Sensor CrashFix": "Contact — Sensor CrashFix",
        },
        "meta": {
            "title": "Herstel de afdichting van je gebarsten sensor | Sensor CrashFix",
            "description": "Gebarsten sensorglas van smartwatch? Sensor CrashFix dekt de schade, herstelt de afdichting en helpt hartslagmeting — Apple Watch, Samsung, Garmin.",
            "og_title": "Gebarsten sensor? Herstel de afdichting | Sensor CrashFix",
            "og_description": "Gebarsten sensorglas breekt waterdichtheid. Sensor CrashFix herstelt de bescherming.",
            "tw_title": "Sensor CrashFix — Gebarsten smartwatchsensor",
            "tw_description": "Gebarsten sensor? Herstel waterdichtheid met Sensor CrashFix.",
        },
        "i18n": {
            "nav.cart": "Winkelwagen",
            "nav.back": "Terug",
            "nav.home": "Home",
            "nav.login": "Inloggen",
            "nav.logout": "Uitloggen",
            "cart.title": "Je winkelwagen",
            "cart.empty": "Winkelwagen is leeg",
            "summary.shipping": "Verzending",
            "summary.total": "Totaal",
            "page.checkoutTitle": "Afrekenen | Sensor CrashFix — Officiële winkel",
            "page.checkoutDesc": "Officiële Sensor CrashFix-checkout — PayPal, kaarten, gevolgd verzenden.",
        },
    },
}

PAGES = ["comprar.html", "loja.html", "minha-conta.html", "onde-comprar.html", "comunidade.html"]


def apply_map(text: str, mapping: dict[str, str]) -> str:
    # longest keys first
    for src, dst in sorted(mapping.items(), key=lambda kv: len(kv[0]), reverse=True):
        text = text.replace(src, dst)
    return text


def translate_index(html: str, code: str, cfg: dict) -> str:
    html = html.replace('<html lang="en">', f'<html lang="{cfg["html_lang"]}">')
    html = html.replace("logo-lockup-en.webp", f"logo-lockup-{code}.webp")
    html = html.replace(
        "Sensor CrashFix — Graduated Optical Shielding. Prevention and repair.",
        cfg["lockup_alt"],
    )
    html = re.sub(
        r"<title>[^<]*</title>",
        f"<title>{cfg['meta']['title']}</title>",
        html,
        count=1,
    )
    html = re.sub(
        r'<meta name="description" content="[^"]*">',
        f'<meta name="description" content="{cfg["meta"]["description"]}">',
        html,
        count=1,
    )
    html = re.sub(
        r'og:locale" content="[^"]+"',
        f'og:locale" content="{cfg["og_locale"]}"',
        html,
        count=1,
    )
    html = re.sub(
        r'og:title" content="[^"]+"',
        f'og:title" content="{cfg["meta"]["og_title"]}"',
        html,
        count=1,
    )
    html = re.sub(
        r'og:description" content="[^"]+"',
        f'og:description" content="{cfg["meta"]["og_description"]}"',
        html,
        count=1,
    )
    html = re.sub(
        r'twitter:title" content="[^"]+"',
        f'twitter:title" content="{cfg["meta"]["tw_title"]}"',
        html,
        count=1,
    )
    html = re.sub(
        r'twitter:description" content="[^"]+"',
        f'twitter:description" content="{cfg["meta"]["tw_description"]}"',
        html,
        count=1,
    )
    # canonical / og:url → /{code}/
    html = html.replace(
        'href="https://www.sensorcrashfix.com/"',
        f'href="https://www.sensorcrashfix.com/{code}/"',
        1,
    )
    html = html.replace(
        'content="https://www.sensorcrashfix.com/"',
        f'content="https://www.sensorcrashfix.com/{code}/"',
        1,
    )
    html = html.replace(
        'value="https://www.sensorcrashfix.com/"',
        f'value="https://www.sensorcrashfix.com/{code}/"',
    )
    html = html.replace(" data-rotulo=\"", f' data-rotulo="')
    html = html.replace(" EN\"", f' {code.upper()}"')
    html = html.replace(" EN<", f" {code.upper()}<")
    html = html.replace("WhatsApp flutuante EN", f"WhatsApp flutuante {code.upper()}")
    html = html.replace("sessionStorage.setItem('stf_lang', 'en')", f"sessionStorage.setItem('stf_lang', '{code}')")
    html = html.replace('data-lang="en"', f'data-lang="{code}"')
    # inject override before stf-i18n.js
    html = html.replace(
        '<script src="../js/stf-i18n.js?v=48"></script>',
        f'<script src="../js/stf-i18n-{code}-overrides.js?v=1"></script>\n    <script src="../js/stf-i18n.js?v=48"></script>',
    )
    merged = {}
    for part in ("nav", "hero", "paliativos", "produtos", "about"):
        merged.update(cfg[part])
    html = apply_map(html, merged)
    html = re.sub(r'<section id="problema"[\s\S]*?</section>', PROBLEMA[code], html, count=1)
    return html


def translate_shell(html: str, code: str, cfg: dict) -> str:
    html = html.replace('<html lang="en">', f'<html lang="{cfg["html_lang"]}">')
    html = html.replace("logo-lockup-en.webp", f"logo-lockup-{code}.webp")
    html = html.replace(
        "Sensor CrashFix — Graduated Optical Shielding. Prevention and repair.",
        cfg["lockup_alt"],
    )
    html = html.replace("sessionStorage.setItem('stf_lang', 'en')", f"sessionStorage.setItem('stf_lang', '{code}')")
    html = html.replace("stf_lang', 'en'", f"stf_lang', '{code}'")
    html = html.replace('data-lang="en"', f'data-lang="{code}"')
    # inject override
    if "stf-i18n.js" in html and f"stf-i18n-{code}-overrides" not in html:
        html = html.replace(
            '<script src="../js/stf-i18n.js?v=48"></script>',
            f'<script src="../js/stf-i18n-{code}-overrides.js?v=1"></script>\n    <script src="../js/stf-i18n.js?v=48"></script>',
        )
        html = html.replace(
            '<script src="../js/stf-i18n.js?v=47"></script>',
            f'<script src="../js/stf-i18n-{code}-overrides.js?v=1"></script>\n    <script src="../js/stf-i18n.js?v=48"></script>',
        )
    # basic UI strings often present in shells
    shell_map = {
        "Cart": cfg["i18n"].get("nav.cart", "Cart"),
        "Back": cfg["i18n"].get("nav.back", "Back"),
        "Home": cfg["i18n"].get("nav.home", "Home"),
        "Log in": cfg["i18n"].get("nav.login", "Log in"),
        "Official Store": cfg["about"].get("Official Store", "Official Store"),
    }
    html = apply_map(html, shell_map)
    return html


def write_override(code: str, cfg: dict) -> None:
    lines = [
        f"/** {cfg['label']} overrides — merged onto STRINGS.en in stf-i18n.js */",
        f"window.{cfg['global']} = {{",
        f"  'brand.tagline': {cfg['tagline']!r},",
    ]
    for k, v in cfg["i18n"].items():
        lines.append(f"  {k!r}: {v!r},")
    # drop trailing comma carefully — JS allows trailing commas
    lines.append("};")
    (ROOT / "js" / f"stf-i18n-{code}-overrides.js").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("wrote override", code)


def main() -> None:
    en_dir = ROOT / "en"
    for code, cfg in LANGS.items():
        dest = ROOT / code
        dest.mkdir(exist_ok=True)
        # index
        idx = translate_index((en_dir / "index.html").read_text(encoding="utf-8"), code, cfg)
        (dest / "index.html").write_text(idx, encoding="utf-8")
        print("wrote", dest / "index.html")
        for page in PAGES:
            src = en_dir / page
            if not src.exists():
                continue
            html = translate_shell(src.read_text(encoding="utf-8"), code, cfg)
            (dest / page).write_text(html, encoding="utf-8")
            print("wrote", dest / page)
        write_override(code, cfg)


if __name__ == "__main__":
    main()
