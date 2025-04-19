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
    echo ""
    ;;
esac