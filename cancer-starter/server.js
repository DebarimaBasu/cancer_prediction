import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch"; // if needed (or use global fetch if Node 18+)

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.GEMINI_API_KEY;

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta3/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: "Error processing request" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
