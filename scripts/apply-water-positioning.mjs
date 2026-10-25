/**
 * Recalibra copy de vedação / resistência à água nos 12 idiomas.
 * Não toca preços, checkout, analytics.
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

/** @type {Record<string, {
 *  hero: string,
 *  problemWaterH: string,
 *  problemWaterP: string,
 *  benefitH: string,
 *  benefitP: string,
 *  faqQ: string,
 *  faqA: string,
 *  tagline?: string,
 * }>} */
const COPY = {
  pt: {
    hero: 'A lente adesiva Sensor CrashFix <strong>cobre a fissura</strong>, ajuda a <strong>recuperar a vedação</strong> da região do sensor trincado e a <strong>resistência à água no ponto reparado</strong> — sem trocar o módulo.',
    problemWaterH: 'Vedação comprometida',
    problemWaterP: 'Com o vidro rachado, a vedação na região do sensor falha: água, suor e umidade passam a ser risco até haver uma cobertura adequada.',
    benefitH: 'Recupera a vedação',
    benefitP: 'Diâmetro ampliado e adesivo óptico para reselar a área danificada e devolver resistência à água na região reparada (após a cura do adesivo).',
    faqQ: 'A lente restaura a resistência à água?',
    faqA: 'Ela é projetada para <strong>reselar a região do sensor trincado</strong> e ajudar a <strong>recuperar a vedação e a resistência à água nesse ponto</strong> (lente maior que o vidro + adesivo óptico). Siga a cura do kit: <strong>72 horas</strong> antes de molhar (manual). Depois disso, o uso cotidiano com água (suor, chuva, ducha) faz parte da finalidade do produto. Isso <strong>não reemite</strong> o rating IPX/ATM de fábrica do relógio inteiro nem garante profundidade ou mergulho — respeite a classificação original do seu modelo e a aplicação correta.',
    tagline: 'Blindagem óptica. Vedação e proteção.',
  },
  en: {
    hero: 'The Sensor CrashFix adhesive lens <strong>covers the crack</strong>, helps <strong>restore sealing</strong> around the damaged sensor and <strong>water resistance at the repaired spot</strong>—without replacing the module.',
    problemWaterH: 'Compromised sealing',
    problemWaterP: 'With cracked glass, sealing at the sensor fails: water, sweat and moisture become a risk until the area is properly covered.',
    benefitH: 'Restores sealing',
    benefitP: 'Enlarged diameter and optical adhesive to reseal the damaged area and bring back water resistance at the repaired region (after adhesive cure).',
    faqQ: 'Does the lens restore water resistance?',
    faqA: 'It is designed to <strong>reseal the cracked sensor area</strong> and help <strong>restore sealing and water resistance there</strong> (lens larger than the glass + optical adhesive). Follow the kit cure: <strong>72 hours</strong> before getting it wet (manual). After that, everyday water use (sweat, rain, shower) is part of the product’s purpose. This does <strong>not reissue</strong> the watch’s full factory IPX/ATM rating or guarantee depth/diving—follow your model’s original rating and correct application.',
    tagline: 'Optical shielding. Sealing and protection.',
  },
  it: {
    hero: 'La lente adesiva Sensor CrashFix <strong>copre la fessura</strong>, aiuta a <strong>ripristinare la tenuta</strong> nella zona del sensore incrinato e la <strong>resistenza all’acqua nel punto riparato</strong>—senza sostituire il modulo.',
    problemWaterH: 'Tenuta compromessa',
    problemWaterP: 'Con il vetro incrinato la tenuta nella zona del sensore viene meno: acqua, sudore e umidità diventano un rischio finché non c’è una copertura adeguata.',
    benefitH: 'Ripristina la tenuta',
    benefitP: 'Diametro ampliato e adesivo ottico per risigillare l’area danneggiata e restituire resistenza all’acqua nella zona riparata (dopo la polimerizzazione).',
    faqQ: 'La lente ripristina la resistenza all’acqua?',
    faqA: 'È progettata per <strong>risigillare la zona del sensore incrinato</strong> e aiutare a <strong>recuperare tenuta e resistenza all’acqua in quel punto</strong> (lente più grande del vetro + adesivo ottico). Segui la polimerizzazione del kit: <strong>72 ore</strong> prima di bagnare (manuale). Poi l’uso quotidiano con acqua (sudore, pioggia, doccia) rientra nella finalità del prodotto. Ciò <strong>non rinnova</strong> la certificazione IPX/ATM di fabbrica dell’intero orologio né garantisce profondità/immersione—rispetta la classificazione originale e l’applicazione corretta.',
  },
  de: {
    hero: 'Die Sensor CrashFix-Haftlinse <strong>deckt den Riss ab</strong>, hilft, die <strong>Abdichtung</strong> am beschädigten Sensor und die <strong>Wasserresistenz an der reparierten Stelle</strong> wiederherzustellen—ohne Modulwechsel.',
    problemWaterH: 'Abdichtung beeinträchtigt',
    problemWaterP: 'Bei gerissenem Glas versagt die Abdichtung am Sensor: Wasser, Schweiß und Feuchtigkeit werden zum Risiko, bis die Stelle abgedeckt ist.',
    benefitH: 'Stellt die Abdichtung wieder her',
    benefitP: 'Vergrößerter Durchmesser und optischer Kleber versiegeln den Schaden und bringen Wasserresistenz in der reparierten Zone zurück (nach Aushärtung).',
    faqQ: 'Stellt die Linse die Wasserresistenz wieder her?',
    faqA: 'Sie ist dafür ausgelegt, den <strong>gerissen Sensorbereich neu abzudichten</strong> und dort <strong>Abdichtung und Wasserresistenz</strong> wiederherzustellen (Linse größer als das Glas + optischer Kleber). Aushärtung laut Kit: <strong>72 Stunden</strong> vor Nässe (Anleitung). Danach gehört alltäglicher Wasserkontakt (Schweiß, Regen, Dusche) zum Einsatzzweck. Das <strong>erneuert nicht</strong> die werksseitige IPX/ATM-Bewertung der ganzen Uhr und garantiert keine Tauchtiefe—Originalangabe und korrekte Anwendung beachten.',
  },
  es: {
    hero: 'La lente adhesiva Sensor CrashFix <strong>cubre la fisura</strong>, ayuda a <strong>recuperar el sellado</strong> de la zona del sensor agrietado y la <strong>resistencia al agua en el punto reparado</strong>—sin sustituir el módulo.',
    problemWaterH: 'Sellado comprometido',
    problemWaterP: 'Con el cristal agrietado falla el sellado en el sensor: agua, sudor y humedad son un riesgo hasta cubrir la zona.',
    benefitH: 'Recupera el sellado',
    benefitP: 'Diámetro ampliado y adhesivo óptico para resellar el área dañada y devolver resistencia al agua en la zona reparada (tras el curado).',
    faqQ: '¿La lente restaura la resistencia al agua?',
    faqA: 'Está diseñada para <strong>resellar la zona del sensor agrietado</strong> y ayudar a <strong>recuperar sellado y resistencia al agua en ese punto</strong> (lente mayor que el cristal + adhesivo óptico). Sigue el curado del kit: <strong>72 horas</strong> antes de mojar (manual). Después, el uso cotidiano con agua (sudor, lluvia, ducha) forma parte de la finalidad del producto. Esto <strong>no reemite</strong> el rating IPX/ATM de fábrica del reloj completo ni garantiza profundidad/buceo—respeta la clasificación original y una aplicación correcta.',
  },
  pl: {
    hero: 'Soczewka Sensor CrashFix <strong>zasłania pęknięcie</strong>, pomaga <strong>odzyskać uszczelnienie</strong> wokół uszkodzonego czujnika i <strong>wodoszczelność w naprawionym miejscu</strong>—bez wymiany modułu.',
    problemWaterH: 'Uszczelnienie zagrożone',
    problemWaterP: 'Przy pękniętym szkle uszczelnienie przy sensorze zawodzi: woda, pot i wilgoć stają się ryzykiem, dopóki strefa nie zostanie zakryta.',
    benefitH: 'Przywraca uszczelnienie',
    benefitP: 'Powiększona średnica i klej optyczny ponownie uszczelniają uszkodzony obszar i przywracają wodoszczelność w naprawionej strefie (po utwardzeniu).',
    faqQ: 'Czy soczewka przywraca wodoszczelność?',
    faqA: 'Jest zaprojektowana, by <strong>ponownie uszczelnić strefę pękniętego czujnika</strong> i pomóc <strong>odzyskać uszczelnienie oraz wodoszczelność w tym miejscu</strong> (soczewka większa niż szkło + klej optyczny). Przestrzegaj utwardzania: <strong>72 godziny</strong> przed kontaktem z wodą (instrukcja). Potem codzienne użytkowanie z wodą (pot, deszcz, prysznic) jest zgodne z przeznaczeniem. To <strong>nie odnawia</strong> fabrycznej klasy IPX/ATM całego zegarka ani nie gwarantuje głębokości/nurkowania—stosuj oryginalną klasę i poprawny montaż.',
  },
  sl: {
    hero: 'Leča Sensor CrashFix <strong>prekrije razpoko</strong>, pomaga <strong>obnoviti tesnjenje</strong> okoli poškodovanega tipala in <strong>vodoodpornost na popravljenem mestu</strong>—brez zamenjave modula.',
    problemWaterH: 'Tesnjenje ogroženo',
    problemWaterP: 'Pri počenem steklu tesnjenje pri tipalu odpove: voda, znoj in vlaga postanejo tveganje, dokler območje ni pokrito.',
    benefitH: 'Obnovi tesnjenje',
    benefitP: 'Povečan premer in optično lepilo znova zatesnita poškodovano območje in vrneta vodoodpornost na popravljenem delu (po strjevanju).',
    faqQ: 'Ali leča obnovi vodoodpornost?',
    faqA: 'Zasnovana je, da <strong>znova zatesni območje počene tipala</strong> in pomaga <strong>obnoviti tesnjenje ter vodoodpornost tam</strong> (leča večja od stekla + optično lepilo). Upoštevaj strjevanje: <strong>72 ur</strong> pred stikom z vodo (priročnik). Nato je vsakodnevna uporaba z vodo (znoj, dež, tuš) del namena izdelka. To <strong>ne obnovi</strong> tovarniške IPX/ATM ocene cele ure in ne jamči globine/potapljanja—upoštevaj originalno razvrstitev in pravilno namestitev.',
  },
  fr: {
    hero: 'La lentille adhésive Sensor CrashFix <strong>couvre la fissure</strong>, aide à <strong>récupérer l’étanchéité</strong> de la zone du capteur fissuré et la <strong>résistance à l’eau au point réparé</strong>—sans remplacer le module.',
    problemWaterH: 'Étanchéité compromise',
    problemWaterP: 'Avec le verre fissuré, l’étanchéité au capteur échoue : eau, sueur et humidité deviennent un risque jusqu’à une couverture adaptée.',
    benefitH: 'Récupère l’étanchéité',
    benefitP: 'Diamètre élargi et adhésif optique pour resceller la zone endommagée et rendre la résistance à l’eau dans la région réparée (après polymérisation).',
    faqQ: 'La lentille restaure-t-elle la résistance à l’eau ?',
    faqA: 'Elle est conçue pour <strong>resceller la zone du capteur fissuré</strong> et aider à <strong>récupérer étanchéité et résistance à l’eau à cet endroit</strong> (lentille plus grande que le verre + adhésif optique). Respectez la polymérisation du kit : <strong>72 heures</strong> avant de mouiller (manuel). Ensuite, l’usage quotidien avec de l’eau (sueur, pluie, douche) fait partie de la finalité du produit. Cela <strong>ne réémet pas</strong> le classement IPX/ATM d’usine de toute la montre ni ne garantit profondeur/plongée—respectez le classement d’origine et une pose correcte.',
  },
  nl: {
    hero: 'De Sensor CrashFix-plaklens <strong>dekt de scheur af</strong>, helpt de <strong>afdichting</strong> rond de beschadigde sensor en de <strong>waterbestendigheid op de gerepareerde plek</strong> te herstellen—zonder de module te vervangen.',
    problemWaterH: 'Afdichting aangetast',
    problemWaterP: 'Bij gebarsten glas faalt de afdichting bij de sensor: water, zweet en vocht worden een risico tot het gebied is afgedekt.',
    benefitH: 'Herstelt de afdichting',
    benefitP: 'Vergrote diameter en optische lijm hermetiseren het beschadigde gebied en brengen waterbestendigheid terug in de gerepareerde zone (na uitharding).',
    faqQ: 'Herstelt de lens de waterbestendigheid?',
    faqA: 'Hij is ontworpen om het <strong>gebarsten sensorgebied opnieuw af te dichten</strong> en daar <strong>afdichting en waterbestendigheid</strong> te helpen herstellen (lens groter dan het glas + optische lijm). Volg de uitharding: <strong>72 uur</strong> vóór nat worden (handleiding). Daarna hoort dagelijks watergebruik (zweet, regen, douche) bij het doel van het product. Dit <strong>hernieuwt niet</strong> de fabrieks-IPX/ATM van de hele horloge en garandeert geen diepte/duiken—volg de originele klasse en correcte plaatsing.',
  },
  sv: {
    hero: 'Sensor CrashFix-linsen <strong>täcker sprickan</strong>, hjälper till att <strong>återställa tätningen</strong> runt den skadade sensorn och <strong>vattentåligheten på den reparerade punkten</strong>—utan att byta modul.',
    problemWaterH: 'Tätning försämrad',
    problemWaterP: 'Med sprucket glas brister tätningen vid sensorn: vatten, svett och fukt blir en risk tills området täcks.',
    benefitH: 'Återställer tätningen',
    benefitP: 'Förstorad diameter och optiskt lim förseglar skadan igen och ger tillbaka vattentålighet i den reparerade zonen (efter härdning).',
    faqQ: 'Återställer linsen vattentåligheten?',
    faqA: 'Den är utformad för att <strong>försegla det spruckna sensorområdet igen</strong> och hjälpa till att <strong>återställa tätning och vattentålighet där</strong> (lins större än glaset + optiskt lim). Följ härdningen: <strong>72 timmar</strong> före väta (manual). Därefter ingår vardaglig vattenanvändning (svett, regn, dusch) i produktens syfte. Detta <strong>förnyar inte</strong> klockans fabriks-IPX/ATM för hela enheten och garanterar ingen djupdykning—följ originalklassning och korrekt applicering.',
  },
  no: {
    hero: 'Sensor CrashFix-linsen <strong>dekker sprekken</strong>, hjelper til å <strong>gjenopprette tetningen</strong> rundt den skadede sensoren og <strong>vanntettheten på det reparerte punktet</strong>—uten å bytte modul.',
    problemWaterH: 'Tetning svekket',
    problemWaterP: 'Med sprukket glass svikter tetningen ved sensoren: vann, svette og fukt blir en risiko til området er dekket.',
    benefitH: 'Gjenoppretter tetningen',
    benefitP: 'Forstørret diameter og optisk lim forsegler skaden på nytt og gir tilbake vanntetthet i den reparerte sonen (etter herding).',
    faqQ: 'Gjenoppretter linsen vanntettheten?',
    faqA: 'Den er laget for å <strong>forsegle det sprukne sensorområdet på nytt</strong> og hjelpe til å <strong>gjenopprette tetning og vanntetthet der</strong> (linse større enn glasset + optisk lim). Følg herdingen: <strong>72 timer</strong> før væte (manual). Deretter er daglig vannbruk (svette, regn, dusj) del av produktets formål. Dette <strong>fornyer ikke</strong> fabrikkens IPX/ATM for hele klokken og garanterer ikke dykking—følg original klasse og korrekt montering.',
  },
  fi: {
    hero: 'Sensor CrashFix -tarraobjektiivi <strong>peittää halkeaman</strong>, auttaa <strong>palauttamaan tiivistyksen</strong> vahingoittuneen sensorin alueella ja <strong>vedenkestävyyden korjatulla kohdalla</strong>—ilman moduulin vaihtoa.',
    problemWaterH: 'Tiivistys heikentynyt',
    problemWaterP: 'Haljenneella lasilla tiivistys sensorin kohdalla pettää: vesi, hiki ja kosteus ovat riski, kunnes alue peitetään.',
    benefitH: 'Palauttaa tiivistyksen',
    benefitP: 'Suurempi halkaisija ja optinen liima tiivistävät vaurioituneen alueen uudelleen ja palauttavat vedenkestävyyden korjatulla vyöhykkeellä (kovettumisen jälkeen).',
    faqQ: 'Palauttaako linssi vedenkestävyyden?',
    faqA: 'Se on suunniteltu <strong>tiivistämään haljennut sensorialue uudelleen</strong> ja auttamaan <strong>tiivistyksen ja vedenkestävyyden palauttamisessa siinä kohdassa</strong> (linssi lasia suurempi + optinen liima). Noudata kovettumista: <strong>72 tuntia</strong> ennen kastumista (ohje). Sen jälkeen arkipäiväinen vedenkäyttö (hiki, sade, suihku) kuuluu tuotteen tarkoitukseen. Tämä <strong>ei uusinna</strong> koko kellon tehdas-IPX/ATM-luokitusta eikä takaa syvyyttä/sukellusta—noudata alkuperäistä luokitusta ja oikeaa asennusta.',
  },
};

function indexPath(lang) {
  return lang === 'pt' ? path.join(ROOT, 'index.html') : path.join(ROOT, lang, 'index.html');
}

function replaceHero(html, hero) {
  return html.replace(/(<h1>[^<]*<\/h1>\s*)<p>[\s\S]*?<\/p>/, `$1<p>${hero}</p>`);
}

function replaceProblemWater(html, h, p) {
  // Prefer swimmer icon card; fallback tint+water heading
  const reSwimmer = /(<i class="fas fa-swimmer"><\/i>\s*)<h3>[^<]*<\/h3>\s*<p>[\s\S]*?<\/p>/;
  if (reSwimmer.test(html)) {
    return html.replace(reSwimmer, `$1<h3>${h}</h3>\n                    <p>${p}</p>`);
  }
  return html;
}

function replaceBenefitWater(html, h, p) {
  // tint benefit card that currently talks about water/protection/splash/submer
  const re = /(<i class="fas fa-tint"[^>]*><\/i>\s*<h3[^>]*>)[^<]*(<\/h3>\s*<p[^>]*>)[\s\S]*?(<\/p>)/;
  if (re.test(html)) {
    return html.replace(re, `$1${h}$2${p}$3`);
  }
  // DE etc may use different structure — try heading keywords
  const re2 = /(<h3[^>]*>)(?:Proteção da região|Cuidado con el agua|Be careful with water|Attention à l’eau|Voorzichtig met water|Protezione|Schutz|Cuidado com água|Helps protect|Aide à protéger|Restores? original|Recupera|Stellt|Återställ|Gjenopprett|Palauttaa|Przywraca|Obnovi|Herstelt de afdichting|Restores sealing|Récupère)[^<]*(<\/h3>\s*<p[^>]*>)[\s\S]*?(<\/p>)/i;
  if (re2.test(html)) {
    return html.replace(re2, `$1${h}$2${p}$3`);
  }
  return html;
}

function replaceOrInsertFaq(html, q, a) {
  const faqs = [...html.matchAll(/<details class="faq-item">\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/g)];
  let replaced = false;
  let out = html;
  for (const m of faqs) {
    const block = m[0];
    const summary = m[1];
    if (/água|water|étanch|Wasser|agua|wodoszcz|vodoodpor|molhar|wet|nass|bagnare|mojar|nat worden|blöt|våt|kastua|immer|sumerg|Untertauchen|nedsän|upot/i.test(summary + m[2])) {
      const neu = `        <details class="faq-item">\n            <summary>${q}</summary>\n            <p>${a}</p>\n        </details>`;
      out = out.replace(block, neu);
      replaced = true;
      break;
    }
  }
  if (!replaced && /id="home-faq-root"/.test(out)) {
    // insert before closing faq container, before Tattoo FAQ if present else before last
    const neu = `        <details class="faq-item">\n            <summary>${q}</summary>\n            <p>${a}</p>\n        </details>\n`;
    if (/É diferente|Is it different|È diverso|Unterschied|diferente|TattooFix/i.test(out)) {
      out = out.replace(/(<details class="faq-item">\s*<summary>[^<]*(?:Tattoo|TattooFix|diferente|different|diverso|Unterschied)[^<]*<\/summary>)/i, neu + '$1');
    } else {
      out = out.replace(/<\/div>\s*<\/div>\s*\n\s*<\/section>\s*\n\s*<section id="onde-comprar"/, neu + '    </div>\n    </div>\n\n</section>\n\n    <section id="onde-comprar"');
    }
  }
  return out;
}

function replaceTagline(html, tagline) {
  if (!tagline) return html;
  return html.replace(/(<p class="logo-tagline">)[^<]*(<\/p>)/, `$1${tagline}$2`);
}

for (const [lang, c] of Object.entries(COPY)) {
  const file = indexPath(lang);
  let html = fs.readFileSync(file, 'utf8');
  html = replaceHero(html, c.hero);
  html = replaceProblemWater(html, c.problemWaterH, c.problemWaterP);
  html = replaceBenefitWater(html, c.benefitH, c.benefitP);
  html = replaceOrInsertFaq(html, c.faqQ, c.faqA);
  html = replaceTagline(html, c.tagline);
  fs.writeFileSync(file, html);
  console.log('patched', lang, file);
}

// Align store-config homeFaq water items only (no prices)
const cfgPath = path.join(ROOT, 'data/store-config.json');
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const faqMap = {
  'faq-5': {
    question: COPY.pt.faqQ,
    answer: COPY.pt.faqA,
    questionEn: COPY.en.faqQ,
    answerEn: COPY.en.faqA,
    questionIt: COPY.it.faqQ,
    answerIt: COPY.it.faqA,
  },
  // wait-before-water: align 72h
  'faq-7': {
    question: 'Quanto tempo devo esperar antes de molhar o relógio?',
    answer: 'Siga o manual do kit: <strong>48 horas</strong> antes de treino intenso com suor e <strong>72 horas</strong> antes de molhar (ducha ou contato prolongado com água), para o adesivo atingir a cura completa. Depois da cura, o uso cotidiano com água faz parte da finalidade — sem garantir o rating IPX/ATM original de fábrica para todos os modelos ou profundidades.',
    questionEn: 'How long should I wait before getting the watch wet?',
    answerEn: 'Follow the kit manual: <strong>48 hours</strong> before heavy sweat workouts and <strong>72 hours</strong> before wetting (shower or prolonged water contact) so the adhesive fully cures. After curing, everyday water use is part of the product’s purpose—without guaranteeing the original factory IPX/ATM rating for every model or depth.',
    questionIt: 'Quanto tempo aspetto prima di bagnare l’orologio?',
    answerIt: 'Segui il manuale: <strong>48 ore</strong> prima di allenamenti intensi con sudore e <strong>72 ore</strong> prima di bagnare (doccia o contatto prolungato), per la polimerizzazione completa. Dopo la cura, l’uso quotidiano con acqua rientra nella finalità—senza garantire la classificazione IPX/ATM di fabbrica per ogni modello o profondità.',
  },
};
for (const item of cfg.homeFaq || []) {
  if (faqMap[item.id]) Object.assign(item, faqMap[item.id]);
}
fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2) + '\n');
console.log('store-config homeFaq water items aligned (prices untouched)');
