# OpenAI Codex Integration

This document explains how to use the OpenAI code generation feature in Codex CLI.

## Setup

To set up OpenAI integration for code generation:

1. Run the setup script:
   ```bash
   ./setup-openai.sh
   ```
   or from within the Codex CLI:
   ```
   /setup-openai
   ```

2. Enter your OpenAI API key when prompted
   - You can get an API key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Choose a model (gpt-4o is recommended for best results)

3. The script will test your connection and verify code generation is working

## Using Code Generation

Once set up, you can generate code using natural language descriptions:

1. Start Codex CLI with the API integration enabled:
   ```bash
   node codex-cli.js /api
   ```

2. Ask for code generation with phrases like:
   - `Write a function to calculate Fibonacci numbers`
   - `Create a JavaScript class to manage a shopping cart`
   - `Implement a binary search algorithm in Python`
   - `Code a simple API server in Node.js`

3. The generated code will be displayed in the terminal

For more complex code generation, you can directly use the code generation script:

```bash
cd mysite
node codex-openai.js "Your prompt here" --output=output/your-file.js
```

## Code Generation Options

The code generation supports several options:

- **Model**: Change the model in the `.env` file (OPENAI_MODEL=gpt-4o)
- **Temperature**: Adjust creativity (0.0-1.0) in the `.env` file
- **Output Directory**: Save generated code to files in CODE_OUTPUT_DIR

## How It Works

The OpenAI code generation uses the OpenAI API with GPT-4o (or your selected model) to transform natural language descriptions into working code. It's particularly good at:

- Generating functions and classes
- Creating utility scripts
- Implementing algorithms
- Scaffolding applications
- Explaining code concepts

## Troubleshooting

If you encounter issues:

1. Verify your API key is correct in the `.env` file
2. Ensure you have sufficient API credits in your OpenAI account
3. Check your internet connection
4. Run the test script: `node mysite/test-codex.js`

## Examples

Here are some example prompts that work well with code generation:

- "Write a React component for a responsive navigation bar"
- "Create a Python function to download files from URLs with progress tracking"
- "Implement a quick sort algorithm in C++"
- "Generate a SQL query to find the top 10 customers by sales volume"
- "Code a simple HTML/CSS/JS calculator"