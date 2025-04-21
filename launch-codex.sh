#!/bin/bash
# launch-codex.sh - Robust script to launch CodeCLI

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Change to the CodeCLI directory
cd "$SCRIPT_DIR" || {
  echo "Error: Could not change to CodeCLI directory at $SCRIPT_DIR"
  exit 1
}

# Check if codex-cli.js exists
if [ ! -f "./codex-cli.js" ]; then
  echo "Error: Could not find codex-cli.js in $SCRIPT_DIR"
  exit 1
}

# Make script executable if it isn't already
if [ ! -x "./codex-cli.js" ]; then
  chmod +x "./codex-cli.js"
  echo "Made codex-cli.js executable"
fi

# Run the CodeCLI
echo "Starting CodeCLI..."
node ./codex-cli.js