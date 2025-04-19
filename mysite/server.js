/**
 * Codex Development Server
 * 
 * This simple Express server serves static files from the output directory
 * and provides API endpoints for interacting with Codex.
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 1227;

// Load configuration
const CONFIG_PATH = path.join(__dirname, 'codex.json');
let config;

try {
  const configData = fs.readFileSync(CONFIG_PATH, 'utf8');
  config = JSON.parse(configData);
} catch (error) {
  console.error('Error loading configuration:', error);
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, config.outputDir)));

// API endpoints
app.get('/api/config', (req, res) => {
  res.json(config);
});

app.get('/api/data', (req, res) => {
  try {
    const dataPath = path.join(__dirname, config.dataDir, 'site.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load data' });
  }
});

app.post('/api/build', (req, res) => {
  console.log('Building site...');
  
  // Run the build process (this would typically be a shell script or Node.js module)
  const startTime = Date.now();
  
  try {
    // Logic to build the site
    const templates = fs.readdirSync(path.join(__dirname, config.templateDir))
      .filter(file => file.endsWith('.html'));
      
    const data = JSON.parse(fs.readFileSync(
      path.join(__dirname, config.dataDir, 'site.json'), 
      'utf8'
    ));
    
    // Ensure output directory exists
    const outputDir = path.join(__dirname, config.outputDir);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Process each template
    templates.forEach(template => {
      const templateContent = fs.readFileSync(
        path.join(__dirname, config.templateDir, template),
        'utf8'
      );
      
      // Simple template processing (a real implementation would use a template engine)
      let processedContent = templateContent;
      
      // Replace {{variable}} placeholders
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'string') {
          const regex = new RegExp(`{{${key}}}`, 'g');
          processedContent = processedContent.replace(regex, value);
        }
        
        // Triple braces for unescaped HTML content
        if (typeof value === 'string') {
          const regex = new RegExp(`{{{${key}}}}`, 'g');
          processedContent = processedContent.replace(regex, value);
        }
      });
      
      // Handle array/object properties (e.g., features)
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Handle array iteration with {{#array}}...{{/array}}
          const arrayRegex = new RegExp(`{{#${key}}}([\\s\\S]*?){{/${key}}}`, 'g');
          const matches = processedContent.match(arrayRegex);
          
          if (matches) {
            matches.forEach(match => {
              const itemTemplate = match
                .replace(`{{#${key}}}`, '')
                .replace(`{{/${key}}}`, '');
              
              let replacement = '';
              value.forEach(item => {
                let itemHtml = itemTemplate;
                Object.entries(item).forEach(([itemKey, itemValue]) => {
                  const itemRegex = new RegExp(`{{${itemKey}}}`, 'g');
                  itemHtml = itemHtml.replace(itemRegex, itemValue);
                });
                replacement += itemHtml;
              });
              
              processedContent = processedContent.replace(match, replacement);
            });
          }
        }
      });
      
      // Write the processed file to the output directory
      fs.writeFileSync(
        path.join(outputDir, template),
        processedContent,
        'utf8'
      );
    });
    
    const endTime = Date.now();
    const buildTime = endTime - startTime;
    
    console.log(`Build completed in ${buildTime}ms`);
    res.json({
      success: true,
      pagesGenerated: templates.length,
      timeInMs: buildTime
    });
  } catch (error) {
    console.error('Build failed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/generate-content', async (req, res) => {
  try {
    const { topic } = req.body || {};
    
    // Run the generate-content.js script
    const generateProcess = spawn('node', [
      path.join(__dirname, 'generate-content.js'),
      topic || 'Codex Static Site Generator'
    ]);
    
    let output = '';
    
    generateProcess.stdout.on('data', (data) => {
      output += data.toString();
      console.log(`stdout: ${data}`);
    });
    
    generateProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    
    generateProcess.on('close', (code) => {
      if (code === 0) {
        // Content generation successful
        res.json({
          success: true,
          message: 'Content generated successfully',
          output
        });
      } else {
        // Content generation failed
        res.status(500).json({
          success: false,
          message: 'Content generation failed',
          output
        });
      }
    });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Codex server running at http://localhost:${PORT}`);
});