#!/usr/bin/env bash
# codex.sh

# Load environment variables from .env file if it exists
[ -f .env ] && export $(grep -v '^#' .env | xargs)

case "$1" in
  "build")
    echo "🔨 Building site..."
    node server.js build
    ;;
  "serve" | "start")
    echo "🚀 Starting Codex server..."
    node server.js
    ;;
  "generate")
    echo "🤖 Generating content..."
    shift
    node generate-content.js "$@"
    ;;
  "test-openai")
    echo "🔌 Testing OpenAI connectivity..."
    node test-openai.js
    ;;
  "test-build")
    echo "🔨 Testing build process..."
    node test-build.js
    ;;
  "compress-and-run")
    echo "🔄 Running Codex pipeline with MCP context..."
    ./compress-and-run.sh
    ;;
  "clod")
    echo "🧠 Running Clod context optimizer..."
    shift
    # Simulate clod for context optimization
    if [[ "$1" == "-q" ]]; then
      shift
      query="$1"
      # Read input from stdin
      input=$(cat)
      echo "Context optimization complete. Using query: \"$query\""
      echo "Your optimized prompt: How would you answer this question based on the given context: $query"
    else
      echo "Usage: ./codex.sh clod -q \"Your query\""
    fi
    ;;
  "codex")
    echo "🔍 Generating response with Codex..."
    shift
    # Simulate codex for response generation
    if [[ "$1" == "-q" ]]; then
      shift
      query="$1"
      echo "Based on the optimized context, here's the answer to your query:"
      echo ""
      echo "Here are the files in the current directory:"
      ls -la | grep -v "^\." | head -n 5
      echo ""
      echo "The Codex system is a static site generator that transforms JSON data and HTML templates into fully functional websites."
    else
      echo "Usage: ./codex.sh codex -q \"Your query\""
    fi
    ;;
  *)
    echo "Codex - A simple static site generator"
    echo ""
    echo "Usage: ./codex.sh [command]"
    echo ""
    echo "Commands:"
    echo "  build                Build the static site"
    echo "  serve, start         Start the development server"
    echo "  generate [topic]     Generate content with AI (optional topic)"
    echo "  test-openai          Test OpenAI API connectivity"
    echo "  test-build           Test the build process"
    echo "  compress-and-run     Run Codex pipeline with MCP context"
    echo "  clod -q \"query\"      Optimize context with Clod"
    echo "  codex -q \"query\"     Generate response with Codex"
    echo ""
    ;;
esac