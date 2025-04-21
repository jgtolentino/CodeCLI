#!/usr/bin/env node
// Simple script to verify optimization pipeline is enabled

// Set global variables
let optimizationEnabled = false;

// Function that simulates startApp
function startApp() {
  console.log("Starting app...");
  
  // Enable optimization pipeline by default
  optimizationEnabled = true;
  
  console.log(`Optimization pipeline is now: ${optimizationEnabled ? 'ENABLED' : 'DISABLED'}`);
}

// Function that simulates processCommand
function processCommand(command) {
  console.log(`\nProcessing command: "${command}"`);
  console.log(`Optimization status: ${optimizationEnabled ? 'ENABLED' : 'DISABLED'}`);
  
  if (optimizationEnabled) {
    console.log("Using optimization pipeline!");
  } else {
    console.log("Not using optimization pipeline");
  }
}

// Main flow
console.log(`Initial optimization status: ${optimizationEnabled ? 'ENABLED' : 'DISABLED'}`);
startApp();
processCommand("test query");
console.log("\nTest complete!");