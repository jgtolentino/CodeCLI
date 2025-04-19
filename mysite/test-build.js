#!/usr/bin/env node
/**
 * Simple test script for the Codex build process
 * 
 * This script performs a direct build using the server.js build command
 * and then verifies the output files were generated correctly.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

/**
 * Verify that the output files exist
 * @param {string} outputDir - Output directory path
 * @returns {boolean} True if all files exist, false otherwise
 */
function verifyOutputFiles(outputDir) {
  try {
    if (!fs.existsSync(outputDir)) {
      console.error(`Error: Output directory ${outputDir} does not exist`);
      return false;
    }
    
    const files = fs.readdirSync(outputDir);
    
    if (files.length === 0) {
      console.error('Error: No files generated in output directory');
      return false;
    }
    
    if (!files.includes('index.html')) {
      console.error('Error: index.html not found in output directory');
      return false;
    }
    
    console.log(`✅ Found ${files.length} generated files`);
    return true;
  } catch (error) {
    console.error('Error verifying output files:', error);
    return false;
  }
}

/**
 * Run the build command and verify the output
 */
function runBuildTest() {
  console.log('🔨 Testing Codex build process...');
  
  // Read config file
  try {
    const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'codex.json'), 'utf8'));
    console.log('✅ Configuration loaded');
    
    // Run the build command
    console.log('\nRunning build command...');
    exec('node server.js build', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Build command failed:', error);
        process.exit(1);
        return;
      }
      
      // Log the build output
      console.log(stdout);
      
      // Verify the output files
      console.log('\nVerifying output files...');
      const outputDir = path.join(__dirname, config.outputDir || 'out');
      const filesExist = verifyOutputFiles(outputDir);
      
      if (filesExist) {
        console.log('\n--------------------------');
        console.log('✅ Build test passed! Codex is working correctly.');
        console.log('--------------------------');
        process.exit(0);
      } else {
        console.error('❌ Output file verification failed');
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('❌ Failed to read configuration:', error);
    process.exit(1);
  }
}

// Run the build test
runBuildTest();