# Codex Static Site Generator

Codex is a lightweight static site generator that transforms JSON data and HTML templates into fully functional static websites. It's designed to be simple to use but powerful enough for a variety of use cases, from landing pages to documentation sites.

## Features

- **JSON-Driven Content**: Store your content as structured JSON data files
- **Simple Templating**: Use Mustache-style variables in HTML templates
- **Fast Build Process**: Generate static sites in milliseconds
- **Express Server**: Preview your site locally with the built-in server
- **OpenAI API Integration**: Connectivity to OpenAI's API for future AI features
- **Docker & CI/CD Ready**: Containerized setup with GitHub Actions for modern workflows

## Quick Start

### Standard Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/yourusername/codex.git
   cd codex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up OpenAI API key (for API testing)**
   
   Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Test OpenAI API connectivity (optional)**
   ```bash
   cd mysite
   ./codex.sh test-openai
   ```

5. **Build your site**
   ```bash
   node ../server/codex.js
   # or use the convenience script
   ./codex.sh build
   ```

6. **Start the development server**
   ```bash
   node server.js
   # or use the convenience script
   ./codex.sh serve
   ```

7. **View your site**
   
   Open your browser to http://localhost:1227

### Docker Installation (Recommended)

We've containerized both MCP (Model Context Provider) and the Codex pipeline for a fully integrated development and deployment experience.

1. **Clone this repository**
   ```bash
   git clone https://github.com/yourusername/codex.git
   cd codex
   ```

2. **Set up OpenAI API key**
   
   Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

3. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

   This will:
   - Start an MCP server that provides context from your repository
   - Run the Codex pipeline with that context
   - Test connectivity with OpenAI API
   - Process templates and generate your site

4. **View your site**
   
   Open your browser to http://localhost:8080

## Project Structure

```
/                   # Root directory
├── .github/        # GitHub configuration
│   └── workflows/  # GitHub Actions workflows
│       └── codex-pipeline.yml  # CI/CD workflow configuration
├── mysite/         # Main project directory
│   ├── template/   # HTML templates with {{variable}} placeholders
│   │   └── index.html  # Main template
│   ├── data/       # JSON data files that populate templates
│   │   └── site.json   # Main data file
│   ├── out/        # Generated output (HTML files)
│   │   └── index.html  # Generated from template + data
│   ├── codex.json  # Configuration file
│   ├── codex.sh    # Convenience script for common commands
│   ├── compress-and-run.sh  # MCP pipeline script
│   ├── generate-content.js  # AI content generation script
│   ├── test-openai.js  # OpenAI API connectivity test
│   └── server.js   # Express server for local preview
├── Dockerfile      # Docker container definition
├── docker-compose.yml  # Multi-container Docker configuration
└── .env            # Environment variables (API keys, etc.)
```

## Configuration

The `codex.json` file contains configuration options for your site:

```json
{
  "templateDir": "template",
  "dataDir": "data",
  "outputDir": "out",
  "variables": {
    "siteName": "Codex",
    "version": "1.0.0"
  }
}
```

You can also use environment variables to override these settings:

```
TEMPLATE_DIR=mytemplate
DATA_DIR=mydata
OUTPUT_DIR=public
```

## OpenAI API Integration

Codex includes OpenAI API connectivity for future AI features. The current implementation focuses on testing API connectivity:

1. Make sure you have an OpenAI API key set in your `.env` file
2. Run the OpenAI API connectivity test:
   ```bash
   cd mysite
   ./codex.sh test-openai
   ```
3. If successful, you'll see a confirmation message that the API is connected and working

## Web Interface

Codex includes a web-based interface for managing your site, which provides:

- A dashboard for viewing your site metrics and status
- Options to build your site and test API connectivity
- Preview of your generated content with real-time updates

## Template Variables

Codex supports several types of template variables:

- **Simple variables**: `{{variable}}` - Replaces with the content of the variable
- **HTML content**: `{{{variable}}}` - Replaces with unescaped HTML content
- **Arrays/Lists**: 
  ```html
  {{#items}}
    <li>{{title}}</li>
  {{/items}}
  ```

## License

MIT

## Docker & Containerization

The project includes a containerized setup that makes development and deployment consistent across environments:

### Docker Components

- **Dockerfile**: Builds a container with Node.js, Codex CLI, and MCP Filesystem Server
- **docker-compose.yml**: Orchestrates the MCP server and Codex containers
- **compress-and-run.sh**: Pipeline script that connects to MCP server, retrieves context, and processes it with Codex

### Architecture

```
┌─────────────────┐     ┌─────────────────┐
│   MCP Server    │     │  Codex Pipeline │
│  (Context API)  │────▶│  (Processing)   │
└─────────────────┘     └─────────────────┘
        │                        │
        ▼                        ▼
┌─────────────────┐     ┌─────────────────┐
│  Repository     │     │   OpenAI API    │
│   Context       │     │                 │
└─────────────────┘     └─────────────────┘
```

### CI/CD Integration

The project includes GitHub Actions workflow configuration in `.github/workflows/codex-pipeline.yml`, which allows for:

- Automated testing on push/pull requests
- Consistent build environment using Docker
- API key security through GitHub Secrets

To set up in your GitHub repository:

1. Go to your repository settings
2. Navigate to Secrets and Variables > Actions
3. Add a new repository secret named `OPENAI_API_KEY` with your API key
4. Push to the repository to trigger the workflow

## Credits

- Built with Express, Node.js, and React
- OpenAI API integration for connectivity testing
- Containerization using Docker and Docker Compose 
- CI/CD automation with GitHub Actions
- Context processing using MCP Filesystem Server