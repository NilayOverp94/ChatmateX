import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Chat messages model
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  role: text("role").notNull(), // 'user', 'assistant', or 'system'
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  userId: true,
  role: true,
  content: true,
});

// Conversations model
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  title: text("title"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertConversationSchema = createInsertSchema(conversations).pick({
  userId: true,
  title: true,
});

// Chat settings model
export const chatSettings = pgTable("chat_settings", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id).notNull().unique(),
  sarcasmLevel: text("sarcasm_level").default("maximum").notNull(),
  adultContentEnabled: text("adult_content_enabled").default("true").notNull(),
  settings: jsonb("settings").default({}).notNull(),
});

export const insertChatSettingsSchema = createInsertSchema(chatSettings).pick({
  userId: true,
  sarcasmLevel: true,
  adultContentEnabled: true,
  settings: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Conversation = typeof conversations.$inferSelect;

export type InsertChatSettings = z.infer<typeof insertChatSettingsSchema>;
export type ChatSettings = typeof chatSettings.$inferSelect;
