import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const participants = pgTable("participants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  sessionId: integer("session_id").notNull(),
  completedAt: text("completed_at").notNull(),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
});

export const insertParticipantSchema = createInsertSchema(participants).pick({
  name: true,
  email: true,
  sessionId: true,
});

export const insertSessionSchema = createInsertSchema(sessions).pick({
  title: true,
  description: true,
  isActive: true,
});

export type InsertParticipant = z.infer<typeof insertParticipantSchema>;
export type Participant = typeof participants.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;

// Badge generation request schema
export const badgeGenerationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  sessionId: z.number().min(1).max(6),
});

export type BadgeGenerationRequest = z.infer<typeof badgeGenerationSchema>;
