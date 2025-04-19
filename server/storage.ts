import { BuildConfig, Template, DataFile, BuildResult, BuildStatus } from "@shared/schema";
import fs from "fs";
import path from "path";
import { buildSite as codexBuildSite } from "../client/src/lib/codex/index";

export interface IStorage {
  getConfig(): BuildConfig;
  updateConfig(config: BuildConfig): BuildConfig;
  getAllTemplates(): Template[];
  getTemplate(name: string): Template | undefined;
  getAllData(): DataFile[];
  getData(name: string): DataFile | undefined;
  buildSite(): Promise<BuildResult>;
  getBuildStatus(): BuildStatus;
}

export class MemStorage implements IStorage {
  private config: BuildConfig;
  private templates: Map<string, Template>;
  private dataFiles: Map<string, DataFile>;
  private buildStatus: BuildStatus;
  private buildResults: BuildResult | null;

  constructor() {
    this.config = {
      site: {
        name: "Codex Site",
        description: "A site built with Codex",
        baseUrl: "http://localhost:1227"
      },
      build: {
        inputDir: "./template",
        outputDir: "./out",
        dataDir: "./data"
      },
      server: {
        port: 1227
      }
    };
    
    this.templates = new Map();
    this.dataFiles = new Map();
    this.buildStatus = {
      isBuilding: false,
      lastBuild: null,
      error: null
    };
    this.buildResults = null;
    
    // Initialize with some example data
    this.initializeExampleData();
  }

  private initializeExampleData() {
    // Add example template
    this.templates.set("index.html", {
      name: "index.html",
      content: `<!DOCTYPE html>
<html>
<head>
  <title>{{title}}</title>
</head>
<body>
  <h1>{{title}}</h1>
  <p>{{message}}</p>
  
  <h2>Features</h2>
  <ul>
    {{#features}}
    <li>{{.}}</li>
    {{/features}}
  </ul>
</body>
</html>`
    });
    
    // Add example data file
    this.dataFiles.set("site.json", {
      name: "site.json",
      content: {
        title: "My Awesome Site",
        message: "Welcome to my static site generated with Codex!",
        features: [
          "Fast builds",
          "Simple templating",
          "JSON-driven content"
        ]
      }
    });
  }

  getConfig(): BuildConfig {
    return this.config;
  }

  updateConfig(config: BuildConfig): BuildConfig {
    this.config = { ...this.config, ...config };
    return this.config;
  }

  getAllTemplates(): Template[] {
    return Array.from(this.templates.values());
  }

  getTemplate(name: string): Template | undefined {
    return this.templates.get(name);
  }

  getAllData(): DataFile[] {
    return Array.from(this.dataFiles.values());
  }

  getData(name: string): DataFile | undefined {
    return this.dataFiles.get(name);
  }

  async buildSite(): Promise<BuildResult> {
    this.buildStatus.isBuilding = true;
    this.buildStatus.error = null;
    
    try {
      const startTime = new Date();
      
      // Ensure output directory exists
      const outputDir = path.resolve(process.cwd(), this.config.build.outputDir);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Get all templates and data
      const templates = this.getAllTemplates();
      const dataFiles = this.getAllData();
      
      // Perform the build using the Codex library
      const result = await codexBuildSite({
        templates,
        dataFiles,
        outputDir,
        config: this.config
      });
      
      const endTime = new Date();
      
      this.buildResults = {
        startTime,
        endTime,
        duration: endTime.getTime() - startTime.getTime(),
        filesGenerated: result.filesGenerated,
        success: true
      };
      
      this.buildStatus.lastBuild = new Date();
      this.buildStatus.isBuilding = false;
      
      return this.buildResults;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      this.buildStatus.isBuilding = false;
      this.buildStatus.error = errorMessage;
      
      throw new Error(`Build failed: ${errorMessage}`);
    }
  }

  getBuildStatus(): BuildStatus {
    return {
      ...this.buildStatus,
      lastBuildResult: this.buildResults
    };
  }
}

export const storage = new MemStorage();
