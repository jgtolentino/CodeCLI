/**
 * Test script for the Codex build process
 * 
 * This script tests the build process by first making an API request to build the site,
 * then validating that the output files were generated correctly.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuration
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 1227;

/**
 * Make an HTTP request
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} path - API endpoint path
 * @returns {Promise<Object>} Response data
 */
function makeRequest(method, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          resolve(data);
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

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
    
    console.log(`✓ Found ${files.length} generated files`);
    return true;
  } catch (error) {
    console.error('Error verifying output files:', error);
    return false;
  }
}

/**
 * Test the build process
 */
async function testBuild() {
  console.log('Testing Codex build process...');
  
  try {
    // Step 1: Get configuration
    console.log('1. Getting configuration...');
    const config = await makeRequest('GET', '/api/config');
    console.log('✓ Configuration:', config);
    
    // Step 2: Get site data
    console.log('\n2. Getting site data...');
    const data = await makeRequest('GET', '/api/data');
    console.log('✓ Site data:', Object.keys(data));
    
    // Step 3: Build the site
    console.log('\n3. Building site...');
    const buildResult = await makeRequest('POST', '/api/build');
    
    if (buildResult.success) {
      console.log(`✓ Build successful! Generated ${buildResult.pagesGenerated} pages in ${buildResult.timeInMs}ms`);
    } else {
      console.error(`✗ Build failed: ${buildResult.error}`);
      process.exit(1);
    }
    
    // Step 4: Verify output files
    console.log('\n4. Verifying output files...');
    const outputDir = path.join(__dirname, config.outputDir);
    const filesExist = verifyOutputFiles(outputDir);
    
    if (filesExist) {
      console.log('✓ All output files verified');
    } else {
      console.error('✗ Output file verification failed');
      process.exit(1);
    }
    
    console.log('\n--------------------------');
    console.log('✅ All tests passed! Codex is working correctly.');
    console.log('--------------------------');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

// Run the tests
testBuild();