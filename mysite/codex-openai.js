/**
 * OpenAI Code Generation Integration
 * 
 * This script provides a real OpenAI code generation implementation
 * for the Codex CLI tool, allowing it to use true AI capabilities.
 */

// Load environment variables from .env file
require('dotenv').config({ path: '../.env' });

// Import required libraries
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

// Constants
const COLOR = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
  reset: '\x1b[0m',
};

// Initialize OpenAI client
let openai;
try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (error) {
  console.error(`${COLOR.red}Error initializing OpenAI client: ${error.message}${COLOR.reset}`);
  process.exit(1);
}

/**
 * Generate code using OpenAI's models
 * @param {string} prompt - The user's code-related request
 * @param {Object} options - Additional options for generation
 * @returns {Promise<string>} Generated code response
 */
async function generateCode(prompt, options = {}) {
  console.log(`${COLOR.blue}Generating code with OpenAI...${COLOR.reset}`);
  
  // Default options
  const defaultOptions = {
    model: "gpt-4o",
    temperature: 0.7,
    max_tokens: 1024
  };
  
  // Merge options
  const settings = { ...defaultOptions, ...options };
  
  try {
    // Enhanced system message for code generation
    const systemMessage = options.systemMessage || 
      "You are an expert programmer. Generate clean, efficient, and well-commented code based on the user's request. " + 
      "Focus on providing working code with minimal explanation. If the user asks for a specific language, use that language. " +
      "Otherwise, choose the most appropriate language for the task.";
    
    // Make the API request
    const response = await openai.chat.completions.create({
      model: settings.model,
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt }
      ],
      temperature: settings.temperature,
      max_tokens: settings.max_tokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    
    // Extract and return the code
    return response.choices[0].message.content;
  } catch (error) {
    console.error(`${COLOR.red}Error generating code:${COLOR.reset}`);
    
    if (error.response) {
      console.error(`${COLOR.red}Status: ${error.response.status}${COLOR.reset}`);
      console.error(`${COLOR.red}Error: ${error.response.data.error.message}${COLOR.reset}`);
    } else {
      console.error(`${COLOR.red}${error.message}${COLOR.reset}`);
    }
    
    return "Sorry, there was an error generating code. Please check your API key and try again.";
  }
}

/**
 * Generate code and save to file if requested
 * @param {string} prompt - The user's code-related request
 * @param {string} outputFile - Optional file to save the code to
 * @param {Object} options - Additional options for generation
 */
async function generateAndSaveCode(prompt, outputFile = null, options = {}) {
  try {
    // Start timer for performance tracking
    const startTime = Date.now();
    
    // Count tokens for usage tracking
    const approximateTokens = prompt.split(/\s+/).length;
    
    // Generate code
    console.log(`${COLOR.gray}Processing prompt (~${approximateTokens} tokens)...${COLOR.reset}`);
    const generatedCode = await generateCode(prompt, options);
    
    // Calculate completion time
    const completionTime = ((Date.now() - startTime) / 1000).toFixed(2);
    
    // Display generated code
    console.log(`\n${COLOR.green}Generated Code (completed in ${completionTime}s):${COLOR.reset}\n`);
    console.log(generatedCode);
    
    // Save to file if requested
    if (outputFile) {
      try {
        // Create directories if they don't exist
        const dir = path.dirname(outputFile);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // Write the code to the file
        fs.writeFileSync(outputFile, generatedCode);
        console.log(`\n${COLOR.green}Code saved to: ${outputFile}${COLOR.reset}`);
      } catch (error) {
        console.error(`${COLOR.red}Error saving code to file: ${error.message}${COLOR.reset}`);
      }
    }
    
    // Return generated code for potential further processing
    return generatedCode;
  } catch (error) {
    console.error(`${COLOR.red}Error in code generation process: ${error.message}${COLOR.reset}`);
    return null;
  }
}

// Command-line interface handling
if (require.main === module) {
  // Called directly - parse command-line arguments
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`${COLOR.yellow}Usage: node codex-openai.js "<prompt>" [--output=filename] [--model=model-name] [--temp=temperature]${COLOR.reset}`);
    process.exit(1);
  }
  
  // First argument is always the prompt
  const prompt = args[0];
  
  // Parse other options
  const options = {};
  let outputFile = null;
  
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    
    if (arg.startsWith('--output=')) {
      outputFile = arg.substring('--output='.length);
    } else if (arg.startsWith('--model=')) {
      options.model = arg.substring('--model='.length);
    } else if (arg.startsWith('--temp=')) {
      options.temperature = parseFloat(arg.substring('--temp='.length));
    }
  }
  
  // Run the code generation
  generateAndSaveCode(prompt, outputFile, options).catch(err => {
    console.error(`${COLOR.red}Fatal error: ${err.message}${COLOR.reset}`);
    process.exit(1);
  });
} else {
  // Being imported as a module
  module.exports = {
    generateCode,
    generateAndSaveCode
  };
}