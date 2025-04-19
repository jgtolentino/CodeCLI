#!/usr/bin/env node

/**
 * Codex Content Generator
 * This script uses OpenAI's API to generate content for a static site.
 * It saves the generated content to data/site.json which is then used by Codex.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Verify API key is present
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is required');
  console.error('Please add your OpenAI API key to the .env file');
  process.exit(1);
}

// Configuration
const OUTPUT_FILE = path.join(__dirname, 'data', 'site.json');
const TEMPLATE_DIR = path.join(__dirname, 'template');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

/**
 * Generate content using OpenAI API
 * @param {string} topic - The topic to generate content about
 * @returns {Promise<Object>} Generated content
 */
async function generateContent(topic = 'web development') {
  console.log(`Generating content about: ${topic}`);
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are a helpful content generator for a static website. Generate engaging, informative content based on the topic provided."
        },
        {
          role: "user",
          content: `Generate website content about ${topic}. Include a title, subtitle, main content (with HTML formatting for paragraphs and lists), and 3 key features. Respond in JSON format with these keys: title, subtitle, content, features (array of objects with title and description).`
        }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the JSON response
    const content = JSON.parse(response.choices[0].message.content);
    
    // Add metadata
    content.generatedAt = new Date().toISOString();
    content.topic = topic;
    
    return content;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

/**
 * Save content to JSON file
 * @param {Object} content - Content to save
 */
function saveContent(content) {
  try {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(content, null, 2));
    console.log(`Content saved to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Error saving content:', error);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  // Get topic from command line arguments or use default
  const topic = process.argv[2] || 'Codex Static Site Generator';
  
  console.log('🤖 Codex AI Content Generator');
  console.log('============================');
  
  try {
    // Generate content
    const content = await generateContent(topic);
    
    // Save content to file
    saveContent(content);
    
    console.log('✓ Content generation complete!');
    console.log('Run `npm run build` to build your site with the new content');
  } catch (error) {
    console.error('Content generation failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();