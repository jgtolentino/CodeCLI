/**
 * Test script for OpenAI Codex code generation
 *
 * This script tests the code generation functionality by
 * sending a simple coding request to the OpenAI API.
 */

// Import our codex module
const { generateCode } = require('./codex-openai');

// Define test prompt
const testPrompt = 'Write a simple function in JavaScript that checks if a string is a palindrome.';

// Test function
async function testCodeGeneration() {
  console.log('\nTesting OpenAI code generation with prompt:');
  console.log(testPrompt);
  console.log('\nGenerating code...');
  
  try {
    // Generate code with a specific model and lower temperature for deterministic results
    const code = await generateCode(testPrompt, {
      model: 'gpt-4o',
      temperature: 0.3,
      max_tokens: 512
    });
    
    console.log('\nSuccessfully generated code:');
    console.log('\n' + code);
    
    // Simple validation that it contains function-like code
    if (code.includes('function') && code.includes('return')) {
      console.log('\n✅ Test passed! The code appears to be a valid JavaScript function.');
      return true;
    } else {
      console.log('\n❌ Test failed! The response doesn\'t appear to include a JavaScript function.');
      return false;
    }
  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message);
    return false;
  }
}

// Run the test
testCodeGeneration()
  .then(success => {
    console.log(`\nTest ${success ? 'completed successfully' : 'failed'}.`);
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });