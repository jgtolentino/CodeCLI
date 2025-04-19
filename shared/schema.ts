import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Main configuration schema
export interface BuildConfig {
  site: {
    name: string;
    description?: string;
    baseUrl?: string;
  };
  build: {
    inputDir: string;
    outputDir: string;
    dataDir: string;
  };
  server: {
    port: number;
  };
  plugins?: any[];
}

// Template schema
export interface Template {
  name: string;
  content: string;
}

// Data file schema
export interface DataFile {
  name: string;
  content: any;
}

// Build result schema
export interface BuildResult {
  startTime: Date;
  endTime: Date;
  duration: number;
  filesGenerated: number;
  success: boolean;
}

// Build status schema
export interface BuildStatus {
  isBuilding: boolean;
  lastBuild: Date | null;
  error: string | null;
  lastBuildResult?: BuildResult | null;
}

// Database schemas
export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content").notNull(),
});

export const dataFiles = pgTable("data_files", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: jsonb("content").notNull(),
});

export const buildLogs = pgTable("build_logs", {
  id: serial("id").primaryKey(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  duration: integer("duration").notNull(),
  filesGenerated: integer("files_generated").notNull(),
  success: boolean("success").notNull(),
  error: text("error"),
});

// Zod schemas for validation
export const buildConfigSchema = z.object({
  site: z.object({
    name: z.string(),
    description: z.string().optional(),
    baseUrl: z.string().optional(),
  }),
  build: z.object({
    inputDir: z.string(),
    outputDir: z.string(),
    dataDir: z.string(),
  }),
  server: z.object({
    port: z.number(),
  }),
  plugins: z.array(z.any()).optional(),
});

export const templateSchema = z.object({
  name: z.string(),
  content: z.string(),
});

export const dataFileSchema = z.object({
  name: z.string(),
  content: z.any(),
});

// Insert schemas
export const insertTemplateSchema = createInsertSchema(templates);
export const insertDataFileSchema = createInsertSchema(dataFiles);
export const insertBuildLogSchema = createInsertSchema(buildLogs);

// Types
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type InsertDataFile = z.infer<typeof insertDataFileSchema>;
export type InsertBuildLog = z.infer<typeof insertBuildLogSchema>;
export type TemplateType = typeof templates.$inferSelect;
export type DataFileType = typeof dataFiles.$inferSelect;
export type BuildLogType = typeof buildLogs.$inferSelect;
