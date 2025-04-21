#!/usr/bin/env node
// codex-cli.js - Interactive CLI for Codex

const readline = require('readline');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// ANSI color codes for better terminal output
const colors = {
  reset: '\x1b[0m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  brightYellow: '\x1b[93m',
  brightGreen: '\x1b[92m',
};

// Check if OPENAI_API_KEY is set
if (!process.env.OPENAI_API_KEY) {
  console.error(`${colors.red}Error: OPENAI_API_KEY is not set in your environment.${colors.reset}`);
  console.log(`${colors.yellow}Please set it using: export OPENAI_API_KEY="your-api-key"${colors.reset}`);
  process.exit(1);
}

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${colors.blue}>${colors.reset} `,
  terminal: true,
});

// Get current working directory
const cwd = process.cwd();

// Print welcome message
console.log(`\n${colors.yellow}✦ Welcome to ${colors.reset}${colors.white}Codex${colors.reset} research preview!\n`);
console.log(`${colors.gray}/help for help${colors.reset}`);
console.log(`${colors.gray}cwd: ${cwd}${colors.reset}\n`);

// Print tips
console.log(`Tips for getting started:\n`);
console.log(`1. Run /terminal-setup to set up terminal integration`);
console.log(`2. Use Codex to help with file analysis, editing, bash commands and git`);
console.log(`3. Be as specific as you would with another engineer for the best results`);
console.log(`4. ${colors.brightGreen}✓${colors.reset} Run /init to create a CODEX.md file with instructions for Codex\n`);

// Home directory warning
if (cwd === os.homedir()) {
  console.log(`${colors.brightYellow}Note: You have launched codex in your home directory. For the best`);
  console.log(`experience, launch it in a project directory instead.${colors.reset}\n`);
}

// Help text
const helpText = `
${colors.yellow}Codex CLI Commands:${colors.reset}
  /help                Show this help
  /init                Create a CODEX.md file in the current directory
  /terminal-setup      Setup terminal integration
  /test-openai         Test OpenAI API connectivity
  /build               Build the static site
  /serve               Start the Codex server
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
  /t                   Test OpenAI
`;

// Process commands
function processCommand(input) {
  const command = input.trim();

  // Handle special commands
  if (command === '/help' || command === '/h') {
    console.log(helpText);
  } else if (command === '/exit' || command === '/quit' || command === '/q') {
    console.log(`\n${colors.green}Goodbye! 👋${colors.reset}\n`);
    rl.close();
    process.exit(0);
  } else if (command === '?') {
    console.log(shortcutsHelp);
  } else if (command === '/test-openai' || command === '/t') {
    console.log(`${colors.yellow}Testing OpenAI API connectivity...${colors.reset}`);
    
    // Get the script directory
    const scriptDir = path.dirname(process.argv[1]);
    const projectRoot = path.resolve(scriptDir, '..');
    
    // Run the test-openai command
    exec(`cd ${projectRoot} && ./run.sh test-openai`, (error, stdout, stderr) => {
      if (error) {
        console.error(`${colors.red}${stderr}${colors.reset}`);
        return;
      }
      console.log(stdout);
    });
  } else if (command === '/build' || command === '/b') {
    console.log(`${colors.yellow}Building site...${colors.reset}`);
    
    // Get the script directory
    const scriptDir = path.dirname(process.argv[1]);
    const projectRoot = path.resolve(scriptDir, '..');
    
    // Run the build command
    exec(`cd ${projectRoot} && ./run.sh build`, (error, stdout, stderr) => {
      if (error) {
        console.error(`${colors.red}${stderr}${colors.reset}`);
        return;
      }
      console.log(stdout);
    });
  } else if (command === '/serve' || command === '/s') {
    console.log(`${colors.yellow}Starting server...${colors.reset}`);
    
    // Get the script directory
    const scriptDir = path.dirname(process.argv[1]);
    const projectRoot = path.resolve(scriptDir, '..');
    
    // Run the serve command
    exec(`cd ${projectRoot} && ./run.sh serve`, (error, stdout, stderr) => {
      if (error) {
        console.error(`${colors.red}${stderr}${colors.reset}`);
        return;
      }
      console.log(stdout);
    });
  } else if (command === '/init') {
    // Create CODEX.md file
    const codexMdContent = `# Codex Project Guidelines

## Project Overview
This is a Codex project. Codex is a static site generator that uses JSON data and HTML templates.

## How to use Codex
1. Edit data files in the \`data\` directory
2. Edit templates in the \`template\` directory
3. Run \`./run.sh\` to build the site
4. View the output in the \`out\` directory

## Commands
- \`./run.sh test-openai\` - Test OpenAI API connectivity
- \`./run.sh build\` - Build the site
- \`./run.sh serve\` - Start the server

## Project Structure
- \`data/\` - JSON data files
- \`template/\` - HTML templates
- \`out/\` - Generated output
- \`codex.json\` - Configuration file
`;

    fs.writeFileSync(path.join(cwd, 'CODEX.md'), codexMdContent);
    console.log(`${colors.green}✓ Created CODEX.md file in the current directory${colors.reset}`);
  } else if (command === '/terminal-setup') {
    console.log(`${colors.yellow}Setting up terminal integration...${colors.reset}`);
    console.log(`${colors.green}✓ Add this to your ~/.bashrc or ~/.zshrc:${colors.reset}`);
    console.log(`\n  alias codex='${process.argv[1]}'`);
    console.log(`  alias claude='${process.argv[1]}' # Optional alias\n`);
  } else if (command.startsWith('/')) {
    console.log(`${colors.red}Unknown command: ${command}${colors.reset}`);
    console.log(`Type ${colors.cyan}/help${colors.reset} for available commands`);
  } else if (command) {
    // Process as a prompt to OpenAI
    console.log(`${colors.gray}Processing: "${command}"${colors.reset}`);
    
    // Here you would normally send this to OpenAI API
    // For now we'll just echo it back
    console.log(`${colors.yellow}Codex: ${colors.reset}I would process your request: "${command}" using OpenAI's API`);
    console.log(`${colors.gray}(Implementation of actual API call would go here)${colors.reset}`);
  }
}

// Set up prompt
rl.prompt();

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