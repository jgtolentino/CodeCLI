/**
 * OpenAI API Connectivity Test
 * 
 * This script tests the connection to OpenAI's API to ensure credentials
 * are properly configured before running operations that depend on it.
 */

// Load environment variables from .env file
require('dotenv').config({ path: '../.env' });

// Import required libraries
const { OpenAI } = require('openai');

// Constants
const COLOR = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

async function testOpenAIConnection() {
  console.log(`${COLOR.blue}Testing OpenAI API connectivity...${COLOR.reset}`);
  
  // Check if API key is set
  if (!process.env.OPENAI_API_KEY) {
    console.error(`${COLOR.red}Error: OPENAI_API_KEY environment variable is not set.${COLOR.reset}`);
    console.log(`${COLOR.yellow}Add your OpenAI API key to the .env file:${COLOR.reset}`);
    console.log(`OPENAI_API_KEY=your_api_key_here`);
    return false;
  }

  try {
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Make a simple test request
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
      messages: [
        {
          role: "system",
          content: "You are a test assistant that responds with a simple confirmation message."
        },
        {
          role: "user",
          content: "Confirm API connectivity"
        }
      ],
      max_tokens: 20,
    });

    // Validate response
    if (response.choices && response.choices.length > 0) {
      console.log(`${COLOR.green}Success! OpenAI API connection is working properly.${COLOR.reset}`);
      console.log(`${COLOR.blue}Response: ${response.choices[0].message.content}${COLOR.reset}`);
      return true;
    } else {
      console.error(`${COLOR.red}Error: Received an unexpected response format from OpenAI API.${COLOR.reset}`);
      console.log(response);
      return false;
    }
  } catch (error) {
    console.error(`${COLOR.red}Error connecting to OpenAI API:${COLOR.reset}`);
    
    if (error.response) {
      console.error(`${COLOR.red}Status: ${error.response.status}${COLOR.reset}`);
      console.error(`${COLOR.red}Error: ${error.response.data.error.message}${COLOR.reset}`);
    } else {
      console.error(`${COLOR.red}${error.message}${COLOR.reset}`);
    }
    
    console.log(`${COLOR.yellow}Check that your API key is correct and has sufficient permissions.${COLOR.reset}`);
    return false;
  }
}

// Run the test
testOpenAIConnection()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error(`${COLOR.red}Unexpected error during test:${COLOR.reset}`, error);
    process.exit(1);
  });