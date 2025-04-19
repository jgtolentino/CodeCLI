FROM node:20-slim

# Set working directory
WORKDIR /app

# Install dependencies
RUN apt-get update && \
    apt-get install -y jq curl wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and install dependencies
COPY mysite/package.json ./
RUN npm install

# Copy project files
COPY mysite/ ./

# Copy .env file
COPY .env ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose port
EXPOSE 8080

# Command to run
CMD ["node", "server.js"]