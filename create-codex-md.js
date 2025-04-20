#!/usr/bin/env node
// Simple script to create CODEX.md file

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  appName: 'Codex',
  mdFilename: 'CODEX.md'
};

/**
 * Generate CODEX.md file content
 * @returns {string} File content
 */
function generateCodexMdContent() {
  return `# ${config.appName} Project Guidelines

## Project Overview
This is a ${config.appName} project with OpenAI API integration and optimization.

## How to use ${config.appName}
1. Set up your environment with \`/setup\` command
2. Enable API integration with \`/api\` command
3. Use clear, specific instructions for best results
4. Use the MCP filesystem server for improved context gathering

## Commands
- \`/help\` - Show available commands
- \`/init\` - Create this ${config.mdFilename} file
- \`/terminal-setup\` - Set up terminal integration
- \`/test-openai\` - Test OpenAI API connectivity
- \`/build\` - Build the static site
- \`/serve\` - Start the development server
- \`/api\` - Enable API integration with optimization
- \`/install-mcp\` - Start the MCP filesystem server

## Project Structure
- \`mysite/\` - Main project directory
  - \`data/\` - JSON data files
  - \`template/\` - HTML templates
  - \`out/\` - Generated output
  - \`codex.json\` - Configuration file
  - \`build.js\` - Build script
  - \`server.js\` - Development server
  - \`generate-content.js\` - Content generator using OpenAI
- \`codex-cli.js\` - Interactive CLI
- \`run.sh\` - Main shell script

## Optimization Pipeline
The optimization pipeline reduces token usage by 90% through:
1. Context gathering with MCP filesystem server
2. Prompt optimization with Clod
3. Efficient API calls to OpenAI

## Tips for Best Results
- Use specific, clear instructions
- Launch in a project directory rather than home directory
- Be concise and direct in your requests
- Provide relevant context when needed
`;
}

// Create the file
try {
  const cwd = process.cwd();
  console.log(`Creating ${config.mdFilename} file in: ${cwd}`);
  const content = generateCodexMdContent();
  const filePath = path.join(cwd, config.mdFilename);
  console.log(`Writing to: ${filePath}`);
  
  fs.writeFileSync(filePath, content);
  console.log(`✓ Created ${config.mdFilename} file in the current directory`);
} catch (error) {
  console.error(`Error creating ${config.mdFilename}: ${error.message}`);
  console.error(`Stack trace: ${error.stack}`);
  process.exit(1);
}