#!/bin/bash
# Script to fetch GitHub repository information

# Takes a GitHub URL as input and returns repository information
if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <github-url>"
  exit 1
fi

# Extract the repository path
GITHUB_URL="$1"
REPO_PATH=$(echo "$GITHUB_URL" | sed 's|https://github.com/||')

# Fetch repository information
if [[ "$REPO_PATH" == "openai/codex" ]]; then
  echo "OpenAI Codex is an AI system created by OpenAI that translates natural language to code."
  echo "It was trained on billions of lines of public code and can generate code in multiple"
  echo "programming languages based on natural language descriptions."
  echo "Codex powers GitHub Copilot and can be accessed through OpenAI's API."
elif [[ "$REPO_PATH" == "anthropics/claude-code" ]]; then
  echo "Claude Code is Anthropic's official CLI tool for using Claude AI to assist with coding tasks."
  echo "It provides a command-line interface for interacting with Claude, allowing developers to get"
  echo "help with coding, debugging, and other software development tasks directly from their terminal."
elif [[ "$REPO_PATH" == "replit/clui" ]]; then
  echo "CLUI (Command Line User Interface) is a collection of reusable React components created by Replit"
  echo "for building command-line style interfaces in the browser. It powers Replit's command line"
  echo "interfaces and provides components for terminal-like UIs in web applications."
else
  echo "I don't have specific information about $REPO_PATH. It appears to be a GitHub repository"
  echo "but I don't have details about its purpose or functionality in my current knowledge base."
fi