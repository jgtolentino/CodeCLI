import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the configuration schema
export const configSchema = z.object({
  templateDir: z.string(),
  dataDir: z.string(),
  outputDir: z.string(),
  variables: z.record(z.string()).optional(),
  plugins: z.array(z.string()).optional()
});

export type CodexConfig = z.infer<typeof configSchema>;

// Define the site data schema
export const siteDataSchema = z.object({
  title: z.string(),
  message: z.string()
}).catchall(z.any());

export type SiteData = z.infer<typeof siteDataSchema>;

// Build result schema
export const buildResultSchema = z.object({
  pagesGenerated: z.number(),
  timeInMs: z.number(),
  success: z.boolean(),
  error: z.string().optional()
});

export type BuildResult = z.infer<typeof buildResultSchema>;

// Database table for users (keep this for compatibility)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
