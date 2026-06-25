import Anthropic from "@anthropic-ai/sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, system } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  try {
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: system || "Du är en hjälpsam assistent.",
      messages: messages,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error("Anthropic API error:", error);
    return res.status(500).json({ error: "API error: " + error.message });
  }
}
