/**
 * Simple test for the Codex build process
 * 
 * Run this script with: node tests/build.test.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

async function testBuild() {
  console.log('🧪 Testing Codex build process...');
  
  // Test API build endpoint
  console.log('\n📡 Testing API endpoint: /api/build');
  
  try {
    const buildResult = await makeRequest('POST', 'localhost', 5000, '/api/build');
    console.log('✅ Build API response:', buildResult);
    
    if (!buildResult.success) {
      console.error('❌ Build failed:', buildResult.error);
      process.exit(1);
    }
    
    // Check if output file was created
    console.log('\n📂 Checking output directory...');
    const outputDir = path.join(__dirname, '..', 'mysite', 'out');
    const files = fs.readdirSync(outputDir);
    
    if (files.includes('index.html')) {
      console.log(`✅ Found output file: index.html`);
      
      // Check file content
      const content = fs.readFileSync(path.join(outputDir, 'index.html'), 'utf8');
      console.log('✅ Output file has correct content with length:', content.length);
      
      // Simple validation of content
      if (content.includes('<!DOCTYPE html>') && content.includes('</html>')) {
        console.log('✅ Output file appears to be valid HTML');
      } else {
        console.error('❌ Output file does not appear to be valid HTML');
        process.exit(1);
      }
    } else {
      console.error('❌ Output file index.html not found in', outputDir);
      process.exit(1);
    }
    
    console.log('\n🎉 All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

function makeRequest(method, host, port, path) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      hostname: host,
      port,
      path,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`Request failed with status code ${res.statusCode}: ${data}`));
        } else {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(new Error(`Failed to parse response: ${error.message}`));
          }
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

// Run the tests
testBuild();