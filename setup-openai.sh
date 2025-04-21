#!/bin/bash
# Setup script for OpenAI integration

# Set color constants
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Set script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}   Codex OpenAI Setup Script    ${NC}"
echo -e "${BLUE}================================${NC}"
echo

# Check if .env file exists
if [ -f .env ]; then
  echo -e "${YELLOW}Existing .env file found. Do you want to update it? (y/n)${NC}"
  read -r response
  if [[ ! "$response" =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Setup cancelled. Using existing .env file.${NC}"
    exit 0
  fi
  # Backup existing .env
  cp .env .env.backup
  echo -e "${GREEN}Backed up existing .env to .env.backup${NC}"
else
  # Create .env from template if it doesn't exist
  cp .env.example .env
  echo -e "${GREEN}Created new .env file from template${NC}"
fi

# Ask for OpenAI API key
echo
echo -e "${BLUE}OpenAI API Key Setup${NC}"
echo -e "${YELLOW}Enter your OpenAI API key (from https://platform.openai.com/api-keys):${NC}"
read -r api_key

if [[ -z "$api_key" ]]; then
  echo -e "${RED}Error: API key cannot be empty${NC}"
  exit 1
fi

# Update API key in .env file
sed -i.bak "s|OPENAI_API_KEY=.*|OPENAI_API_KEY=$api_key|" .env
rm -f .env.bak

echo -e "${GREEN}API key updated in .env file${NC}"

# Ask about model selection
echo
echo -e "${BLUE}Model Selection${NC}"
echo -e "${YELLOW}Select OpenAI model to use:${NC}"
echo "1) gpt-4o (default, best quality)"
echo "2) gpt-4o-mini (faster, smaller)"
echo "3) gpt-4 (older version)"
echo "4) gpt-3.5-turbo (fastest, least capable)"
read -p "Enter selection [1-4] (default: 1): " model_choice

case $model_choice in
  2)
    model="gpt-4o-mini"
    ;;
  3)
    model="gpt-4"
    ;;
  4)
    model="gpt-3.5-turbo"
    ;;
  *)
    model="gpt-4o"
    ;;
esac

# Update model in .env file
sed -i.bak "s|OPENAI_MODEL=.*|OPENAI_MODEL=$model|" .env
rm -f .env.bak

echo -e "${GREEN}Model set to $model in .env file${NC}"

# Test OpenAI connectivity
echo
echo -e "${BLUE}Testing OpenAI API connectivity...${NC}"
echo

cd "$SCRIPT_DIR/mysite"
node test-openai.js

if [ $? -ne 0 ]; then
  echo -e "${RED}OpenAI API connectivity test failed. Please check your API key and try again.${NC}"
  exit 1
fi

# Test code generation
echo
echo -e "${BLUE}Testing code generation...${NC}"
echo

if [ -f "$SCRIPT_DIR/mysite/test-codex.js" ]; then
  node "$SCRIPT_DIR/mysite/test-codex.js"
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}Code generation test failed. API may be working but code generation is not.${NC}"
    echo -e "${YELLOW}You can still use the API for other features.${NC}"
  else
    echo -e "${GREEN}OpenAI code generation is working correctly!${NC}"
  fi
else
  echo -e "${YELLOW}Code generation test script not found. Skipping this test.${NC}"
fi

echo
echo -e "${GREEN}Setup complete!${NC}"
echo -e "${BLUE}You can now use the Codex CLI with OpenAI code generation.${NC}"
echo -e "${BLUE}Try it out with:${NC}"
echo -e "${YELLOW}node codex-cli.js /api${NC}"
echo -e "${YELLOW}write a function to calculate fibonacci numbers${NC}"
echo