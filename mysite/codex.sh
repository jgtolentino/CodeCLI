#!/bin/bash

# Codex Shell Script
# This script provides a convenient way to run Codex commands with environment variables loaded

# Load environment variables from .env file if it exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

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
  *)
    echo "Codex - A simple static site generator"
    echo ""
    echo "Usage: ./codex.sh [command]"
    echo ""
    echo "Commands:"
    echo "  build                Build the static site"
    echo "  serve, start         Start the development server"
    echo "  generate [topic]     Generate content with AI (optional topic)"
    echo ""
    ;;
esac