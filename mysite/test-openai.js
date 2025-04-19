#!/usr/bin/env node
// test-openai.js

const { OpenAI } = require("openai");
require("dotenv").config();

// Verify environment
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY not found in environment');
  console.log('Please add it to your .env file');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function main() {
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",   
      messages: [
        { role: "user", content: "Hi there! Reply exactly: ✅ API is connected and working." }
      ]
    });
    console.log(res.choices[0].message.content);
  } catch (err) {
    console.error("❌ OpenAI API error:", err.message || err);
    process.exit(1);
  }
}

main();