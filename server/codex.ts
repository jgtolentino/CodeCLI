import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

interface CodexConfig {
  templateDir: string;
  dataDir: string;
  outputDir: string;
  variables?: Record<string, string>;
  plugins?: string[];
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mysitePath = path.join(__dirname, '..', 'mysite');

function readConfig(): CodexConfig {
  try {
    // First try to read from environment variables
    const envConfig = {
      templateDir: process.env.TEMPLATE_DIR,
      dataDir: process.env.DATA_DIR,
      outputDir: process.env.OUTPUT_DIR,
    };
    
    // If all env variables are present, use them
    if (envConfig.templateDir && envConfig.dataDir && envConfig.outputDir) {
      return envConfig as CodexConfig;
    }
    
    // Otherwise, fall back to codex.json
    const configPath = path.join(mysitePath, 'codex.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    // Validate required fields
    if (!config.templateDir || !config.dataDir || !config.outputDir) {
      throw new Error('Missing required fields in codex.json: templateDir, dataDir, and outputDir are required');
    }
    
    return config;
  } catch (error) {
    console.error('Error reading configuration:', error);
    process.exit(1);
  }
}

function readDataFiles(dataDir: string): Record<string, any> {
  const dataPath = path.join(mysitePath, dataDir);
  const files = fs.readdirSync(dataPath).filter(file => file.endsWith('.json'));
  
  const data: Record<string, any> = {};
  
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(dataPath, file), 'utf8');
      const json = JSON.parse(content);
      const name = path.basename(file, '.json');
      data[name] = json;
    } catch (error) {
      console.error(`Error reading data file ${file}:`, error);
      process.exit(1);
    }
  }
  
  return data;
}

function processTemplate(template: string, data: Record<string, any>): string {
  let processedTemplate = template;
  
  // Process simple variable replacements: {{variable}}
  processedTemplate = processedTemplate.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? String(data[key]) : match;
  });
  
  // Process unescaped HTML content: {{{variable}}}
  processedTemplate = processedTemplate.replace(/\{\{\{(\w+)\}\}\}/g, (match, key) => {
    return data[key] !== undefined ? String(data[key]) : match;
  });
  
  // Process array iterations: {{#array}}...{{/array}}
  const arrayRegex = /\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
  let arrayMatch;
  
  while ((arrayMatch = arrayRegex.exec(template)) !== null) {
    const [fullMatch, arrayKey, itemTemplate] = arrayMatch;
    
    if (data[arrayKey] && Array.isArray(data[arrayKey])) {
      const items = data[arrayKey];
      let replacement = '';
      
      for (const item of items) {
        let itemHtml = itemTemplate;
        
        // Replace item properties
        for (const [key, value] of Object.entries(item)) {
          const itemRegex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
          itemHtml = itemHtml.replace(itemRegex, String(value));
        }
        
        replacement += itemHtml;
      }
      
      processedTemplate = processedTemplate.replace(fullMatch, replacement);
    }
  }
  
  return processedTemplate;
}

function buildSite(): number {
  const config = readConfig();
  console.log('Codex v1.0.0');
  
  // Read data files
  console.log(`✓ Reading ${config.dataDir}/*.json`);
  const dataFiles = readDataFiles(config.dataDir);
  
  // Create output directory if it doesn't exist
  const outputPath = path.join(mysitePath, config.outputDir);
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  
  console.log('✓ Processing templates');
  
  let pagesGenerated = 0;
  
  // Process each data file
  for (const [name, data] of Object.entries(dataFiles)) {
    const templateFile = path.join(mysitePath, config.templateDir, 'index.html');
    
    // Skip if template doesn't exist
    if (!fs.existsSync(templateFile)) {
      console.error(`Template file ${templateFile} does not exist`);
      continue;
    }
    
    try {
      const template = fs.readFileSync(templateFile, 'utf8');
      const processed = processTemplate(template, data);
      
      // Write processed template to output directory
      const outputFile = path.join(outputPath, `${name === 'site' ? 'index' : name}.html`);
      fs.writeFileSync(outputFile, processed);
      pagesGenerated++;
    } catch (error) {
      console.error(`Error processing template for ${name}:`, error);
    }
  }
  
  console.log(`✓ Generated ${pagesGenerated} pages to ${path.join('/', config.outputDir)}/`);
  return pagesGenerated;
}

// If this file is run directly, execute the build
if (import.meta.url === `file://${process.argv[1]}`) {
  const startTime = Date.now();
  buildSite();
  console.log(`Build completed in ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
}

export { buildSite, readConfig, readDataFiles };
