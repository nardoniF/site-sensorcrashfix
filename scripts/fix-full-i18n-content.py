#!/usr/bin/env python3
"""Replace quem-somos with full PT-parity translations; add FAQ l10n for FR/NO/SV/NL (+ faq-11)."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Full About sections (same structure as EN/PT)
ABOUT = {
    "fr": """<section id="quem-somos" class="content-section grey-bg">
        <div class="container about-section">
            <h2 class="section-title">Qui sommes-nous</h2>
                        <div class="about-card about-card--story">
                <p class="about-origin"><strong>Sensor CrashFix</strong> est né de <a href="https://www.sensortattoofix.com/" data-sister-link data-evento="clique_sister_tattoofix" data-rotulo="About Sensor TattooFix FR" target="_blank" rel="noopener noreferrer"><strong>Sensor TattooFix</strong></a> — le produit conçu pour restaurer les fonctions de la smartwatch sur <strong>peau tatouée</strong>.</p>
                <p class="about-body">Les capteurs optiques de smartwatch <strong>lisent souvent mal sur peau tatouée</strong>. Sensor TattooFix a développé une lentille progressive, avec un matériau adapté au modèle, qui restaure les fonctions de la montre dans ce cas.</p>
                <p class="about-body">Certaines personnes ont commencé à acheter la lentille Sensor TattooFix <strong>même sans tatouage</strong> — pour des capteurs <strong>endommagés / fissurés</strong>. Dans de nombreux cas, le capteur fonctionnait à nouveau et la montre redevenait étanche.</p>
                <h3 class="about-story-heading">C’est ainsi qu’est né Sensor CrashFix</h3>
                <p class="about-body">Nous avons donc créé <strong>Sensor CrashFix</strong> : un « cousin » de Sensor TattooFix — non seulement pour restaurer la lecture d’un capteur fissuré, mais aussi pour <strong>restaurer l’étanchéité</strong> d’une montre coûteuse.</p>
                <p class="about-body"><strong>Qu’est-ce qui change par rapport à la lentille Sensor TattooFix ?</strong> La lentille Sensor CrashFix est <strong>plus grande</strong> : elle dépasse le verre du capteur pour <strong>sceller au-delà du bord</strong> — pour les fissures qui vont jusqu’au bord du capteur. Sensor TattooFix couvre la zone de lecture ; Sensor CrashFix doit aller plus loin pour resealer ces fissures bord à bord.</p>
                <h3 class="about-story-heading" hidden>Brevets</h3>
                <p class="about-body">La technologie de lentille optique et d’adhérence est enregistrée pour protéger l’authenticité au Brésil et à l’étranger :</p>
                <div class="about-patents" hidden aria-label="Enregistrements de brevet">
                    <div class="about-patent">
                        <i class="fas fa-award" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Brevet national · INPI</span>
                            <span class="about-patent-num">BR 20 2026 010875 3</span>
                        </div>
                    </div>
                    <div class="about-patent">
                        <i class="fas fa-globe-americas" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Brevet international · PCT</span>
                            <span class="about-patent-num">PCT BR 2026 050304</span>
                        </div>
                    </div>
                </div>
                <p class="about-closing">Capteur fissuré ? L’idée est simple : <strong>protéger à nouveau</strong>, resealer, et utiliser la montre.</p>
                <div class="about-signature">
                    <img src="../images/home/fundador-fabio.jpg?v=crash6" alt="Fábio Nardoni, fondateur de Sensor CrashFix" class="about-signature-photo" width="112" height="112" loading="lazy" decoding="async">
                    <div class="about-signature-text">
                        <p class="about-signature-name">Fábio Nardoni</p>
                        <p class="about-signature-role">Fondateur · Sensor CrashFix · 3N20</p>
                    </div>
                </div>
            </div>
        </div>
    </section>""",
    "no": """<section id="quem-somos" class="content-section grey-bg">
        <div class="container about-section">
            <h2 class="section-title">Om oss</h2>
                        <div class="about-card about-card--story">
                <p class="about-origin"><strong>Sensor CrashFix</strong> oppsto fra <a href="https://www.sensortattoofix.com/" data-sister-link data-evento="clique_sister_tattoofix" data-rotulo="About Sensor TattooFix NO" target="_blank" rel="noopener noreferrer"><strong>Sensor TattooFix</strong></a> — produktet laget for å gjenopprette smartklokkefunksjoner på <strong>tatovert hud</strong>.</p>
                <p class="about-body">Optiske sensorer i smartklokker <strong>leser ofte dårlig på tatovert hud</strong>. Sensor TattooFix utviklet en gradert linse, med modellspesifikt materiale, som gjenoppretter klokkefunksjonene i det tilfellet.</p>
                <p class="about-body">Noen begynte å kjøpe Sensor TattooFix-linsen <strong>selv uten tatovering</strong> — til <strong>skadede / sprukne</strong> sensorer. I mange tilfeller virket sensoren igjen, og klokken ble vanntett på nytt.</p>
                <h3 class="about-story-heading">Slik startet Sensor CrashFix</h3>
                <p class="about-body">Derfor laget vi <strong>Sensor CrashFix</strong>: en «kusine» av Sensor TattooFix — ikke bare for å gjenopprette avlesning på en sprukket sensor, men også for å <strong>gjenopprette tetningen</strong> på en dyr klokke.</p>
                <p class="about-body"><strong>Hva endres i forhold til Sensor TattooFix-linsen?</strong> Sensor CrashFix-linsen er <strong>større</strong>: den går forbi sensordlasset slik at den kan <strong>forsegle utenfor kanten</strong> — for sprekker som går helt til kanten av sensoren. Sensor TattooFix dekker leseområdet; Sensor CrashFix må gå lenger for å forsegle disse kant-til-kant-sprekkene.</p>
                <h3 class="about-story-heading" hidden>Patenter</h3>
                <p class="about-body">Den optiske linsen og festeteknologien er registrert for å beskytte autentisitet i Brasil og utlandet:</p>
                <div class="about-patents" hidden aria-label="Patentregistreringer">
                    <div class="about-patent">
                        <i class="fas fa-award" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Nasjonalt patent · INPI</span>
                            <span class="about-patent-num">BR 20 2026 010875 3</span>
                        </div>
                    </div>
                    <div class="about-patent">
                        <i class="fas fa-globe-americas" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Internasjonalt patent · PCT</span>
                            <span class="about-patent-num">PCT BR 2026 050304</span>
                        </div>
                    </div>
                </div>
                <p class="about-closing">Sprukket sensor? Ideen er enkel: <strong>beskytt igjen</strong>, forsegle, og bruk klokken.</p>
                <div class="about-signature">
                    <img src="../images/home/fundador-fabio.jpg?v=crash6" alt="Fábio Nardoni, grunnlegger av Sensor CrashFix" class="about-signature-photo" width="112" height="112" loading="lazy" decoding="async">
                    <div class="about-signature-text">
                        <p class="about-signature-name">Fábio Nardoni</p>
                        <p class="about-signature-role">Grunnlegger · Sensor CrashFix · 3N20</p>
                    </div>
                </div>
            </div>
        </div>
    </section>""",
    "sv": """<section id="quem-somos" class="content-section grey-bg">
        <div class="container about-section">
            <h2 class="section-title">Om oss</h2>
                        <div class="about-card about-card--story">
                <p class="about-origin"><strong>Sensor CrashFix</strong> föddes ur <a href="https://www.sensortattoofix.com/" data-sister-link data-evento="clique_sister_tattoofix" data-rotulo="About Sensor TattooFix SV" target="_blank" rel="noopener noreferrer"><strong>Sensor TattooFix</strong></a> — produkten som återställer smartklockefunktioner på <strong>tatuerad hud</strong>.</p>
                <p class="about-body">Optiska sensorer i smartklockor <strong>läser ofta dåligt på tatuerad hud</strong>. Sensor TattooFix utvecklade en graderad lins, med modellspecifikt material, som återställer klockans funktioner i det fallet.</p>
                <p class="about-body">Vissa började köpa Sensor TattooFix-linsen <strong>även utan tatuering</strong> — för <strong>skadade / spruckna</strong> sensorer. I många fall fungerade sensorn igen och klockan blev vattentät på nytt.</p>
                <h3 class="about-story-heading">Så började Sensor CrashFix</h3>
                <p class="about-body">Därför skapade vi <strong>Sensor CrashFix</strong>: en ”kusin” till Sensor TattooFix — inte bara för att återställa avläsning på en sprucken sensor, utan också för att <strong>återställa tätningen</strong> på en dyr klocka.</p>
                <p class="about-body"><strong>Vad skiljer mot Sensor TattooFix-linsen?</strong> Sensor CrashFix-linsen är <strong>större</strong>: den går förbi sensorgglaset så att den kan <strong>täta bortom kanten</strong> — för sprickor som går hela vägen till sensorns kant. Sensor TattooFix täcker läsområdet; Sensor CrashFix behöver gå längre för att täta de där kant-till-kant-sprickorna.</p>
                <h3 class="about-story-heading" hidden>Patent</h3>
                <p class="about-body">Den optiska linsen och vidhäftningstekniken är registrerad för att skydda äktheten i Brasilien och utomlands:</p>
                <div class="about-patents" hidden aria-label="Patentregistreringar">
                    <div class="about-patent">
                        <i class="fas fa-award" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Nationellt patent · INPI</span>
                            <span class="about-patent-num">BR 20 2026 010875 3</span>
                        </div>
                    </div>
                    <div class="about-patent">
                        <i class="fas fa-globe-americas" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Internationellt patent · PCT</span>
                            <span class="about-patent-num">PCT BR 2026 050304</span>
                        </div>
                    </div>
                </div>
                <p class="about-closing">Sprucken sensor? Idén är enkel: <strong>skydda igen</strong>, täta, och använd klockan.</p>
                <div class="about-signature">
                    <img src="../images/home/fundador-fabio.jpg?v=crash6" alt="Fábio Nardoni, grundare av Sensor CrashFix" class="about-signature-photo" width="112" height="112" loading="lazy" decoding="async">
                    <div class="about-signature-text">
                        <p class="about-signature-name">Fábio Nardoni</p>
                        <p class="about-signature-role">Grundare · Sensor CrashFix · 3N20</p>
                    </div>
                </div>
            </div>
        </div>
    </section>""",
    "nl": """<section id="quem-somos" class="content-section grey-bg">
        <div class="container about-section">
            <h2 class="section-title">Over ons</h2>
                        <div class="about-card about-card--story">
                <p class="about-origin"><strong>Sensor CrashFix</strong> ontstond uit <a href="https://www.sensortattoofix.com/" data-sister-link data-evento="clique_sister_tattoofix" data-rotulo="About Sensor TattooFix NL" target="_blank" rel="noopener noreferrer"><strong>Sensor TattooFix</strong></a> — het product om smartwatchfuncties te herstellen op <strong>getatoeëerde huid</strong>.</p>
                <p class="about-body">Optische sensoren van smartwatches <strong>lezen vaak slecht op getatoeëerde huid</strong>. Sensor TattooFix ontwikkelde een gegradueerde lens, met modelspecifiek materiaal, die de horlogefuncties in dat geval herstelt.</p>
                <p class="about-body">Sommige mensen begonnen de Sensor TattooFix-lens te kopen <strong>zelfs zonder tatoeage</strong> — voor <strong>beschadigde / gebarsten</strong> sensoren. In veel gevallen werkte de sensor weer en werd het horloge opnieuw waterdicht.</p>
                <h3 class="about-story-heading">Zo begon Sensor CrashFix</h3>
                <p class="about-body">Daarom maakten we <strong>Sensor CrashFix</strong>: een “neefje” van Sensor TattooFix — niet alleen om de uitlezing van een gebarsten sensor te herstellen, maar ook om de <strong>afdichting te herstellen</strong> van een duur horloge.</p>
                <p class="about-body"><strong>Wat verandert er ten opzichte van de Sensor TattooFix-lens?</strong> De Sensor CrashFix-lens is <strong>groter</strong>: hij steekt voorbij het sensorglas zodat hij <strong>voorbij de rand kan afdichten</strong> — voor barsten die tot de rand van de sensor lopen. Sensor TattooFix dekt het leesgebied; Sensor CrashFix moet verder gaan om die rand-tot-rand-barsten opnieuw af te dichten.</p>
                <h3 class="about-story-heading" hidden>Patenten</h3>
                <p class="about-body">De optische lens en hechttechnologie zijn geregistreerd om authenticiteit in Brazilië en in het buitenland te beschermen:</p>
                <div class="about-patents" hidden aria-label="Patentregistraties">
                    <div class="about-patent">
                        <i class="fas fa-award" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Nationaal patent · INPI</span>
                            <span class="about-patent-num">BR 20 2026 010875 3</span>
                        </div>
                    </div>
                    <div class="about-patent">
                        <i class="fas fa-globe-americas" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Internationaal patent · PCT</span>
                            <span class="about-patent-num">PCT BR 2026 050304</span>
                        </div>
                    </div>
                </div>
                <p class="about-closing">Gebarsten sensor? Het idee is eenvoudig: <strong>opnieuw beschermen</strong>, afdichten, en het horloge gebruiken.</p>
                <div class="about-signature">
                    <img src="../images/home/fundador-fabio.jpg?v=crash6" alt="Fábio Nardoni, oprichter van Sensor CrashFix" class="about-signature-photo" width="112" height="112" loading="lazy" decoding="async">
                    <div class="about-signature-text">
                        <p class="about-signature-name">Fábio Nardoni</p>
                        <p class="about-signature-role">Oprichter · Sensor CrashFix · 3N20</p>
                    </div>
                </div>
            </div>
        </div>
    </section>""",
    "de": """<section id="quem-somos" class="content-section grey-bg">
        <div class="container about-section">
            <h2 class="section-title">Über uns</h2>
                        <div class="about-card about-card--story">
                <p class="about-origin"><strong>Sensor CrashFix</strong> entstand aus <a href="https://www.sensortattoofix.com/de/" data-sister-link data-evento="clique_sister_tattoofix" data-rotulo="About Sensor TattooFix DE" target="_blank" rel="noopener noreferrer"><strong>Sensor TattooFix</strong></a> — dem Produkt, das Smartwatch-Funktionen auf <strong>tätowierter Haut</strong> zurückbringt.</p>
                <p class="about-body">Optische Smartwatch-Sensoren <strong>lesen auf tätowierter Haut oft schlecht</strong>. Sensor TattooFix entwickelte eine graduierte Linse mit modellspezifischem Material, die die Uhrenfunktionen in diesem Fall wiederherstellt.</p>
                <p class="about-body">Manche kauften die Sensor-TattooFix-Linse <strong>auch ohne Tattoo</strong> — für <strong>beschädigte / gerissene</strong> Sensoren. In vielen Fällen funktionierte der Sensor wieder und die Uhr wurde erneut wasserdicht.</p>
                <h3 class="about-story-heading">So entstand Sensor CrashFix</h3>
                <p class="about-body">Deshalb schufen wir <strong>Sensor CrashFix</strong>: einen „Cousin“ von Sensor TattooFix — nicht nur zur Wiederherstellung der Messung bei gerissenem Sensor, sondern auch zur <strong>Wiederherstellung der Dichtung</strong> einer teuren Uhr.</p>
                <p class="about-body"><strong>Was ändert sich gegenüber der Sensor-TattooFix-Linse?</strong> Die Sensor-CrashFix-Linse ist <strong>größer</strong>: Sie reicht über das Sensorglas hinaus, um <strong>über den Rand hinaus abzudichten</strong> — bei Rissen bis zum Sensorrand. Sensor TattooFix deckt den Lesebereich ab; Sensor CrashFix muss weiter gehen, um diese Rand-zu-Rand-Risse neu abzudichten.</p>
                <h3 class="about-story-heading" hidden>Patente</h3>
                <p class="about-body">Die optische Linse und die Haftungstechnologie sind registriert, um die Authentizität in Brasilien und im Ausland zu schützen:</p>
                <div class="about-patents" hidden aria-label="Patenteintragungen">
                    <div class="about-patent">
                        <i class="fas fa-award" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Nationales Patent · INPI</span>
                            <span class="about-patent-num">BR 20 2026 010875 3</span>
                        </div>
                    </div>
                    <div class="about-patent">
                        <i class="fas fa-globe-americas" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Internationales Patent · PCT</span>
                            <span class="about-patent-num">PCT BR 2026 050304</span>
                        </div>
                    </div>
                </div>
                <p class="about-closing">Sensor gerissen? Die Idee ist einfach: <strong>erneut schützen</strong>, abdichten und die Uhr nutzen.</p>
                <div class="about-signature">
                    <img src="../images/home/fundador-fabio.jpg?v=crash6" alt="Fábio Nardoni, Gründer von Sensor CrashFix" class="about-signature-photo" width="112" height="112" loading="lazy" decoding="async">
                    <div class="about-signature-text">
                        <p class="about-signature-name">Fábio Nardoni</p>
                        <p class="about-signature-role">Gründer · Sensor CrashFix · 3N20</p>
                    </div>
                </div>
            </div>
        </div>
    </section>""",
    "es": """<section id="quem-somos" class="content-section grey-bg">
        <div class="container about-section">
            <h2 class="section-title">Quiénes somos</h2>
                        <div class="about-card about-card--story">
                <p class="about-origin"><strong>Sensor CrashFix</strong> nació de <a href="https://www.sensortattoofix.com/es/" data-sister-link data-evento="clique_sister_tattoofix" data-rotulo="About Sensor TattooFix ES" target="_blank" rel="noopener noreferrer"><strong>Sensor TattooFix</strong></a> — el producto para devolver las funciones del smartwatch en <strong>piel tatuada</strong>.</p>
                <p class="about-body">Los sensores ópticos de smartwatch a menudo <strong>no leen bien en piel tatuada</strong>. Sensor TattooFix desarrolló una lente graduada, con material específico por modelo, que restaura las funciones del reloj en ese caso.</p>
                <p class="about-body">Algunas personas empezaron a comprar la lente Sensor TattooFix <strong>incluso sin tatuaje</strong> — para sensores <strong>dañados / agrietados</strong>. En muchos casos el sensor volvía a funcionar y el reloj quedaba impermeable otra vez.</p>
                <h3 class="about-story-heading">Así nació Sensor CrashFix</h3>
                <p class="about-body">Por eso creamos <strong>Sensor CrashFix</strong>: un “primo” de Sensor TattooFix — no solo para restaurar la lectura de un sensor agrietado, sino también para <strong>restaurar el sellado</strong> de un reloj caro.</p>
                <p class="about-body"><strong>¿Qué cambia frente a la lente Sensor TattooFix?</strong> La lente Sensor CrashFix es <strong>más grande</strong>: se extiende más allá del cristal del sensor para <strong>sellar más allá del borde</strong> — en grietas que llegan al borde del sensor. Sensor TattooFix cubre el área de lectura; Sensor CrashFix debe ir más lejos para volver a sellar esas grietas de borde a borde.</p>
                <h3 class="about-story-heading" hidden>Patentes</h3>
                <p class="about-body">La tecnología de lente óptica y adhesión está registrada para proteger la autenticidad en Brasil y en el exterior:</p>
                <div class="about-patents" hidden aria-label="Registros de patente">
                    <div class="about-patent">
                        <i class="fas fa-award" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Patente nacional · INPI</span>
                            <span class="about-patent-num">BR 20 2026 010875 3</span>
                        </div>
                    </div>
                    <div class="about-patent">
                        <i class="fas fa-globe-americas" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Patente internacional · PCT</span>
                            <span class="about-patent-num">PCT BR 2026 050304</span>
                        </div>
                    </div>
                </div>
                <p class="about-closing">¿Sensor agrietado? La idea es simple: <strong>proteger de nuevo</strong>, sellar y usar el reloj.</p>
                <div class="about-signature">
                    <img src="../images/home/fundador-fabio.jpg?v=crash6" alt="Fábio Nardoni, fundador de Sensor CrashFix" class="about-signature-photo" width="112" height="112" loading="lazy" decoding="async">
                    <div class="about-signature-text">
                        <p class="about-signature-name">Fábio Nardoni</p>
                        <p class="about-signature-role">Fundador · Sensor CrashFix · 3N20</p>
                    </div>
                </div>
            </div>
        </div>
    </section>""",
    "pl": """<section id="quem-somos" class="content-section grey-bg">
        <div class="container about-section">
            <h2 class="section-title">O nas</h2>
                        <div class="about-card about-card--story">
                <p class="about-origin"><strong>Sensor CrashFix</strong> powstał z <a href="https://www.sensortattoofix.com/" data-sister-link data-evento="clique_sister_tattoofix" data-rotulo="About Sensor TattooFix PL" target="_blank" rel="noopener noreferrer"><strong>Sensor TattooFix</strong></a> — produktu przywracającego funkcje smartwatcha na <strong>wytatuowanej skórze</strong>.</p>
                <p class="about-body">Optyczne czujniki smartwatchy często <strong>źle odczytują wytatuowaną skórę</strong>. Sensor TattooFix opracował soczewkę gradacyjną, z materiałem dopasowanym do modelu, która przywraca funkcje zegarka w tym przypadku.</p>
                <p class="about-body">Niektórzy zaczęli kupować soczewkę Sensor TattooFix <strong>nawet bez tatuażu</strong> — na <strong>uszkodzone / pęknięte</strong> czujniki. W wielu przypadkach czujnik znów działał, a zegarek znów był wodoodporny.</p>
                <h3 class="about-story-heading">Tak powstał Sensor CrashFix</h3>
                <p class="about-body">Dlatego stworzyliśmy <strong>Sensor CrashFix</strong>: „kuzyna” Sensor TattooFix — nie tylko do przywrócenia odczytu na pękniętym czujniku, ale też do <strong>przywrócenia uszczelnienia</strong> drogiego zegarka.</p>
                <p class="about-body"><strong>Co się zmienia względem soczewki Sensor TattooFix?</strong> Soczewka Sensor CrashFix jest <strong>większa</strong>: wychodzi poza szkło czujnika, by <strong>uszczelnić poza krawędzią</strong> — przy pęknięciach sięgających krawędzi czujnika. Sensor TattooFix pokrywa obszar odczytu; Sensor CrashFix musi iść dalej, by ponownie uszczelnić te pęknięcia od krawędzi do krawędzi.</p>
                <h3 class="about-story-heading" hidden>Patenty</h3>
                <p class="about-body">Technologia soczewki optycznej i adhezji jest zarejestrowana, by chronić autentyczność w Brazylii i za granicą:</p>
                <div class="about-patents" hidden aria-label="Rejestracje patentowe">
                    <div class="about-patent">
                        <i class="fas fa-award" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Patent krajowy · INPI</span>
                            <span class="about-patent-num">BR 20 2026 010875 3</span>
                        </div>
                    </div>
                    <div class="about-patent">
                        <i class="fas fa-globe-americas" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Patent międzynarodowy · PCT</span>
                            <span class="about-patent-num">PCT BR 2026 050304</span>
                        </div>
                    </div>
                </div>
                <p class="about-closing">Pęknięty czujnik? Idea jest prosta: <strong>ochronić ponownie</strong>, uszczelnić i używać zegarka.</p>
                <div class="about-signature">
                    <img src="../images/home/fundador-fabio.jpg?v=crash6" alt="Fábio Nardoni, założyciel Sensor CrashFix" class="about-signature-photo" width="112" height="112" loading="lazy" decoding="async">
                    <div class="about-signature-text">
                        <p class="about-signature-name">Fábio Nardoni</p>
                        <p class="about-signature-role">Założyciel · Sensor CrashFix · 3N20</p>
                    </div>
                </div>
            </div>
        </div>
    </section>""",
    "sl": """<section id="quem-somos" class="content-section grey-bg">
        <div class="container about-section">
            <h2 class="section-title">O nas</h2>
                        <div class="about-card about-card--story">
                <p class="about-origin"><strong>Sensor CrashFix</strong> je nastal iz <a href="https://www.sensortattoofix.com/" data-sister-link data-evento="clique_sister_tattoofix" data-rotulo="About Sensor TattooFix SL" target="_blank" rel="noopener noreferrer"><strong>Sensor TattooFix</strong></a> — izdelka, ki pametni uri vrne delovanje na <strong>tetovirani koži</strong>.</p>
                <p class="about-body">Optična tipala pametnih ur <strong>pogosto slabo berejo na tetovirani koži</strong>. Sensor TattooFix je razvil graduirano lečo z materialom po modelu, ki v tem primeru obnovi funkcije ure.</p>
                <p class="about-body">Nekateri so lečo Sensor TattooFix začeli kupovati <strong>tudi brez tetovaže</strong> — za <strong>poškodovana / počena</strong> tipala. V mnogih primerih je tipalo spet delovalo in ura je bila znova vodoodporna.</p>
                <h3 class="about-story-heading">Tako je nastal Sensor CrashFix</h3>
                <p class="about-body">Zato smo ustvarili <strong>Sensor CrashFix</strong>: »sestrično« Sensor TattooFix — ne le za obnovitev branja na počenem tipalu, temveč tudi za <strong>obnovitev pečatenja</strong> drage ure.</p>
                <p class="about-body"><strong>Kaj se spremeni glede na lečo Sensor TattooFix?</strong> Leča Sensor CrashFix je <strong>večja</strong>: sega čez steklo tipala, da lahko <strong>zatesni onkraj roba</strong> — pri razpokah do roba tipala. Sensor TattooFix pokrije območje branja; Sensor CrashFix mora iti dlje, da znova zatesni te razpoke od roba do roba.</p>
                <h3 class="about-story-heading" hidden>Patenti</h3>
                <p class="about-body">Tehnologija optične leče in oprijema je registrirana za zaščito pristnosti v Braziliji in tujini:</p>
                <div class="about-patents" hidden aria-label="Patentne prijave">
                    <div class="about-patent">
                        <i class="fas fa-award" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Nacionalni patent · INPI</span>
                            <span class="about-patent-num">BR 20 2026 010875 3</span>
                        </div>
                    </div>
                    <div class="about-patent">
                        <i class="fas fa-globe-americas" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Mednarodni patent · PCT</span>
                            <span class="about-patent-num">PCT BR 2026 050304</span>
                        </div>
                    </div>
                </div>
                <p class="about-closing">Počeno tipalo? Ideja je preprosta: <strong>znova zaščititi</strong>, zatesniti in uporabljati uro.</p>
                <div class="about-signature">
                    <img src="../images/home/fundador-fabio.jpg?v=crash6" alt="Fábio Nardoni, ustanovitelj Sensor CrashFix" class="about-signature-photo" width="112" height="112" loading="lazy" decoding="async">
                    <div class="about-signature-text">
                        <p class="about-signature-name">Fábio Nardoni</p>
                        <p class="about-signature-role">Ustanovitelj · Sensor CrashFix · 3N20</p>
                    </div>
                </div>
            </div>
        </div>
    </section>""",
    "it": """<section id="quem-somos" class="content-section grey-bg">
        <div class="container about-section">
            <h2 class="section-title">Chi siamo</h2>
                        <div class="about-card about-card--story">
                <p class="about-origin"><strong>Sensor CrashFix</strong> nasce da <a href="https://www.sensortattoofix.com/it/" data-sister-link data-evento="clique_sister_tattoofix" data-rotulo="Chi siamo Sensor TattooFix IT" target="_blank" rel="noopener noreferrer"><strong>Sensor TattooFix</strong></a> — il prodotto creato per restituire le funzioni degli smartwatch su <strong>pelle tatuata</strong>.</p>
                <p class="about-body">I sensori ottici degli smartwatch spesso <strong>non leggono bene sulla pelle tatuata</strong>. Sensor TattooFix ha sviluppato una lente graduata, con materiale specifico per modello, che ripristina le funzioni dell’orologio in quel caso.</p>
                <p class="about-body">Alcune persone hanno iniziato a comprare la lente Sensor TattooFix <strong>anche senza tatuaggio</strong> — per sensori <strong>danneggiati / incrinati</strong>. In molti casi il sensore tornava a funzionare e l’orologio tornava impermeabile.</p>
                <h3 class="about-story-heading">Così è nato Sensor CrashFix</h3>
                <p class="about-body">Per questo abbiamo creato <strong>Sensor CrashFix</strong>: un “cugino” di Sensor TattooFix — non solo per ripristinare la lettura su un sensore incrinato, ma anche per <strong>ripristinare la tenuta</strong> di un orologio costoso.</p>
                <p class="about-body"><strong>Cosa cambia rispetto alla lente Sensor TattooFix?</strong> La lente Sensor CrashFix è <strong>più grande</strong>: supera il vetro del sensore per <strong>sigillare oltre il bordo</strong> — per crepe che arrivano al bordo del sensore. Sensor TattooFix copre l’area di lettura; Sensor CrashFix deve andare oltre per risigillare quelle crepe da bordo a bordo.</p>
                <h3 class="about-story-heading" hidden>Brevetti</h3>
                <p class="about-body">La tecnologia di lente ottica e adesione è registrata per proteggere l’autenticità in Brasile e all’estero:</p>
                <div class="about-patents" hidden aria-label="Registrazioni di brevetto">
                    <div class="about-patent">
                        <i class="fas fa-award" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Brevetto nazionale · INPI</span>
                            <span class="about-patent-num">BR 20 2026 010875 3</span>
                        </div>
                    </div>
                    <div class="about-patent">
                        <i class="fas fa-globe-americas" aria-hidden="true"></i>
                        <div>
                            <span class="about-patent-label">Brevetto internazionale · PCT</span>
                            <span class="about-patent-num">PCT BR 2026 050304</span>
                        </div>
                    </div>
                </div>
                <p class="about-closing">Sensore incrinato? L’idea è semplice: <strong>proteggere di nuovo</strong>, risigillare e usare l’orologio.</p>
                <div class="about-signature">
                    <img src="../images/home/fundador-fabio.jpg?v=crash6" alt="Fábio Nardoni, fondatore di Sensor CrashFix" class="about-signature-photo" width="112" height="112" loading="lazy" decoding="async">
                    <div class="about-signature-text">
                        <p class="about-signature-name">Fábio Nardoni</p>
                        <p class="about-signature-role">Fondatore · Sensor CrashFix · 3N20</p>
                    </div>
                </div>
            </div>
        </div>
    </section>""",
}

FAQ_NEW = {
    "fr": {
        "faq-1": {
            "question": "Après la fissure du capteur, ma montre demande sans cesse le code. Pourquoi ?",
            "answer": "Parce que la fissure perturbe la <strong>détection de poignet/bras</strong> : la montre croit qu’elle a été retirée et redemande le code. La lentille Sensor CrashFix <strong>peut</strong> rétablir cette fonction — pas dans tous les cas. Avec le bon diamètre, ça vaut le coup d’essayer.",
        },
        "faq-2": {
            "question": "Après la fissure / la chute, la montre ne mesure plus le rythme cardiaque. Pourquoi ?",
            "answer": "Le capteur optique utilise la lumière. Avec un verre <strong>fissuré</strong>, le signal devient instable ou disparaît. La lentille <strong>peut faire revenir la lecture</strong> — pas une garantie à 100 %, mais l’étape la plus simple avant une réparation coûteuse.",
        },
        "faq-3": {
            "question": "Mon capteur est fissuré et la montre se déconnecte / perd le poignet toute seule. Pourquoi ?",
            "answer": "Sans signal stable, la smartwatch croit qu’elle a <strong>quitté le bras</strong>. La lentille/l’adhésif <strong>peut</strong> restabiliser la détection.",
        },
        "faq-4": {
            "question": "Pourquoi ma montre met-elle les entraînements en pause toute seule avec un capteur fissuré ?",
            "answer": "Parce qu’elle ne calcule plus bien le pouls/poignet et croit que vous avez <strong>interrompu l’entraînement</strong>. La lentille <strong>peut</strong> éviter ces fausses pauses.",
        },
        "faq-5": {
            "question": "Comment la lentille Sensor CrashFix corrige-t-elle le capteur ?",
            "answer": "Comme une <strong>lentille de remplacement</strong> : un couvercle optique adhésif placé <strong>par-dessus</strong> le capteur fissuré. Elle reseal, protège le verre et, dans de nombreux cas, restaure la lecture optique — sans ouvrir la montre.",
        },
        "faq-6": {
            "question": "Ça marche sur Apple Watch ?",
            "answer": "Oui. Ça fonctionne sur <strong>toutes les smartwatches</strong> avec capteur optique — Apple Watch inclus. Ce qui change, c’est le <strong>diamètre (mm)</strong>.",
        },
        "faq-7": {
            "question": "Ça marche sur Samsung Galaxy Watch ?",
            "answer": "Oui. Ça fonctionne sur <strong>toutes les smartwatches</strong> — Galaxy Watch/Ultra et autres marques. Choisissez les <strong>mm</strong> dans la boutique.",
        },
        "faq-8": {
            "question": "La lentille restaure-t-elle l’étanchéité ?",
            "answer": "Oui, c’est un objectif principal : couvrir la fissure et <strong>resealer</strong> pour la sueur, la pluie, le lavage des mains et la natation légère.",
        },
        "faq-9": {
            "question": "Comment installer la lentille ?",
            "answer": "Nettoyez le capteur, retirez le film de l’adhésif, centrez la lentille et appuyez ~30 secondes — <strong>par-dessus</strong> le verre fissuré, sans ouvrir la montre.",
        },
        "faq-10": {
            "question": "La lentille gêne-t-elle la charge ?",
            "answer": "Non. Ultra-fine — vous chargez normalement <strong>avec la lentille en place</strong>.",
        },
        "faq-11": {
            "question": "La lentille Sensor CrashFix corrige-t-elle un capteur qui échoue sur peau tatouée ?",
            "answer": "Non — <strong>Sensor CrashFix</strong> est pour un capteur <strong>fissuré/cassé</strong>. Si la montre échoue sur un <strong>tatouage</strong> (pas de pouls, entraînements en pause, code permanent), il existe <strong>Sensor TattooFix</strong>.",
        },
    },
    "no": {
        "faq-1": {
            "question": "Etter at sensoren sprakk, ber klokken stadig om kode. Hvorfor?",
            "answer": "Fordi sprekken forstyrrer <strong>håndledds-/armgjenkjenning</strong>: klokken tror den er tatt av og ber om kode igjen. Sensor CrashFix-linsen <strong>kan</strong> gjenopprette funksjonen — men ikke alltid. Med riktig diameter er det verdt å prøve.",
        },
        "faq-2": {
            "question": "Etter sprekk / fall måler klokken ikke lenger puls. Hvorfor?",
            "answer": "Den optiske sensoren bruker lys. Med <strong>sprukket</strong> glass blir signalet ustabilt eller forsvinner. Linsen <strong>kan bringe avlesningen tilbake</strong> — ingen 100 % garanti, men det enkleste steget før dyr reparasjon.",
        },
        "faq-3": {
            "question": "Sensoren er sprukket og klokken kobler fra / mister håndleddet av seg selv. Hvorfor?",
            "answer": "Uten stabilt sensorsignal tror smartklokken at den <strong>forlot armen</strong>. Linsen/limet <strong>kan</strong> stabilisere gjenkjenningen igjen.",
        },
        "faq-4": {
            "question": "Hvorfor pauser klokken treninger av seg selv med sprukket sensor?",
            "answer": "Fordi den ikke beregner puls/håndledd godt, og systemet tror du <strong>avbrøt treningen</strong>. Linsen <strong>kan</strong> unngå falske pauser.",
        },
        "faq-5": {
            "question": "Hvordan fikser Sensor CrashFix-linsen sensoren?",
            "answer": "Som en <strong>erstatningslinse</strong>: et limt optisk deksel <strong>oppå</strong> den sprukne sensoren. Den forsegler på nytt, beskytter glasset og gjenoppretter ofte optisk avlesning — uten å åpne klokken.",
        },
        "faq-6": {
            "question": "Fungerer det på Apple Watch?",
            "answer": "Ja. Det fungerer på <strong>alle smartklokker</strong> med optisk sensor — inkludert Apple Watch. Det som endres er <strong>diameter (mm)</strong>.",
        },
        "faq-7": {
            "question": "Fungerer det på Samsung Galaxy Watch?",
            "answer": "Ja. Det fungerer på <strong>alle smartklokker</strong> — Galaxy Watch/Ultra og andre merker. Velg riktige <strong>mm</strong> i butikken.",
        },
        "faq-8": {
            "question": "Gjenoppretter linsen vanntetthet?",
            "answer": "Ja, et hovedmål: dekke sprekken og <strong>forsegle på nytt</strong> for svette, regn, håndvask og lett svømming.",
        },
        "faq-9": {
            "question": "Hvordan monterer jeg linsen?",
            "answer": "Rens sensoren, fjern limfolien, sentrer linsen og trykk ~30 sekunder — <strong>oppå</strong> sprukket glass, uten å åpne klokken.",
        },
        "faq-10": {
            "question": "Forstyrrer linsen lading?",
            "answer": "Nei. Ultratykk — du lader normalt <strong>med linsen på</strong>.",
        },
        "faq-11": {
            "question": "Fikser Sensor CrashFix-linsen en sensor som feiler på tatovert hud?",
            "answer": "Nei — <strong>Sensor CrashFix</strong> er for <strong>sprukket/ødelagt sensor</strong>. Hvis klokken feiler på <strong>tatovering</strong> (ingen puls, pauset trening, stadig kode), finnes <strong>Sensor TattooFix</strong>.",
        },
    },
    "sv": {
        "faq-1": {
            "question": "Efter att sensorn sprack ber klockan ständigt om kod. Varför?",
            "answer": "För att sprickan stör <strong>handleds-/armigenkänning</strong>: klockan tror att den tagits av och ber om kod igen. Sensor CrashFix-linsen <strong>kan</strong> återställa funktionen — men inte alltid. Med rätt diameter är det värt att försöka.",
        },
        "faq-2": {
            "question": "Efter spricka / fall mäter klockan inte längre puls. Varför?",
            "answer": "Den optiska sensorn använder ljus. Med <strong>sprucket</strong> glas blir signalen ostabil eller försvinner. Linsen <strong>kan få avläsningen tillbaka</strong> — ingen 100 % garanti, men det enklaste steget före dyr reparation.",
        },
        "faq-3": {
            "question": "Sensorn är sprucken och klockan kopplar från / tappar handleden av sig själv. Varför?",
            "answer": "Utan stabil sensorsignal tror smartklockan att den <strong>lämnat armen</strong>. Linsen/limmet <strong>kan</strong> stabilisera igenkänningen igen.",
        },
        "faq-4": {
            "question": "Varför pausar klockan träningspass av sig själv med sprucken sensor?",
            "answer": "För att den inte beräknar puls/handled bra, så systemet tror att du <strong>avbröt träningen</strong>. Linsen <strong>kan</strong> undvika falska pauser.",
        },
        "faq-5": {
            "question": "Hur fixar Sensor CrashFix-linsen sensorn?",
            "answer": "Som en <strong>ersättningslins</strong>: ett limmat optiskt skydd <strong>ovanpå</strong> den spruckna sensorn. Den tätar igen, skyddar glaset och återställer ofta optisk avläsning — utan att öppna klockan.",
        },
        "faq-6": {
            "question": "Fungerar det på Apple Watch?",
            "answer": "Ja. Det fungerar på <strong>alla smartklockor</strong> med optisk sensor — inklusive Apple Watch. Det som ändras är <strong>diametern (mm)</strong>.",
        },
        "faq-7": {
            "question": "Fungerar det på Samsung Galaxy Watch?",
            "answer": "Ja. Det fungerar på <strong>alla smartklockor</strong> — Galaxy Watch/Ultra och andra märken. Välj rätt <strong>mm</strong> i butiken.",
        },
        "faq-8": {
            "question": "Återställer linsen vattentätheten?",
            "answer": "Ja, ett huvudmål: täcka sprickan och <strong>täta igen</strong> för svett, regn, handtvätt och lätt simning.",
        },
        "faq-9": {
            "question": "Hur installerar jag linsen?",
            "answer": "Rengör sensorn, ta bort limfilmen, centrera linsen och tryck ~30 sekunder — <strong>ovanpå</strong> sprucket glas, utan att öppna klockan.",
        },
        "faq-10": {
            "question": "Stör linsen laddningen?",
            "answer": "Nej. Ultratunn — du laddar normalt <strong>med linsen på</strong>.",
        },
        "faq-11": {
            "question": "Fixar Sensor CrashFix-linsen en sensor som failar på tatuerad hud?",
            "answer": "Nej — <strong>Sensor CrashFix</strong> är för <strong>sprucken/trasig sensor</strong>. Om klockan failar på <strong>tatuering</strong> (ingen puls, pausad träning, ständig kod) finns <strong>Sensor TattooFix</strong>.",
        },
    },
    "nl": {
        "faq-1": {
            "question": "Na de gebarsten sensor vraagt mijn horloge steeds om de code. Waarom?",
            "answer": "Omdat de barst de <strong>pols-/armdetectie</strong> verstoort: het horloge denkt dat het is afgedaan en vraagt opnieuw om de code. De Sensor CrashFix-lens <strong>kan</strong> die functie herstellen — niet in elk geval. Met de juiste diameter is het de moeite waard.",
        },
        "faq-2": {
            "question": "Na de barst / val meet het horloge geen hartslag meer. Waarom?",
            "answer": "De optische sensor gebruikt licht. Met <strong>gebarsten</strong> glas wordt het signaal onstabiel of verdwijnt. De lens <strong>kan de meting terugbrengen</strong> — geen 100 % garantie, maar de eenvoudigste stap vóór dure reparatie.",
        },
        "faq-3": {
            "question": "Mijn sensor is gebarsten en het horloge koppelt los / verliest de pols vanzelf. Waarom?",
            "answer": "Zonder stabiel sensorsignaal denkt de smartwatch dat hij <strong>de arm heeft verlaten</strong>. De lens/lijm <strong>kan</strong> de detectie opnieuw stabiliseren.",
        },
        "faq-4": {
            "question": "Waarom pauzeert mijn horloge trainingen vanzelf bij een gebarsten sensor?",
            "answer": "Omdat het horloge pols/hartslag niet goed meet en denkt dat je de training <strong>hebt onderbroken</strong>. De lens <strong>kan</strong> valse pauzes voorkomen.",
        },
        "faq-5": {
            "question": "Hoe herstelt de Sensor CrashFix-lens de sensor?",
            "answer": "Als een <strong>vervanglens</strong>: een klevende optische afdekking <strong>bovenop</strong> de gebarsten sensor. Hij dicht opnieuw af, beschermt het glas en herstelt in veel gevallen de optische meting — zonder het horloge te openen.",
        },
        "faq-6": {
            "question": "Werkt het op Apple Watch?",
            "answer": "Ja. Het werkt op <strong>alle smartwatches</strong> met optische sensor — inclusief Apple Watch. Wat verandert is de <strong>diameter (mm)</strong>.",
        },
        "faq-7": {
            "question": "Werkt het op Samsung Galaxy Watch?",
            "answer": "Ja. Het werkt op <strong>alle smartwatches</strong> — Galaxy Watch/Ultra en andere merken. Kies de juiste <strong>mm</strong> in de winkel.",
        },
        "faq-8": {
            "question": "Herstelt de lens de waterdichtheid?",
            "answer": "Ja, een hoofddoel: de barst bedekken en <strong>opnieuw afdichten</strong> voor zweet, regen, handen wassen en licht zwemmen.",
        },
        "faq-9": {
            "question": "Hoe installeer ik de lens?",
            "answer": "Reinig de sensor, verwijder de lijmfolie, centreer de lens en druk ~30 seconden — <strong>bovenop</strong> het gebarsten glas, zonder het horloge te openen.",
        },
        "faq-10": {
            "question": "Stoort de lens het opladen?",
            "answer": "Nee. Ultradun — je laadt normaal <strong>met de lens erop</strong>.",
        },
        "faq-11": {
            "question": "Lost de Sensor CrashFix-lens een sensor op die faalt op getatoeëerde huid?",
            "answer": "Nee — <strong>Sensor CrashFix</strong> is voor een <strong>gebarsten/kapotte sensor</strong>. Als het horloge faalt op een <strong>tatoeage</strong> (geen hartslag, gepauzeerde training, constante code), bestaat <strong>Sensor TattooFix</strong>.",
        },
    },
}

FAQ_11_EXISTING = {
    "de": {
        "question": "Behebt die Sensor-CrashFix-Linse einen Sensor, der auf tätowierter Haut versagt?",
        "answer": "Nein — <strong>Sensor CrashFix</strong> ist für einen <strong>gerissenem/beschädigten Sensor</strong>. Wenn die Uhr auf einem <strong>Tattoo</strong> versagt (kein Puls, pausiertes Training, ständiger Code), gibt es <strong>Sensor TattooFix</strong>.",
    },
    "es": {
        "question": "¿La lente Sensor CrashFix corrige un sensor que falla en piel tatuada?",
        "answer": "No — <strong>Sensor CrashFix</strong> es para un sensor <strong>agrietado/roto</strong>. Si el reloj falla con un <strong>tatuaje</strong> (sin pulso, entrenamientos en pausa, código constante), existe <strong>Sensor TattooFix</strong>.",
    },
    "pl": {
        "question": "Czy soczewka Sensor CrashFix naprawia czujnik, który zawodzi na wytatuowanej skórze?",
        "answer": "Nie — <strong>Sensor CrashFix</strong> jest do <strong>pękniętego/uszkodzonego czujnika</strong>. Jeśli zegarek zawodzi na <strong>tatuażu</strong> (brak tętna, pauza treningu, ciągły kod), jest <strong>Sensor TattooFix</strong>.",
    },
    "sl": {
        "question": "Ali leča Sensor CrashFix popravi tipalo, ki odpove na tetovirani koži?",
        "answer": "Ne — <strong>Sensor CrashFix</strong> je za <strong>počeno/poškodovano tipalo</strong>. Če ura odpove na <strong>tetovaži</strong> (brez utripa, ustavljena vadba, nenehna koda), obstaja <strong>Sensor TattooFix</strong>.",
    },
}


def main() -> None:
    # 1) Replace quem-somos
    for lang, html in ABOUT.items():
        path = ROOT / lang / "index.html"
        text = path.read_text(encoding="utf-8")
        new, n = re.subn(r"<section id=\"quem-somos\"[\s\S]*?</section>", html, text, count=1)
        assert n == 1, lang
        path.write_text(new, encoding="utf-8")
        print("about", lang)

    # 2) FAQ l10n
    l10n_path = ROOT / "data" / "home-content-l10n.json"
    l10n = json.loads(l10n_path.read_text(encoding="utf-8"))
    for lang, faqs in FAQ_NEW.items():
        l10n[lang] = {"reviewsSummary": "", "faq": faqs, "reviews": {}}
        print("faq new", lang, len(faqs))
    for lang, faq11 in FAQ_11_EXISTING.items():
        l10n.setdefault(lang, {}).setdefault("faq", {})["faq-11"] = faq11
        print("faq-11", lang)
    l10n_path.write_text(json.dumps(l10n, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    # 3) home-content.js wiring
    hc = ROOT / "js" / "home-content.js"
    t = hc.read_text(encoding="utf-8")
    t = t.replace(
        "if (!l10nCache || !['de', 'es', 'pl', 'sl'].includes(lang)) return '';",
        "if (!l10nCache || !['de', 'es', 'pl', 'sl', 'fr', 'no', 'sv', 'nl'].includes(lang)) return '';",
    )
    t = t.replace(
        "if (['de', 'es', 'pl', 'sl'].includes(lang)) await loadL10n();",
        "if (['de', 'es', 'pl', 'sl', 'fr', 'no', 'sv', 'nl'].includes(lang)) await loadL10n();",
    )
    t = t.replace(
        "const res = await fetch('/data/home-content-l10n.json?v=2', { cache: 'no-store' });",
        "const res = await fetch('/data/home-content-l10n.json?v=3', { cache: 'no-store' });",
    )
    # fix NO typo Ultratykk left in FAQ answer if any — already Ultratynn in about; FAQ says Ultratykk by mistake
    t = t.replace(
        "Renderiza FAQ e elogios da home a partir de store-config (PT / EN / IT / DE / ES / PL).",
        "Renderiza FAQ e elogios da home a partir de store-config (PT / EN / IT / DE / ES / PL / SL / FR / NO / SV / NL).",
    )
    hc.write_text(t, encoding="utf-8")
    print("home-content.js updated")

    # Fix NO FAQ typo Ultratykk -> Ultratynn in json
    l10n = json.loads(l10n_path.read_text(encoding="utf-8"))
    a = l10n["no"]["faq"]["faq-10"]["answer"]
    l10n["no"]["faq"]["faq-10"]["answer"] = a.replace("Ultratykk", "Ultratynn")
    l10n_path.write_text(json.dumps(l10n, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
