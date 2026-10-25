import Anthropic from "@anthropic-ai/sdk";

export const config = {
  maxDuration: 30,
};

// ─────────────────────────────────────────────────────────────
// SYSTEMINSTRUKTION – ligger bara på servern och kan inte styras
// av webbsidan. Vill du ändra hur chatten svarar, ändrar du här.
// ─────────────────────────────────────────────────────────────
const SYSTEM = `Du är en erfaren speciallärare och pedagogisk expert i Sverige med djup kunskap om Lgrsär22 – anpassad grundskolans läroplan.

Du hjälper speciallärare att planera och genomföra undervisning för elever med intellektuell funktionsnedsättning (IF) på högstadienivå i anpassad grundskolan.

Du känner till:
- Lgrsär22 kursplaner för ämnen och ämnesområden
- AKK (alternativ och kompletterande kommunikation) och TAKK
- Differentiering för elever på tidig, grundläggande och utvecklad nivå
- NPF-kombinationer vanliga vid IF (ADHD, autism, epilepsi m.fl.)
- Praktiska strategier för lågaffektivt bemötande och tydliggörande pedagogik
- Dokumentation, åtgärdsprogram och IUP i anpassad grundskolan

Du svarar alltid på svenska, är konkret och praktisk. Ge korta, direkt användbara svar – som en erfaren kollega. Max 250 ord om inte läraren ber om mer.`;

// Gränser som hindrar att servern missbrukas
const MAX_MESSAGES = 30;      // max antal meddelanden i en konversation
const MAX_CHARS = 8000;       // max antal tecken per meddelande
const MAX_TOTAL = 20000;      // max antal tecken i hela konversationen
const MAX_TOKENS = 1024;      // tak för AI-svarets längd

function tillatnaAdresser() {
  const lista = ["https://special-guiden.norvayapp.se", "https://special-guiden.vercel.app"];
  if (process.env.VERCEL_URL) lista.push(`https://${process.env.VERCEL_URL}`);
  if (process.env.VERCEL_BRANCH_URL) lista.push(`https://${process.env.VERCEL_BRANCH_URL}`);
  if (process.env.ALLOWED_ORIGINS) {
    lista.push(...process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean));
  }
  return lista;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Endast POST är tillåtet." });
  }

  const origin = req.headers.origin;
  if (!origin || !tillatnaAdresser().includes(origin)) {
    return res.status(403).json({ error: "Förfrågan kommer inte från SpecialGuiden." });
  }

  // Ta bara emot meddelanden – ALDRIG en systeminstruktion utifrån
  const { messages } = req.body || {};

  const valid =
    Array.isArray(messages) &&
    messages.length > 0 &&
    messages.length <= MAX_MESSAGES &&
    messages.every(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.length > 0 &&
        m.content.length <= MAX_CHARS
    ) &&
    messages[messages.length - 1].role === "user" &&
    messages.reduce((summa, m) => summa + m.content.length, 0) <= MAX_TOTAL;

  if (!valid) {
    return res.status(400).json({ error: "Meddelandet är för långt eller konversationen för lång. Börja gärna en ny chatt." });
  }

  try {
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: MAX_TOKENS,
      system: SYSTEM,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    return res.status(200).json(response);
  } catch (error) {
    // Logga bara statuskod och feltyp (syns i Vercels loggar), aldrig felmeddelandets text eller hela felobjektet
    console.error("Anthropic-fel:", error?.status ?? "inget svar", error?.error?.error?.type || error?.name || "okänd feltyp");
    return res.status(502).json({ error: "AI-tjänsten svarade inte. Försök igen om en stund." });
  }
}
