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

# If you pass "compress-and-run", execute the query directly with codex
if [[ "$1" == "compress-and-run" ]]; then
  shift
  # Store the entire remaining argument list as the query to handle spaces properly
  query="$*"
  
  echo "📝 Processing query: \"$query\""
  
  # Check if codex.sh is executable, if not make it so
  if [[ ! -x "$SCRIPT_DIR/mysite/codex.sh" ]]; then
    echo "🔑 Setting executable permissions on codex.sh"
    chmod +x "$SCRIPT_DIR/mysite/codex.sh"
  fi
  
  # Check if this is a code generation request
  if [[ "$query" == *"code "* ]] || [[ "$query" == *"implement "* ]] || [[ "$query" == *"create "* ]] || 
     [[ "$query" == *"write "* ]] || [[ "$query" == *"function "* ]] || [[ "$query" == *"script "* ]]; then
    
    # Check if OpenAI key is set
    if [[ -n "$OPENAI_API_KEY" ]]; then
      echo "🤖 Detected code generation request, using OpenAI..."
      
      # Ensure the codex-openai.js exists and is properly configured
      if [[ -f "$SCRIPT_DIR/mysite/codex-openai.js" ]]; then
        cd "$SCRIPT_DIR/mysite" && node codex-openai.js "$query"
      else
        echo "❌ Error: OpenAI code generation script not found."
        echo "Run './setup-openai.sh' to set up OpenAI integration."
      fi
    else
      echo "⚠️ OpenAI API key not set. Using fallback response..."
      cd "$SCRIPT_DIR/mysite" && ./codex.sh codex -q "$query"
    fi
  else
    # For non-code queries, run the standard processor
    cd "$SCRIPT_DIR/mysite" && ./codex.sh codex -q "$query"
  fi
  
  exit $?
fi

# If you pass "setup-openai", run the OpenAI setup script
if [[ "$1" == "setup-openai" ]]; then
  echo "🔧 Setting up OpenAI integration..."
  "$SCRIPT_DIR/setup-openai.sh"
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