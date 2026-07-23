import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Helper to get GoogleGenAI client
function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Shopping Assistant Chat endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history, catalogSummary } = req.body;

    const ai = getGenAIClient();
    if (!ai) {
      return res.json({
        reply: "I am the VORTEX AI Shopping Assistant. (Note: GEMINI_API_KEY is currently offline or not set in environment secrets. Displaying default AI recommendation mode). How can I assist with your 2026 tech gear selection?",
        suggestedProducts: [],
      });
    }

    const systemInstruction = `You are VORTEX AI, the ultra-futuristic concierge for "VORTEX STORE" (a fictional 2026 luxury cyber e-commerce store).
Your tone is sleek, sophisticated, helpful, and high-tech (Apple/Cyberpunk luxury vibe).
You assist users in picking futuristic tech, gaming gear, smart home automation, cyber fashion, and office accessories.
Always clarify that all products are fictional demo showcase items if asked.
Provide concise, elegant recommendations. 

Current Catalog Context:
${catalogSummary || "Available categories: Gaming, Tech, Smart Home, Fashion, Accessories, Office, Lifestyle."}

Format response in clean Markdown. You can suggest 1-3 specific product IDs if relevant by concluding with a JSON block:
\`\`\`json
{ "recommendedProductIds": ["VTX-GM-901", "VTX-TC-102"] }
\`\`\`
`;

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // Send history if provided, or direct message
    const response = await chat.sendMessage({
      message: message || "Hello! What can VORTEX AI recommend for me today?",
    });

    const text = response.text || "I am processing your request for VORTEX gear.";
    
    // Extract JSON block for recommended product IDs if any
    let recommendedProductIds: string[] = [];
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    let cleanText = text;

    if (jsonMatch && jsonMatch[1]) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        if (Array.isArray(parsed.recommendedProductIds)) {
          recommendedProductIds = parsed.recommendedProductIds;
        }
        cleanText = text.replace(/```json\s*[\s\S]*?\s*```/, "").trim();
      } catch (e) {
        // ignore parse error
      }
    }

    res.json({
      reply: cleanText,
      recommendedProductIds,
    });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    res.status(500).json({
      error: "AI service temporarily unavailable",
      details: error?.message || "Unknown error",
    });
  }
});

// AI Gift Recommendation & Product Finder
app.post("/api/ai/recommend", async (req, res) => {
  try {
    const { recipient, budget, interest, usageScenario } = req.body;

    const ai = getGenAIClient();
    if (!ai) {
      return res.json({
        recommendations: [
          {
            title: "Quantum Neural VR-X Headset",
            reasoning: "Perfect for immersive gaming & virtual workspace collaboration.",
            sku: "VTX-GM-901",
          },
          {
            title: "NovaFold Cyber Phone Z",
            reasoning: "Futuristic dual-hinge holographic display phone with quantum battery.",
            sku: "VTX-TC-101",
          },
        ],
      });
    }

    const prompt = `Based on these parameters:
Recipient: ${recipient || "Tech Enthusiast"}
Max Budget: $${budget || "1000"}
Primary Interest: ${interest || "Gaming & Cyber Productivity"}
Usage Scenario: ${usageScenario || "Daily High-End Use"}

Recommend 3 ideal futuristic tech products from VORTEX STORE catalog.
Return valid JSON array of objects with keys: "title", "sku" (e.g. VTX-GM-901), "reasoning", "matchScore" (e.g. 98%).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "[]");
    res.json({ recommendations: parsed });
  } catch (error: any) {
    console.error("AI Recommendation Error:", error);
    res.status(500).json({ error: "Failed to generate AI recommendations" });
  }
});

// Smart Search Query Expansion
app.post("/api/ai/smart-search", async (req, res) => {
  try {
    const { query } = req.body;
    const ai = getGenAIClient();

    if (!ai || !query) {
      return res.json({ expandedTerms: [query], categoryHint: null });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `User search query: "${query}".
Suggest 4 relevant search keywords/synonyms for a futuristic tech e-commerce catalog, and identify the single best matching category among: "Gaming", "Tech", "Smart Home", "Fashion", "Accessories", "Office", "Lifestyle".

Return JSON object: { "keywords": ["term1", "term2"], "categoryHint": "Gaming" }`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json({
      expandedTerms: data.keywords || [query],
      categoryHint: data.categoryHint || null,
    });
  } catch (error) {
    res.json({ expandedTerms: [req.body.query], categoryHint: null });
  }
});

// Vite Middleware for Dev / Static serving for Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VORTEX STORE server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
