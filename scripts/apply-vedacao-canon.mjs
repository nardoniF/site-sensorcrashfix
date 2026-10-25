/**
 * Aplica o texto canônico de recuperação da vedação (aprovação) nos 12 idiomas.
 * Marca no site: Sensor CrashFix (CraftFix no briefing = mesma linha de produto).
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

/** @type {Record<string, { title: string, lead: string, body: string, cure: string, important: string, hero: string, benefitH: string, benefitP: string, faqQ: string, faqA: string }>} */
const L = {
  pt: {
    title: 'Sensor CrashFix — Recuperação da vedação',
    lead: 'Uma fissura no sensor não precisa significar o fim da proteção do seu smartwatch.',
    body: 'A Sensor CrashFix foi desenvolvida para cobrir a região danificada e recuperar a vedação no ponto reparado, ajudando a proteger o relógio contra a entrada de água.',
    cure: 'Após a aplicação, respeite o tempo de cura de <strong>72 horas</strong> antes de expor o relógio à água.',
    important: '<strong>Importante:</strong> o resultado depende das condições do reparo e do estado do relógio. A aplicação não constitui uma nova certificação IPX ou ATM nem garante uma profundidade específica de uso.',
    hero: 'Uma fissura no sensor não precisa significar o fim da proteção do seu smartwatch. A Sensor CrashFix cobre a região danificada e <strong>recupera a vedação no ponto reparado</strong>, ajudando a proteger o relógio contra a entrada de água.',
    benefitH: 'Recupera a vedação',
    benefitP: 'Cobre a região danificada e recupera a vedação no ponto reparado — após 72 h de cura. Sem nova certificação IPX/ATM.',
    faqQ: 'A lente recupera a vedação / resistência à água?',
    faqA: 'Sim: a Sensor CrashFix foi desenvolvida para <strong>cobrir a região danificada e recuperar a vedação no ponto reparado</strong>, ajudando a proteger o relógio contra a entrada de água. Respeite <strong>72 horas</strong> de cura antes de expor à água. O resultado depende das condições do reparo e do estado do relógio; a aplicação <strong>não constitui</strong> uma nova certificação IPX ou ATM nem garante profundidade específica de uso.',
  },
  en: {
    title: 'Sensor CrashFix — Restoring the seal',
    lead: 'A crack in the sensor does not have to mean the end of your smartwatch’s protection.',
    body: 'Sensor CrashFix is designed to cover the damaged area and restore sealing at the repaired spot, helping protect the watch against water ingress.',
    cure: 'After application, respect the <strong>72-hour</strong> cure time before exposing the watch to water.',
    important: '<strong>Important:</strong> results depend on repair conditions and the state of the watch. Application does not constitute a new IPX or ATM certification and does not guarantee a specific depth of use.',
    hero: 'A crack in the sensor does not have to mean the end of your smartwatch’s protection. Sensor CrashFix covers the damaged area and <strong>restores sealing at the repaired spot</strong>, helping protect the watch against water ingress.',
    benefitH: 'Restores the seal',
    benefitP: 'Covers the damaged area and restores sealing at the repaired spot—after a 72-hour cure. Not a new IPX/ATM certification.',
    faqQ: 'Does the lens restore sealing / water resistance?',
    faqA: 'Yes: Sensor CrashFix is designed to <strong>cover the damaged area and restore sealing at the repaired spot</strong>, helping protect the watch against water ingress. Respect the <strong>72-hour</strong> cure before water exposure. Results depend on repair conditions and the watch’s state; application does <strong>not</strong> constitute a new IPX or ATM certification or guarantee a specific depth of use.',
  },
  it: {
    title: 'Sensor CrashFix — Recupero della tenuta',
    lead: 'Una fessura nel sensore non deve significare la fine della protezione del tuo smartwatch.',
    body: 'Sensor CrashFix è progettata per coprire la zona danneggiata e recuperare la tenuta nel punto riparato, aiutando a proteggere l’orologio dall’ingresso d’acqua.',
    cure: 'Dopo l’applicazione, rispetta le <strong>72 ore</strong> di polimerizzazione prima di esporre l’orologio all’acqua.',
    important: '<strong>Importante:</strong> il risultato dipende dalle condizioni della riparazione e dallo stato dell’orologio. L’applicazione non costituisce una nuova certificazione IPX o ATM e non garantisce una profondità d’uso specifica.',
    hero: 'Una fessura nel sensore non deve significare la fine della protezione del tuo smartwatch. Sensor CrashFix copre la zona danneggiata e <strong>recupera la tenuta nel punto riparato</strong>, aiutando a proteggere l’orologio dall’ingresso d’acqua.',
    benefitH: 'Recupera la tenuta',
    benefitP: 'Copre la zona danneggiata e recupera la tenuta nel punto riparato—dopo 72 ore di cura. Non è una nuova certificazione IPX/ATM.',
    faqQ: 'La lente recupera la tenuta / resistenza all’acqua?',
    faqA: 'Sì: Sensor CrashFix è progettata per <strong>coprire la zona danneggiata e recuperare la tenuta nel punto riparato</strong>, aiutando a proteggere l’orologio dall’ingresso d’acqua. Rispetta le <strong>72 ore</strong> di cura prima dell’acqua. Il risultato dipende dalle condizioni della riparazione e dallo stato dell’orologio; l’applicazione <strong>non costituisce</strong> una nuova certificazione IPX o ATM né garantisce una profondità specifica.',
  },
  de: {
    title: 'Sensor CrashFix — Wiederherstellung der Abdichtung',
    lead: 'Ein Riss im Sensor muss nicht das Ende des Schutzes Ihrer Smartwatch bedeuten.',
    body: 'Sensor CrashFix wurde entwickelt, um den beschädigten Bereich abzudecken und die Abdichtung an der reparierten Stelle wiederherzustellen und so die Uhr vor Wassereintritt zu schützen.',
    cure: 'Nach dem Aufbringen die <strong>72-stündige</strong> Aushärtungszeit einhalten, bevor die Uhr Wasser ausgesetzt wird.',
    important: '<strong>Wichtig:</strong> Das Ergebnis hängt von den Reparaturbedingungen und dem Zustand der Uhr ab. Die Anwendung stellt keine neue IPX- oder ATM-Zertifizierung dar und garantiert keine bestimmte Nutzungstiefe.',
    hero: 'Ein Riss im Sensor muss nicht das Ende des Schutzes Ihrer Smartwatch bedeuten. Sensor CrashFix deckt den beschädigten Bereich ab und <strong>stellt die Abdichtung an der reparierten Stelle wieder her</strong>, um die Uhr vor Wassereintritt zu schützen.',
    benefitH: 'Stellt die Abdichtung wieder her',
    benefitP: 'Deckt den Schaden ab und stellt die Abdichtung an der reparierten Stelle wieder her—nach 72 h Aushärtung. Keine neue IPX/ATM-Zertifizierung.',
    faqQ: 'Stellt die Linse die Abdichtung / Wasserresistenz wieder her?',
    faqA: 'Ja: Sensor CrashFix ist dafür ausgelegt, den <strong>beschädigten Bereich abzudecken und die Abdichtung an der reparierten Stelle wiederherzustellen</strong> und so vor Wassereintritt zu schützen. <strong>72 Stunden</strong> Aushärtung vor Wasser. Das Ergebnis hängt von Reparatur und Uhrenzustand ab; die Anwendung ist <strong>keine</strong> neue IPX-/ATM-Zertifizierung und garantiert keine bestimmte Tiefe.',
  },
  es: {
    title: 'Sensor CrashFix — Recuperación del sellado',
    lead: 'Una fisura en el sensor no tiene por qué significar el fin de la protección de tu smartwatch.',
    body: 'Sensor CrashFix fue desarrollada para cubrir la zona dañada y recuperar el sellado en el punto reparado, ayudando a proteger el reloj frente a la entrada de agua.',
    cure: 'Tras la aplicación, respete el tiempo de curado de <strong>72 horas</strong> antes de exponer el reloj al agua.',
    important: '<strong>Importante:</strong> el resultado depende de las condiciones del reparo y del estado del reloj. La aplicación no constituye una nueva certificación IPX o ATM ni garantiza una profundidad de uso específica.',
    hero: 'Una fisura en el sensor no tiene por qué significar el fin de la protección de tu smartwatch. Sensor CrashFix cubre la zona dañada y <strong>recupera el sellado en el punto reparado</strong>, ayudando a proteger el reloj frente a la entrada de agua.',
    benefitH: 'Recupera el sellado',
    benefitP: 'Cubre la zona dañada y recupera el sellado en el punto reparado—tras 72 h de curado. Sin nueva certificación IPX/ATM.',
    faqQ: '¿La lente recupera el sellado / la resistencia al agua?',
    faqA: 'Sí: Sensor CrashFix fue desarrollada para <strong>cubrir la zona dañada y recuperar el sellado en el punto reparado</strong>, ayudando a proteger el reloj frente al agua. Respete <strong>72 horas</strong> de curado antes del agua. El resultado depende del reparo y del estado del reloj; la aplicación <strong>no constituye</strong> una nueva certificación IPX o ATM ni garantiza una profundidad específica.',
  },
  pl: {
    title: 'Sensor CrashFix — Odzyskanie uszczelnienia',
    lead: 'Pęknięcie czujnika nie musi oznaczać końca ochrony Twojego smartwatcha.',
    body: 'Sensor CrashFix powstał, by zakryć uszkodzony obszar i odzyskać uszczelnienie w naprawionym miejscu, pomagając chronić zegarek przed wnikaniem wody.',
    cure: 'Po aplikacji odczekaj <strong>72 godziny</strong> utwardzania, zanim wystawisz zegarek na wodę.',
    important: '<strong>Ważne:</strong> wynik zależy od warunków naprawy i stanu zegarka. Aplikacja nie stanowi nowej certyfikacji IPX ani ATM i nie gwarantuje konkretnej głębokości użytkowania.',
    hero: 'Pęknięcie czujnika nie musi oznaczać końca ochrony Twojego smartwatcha. Sensor CrashFix zakrywa uszkodzony obszar i <strong>odzyskuje uszczelnienie w naprawionym miejscu</strong>, pomagając chronić zegarek przed wodą.',
    benefitH: 'Odzyskuje uszczelnienie',
    benefitP: 'Zakrywa uszkodzenie i odzyskuje uszczelnienie w naprawionym miejscu—po 72 h utwardzania. Bez nowej certyfikacji IPX/ATM.',
    faqQ: 'Czy soczewka odzyskuje uszczelnienie / wodoszczelność?',
    faqA: 'Tak: Sensor CrashFix służy do <strong>zakrycia uszkodzonego obszaru i odzyskania uszczelnienia w naprawionym miejscu</strong>, chroniąc przed wodą. Odczekaj <strong>72 godziny</strong> przed kontaktem z wodą. Wynik zależy od naprawy i stanu zegarka; aplikacja <strong>nie stanowi</strong> nowej certyfikacji IPX/ATM ani nie gwarantuje głębokości.',
  },
  sl: {
    title: 'Sensor CrashFix — Obnova tesnjenja',
    lead: 'Razpoka v tipalu ne pomeni nujno konca zaščite vaše pametne ure.',
    body: 'Sensor CrashFix je zasnovan, da prekrije poškodovano območje in obnovi tesnjenje na popravljenem mestu ter tako pomaga zaščititi uro pred vdorom vode.',
    cure: 'Po namestitvi upoštevajte <strong>72-urno</strong> strjevanje, preden uro izpostavite vodi.',
    important: '<strong>Pomembno:</strong> rezultat je odvisen od pogojev popravila in stanja ure. Namestitev ne pomeni nove certifikacije IPX ali ATM in ne jamči določene globine uporabe.',
    hero: 'Razpoka v tipalu ne pomeni nujno konca zaščite vaše pametne ure. Sensor CrashFix prekrije poškodovano območje in <strong>obnovi tesnjenje na popravljenem mestu</strong ter tako pomaga zaščititi uro pred vodo.',
    benefitH: 'Obnovi tesnjenje',
    benefitP: 'Prekrije poškodbo in obnovi tesnjenje na popravljenem mestu—po 72 urah strjevanja. Brez nove certifikacije IPX/ATM.',
    faqQ: 'Ali leča obnovi tesnjenje / vodoodpornost?',
    faqA: 'Da: Sensor CrashFix je zasnovan, da <strong>prekrije poškodovano območje in obnovi tesnjenje na popravljenem mestu</strong>, kar pomaga proti vdoru vode. Upoštevajte <strong>72 ur</strong> strjevanja pred vodo. Rezultat je odvisen od popravila in stanja ure; namestitev <strong>ni</strong> nova certifikacija IPX/ATM in ne jamči globine.',
  },
  fr: {
    title: 'Sensor CrashFix — Récupération de l’étanchéité',
    lead: 'Une fissure sur le capteur ne signifie pas forcément la fin de la protection de votre smartwatch.',
    body: 'Sensor CrashFix a été conçue pour couvrir la zone endommagée et récupérer l’étanchéité au point réparé, afin d’aider à protéger la montre contre l’entrée d’eau.',
    cure: 'Après l’application, respectez le temps de polymérisation de <strong>72 heures</strong> avant d’exposer la montre à l’eau.',
    important: '<strong>Important :</strong> le résultat dépend des conditions de la réparation et de l’état de la montre. L’application ne constitue pas une nouvelle certification IPX ou ATM et ne garantit pas une profondeur d’usage spécifique.',
    hero: 'Une fissure sur le capteur ne signifie pas forcément la fin de la protection de votre smartwatch. Sensor CrashFix couvre la zone endommagée et <strong>récupère l’étanchéité au point réparé</strong>, pour aider à protéger la montre contre l’eau.',
    benefitH: 'Récupère l’étanchéité',
    benefitP: 'Couvre la zone endommagée et récupère l’étanchéité au point réparé—après 72 h de polymérisation. Pas de nouvelle certification IPX/ATM.',
    faqQ: 'La lentille récupère-t-elle l’étanchéité / la résistance à l’eau ?',
    faqA: 'Oui : Sensor CrashFix est conçue pour <strong>couvrir la zone endommagée et récupérer l’étanchéité au point réparé</strong>, afin d’aider à protéger contre l’eau. Respectez <strong>72 heures</strong> avant l’eau. Le résultat dépend de la réparation et de l’état de la montre ; l’application <strong>ne constitue pas</strong> une nouvelle certification IPX ou ATM ni ne garantit une profondeur spécifique.',
  },
  nl: {
    title: 'Sensor CrashFix — Herstel van de afdichting',
    lead: 'Een scheur in de sensor hoeft niet het einde van de bescherming van uw smartwatch te betekenen.',
    body: 'Sensor CrashFix is ontwikkeld om het beschadigde gebied af te dekken en de afdichting op de gerepareerde plek te herstellen, zodat het horloge beter beschermd is tegen waterinvoer.',
    cure: 'Na het aanbrengen de uitharding van <strong>72 uur</strong> respecteren voordat u het horloge aan water blootstelt.',
    important: '<strong>Belangrijk:</strong> het resultaat hangt af van de reparatieomstandigheden en de staat van het horloge. De toepassing is geen nieuwe IPX- of ATM-certificering en garandeert geen specifieke gebruiksduikdiepte.',
    hero: 'Een scheur in de sensor hoeft niet het einde van de bescherming van uw smartwatch te betekenen. Sensor CrashFix dekt het beschadigde gebied af en <strong>herstelt de afdichting op de gerepareerde plek</strong>, om waterinvoer te beperken.',
    benefitH: 'Herstelt de afdichting',
    benefitP: 'Dekt schade af en herstelt de afdichting op de gerepareerde plek—na 72 uur uitharding. Geen nieuwe IPX/ATM-certificering.',
    faqQ: 'Herstelt de lens de afdichting / waterbestendigheid?',
    faqA: 'Ja: Sensor CrashFix is gemaakt om het <strong>beschadigde gebied af te dekken en de afdichting op de gerepareerde plek te herstellen</strong>, tegen waterinvoer. Respecteer <strong>72 uur</strong> vóór water. Het resultaat hangt af van reparatie en staat van het horloge; de toepassing is <strong>geen</strong> nieuwe IPX-/ATM-certificering en garandeert geen diepte.',
  },
  sv: {
    title: 'Sensor CrashFix — Återställer tätningen',
    lead: 'En spricka i sensorn behöver inte betyda slutet på skyddet för din smartwatch.',
    body: 'Sensor CrashFix är utvecklad för att täcka det skadade området och återställa tätningen på den reparerade punkten, och hjälper till att skydda klockan mot vattenintrång.',
    cure: 'Efter applicering: respektera <strong>72 timmars</strong> härdning innan klockan utsätts för vatten.',
    important: '<strong>Viktigt:</strong> resultatet beror på reparationsförhållanden och klockans skick. Appliceringen utgör inte en ny IPX- eller ATM-certifiering och garanterar inte ett specifikt användningsdjup.',
    hero: 'En spricka i sensorn behöver inte betyda slutet på skyddet för din smartwatch. Sensor CrashFix täcker det skadade området och <strong>återställer tätningen på den reparerade punkten</strong>, mot vattenintrång.',
    benefitH: 'Återställer tätningen',
    benefitP: 'Täcker skadan och återställer tätningen på den reparerade punkten—efter 72 timmars härdning. Ingen ny IPX/ATM-certifiering.',
    faqQ: 'Återställer linsen tätningen / vattentåligheten?',
    faqA: 'Ja: Sensor CrashFix är till för att <strong>täcka det skadade området och återställa tätningen på den reparerade punkten</strong> mot vatten. Respektera <strong>72 timmar</strong> före vatten. Resultatet beror på reparation och klockans skick; appliceringen är <strong>inte</strong> en ny IPX-/ATM-certifiering och garanterar inget djup.',
  },
  no: {
    title: 'Sensor CrashFix — Gjenoppretter tetningen',
    lead: 'En sprekk i sensoren trenger ikke å bety slutten på beskyttelsen av smartklokken din.',
    body: 'Sensor CrashFix er utviklet for å dekke det skadede området og gjenopprette tetningen på det reparerte punktet, og hjelper til å beskytte klokken mot vanninntrenging.',
    cure: 'Etter påføring: respekter <strong>72 timers</strong> herding før klokken utsettes for vann.',
    important: '<strong>Viktig:</strong> resultatet avhenger av reparasjonsforholdene og klokkens tilstand. Påføringen utgjør ikke en ny IPX- eller ATM-sertifisering og garanterer ikke en bestemt bruksdybde.',
    hero: 'En sprekk i sensoren trenger ikke å bety slutten på beskyttelsen av smartklokken din. Sensor CrashFix dekker det skadede området og <strong>gjenoppretter tetningen på det reparerte punktet</strong>, mot vanninntrenging.',
    benefitH: 'Gjenoppretter tetningen',
    benefitP: 'Dekker skaden og gjenoppretter tetningen på det reparerte punktet—etter 72 timers herding. Ingen ny IPX/ATM-sertifisering.',
    faqQ: 'Gjenoppretter linsen tetningen / vanntettheten?',
    faqA: 'Ja: Sensor CrashFix er laget for å <strong>dekke det skadede området og gjenopprette tetningen på det reparerte punktet</strong> mot vann. Respekter <strong>72 timer</strong> før vann. Resultatet avhenger av reparasjon og klokkens tilstand; påføringen er <strong>ikke</strong> en ny IPX-/ATM-sertifisering og garanterer ingen dybde.',
  },
  fi: {
    title: 'Sensor CrashFix — Tiivistyksen palautus',
    lead: 'Halkeama sensorissa ei tarkoita älykellosi suojauksen loppua.',
    body: 'Sensor CrashFix on kehitetty peittämään vaurioitunut alue ja palauttamaan tiivistys korjatulla kohdalla, mikä auttaa suojaamaan kelloa veden sisäänpääsyltä.',
    cure: 'Asennuksen jälkeen noudata <strong>72 tunnin</strong> kovettumisaikaa ennen kuin altistat kellon vedelle.',
    important: '<strong>Tärkeää:</strong> tulos riippuu korjauksen olosuhteista ja kellon kunnosta. Asennus ei ole uusi IPX- tai ATM-sertifiointi eikä takaa tiettyä käyttösyvyyttä.',
    hero: 'Halkeama sensorissa ei tarkoita älykellosi suojauksen loppua. Sensor CrashFix peittää vaurioituneen alueen ja <strong>palauttaa tiivistyksen korjatulla kohdalla</strong>, suojaten veden sisäänpääsyltä.',
    benefitH: 'Palauttaa tiivistyksen',
    benefitP: 'Peittää vaurion ja palauttaa tiivistyksen korjatulla kohdalla—72 h kovettumisen jälkeen. Ei uutta IPX/ATM-sertifiointia.',
    faqQ: 'Palauttaako linssi tiivistyksen / vedenkestävyyden?',
    faqA: 'Kyllä: Sensor CrashFix on suunniteltu <strong>peittämään vaurioitunut alue ja palauttamaan tiivistys korjatulla kohdalla</strong> veden sisäänpääsyä vastaan. Noudata <strong>72 tuntia</strong> ennen vettä. Tulos riippuu korjauksesta ja kellon kunnosta; asennus <strong>ei ole</strong> uusi IPX-/ATM-sertifiointi eikä takaa syvyyttä.',
  },
};

// Fix SL hero typo I introduced - missing >
L.sl.hero = 'Razpoka v tipalu ne pomeni nujno konca zaščite vaše pametne ure. Sensor CrashFix prekrije poškodovano območje in <strong>obnovi tesnjenje na popravljenem mestu</strong>, ter tako pomaga zaščititi uro pred vodo.';

function sectionHtml(c, grey) {
  const cls = grey ? 'content-section grey-bg' : 'content-section';
  return `
    <section id="vedacao" class="${cls}">
        <div class="container">
            <h2 class="section-title">${c.title}</h2>
            <p class="section-lead vedacao-lead">${c.lead}</p>
            <div class="vedacao-body">
                <p>${c.body}</p>
                <p>${c.cure}</p>
                <p class="vedacao-note">${c.important}</p>
            </div>
        </div>
    </section>
`;
}

function indexPath(lang) {
  return lang === 'pt' ? path.join(ROOT, 'index.html') : path.join(ROOT, lang, 'index.html');
}

function upsertSection(html, block) {
  if (/id="vedacao"/.test(html)) {
    return html.replace(/<section id="vedacao"[\s\S]*?<\/section>\s*/, block.trimStart() + '\n');
  }
  const m = html.match(/<section id="como-aplicar"[\s\S]*?<\/section>/);
  if (m) {
    const end = m.index + m[0].length;
    return html.slice(0, end) + '\n' + block + html.slice(end);
  }
  return html.replace(/<section id="faq"/, block + '\n    <section id="faq"');
}

function patchHero(html, hero) {
  return html.replace(/(<h1>[^<]*<\/h1>\s*)<p>[\s\S]*?<\/p>/, `$1<p>${hero}</p>`);
}

function patchBenefit(html, h, p) {
  return html.replace(
    /(<section id="produtos"[\s\S]*?<i class="fas fa-tint"[^>]*><\/i>\s*<h3[^>]*>)[^<]*(<\/h3>\s*<p[^>]*>)[\s\S]*?(<\/p>)/,
    `$1${h}$2${p}$3`
  );
}

function patchFaq(html, q, a) {
  const faqs = [...html.matchAll(/<details class="faq-item">\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/g)];
  for (const m of faqs) {
    if (/vedação|água|water|seal|tenuta|Abdichtung|sellado|uszczel|tesnjen|étanch|afdichting|tätning|tetning|tiivist|resistência|resistance|wodoszcz|vodoodpor/i.test(m[1] + m[2])) {
      return html.replace(m[0], `        <details class="faq-item">\n            <summary>${q}</summary>\n            <p>${a}</p>\n        </details>`);
    }
  }
  return html;
}

for (const [lang, c] of Object.entries(L)) {
  const file = indexPath(lang);
  let html = fs.readFileSync(file, 'utf8');
  const grey = !/id="quando-nao-usar" class="content-section grey-bg"/.test(html);
  // alternate: after como-aplicar which is white, vedacao as grey-bg
  html = upsertSection(html, sectionHtml(c, true));
  html = patchHero(html, c.hero);
  html = patchBenefit(html, c.benefitH, c.benefitP);
  html = patchFaq(html, c.faqQ, c.faqA);
  fs.writeFileSync(file, html);
  console.log('ok', lang);
}

// store-config FAQ water only
const cfgPath = path.join(ROOT, 'data/store-config.json');
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
for (const item of cfg.homeFaq || []) {
  if (item.id === 'faq-5') {
    Object.assign(item, {
      question: L.pt.faqQ,
      answer: L.pt.faqA,
      questionEn: L.en.faqQ,
      answerEn: L.en.faqA,
      questionIt: L.it.faqQ,
      answerIt: L.it.faqA,
    });
  }
  if (item.id === 'faq-7') {
    Object.assign(item, {
      question: 'Quanto tempo devo esperar antes de molhar o relógio?',
      answer: 'Após a aplicação, respeite o tempo de cura de <strong>72 horas</strong> antes de expor o relógio à água (manual do kit). O resultado depende das condições do reparo e do estado do relógio; a aplicação não constitui uma nova certificação IPX ou ATM nem garante profundidade específica.',
      questionEn: 'How long should I wait before getting the watch wet?',
      answerEn: 'After application, respect the <strong>72-hour</strong> cure before exposing the watch to water (kit manual). Results depend on repair conditions and the watch’s state; application does not constitute a new IPX or ATM certification or guarantee a specific depth.',
      questionIt: 'Quanto tempo aspetto prima di bagnare l’orologio?',
      answerIt: 'Dopo l’applicazione, rispetta le <strong>72 ore</strong> di polimerizzazione prima di esporre l’orologio all’acqua (manuale). Il risultato dipende dalle condizioni della riparazione e dallo stato dell’orologio; l’applicazione non costituisce una nuova certificazione IPX o ATM né garantisce una profondità specifica.',
    });
  }
}
fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2) + '\n');

// minimal CSS
const cssPath = path.join(ROOT, 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('#vedacao')) {
  css += `

/* Recuperação da vedação — bloco canônico */
#vedacao .vedacao-lead {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 1.25rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text, #1a1a1a);
}
#vedacao .vedacao-body {
  max-width: 720px;
  margin: 0 auto;
  font-size: 1.05rem;
  line-height: 1.55;
  color: var(--gray, #555);
}
#vedacao .vedacao-body p { margin: 0 0 1rem; }
#vedacao .vedacao-note {
  padding: 0.85rem 1rem;
  border-left: 3px solid var(--primary, #5EC8D8);
  background: rgba(94, 200, 216, 0.08);
  color: var(--text, #1a1a1a);
}
`;
  fs.writeFileSync(cssPath, css);
}
console.log('done');
