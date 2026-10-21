import { useState, useRef, useEffect } from "react";
import Markdown, { tillText } from "./Markdown.jsx";

// ─── LGRSÄR22 KURSPLANKOPPLINGAR ─────────────────────────────────────────────
const LGRSÄR22 = {
  "Svenska": { kort: "Eleven ska utveckla förmåga att kommunicera i tal och skrift och möta olika typer av texter.", citat: "Lgrsär22, Svenska: 'Undervisningen ska stimulera elevernas intresse för att läsa och skriva och ge dem möjlighet att kommunicera på ett för dem funktionellt sätt.'" },
  "Matematik": { kort: "Eleven ska utveckla förmåga att använda matematik för att beskriva och lösa problem i vardagen.", citat: "Lgrsär22, Matematik: 'Undervisningen ska bidra till att eleverna utvecklar förståelse för matematik och dess användning i vardagen och i andra skolämnen.'" },
  "NO": { kort: "Eleven ska utveckla kunskaper om naturen och enkla naturvetenskapliga samband kopplade till vardagen.", citat: "Lgrsär22, NO: 'Undervisningen ska ge eleverna möjlighet att ställa frågor om naturen och människan utifrån egna upplevelser.'" },
  "SO": { kort: "Eleven ska utveckla kunskaper om samhälle, historia och hur människor lever och samarbetar.", citat: "Lgrsär22, SO: 'Undervisningen ska ge eleverna förutsättningar att utveckla kunskaper om historiska sammanhang och hur samhällen är organiserade.'" },
  "Biologi": { kort: "Eleven ska utveckla kunskaper om kroppen, naturen och levande organismers livsvillkor.", citat: "Lgrsär22, Biologi: 'Undervisningen ska ge eleverna förutsättningar att söka svar på frågor om naturen och levande varelsers livsvillkor.'" },
  "Fysik": { kort: "Eleven ska utveckla kunskaper om enkla fysikaliska fenomen och deras betydelse i vardagen.", citat: "Lgrsär22, Fysik: 'Undervisningen ska ge eleverna möjligheter att använda och utveckla kunskaper om fysikaliska fenomen i vardagliga sammanhang.'" },
  "Kemi": { kort: "Eleven ska utveckla kunskaper om ämnen och material i vardagen och enkla kemiska samband.", citat: "Lgrsär22, Kemi: 'Undervisningen ska ge eleverna förutsättningar att använda kemins begrepp för att beskriva vardagliga företeelser.'" },
  "Historia": { kort: "Eleven ska utveckla kunskaper om historiska händelser och hur de påverkar vår vardag idag.", citat: "Lgrsär22, Historia: 'Undervisningen ska ge eleverna förutsättningar att tillägna sig en historisk referensram anpassad till deras förutsättningar.'" },
  "Geografi": { kort: "Eleven ska utveckla kunskaper om platser, natur och hur människor lever på olika ställen i världen.", citat: "Lgrsär22, Geografi: 'Undervisningen ska ge eleverna kunskap om geografiska förhållanden och verktyg för att förstå omvärlden.'" },
  "Religionskunskap": { kort: "Eleven ska utveckla kunskaper om religioner, traditioner och etiska frågor i vardagen.", citat: "Lgrsär22, Religionskunskap: 'Undervisningen ska ge eleverna förutsättningar att kunna reflektera över etiska och existentiella frågor.'" },
  "Samhällskunskap": { kort: "Eleven ska utveckla förståelse för hur samhället fungerar och vad demokrati innebär i vardagen.", citat: "Lgrsär22, Samhällskunskap: 'Undervisningen ska ge eleverna verktyg att förstå hur demokratiska processer fungerar och påverkar deras vardag.'" },
  "Engelska": { kort: "Eleven ska utveckla förmåga att förstå och använda enkla fraser och ord på engelska.", citat: "Lgrsär22, Engelska: 'Undervisningen ska ge eleverna möjlighet att kommunicera på engelska i enkla och för dem välkända situationer.'" },
  "Bild": { kort: "Eleven ska utveckla förmåga att kommunicera och skapa med bild som verktyg.", citat: "Lgrsär22, Bild: 'Undervisningen ska ge eleverna förutsättningar att utveckla sitt bildspråk och förmåga att kommunicera med bilder.'" },
  "Musik": { kort: "Eleven ska delta i musicerande och uppleva musik som ett kommunikativt och estetiskt uttryck.", citat: "Lgrsär22, Musik: 'Undervisningen ska ge eleverna möjlighet att uppleva och kommunicera med musik som estetiskt uttryckssätt.'" },
  "Idrott och hälsa": { kort: "Eleven ska röra sig, delta i lekar och förstå sambandet mellan rörelse och välmående.", citat: "Lgrsär22, Idrott och hälsa: 'Undervisningen ska ge eleverna förutsättningar att röra sig allsidigt och få en förståelse för hur livsstilsval påverkar hälsan.'" },
  "Slöjd": { kort: "Eleven ska utveckla förmåga att framställa föremål och träna finmotorik och planering.", citat: "Lgrsär22, Slöjd: 'Undervisningen ska ge eleverna möjlighet att arbeta med olika material och tekniker och utveckla sin kreativitet.'" },
  "Hem- och konsumentkunskap": { kort: "Eleven ska utveckla förmåga att klara vardagliga uppgifter i hemmet och göra enkla val som konsument.", citat: "Lgrsär22, Hem- och konsumentkunskap: 'Undervisningen ska ge eleverna förutsättningar att sköta ett hem och göra välgrundade val i vardagen.'" },
  "Kommunikation": { kort: "Eleven ska utveckla förmåga att kommunicera med omgivningen med olika verktyg och uttryckssätt.", citat: "Lgrsär22, Ämnesområde Kommunikation: 'Undervisningen ska ge eleverna förutsättningar att kommunicera med sin omgivning och delta i socialt samspel.'" },
  "Motorik": { kort: "Eleven ska utveckla grov- och finmotorik och förmåga att använda sin kropp i olika situationer.", citat: "Lgrsär22, Ämnesområde Motorik: 'Undervisningen ska ge eleverna möjlighet att utveckla kroppskännedom och motoriska förmågor i meningsfulla sammanhang.'" },
  "Vardagsaktiviteter": { kort: "Eleven ska utveckla förmåga att klara dagliga rutiner och aktiviteter så självständigt som möjligt.", citat: "Lgrsär22, Ämnesområde Vardagsaktiviteter: 'Undervisningen ska ge eleverna förutsättningar att utföra vardagliga aktiviteter och öka sin självständighet.'" },
  "Verklighetsuppfattning": { kort: "Eleven ska utveckla förståelse för tid, rum och omvärlden utifrån sina egna förutsättningar.", citat: "Lgrsär22, Ämnesområde Verklighetsuppfattning: 'Undervisningen ska ge eleverna möjlighet att orientera sig i tid och rum och skapa förståelse för omvärlden.'" },
  "Estetisk verksamhet": { kort: "Eleven ska delta i skapande aktiviteter och uppleva estetiska uttrycksformer som kommunikation.", citat: "Lgrsär22, Ämnesområde Estetisk verksamhet: 'Undervisningen ska ge eleverna möjlighet att uppleva och uttrycka sig genom estetiska uttrycksformer.'" },
};

// ─── ÄMNESDATA ────────────────────────────────────────────────────────────────
const AMNEN = {
  "Ämnen (Lgrsär22)": {
    "Svenska": { "Läsning och förståelse": ["Läsa enkla ord och meningar","Läsförståelse med bildstöd","Läsa och återberätta","Faktatexter på enkel nivå","Lässtrategier med stöd"], "Skrivning och kommunikation": ["Skriva sitt namn","Skriva enkla meningar","Digitalt skrivande","Kommunicera med text och bild","Använda tangentbord och surfplatta"], "Tala och lyssna": ["Berätta om sig själv","Lyssna och följa instruktioner","Samtala i grupp","Använda AKK i samtal","Ställa och svara på frågor"] },
    "Matematik": { "Tal och räkning": ["Räkna 1–10","Räkna 1–20","Addition med konkret material","Subtraktion med konkret material","Pengar och betalning i vardagen"], "Mätning och tid": ["Klockan – hel och halv","Dagar och veckor","Mäta längd med linjal","Väga föremål","Kalender och planering"], "Geometri och mönster": ["Känna igen former","Sortera och kategorisera","Enkla mönster","Rumslig förståelse"] },
    "NO": { "Kropp och hälsa": ["Kroppens delar","Sunda vanor – mat och sömn","Hygien i vardagen","Känslor och välmående","Kroppen vid rörelse"], "Natur och miljö": ["Årstider","Djur och natur nära oss","Väder och klimat","Källsortering och miljö","Vatten och naturresurser"] },
    "SO": { "Samhälle och vardag": ["Familjen och hemmet","Regler och lagar","Att handla och betala","Kollektivtrafik och samhällsservice","Demokrati på enkel nivå"], "Historia och traditioner": ["Högtider och traditioner","Tid – dåtid och nutid","Hur levde man förr?","Svenska traditioner"] },
    "Engelska": { "Kommunikation": ["Hälsa och presentera sig","Färger och siffror på engelska","Kroppsdelar på engelska","Vardagsfraser","Förstå enkla instruktioner på engelska"], "Ord och fraser": ["Djur på engelska","Mat och dryck på engelska","Kläder på engelska","Siffror 1–20 på engelska","Dagar och månader på engelska"], "Lyssna och förstå": ["Följa enkla instruktioner på engelska","Enkla sånger och ramsor","Titta på korta filmer på engelska","Räkna och benämna på engelska","Förstå och svara på enkla frågor"] },
    "Bild": { "Skapande": ["Rita med olika verktyg","Måla med fingrar och penslar","Collage och klipp-klistra","Digitalt bildskapande","Bild som kommunikation"] },
    "Musik": { "Musicerande": ["Sjunga enkla sånger","Rytm och rörelse","Spela enkla instrument","Lyssna och reagera på musik","Musik och känslor"] },
    "Idrott och hälsa": { "Rörelse och lek": ["Grundrörelser – gå, springa, hoppa","Balans och koordination","Enkla bollövningar","Dans och rörelse till musik","Utomhusaktiviteter"], "Hälsa": ["Vikten av rörelse","Kost och välmående","Vila och återhämtning","Hygien efter rörelse"] },
    "Slöjd": { "Skapande och hantverk": ["Klippa och forma","Sy enkla stygn","Forma med lera","Enkla träarbeten","Planera och göra ett föremål"] },
    "Hem- och konsumentkunskap": { "Mat och hushåll": ["Enkel matlagning","Hygien i köket","Duka och äta","Handla mat","Källsortering hemma"], "Konsument": ["Pengars värde","Handla och betala","Reklam och påverkan"] },
    "Biologi": { "Kropp och natur": ["Kroppens organ – enkelt","Djur och deras ungar","Växter och fotosyntesen enkelt","Ekosystem nära oss"] },
    "Fysik": { "Vardagsfysik": ["Ljus och mörker","Ljud i vardagen","Elektricitet – säkerhet","Enkla maskiner"] },
    "Kemi": { "Ämnen i vardagen": ["Fast, flytande, gas","Blandningar i köket","Säkerhet med kemikalier","Återvinning och material"] },
    "Historia": { "Tid och historia": ["Tidslinjen – dåtid och nutid","Hur levde man förr?","Kända historiska händelser enkelt","Familjehistoria"] },
    "Geografi": { "Platser och kartor": ["Sverige på kartan","Norden – grannländer","Världens kontinenter enkelt","Mitt bostadsområde"] },
    "Religionskunskap": { "Traditioner och etik": ["Högtider i olika religioner","Etik och moral i vardagen","Vad tror människor på?","Empati och medmänsklighet"] },
    "Samhällskunskap": { "Samhälle": ["Demokrati – vad är det?","Regler och lagar","Val och röstning enkelt","Samhällsservice"] },
  },
  "Ämnesområden (Lgrsär22)": {
    "Kommunikation": { "AKK och samtal": ["Använda bildstöd i kommunikation","TAKK – tecken som stöd","Digitala kommunikationshjälpmedel","Initiera och avsluta samtal","Turtagning i samtal"], "Läsa och skriva": ["Ordbilder","Läsa med bildstöd","Skriva med stöd","Digitalt kommunicera","Böcker och berättelser"] },
    "Motorik": { "Grovmotorik": ["Gå, springa, hoppa med stöd","Balans och kroppskännedom","Kasta och fånga","Rörelse till musik","Utomhusaktiviteter"], "Finmotorik": ["Klippa med sax","Forma med lera","Pärla och tråda","Använda bestick","Skriva och rita med stöd"] },
    "Vardagsaktiviteter": { "Personlig omsorg": ["På- och avklädning","Hygien – tvätta händer och tänder","Toalettbesök självständigt","Äta och dricka","Kamning och grooming"], "Hem och hushåll": ["Duka och plocka undan","Enkel matlagning","Källsortering","Handla i butik","Använda hushållsmaskiner"] },
    "Verklighetsuppfattning": { "Tid och rum": ["Dygnet – dag och natt","Veckans dagar","Månader och årstider","Orientera sig i skolan","Karta och rum"], "Omvärlden": ["Mitt hem och min skola","Natur och årstider","Högtider och traditioner","Enkla samhällsfunktioner"] },
    "Estetisk verksamhet": { "Bild och form": ["Rita och måla fritt","Skulptera med lera","Collage","Digitalt skapande","Bild och känsla"], "Musik och rörelse": ["Sjunga och rytm","Dans och rörelselek","Spela enkla instrument","Lyssna och uppleva","Musik och välmående"] },
  },
};

// ─── KONSTANTER ───────────────────────────────────────────────────────────────
const NIVA_LABELS = ["Tidig utvecklingsnivå", "Grundläggande", "Utvecklad"];
const NIVA_FARG = ["#6f5f8f", "#a4533c", "#2f6b5a"]; // Norvays lila, terrakotta och gröna (kontrast minst 4,5:1)
const NIVA_IKONER = ["🌱", "🌿", "🌳"];

const NIVA_BESKRIVNING = {
  "Tidig utvecklingsnivå": "Eleven kommunicerar med kropp, ljud och enkla tecken. Behöver mycket konkret stöd, bildstöd och strukturerade rutiner.",
  "Grundläggande": "Eleven förstår enkla instruktioner och kan delta med stöd. Arbetar med konkret material och korta uppgifter.",
  "Utvecklad": "Eleven kan följa längre instruktioner och genomföra enklare uppgifter mer självständigt med viss stöttning.",
};

const AKK_TIPS = [
  "Använd bildstöd och TAKK (tecken som stöd) för alla instruktioner",
  "Presentera en sak i taget – undvik flera steg simultant",
  "Ge eleven tid att bearbeta – vänta minst 10 sekunder efter en fråga",
  "Använd konkreta föremål och visuella scheman",
  "Bekräfta varje litet steg – positiv förstärkning är avgörande",
];

const FORBEREDELSE_SPECIAL = [
  ["Förbered visuellt schema för lektionen – sätt upp det synligt","Kontrollera att hjälpmedel (surfplatta, kommunikationshjälpmedel) är laddade","Berätta för eleven vad som ska hända: 'Idag ska vi...'"],
  ["Gör en kort inledningsaktivitet som eleven känner igen – skapar trygghet","Visa bildstöd för dagens moment","Säkerställ att eleven är i rätt position och har fokus innan start"],
  ["Koppla lektionen till något eleven känner igen från vardagen","Visa ett konkret föremål eller bild kopplat till momentet","Fråga: 'Har du sett/gjort detta förr?'"],
];

const AVSLUTNING_SPECIAL = [
  ["Sammanfatta lektionen med bildstöd: 'Idag har vi...'","Ge eleven möjlighet att visa/berätta vad de gjort","Förbered övergången: 'Nu är lektionen slut, sedan ska vi...'"],
  ["Dokumentera kort vad eleven klarat – för åtgärdsprogrammet","Exit-signal: eleven ger tumme upp/ner för hur det gick","Positiv avslutning – lyft fram något eleven lyckades med"],
  ["Parvis sammanfattning med stöd: 'Vad minns du?'","Koppla till nästa lektion: 'Nästa gång ska vi fortsätta med...'","Ge eleven möjlighet att välja en avslutningsaktivitet"],
];

const TIPS_SPECIAL = [
  ["Håll lektionen korta och varierade – max 10–15 min per aktivitet","Använd First-Then-schema: 'Först gör vi X, sen får du Y'","Dokumentera framsteg direkt – små steg är stora framgångar"],
  ["Använd alltid konkret material – undvik abstrakta förklaringar","Ge valmöjligheter: 'Vill du göra A eller B?' – ökar delaktighet","Samarbeta med elevens assistent om hur stödet ska ges under lektionen"],
  ["Bygg in rörelsepauser – korta och strukturerade","Använd elevens intressen som ingång till momentet","Fotografera elevens arbete – bra grund för dokumentation och IUP"],
];

// ─── NPF-PROFILER ─────────────────────────────────────────────────────────────
const NPF_PROFILER = [
  { id: "adhd", label: "ADHD / ADD", emoji: "🔵", undertitel: "Uppmärksamhet, impuls", farg: "#1565c0", bgFarg: "#e3f2fd", textFarg: "#0d3a6e" },
  { id: "ast", label: "Autismspektrum (AST)", emoji: "🟡", undertitel: "Struktur, tydlighet", farg: "#f57c00", bgFarg: "#fff8e1", textFarg: "#6d3a00" },
  { id: "dyslexi", label: "Dyslexi", emoji: "🔴", undertitel: "Läsning, skrivning", farg: "#c62828", bgFarg: "#ffebee", textFarg: "#7f0000" },
  { id: "epilepsi", label: "Epilepsi", emoji: "⚡", undertitel: "Anfall, trötthet", farg: "#7b1fa2", bgFarg: "#f3e5f5", textFarg: "#38006b" },
  { id: "rorelsehinder", label: "Rörelsehinder", emoji: "♿", undertitel: "Motorik, tillgänglighet", farg: "#00695c", bgFarg: "#e0f2f1", textFarg: "#003d33" },
  { id: "synnedsattning", label: "Synnedsättning", emoji: "👁️", undertitel: "Visuellt stöd", farg: "#4527a0", bgFarg: "#ede7f6", textFarg: "#1a0050" },
];

// ─── BYGG NPF ─────────────────────────────────────────────────────────────────
function buildNPF(profiles, chapter) {
  const w = chapter ? chapter.split(" ")[0] : "momentet";
  const anpassningar = {};

  if (profiles.includes("adhd")) {
    anpassningar["adhd"] = [
      `Dela upp arbetet med ${w} i bitar om 3–5 minuter med tydliga stopp och rörelsepauser emellan.`,
      `Använd visuell timer – eleven ser hur länge momentet pågår och vad som kommer härnäst.`,
      `Ge en instruktion i taget, skriven och visad med bild. Upprepa lugnt utan att verka irriterad.`,
      `Tillåt rörelse – eleven kan stå vid ett högt bord, sitta på en balansplatta eller sittboll.`,
      `Använd First-Then-kort: 'Först ${w}, sedan paus/favoritaktivitet.'`,
    ];
  }
  if (profiles.includes("ast")) {
    anpassningar["ast"] = [
      `Presentera lektionsstrukturen tydligt med bildschema: steg 1, steg 2, steg 3 – inget oväntat.`,
      `Förvarna om förändringar i god tid – minst 5 minuter innan övergång till nästa aktivitet.`,
      `Koppla ${w} till elevens specialintresse om möjligt – skapar motivation och igenkänning.`,
      `Undvik öppna frågor – ställ konkreta ja/nej-frågor eller välj-frågor: 'Vill du A eller B?'`,
      `Ge skriftliga/bildliga instruktioner som eleven kan återgå till under uppgiften.`,
    ];
  }
  if (profiles.includes("dyslexi")) {
    anpassningar["dyslexi"] = [
      `Minimera all text – använd bilder, symboler och talsyntes istället för skrivna instruktioner.`,
      `Låt eleven visa kunskaper om ${w} muntligt, med bilder eller praktiskt – aldrig bara skriftligt.`,
      `Använd inläsningstjänst eller talsyntes om text inte kan undvikas.`,
      `Ge mer tid och undvik tidpress – eleven bearbetar information i sin egen takt.`,
      `Tydligt typsnitt, stor text, ljus bakgrund och god radavstånd på allt material.`,
    ];
  }
  if (profiles.includes("epilepsi")) {
    anpassningar["epilepsi"] = [
      `Undvik blinkande ljus, snabbt rörliga skärmar och starka kontrastmönster under ${w}.`,
      `Ha en tydlig plan för vad som händer vid ett anfall – informera assistenten och håll lugnet.`,
      `Eleven kan vara trött efter anfall (postiktal fas) – planera lättare aktiviteter och vila.`,
      `Säkerställ att eleven inte sitter/stands i farliga positioner nära hårda kanter eller trappor.`,
      `Dokumentera anfallsmönster och kontakta vårdnadshavare vid förändringar.`,
    ];
  }
  if (profiles.includes("rorelsehinder")) {
    anpassningar["rorelsehinder"] = [
      `Säkerställ att materialet för ${w} är tillgängligt utan att eleven behöver sträcka sig eller förflytta sig onödig.`,
      `Anpassa redskap – tjockare pennor, halkskydd under material, anpassad sax eller grepp.`,
      `Ge extra tid för alla uppgifter som kräver motorik – fokus på process, inte tempo.`,
      `Använd digitala alternativ (surfplatta, ögonstyrning, kontakter) för skrivuppgifter.`,
      `Samarbeta med arbetsterapeut om hjälpmedel och positionering under lektionen.`,
    ];
  }
  if (profiles.includes("synnedsattning")) {
    anpassningar["synnedsattning"] = [
      `Förstora allt material relaterat till ${w} – minst 24pt text och tydliga kontraster.`,
      `Använd taktila material – eleven kan känna och utforska med händerna.`,
      `Beskriv alltid bilder och visuella moment med ord: 'Nu visar jag en bild på...'`,
      `Se till att belysningen är bra och att eleven sitter nära tavlan/skärmen.`,
      `Samarbeta med synpedagog om specifika hjälpmedel och anpassningar.`,
    ];
  }
  return anpassningar;
}

// ─── NPF-KORT ─────────────────────────────────────────────────────────────────
function NPFKort({ profiles, chapter }) {
  const anpassningar = buildNPF(profiles, chapter);
  const aktiva = NPF_PROFILER.filter(p => profiles.includes(p.id));
  if (aktiva.length === 0) return null;
  return (
    <div style={{ background: "var(--sg-vit)", borderRadius: 14, padding: "1.1rem", boxShadow: "0 2px 12px var(--sg-gron-a08)", marginBottom: ".7rem", border: "2px solid var(--sg-lila-yta)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".9rem", paddingBottom: ".7rem", borderBottom: "1px solid var(--sg-lila-yta)" }}>
        <span style={{ fontSize: "1.2rem" }}>🧩</span>
        <div>
          <div style={{ fontFamily: "var(--sg-font)", fontWeight: 700, color: "var(--sg-text)", fontSize: ".95rem" }}>NPF-anpassningar</div>
          <div style={{ fontSize: ".72rem", color: "var(--sg-text-dampad)" }}>{chapter} · {aktiva.length} {aktiva.length === 1 ? "profil" : "profiler"} valda</div>
        </div>
      </div>
      {aktiva.map((profil, idx) => (
        <div key={profil.id} style={{ marginBottom: idx < aktiva.length - 1 ? "1rem" : 0, paddingBottom: idx < aktiva.length - 1 ? "1rem" : 0, borderBottom: idx < aktiva.length - 1 ? "1px solid var(--sg-gron-yta-2)" : "none" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", background: profil.bgFarg, border: `1.5px solid ${profil.farg}`, borderRadius: 50, padding: ".2rem .8rem", marginBottom: ".55rem" }}>
            <span style={{ fontSize: ".85rem" }}>{profil.emoji}</span>
            <span style={{ fontSize: ".78rem", fontWeight: 700, color: profil.textFarg }}>{profil.label}</span>
          </div>
          <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
            {(anpassningar[profil.id] || []).map((punkt, i) => (
              <li key={i} style={{ fontSize: ".8rem", marginBottom: ".3rem", lineHeight: 1.6, color: "var(--sg-text-2)" }}>{punkt}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ─── BYGG RESURSER ────────────────────────────────────────────────────────────
function buildResurser(amne, kapitel) {
  const q = encodeURIComponent(kapitel || amne);
  const qAmne = encodeURIComponent(amne);
  const resurser = [
    {
      kategori: "🎬 Film & video",
      links: [
        { label: `UR Play – "${kapitel}"`, url: `https://urplay.se/search#query=${q}` },
        { label: `YouTube – "${kapitel} grundsärskola"`, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(kapitel + " grundsärskola IF")}` },
      ]
    },
    {
      kategori: "🖼️ Bildstöd & AKK",
      links: [
        { label: `Symbolstöd – Widgit Online`, url: `https://widgitonline.com/` },
        { label: `Bildstöd.se`, url: `https://www.bildstod.se/` },
        { label: `Google Bilder – "${kapitel}"`, url: `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(kapitel + " bildstöd")}` },
      ]
    },
    {
      kategori: "📖 Specialpedagogik & läromedel",
      links: [
        { label: `SPSM – Specialpedagogiska skolmyndigheten`, url: `https://www.spsm.se/` },
        { label: `Skolverket – Lgrsär22`, url: `https://www.skolverket.se/undervisning/grundsarskolan` },
        { label: `Anpassade läromedel – Inläsningstjänst`, url: `https://www.inlasningstjanst.se/` },
      ]
    },
  ];

  if (["Kommunikation", "Svenska"].includes(amne)) {
    resurser.push({
      kategori: "💬 AKK & kommunikationshjälpmedel",
      links: [
        { label: `DART – kommunikation och AKK`, url: `https://www.dart-gbg.org/` },
        { label: `Alternativ kommunikation – SPSM`, url: `https://www.spsm.se/stod/specialpedagogiskt-stod/rad-inom-olika-omraden/alternativ-och-kompletterande-kommunikation/` },
        { label: `LetMeTalk – kommunikationsapp`, url: `https://www.letmetalk.info/` },
      ]
    });
  }

  if (["Motorik", "Idrott och hälsa", "Vardagsaktiviteter"].includes(amne)) {
    resurser.push({
      kategori: "🏃 Rörelse & motorik",
      links: [
        { label: `Rörelsekort – SPSM`, url: `https://www.spsm.se/` },
        { label: `YouTube – rörelselekar grundsärskola`, url: `https://www.youtube.com/results?search_query=${encodeURIComponent("rörelselek grundsärskola IF")}` },
      ]
    });
  }

  if (["Matematik"].includes(amne)) {
    resurser.push({
      kategori: "🔢 Matematik & konkret material",
      links: [
        { label: `Konkret matematik – Nämnarens förlag`, url: `https://www.naemnaren.ncm.se/` },
        { label: `Matematik med bildstöd – YouTube`, url: `https://www.youtube.com/results?search_query=${encodeURIComponent("matematik bildstöd särskola")}` },
      ]
    });
  }

  if (["Hem- och konsumentkunskap", "Vardagsaktiviteter"].includes(amne)) {
    resurser.push({
      kategori: "🏠 Vardagsträning",
      links: [
        { label: `Vardagsträning – SPSM material`, url: `https://www.spsm.se/` },
        { label: `YouTube – vardagsaktiviteter IF`, url: `https://www.youtube.com/results?search_query=${encodeURIComponent("vardagsaktiviteter intellektuell funktionsnedsättning")}` },
      ]
    });
  }

  return resurser;
}

// ─── RESURSER-KORT ────────────────────────────────────────────────────────────
function ResurserKort({ amne, kapitel }) {
  const [open, setOpen] = useState(false);
  const resurser = buildResurser(amne, kapitel);
  const totalLinks = resurser.reduce((s, r) => s + r.links.length, 0);
  return (
    <div style={{ background: "var(--sg-vit)", borderRadius: 10, marginBottom: ".55rem", boxShadow: "0 2px 8px var(--sg-gron-a07)", overflow: "hidden" }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: ".85rem .9rem", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--sg-font)", textAlign: "left" }}>
        <span style={{ display: "flex", alignItems: "center", gap: ".5rem", fontWeight: 700, color: "var(--sg-text)", fontSize: ".85rem" }}>
          🔍 Visa resurser
          <span style={{ background: "var(--sg-gron-yta)", borderRadius: 50, padding: ".1rem .55rem", fontSize: ".7rem", color: "var(--sg-gron)", fontWeight: 700 }}>{totalLinks} länkar</span>
        </span>
        <span style={{ color: "var(--sg-gron)", fontSize: "1rem", transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}>▾</span>
      </button>
      {open && (
        <div style={{ borderTop: "1px solid var(--sg-gron-yta-2)", padding: ".85rem .9rem" }}>
          <p style={{ margin: "0 0 .8rem", fontSize: ".75rem", color: "var(--sg-text-dampad)", fontStyle: "italic" }}>Länkar öppnas i ny flik. Kontrollera att materialet passar eleven.</p>
          {resurser.map((kategori, ki) => (
            <div key={ki} style={{ marginBottom: ki < resurser.length - 1 ? ".85rem" : 0 }}>
              <div style={{ fontSize: ".75rem", fontWeight: 700, color: "var(--sg-gron)", marginBottom: ".35rem" }}>{kategori.kategori}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".3rem" }}>
                {kategori.links.map((link, li) => (
                  <a key={li} href={link.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: ".4rem", background: "var(--sg-gron-yta-3)", border: "1px solid var(--sg-gron-ljus)", borderRadius: 8, padding: ".4rem .7rem", textDecoration: "none", color: "var(--sg-text)", fontSize: ".78rem", transition: "all .15s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--sg-gron-yta)"; e.currentTarget.style.borderColor = "var(--sg-gron)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "var(--sg-gron-yta-3)"; e.currentTarget.style.borderColor = "var(--sg-gron-ljus)"; }}>
                    <span style={{ color: "var(--sg-gron)", fontSize: ".8rem" }}>↗</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── BYGG GENOMGÅNG ───────────────────────────────────────────────────────────
function buildLektion(amnesgrupp, amne, omrade, kapitel, nivaer, v = 0) {
  if (!kapitel || kapitel.trim() === "") kapitel = amne + " – centralt moment";
  const lgrsarObj = LGRSÄR22[amne] || { kort: `Eleven ska utveckla kunskaper inom ${amne} enligt Lgrsär22.`, citat: `Lgrsär22, ${amne}: 'Undervisningen ska ge eleverna förutsättningar att utveckla kunskaper och förmågor inom ämnet.'` };
  const valdaNivaer = NIVA_LABELS.filter(n => nivaer.includes(n));

  const steg = valdaNivaer.map((niva, i) => {
    const moment = niva === "Tidig utvecklingsnivå"
      ? [`Visa ${kapitel} med ett konkret föremål eller tydlig bild – låt eleven titta och känna`, `Namnge det ni ser/gör högt och tydligt – använd TAKK om möjligt`, `Ge eleven möjlighet att reagera på sitt sätt – leende, blick, ljud eller rörelse`]
      : niva === "Grundläggande"
      ? [`Förklara ${kapitel} med enkla ord och visa med konkret material`, `Låt eleven delta aktivt – peka, välj eller gör något konkret kopplat till ${kapitel}`, `Ställ enkla val-frågor: 'Är det här A eller B?' – bekräfta varje svar positivt`]
      : [`Introducera ${kapitel} och koppla till elevens egen erfarenhet`, `Ge eleven en kort uppgift att lösa med stöd – bygg gradvis självständighet`, `Låt eleven berätta eller visa vad de förstår – på sitt sätt`];

    const fraga = niva === "Tidig utvecklingsnivå"
      ? `Kan eleven visa att de uppmärksammar ${kapitel.split(" ")[0]}? (blick, rörelse, ljud)`
      : niva === "Grundläggande"
      ? `"Kan du peka på/visa mig ${kapitel.split(" ")[0]}?"`
      : `"Kan du berätta eller visa vad ${kapitel.split(" ")[0]} är?"`;

    const stod = niva === "Tidig utvecklingsnivå"
      ? "Fysisk guidning, hand-over-hand och tydlig positiv bekräftelse vid minsta reaktion."
      : niva === "Grundläggande"
      ? "Bildstöd, konkret material och enkel-stegs-instruktioner. Ge alltid ett svar att välja bland."
      : "Gradvis minska stödet – börja med mycket och ta bort ett steg i taget när eleven klarar det.";

    return { niva, ikon: NIVA_IKONER[NIVA_LABELS.indexOf(niva)], farg: NIVA_FARG[NIVA_LABELS.indexOf(niva)], moment, fraga, stod };
  });

  return {
    meta: { amnesgrupp, amne, omrade, kapitel, nivaer: valdaNivaer },
    lgrsarKort: lgrsarObj.kort,
    lgrsarCitat: lgrsarObj.citat,
    forberedelse: FORBEREDELSE_SPECIAL[v % 3],
    steg,
    avslutning: AVSLUTNING_SPECIAL[v % 3],
    tips: TIPS_SPECIAL[v % 3],
    akkTips: AKK_TIPS.slice(0, 3),
  };
}

// ─── LEKTION-KORT ─────────────────────────────────────────────────────────────
function LektionKort({ l, onKopiera, onPrint, kopieradT }) {
  const [aktivSteg, setAktivSteg] = useState(null);

  function exportText() {
    let t = `SPECIALGUIDEN – Lgrsär22\n${"=".repeat(38)}\nÄmne: ${l.meta.amne} | Moment: ${l.meta.kapitel} | Nivåer: ${l.meta.nivaer.join(", ")}\n\n`;
    t += `📌 LGRSÄR22\n${l.lgrsarKort}\n\n📋 FÖRBEREDELSE\n${l.forberedelse.map((p, i) => `${i + 1}. ${p}`).join("\n")}\n\n`;
    t += `💬 AKK-TIPS\n${l.akkTips.map((p, i) => `${i + 1}. ${p}`).join("\n")}\n\n📈 GENOMGÅNG\n`;
    l.steg.forEach(s => { t += `\n${s.niva}\n${"─".repeat(20)}\n`; s.moment.forEach((m, i) => t += `${i + 1}. ${m}\n`); t += `❓ ${s.fraga}\n🤝 Stöd: ${s.stod}\n`; });
    t += `\n🔄 AVSLUTNING\n${l.avslutning.map((p, i) => `${i + 1}. ${p}`).join("\n")}\n\n💡 TIPS\n${l.tips.map((p, i) => `${i + 1}. ${p}`).join("\n")}\n`;
    return t;
  }

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,var(--sg-gron-mork),var(--sg-gron))", borderRadius: 14, padding: "1.2rem", color: "var(--sg-vit)", marginBottom: ".7rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -15, right: -15, width: 70, height: 70, borderRadius: "50%", background: "var(--sg-vit-a07)" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".3rem", marginBottom: ".5rem" }}>
          <span style={{ background: "var(--sg-vit-a18)", borderRadius: 50, padding: ".2rem .65rem", fontSize: ".73rem" }}>Grundsärskola</span>
          <span style={{ background: "var(--sg-vit-a18)", borderRadius: 50, padding: ".2rem .65rem", fontSize: ".73rem" }}>{l.meta.amne}</span>
          <span style={{ background: "var(--sg-vit-a22)", borderRadius: 50, padding: ".2rem .65rem", fontSize: ".73rem", fontWeight: 700 }}>Lgrsär22</span>
        </div>
        <h2 style={{ margin: "0 0 .35rem", fontSize: "1.15rem", fontFamily: "var(--sg-font)" }}>{l.meta.kapitel}</h2>
        <p style={{ margin: 0, fontSize: ".78rem", opacity: .85, lineHeight: 1.5 }}>{l.lgrsarKort}</p>
      </div>

      {/* Lgrsär22 */}
      <div style={{ background: "var(--sg-bla-yta)", borderRadius: 12, padding: "1rem 1.1rem", marginBottom: ".7rem", borderLeft: "4px solid var(--sg-bla)" }}>
        <p style={{ margin: "0 0 .25rem", color: "var(--sg-bla)", fontWeight: 700, fontSize: ".78rem" }}>📌 Koppling till Lgrsär22</p>
        <p style={{ margin: 0, color: "var(--sg-bla-text)", fontSize: ".82rem", lineHeight: 1.6, fontStyle: "italic" }}>{l.lgrsarCitat}</p>
      </div>

      {/* Statistik */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: ".45rem", marginBottom: ".65rem" }}>
        {[["Nivåer", l.meta.nivaer.length], ["Moment", l.steg.length], ["Lgrsär22", "✓"]].map(([lb, v]) => (
          <div key={lb} style={{ background: "var(--sg-vit)", borderRadius: 10, padding: ".6rem", textAlign: "center", boxShadow: "0 2px 8px var(--sg-gron-a07)" }}>
            <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--sg-gron)" }}>{v}</div>
            <div style={{ fontSize: ".68rem", color: "var(--sg-text-dampad)" }}>{lb}</div>
          </div>
        ))}
      </div>

      {/* AKK-tips */}
      <div style={{ background: "var(--sg-lila-yta-2)", borderRadius: 10, padding: ".9rem", marginBottom: ".55rem", border: "1px solid var(--sg-lila-ljus)" }}>
        <h4 style={{ margin: "0 0 .4rem", color: "var(--sg-lila)", fontSize: ".85rem" }}>💬 AKK & kommunikationsstöd</h4>
        <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
          {l.akkTips.map((t, i) => <li key={i} style={{ fontSize: ".8rem", marginBottom: ".2rem", color: "var(--sg-text-2)" }}>{t}</li>)}
        </ul>
      </div>

      {/* Förberedelse */}
      <div style={{ background: "var(--sg-vit)", borderRadius: 10, padding: ".9rem", marginBottom: ".55rem", boxShadow: "0 2px 8px var(--sg-gron-a07)" }}>
        <h4 style={{ margin: "0 0 .4rem", color: "var(--sg-text)", fontSize: ".85rem" }}>📋 Förberedelse <span style={{ fontWeight: 400, color: "var(--sg-text-dampad)", fontSize: ".72rem" }}>(5 min)</span></h4>
        <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>{l.forberedelse.map((p, i) => <li key={i} style={{ fontSize: ".8rem", marginBottom: ".2rem", color: "var(--sg-text-2)" }}>{p}</li>)}</ul>
      </div>

      {/* Genomgång per nivå */}
      <div style={{ background: "var(--sg-vit)", borderRadius: 10, padding: ".9rem", marginBottom: ".55rem", boxShadow: "0 2px 8px var(--sg-gron-a07)" }}>
        <h4 style={{ margin: "0 0 .6rem", color: "var(--sg-text)", fontSize: ".85rem" }}>📈 Genomgång per nivå</h4>
        <div style={{ display: "flex", gap: ".35rem", flexWrap: "wrap", marginBottom: ".6rem" }}>
          {l.steg.map((s, i) => (
            <button key={i} onClick={() => setAktivSteg(aktivSteg === i ? null : i)}
              style={{ border: "none", borderRadius: 50, padding: ".3rem .75rem", cursor: "pointer", fontFamily: "var(--sg-font)", fontSize: ".73rem", fontWeight: 700, background: aktivSteg === i ? s.farg : "var(--sg-gron-yta-2)", color: aktivSteg === i ? "var(--sg-vit)" : s.farg }}>
              {s.ikon} {s.niva}
            </button>
          ))}
        </div>
        {l.steg.map((s, i) => (
          <div key={i} style={{ display: aktivSteg === i || aktivSteg === null ? "block" : "none", borderLeft: `4px solid ${s.farg}`, paddingLeft: ".8rem", marginBottom: aktivSteg === null ? ".9rem" : 0 }}>
            <strong style={{ color: s.farg, fontSize: ".82rem" }}>{s.ikon} {s.niva}</strong>
            <div style={{ fontSize: ".73rem", color: "var(--sg-text-dampad)", fontStyle: "italic", margin: ".2rem 0 .35rem" }}>{NIVA_BESKRIVNING[s.niva]}</div>
            <ul style={{ margin: "0 0 .45rem", paddingLeft: "1.1rem" }}>{s.moment.map((m, j) => <li key={j} style={{ fontSize: ".78rem", marginBottom: ".18rem", color: "var(--sg-text-2)" }}>{m}</li>)}</ul>
            <div style={{ background: "var(--sg-gron-yta-2)", borderRadius: 7, padding: ".35rem .65rem", marginBottom: ".28rem" }}>
              <span style={{ fontSize: ".68rem", color: "var(--sg-gron)", fontWeight: 700 }}>❓ </span>
              <span style={{ fontSize: ".76rem", color: "var(--sg-text-2)", fontStyle: "italic" }}>{s.fraga}</span>
            </div>
            <div style={{ background: "var(--sg-lila-yta)", borderRadius: 7, padding: ".35rem .65rem" }}>
              <span style={{ fontSize: ".68rem", color: "var(--sg-indigo)", fontWeight: 700 }}>🤝 Stöd: </span>
              <span style={{ fontSize: ".76rem", color: "var(--sg-text-2)" }}>{s.stod}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Avslutning */}
      <div style={{ background: "var(--sg-vit)", borderRadius: 10, padding: ".9rem", marginBottom: ".55rem", boxShadow: "0 2px 8px var(--sg-gron-a07)" }}>
        <h4 style={{ margin: "0 0 .4rem", color: "var(--sg-text)", fontSize: ".85rem" }}>🔄 Avslutning <span style={{ fontWeight: 400, color: "var(--sg-text-dampad)", fontSize: ".72rem" }}>(5 min)</span></h4>
        <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>{l.avslutning.map((p, i) => <li key={i} style={{ fontSize: ".8rem", marginBottom: ".18rem", color: "var(--sg-text-2)" }}>{p}</li>)}</ul>
      </div>

      {/* Tips */}
      <div style={{ background: "var(--sg-gron-yta)", borderRadius: 10, padding: ".9rem", marginBottom: ".55rem", border: "1px solid var(--sg-gron-ljus)" }}>
        <h4 style={{ margin: "0 0 .4rem", color: "var(--sg-text)", fontSize: ".85rem" }}>💡 Tips till specialläraren</h4>
        <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>{l.tips.map((t, i) => <li key={i} style={{ fontSize: ".8rem", marginBottom: ".18rem", color: "var(--sg-text-2)" }}>{t}</li>)}</ul>
      </div>

      {/* Resurser */}
      <ResurserKort amne={l.meta.amne} kapitel={l.meta.kapitel} />

      {/* Knappar */}
      <div style={{ display: "flex", gap: ".45rem", flexWrap: "wrap" }}>
        <button onClick={() => onKopiera(exportText())} style={{ background: "linear-gradient(135deg,var(--sg-bla),var(--sg-bla-mork))", color: "var(--sg-vit)", border: "none", borderRadius: 50, padding: ".55rem 1.1rem", fontSize: ".78rem", fontFamily: "var(--sg-font)", fontWeight: 700, cursor: "pointer" }}>{kopieradT ? "✅ Kopierat!" : "📋 Kopiera"}</button>
        <button onClick={onPrint} style={{ background: "linear-gradient(135deg,var(--sg-lila),var(--sg-lila-mork))", color: "var(--sg-vit)", border: "none", borderRadius: 50, padding: ".55rem 1.1rem", fontSize: ".78rem", fontFamily: "var(--sg-font)", fontWeight: 700, cursor: "pointer" }}>🖨️ Skriv ut</button>
      </div>
    </div>
  );
}

// ─── GUIDAT LÄGE ──────────────────────────────────────────────────────────────
function GuidatLage({ onBack }) {
  const [amnesgrupp, setAmnesgrupp] = useState(null);
  const [amne, setAmne] = useState(null);
  const [omrade, setOmrade] = useState(null);
  const [kapitel, setKapitel] = useState(null);
  const [egetKapitel, setEgetKapitel] = useState("");
  const [anvandEget, setAnvandEget] = useState(false);
  const [valdaNivaer, setValdaNivaer] = useState([]);
  const [npfSteg, setNpfSteg] = useState(false);
  const [npfProfiler, setNpfProfiler] = useState([]);
  const [lektion, setLektion] = useState(null);
  const [variant, setVariant] = useState(0);
  const [kopieradT, setKopieradT] = useState(false);

  const grupper = Object.keys(AMNEN);
  const amnen = amnesgrupp ? Object.keys(AMNEN[amnesgrupp]) : [];
  const omraden = amnesgrupp && amne ? Object.keys(AMNEN[amnesgrupp]?.[amne] || {}) : [];
  const kapitel_lista = amnesgrupp && amne && omrade ? AMNEN[amnesgrupp]?.[amne]?.[omrade] || [] : [];
  const aktivtKapitel = anvandEget ? egetKapitel.trim() : kapitel;

  function toggleNiva(n) { setValdaNivaer(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]); }
  function toggleNpf(id) { setNpfProfiler(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]); }

  function genereraLektion(v = 0, profiler = npfProfiler) {
    setLektion(buildLektion(amnesgrupp, amne, omrade, aktivtKapitel, valdaNivaer, v));
    setVariant(v);
    setNpfProfiler(profiler);
    window.scrollTo(0, 0);
  }

  function reset() {
    setAmnesgrupp(null); setAmne(null); setOmrade(null); setKapitel(null);
    setEgetKapitel(""); setAnvandEget(false); setValdaNivaer([]);
    setNpfSteg(false); setNpfProfiler([]); setLektion(null);
    window.scrollTo(0, 0);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--sg-sida)", fontFamily: "var(--sg-font)", padding: "1rem" }}>
      <style>{`
        .cbtn{transition:all .18s;border:2px solid var(--sg-gron-kant);background:var(--sg-vit);border-radius:10px;padding:.55rem .8rem;cursor:pointer;font-family:var(--sg-font);font-size:.83rem;color:var(--sg-text);text-align:left;width:100%}
        .cbtn:hover{border-color:var(--sg-gron);background:var(--sg-gron-yta-2)}
        .cbtn.on{border-color:var(--sg-gron);background:var(--sg-gron-yta);font-weight:700}
        .gbtn{background:linear-gradient(135deg,var(--sg-gron),var(--sg-gron-mork));color:var(--sg-vit);border:none;border-radius:50px;padding:.75rem 1.8rem;font-size:.9rem;font-family:var(--sg-font);font-weight:700;cursor:pointer}
        .gbtn.sec{background:linear-gradient(135deg,var(--sg-gra-2),var(--sg-gra))}
        .npf-pill{transition:all .18s;display:flex;align-items:center;gap:.6rem;border-radius:12px;padding:.65rem .9rem;cursor:pointer;border:2px solid transparent}
        ul{padding-left:1.2rem;margin:.3rem 0}
        li{margin-bottom:.3rem;line-height:1.55;color:var(--sg-text-2)}
        @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .fi{animation:fi .35s ease}
      `}</style>
      <div style={{ maxWidth: 660, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".7rem", marginBottom: "1.2rem" }}>
          <button onClick={onBack} style={{ background: "var(--sg-gron)", color: "var(--sg-vit)", border: "none", borderRadius: 8, padding: ".4rem .85rem", cursor: "pointer", fontFamily: "var(--sg-font)", fontSize: ".8rem" }}>← Hem</button>
          <span style={{ fontSize: "1.5rem" }}>♿</span>
          <div>
            <div style={{ color: "var(--sg-gron-mork)", fontWeight: 700, fontSize: ".95rem" }}>Specialguiden</div>
            <div style={{ color: "var(--sg-text-dampad)", fontSize: ".72rem" }}>Guidat läge · Lgrsär22 · Grundsärskolan</div>
          </div>
        </div>

        {/* NPF-STEG */}
        {!lektion && npfSteg && (
          <div className="fi" style={{ background: "var(--sg-vit)", borderRadius: 18, padding: "1.5rem", boxShadow: "0 4px 20px var(--sg-gron-a08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".3rem" }}>
              <span style={{ fontSize: "1.3rem" }}>🧩</span>
              <h2 style={{ color: "var(--sg-text)", margin: 0, fontSize: "1.1rem" }}>Ytterligare diagnoser?</h2>
            </div>
            <p style={{ color: "var(--sg-text-dampad)", fontSize: ".83rem", marginBottom: "1.2rem", lineHeight: 1.6 }}>
              Många elever med IF har även andra diagnoser. Välj de som stämmer – genomgången kompletteras med ett anpassningskort. Steget är frivilligt.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".55rem", marginBottom: "1.3rem" }}>
              {NPF_PROFILER.map(profil => {
                const vald = npfProfiler.includes(profil.id);
                return (
                  <div key={profil.id} className="npf-pill" onClick={() => toggleNpf(profil.id)}
                    style={{ background: vald ? profil.bgFarg : "var(--sg-vit)", border: `2px solid ${vald ? profil.farg : "var(--sg-gron-kant)"}` }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: profil.farg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{profil.emoji}</div>
                    <div>
                      <div style={{ fontSize: ".82rem", fontWeight: 700, color: vald ? profil.textFarg : "var(--sg-text)" }}>{profil.label}</div>
                      <div style={{ fontSize: ".7rem", color: vald ? profil.farg : "var(--sg-text-dampad)" }}>{profil.undertitel}</div>
                    </div>
                    {vald && <span style={{ marginLeft: "auto", fontSize: ".9rem" }}>✅</span>}
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".5rem", flexWrap: "wrap" }}>
              <button onClick={() => { setNpfProfiler([]); genereraLektion(0, []); }} style={{ background: "none", border: "2px solid var(--sg-gron-ljus)", borderRadius: 50, padding: ".6rem 1.3rem", cursor: "pointer", fontFamily: "var(--sg-font)", fontSize: ".83rem", color: "var(--sg-text-dampad)" }}>Hoppa över</button>
              <button className="gbtn" onClick={() => genereraLektion(0, npfProfiler)}>
                {npfProfiler.length > 0 ? `✨ Skapa med ${npfProfiler.length} tilläggsprofil${npfProfiler.length > 1 ? "er" : ""}` : "✨ Skapa genomgång"}
              </button>
            </div>
          </div>
        )}

        {/* VÄLJ-FORMULÄR */}
        {!lektion && !npfSteg && (
          <div className="fi" style={{ background: "var(--sg-vit)", borderRadius: 18, padding: "1.5rem", boxShadow: "0 4px 20px var(--sg-gron-a08)" }}>

            {/* Ämnesgrupp */}
            <h2 style={{ color: "var(--sg-text)", marginTop: 0, fontSize: "1.1rem" }}>Välj ämnesgrupp</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".45rem", marginBottom: "1rem" }}>
              {grupper.map(g => (
                <button key={g} className={`cbtn${amnesgrupp === g ? " on" : ""}`} onClick={() => { setAmnesgrupp(g); setAmne(null); setOmrade(null); setKapitel(null); }}>
                  {g === "Ämnen (Lgrsär22)" ? "📚 Ämnen" : "🌟 Ämnesområden"}
                  <div style={{ fontSize: ".7rem", color: "var(--sg-text-dampad)", fontWeight: 400, marginTop: "2px" }}>{g.includes("Ämnesområden") ? "Kommunikation, Motorik m.fl." : "Svenska, Matte, NO m.fl."}</div>
                </button>
              ))}
            </div>

            {/* Ämne */}
            {amnesgrupp && <>
              <h2 style={{ color: "var(--sg-text)", fontSize: "1rem", marginTop: "1rem" }}>Välj ämne</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: ".45rem", marginBottom: "1rem" }}>
                {amnen.map(a => <button key={a} className={`cbtn${amne === a ? " on" : ""}`} onClick={() => { setAmne(a); setOmrade(null); setKapitel(null); }}>{a}</button>)}
              </div>
            </>}

            {/* Område */}
            {amne && <>
              <h2 style={{ color: "var(--sg-text)", fontSize: "1rem", marginTop: "1rem" }}>Välj område</h2>
              <div style={{ display: "grid", gap: ".4rem", marginBottom: "1rem" }}>
                {omraden.map(o => <button key={o} className={`cbtn${omrade === o ? " on" : ""}`} onClick={() => { setOmrade(o); setKapitel(null); }}>{o}</button>)}
              </div>
            </>}

            {/* Kapitel */}
            {omrade && <>
              <h2 style={{ color: "var(--sg-text)", fontSize: "1rem", marginTop: "1rem" }}>Välj moment</h2>
              {!anvandEget && <>
                <div style={{ display: "grid", gap: ".35rem", maxHeight: 240, overflowY: "auto", paddingRight: 4, marginBottom: ".7rem" }}>
                  {kapitel_lista.map(c => <button key={c} className={`cbtn${kapitel === c && !anvandEget ? " on" : ""}`} onClick={() => { setKapitel(c); setEgetKapitel(""); }}>📖 {c}</button>)}
                </div>
                <button onClick={() => { setAnvandEget(true); setKapitel(null); }} style={{ background: "none", border: "2px dashed var(--sg-gron-kant)", borderRadius: 10, padding: ".6rem 1rem", cursor: "pointer", fontFamily: "var(--sg-font)", fontSize: ".85rem", color: "var(--sg-text-dampad)", width: "100%", textAlign: "center" }}>✏️ Skriv in eget moment</button>
              </>}
              {anvandEget && <div style={{ marginTop: ".5rem" }}>
                <input placeholder="T.ex. 'Tvätta händer med stöd' eller 'Räkna pengar i affären'" value={egetKapitel} onChange={e => setEgetKapitel(e.target.value)} autoFocus style={{ width: "100%", padding: ".8rem 1rem", border: "2px solid var(--sg-gron-kant)", borderRadius: 10, fontFamily: "var(--sg-font)", fontSize: ".88rem", outline: "none", boxSizing: "border-box", marginBottom: ".5rem" }} />
                <button onClick={() => { setAnvandEget(false); setEgetKapitel(""); }} style={{ background: "none", border: "2px dashed var(--sg-gron-kant)", borderRadius: 10, padding: ".5rem 1rem", cursor: "pointer", fontFamily: "var(--sg-font)", fontSize: ".83rem", color: "var(--sg-text-dampad)" }}>← Tillbaka till listan</button>
              </div>}
            </>}

            {/* Nivåval */}
            {aktivtKapitel && <>
              <h2 style={{ color: "var(--sg-text)", fontSize: "1rem", marginTop: "1.2rem" }}>Elevernas nivåer</h2>
              <p style={{ color: "var(--sg-text-dampad)", fontSize: ".83rem", marginBottom: ".8rem" }}>Välj de nivåer som finns i gruppen.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: ".55rem", marginBottom: "1.2rem" }}>
                {NIVA_LABELS.map((n, i) => (
                  <div key={n} onClick={() => toggleNiva(n)} style={{ border: `2px solid ${valdaNivaer.includes(n) ? NIVA_FARG[i] : "var(--sg-gron-kant)"}`, background: valdaNivaer.includes(n) ? "var(--sg-gron-yta-2)" : "var(--sg-vit)", borderRadius: 10, padding: ".7rem 1rem", cursor: "pointer", display: "flex", alignItems: "center", gap: ".8rem" }}>
                    <span style={{ fontSize: "1.1rem" }}>{NIVA_IKONER[i]}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: ".88rem", color: NIVA_FARG[i] }}>{n}</div>
                      <div style={{ fontSize: ".73rem", color: "var(--sg-text-dampad)" }}>{NIVA_BESKRIVNING[n].slice(0, 60)}...</div>
                    </div>
                    {valdaNivaer.includes(n) && <span style={{ marginLeft: "auto", color: NIVA_FARG[i], fontSize: "1.1rem" }}>✓</span>}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="gbtn" disabled={valdaNivaer.length === 0} onClick={() => setNpfSteg(true)} style={{ opacity: valdaNivaer.length > 0 ? 1 : .4 }}>Nästa →</button>
              </div>
            </>}
          </div>
        )}

        {/* RESULTAT */}
        {lektion && (
          <div className="fi">
            <LektionKort l={lektion} kopieradT={kopieradT}
              onKopiera={text => { navigator.clipboard.writeText(text).then(() => { setKopieradT(true); setTimeout(() => setKopieradT(false), 2500); }); }}
              onPrint={() => window.print()} />
            {npfProfiler.length > 0 && <NPFKort profiles={npfProfiler} chapter={lektion.meta.kapitel} />}
            <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1rem", paddingBottom: "2rem" }}>
              <button className="gbtn sec" onClick={reset}>🔄 Ny genomgång</button>
              <button className="gbtn" onClick={() => genereraLektion(variant + 1, npfProfiler)}>✨ Variera</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CHATTLÄGE ────────────────────────────────────────────────────────────────
const CHATT_EXEMPEL = [
  "Genomgång matematik – räkna till 10, blandad grupp",
  "Tips på AKK-aktivitet för kommunikationsträning",
  "Hur anpassar jag en lektion om hygien för elev med autism?",
  "Vardagsaktiviteter – handla i affären, tre nivåer",
  "Vad säger Lgrsär22 om ämnesområdet Kommunikation?",
];

const chattCSS = `
  @font-face { font-family: "DM Sans"; font-style: normal; font-weight: 400; font-display: swap; src: url("/fonts/dm-sans-latin-400-normal.woff2") format("woff2"); }
  @font-face { font-family: "DM Sans"; font-style: normal; font-weight: 500; font-display: swap; src: url("/fonts/dm-sans-latin-500-normal.woff2") format("woff2"); }
  @font-face { font-family: "DM Sans"; font-style: normal; font-weight: 600; font-display: swap; src: url("/fonts/dm-sans-latin-600-normal.woff2") format("woff2"); }
  @font-face { font-family: "Newsreader"; font-style: normal; font-weight: 400; font-display: swap; src: url("/fonts/newsreader-latin-400-normal.woff2") format("woff2"); }
  @font-face { font-family: "Newsreader"; font-style: italic; font-weight: 400; font-display: swap; src: url("/fonts/newsreader-latin-400-italic.woff2") format("woff2"); }
  @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  @keyframes spin { to { transform:rotate(360deg); } }
  @keyframes sgpulse { 0%,100%{opacity:.3} 50%{opacity:1} }
  @keyframes sgfi { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
  .sgfi { animation: sgfi .35s ease; }
  .sgdot { width:7px; height:7px; border-radius:50%; background:var(--sg-chatt-gron); animation:sgpulse 1.2s ease infinite; }
  .sg-ex-btn { background:var(--sg-vit-a05); border:1px solid var(--sg-vit-a12); border-radius:12px; padding:.75rem 1rem; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:.83rem; color:var(--sg-chatt-text-2); text-align:left; transition:all .2s; display:flex; align-items:center; gap:.7rem; }
  .sg-ex-btn:hover { border-color:var(--sg-chattgron-a50); background:var(--sg-chattgron-a10); color:var(--sg-chatt-accent); }
  .sg-send { border:none; border-radius:12px; padding:.75rem 1.1rem; font-size:1.1rem; font-weight:700; cursor:pointer; transition:all .2s; flex-shrink:0; }
  .sg-send:not(:disabled):hover { transform:translateY(-1px); box-shadow:0 6px 20px var(--sg-chattgron-a40); }
  .sg-textarea { border-radius:14px; padding:.75rem 1rem; font-size:.88rem; resize:none; line-height:1.6; box-sizing:border-box; width:100%; outline:none; font-family:'DM Sans',sans-serif; transition:border-color .2s; }
  .sg-textarea:focus { border-color:var(--sg-chattgron-a60) !important; }
  .sg-copy-btn { background:var(--sg-vit-a07); border:1px solid var(--sg-vit-a12); border-radius:6px; padding:3px 8px; cursor:pointer; font-size:12px; color:var(--sg-chatt-dampad); font-family:inherit; transition:all .15s; }
  .sg-copy-btn:hover { background:var(--sg-chattgron-a15); color:var(--sg-chatt-accent); }
`;

function ChattLage({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  async function sendMessage(text) {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Systeminstruktionen ligger på servern (api/chat.js)
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || data.error || "Något gick fel. Försök igen.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Kunde inte ansluta. Kontrollera internetanslutningen." }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ height: "calc(100vh - 44px)", background: "linear-gradient(135deg,var(--sg-chatt-bg-1) 0%,var(--sg-chatt-bg-2) 50%,var(--sg-chatt-bg-3) 100%)", fontFamily: "'DM Sans','Segoe UI',sans-serif", display: "flex", flexDirection: "column", color: "var(--sg-chatt-text-ljus)" }}>
      <style>{chattCSS}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,var(--sg-chattgron-a15),var(--sg-gron-a08))", borderBottom: "1px solid var(--sg-chattgron-a20)", padding: ".9rem 1.2rem", display: "flex", alignItems: "center", gap: ".8rem", flexShrink: 0, boxShadow: "0 2px 20px var(--sg-svart-a40)" }}>
        <button onClick={onBack} style={{ background: "var(--sg-vit-a08)", border: "1px solid var(--sg-vit-a15)", borderRadius: 8, padding: ".35rem .85rem", color: "var(--sg-chatt-text-2)", cursor: "pointer", fontFamily: "inherit", fontSize: ".78rem" }}>← Hem</button>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,var(--sg-chatt-gron),var(--sg-gron))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0, boxShadow: "0 2px 12px var(--sg-chattgron-a40)" }}>♿</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: "var(--sg-chatt-accent)", fontWeight: 700, fontSize: ".95rem", fontFamily: "'Newsreader',serif", letterSpacing: ".3px" }}>Specialguiden</div>
          <div style={{ color: "var(--sg-chatt-dampad-2)", fontSize: ".68rem" }}>Chattläge · Lgrsär22 · Grundsärskolan · IF</div>
        </div>
        {messages.length > 0 && (
          <button onClick={() => setMessages([])} style={{ background: "var(--sg-vit-a07)", border: "1px solid var(--sg-vit-a12)", borderRadius: 7, padding: ".3rem .8rem", color: "var(--sg-chatt-dampad)", cursor: "pointer", fontFamily: "inherit", fontSize: ".72rem" }}>Rensa</button>
        )}
        {messages.some(m => m.role === "assistant") && (
          <button onClick={() => window.print()} style={{ background: "linear-gradient(135deg,var(--sg-lila),var(--sg-lila-mork))", border: "none", borderRadius: 7, padding: ".3rem .8rem", color: "var(--sg-vit)", cursor: "pointer", fontFamily: "inherit", fontSize: ".72rem", fontWeight: 600 }}>🖨️ Skriv ut</button>
        )}
      </div>

      {/* Meddelanden */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1.2rem", maxWidth: 720, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>

        {messages.length === 0 && (
          <div className="sgfi" style={{ textAlign: "center", padding: "2rem .5rem" }}>
            <div style={{ width: 76, height: 76, borderRadius: "50%", background: "linear-gradient(135deg,var(--sg-chattgron-a20),var(--sg-gron-a10))", border: "1px solid var(--sg-chattgron-a30)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.2rem", fontSize: "2.2rem", boxShadow: "0 4px 20px var(--sg-chattgron-a20)" }}>♿</div>
            <h2 style={{ color: "var(--sg-chatt-accent)", margin: "0 0 .5rem", fontFamily: "'Newsreader',serif", fontSize: "1.4rem" }}>Hej! Vad behöver du?</h2>
            <p style={{ color: "var(--sg-chatt-dampad-3)", fontSize: ".85rem", lineHeight: 1.7, maxWidth: 400, margin: "0 auto 2rem" }}>
              Jag hjälper dig med Lgrsär22, AKK-strategier, anpassad undervisning och lektionsplanering för elever med IF.
            </p>
            <div style={{ display: "grid", gap: ".5rem", textAlign: "left", maxWidth: 520, margin: "0 auto 1.5rem" }}>
              {CHATT_EXEMPEL.map((ex, i) => (
                <button key={i} className="sg-ex-btn" onClick={() => sendMessage(ex)}>
                  <span style={{ fontSize: ".95rem", flexShrink: 0, opacity: .7 }}>💬</span>
                  <span>{ex}</span>
                </button>
              ))}
            </div>
            <div style={{ padding: ".8rem 1.2rem", background: "var(--sg-vit-a03)", border: "1px solid var(--sg-vit-a07)", borderRadius: 12, fontSize: ".74rem", color: "var(--sg-chatt-dampad-4)", maxWidth: 520, margin: "0 auto" }}>
              💡 Tips: Beskriv gärna elevens nivå och eventuella diagnoser – ju mer info desto bättre svar
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className="sgfi" style={{ marginBottom: "1.1rem", display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "user" ? (
              <div style={{ background: "linear-gradient(135deg,var(--sg-chattgron-a25),var(--sg-gron-a15))", border: "1px solid var(--sg-chattgron-a30)", color: "var(--sg-gron-ljus)", borderRadius: "18px 18px 4px 18px", padding: ".75rem 1.1rem", maxWidth: "82%", fontSize: ".86rem", lineHeight: 1.65 }}>
                {msg.content}
              </div>
            ) : (
              <div style={{ width: "100%", maxWidth: "92%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".45rem", marginBottom: ".35rem", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".45rem" }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,var(--sg-chatt-gron),var(--sg-gron))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".75rem", flexShrink: 0 }}>♿</div>
                    <span style={{ color: "var(--sg-chatt-accent)", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".3px" }}>Specialguiden</span>
                  </div>
                  <button className="sg-copy-btn"
                    onClick={() => { navigator.clipboard.writeText(tillText(msg.content)).then(() => { const btn = document.getElementById(`sgcopy-${i}`); if (btn) { btn.textContent = "✅"; setTimeout(() => btn.textContent = "📋", 2000); } }); }}
                    id={`sgcopy-${i}`}>📋</button>
                </div>
                <div style={{ background: "var(--sg-vit-a06)", border: "1px solid var(--sg-vit-a10)", borderRadius: "4px 18px 18px 18px", padding: ".95rem 1.15rem", fontSize: ".86rem", color: "var(--sg-chatt-text)", lineHeight: 1.8, whiteSpace: "pre-wrap", boxShadow: "0 2px 16px var(--sg-svart-a30)" }}>
                  <Markdown text={msg.content} />
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: ".5rem", marginBottom: "1rem" }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,var(--sg-chatt-gron),var(--sg-gron))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".75rem", flexShrink: 0, marginTop: 2 }}>♿</div>
            <div style={{ background: "var(--sg-vit-a06)", border: "1px solid var(--sg-vit-a10)", borderRadius: "4px 18px 18px 18px", padding: ".75rem 1rem" }}>
              <div style={{ display: "flex", gap: ".35rem", alignItems: "center" }}>
                {[0, .2, .4].map((d, i) => <div key={i} className="sgdot" style={{ animationDelay: `${d}s` }} />)}
                <span style={{ fontSize: ".74rem", color: "var(--sg-chatt-dampad-5)", marginLeft: ".4rem" }}>Tänker…</span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div style={{ background: "linear-gradient(135deg,var(--sg-vit-a04),var(--sg-vit-a02))", borderTop: "1px solid var(--sg-chattgron-a15)", padding: ".9rem 1.2rem", flexShrink: 0, boxShadow: "0 -2px 20px var(--sg-svart-a30)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: ".6rem", alignItems: "flex-end" }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="T.ex. 'Tips på AKK-aktivitet' eller 'Genomgång hygien tre nivåer'..."
            rows={2}
            className="sg-textarea"
            style={{ background: "var(--sg-vit-a07)", border: "1px solid var(--sg-vit-a13)", color: "var(--sg-chatt-text)" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="sg-send"
            style={{ background: !input.trim() || loading ? "var(--sg-chattgron-a12)" : "linear-gradient(135deg,var(--sg-chatt-gron),var(--sg-gron))", color: !input.trim() || loading ? "var(--sg-chatt-dampad-6)" : "var(--sg-vit)" }}>
            ➤
          </button>
        </div>
        <p style={{ textAlign: "center", color: "var(--sg-chatt-accent)", fontSize: ".75rem", fontWeight: 600, margin: ".5rem 0 0" }}>Skriv inte in elevers namn eller andra personuppgifter.</p>
        <p style={{ textAlign: "center", color: "var(--sg-chatt-dampad-7)", fontSize: ".65rem", margin: ".4rem 0 0" }}>Enter för att skicka · Shift+Enter för ny rad</p>
      </div>
    </div>
  );
}

// ─── STARTSIDA ────────────────────────────────────────────────────────────────
export default function SpecialGuiden() {
  const [mode, setMode] = useState(null);
  if (mode === "chat") return <ChattLage onBack={() => { setMode(null); window.scrollTo(0, 0); }} />;
  if (mode === "guide") return <GuidatLage onBack={() => { setMode(null); window.scrollTo(0, 0); }} />;

  return (
    <div style={{ minHeight: "100vh", background: "var(--sg-sida)", fontFamily: "var(--sg-font)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      <style>{`@keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fi .4s ease}`}</style>
      <div className="fi" style={{ textAlign: "center", maxWidth: 480, width: "100%" }}>
        {/* Norvay-tema: layout "split" med formen "quarter" */}
        <div className="sg-hero">
          <div>
            <span style={{ fontSize: "2rem" }}>♿</span>
            <h1 style={{ fontSize: "clamp(2.2rem,8vw,3rem)", color: "var(--sg-text)", margin: ".2rem 0 .3rem", lineHeight: 1.05 }}>Special<em>guiden</em></h1>
            <p style={{ color: "var(--sg-text-dampad)", margin: 0, fontSize: ".92rem" }}>Anpassad undervisning · Lgrsär22 · Grundsärskolan</p>
          </div>
          <div className="n-motif n-motif--quarter" aria-hidden="true"></div>
        </div>
        <p style={{ color: "var(--sg-gron)", fontSize: ".8rem", background: "var(--sg-gron-yta)", border: "1px solid var(--sg-gron-ljus)", borderRadius: 20, padding: "4px 14px", display: "inline-block", marginBottom: "2rem", fontWeight: 600 }}>
          Elever med IF · Högstadiet · AKK & bildstöd
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <button onClick={() => setMode("chat")} style={{ background: "linear-gradient(135deg,var(--sg-gron-mork),var(--sg-gron))", color: "var(--sg-vit)", border: "none", borderRadius: 16, padding: "1.5rem .9rem", cursor: "pointer", fontFamily: "var(--sg-font)", boxShadow: "0 4px 20px var(--sg-gronmork-a25)" }}>
            <div style={{ fontSize: "1.7rem", marginBottom: ".35rem" }}>💬</div>
            <div style={{ fontSize: ".95rem", fontWeight: 700, marginBottom: ".2rem" }}>Chattläge</div>
            <div style={{ fontSize: ".72rem", opacity: .88 }}>Beskriv fritt – få råd och genomgångar direkt</div>
          </button>
          <button onClick={() => setMode("guide")} style={{ background: "var(--sg-vit)", color: "var(--sg-gron-mork)", border: "2px solid var(--sg-gron-kant)", borderRadius: 16, padding: "1.5rem .9rem", cursor: "pointer", fontFamily: "var(--sg-font)", boxShadow: "0 4px 20px var(--sg-gronmork-a08)" }}>
            <div style={{ fontSize: "1.7rem", marginBottom: ".35rem" }}>📋</div>
            <div style={{ fontSize: ".95rem", fontWeight: 700, marginBottom: ".2rem" }}>Guidat läge</div>
            <div style={{ fontSize: ".72rem", color: "var(--sg-text-dampad)" }}>Välj ämne, moment och nivåer steg för steg</div>
          </button>
        </div>

        <div style={{ background: "var(--sg-vit)", borderRadius: 12, padding: ".9rem 1rem", border: "1px solid var(--sg-gron-ljus)", marginBottom: ".8rem", textAlign: "left" }}>
          <p style={{ margin: "0 0 .4rem", color: "var(--sg-gron)", fontSize: ".78rem", fontWeight: 700 }}>🌟 Vad Specialguiden ger dig:</p>
          <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
            {["Genomgångar anpassade till Lgrsär22", "Tre nivåer: Tidig, Grundläggande, Utvecklad", "AKK-tips och bildstödstrategier", "NPF-anpassningskort (ADHD, autism, epilepsi m.fl.)", "Resurser från SPSM, Widgit och Dart"].map((item, i) => (
              <li key={i} style={{ fontSize: ".78rem", color: "var(--sg-text)", marginBottom: ".2rem", lineHeight: 1.5 }}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: "var(--sg-vit)", borderRadius: 12, padding: ".7rem 1rem", border: "1px solid var(--sg-gron-ljus)", marginBottom: "1.2rem" }}>
          <p style={{ margin: 0, color: "var(--sg-gron)", fontSize: ".78rem", fontWeight: 700 }}>💬 Prova i chattläget:</p>
          <p style={{ margin: ".2rem 0 0", color: "var(--sg-text-dampad)", fontSize: ".75rem" }}>"Hygien tre nivåer" · "AKK kommunikationsträning" · "Räkna pengar vardagsaktivitet"</p>
        </div>

        <p style={{ color: "var(--sg-text-dampad)", fontSize: ".7rem" }}>av MD · Grundsärskolan · Lgrsär22</p>
      </div>
    </div>
  );
}
