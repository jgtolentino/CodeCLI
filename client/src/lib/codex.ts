import { buildSite, renderTemplate, readDataFile } from './codex/index';

// Export the core functions
export {
  buildSite,
  renderTemplate,
  readDataFile
};

// Main interface for the Codex configuration
export interface CodexConfig {
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
  plugins?: Plugin[];
}

// Plugin interface for extending Codex functionality
export interface Plugin {
  name: string;
  options?: Record<string, any>;
  beforeBuild?: (config: CodexConfig) => Promise<void>;
  beforeRender?: (templates: string[], data: object) => Promise<{ templates: string[], data: object }>;
  afterRender?: (renderedFiles: { path: string, content: string }[]) => Promise<{ path: string, content: string }[]>;
  afterBuild?: (stats: BuildStats) => Promise<void>;
}

// Build statistics interface
export interface BuildStats {
  startTime: Date;
  endTime: Date;
  totalTime: number;
  filesGenerated: number;
  templatesProcessed: number;
}

// Default config values
export const defaultConfig: CodexConfig = {
  site: {
    name: 'Codex Site',
    description: 'A site built with Codex',
    baseUrl: 'http://localhost:1227'
  },
  build: {
    inputDir: './template',
    outputDir: './out',
    dataDir: './data'
  },
  server: {
    port: 1227
  }
};
