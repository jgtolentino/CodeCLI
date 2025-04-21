#!/bin/bash

# Test script for integrating CodeCLI with Claude Optimizer

# Set paths with spaces
CODEX_PATH="/Users/tbwa/Documents/GitHub/CodeCLI"
CLAUDE_OPTIMIZER_PATH="/Users/tbwa/My Drive/tools/ClaudeOptimizer"
TEST_PROMPT_PATH="$CODEX_PATH/test.txt"

# Print information
echo "Testing CodeCLI integration with Claude Optimizer"
echo "Codex Path: $CODEX_PATH"
echo "Claude Optimizer Path: $CLAUDE_OPTIMIZER_PATH"
echo "Test Prompt Path: $TEST_PROMPT_PATH"

# Run optimization on test prompt
echo "Running optimization on test prompt..."
echo "Command: \"${CLAUDE_OPTIMIZER_PATH}/optimizer.sh\" analyze \"${TEST_PROMPT_PATH}\""
"${CLAUDE_OPTIMIZER_PATH}/optimizer.sh" analyze "${TEST_PROMPT_PATH}"

# Test CodeCLI with proper path handling
echo ""
echo "Running CodeCLI with proper path handling..."
cd "$CODEX_PATH" && node codex-cli.js test "Path with spaces: \"$CLAUDE_OPTIMIZER_PATH\""

echo ""
echo "Test complete!"