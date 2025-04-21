#!/usr/bin/env node
// Demo script to show Codex CLI functionality

import { exec } from 'child_process';
import readline from 'readline';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
  purple: '\x1b[35m',
  white: '\x1b[37m'
};

console.log(`${colors.yellow}===== Codex CLI Interactive Demo =====\n${colors.reset}`);
console.log(`This script will demonstrate the features of Codex CLI with Claude Code styling.\n`);

const steps = [
  {
    title: "Start Codex CLI",
    description: "Starting the Codex CLI with security prompt...",
    command: "echo 'y' | node codex-cli.js",
    waitTime: 1000
  },
  {
    title: "Show Help",
    description: "Demonstrating the help command...",
    command: "printf 'y\\n/help\\n' | node codex-cli.js",
    waitTime: 1000
  },
  {
    title: "Enable API with Optimization",
    description: "Enabling the API with optimization pipeline...",
    command: "printf 'y\\n/api\\n/q\\n' | node codex-cli.js",
    waitTime: 1500
  },
  {
    title: "Process Natural Language Query",
    description: "Processing a question through the optimization pipeline...",
    command: "printf 'y\\n/api\\nWhat files are in my project?\\n/q\\n' | node codex-cli.js",
    waitTime: 2000
  },
  {
    title: "Show Terminal Setup Instructions",
    description: "Showing how to set up terminal integration...",
    command: "printf 'y\\n/terminal-setup\\n/q\\n' | node codex-cli.js",
    waitTime: 1000
  },
  {
    title: "Create CODEX.md File",
    description: "Creating a CODEX.md file with project instructions...",
    command: "node create-codex-md.js",
    waitTime: 1000
  },
  {
    title: "Show CODEX.md Contents",
    description: "Displaying the generated CODEX.md file...",
    command: "head -n 15 CODEX.md",
    waitTime: 1000
  }
];

// Create readline interface for user interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function runDemoSteps(startIndex = 0) {
  if (startIndex >= steps.length) {
    console.log(`\n${colors.green}Demo completed! ${colors.reset}`);
    console.log(`\nYou can now use the Codex CLI by running: ${colors.purple}node codex-cli.js${colors.reset}`);
    rl.close();
    return;
  }

  const step = steps[startIndex];
  console.log(`\n${colors.blue}[Step ${startIndex + 1}/${steps.length}] ${colors.yellow}${step.title}${colors.reset}`);
  console.log(step.description);
  console.log(`${colors.gray}Running: ${step.command}${colors.reset}\n`);

  // Add a delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Execute the command
  exec(step.command, (error, stdout, stderr) => {
    if (error) {
      console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
      return;
    }

    console.log(stdout);
    
    if (stderr) {
      console.error(`${colors.red}${stderr}${colors.reset}`);
    }

    // Prompt user to continue
    rl.question(`\n${colors.green}Press Enter to continue to next step...${colors.reset}`, () => {
      runDemoSteps(startIndex + 1);
    });
  });
}

// Start the demo
runDemoSteps();