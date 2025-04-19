import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for the Codex site generator
  app.get('/api/config', (req: Request, res: Response) => {
    const config = storage.getConfig();
    res.json(config);
  });

  // API route to get all templates
  app.get('/api/templates', (req: Request, res: Response) => {
    const templates = storage.getAllTemplates();
    res.json(templates);
  });

  // API route to get a specific template
  app.get('/api/templates/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const template = storage.getTemplate(name);
    
    if (!template) {
      return res.status(404).json({ message: `Template ${name} not found` });
    }
    
    res.json(template);
  });

  // API route to get all data files
  app.get('/api/data', (req: Request, res: Response) => {
    const data = storage.getAllData();
    res.json(data);
  });

  // API route to get a specific data file
  app.get('/api/data/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const data = storage.getData(name);
    
    if (!data) {
      return res.status(404).json({ message: `Data file ${name} not found` });
    }
    
    res.json(data);
  });

  // API route to build the site
  app.post('/api/build', async (req: Request, res: Response) => {
    try {
      const result = await storage.buildSite();
      res.json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ message: `Build failed: ${errorMessage}` });
    }
  });

  // API route to get build status/result
  app.get('/api/build/status', (req: Request, res: Response) => {
    const buildStatus = storage.getBuildStatus();
    res.json(buildStatus);
  });

  const httpServer = createServer(app);
  return httpServer;
}
