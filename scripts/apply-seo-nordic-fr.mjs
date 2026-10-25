/** Apply CrashFix SEO fixes to fr/nl/sv/no/fi HTML + list strings for REVISAO-TRADUCOES.md */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

const WATER = {
  fr: "Couvre et protège la zone fissurée. Ne garantit pas la résistance à l'eau ; ne pas immerger.",
  nl: 'Bedekt en beschermt het gebarsten gebied. Garandeert geen waterbestendigheid; niet onderdompelen.',
  sv: 'Täcker och skyddar det spruckna området. Garanterar inte vattentålighet; sänk inte ner.',
  no: 'Dekker og beskytter det sprukne området. Garanterer ikke vanntetthet; ikke senk under vann.',
  fi: 'Peittää ja suojaa haljennutta aluetta. Ei takaa vedenkestävyyttä; älä upota.',
};

const META = {
  fr: {
    indexTitle: 'Capteur de smartwatch fissuré ? Réparation optique | CrashFix',
    indexDesc: 'Capteur du smartwatch fissuré ou ébréché ? La lentille adhésive Sensor CrashFix couvre la fissure et protège le capteur, sans remplacer le module.',
    h1: 'Capteur de smartwatch fissuré ou ébréché ? Comment protéger et réparer',
    heroP: 'Sensor CrashFix est une lentille optique adhésive qui couvre la fissure du capteur et aide à protéger la zone — sans remplacer le module de votre montre.',
    problemP: "Une fissure sur le capteur peut sembler « seulement esthétique » — jusqu'à ce que la zone reste exposée. Saleté, sueur et éclaboussures entrent ; la lecture optique devient instable ; la montre est moins fiable au quotidien. Sans protection, la fissure peut empirer.",
    sealH: 'Zone exposée',
    sealP: 'Avec le verre fissuré, la protection contre saleté et éclaboussures autour du capteur est compromise.',
    bioH: 'Lecture instable',
    bioP: "La fissure perturbe l'interface optique — la lecture peut échouer.",
    waterH: "Attention à l'eau",
    waterP: "Après le dommage, évitez d'immerger la montre jusqu'à évaluation du capteur (assistance ou couverture).",
    benefitWater: "Aide à protéger la zone fissurée de la saleté et des éclaboussures ; immersion non recommandée.",
    aboutOrigin: '<strong>Sensor CrashFix</strong> est le kit 3N20 pour un <strong>capteur fissuré, ébréché ou cassé</strong> : une lentille optique adhésive à diamètre élargi pour couvrir la fissure et protéger la zone du capteur.',
    aboutBody: "Nous avons développé la version à couverture élargie à partir de la même famille de lentilles optiques — conçue pour dépasser le bord du verre du capteur et couvrir les fissures qui atteignent le bord. Le kit <strong>ne remplace pas le module</strong> : il couvre et protège par-dessus.",
    aboutReferral: 'Si votre problème est différent (pas un capteur fissuré), voir la FAQ ou <a href="https://www.sensortattoofix.com.br" target="_blank" rel="noopener">Sensor TattooFix</a>.',
    aboutClosing: 'Capteur fissuré ? L\'idée est simple : <strong>couvrir, protéger et continuer à utiliser</strong>.',
    lojaTitle: 'Boutique officielle | Sensor CrashFix — Lentille pour capteur fissuré',
    lojaDesc: 'Achetez la lentille optique Sensor CrashFix — couverture adhésive pour capteur de smartwatch fissuré ou cassé, sans remplacer le module. PayPal, cartes et livraison suivie.',
    ondeTitle: 'Où acheter | Sensor CrashFix — Capteur smartwatch fissuré',
    ondeDesc: 'Achetez la lentille Sensor CrashFix pour un capteur de smartwatch fissuré ou cassé — boutique officielle, PayPal, cartes et livraison suivie.',
    faq: [
      ['La lentille est-elle compatible avec mon smartwatch ? Quelle taille ?', 'Oui, pour montres et bracelets avec capteur optique à l’arrière. Ce qui change est le <strong>diamètre (mm)</strong> — choisissez le modèle/famille en boutique.'],
      ['La lentille interfère-t-elle avec la charge ?', 'Non. Elle est fine et <strong>compatible avec la charge inductive</strong> ; utilisez le chargeur d’origine avec la lentille.'],
      ['Combien de temps dure la lentille ?', 'Cela dépend de l’usage et de l’application. En général elle reste adhérée ; si elle se décolle ou se raye, remplacez par la bonne taille.'],
      ['Quelle garantie ai-je ?', 'Garantie légale du consommateur. Pour échanges ou défauts de fabrication, contactez-nous par e-mail.'],
      ['Puis-je mouiller la montre avec la lentille ?', 'La lentille <strong>aide à protéger la zone fissurée de la saleté et des éclaboussures</strong> ; <strong>l’immersion n’est pas recommandée</strong>. Sans essai d’étanchéité du kit appliqué, traitez sueur/pluie légère avec prudence et évitez natation ou bain.'],
      ['Est-ce différent de TattooFix ?', 'Oui. CrashFix est pour un <strong>capteur fissuré/cassé</strong> (couverture élargie sur la fissure). Si votre cas est différent, voir <a href="https://www.sensortattoofix.com.br" target="_blank" rel="noopener">Sensor TattooFix</a>.'],
      ['Le kit remplace-t-il le module capteur ?', 'Non. Il <strong>couvre et protège</strong> le verre fissuré ; il ne remplace pas le module d’origine.'],
      ['Comment l’installer ?', 'Nettoyez le verre, alignez la lentille sur le capteur et appliquez selon le guide du kit. Voir aussi la section d’application sur le site.'],
    ],
  },
  nl: {
    indexTitle: 'Gebarsten smartwatch-sensor? Optische reparatie | CrashFix',
    indexDesc: 'Smartwatch-sensor gebarsten of afgebroken? De Sensor CrashFix-plaklens bedekt de scheur en beschermt de sensor — zonder de module te vervangen.',
    h1: 'Gebarsten of afgebroken smartwatch-sensor? Zo beschermt en herstelt u hem',
    heroP: 'Sensor CrashFix is een optische plaklens die de scheur van de sensor bedekt en het gebied helpt beschermen — zonder de module van uw horloge te vervangen.',
    problemP: 'Een scheur in de sensor kan “alleen cosmetisch” lijken — tot het gebied blootligt. Vuil, zweet en spatten komen binnen; de optische meting wordt onstabiel; het horloge is minder betrouwbaar. Zonder bescherming kan de scheur erger worden.',
    sealH: 'Blootgesteld gebied',
    sealP: 'Met gebarsten glas is de bescherming tegen vuil en spatten rond de sensor aangetast.',
    bioH: 'Onstabiele meting',
    bioP: 'De scheur verstoort de optische interface — de meting kan mislukken.',
    waterH: 'Voorzichtig met water',
    waterP: 'Na schade: vermijd onderdompelen tot u de sensor hebt beoordeeld (service of afdekking).',
    benefitWater: 'Helpt het gebarsten gebied te beschermen tegen vuil en spatten; onderdompelen niet aanbevolen.',
    aboutOrigin: '<strong>Sensor CrashFix</strong> is de 3N20-kit voor een <strong>gebarsten, afgebroken of kapotte sensor</strong>: een optische plaklens met grotere diameter om de scheur te bedekken en het sensorgebied te beschermen.',
    aboutBody: 'We ontwikkelden de versie met grotere dekking uit dezelfde familie optische lenzen — ontworpen om voorbij de glazen sensorrand te gaan en scheuren tot aan de rand te bedekken. De kit <strong>vervangt de module niet</strong>: hij bedekt en beschermt erbovenop.',
    aboutReferral: 'Als uw probleem anders is (geen gebarsten sensor), zie de FAQ of <a href="https://www.sensortattoofix.com.br" target="_blank" rel="noopener">Sensor TattooFix</a>.',
    aboutClosing: 'Sensor gebarsten? Het idee is eenvoudig: <strong>bedekken, beschermen en blijven gebruiken</strong>.',
    lojaTitle: 'Officiële winkel | Sensor CrashFix — Lens voor gebarsten sensor',
    lojaDesc: 'Koop de Sensor CrashFix optische lens — kleefafdekking voor een gebarsten of kapotte smartwatch-sensor zonder de module te vervangen. PayPal, kaarten en verzending met tracking.',
    ondeTitle: 'Waar te koop | Sensor CrashFix — Gebarsten smartwatch-sensor',
    ondeDesc: 'Koop de Sensor CrashFix-lens voor een gebarsten of kapotte smartwatch-sensor — officiële winkel, PayPal, kaarten en verzending met tracking.',
    faq: [
      ['Is de lens compatibel met mijn smartwatch? Welke maat?', 'Ja, voor horloges en bands met een optische sensor achterop. Wat verandert is de <strong>diameter (mm)</strong> — kies model/familie in de winkel.'],
      ['Verstoort de lens het opladen?', 'Nee. Hij is dun en <strong>compatibel met inductief laden</strong>; gebruik de originele lader met de lens.'],
      ['Hoe lang gaat de lens mee?', 'Hangt af van gebruik en plaatsing. Meestal blijft hij plakken; bij loslaten of krassen vervangen met de juiste maat.'],
      ['Welke garantie krijg ik?', 'Wettelijke consumentengarantie. Voor ruil of fabricagefouten: mail ons.'],
      ['Mag het horloge nat worden met de lens?', 'De lens <strong>helpt het gebarsten gebied te beschermen tegen vuil en spatten</strong>; <strong>onderdompelen wordt niet aanbevolen</strong>. Zonder waterdichtheidstest van de aangebrachte kit: licht zweet/regen voorzichtig, geen zwemmen of baden.'],
      ['Verschilt het van TattooFix?', 'Ja. CrashFix is voor een <strong>gebarsten/kapotte sensor</strong> (vergrote afdekking over de scheur). Bij een ander geval zie <a href="https://www.sensortattoofix.com.br" target="_blank" rel="noopener">Sensor TattooFix</a>.'],
      ['Vervangt de kit de sensormodule?', 'Nee. Hij <strong>bedekt en beschermt</strong> het gebarsten glas; hij vervangt de originele module niet.'],
      ['Hoe installeer ik hem?', 'Reinig het glas, lijn de lens uit op de sensor en breng aan volgens de kitgids.'],
    ],
  },
  sv: {
    indexTitle: 'Sprucken smartwatch-sensor? Optisk reparation | CrashFix',
    indexDesc: 'Smartwatch-sensorn sprucken eller flisad? Sensor CrashFix-självhäftande lins täcker sprickan och skyddar sensorn — utan att byta modulen.',
    h1: 'Sprucken eller flisad smartwatch-sensor? Så skyddar och reparerar du',
    heroP: 'Sensor CrashFix är en optisk självhäftande lins som täcker sensorsprickan och hjälper till att skydda området — utan att byta klockans modul.',
    problemP: 'En spricka i sensorn kan verka “bara kosmetisk” — tills området är exponerat. Smuts, svett och stänk kommer in; optisk avläsning blir ostabil; klockan blir mindre pålitlig. Utan skydd kan sprickan förvärras.',
    sealH: 'Exponerat område',
    sealP: 'Med sprucket glas äventyras skyddet mot smuts och stänk runt sensorn.',
    bioH: 'Ostabil avläsning',
    bioP: 'Sprickan stör det optiska gränssnittet — avläsning kan misslyckas.',
    waterH: 'Var försiktig med vatten',
    waterP: 'Efter skadan: undvik nedsänkning tills du bedömt sensorn (service eller skydd).',
    benefitWater: 'Hjälper att skydda det spruckna området från smuts och stänk; nedsänkning rekommenderas inte.',
    aboutOrigin: '<strong>Sensor CrashFix</strong> är 3N20:s kit för en <strong>sprucken, flisad eller trasig sensor</strong>: en optisk självhäftande lins med större diameter för att täcka sprickan och skydda sensorområdet.',
    aboutBody: 'Vi utvecklade versionen med större täckning från samma familj av optiska linser — avsedd att gå förbi sensorkanten och täcka sprickor som når kanten. Kitet <strong>byter inte ut modulen</strong>: det täcker och skyddar ovanpå.',
    aboutReferral: 'Om ditt problem är ett annat (inte sprucken sensor), se FAQ eller <a href="https://www.sensortattoofix.com.br" target="_blank" rel="noopener">Sensor TattooFix</a>.',
    aboutClosing: 'Sensor sprucken? Idén är enkel: <strong>täck, skydda och fortsätt använda</strong>.',
    lojaTitle: 'Officiell butik | Sensor CrashFix — Lins för sprucken sensor',
    lojaDesc: 'Köp Sensor CrashFix optiska lins — självhäftande skydd för sprucken eller trasig smartwatch-sensor utan att byta modul. PayPal, kort och spårbar frakt.',
    ondeTitle: 'Var man köper | Sensor CrashFix — Sprucken smartwatch-sensor',
    ondeDesc: 'Köp Sensor CrashFix-linsen för en sprucken eller trasig smartwatch-sensor — officiell butik, PayPal, kort och spårbar frakt.',
    faq: [
      ['Är linsen kompatibel med min smartwatch? Vilken storlek?', 'Ja, för klockor och armband med optisk sensor på baksidan. Det som ändras är <strong>diametern (mm)</strong> — välj modell/familj i butiken.'],
      ['Stör linsen laddningen?', 'Nej. Den är tunn och <strong>kompatibel med induktiv laddning</strong>; använd original laddare med linsen på.'],
      ['Hur länge håller linsen?', 'Beror på användning och applicering. Den sitter vanligtvis kvar; om den lossnar eller nöts, byt till rätt storlek.'],
      ['Vilken garanti får jag?', 'Lagstadgad konsumentgaranti. För byte eller tillverkningsfel: mejla oss.'],
      ['Kan klockan bli blöt med linsen?', 'Linsen <strong>hjälper till att skydda det spruckna området från smuts och stänk</strong>; <strong>nedsänkning rekommenderas inte</strong>. Utan vattentest av det applicerade kitet: behandla lätt svett/regn försiktigt och undvik simning eller bad.'],
      ['Skiljer det sig från TattooFix?', 'Ja. CrashFix är för en <strong>sprucken/trasig sensor</strong> (förstorat skydd över sprickan). Annat fall: se <a href="https://www.sensortattoofix.com.br" target="_blank" rel="noopener">Sensor TattooFix</a>.'],
      ['Byter kitet ut sensormodulen?', 'Nej. Det <strong>täcker och skyddar</strong> det spruckna glaset; det byter inte ut originalmodulen.'],
      ['Hur installerar jag den?', 'Rengör glaset, rikta in linsen på sensorn och applicera enligt kitguiden.'],
    ],
  },
  no: {
    indexTitle: 'Sprukket smartklokke-sensor? Optisk reparasjon | CrashFix',
    indexDesc: 'Smartklokke-sensoren sprukket eller fliset? Sensor CrashFix-selvklebende linse dekker sprekken og beskytter sensoren — uten å bytte modulen.',
    h1: 'Sprukket eller fliset smartklokke-sensor? Slik beskytter og reparerer du',
    heroP: 'Sensor CrashFix er en optisk selvklebende linse som dekker sensorsprekken og hjelper til å beskytte området — uten å bytte klokkens modul.',
    problemP: 'En sprekk i sensoren kan virke «bare kosmetisk» — til området er eksponert. Skitt, svette og søl kommer inn; optisk avlesning blir ustabil; klokken blir mindre pålitelig. Uten beskyttelse kan sprekken bli verre.',
    sealH: 'Eksponert område',
    sealP: 'Med sprukket glass svekkes beskyttelsen mot skitt og søl rundt sensoren.',
    bioH: 'Ustabil avlesning',
    bioP: 'Sprekken forstyrrer det optiske grensesnittet — avlesning kan mislykkes.',
    waterH: 'Vær forsiktig med vann',
    waterP: 'Etter skaden: unngå nedsenking til du har vurdert sensoren (service eller deksel).',
    benefitWater: 'Hjelper å beskytte det sprukne området mot skitt og søl; nedsenking anbefales ikke.',
    aboutOrigin: '<strong>Sensor CrashFix</strong> er 3N20s sett for en <strong>sprukket, fliset eller ødelagt sensor</strong>: en optisk selvklebende linse med større diameter for å dekke sprekken og beskytte sensorområdet.',
    aboutBody: 'Vi utviklet versjonen med større dekning fra samme familie optiske linser — laget for å gå forbi sensorkanten og dekke sprekker som når kanten. Settet <strong>bytter ikke ut modulen</strong>: det dekker og beskytter oppå.',
    aboutReferral: 'Hvis problemet ditt er et annet (ikke sprukket sensor), se FAQ eller <a href="https://www.sensortattoofix.com.br" target="_blank" rel="noopener">Sensor TattooFix</a>.',
    aboutClosing: 'Sensor sprukket? Ideen er enkel: <strong>dekk, beskytt og fortsett å bruke</strong>.',
    lojaTitle: 'Offisiell butikk | Sensor CrashFix — Linse for sprukket sensor',
    lojaDesc: 'Kjøp Sensor CrashFix optiske linse — selvklebende deksel for sprukket eller ødelagt smartklokke-sensor uten å bytte modul. PayPal, kort og sporbar frakt.',
    ondeTitle: 'Hvor kjøpe | Sensor CrashFix — Sprukket smartklokke-sensor',
    ondeDesc: 'Kjøp Sensor CrashFix-linsen for en sprukket eller ødelagt smartklokke-sensor — offisiell butikk, PayPal, kort og sporbar frakt.',
    faq: [
      ['Er linsen kompatibel med smartklokken min? Hvilken størrelse?', 'Ja, for klokker og bånd med optisk sensor bak. Det som endres er <strong>diameteren (mm)</strong> — velg modell/familie i butikken.'],
      ['Forstyrrer linsen ladingen?', 'Nei. Den er tynn og <strong>kompatibel med induktiv lading</strong>; bruk original lader med linsen på.'],
      ['Hvor lenge varer linsen?', 'Avhenger av bruk og påføring. Den sitter vanligvis; hvis den løsner eller risses, bytt til riktig størrelse.'],
      ['Hvilken garanti får jeg?', 'Lovpålagt forbrukergaranti. For bytte eller produksjonsfeil: e-post oss.'],
      ['Kan klokken bli våt med linsen?', 'Linsen <strong>hjelper å beskytte det sprukne området mot skitt og søl</strong>; <strong>nedsenking anbefales ikke</strong>. Uten vanntest av det påførte settet: vær forsiktig med lett svette/regn og unngå svømming eller bad.'],
      ['Skiller det seg fra TattooFix?', 'Ja. CrashFix er for en <strong>sprukket/ødelagt sensor</strong> (forstørret deksel over sprekken). Annet tilfelle: se <a href="https://www.sensortattoofix.com.br" target="_blank" rel="noopener">Sensor TattooFix</a>.'],
      ['Bytter settet ut sensormodulen?', 'Nei. Det <strong>dekker og beskytter</strong> det sprukne glasset; det bytter ikke ut originalmodulen.'],
      ['Hvordan installerer jeg den?', 'Rens glasset, juster linsen på sensoren og påfør etter settguiden.'],
    ],
  },
  fi: {
    indexTitle: 'Haljennut älykellon sensori? Optinen korjaus | CrashFix',
    indexDesc: 'Älykellon sensori haljennut tai lohkeillut? Sensor CrashFix -tarraobjektiivi peittää halkeaman ja suojaa sensoria — ilman moduulin vaihtoa.',
    h1: 'Haljennut tai lohkeillut älykellon sensori? Näin suojaat ja korjaat',
    heroP: 'Sensor CrashFix on optinen tarraobjektiivi, joka peittää sensorin halkeaman ja auttaa suojaamaan aluetta — ilman kellon moduulin vaihtoa.',
    problemP: 'Halkeama sensorissa voi näyttää “vain kosmeettiselta” — kunnes alue on alttiina. Lika, hiki ja roiskeet pääsevät sisään; optinen lukema epävakaantuu; kello on vähemmän luotettava. Ilman suojaa halkeama voi pahentua.',
    sealH: 'Alttiina oleva alue',
    sealP: 'Haljenneella lasilla suoja likaa ja roiskeita vastaan sensorin ympärillä heikkenee.',
    bioH: 'Epävakaa lukema',
    bioP: 'Halkeama häiritsee optista rajapintaa — lukema voi epäonnistua.',
    waterH: 'Varovasti veden kanssa',
    waterP: 'Vahingon jälkeen: vältä upottamista, kunnes arvioit sensorin (huolto tai peite).',
    benefitWater: 'Auttaa suojaamaan haljennutta aluetta lialta ja roiskeilta; upottamista ei suositella.',
    aboutOrigin: '<strong>Sensor CrashFix</strong> on 3N20:n paketti <strong>haljenneelle, lohkeilleelle tai rikkinäiselle sensorille</strong>: optinen tarraobjektiivi suuremmalla halkaisijalla peittämään halkeama ja suojaamaan sensorialuetta.',
    aboutBody: 'Kehitimme suuremman peiton version samasta optisten linssien perheestä — suunniteltu ylittämään sensorilasin reuna ja peittämään reunaa ulottuvat halkeamat. Paketti <strong>ei vaihda moduulia</strong>: se peittää ja suojaa päällä.',
    aboutReferral: 'Jos ongelmasi on eri (ei haljennut sensori), katso FAQ tai <a href="https://www.sensortattoofix.com.br" target="_blank" rel="noopener">Sensor TattooFix</a>.',
    aboutClosing: 'Sensori haljennut? Idea on yksinkertainen: <strong>peitä, suojaa ja jatka käyttöä</strong>.',
    lojaTitle: 'Virallinen kauppa | Sensor CrashFix — Linssi haljenneelle sensorille',
    lojaDesc: 'Osta Sensor CrashFix -optinen linssi — tarrapeite haljenneelle tai rikkinäiselle älykellon sensorille ilman moduulin vaihtoa. PayPal, kortit ja seurattava toimitus.',
    ondeTitle: 'Mistä ostaa | Sensor CrashFix — Haljennut älykellon sensori',
    ondeDesc: 'Osta Sensor CrashFix -linssi haljenneelle tai rikkinäiselle älykellon sensorille — virallinen kauppa, PayPal, kortit ja seurattava toimitus.',
    faq: [
      ['Onko linssi yhteensopiva älykelloni kanssa? Mikä koko?', 'Kyllä, kelloille ja rannekkeille, joissa on optinen sensori takana. Mikä muuttuu on <strong>halkaisija (mm)</strong> — valitse malli/perhe kaupasta.'],
      ['Häiritseekö linssi latausta?', 'Ei. Se on ohut ja <strong>yhteensopiva induktiolatauksen kanssa</strong>; käytä alkuperäistä laturia linssin kanssa.'],
      ['Kuinka kauan linssi kestää?', 'Riippuu käytöstä ja asennuksesta. Yleensä se pysyy kiinni; jos irtoaa tai naarmuuntuu, vaihda oikeaan kokoon.'],
      ['Minkä takuun saan?', 'Lakiperusteinen kuluttajatakuu. Vaihtoihin tai valmistusvirheisiin: sähköposti.'],
      ['Voiko kello kastua linssin kanssa?', 'Linssi <strong>auttaa suojaamaan haljennutta aluetta lialta ja roiskeilta</strong>; <strong>upottamista ei suositella</strong>. Ilman asennetun paketin vedenkestävyystestiä: käsittele kevyt hiki/sade varovasti, vältä uintia tai kylpyä.'],
      ['Eroaako se TattooFixistä?', 'Kyllä. CrashFix on <strong>haljenneelle/rikkinäiselle sensorille</strong> (suurennettu peite halkeaman yli). Muussa tapauksessa katso <a href="https://www.sensortattoofix.com.br" target="_blank" rel="noopener">Sensor TattooFix</a>.'],
      ['Vaihtaako paketti sensormoduulin?', 'Ei. Se <strong>peittää ja suojaa</strong> haljennutta lasia; se ei vaihda alkuperäistä moduulia.'],
      ['Miten asennan sen?', 'Puhdista lasi, kohdista linssi sensoriin ja asenna paketin ohjeen mukaan.'],
    ],
  },
};

function faqHtml(items) {
  const body = items.map(([q, a]) => `        <details class="faq-item">
            <summary>${q}</summary>
            <p>${a}</p>
        </details>`).join('\n');
  return `    <div class="faq-container" id="home-faq-root" data-faq-static="1">
${body}
    </div>`;
}

function patchIndex(lang, t) {
  const file = path.join(ROOT, lang, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${t.indexTitle}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${t.indexDesc}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${t.indexTitle}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${t.indexDesc}"`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${t.indexTitle}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${t.indexDesc}"`);
  html = html.replace(/<h1>[^<]*<\/h1>/, `<h1>${t.h1}</h1>`);
  // hero paragraph after h1 (first content-section p in hero) — replace first long p in #problema or hero
  html = html.replace(
    /(<section id="top"[\s\S]*?<h1>[^<]*<\/h1>\s*)<p>[\s\S]*?<\/p>/,
    `$1<p>${t.heroP}</p>`
  );
  // problem intro
  html = html.replace(
    /(<section id="problema"[\s\S]*?<h2>[^<]*<\/h2>\s*)<p>[\s\S]*?<\/p>/,
    `$1<p>${t.problemP}</p>`
  );
  // benefit water card text if present
  html = html.replace(/100%\s*compatibel met inductieladen\./gi, 'Compatibel met inductieladen.');
  html = html.replace(/100%\s*/g, (m, off, s) => {
    // only strip misleading 100% near waterproof/compat claims already handled
    return m;
  });

  // Replace about-body that claims waterproof restoration via TattooFix origin story
  if (html.includes('about-body')) {
    html = html.replace(
      /<div class="about-card about-card--story">[\s\S]*?<\/div>\s*(?=<div class="about-card about-card--patent">|<div class="about-card about-card--founder">)/,
      `<div class="about-card about-card--story">
                <p class="about-origin">${t.aboutOrigin}</p>
                <p class="about-body">${t.aboutBody}</p>
                <p class="about-body">${t.aboutReferral}</p>
            </div>
            `
    );
  }
  if (!html.includes('about-closing')) {
    html = html.replace(
      /(<div class="about-signature">[\s\S]*?<\/div>)/,
      `<p class="about-closing">${t.aboutClosing}</p>\n                $1`
    );
  } else {
    html = html.replace(/<p class="about-closing">[\s\S]*?<\/p>/, `<p class="about-closing">${t.aboutClosing}</p>`);
  }

  // FAQ: replace container
  if (html.includes('id="home-faq-root"')) {
    html = html.replace(
      /<div class="faq-container"[^>]*>[\s\S]*?<\/div>\s*(?=<\/section>)/,
      faqHtml(t.faq) + '\n        '
    );
  }

  // Soft-replace waterproof-ish phrases in remaining PT/EN leftovers
  const replacements = [
    [/restaure[rz]? l[’']étanchéité/gi, 'aide à protéger la zone'],
    [/rétablir l[’']étanchéité/gi, 'protéger la zone du capteur'],
    [/waterdichte afdichting terug te brengen/gi, 'het sensorgebied te beschermen'],
    [/återställa vattentät tätning/gi, 'skydda sensorområdet'],
    [/gjenopprette vanntett forsegling/gi, 'beskytte sensorområdet'],
    [/palauttaa vesitiiviin tiivistyksen/gi, 'suojata sensorialuetta'],
    [/natation légère/gi, 'éclaboussures'],
  ];
  for (const [re, to] of replacements) html = html.replace(re, to);

  fs.writeFileSync(file, html);
}

function patchLojaOnde(lang, t) {
  for (const [file, title, desc] of [
    ['loja.html', t.lojaTitle, t.lojaDesc],
    ['onde-comprar.html', t.ondeTitle, t.ondeDesc],
  ]) {
    const p = path.join(ROOT, lang, file);
    let html = fs.readFileSync(p, 'utf8');
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${desc}"`);
    html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`);
    html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${desc}"`);
    // remove fake stars trust line
    html = html.replace(/\s*<p class="onde-comprar-trust">[\s\S]*?<\/p>/g, '');
    // strip passcode/tattoo keywords meta
    html = html.replace(/<meta name="keywords" content="[^"]*passcode[^"]*"\s*>\s*/gi, '');
    html = html.replace(/<meta name="keywords" content="[^"]*pouls[^"]*"\s*>\s*/gi, '');
    html = html.replace(/<meta name="keywords" content="[^"]*code smartwatch[^"]*"\s*>\s*/gi, '');
    fs.writeFileSync(p, html);
  }
}

function patchOverrides(lang, t) {
  const file = path.join(ROOT, 'js', `stf-i18n-${lang}-overrides.js`);
  if (!fs.existsSync(file)) return;
  let js = fs.readFileSync(file, 'utf8');
  const waterKey = `'store.waterDisclaimer': ${JSON.stringify(WATER[lang])},`;
  if (!js.includes('store.waterDisclaimer')) {
    js = js.replace(/(\{\s*\n)/, `$1  ${waterKey}\n`);
  } else {
    js = js.replace(/'store\.waterDisclaimer':\s*'[^']*'/, `'store.waterDisclaimer': ${JSON.stringify(WATER[lang]).slice(1, -1)}`);
  }
  // Fix store/onde meta if present
  const metaKeys = [
    [`store.metaDesc${lang[0].toUpperCase()}${lang.slice(1)}`, t.lojaDesc],
    [`ondeComprar.metaDesc${lang[0].toUpperCase()}${lang.slice(1)}`, t.ondeDesc],
  ];
  // fr uses Fr suffix already in file as Fr
  const suf = { fr: 'Fr', nl: 'Nl', sv: 'Sv', no: 'No', fi: 'Fi' }[lang];
  for (const [base, val] of [
    [`store.metaDesc${suf}`, t.lojaDesc],
    [`ondeComprar.metaDesc${suf}`, t.ondeDesc],
  ]) {
    const re = new RegExp(`'${base}':\\s*'[^']*'`);
    if (re.test(js)) {
      js = js.replace(re, `'${base}': ${JSON.stringify(val)}`);
    }
  }
  fs.writeFileSync(file, js);
}

const revisao = ['# REVISÃO — traduções SEO (fr / nl / sv / no / fi)', '', 'Texto-fonte PT: *«Cobre e protege a região trincada. Não garante resistência à água; não submergir.»*', '', '| Idioma | Tradução do disclaimer de água |', '|--------|--------------------------------|'];
for (const lang of Object.keys(META)) {
  const t = META[lang];
  patchIndex(lang, t);
  patchLojaOnde(lang, t);
  patchOverrides(lang, t);
  revisao.push(`| ${lang} | ${WATER[lang]} |`);
  revisao.push('');
  revisao.push(`## ${lang} — trechos principais`);
  revisao.push(`- **H1:** ${t.h1}`);
  revisao.push(`- **Loja title:** ${t.lojaTitle}`);
  revisao.push(`- **Onde comprar title:** ${t.ondeTitle}`);
  revisao.push(`- **FAQ água:** ${t.faq[4][1]}`);
  revisao.push(`- **About (origem Crash):** ${t.aboutOrigin.replace(/<[^>]+>/g, '')}`);
  revisao.push('');
}
revisao.push('## Remoções');
revisao.push('- Títulos/meta com passcode / code & pouls / heart rate (território TattooFix).');
revisao.push('- Linha de trust «5.0 · verified buyers» em onde-comprar.');
revisao.push('- Claims de restauração de «étanchéité / waterdichte / vanntett» como garantia do kit.');
revisao.push('- «100% compatibel» enganoso (NL).');
fs.writeFileSync(path.join(ROOT, 'REVISAO-TRADUCOES.md'), revisao.join('\n'));
console.log('patched fr/nl/sv/no/fi + REVISAO-TRADUCOES.md');
