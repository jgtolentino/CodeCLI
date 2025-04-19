#!/usr/bin/env bash
# run.sh — wrapper for test-openai and full compress-and-run pipeline

# Make sure we're in the project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if mysite directory and required files exist
if [ ! -d "mysite" ]; then
  echo "❌ Error: mysite directory not found. Make sure you're running this from the project root."
  exit 1
fi

# If you pass "test-openai", just run the connectivity check
if [[ "$1" == "test-openai" ]]; then
  shift
  echo "🔌 Testing OpenAI connectivity..."
  cd mysite && node test-openai.js "$@"
  exit $?
fi

# Check if MCP filesystem server is installed
if ! command -v mcp-filesystem-server &> /dev/null; then
  echo "❌ Error: mcp-filesystem-server not found. Please install it first."
  exit 1
fi

# Otherwise, fire up MCP → Codex compress-and-run → teardown
echo "🟢 Starting MCP filesystem server..."
mcp-filesystem-server --port 6060 --root "$(pwd)" &
MCP_PID=$!

# Give MCP a moment to start up
sleep 1

echo "⇨ Running Codex compress-and-run..."
cd mysite && bash codex.sh compress-and-run
RC=$?

echo "🔴 Shutting down MCP filesystem server..."
kill "$MCP_PID" 2>/dev/null || true

if [ $RC -eq 0 ]; then
  echo "✅ Codex pipeline completed successfully"
else
  echo "❌ Codex pipeline failed (exit $RC)"
fi

exit $RC