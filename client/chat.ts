export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  messages: Message[];
  title?: string;
  createdAt: string;
  updatedAt: string;
}
