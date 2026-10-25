/**
 * Gera recuperacao-vedacao-smartwatch.html (PT + 11 idiomas) e atualiza sitemap/hreflang-config.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import {
  BR,
  COM,
  HREFLANG_ORDER,
  hreflangUrl,
  canonicalUrl,
} from './hreflang-config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGE = 'recuperacao-vedacao-smartwatch.html';
const STYLE = 'style.css?v=3.32-crash';
const IMG = 'images/home/relogio_home_lens.jpg?v=crash3';
const IMG_ALT_BASE = {
  pt: 'Lente translúcida Sensor CrashFix sobre sensor de smartwatch trincado — rachaduras visíveis sob a película',
  en: 'Translucent Sensor CrashFix lens over a cracked smartwatch sensor — cracks visible under the film',
};

const COPY = {
  pt: {
    lang: 'pt-br',
    title: 'Recuperação da vedação de smartwatch com sensor trincado | Sensor CrashFix',
    description:
      'Sensor trincado pode comprometer a vedação. O Sensor CrashFix cobre a região danificada e ajuda a recuperar a vedação no ponto reparado. Cura de 72 horas. Sem nova certificação IPX/ATM.',
    ogTitle: 'Recuperação da vedação — sensor de smartwatch trincado | CrashFix',
    h1: 'Recuperação da vedação de smartwatch com sensor trincado',
    intro:
      'Uma fissura na região do sensor pode comprometer a vedação do smartwatch. O Sensor CrashFix foi desenvolvido para cobrir a região danificada e ajudar a recuperar a vedação no ponto reparado, contribuindo para proteger o relógio contra a entrada de água.',
    howH: 'Como funciona',
    howP:
      'A solução usa uma lente óptica adesiva (película translúcida) aplicada sobre o sensor. Ela cobre a região danificada — as rachaduras permanecem visíveis sob a lente — e é projetada para ajudar a reselar o ponto reparado, sem trocar o módulo do relógio.',
    cureH: 'Tempo de cura',
    cureP:
      'Após a aplicação, respeite o tempo de cura de <strong>72 horas</strong> antes de expor o relógio à água, conforme as instruções do produto (manual do kit).',
    limitsH: 'Limites importantes',
    limitsP:
      'O resultado depende das condições da aplicação e do estado do relógio. O reparo <strong>não representa uma nova certificação IPX ou ATM</strong> e <strong>não garante uma profundidade específica de uso</strong>. Não prometemos impermeabilidade total, mergulho seguro nem recuperação garantida da classificação original de fábrica.',
    faqH: 'Perguntas frequentes',
    faqs: [
      [
        'Uma fissura no sensor pode comprometer a vedação?',
        'Sim. Uma fissura na região do sensor pode abrir caminho para água, suor e umidade, comprometendo a vedação nessa área até haver uma cobertura adequada.',
      ],
      [
        'Para que serve o Sensor CrashFix?',
        'Para cobrir a região danificada do sensor trincado e ajudar a recuperar a vedação no ponto reparado, contribuindo para proteger o relógio contra a entrada de água — sem substituir o módulo.',
      ],
      [
        'Quanto tempo devo esperar antes de expor o relógio à água?',
        'Respeite <strong>72 horas</strong> de cura após a aplicação, conforme o manual do kit, antes de expor o relógio à água.',
      ],
      [
        'O reparo garante a classificação IPX ou ATM original?',
        'Não. A aplicação não constitui uma nova certificação IPX ou ATM e não reemite a classificação original de fábrica do relógio.',
      ],
      [
        'Posso usar o relógio para mergulho após o reparo?',
        'Não garantimos mergulho nem uma profundidade específica de uso. Siga a classificação original do seu modelo, a cura de 72 horas e as condições reais do reparo e do aparelho.',
      ],
    ],
    ctaLoja: 'Ver loja oficial',
    ctaHome: 'Voltar ao início',
    ctaCompat: 'Sobre a vedação no produto',
    navSobre: 'Sobre o produto',
    navLoja: 'Loja',
    navInicio: 'Início',
    imgAlt: IMG_ALT_BASE.pt,
    breadcrumbHome: 'Início',
    breadcrumbHere: 'Recuperação da vedação',
  },
  en: {
    lang: 'en',
    title: 'Restoring smartwatch sealing after a cracked sensor | Sensor CrashFix',
    description:
      'A cracked sensor can compromise sealing. Sensor CrashFix covers the damaged area and helps restore sealing at the repaired spot. 72-hour cure. Not a new IPX/ATM certification.',
    ogTitle: 'Restore sealing — cracked smartwatch sensor | CrashFix',
    h1: 'Restoring smartwatch sealing after a cracked sensor',
    intro:
      'A crack in the sensor area can compromise your smartwatch’s sealing. Sensor CrashFix is designed to cover the damaged area and help restore sealing at the repaired spot, helping protect the watch against water ingress.',
    howH: 'How it works',
    howP:
      'The solution uses an adhesive optical lens (translucent film) applied over the sensor. It covers the damaged area—cracks remain visible under the lens—and is designed to help reseal the repaired spot without replacing the watch module.',
    cureH: 'Cure time',
    cureP:
      'After application, respect a <strong>72-hour</strong> cure before exposing the watch to water, as stated in the product instructions (kit manual).',
    limitsH: 'Important limits',
    limitsP:
      'Results depend on application conditions and the state of the watch. The repair <strong>does not constitute a new IPX or ATM certification</strong> and <strong>does not guarantee a specific depth of use</strong>. We do not promise total waterproofing, safe diving, or guaranteed recovery of the original factory rating.',
    faqH: 'Frequently asked questions',
    faqs: [
      [
        'Can a crack in the sensor compromise sealing?',
        'Yes. A crack in the sensor area can let water, sweat and moisture in, compromising sealing there until the area is properly covered.',
      ],
      [
        'What is Sensor CrashFix for?',
        'To cover the damaged cracked-sensor area and help restore sealing at the repaired spot, helping protect the watch against water ingress—without replacing the module.',
      ],
      [
        'How long should I wait before exposing the watch to water?',
        'Respect a <strong>72-hour</strong> cure after application, per the kit manual, before water exposure.',
      ],
      [
        'Does the repair guarantee the original IPX or ATM rating?',
        'No. Application does not constitute a new IPX or ATM certification and does not reissue the watch’s original factory rating.',
      ],
      [
        'Can I dive with the watch after the repair?',
        'We do not guarantee diving or a specific depth of use. Follow your model’s original rating, the 72-hour cure, and the real condition of the repair and device.',
      ],
    ],
    ctaLoja: 'Official store',
    ctaHome: 'Back to home',
    ctaCompat: 'About sealing on the product page',
    navSobre: 'About the product',
    navLoja: 'Store',
    navInicio: 'Home',
    imgAlt: IMG_ALT_BASE.en,
    breadcrumbHome: 'Home',
    breadcrumbHere: 'Restoring the seal',
  },
  it: {
    lang: 'it',
    title: 'Recupero della tenuta dello smartwatch con sensore incrinato | Sensor CrashFix',
    description:
      'Un sensore incrinato può compromettere la tenuta. Sensor CrashFix copre la zona danneggiata e aiuta a recuperare la tenuta nel punto riparato. Cura 72 ore. Nessuna nuova certificazione IPX/ATM.',
    ogTitle: 'Recupero della tenuta — sensore smartwatch incrinato | CrashFix',
    h1: 'Recupero della tenuta dello smartwatch con sensore incrinato',
    intro:
      'Una fessura nella zona del sensore può compromettere la tenuta dello smartwatch. Sensor CrashFix è progettata per coprire la zona danneggiata e aiutare a recuperare la tenuta nel punto riparato, contribuendo a proteggere l’orologio dall’ingresso d’acqua.',
    howH: 'Come funziona',
    howP:
      'La soluzione usa una lente ottica adesiva (pellicola traslucida) applicata sul sensore. Copre la zona danneggiata—le crepe restano visibili sotto la lente—ed è progettata per aiutare a risigillare il punto riparato senza sostituire il modulo.',
    cureH: 'Tempo di polimerizzazione',
    cureP:
      'Dopo l’applicazione, rispetta <strong>72 ore</strong> di polimerizzazione prima di esporre l’orologio all’acqua, come da istruzioni del prodotto (manuale del kit).',
    limitsH: 'Limiti importanti',
    limitsP:
      'Il risultato dipende dalle condizioni di applicazione e dallo stato dell’orologio. La riparazione <strong>non costituisce una nuova certificazione IPX o ATM</strong> e <strong>non garantisce una profondità d’uso specifica</strong>. Non promettiamo impermeabilità totale, immersione sicura né recupero garantito della classificazione originale.',
    faqH: 'Domande frequenti',
    faqs: [
      ['Una fessura nel sensore può compromettere la tenuta?', 'Sì. Una fessura nella zona del sensore può far passare acqua, sudore e umidità, comprometendo la tenuta finché non c’è una copertura adeguata.'],
      ['A cosa serve Sensor CrashFix?', 'A coprire la zona danneggiata del sensore incrinato e aiutare a recuperare la tenuta nel punto riparato, contribuendo a proteggere l’orologio dall’acqua—senza sostituire il modulo.'],
      ['Quanto tempo aspetterei prima di esporre l’orologio all’acqua?', 'Rispetta <strong>72 ore</strong> di cura dopo l’applicazione, come da manuale del kit, prima dell’acqua.'],
      ['La riparazione garantisce la classificazione IPX o ATM originale?', 'No. L’applicazione non costituisce una nuova certificazione IPX o ATM e non rinnova la classificazione di fabbrica.'],
      ['Posso usare l’orologio per immersioni dopo la riparazione?', 'Non garantiamo immersioni né una profondità specifica. Segui la classificazione originale del modello, le 72 ore di cura e le condizioni reali della riparazione e del dispositivo.'],
    ],
    ctaLoja: 'Negozio ufficiale',
    ctaHome: 'Torna alla home',
    ctaCompat: 'Sulla tenuta nella pagina prodotto',
    navSobre: 'Sul prodotto',
    navLoja: 'Negozio',
    navInicio: 'Home',
    imgAlt: 'Lente traslucida Sensor CrashFix su sensore smartwatch incrinato — crepe visibili sotto la pellicola',
    breadcrumbHome: 'Home',
    breadcrumbHere: 'Recupero della tenuta',
  },
  de: {
    lang: 'de',
    title: 'Abdichtung der Smartwatch nach gerissenem Sensor wiederherstellen | Sensor CrashFix',
    description:
      'Ein gerissener Sensor kann die Abdichtung beeinträchtigen. Sensor CrashFix deckt den Schaden ab und hilft, die Abdichtung an der reparierten Stelle wiederherzustellen. 72 h Aushärtung. Keine neue IPX/ATM-Zertifizierung.',
    ogTitle: 'Abdichtung wiederherstellen — gerissener Smartwatch-Sensor | CrashFix',
    h1: 'Abdichtung der Smartwatch nach gerissenem Sensor wiederherstellen',
    intro:
      'Ein Riss im Sensorbereich kann die Abdichtung der Smartwatch beeinträchtigen. Sensor CrashFix wurde entwickelt, um den beschädigten Bereich abzudecken und die Abdichtung an der reparierten Stelle wiederherzustellen und so vor Wassereintritt zu schützen.',
    howH: 'So funktioniert es',
    howP:
      'Die Lösung nutzt eine haftende optische Linse (transluzente Folie) auf dem Sensor. Sie deckt den Schaden ab—Risse bleiben unter der Linse sichtbar—und soll die reparierte Stelle neu abdichten, ohne das Modul zu ersetzen.',
    cureH: 'Aushärtungszeit',
    cureP:
      'Nach dem Aufbringen <strong>72 Stunden</strong> Aushärtung einhalten, bevor die Uhr Wasser ausgesetzt wird (Kit-Anleitung).',
    limitsH: 'Wichtige Grenzen',
    limitsP:
      'Das Ergebnis hängt von Anwendung und Uhrenzustand ab. Die Reparatur <strong>stellt keine neue IPX- oder ATM-Zertifizierung dar</strong> und <strong>garantiert keine bestimmte Nutzungstiefe</strong>. Wir versprechen keine totale Wasserdichtigkeit, sicheres Tauchen oder garantierte Wiederherstellung der Werksklasse.',
    faqH: 'Häufige Fragen',
    faqs: [
      ['Kann ein Riss im Sensor die Abdichtung beeinträchtigen?', 'Ja. Ein Riss im Sensorbereich kann Wasser, Schweiß und Feuchtigkeit einlassen und die Abdichtung dort beeinträchtigen, bis die Stelle abgedeckt ist.'],
      ['Wofür ist Sensor CrashFix?', 'Zum Abdecken des gerissenen Sensorbereichs und zur Wiederherstellung der Abdichtung an der reparierten Stelle—ohne Modulwechsel.'],
      ['Wie lange warten vor Wasserkontakt?', '<strong>72 Stunden</strong> Aushärtung nach dem Aufbringen laut Kit-Anleitung.'],
      ['Garantiert die Reparatur die originale IPX-/ATM-Klasse?', 'Nein. Die Anwendung ist keine neue IPX-/ATM-Zertifizierung und erneuert nicht die Werksklasse.'],
      ['Darf ich nach der Reparatur tauchen?', 'Wir garantieren kein Tauchen und keine bestimmte Tiefe. Originalklasse, 72-Stunden-Aushärtung und realer Zustand von Reparatur und Gerät beachten.'],
    ],
    ctaLoja: 'Offizieller Shop',
    ctaHome: 'Zur Startseite',
    ctaCompat: 'Zur Abdichtung auf der Produktseite',
    navSobre: 'Zum Produkt',
    navLoja: 'Shop',
    navInicio: 'Start',
    imgAlt: 'Transluzente Sensor CrashFix-Linse auf gerissenem Smartwatch-Sensor — Risse unter der Folie sichtbar',
    breadcrumbHome: 'Start',
    breadcrumbHere: 'Abdichtung wiederherstellen',
  },
  es: {
    lang: 'es',
    title: 'Recuperación del sellado del smartwatch con sensor agrietado | Sensor CrashFix',
    description:
      'Un sensor agrietado puede comprometer el sellado. Sensor CrashFix cubre la zona dañada y ayuda a recuperar el sellado en el punto reparado. Curado 72 horas. Sin nueva certificación IPX/ATM.',
    ogTitle: 'Recuperación del sellado — sensor de smartwatch agrietado | CrashFix',
    h1: 'Recuperación del sellado del smartwatch con sensor agrietado',
    intro:
      'Una fisura en la zona del sensor puede comprometer el sellado del smartwatch. Sensor CrashFix fue desarrollado para cubrir la zona dañada y ayudar a recuperar el sellado en el punto reparado, contribuyendo a proteger el reloj frente a la entrada de agua.',
    howH: 'Cómo funciona',
    howP:
      'La solución usa una lente óptica adhesiva (película translúcida) sobre el sensor. Cubre la zona dañada—las grietas siguen visibles bajo la lente—y está pensada para ayudar a resellar el punto reparado sin sustituir el módulo.',
    cureH: 'Tiempo de curado',
    cureP:
      'Tras la aplicación, respete <strong>72 horas</strong> de curado antes de exponer el reloj al agua, según las instrucciones del producto (manual del kit).',
    limitsH: 'Límites importantes',
    limitsP:
      'El resultado depende de las condiciones de aplicación y del estado del reloj. La reparación <strong>no representa una nueva certificación IPX o ATM</strong> y <strong>no garantiza una profundidad de uso específica</strong>. No prometemos impermeabilidad total, buceo seguro ni recuperación garantizada de la clasificación original.',
    faqH: 'Preguntas frecuentes',
    faqs: [
      ['¿Una fisura en el sensor puede comprometer el sellado?', 'Sí. Una fisura en la zona del sensor puede dejar pasar agua, sudor y humedad, comprometiendo el sellado hasta cubrir la zona.'],
      ['¿Para qué sirve Sensor CrashFix?', 'Para cubrir la zona dañada del sensor agrietado y ayudar a recuperar el sellado en el punto reparado, protegiendo frente al agua—sin sustituir el módulo.'],
      ['¿Cuánto debo esperar antes de exponer el reloj al agua?', 'Respete <strong>72 horas</strong> de curado tras la aplicación, según el manual del kit.'],
      ['¿La reparación garantiza la clasificación IPX o ATM original?', 'No. La aplicación no constituye una nueva certificación IPX o ATM ni reemite la clasificación de fábrica.'],
      ['¿Puedo bucear con el reloj tras la reparación?', 'No garantizamos buceo ni una profundidad específica. Siga la clasificación original, las 72 horas de curado y el estado real del reparo y del aparato.'],
    ],
    ctaLoja: 'Tienda oficial',
    ctaHome: 'Volver al inicio',
    ctaCompat: 'Sobre el sellado en la página del producto',
    navSobre: 'Sobre el producto',
    navLoja: 'Tienda',
    navInicio: 'Inicio',
    imgAlt: 'Lente translúcida Sensor CrashFix sobre sensor de smartwatch agrietado — grietas visibles bajo la película',
    breadcrumbHome: 'Inicio',
    breadcrumbHere: 'Recuperación del sellado',
  },
  pl: {
    lang: 'pl',
    title: 'Odzyskanie uszczelnienia smartwatcha przy pękniętym czujniku | Sensor CrashFix',
    description:
      'Pęknięty czujnik może osłabić uszczelnienie. Sensor CrashFix zakrywa uszkodzenie i pomaga odzyskać uszczelnienie w naprawionym miejscu. Utwardzanie 72 h. Bez nowej certyfikacji IPX/ATM.',
    ogTitle: 'Odzyskanie uszczelnienia — pęknięty czujnik smartwatcha | CrashFix',
    h1: 'Odzyskanie uszczelnienia smartwatcha przy pękniętym czujniku',
    intro:
      'Pęknięcie w strefie czujnika może osłabić uszczelnienie smartwatcha. Sensor CrashFix powstał, by zakryć uszkodzony obszar i pomóc odzyskać uszczelnienie w naprawionym miejscu, chroniąc przed wnikaniem wody.',
    howH: 'Jak to działa',
    howP:
      'Rozwiązanie to samoprzylepna soczewka optyczna (przezroczysta folia) na czujniku. Zakrywa uszkodzenie—pęknięcia widać pod soczewką—i ma pomóc ponownie uszczelnić naprawione miejsce bez wymiany modułu.',
    cureH: 'Czas utwardzania',
    cureP:
      'Po aplikacji odczekaj <strong>72 godziny</strong> utwardzania, zanim wystawisz zegarek na wodę (instrukcja zestawu).',
    limitsH: 'Ważne ograniczenia',
    limitsP:
      'Wynik zależy od warunków aplikacji i stanu zegarka. Naprawa <strong>nie stanowi nowej certyfikacji IPX ani ATM</strong> i <strong>nie gwarantuje konkretnej głębokości użytkowania</strong>. Nie obiecujemy pełnej wodoszczelności, bezpiecznego nurkowania ani gwarantowanego odzyskania fabrycznej klasy.',
    faqH: 'Częste pytania',
    faqs: [
      ['Czy pęknięcie czujnika może osłabić uszczelnienie?', 'Tak. Pęknięcie w strefie czujnika może wpuszczać wodę, pot i wilgoć, osłabiając uszczelnienie, dopóki strefa nie zostanie zakryta.'],
      ['Do czego służy Sensor CrashFix?', 'Do zakrycia uszkodzonej strefy pękniętego czujnika i pomocy w odzyskaniu uszczelnienia w naprawionym miejscu—bez wymiany modułu.'],
      ['Jak długo czekać przed kontaktem z wodą?', 'Odczekaj <strong>72 godziny</strong> utwardzania po aplikacji, zgodnie z instrukcją zestawu.'],
      ['Czy naprawa gwarantuje oryginalną klasę IPX/ATM?', 'Nie. Aplikacja nie stanowi nowej certyfikacji IPX/ATM i nie odnawia fabrycznej klasy.'],
      ['Czy po naprawie mogę nurkować z zegarkiem?', 'Nie gwarantujemy nurkowania ani konkretnej głębokości. Stosuj oryginalną klasę, 72 h utwardzania oraz realny stan naprawy i urządzenia.'],
    ],
    ctaLoja: 'Oficjalny sklep',
    ctaHome: 'Powrót do strony głównej',
    ctaCompat: 'O uszczelnieniu na stronie produktu',
    navSobre: 'O produkcie',
    navLoja: 'Sklep',
    navInicio: 'Start',
    imgAlt: 'Przezroczysta soczewka Sensor CrashFix na pękniętym czujniku smartwatcha — pęknięcia widoczne pod folią',
    breadcrumbHome: 'Start',
    breadcrumbHere: 'Odzyskanie uszczelnienia',
  },
  sl: {
    lang: 'sl',
    title: 'Obnova tesnjenja pametne ure s počenim tipalom | Sensor CrashFix',
    description:
      'Počeno tipalo lahko oslabi tesnjenje. Sensor CrashFix prekrije poškodbo in pomaga obnoviti tesnjenje na popravljenem mestu. 72 ur strjevanja. Brez nove certifikacije IPX/ATM.',
    ogTitle: 'Obnova tesnjenja — počeno tipalo pametne ure | CrashFix',
    h1: 'Obnova tesnjenja pametne ure s počenim tipalom',
    intro:
      'Razpoka na območju tipala lahko oslabi tesnjenje pametne ure. Sensor CrashFix je zasnovan, da prekrije poškodovano območje in pomaga obnoviti tesnjenje na popravljenem mestu ter tako zaščiti uro pred vdorom vode.',
    howH: 'Kako deluje',
    howP:
      'Rešitev uporablja lepilno optično lečo (prosojno folijo) na tipalu. Prekrije poškodbo—razpoke ostanejo vidne pod lečo—in je namenjena ponovnemu tesnjenju popravljenega mesta brez zamenjave modula.',
    cureH: 'Čas strjevanja',
    cureP:
      'Po namestitvi upoštevajte <strong>72 ur</strong> strjevanja, preden uro izpostavite vodi (navodila kompleta).',
    limitsH: 'Pomembne omejitve',
    limitsP:
      'Rezultat je odvisen od pogojev namestitve in stanja ure. Popravilo <strong>ni nova certifikacija IPX ali ATM</strong> in <strong>ne jamči določene globine uporabe</strong>. Ne obljubljamo popolne vodoodpornosti, varnega potapljanja ali zagotovljene obnovitve tovarniške razvrstitve.',
    faqH: 'Pogosta vprašanja',
    faqs: [
      ['Ali lahko razpoka v tipalu oslabi tesnjenje?', 'Da. Razpoka na območju tipala lahko spusti vodo, znoj in vlago ter oslabi tesnjenje, dokler območje ni pokrito.'],
      ['Čemu služi Sensor CrashFix?', 'Za prekritje poškodovanega počene tipala in pomoč pri obnovi tesnjenja na popravljenem mestu—brez zamenjave modula.'],
      ['Koliko časa počakati pred stikom z vodo?', 'Upoštevajte <strong>72 ur</strong> strjevanja po namestitvi, kot pravi priročnik kompleta.'],
      ['Ali popravilo jamči originalno IPX/ATM razvrstitev?', 'Ne. Namestitev ni nova certifikacija IPX/ATM in ne obnovi tovarniške razvrstitve.'],
      ['Ali lahko po popravilu potapljám z uro?', 'Ne jamčimo potapljanja niti določene globine. Upoštevajte originalno razvrstitev, 72 ur strjevanja ter dejansko stanje popravila in naprave.'],
    ],
    ctaLoja: 'Uradna trgovina',
    ctaHome: 'Nazaj na domov',
    ctaCompat: 'O tesnjenju na strani izdelka',
    navSobre: 'O izdelku',
    navLoja: 'Trgovina',
    navInicio: 'Domov',
    imgAlt: 'Prosojna leča Sensor CrashFix na počenem tipalu pametne ure — razpoke vidne pod folijo',
    breadcrumbHome: 'Domov',
    breadcrumbHere: 'Obnova tesnjenja',
  },
  fr: {
    lang: 'fr',
    title: 'Récupération de l’étanchéité d’une smartwatch au capteur fissuré | Sensor CrashFix',
    description:
      'Un capteur fissuré peut compromettre l’étanchéité. Sensor CrashFix couvre la zone endommagée et aide à récupérer l’étanchéité au point réparé. Polymérisation 72 h. Pas de nouvelle certification IPX/ATM.',
    ogTitle: 'Récupération de l’étanchéité — capteur smartwatch fissuré | CrashFix',
    h1: 'Récupération de l’étanchéité d’une smartwatch au capteur fissuré',
    intro:
      'Une fissure sur la zone du capteur peut compromettre l’étanchéité de la smartwatch. Sensor CrashFix a été conçue pour couvrir la zone endommagée et aider à récupérer l’étanchéité au point réparé, afin de protéger la montre contre l’entrée d’eau.',
    howH: 'Comment ça fonctionne',
    howP:
      'La solution utilise une lentille optique adhésive (film translucide) sur le capteur. Elle couvre la zone endommagée—les fissures restent visibles sous la lentille—et vise à resceller le point réparé sans remplacer le module.',
    cureH: 'Temps de polymérisation',
    cureP:
      'Après l’application, respectez <strong>72 heures</strong> de polymérisation avant d’exposer la montre à l’eau, selon les instructions du produit (manuel du kit).',
    limitsH: 'Limites importantes',
    limitsP:
      'Le résultat dépend des conditions d’application et de l’état de la montre. La réparation <strong>ne constitue pas une nouvelle certification IPX ou ATM</strong> et <strong>ne garantit pas une profondeur d’usage spécifique</strong>. Nous ne promettons ni étanchéité totale, ni plongée sûre, ni récupération garantie du classement d’origine.',
    faqH: 'Questions fréquentes',
    faqs: [
      ['Une fissure sur le capteur peut-elle compromettre l’étanchéité ?', 'Oui. Une fissure sur la zone du capteur peut laisser passer eau, sueur et humidité, compromettant l’étanchéité tant qu’il n’y a pas de couverture adaptée.'],
      ['À quoi sert Sensor CrashFix ?', 'À couvrir la zone endommagée du capteur fissuré et aider à récupérer l’étanchéité au point réparé, contre l’entrée d’eau—sans remplacer le module.'],
      ['Combien de temps attendre avant d’exposer la montre à l’eau ?', 'Respectez <strong>72 heures</strong> de polymérisation après application, selon le manuel du kit.'],
      ['La réparation garantit-elle le classement IPX ou ATM d’origine ?', 'Non. L’application ne constitue pas une nouvelle certification IPX ou ATM et ne réémet pas le classement d’usine.'],
      ['Puis-je plonger avec la montre après la réparation ?', 'Nous ne garantissons ni plongée ni profondeur spécifique. Suivez le classement d’origine, les 72 heures de cure et l’état réel de la réparation et de l’appareil.'],
    ],
    ctaLoja: 'Boutique officielle',
    ctaHome: 'Retour à l’accueil',
    ctaCompat: 'Sur l’étanchéité dans la page produit',
    navSobre: 'À propos du produit',
    navLoja: 'Boutique',
    navInicio: 'Accueil',
    imgAlt: 'Lentille translucide Sensor CrashFix sur capteur de smartwatch fissuré — fissures visibles sous le film',
    breadcrumbHome: 'Accueil',
    breadcrumbHere: 'Récupération de l’étanchéité',
  },
  nl: {
    lang: 'nl',
    title: 'Herstel van de afdichting van een smartwatch met gebarsten sensor | Sensor CrashFix',
    description:
      'Een gebarsten sensor kan de afdichting aantasten. Sensor CrashFix dekt het beschadigde gebied af en helpt de afdichting op de gerepareerde plek te herstellen. 72 uur uitharding. Geen nieuwe IPX/ATM-certificering.',
    ogTitle: 'Afdichting herstellen — gebarsten smartwatch-sensor | CrashFix',
    h1: 'Herstel van de afdichting van een smartwatch met gebarsten sensor',
    intro:
      'Een scheur in het sensorgebied kan de afdichting van de smartwatch aantasten. Sensor CrashFix is ontwikkeld om het beschadigde gebied af te dekken en de afdichting op de gerepareerde plek te helpen herstellen, tegen waterinvoer.',
    howH: 'Hoe het werkt',
    howP:
      'De oplossing gebruikt een optische plaklens (doorschijnende film) op de sensor. Die dekt het beschadigde gebied af—scheuren blijven onder de lens zichtbaar—en is bedoeld om de gerepareerde plek opnieuw af te dichten zonder de module te vervangen.',
    cureH: 'Uithardingstijd',
    cureP:
      'Na het aanbrengen <strong>72 uur</strong> uitharding respecteren voordat u het horloge aan water blootstelt (kithandleiding).',
    limitsH: 'Belangrijke grenzen',
    limitsP:
      'Het resultaat hangt af van de toepassing en de staat van het horloge. De reparatie <strong>is geen nieuwe IPX- of ATM-certificering</strong> en <strong>garandeert geen specifieke gebruiksduikdiepte</strong>. We beloven geen totale waterdichtheid, veilig duiken of gegarandeerd herstel van de fabrieksklasse.',
    faqH: 'Veelgestelde vragen',
    faqs: [
      ['Kan een scheur in de sensor de afdichting aantasten?', 'Ja. Een scheur in het sensorgebied kan water, zweet en vocht binnenlaten en de afdichting daar aantasten tot het gebied is afgedekt.'],
      ['Waarvoor is Sensor CrashFix?', 'Om het beschadigde gebarsten sensorgebied af te dekken en de afdichting op de gerepareerde plek te helpen herstellen—zonder de module te vervangen.'],
      ['Hoe lang wachten vóór water?', 'Respecteer <strong>72 uur</strong> uitharding na aanbrengen, volgens de kithandleiding.'],
      ['Garandeert de reparatie de originele IPX-/ATM-klasse?', 'Nee. De toepassing is geen nieuwe IPX-/ATM-certificering en vernieuwt de fabrieksklasse niet.'],
      ['Mag ik na de reparatie duiken met het horloge?', 'We garanderen geen duiken en geen specifieke diepte. Volg de originele klasse, 72 uur uitharding en de werkelijke staat van reparatie en apparaat.'],
    ],
    ctaLoja: 'Officiële winkel',
    ctaHome: 'Terug naar home',
    ctaCompat: 'Over afdichting op de productpagina',
    navSobre: 'Over het product',
    navLoja: 'Winkel',
    navInicio: 'Home',
    imgAlt: 'Doorschijnende Sensor CrashFix-lens op gebarsten smartwatch-sensor — scheuren zichtbaar onder de film',
    breadcrumbHome: 'Home',
    breadcrumbHere: 'Afdichting herstellen',
  },
  sv: {
    lang: 'sv',
    title: 'Återställ tätningen på en smartwatch med sprucken sensor | Sensor CrashFix',
    description:
      'En sprucken sensor kan försämra tätningen. Sensor CrashFix täcker skadan och hjälper till att återställa tätningen på den reparerade punkten. 72 timmars härdning. Ingen ny IPX/ATM-certifiering.',
    ogTitle: 'Återställ tätningen — sprucken smartwatch-sensor | CrashFix',
    h1: 'Återställ tätningen på en smartwatch med sprucken sensor',
    intro:
      'En spricka i sensorområdet kan försämra smartwatchens tätning. Sensor CrashFix är utvecklad för att täcka det skadade området och hjälpa till att återställa tätningen på den reparerade punkten, mot vattenintrång.',
    howH: 'Så fungerar det',
    howP:
      'Lösningen använder en självhäftande optisk lins (genomskinlig film) på sensorn. Den täcker skadan—sprickor syns under linsen—och ska hjälpa till att försegla den reparerade punkten utan att byta modul.',
    cureH: 'Härdningstid',
    cureP:
      'Efter applicering: respektera <strong>72 timmar</strong> härdning innan klockan utsätts för vatten (kitmanualen).',
    limitsH: 'Viktiga gränser',
    limitsP:
      'Resultatet beror på applicering och klockans skick. Reparationen <strong>utgör inte en ny IPX- eller ATM-certifiering</strong> och <strong>garanterar inte ett specifikt användningsdjup</strong>. Vi lovar inte total vattentäthet, säker dykning eller garanterad återställning av originalklassningen.',
    faqH: 'Vanliga frågor',
    faqs: [
      ['Kan en spricka i sensorn försämra tätningen?', 'Ja. En spricka i sensorområdet kan släppa in vatten, svett och fukt och försämra tätningen tills området täcks.'],
      ['Vad är Sensor CrashFix till för?', 'Att täcka det skadade spruckna sensorområdet och hjälpa till att återställa tätningen på den reparerade punkten—utan att byta modul.'],
      ['Hur länge vänta innan vatten?', 'Respektera <strong>72 timmar</strong> härdning efter applicering enligt kitmanualen.'],
      ['Garanterar reparationen original IPX/ATM?', 'Nej. Appliceringen är ingen ny IPX-/ATM-certifiering och förnyar inte fabriksklassningen.'],
      ['Kan jag dyka med klockan efter reparationen?', 'Vi garanterar varken dykning eller specifikt djup. Följ originalklassning, 72 timmars härdning och verkligt skick på reparation och enhet.'],
    ],
    ctaLoja: 'Officiell butik',
    ctaHome: 'Tillbaka till startsidan',
    ctaCompat: 'Om tätningen på produktsidan',
    navSobre: 'Om produkten',
    navLoja: 'Butik',
    navInicio: 'Start',
    imgAlt: 'Genomskinlig Sensor CrashFix-lins på sprucken smartwatch-sensor — sprickor synliga under filmen',
    breadcrumbHome: 'Start',
    breadcrumbHere: 'Återställ tätningen',
  },
  no: {
    lang: 'nb',
    title: 'Gjenopprett tetningen på en smartklokke med sprukket sensor | Sensor CrashFix',
    description:
      'En sprukket sensor kan svekke tetningen. Sensor CrashFix dekker skaden og hjelper til å gjenopprette tetningen på det reparerte punktet. 72 timers herding. Ingen ny IPX/ATM-sertifisering.',
    ogTitle: 'Gjenopprett tetningen — sprukket smartklokke-sensor | CrashFix',
    h1: 'Gjenopprett tetningen på en smartklokke med sprukket sensor',
    intro:
      'En sprekk i sensorområdet kan svekke smartklokkens tetning. Sensor CrashFix er utviklet for å dekke det skadede området og hjelpe til å gjenopprette tetningen på det reparerte punktet, mot vanninntrenging.',
    howH: 'Slik fungerer det',
    howP:
      'Løsningen bruker en selvklebende optisk linse (gjennomsiktig film) på sensoren. Den dekker skaden—sprekker synes under linsen—og skal hjelpe til å forsegle det reparerte punktet uten å bytte modul.',
    cureH: 'Herdingstid',
    cureP:
      'Etter påføring: respekter <strong>72 timer</strong> herding før klokken utsettes for vann (settmanualen).',
    limitsH: 'Viktige grenser',
    limitsP:
      'Resultatet avhenger av påføring og klokkens tilstand. Reparasjonen <strong>utgjør ikke en ny IPX- eller ATM-sertifisering</strong> og <strong>garanterer ikke en bestemt bruksdybde</strong>. Vi lover ikke total vanntetthet, trygg dykking eller garantert gjenoppretting av original klasse.',
    faqH: 'Vanlige spørsmål',
    faqs: [
      ['Kan en sprekk i sensoren svekke tetningen?', 'Ja. En sprekk i sensorområdet kan slippe inn vann, svette og fukt og svekke tetningen til området er dekket.'],
      ['Hva er Sensor CrashFix til?', 'For å dekke det skadede sprukne sensorområdet og hjelpe til å gjenopprette tetningen på det reparerte punktet—uten å bytte modul.'],
      ['Hvor lenge vente før vann?', 'Respekter <strong>72 timer</strong> herding etter påføring ifølge settmanualen.'],
      ['Garantierer reparasjonen original IPX/ATM?', 'Nei. Påføringen er ingen ny IPX-/ATM-sertifisering og fornyer ikke fabrikkklassen.'],
      ['Kan jeg dykke med klokken etter reparasjonen?', 'Vi garanterer verken dykking eller bestemt dybde. Følg original klasse, 72 timers herding og faktisk tilstand på reparasjon og enhet.'],
    ],
    ctaLoja: 'Offisiell butikk',
    ctaHome: 'Tilbake til startsiden',
    ctaCompat: 'Om tettingen på produktsiden',
    navSobre: 'Om produktet',
    navLoja: 'Butikk',
    navInicio: 'Start',
    imgAlt: 'Gjennomsiktig Sensor CrashFix-linse på sprukket smartklokke-sensor — sprekker synlige under filmen',
    breadcrumbHome: 'Start',
    breadcrumbHere: 'Gjenopprett tetningen',
  },
  fi: {
    lang: 'fi',
    title: 'Älykellon tiivistyksen palautus haljenneella sensorilla | Sensor CrashFix',
    description:
      'Haljennut sensori voi heikentää tiivistystä. Sensor CrashFix peittää vaurion ja auttaa palauttamaan tiivistyksen korjatulla kohdalla. 72 h kovettuminen. Ei uutta IPX/ATM-sertifiointia.',
    ogTitle: 'Tiivistyksen palautus — haljennut älykellon sensori | CrashFix',
    h1: 'Älykellon tiivistyksen palautus haljenneella sensorilla',
    intro:
      'Halkeama sensorialueella voi heikentää älykellon tiivistystä. Sensor CrashFix on kehitetty peittämään vaurioitunut alue ja auttamaan tiivistyksen palauttamisessa korjatulla kohdalla, suojaten veden sisäänpääsyltä.',
    howH: 'Miten se toimii',
    howP:
      'Ratkaisu käyttää optista tarraobjektiivia (läpikuultavaa kalvoa) sensorin päällä. Se peittää vaurion—halkeamat näkyvät linssin alla—ja on tarkoitettu tiivistämään korjattu kohta ilman moduulin vaihtoa.',
    cureH: 'Kovettumisaika',
    cureP:
      'Asennuksen jälkeen noudata <strong>72 tunnin</strong> kovettumista ennen kuin altistat kellon vedelle (paketin ohje).',
    limitsH: 'Tärkeät rajat',
    limitsP:
      'Tulos riippuu asennuksen olosuhteista ja kellon kunnosta. Korjaus <strong>ei ole uusi IPX- tai ATM-sertifiointi</strong> eikä <strong>takaa tiettyä käyttösyvyyttä</strong>. Emme lupaa täyttä vedenpitävyyttä, turvallista sukellusta emmekä taattua alkuperäisen luokituksen palautusta.',
    faqH: 'Usein kysytyt kysymykset',
    faqs: [
      ['Voiko sensorin halkeama heikentää tiivistystä?', 'Kyllä. Halkeama sensorialueella voi päästää vettä, hikeä ja kosteutta sisään ja heikentää tiivistystä, kunnes alue peitetään.'],
      ['Mihin Sensor CrashFix on tarkoitettu?', 'Peittämään vaurioitunut haljennut sensorialue ja auttamaan tiivistyksen palauttamisessa korjatulla kohdalla—ilman moduulin vaihtoa.'],
      ['Kuinka kauan odottaa ennen vettä?', 'Noudata <strong>72 tunnin</strong> kovettumista asennuksen jälkeen paketin ohjeen mukaan.'],
      ['Takaako korjaus alkuperäisen IPX/ATM-luokituksen?', 'Ei. Asennus ei ole uusi IPX-/ATM-sertifiointi eikä uusinna tehdasluokitusta.'],
      ['Voinko sukeltaa kellon kanssa korjauksen jälkeen?', 'Emme takaa sukellusta emmekä tiettyä syvyyttä. Noudata alkuperäistä luokitusta, 72 tunnin kovettumista sekä korjauksen ja laitteen todellista kuntoa.'],
    ],
    ctaLoja: 'Virallinen kauppa',
    ctaHome: 'Takaisin etusivulle',
    ctaCompat: 'Tiivistyksestä tuotesivulla',
    navSobre: 'Tuotteesta',
    navLoja: 'Kauppa',
    navInicio: 'Etusivu',
    imgAlt: 'Läpikuultava Sensor CrashFix -linssi haljenneella älykellon sensorilla — halkeamat näkyvät kalvon alla',
    breadcrumbHome: 'Etusivu',
    breadcrumbHere: 'Tiivistyksen palautus',
  },
};

function assetPrefix(lang) {
  return lang === 'pt' ? '' : '../';
}

function homeHref(lang) {
  return lang === 'pt' ? 'index.html' : '../index.html'.replace('../index.html', 'index.html');
}

function linksFor(lang) {
  if (lang === 'pt') {
    return {
      home: 'index.html',
      loja: 'loja.html',
      produtos: 'index.html#produtos',
      vedacao: 'index.html#vedacao',
      img: IMG,
      style: STYLE,
      logo: 'images/brand/logo.jpg?v=crash6',
      prefix: '',
    };
  }
  return {
    home: 'index.html',
    loja: 'loja.html',
    produtos: 'index.html#produtos',
    vedacao: 'index.html#vedacao',
    img: `../${IMG}`,
    style: `../${STYLE}`,
    logo: '../images/brand/logo.jpg?v=crash6',
    prefix: '../',
  };
}

function hreflangBlock() {
  return HREFLANG_ORDER.map(
    (lang) => `    <link rel="alternate" hreflang="${lang}" href="${hreflangUrl(lang, PAGE)}">`
  ).join('\n');
}

function faqJsonLd(c) {
  const entities = c.faqs.map(([q, a]) => ({
    '@type': 'Question',
    name: q.replace(/<[^>]+>/g, ''),
    acceptedAnswer: {
      '@type': 'Answer',
      text: a.replace(/<[^>]+>/g, ''),
    },
  }));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: c.h1,
        description: c.description,
        isPartOf: { '@type': 'WebSite', name: 'Sensor CrashFix', url: BR },
        about: {
          '@type': 'Thing',
          name: 'Smartwatch sensor sealing recovery',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: entities,
      },
    ],
  };
}

function renderPage(langKey, c) {
  const loc = langKey === 'pt' ? 'pt-BR' : langKey;
  const canon = canonicalUrl(loc, PAGE);
  const L = linksFor(langKey);
  const faqHtml = c.faqs
    .map(
      ([q, a]) => `        <details class="faq-item">
            <summary>${q}</summary>
            <p>${a}</p>
        </details>`
    )
    .join('\n');
  const json = JSON.stringify(faqJsonLd(c), null, 2);

  // lang nav: only link to locales that will exist (all)
  const langNav =
    langKey === 'pt'
      ? `<li class="nav-lang-stack" aria-label="Idioma">
                    <a href="en/${PAGE}" class="nav-lang" title="English"><img src="https://flagcdn.com/w20/us.png" width="20" height="15" alt=""> EN</a>
                    <a href="it/${PAGE}" class="nav-lang" title="Italiano"><img src="https://flagcdn.com/w20/it.png" width="20" height="15" alt=""> IT</a>
                </li>`
      : `<li class="nav-lang-stack" aria-label="Language">
                    <a href="../${PAGE}" class="nav-lang" title="Português"><img src="https://flagcdn.com/w20/br.png" width="20" height="15" alt=""> PT</a>
                    <a href="${langKey === 'en' ? PAGE : `../en/${PAGE}`}" class="nav-lang" title="English"><img src="https://flagcdn.com/w20/us.png" width="20" height="15" alt=""> EN</a>
                    <a href="${langKey === 'it' ? PAGE : `../it/${PAGE}`}" class="nav-lang" title="Italiano"><img src="https://flagcdn.com/w20/it.png" width="20" height="15" alt=""> IT</a>
                </li>`;

  return `<!DOCTYPE html>
<html lang="${c.lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow">
    <title>${c.title}</title>
    <meta name="description" content="${c.description}">
    <link rel="canonical" href="${canon}">
${hreflangBlock()}
    <meta property="og:type" content="website">
    <meta property="og:locale" content="${c.lang === 'pt-br' ? 'pt_BR' : c.lang.replace('-', '_')}">
    <meta property="og:title" content="${c.ogTitle}">
    <meta property="og:description" content="${c.description}">
    <meta property="og:url" content="${canon}">
    <meta property="og:image" content="${langKey === 'pt' ? BR : COM}/${IMG.split('?')[0]}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${c.ogTitle}">
    <meta name="twitter:description" content="${c.description}">
    <link rel="stylesheet" href="${L.style}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="${L.prefix}js/stf-lang-nav.js?v=8"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L852DLJ9KV"></script>
    <script src="${L.prefix}js/gtag-init.js?v=2"></script>
    <script type="application/ld+json">
${json}
    </script>
</head>
<body class="seo-article-page">
    <header>
        <nav class="container site-nav">
            <div class="logo-area">
                <a href="${L.home}" class="logo-img-link"><img src="${L.logo}" alt="Sensor CrashFix" class="main-logo-img"></a>
                <div class="logo-lockup">
                    <div class="logo-text" aria-hidden="true">SENSOR <span>CRASHFIX</span></div>
                </div>
            </div>
            <ul class="nav-links nav-actions">
                <li><a href="${L.produtos}"><i class="fas fa-info-circle"></i> ${c.navSobre}</a></li>
                <li><a href="${L.loja}"><i class="fas fa-store"></i> ${c.navLoja}</a></li>
                ${langNav}
                <li><a href="${L.home}"><i class="fas fa-arrow-left"></i> ${c.navInicio}</a></li>
            </ul>
        </nav>
    </header>

    <main class="content-section seo-article">
        <div class="container seo-article-wrap">
            <nav class="seo-breadcrumb" aria-label="Breadcrumb">
                <a href="${L.home}">${c.breadcrumbHome}</a>
                <span aria-hidden="true"> / </span>
                <span>${c.breadcrumbHere}</span>
            </nav>

            <article>
                <h1>${c.h1}</h1>
                <p class="seo-lead">${c.intro}</p>

                <section id="como-funciona" class="seo-block">
                    <h2>${c.howH}</h2>
                    <p>${c.howP}</p>
                    <figure class="seo-figure">
                        <img src="${L.img}" alt="${c.imgAlt}" width="1600" height="1200" loading="eager" decoding="async">
                        <figcaption>${c.imgAlt}</figcaption>
                    </figure>
                </section>

                <section id="tempo-cura" class="seo-block">
                    <h2>${c.cureH}</h2>
                    <p>${c.cureP}</p>
                </section>

                <section id="limites" class="seo-block">
                    <h2>${c.limitsH}</h2>
                    <p>${c.limitsP}</p>
                </section>

                <section id="faq" class="seo-block">
                    <h2>${c.faqH}</h2>
                    <div class="faq-container" data-faq-static="1">
${faqHtml}
                    </div>
                </section>

                <p class="seo-cta-row">
                    <a class="btn-primary" href="${L.loja}">${c.ctaLoja}</a>
                    <a class="btn-outline" href="${L.vedacao}">${c.ctaCompat}</a>
                    <a class="btn-outline" href="${L.home}">${c.ctaHome}</a>
                </p>
            </article>
        </div>
    </main>

    <footer class="site-footer"><div class="container" data-site-footer="compact"></div></footer>

    <script src="${L.prefix}js/config-bootstrap.js?v=2"></script>
    <script src="${L.prefix}js/site-footer.js?v=18"></script>
    <script src="${L.prefix}js/account-nav.js"></script>
    <script src="${L.prefix}js/traffic-origin.js?v=1"></script>
    <script src="${L.prefix}js/analytics.js?v=53"></script>
</body>
</html>
`;
}

// Write pages
for (const [lang, c] of Object.entries(COPY)) {
  const rel = lang === 'pt' ? PAGE : path.join(lang, PAGE);
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, renderPage(lang, c));
  console.log('wrote', rel);
}

// Update hreflang-config PUBLIC_PAGES
const cfgPath = path.join(ROOT, 'scripts/hreflang-config.mjs');
let cfg = fs.readFileSync(cfgPath, 'utf8');
if (!cfg.includes(PAGE)) {
  cfg = cfg.replace(
    "export const PUBLIC_PAGES = ['index', 'loja.html', 'onde-comprar.html', 'comunidade.html'];",
    `export const PUBLIC_PAGES = ['index', 'loja.html', 'onde-comprar.html', 'comunidade.html', '${PAGE}'];`
  );
  fs.writeFileSync(cfgPath, cfg);
  console.log('hreflang-config updated');
}

function sitemapUrlBlock(loc, lastmod = '2026-10-25') {
  const links = HREFLANG_ORDER.map((lang) => {
    const href = hreflangUrl(lang, PAGE);
    return `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`;
  }).join('\n');
  return `  <url>
    <loc>${loc}</loc>
${links}
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>`;
}

// sitemap.xml (BR) — PT loc only
const smBr = path.join(ROOT, 'sitemap.xml');
let brXml = fs.readFileSync(smBr, 'utf8');
const brLoc = `${BR}/${PAGE}`;
if (!brXml.includes(brLoc)) {
  brXml = brXml.replace('</urlset>', `${sitemapUrlBlock(brLoc)}\n</urlset>`);
  fs.writeFileSync(smBr, brXml);
  console.log('sitemap.xml updated');
}

// sitemap-com.xml — add EN loc as representative? Pattern uses one block per page type with all hreflangs.
// Looking at existing: each URL is language-specific loc. For simplicity add EN page loc with full hreflang set
// (same as other pages). Also add other lang locs if sitemap-com lists each language page separately.
const smCom = path.join(ROOT, 'sitemap-com.xml');
let comXml = fs.readFileSync(smCom, 'utf8');
const enLoc = `${COM}/${PAGE}`;
if (!comXml.includes(PAGE)) {
  // Insert before </urlset> — one block with EN loc (intl primary) matching hreflang pattern of loja
  // Also add lang-prefixed locs for parity with other pages? Check count pattern...
  // comunidade has many locs. For new page, add all COM locs for each lang.
  const blocks = [];
  blocks.push(sitemapUrlBlock(enLoc));
  for (const lang of ['it', 'de', 'es', 'pl', 'sl', 'fr', 'nl', 'sv', 'no', 'fi']) {
    blocks.push(sitemapUrlBlock(`${COM}/${lang}/${PAGE}`));
  }
  comXml = comXml.replace('</urlset>', `${blocks.join('\n')}\n</urlset>`);
  fs.writeFileSync(smCom, comXml);
  console.log('sitemap-com.xml updated');
}

// CSS
const cssPath = path.join(ROOT, 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('.seo-article-page')) {
  css += `

/* SEO article — recuperação da vedação */
.seo-article-page .seo-article { padding-top: 2rem; padding-bottom: 3rem; }
.seo-article-wrap { max-width: 46rem; }
.seo-breadcrumb { font-size: 0.9rem; margin-bottom: 1.25rem; opacity: 0.85; }
.seo-breadcrumb a { text-decoration: underline; }
.seo-article h1 { font-size: clamp(1.75rem, 4vw, 2.35rem); font-weight: 900; line-height: 1.2; margin: 0 0 1rem; }
.seo-lead { font-size: 1.1rem; line-height: 1.55; margin-bottom: 2rem; color: var(--gray, #555); }
.seo-block { margin: 2.25rem 0; }
.seo-block h2 { font-size: 1.35rem; font-weight: 800; margin: 0 0 0.75rem; }
.seo-block p { line-height: 1.55; margin: 0 0 1rem; color: var(--gray, #444); }
.seo-figure { margin: 1.25rem 0 0; }
.seo-figure img { width: 100%; height: auto; border-radius: 8px; display: block; background: #111; }
.seo-figure figcaption { font-size: 0.85rem; margin-top: 0.5rem; opacity: 0.75; }
.seo-cta-row { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 2rem; align-items: center; }
@media (max-width: 640px) {
  .seo-cta-row { flex-direction: column; align-items: stretch; }
  .seo-cta-row .btn-primary, .seo-cta-row .btn-outline { text-align: center; }
}
`;
  fs.writeFileSync(cssPath, css);
  console.log('style.css updated');
}

console.log('done');
