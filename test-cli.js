#!/usr/bin/env node
// Simple script to test the CLI's simulated API responses

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Path to the CLI script
const cliPath = path.join(__dirname, 'codex-cli.js');

console.log('Testing CLI with simulated responses...');
console.log(`CLI path: ${cliPath}`);

// Spawn the CLI process
const cliProcess = spawn('node', [cliPath], {
  stdio: ['pipe', 'pipe', 'pipe']
});

// Send security prompt response
setTimeout(() => {
  cliProcess.stdin.write('y\n');
  console.log('Sent security prompt response');
}, 1000);

// Send a test query
setTimeout(() => {
  cliProcess.stdin.write('hello\n');
  console.log('Sent test query: hello');
}, 2000);

// Send another test query
setTimeout(() => {
  cliProcess.stdin.write('What can you do?\n');
  console.log('Sent test query: What can you do?');
}, 5000);

// Send a test query for file listing
setTimeout(() => {
  cliProcess.stdin.write('list files\n');
  console.log('Sent test query: list files');
}, 8000);

// Exit the CLI
setTimeout(() => {
  cliProcess.stdin.write('/q\n');
  console.log('Sent exit command');
}, 12000);

// Listen for output
cliProcess.stdout.on('data', (data) => {
  console.log(`\n--- CLI OUTPUT ---\n${data.toString()}`);
});

// Listen for errors
cliProcess.stderr.on('data', (data) => {
  console.error(`\n--- CLI ERROR ---\n${data.toString()}`);
});

// Handle process exit
cliProcess.on('close', (code) => {
  console.log(`\nCLI process exited with code ${code}`);
});