import { insertUserSchema, type User, type InsertUser } from "@shared/schema";

// Define types for chat messages
interface ChatMessage {
  role: string;
  content: string;
  timestamp?: string;
}

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveMessage(message: ChatMessage): Promise<void>;
  getConversationHistory(): Promise<ChatMessage[]>;
  clearConversationHistory(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: ChatMessage[];
  currentId: number;

  constructor() {
    this.users = new Map();
    this.messages = [];
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async saveMessage(message: ChatMessage): Promise<void> {
    // Add timestamp if not provided
    if (!message.timestamp) {
      message.timestamp = new Date().toISOString();
    }
    
    this.messages.push(message);
  }
  
  async getConversationHistory(): Promise<ChatMessage[]> {
    return [...this.messages];
  }
  
  async clearConversationHistory(): Promise<void> {
    this.messages = [];
  }
}

export const storage = new MemStorage();
