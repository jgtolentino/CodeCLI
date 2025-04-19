# Use Node 22 so Codex CLI works out of the box
FROM node:22

# Install MCP Filesystem Server globally
RUN npm install -g @openai/codex \
    && npm install -g @mark3labs/mcp-filesystem-server

WORKDIR /workspace

# Copy your site + scripts in
COPY mysite/ ./mysite/

# Install site deps
WORKDIR /workspace/mysite
RUN npm install

# Ensure scripts are executable
RUN chmod +x codex.sh test-openai.js compress-and-run.sh

# Install jq for JSON processing
RUN apt-get update && apt-get install -y jq

# Default to our compress-and-run pipeline
ENTRYPOINT ["bash", "codex.sh", "compress-and-run"]