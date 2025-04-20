#!/usr/bin/env bash
# run.sh — wrapper for test-openai and full compress-and-run pipeline

# Make sure we're in the project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Load environment variables from .env if it exists
if [ -f .env ]; then
  echo "📄 Loading environment variables from .env file..."
  export $(grep -v '^#' .env | xargs)
fi

# Check if OPENAI_API_KEY is set
if [ -z "$OPENAI_API_KEY" ]; then
  echo "❌ Error: OPENAI_API_KEY is not set. Please check your .env file or set it manually."
  exit 1
fi

# Check if mysite directory and required files exist
if [ ! -d "mysite" ]; then
  echo "❌ Error: mysite directory not found. Make sure you're running this from the project root."
  exit 1
fi

# Kill any running Node servers on port 1227
echo "🔄 Checking for existing servers..."
if lsof -i :1227 > /dev/null; then
  echo "⚠️ Found existing server on port 1227. Stopping it..."
  lsof -ti :1227 | xargs kill -9
  echo "✅ Server stopped"
fi

# If you pass "test-openai", just run the connectivity check
if [[ "$1" == "test-openai" ]]; then
  shift
  echo "🔌 Testing OpenAI connectivity..."
  cd mysite && node test-openai.js "$@"
  exit $?
fi

# If you pass "build", just build without serving
if [[ "$1" == "build" ]]; then
  echo "🔨 Building site..."
  cd "$SCRIPT_DIR/mysite" && node server.js build
  exit $?
fi

# If you pass "serve", just start the server
if [[ "$1" == "serve" ]]; then
  echo "🚀 Starting Codex server..."
  cd "$SCRIPT_DIR/mysite" && node server.js
  exit $?
fi

# If you pass "compress-and-run", execute the query through the optimization pipeline
if [[ "$1" == "compress-and-run" ]]; then
  shift
  query="$1"
  echo "🔄 Running query through optimization pipeline: \"$query\""
  
  # Check if MCP server is running, start if not
  if ! curl -s --head http://localhost:6060/fs/health > /dev/null; then
    echo "📡 Starting MCP filesystem server..."
    cd "$SCRIPT_DIR/mysite" && node server.js mcp &
    sleep 2  # Give the server time to start
  fi
  
  echo "1️⃣ Gathering context from MCP filesystem server..."
  context=$(curl -s http://localhost:6060/fs/context)
  
  echo "2️⃣ Optimizing context with Clod..."
  optimized=$(cd "$SCRIPT_DIR/mysite" && ./codex.sh clod -q "Compress and optimize this context for answering: $query" <<< "$context")
  
  echo "3️⃣ Generating response with Codex..."
  cd "$SCRIPT_DIR/mysite" && ./codex.sh codex -q "$optimized"
  
  exit $?
fi

# Run the full simplified process
echo "⚠️ MCP server implementation is complex - running simplified build instead..."

# Run the OpenAI test first
echo "🔌 Testing OpenAI connectivity..."
cd mysite && node test-openai.js
if [ $? -ne 0 ]; then
  echo "❌ OpenAI test failed"
  exit 1
fi

# Build the site
echo "🔨 Building site..."
cd "$SCRIPT_DIR/mysite" && node server.js build
if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

echo "✅ Site built successfully!"
echo ""
echo "📌 To start the server, run: ./run.sh serve"
exit 0