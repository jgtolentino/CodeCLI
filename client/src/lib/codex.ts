export interface CodexConfig {
  templateDir: string;
  dataDir: string;
  outputDir: string;
  variables?: Record<string, string>;
  plugins?: string[];
}

export interface SiteData {
  title: string;
  message: string;
  [key: string]: any;
}

export interface BuildResult {
  pagesGenerated: number;
  timeInMs: number;
  success: boolean;
  error?: string;
}

export async function buildSite(): Promise<BuildResult> {
  try {
    const startTime = Date.now();
    const response = await fetch('/api/build', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      const error = await response.text();
      return {
        pagesGenerated: 0,
        timeInMs: Date.now() - startTime,
        success: false,
        error
      };
    }
    
    const result = await response.json();
    return {
      ...result,
      timeInMs: Date.now() - startTime,
      success: true
    };
  } catch (error) {
    return {
      pagesGenerated: 0,
      timeInMs: 0,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function getConfig(): Promise<CodexConfig> {
  const response = await fetch('/api/config');
  if (!response.ok) {
    throw new Error(`Failed to fetch config: ${await response.text()}`);
  }
  return response.json();
}

export async function getSiteData(): Promise<SiteData> {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error(`Failed to fetch site data: ${await response.text()}`);
  }
  return response.json();
}
