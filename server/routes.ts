import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import { buildSite, readConfig, readDataFiles } from "./codex";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for Codex
  app.get('/api/config', (req, res) => {
    try {
      const config = readConfig();
      res.json(config);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.get('/api/data', (req, res) => {
    try {
      const config = readConfig();
      const dataFiles = readDataFiles(config.dataDir);
      const siteData = dataFiles.site || {};
      res.json(siteData);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.post('/api/build', (req, res) => {
    try {
      const startTime = Date.now();
      const pagesGenerated = buildSite();
      const buildTime = Date.now() - startTime;
      
      res.json({
        pagesGenerated,
        timeInMs: buildTime,
        success: true
      });
    } catch (error) {
      res.status(500).json({
        pagesGenerated: 0,
        timeInMs: 0,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Generate Content with OpenAI
  app.post('/api/generate-content', (req, res) => {
    try {
      const { topic } = req.body || {};
      console.log('Generating content about:', topic || 'Codex Static Site Generator');
      
      // Run the generate-content.js script
      const generatePath = path.join(process.cwd(), 'mysite', 'generate-content.js');
      
      // Make the script executable if it's not already
      try {
        fs.chmodSync(generatePath, '755');
      } catch (error) {
        console.warn(`Warning: Could not make script executable: ${error.message}`);
      }
      
      // Spawn the generate-content.js process
      const generateProcess = spawn('node', [
        generatePath,
        topic || 'Codex Static Site Generator'
      ]);
      
      let output = '';
      let errorOutput = '';
      
      generateProcess.stdout.on('data', (data) => {
        output += data.toString();
        console.log(`Content generation: ${data.toString().trim()}`);
      });
      
      generateProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
        console.error(`Content generation error: ${data.toString().trim()}`);
      });
      
      generateProcess.on('close', (code) => {
        if (code === 0) {
          // Content generation successful
          res.json({
            success: true,
            message: 'Content generated successfully',
            output
          });
        } else {
          // Content generation failed
          res.status(500).json({
            success: false,
            message: 'Content generation failed',
            output: errorOutput || output
          });
        }
      });
    } catch (error) {
      console.error('Error generating content:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
