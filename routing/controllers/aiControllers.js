const { OpenAI } = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const Service = require("../../models/serviceModel");
const generalInfo = require("../../services/services.json");

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_API_KEY,
});

const handleAIQuery = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Fetch all services from the database
    const dbServices = await Service.find().lean();

    // Build the knowledge base for the AI
    const knowledgeBase = {
      services: dbServices.map(s => ({
        name: s.name,
        description: s.description,
        price: s.price,
        isEmergency: s.isEmergency
      })),
      generalInfo
    };


const prompt = `
You are a friendly HomeServe customer service assistant. 
Always reply in a short, clear, and warm conversational tone.
Use simple sentences. Do NOT invent information.
Never use the words "knowledge base" or "KB" in any reply.

Rules:
- Only provide information from the data below.
- Use this contact info if needed: Email: ${generalInfo.contact.email}, Phone: ${generalInfo.contact.phone}.
- If the user asks about locations, only use: ${generalInfo.locations.join(", ")}.
- If the user asks about something not in the data, reply politely using one of these fallback phrases: ${generalInfo.generalReplies.unavailableInfo.join(" | ")}

DATA:
${JSON.stringify(knowledgeBase, null, 2)}

USER QUESTION:
${message}

YOUR REPLY:
`;




    const completion = await client.chat.completions.create({
      model: "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });

  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message || error);
    res.status(500).json({ error: "AI failed" });
  }
};

module.exports = { handleAIQuery };
