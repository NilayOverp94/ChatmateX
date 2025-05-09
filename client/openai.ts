import { apiRequest } from "./queryClient";
import { Message } from "@/types/chat";

// Function to generate a response from OpenAI
export async function generateAIResponse(messages: Message[]): Promise<string> {
  try {
    const response = await apiRequest("POST", "/api/chat", { messages });
    if (!response.ok) {
      throw new Error("Failed to generate AI response");
    }
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I seem to be having a mental breakdown. Maybe I need therapy too. Try again?";
  }
}
