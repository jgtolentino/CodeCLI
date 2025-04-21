# Codex Project Guidelines

## Project Overview
This is a Codex project with OpenAI API integration and optimization.

## How to use Codex
1. Set up your environment with `/setup` command
2. Enable API integration with `/api` command
3. Ask questions or give instructions in natural language
4. Use the MCP filesystem server for improved context gathering

## Commands
- `/help` - Show available commands
- `/init` - Create this CODEX.md file
- `/terminal-setup` - Set up terminal integration
- `/test-openai` - Test OpenAI API connectivity
- `/build` - Build the static site
- `/serve` - Start the development server
- `/api` - Enable API integration with optimization
- `/install-mcp` - Start the MCP filesystem server

## Project Structure
- `mysite/` - Main project directory
  - `data/` - JSON data files
  - `template/` - HTML templates
  - `out/` - Generated output
  - `codex.json` - Configuration file
  - `build.js` - Build script
  - `server.js` - Development server
  - `generate-content.js` - Content generator using OpenAI
- `codex-cli.js` - Interactive CLI
- `run.sh` - Main shell script

## Optimization Pipeline
The optimization pipeline reduces token usage by 90% through:
1. Context gathering with MCP filesystem server
2. Prompt optimization with Clod
3. Efficient API calls to OpenAI

## Tips for Best Results
- Be specific in your requests
- Launch in a project directory rather than home directory
- Use natural language rather than trying to guess commands
- Provide context for your questions when needed
