const express = require('express');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();
const PORT = process.env.PORT || 1227;

// Get the output directory from configuration
let outputDir = 'out';
try {
  const config = JSON.parse(fs.readFileSync('codex.json', 'utf8'));
  outputDir = config.outputDir || 'out';
} catch (err) {
  console.warn('Warning: Could not read codex.json. Using default output directory.', err);
}

// Ensure the output directory exists
const outputPath = path.join(__dirname, outputDir);
if (!fs.existsSync(outputPath)) {
  console.warn(`Warning: Output directory ${outputPath} does not exist. Please run the build process first.`);
  fs.mkdirSync(outputPath, { recursive: true });
}

// Serve static files from the output directory
app.use(express.static(outputPath));

// For any other request, serve index.html if it exists
app.get('*', (req, res) => {
  const indexPath = path.join(outputPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not found. Please run the build process first.');
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
