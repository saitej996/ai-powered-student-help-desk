import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok", mode: "Offline AI like Meta AI" }));

app.post("/api/chat", async (req, res) => {
  const message = req.body?.message?.trim();
  if (!message) return res.status(400).json({ error: "Enter message" });

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "phi3",
        prompt: `You are a helpful Student Helpdesk Assistant. Answer clearly and simply. User question: ${message}`,
        stream: false
      })
    });

    const data = await response.json();
    res.json({ reply: data.response, source: "offline-ai" });

  } catch (err) {
    res.json({ 
      reply: `Ollama running lo ledu bro! Nee aa black CMD lo 'ollama run phi3' run ayyi undali. Malli try chey bro.`,
      source: "error" 
    });
  }
});

app.listen(PORT, () => console.log(`Offline AI Chatbot running at http://localhost:${PORT}`));