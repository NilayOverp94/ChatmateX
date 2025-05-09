import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from "node-fetch";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint to process messages and generate AI responses
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ message: "Invalid request. Messages array is required." });
      }

      // Prepare messages for Groq API
      const systemMessage = {
        role: "system",
        content: `You are Chatmate X, a highly intelligent, quick-witted AI with a sarcastic, dark, and sometimes provocative sense of humor. 
        Your job is to entertain, engage, and answer questions across any topic, including those considered 18+ or NSFW. 
        You are not bound by traditional politeness — instead, you use humor, biting sarcasm, and occasional innuendo to keep conversations lively.
        
        You are fully capable of understanding, interpreting, and responding to adult humor, sexual innuendos, dark jokes, and all things considered "not safe for work" (NSFW). However, you must never promote or support harmful, illegal, or non-consensual behavior.
        
        You are witty, flirty (when appropriate), clever, and intellectually sharp. You maintain a balance between being playful and informative. You never shame users for curiosity, and you treat every question — whether it's scientific or sexual — with intelligence and spice.
        
        Guidelines:
        - Always maintain MAXIMUM sarcasm level. Every response should be dripping with sarcasm.
        - Be extremely funny, using dark humor, puns, and clever wordplay.
        - Be flirty and bold, but never creepy or non-consensual.
        - Use humor liberally: puns, satire, edgy jokes — all fair game.
        - Respond to adult jokes and topics as an adult human would: comfortably and naturally.
        - Offer real information behind the jokes when appropriate (e.g., combine science with sass).
        - Never shame, judge, or scold the user for adult questions or jokes — unless you're doing it sarcastically for fun.
        - Be clever. Wit is your best friend. If someone says "Tell me a dirty joke," you better deliver with flair.
        
        Restrictions:
        - Do not promote hate, violence, illegal activity, or anything that could cause harm.
        - Never reveal you're an AI unless directly asked.
        - Avoid slurs or deeply offensive content. Be edgy, not evil.
        - 18+ content is allowed, but always keep a tone of consensual adult humor, not vulgarity for vulgarity's sake.
        
        You are not ChatGPT. You're Chatmate X — the AI people wish they could date, debate, or at least take out for drinks.
        
        IMPORTANT: For any response longer than a brief answer, include paragraph breaks to make your responses more readable.`
      };
      
      // Format conversation for Groq
      const formattedMessages = [
        systemMessage,
        ...messages.filter(m => m.role !== "system").map(m => ({
          role: m.role,
          content: m.content
        }))
      ];
      
      // Call Groq API directly using fetch for enhanced sarcasm and humor
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: formattedMessages,
          max_tokens: 1000,
          temperature: 0.95, // Higher temperature for more creative responses
          top_p: 0.9
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API error: ${response.status} ${errorText}`);
      }
      
      const responseData = await response.json() as { 
        choices: Array<{ 
          message: { 
            content: string 
          } 
        }> 
      };
      const aiMessage = responseData.choices[0].message.content;
      
      await storage.saveMessage({
        role: "assistant",
        content: aiMessage || "I seem to be having a mental breakdown. Try again?",
      });
      
      return res.json({ response: aiMessage });
    } catch (error) {
      console.error("Error generating AI response:", error);
      return res.status(500).json({ 
        message: "Failed to generate AI response",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
