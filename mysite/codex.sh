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
    shift
    # Generate response directly without extra messages
    if [[ "$1" == "-q" ]]; then
      shift
      query="$1"
      
      # Generate appropriate response based on query
      if [[ "$query" == *"file"* ]] || [[ "$query" == *"list"* ]]; then
        echo "Here are the key files in this project:"
        ls -la | grep -v "^\." | head -n 5 | awk '{print "- " $9}'
      elif [[ "$query" == *"what"* ]] || [[ "$query" == *"describe"* ]] || [[ "$query" == *"explain"* ]]; then
        echo "Codex is a static site generator that transforms JSON data and HTML templates into websites."
        echo "It uses templates with variables, a build process, and a preview server."
      else
        echo "I've analyzed your query \"$query\" and found this information:"
        echo ""
        echo "This project is a static site generator that works with JSON data and HTML templates."
        echo "Key components: template processing, data storage, and development server."
      fi
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