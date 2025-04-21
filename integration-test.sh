#!/bin/bash

# Full Integration Test for CodeCLI and Claude Optimizer
# This script tests the path handling and integration between the two tools

# Set colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Define paths (with spaces to test handling)
CODEX_PATH="/Users/tbwa/Documents/GitHub/CodeCLI"
CLAUDE_OPTIMIZER_PATH="/Users/tbwa/My Drive/tools/ClaudeOptimizer"
TEST_DIR="${CODEX_PATH}/integration test"

# Test function
function run_test() {
    local test_name="$1"
    local command="$2"
    
    echo -e "${BLUE}Running test: ${test_name}${NC}"
    echo -e "${YELLOW}Command: ${command}${NC}"
    
    if eval "$command"; then
        echo -e "${GREEN}✓ Test passed: ${test_name}${NC}"
        return 0
    else
        echo -e "${RED}✗ Test failed: ${test_name}${NC}"
        return 1
    fi
}

# Setup test directory with spaces
mkdir -p "${TEST_DIR}"
echo "This is a test file with spaces in the path." > "${TEST_DIR}/test file.txt"

echo -e "${BLUE}==== Starting Integration Tests ====${NC}"
echo -e "${YELLOW}Testing paths with spaces and script permissions${NC}"

# Test 1: Basic permissions
run_test "Check optimizer.sh permissions" "ls -la \"${CLAUDE_OPTIMIZER_PATH}/optimizer.sh\""

# Test 2: Create a test prompt for Claude Optimizer
echo "
# Test Prompt for Integration

Please help me understand how to use paths with spaces in bash scripts.
For example, how would I access a file at:
\"/Users/tbwa/My Drive/tools/ClaudeOptimizer/data/samples/simple_prompt.txt\"?

## Additional Questions
- How can I run the Claude Optimizer tool from Codex CLI?
- What's the best way to handle paths with spaces in shell scripts?
" > "${TEST_DIR}/integration prompt.txt"

# Test 3: Run Claude Optimizer on the test prompt with spaces in path
run_test "Run optimizer on prompt with spaces in path" "\"${CLAUDE_OPTIMIZER_PATH}/optimizer.sh\" analyze \"${TEST_DIR}/integration prompt.txt\""

# Test 4: Run a test template generation
run_test "Generate template with spaces in path" "\"${CLAUDE_OPTIMIZER_PATH}/optimizer.sh\" template default --output \"${TEST_DIR}/template output.txt\""

echo -e "${BLUE}==== Integration Tests Complete ====${NC}"

# Print summary
echo -e "${GREEN}All tests completed. Check the output for any failures.${NC}"
echo -e "${YELLOW}Test directory created at: ${TEST_DIR}${NC}"