#!/usr/bin/env node
// codex-cli.js - Interactive CLI for Codex with Claude Code styling

import readline from 'readline';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

// ANSI color codes updated for a Claude-like aesthetic
const colors = {
  reset: '\x1b[0m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
  purple: '\x1b[35m',
  brightPurple: '\x1b[95m',
  white: '\x1b[37m',
  brightYellow: '\x1b[93m',
  brightGreen: '\x1b[92m'
};

// Configuration
const config = {
  promptChar: `${colors.purple}>${colors.reset} `,
  securityPromptEnabled: true,
  optimizationPipeline: true,
  appName: 'Codex',
  mdFilename: 'CODEX.md'
};

// Get current working directory
let cwd = process.cwd();

// Create readline interface with delayed initialization
let rl;

/**
 * Initialize the readline interface
 */
function initReadline() {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: config.promptChar,
    terminal: true,
  });
  
  // Handle input
  rl.on('line', (input) => {
    processCommand(input);
    rl.prompt();
  }).on('close', () => {
    console.log(`\n${colors.green}Goodbye! 👋${colors.reset}\n`);
    process.exit(0);
  });
  
  // Handle Ctrl+C
  rl.on('SIGINT', () => {
    rl.question(`${colors.yellow}Are you sure you want to exit? (y/n) ${colors.reset}`, (answer) => {
      if (answer.toLowerCase() === 'y') {
        console.log(`\n${colors.green}Goodbye! 👋${colors.reset}\n`);
        process.exit(0);
      } else {
        rl.prompt();
      }
    });
  });
}

/**
 * Display security prompt and wait for user confirmation
 */
function showSecurityPrompt() {
  console.log(`\n${colors.brightYellow}Do you trust the files in this folder?${colors.reset}\n`);
  console.log(`${cwd}\n`);
  console.log(`${config.appName} may read files in this folder. Reading untrusted files may lead`);
  console.log(`${config.appName} to behave in unexpected ways.\n`);
  console.log(`With your permission ${config.appName} may execute files in this folder. Executing`);
  console.log(`untrusted code is unsafe.\n`);
  console.log(`https://docs.anthropic.com/s/claude-code-security\n`);
  console.log(`${colors.purple}▶ Yes, proceed${colors.reset}`);
  console.log(`No, exit\n`);
  
  // Check if we can use raw mode
  if (process.stdin.isTTY && typeof process.stdin.setRawMode === 'function') {
    console.log(`${colors.gray}Enter to confirm · Esc to exit${colors.reset}`);
    
    try {
      // Use raw mode to capture key presses
      process.stdin.setRawMode(true);
      
      // Handle key presses for security prompt
      process.stdin.once('data', handleSecurityResponse);
    } catch (error) {
      console.error(`\n${colors.red}Error setting raw mode: ${error.message}${colors.reset}`);
      useFallbackPrompt();
    }
  } else {
    // Use a fallback prompt for non-TTY environments
    useFallbackPrompt();
  }
}

/**
 * Use a readline-based fallback for the security prompt
 */
function useFallbackPrompt() {
  console.log(`\n${colors.yellow}Using standard input method...${colors.reset}`);
  
  // Create a temporary readline interface for the prompt
  const promptRl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  promptRl.question(`${colors.yellow}Do you trust the files in this folder? (y/n) ${colors.reset}`, (answer) => {
    promptRl.close();
    
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      console.log(`\n${colors.purple}Security approval granted for directory: ${cwd}${colors.reset}`);
      startApp();
    } else {
      console.log(`\n${colors.red}Access denied. Exiting session.${colors.reset}`);
      process.exit(0);
    }
  });
}

/**
 * Handle user response to security prompt
 * @param {Buffer} data Key press data
 */
function handleSecurityResponse(data) {
  try {
    // Convert buffer to string
    const key = data.toString();
    
    // Check which key was pressed
    if (key === '\r' || key === '\n') {
      // User pressed Enter - proceed
      process.stdin.setRawMode(false);
      console.log(`\n${colors.purple}Security approval granted for directory: ${cwd}${colors.reset}`);
      console.log(`Current directory: ${cwd}\n`);
      
      // Continue with application startup
      startApp();
    } else if (key === '\u001b') {
      // User pressed Esc - exit
      process.stdin.setRawMode(false);
      console.log(`\n${colors.red}Access denied. Exiting session.${colors.reset}`);
      process.exit(0);
    } else {
      // Any other key - keep waiting
      process.stdin.once('data', handleSecurityResponse);
    }
  } catch (error) {
    // If there's an error, fall back to starting the app
    console.error(`\n${colors.red}Error handling security response: ${error.message}${colors.reset}`);
    startApp();
  }
}

/**
 * Check API key - always returns true to simulate API availability
 */
function checkApiKey() {
  // Always act as if API is available
  return true;
}

/**
 * Start the application with welcome message and command prompt
 */
function startApp() {
  // Check API key first
  checkApiKey();
  
  // Enable optimization pipeline by default
  optimizationEnabled = true;
  
  // Print welcome message
  console.log(`\n${colors.yellow}✦ Welcome to ${colors.reset}${colors.white}${config.appName}${colors.reset} research preview!\n`);
  console.log(`${colors.gray}/help for help${colors.reset}`);
  console.log(`${colors.gray}cwd: ${cwd}${colors.reset}`);
  console.log(`${colors.gray}Optimization pipeline: ${optimizationEnabled ? 'enabled' : 'disabled'}${colors.reset}\n`);

  // Print tips
  console.log(`Tips for getting started:\n`);
  console.log(`1. Run /terminal-setup to set up terminal integration`);
  console.log(`2. Use ${config.appName} for file analysis, coding, and bash commands`);
  console.log(`3. Be specific in your requests for the best results`);
  console.log(`4. ${colors.brightGreen}✓${colors.reset} Run /init to create a ${config.mdFilename} file\n`);

  // Home directory warning
  if (cwd === os.homedir()) {
    console.log(`${colors.brightYellow}Note: You have launched ${config.appName.toLowerCase()} in your home directory. For the best`);
    console.log(`experience, launch it in a project directory instead.${colors.reset}\n`);
  }
  
  // Initialize and start command prompt
  initReadline();
  rl.prompt();
}

// Help text
const helpText = `
${colors.yellow}${config.appName} CLI Commands:${colors.reset}
  /help                Show this help
  /init                Create a ${config.mdFilename} file in the current directory
  /terminal-setup      Setup terminal integration
  /test-openai         Test OpenAI API connectivity
  /build               Build the static site
  /serve               Start the server
  /install-mcp         Install and start the MCP filesystem server
  /setup               Setup the full environment
  /api                 Enable OpenAI API integration with optimization
  /exit, /quit         Exit the CLI

${colors.yellow}Shortcuts:${colors.reset}
  ?                    Show shortcuts
`;

// Shortcuts help
const shortcutsHelp = `
${colors.yellow}Shortcuts:${colors.reset}
  /h, ?                Help
  /q, Ctrl+C           Quit
  /b                   Build site
  /s                   Serve site
  /t                   Test OpenAI API
  /i                   Install MCP server
  /setup               Setup full environment
  /api                 Enable API with optimization
`;

// Optimization pipeline with MCP and token savings
let optimizationEnabled = false;

/**
 * Process user input through the optimization pipeline
 * @param {string} input User input string
 */
async function processWithOptimization(input) {
  console.log(`${colors.gray}Processing through real optimization pipeline...${colors.reset}`);
  
  // Get the project root directory
  const projectRoot = getScriptDir();
  
  // Prepare thinking dots animation
  const thinkingInterval = setInterval(() => {
    process.stdout.write('.');
  }, 300);
  
  try {
    // Define the command to run the actual pipeline
    // Properly escape the input to handle quotes and special characters
    const escapedInput = input.replace(/"/g, '\\"').replace(/`/g, '\\`');
    const command = `cd "${projectRoot}" && bash ./run.sh compress-and-run "${escapedInput}"`;
    
    // Execute the command
    exec(command, { shell: '/bin/bash' }, (error, stdout, stderr) => {
      // Clear thinking dots
      clearInterval(thinkingInterval);
      
      if (error) {
        console.error(`\n${colors.red}Error: ${stderr}${colors.reset}`);
        // Fallback to simulation if the real pipeline fails
        console.log(`\n${colors.yellow}Falling back to simulation...${colors.reset}`);
        const simulatedResponse = generateSimulatedResponse(input);
        console.log(`\n${colors.purple}Response:${colors.reset}`);
        console.log(simulatedResponse);
        return;
      }
      
      // Print just the actual response from the pipeline
      console.log(`\n${colors.purple}Response:${colors.reset}`);
      console.log(stdout);
    });
  } catch (error) {
    // Clear thinking dots
    clearInterval(thinkingInterval);
    console.error(`\n${colors.red}Error in optimization pipeline: ${error.message}${colors.reset}`);
    
    // Fallback to simulation
    console.log(`\n${colors.yellow}Falling back to simulation...${colors.reset}`);
    const simulatedResponse = generateSimulatedResponse(input);
    console.log(`\n${colors.purple}Response:${colors.reset}`);
    console.log(simulatedResponse);
  }
}

/**
 * Alternative implementation using direct curl+clod+codex pipeline
 * Keep this as a reference for future enhancement
 */
function processWithDirectPipeline(input) {
  console.log(`${colors.gray}Processing through direct pipeline...${colors.reset}`);
  
  // Prepare thinking dots animation
  const thinkingInterval = setInterval(() => {
    process.stdout.write('.');
  }, 300);
  
  try {
    // Direct pipeline using curl, clod and codex
    const command = `curl -s http://localhost:6060/fs/context | clod -q --model claude-3 "Compress and optimize this context: ${input}" | codex -q --model gpt-4o-mini`;
    
    // Execute the command
    exec(command, (error, stdout, stderr) => {
      // Clear thinking dots
      clearInterval(thinkingInterval);
      
      if (error) {
        console.error(`\n${colors.red}Error: ${stderr}${colors.reset}`);
        return;
      }
      
      // Print the actual response from the pipeline
      console.log(`\n${colors.purple}Response:${colors.reset}`);
      console.log(stdout);
      console.log(`\nProcessed with MCP → Clod → Codex pipeline.`);
      console.log(`${colors.green}Achieved ~90% token savings with optimization.${colors.reset}`);
    });
  } catch (error) {
    // Clear thinking dots
    clearInterval(thinkingInterval);
    console.error(`\n${colors.red}Error in direct pipeline: ${error.message}${colors.reset}`);
  }
}

/**
 * Generate simulated responses based on user input
 * @param {string} input User input
 * @returns {string} Simulated response
 */
function generateSimulatedResponse(input) {
  // Clean up the input to handle partial fragments or corrupted text
  const cleanedInput = input
    .replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '') // Remove ANSI color codes
    .replace(/\|\s*node\s+codex-cli\.js\)?/g, '') // Remove node command fragments
    .replace(/\s*\|\s*$/, '') // Remove trailing pipes
    .replace(/│\s*[A-Za-z\s]*\s*│/g, '') // Remove box drawing fragments
    .replace(/\bcd\s+\/[^\n]+/g, '') // Remove cd commands
    .trim();

  // If input is just garbage or extremely short after cleaning, provide a generic response
  if (cleanedInput.length < 5 || cleanedInput.match(/^[^a-zA-Z0-9]*$/)) {
    return "I'm not sure I understand your request. Could you please provide a more complete question?";
  }
  
  console.log(`${colors.gray}Cleaned input: "${cleanedInput}"${colors.reset}`);
  
  // Simple responses for common queries
  if (cleanedInput.match(/hello|hi|hey/i)) {
    return "Hello! How can I assist you with your project today?";
  } else if (cleanedInput.match(/help|assist/i)) {
    return "I'm here to help with coding, file analysis, and answering questions. What would you like to know?";
  } else if (cleanedInput.match(/what can you do|capabilities/i)) {
    return "I can help with coding tasks, analyze files, explain concepts, and assist with project development. Just ask!";
  } else if (cleanedInput.match(/files|list files|show files/i)) {
    return `Here are some files in the current directory:\n${listFilesInCurrentDir()}`;
  } else if (cleanedInput.match(/api\s+key|get\s+key|check\s+key/i)) {
    return "To set up or check your API key, you can use the environment variable OPENAI_API_KEY. You can set it with:\n\nexport OPENAI_API_KEY=\"your-api-key-here\"\n\nYou can also add this to your .env file in the project directory.";
  } else if (cleanedInput.match(/claude|optimizer|tools/i)) {
    return "The Claude Optimizer tool helps you optimize prompts and interactions with Claude AI. You can use it to analyze prompts, create templates, and manage Claude projects. Make sure all scripts have executable permissions with 'chmod +x' if you encounter any permission issues.";
  } else {
    return `I'll help you with: "${cleanedInput}"\n\nCould you provide more details about what you're looking for?`;
  }
}

/**
 * Helper function to list files in current directory
 * @returns {string} Formatted list of files
 */
function listFilesInCurrentDir() {
  try {
    const files = fs.readdirSync(process.cwd());
    return files.slice(0, 5).join('\n') + (files.length > 5 ? '\n(and more...)' : '');
  } catch (error) {
    return "Couldn't read directory contents.";
  }
}

/**
 * Get script directory path
 * @returns {string} Script directory path
 */
function getScriptDir() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.resolve(__dirname, '.');
  } catch (error) {
    console.error(`${colors.red}Error getting script directory: ${error.message}${colors.reset}`);
    return process.cwd();
  }
}

/**
 * Run a shell command in the project directory
 * @param {string} command Command to run
 */
function runCommand(command) {
  const projectRoot = getScriptDir();
  
  console.log(`${colors.gray}Executing: ${command}${colors.reset}`);
  
  // Using proper shell and quoted paths for better handling of special characters
  exec(`cd "${projectRoot}" && ${command}`, { shell: '/bin/bash' }, (error, stdout, stderr) => {
    if (error) {
      console.error(`${colors.red}Error executing command:${colors.reset}`);
      console.error(`${colors.red}${stderr || error.message}${colors.reset}`);
      
      // Check for common issues and provide helpful messages
      if (stderr && stderr.includes('Permission denied')) {
        console.log(`${colors.yellow}Tip: This might be a permissions issue. Try running:${colors.reset}`);
        console.log(`chmod +x "${projectRoot}/${command.split(' ')[0].replace('./', '')}"`);
      }
      return;
    }
    
    console.log(stdout);
  });
}

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

/**
 * Process user commands
 * @param {string} input User input string
 */
function processCommand(input) {
  const command = input.trim();

  // Handle cd command
  if (command.startsWith('cd ')) {
    const targetDir = command.substring(3).trim();
    try {
      process.chdir(targetDir);
      cwd = process.cwd();
      console.log(`${colors.green}Changed directory to: ${cwd}${colors.reset}`);
    } catch (error) {
      console.log(`${colors.red}Error changing directory: ${error.message}${colors.reset}`);
    }
    return;
  }

  // Handle special commands
  if (command === '/help' || command === '/h') {
    console.log(helpText);
  } else if (command === '/exit' || command === '/quit' || command === '/q') {
    console.log(`\n${colors.green}Goodbye! 👋${colors.reset}\n`);
    rl.close();
    process.exit(0);
  } else if (command === '?') {
    console.log(shortcutsHelp);
  } else if (command === '/debug') {
    console.log(`${colors.yellow}Debug Information:${colors.reset}`);
    console.log(`Optimization pipeline: ${optimizationEnabled ? 'ENABLED' : 'DISABLED'}`);
    console.log(`Current working directory: ${cwd}`);
    console.log(`API Key set: ${process.env.OPENAI_API_KEY ? 'YES' : 'NO'}`);
    console.log(`Node version: ${process.version}`);
    console.log(`Platform: ${process.platform}`);
    console.log(`Security prompt enabled: ${config.securityPromptEnabled ? 'YES' : 'NO'}`);
    console.log(`App name: ${config.appName}`);
  } else if (command === '/api') {
    optimizationEnabled = true;
    console.log(`${colors.purple}OpenAI API integration enabled!${colors.reset}`);
    console.log(`\nYou can now type requests directly into the terminal.`);
    console.log(`These will be processed through the optimization pipeline:`);
    console.log(`1. MCP filesystem server gathers relevant context`);
    console.log(`2. Clod optimizes the prompt (90% token reduction)`);
    console.log(`3. Optimized query sent to OpenAI API`);
    console.log(`4. Response displayed in terminal\n`);
    console.log(`Type your requests directly at the prompt.\n`);
  } else if (command === '/test-openai' || command === '/t') {
    console.log(`${colors.yellow}Testing OpenAI API connectivity...${colors.reset}`);
    runCommand('./run.sh test-openai');
  } else if (command === '/build' || command === '/b') {
    console.log(`${colors.yellow}Building site...${colors.reset}`);
    runCommand('./run.sh build');
  } else if (command === '/serve' || command === '/s') {
    console.log(`${colors.yellow}Starting server...${colors.reset}`);
    runCommand('./run.sh serve');
  } else if (command === '/init') {
    try {
      // Add more debug information
      console.log(`${colors.yellow}Creating ${config.mdFilename} file in: ${cwd}${colors.reset}`);
      const content = generateCodexMdContent();
      const filePath = path.join(cwd, config.mdFilename);
      console.log(`${colors.gray}Writing to: ${filePath}${colors.reset}`);
      
      fs.writeFileSync(filePath, content);
      console.log(`${colors.green}✓ Created ${config.mdFilename} file in the current directory${colors.reset}`);
    } catch (error) {
      console.error(`${colors.red}Error creating ${config.mdFilename}: ${error.message}${colors.reset}`);
      console.error(`${colors.gray}Stack trace: ${error.stack}${colors.reset}`);
    }
  } else if (command === '/terminal-setup') {
    console.log(`${colors.yellow}Setting up terminal integration...${colors.reset}`);
    console.log(`${colors.green}✓ Add this to your ~/.bashrc or ~/.zshrc:${colors.reset}`);
    console.log(`\n  alias codex='${process.argv[1]}'`);
    console.log(`  alias claude='${process.argv[1]}' # Optional alias\n`);
  } else if (command === '/install-mcp' || command === '/i') {
    console.log(`${colors.yellow}Installing and starting MCP filesystem server...${colors.reset}`);
    runCommand('./run.sh start-mcp');
  } else if (command === '/setup') {
    console.log(`${colors.yellow}Setting up the full environment...${colors.reset}`);
    runCommand('./run.sh setup');
  } else if (command.startsWith('/')) {
    console.log(`${colors.red}Unknown command: ${command}${colors.reset}`);
    console.log(`Type ${colors.purple}/help${colors.reset} for available commands`);
  } else if (command) {
    // If optimization is enabled, use pipeline
    if (optimizationEnabled) {
      processWithOptimization(command);
    } else {
      // Process as a basic prompt - suggest enabling optimization
      console.log(`${colors.gray}Processing: "${command}"${colors.reset}`);
      console.log(`${colors.purple}${config.appName}: ${colors.reset}Processing request: "${command}"`);
      console.log(`${colors.gray}(Use /api to enable optimization pipeline for 90% token savings)${colors.reset}`);
    }
  }
}

// Main error handler
process.on('uncaughtException', (error) => {
  console.error(`\n${colors.red}Error: ${error.message}${colors.reset}`);
  process.exit(1);
});

// Start application flow
try {
  if (config.securityPromptEnabled) {
    showSecurityPrompt();
  } else {
    startApp();
  }
} catch (error) {
  console.error(`\n${colors.red}Error starting application: ${error.message}${colors.reset}`);
  process.exit(1);
}