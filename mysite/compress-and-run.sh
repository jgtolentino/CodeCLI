#!/usr/bin/env bash
# compress-and-run.sh - Pipeline script to process repository context and run Codex

# Load environment variables
[ -f .env ] && export $(grep -v '^#' .env | xargs)

echo "🔍 Getting context from MCP Filesystem Server..."
# Wait for MCP server to be ready
sleep 5

# Fetch context from MCP server and save to a file
CONTEXT=$(curl -s http://mcp:6060/fs/context | jq -r '.combined')
echo "$CONTEXT" > context.txt

echo "📝 Context retrieved: $(wc -l context.txt | cut -d' ' -f1) lines"

echo "🧠 Running Codex with context..."
# Run the OpenAI API test with the context
codex -q "Given this repository context, verify if the OpenAI API is properly connected." < context.txt

echo "✅ Pipeline complete"