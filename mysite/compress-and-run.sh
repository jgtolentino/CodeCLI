#!/bin/bash

# Compress and Run Script for Codex
# This script fetches context from MCP server, processes it, and runs commands

# Colors for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Codex Pipeline...${NC}"

# Check for required environment variables
if [ -z "$OPENAI_API_KEY" ]; then
  echo -e "${RED}Error: OPENAI_API_KEY is not set.${NC}"
  echo -e "${YELLOW}Please set the OPENAI_API_KEY environment variable.${NC}"
  exit 1
fi

if [ -z "$MCP_SERVER" ]; then
  echo -e "${YELLOW}Warning: MCP_SERVER is not set. Using default http://localhost:3000${NC}"
  MCP_SERVER="http://localhost:3000"
fi

# Wait for MCP server to be ready
echo -e "${BLUE}Waiting for MCP server to be ready...${NC}"
attempt=0
max_attempts=30
until $(curl --output /dev/null --silent --head --fail $MCP_SERVER); do
  attempt=$((attempt+1))
  if [ $attempt -eq $max_attempts ]; then
    echo -e "${RED}Error: Could not connect to MCP server after $max_attempts attempts.${NC}"
    exit 1
  fi
  echo -e "${YELLOW}MCP server not ready. Retrying in 2 seconds... (Attempt $attempt/$max_attempts)${NC}"
  sleep 2
done

echo -e "${GREEN}MCP server is ready!${NC}"

# Get context from MCP server
echo -e "${BLUE}Fetching context from MCP server...${NC}"
response=$(curl -s -X POST "$MCP_SERVER/context" -H "Content-Type: application/json" -d '{}')

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Failed to fetch context from MCP server.${NC}"
  exit 1
fi

echo -e "${GREEN}Successfully fetched context from MCP server.${NC}"

# Run OpenAI API test
echo -e "${BLUE}Running OpenAI API connectivity test...${NC}"
echo -e "${YELLOW}Contacting OpenAI API...${NC}"
TEST_OUTPUT=$(node test-openai.js 2>&1)
TEST_RESULT=$?

# Store the output for later review
echo "$TEST_OUTPUT" > openai-test-output.log

if [ $TEST_RESULT -ne 0 ]; then
  echo -e "${RED}OpenAI API test failed. Check your API key and network connection.${NC}"
  echo -e "${RED}Error details:${NC}"
  echo "$TEST_OUTPUT"
  exit 1
else
  echo -e "${GREEN}OpenAI API test successful!${NC}"
  echo -e "${GREEN}Connection verified:${NC} $(echo "$TEST_OUTPUT" | grep Response | cut -d ':' -f 2-)"
  echo -e "${BLUE}MCP Context + OpenAI integration verified${NC}"
fi

# Build the site
echo -e "${BLUE}Building the site...${NC}"
./codex.sh build

if [ $? -ne 0 ]; then
  echo -e "${RED}Site build failed.${NC}"
  exit 1
else
  echo -e "${GREEN}Site built successfully!${NC}"
fi

echo -e "${GREEN}Codex Pipeline completed successfully.${NC}"
echo -e "${BLUE}Starting server...${NC}"