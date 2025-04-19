# Codex Static Site Generator

Codex is a lightweight static site generator that transforms JSON data and HTML templates into fully functional static websites. It's designed to be simple to use but powerful enough for a variety of use cases, from landing pages to documentation sites.

## Features

- **JSON-Driven Content**: Store your content as structured JSON data files
- **Simple Templating**: Use Mustache-style variables in HTML templates
- **Fast Build Process**: Generate static sites in milliseconds
- **Express Server**: Preview your site locally with the built-in server
- **AI Content Generation**: Create professional content using OpenAI's GPT models

## Quick Start

1. **Clone this repository**
   ```bash
   git clone https://github.com/yourusername/codex.git
   cd codex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up OpenAI API key (for AI content generation)**
   
   Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Generate content with AI (optional)**
   ```bash
   cd mysite
   node generate-content.js "Your topic here"
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

## Project Structure

```
mysite/             # Main project directory
├── template/       # HTML templates with {{variable}} placeholders
│   └── index.html  # Main template
├── data/           # JSON data files that populate templates
│   └── site.json   # Main data file
├── out/            # Generated output (HTML files)
│   └── index.html  # Generated from template + data
├── codex.json      # Configuration file
├── codex.sh        # Convenience script for common commands
├── generate-content.js  # AI content generation script
└── server.js       # Express server for local preview
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

## AI Content Generation

Codex includes AI-powered content generation using OpenAI's GPT models. To use this feature:

1. Make sure you have an OpenAI API key set in your `.env` file
2. Run the generate-content.js script with a topic:
   ```bash
   node generate-content.js "Web Development"
   ```
3. The script will generate professional content for your site and save it to `data/site.json`
4. Build your site to see the changes

## Web Interface

Codex includes a web-based interface for managing your site, which provides:

- A dashboard for viewing your site metrics
- Options to build your site and generate content via UI
- Preview of your generated content

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

## Credits

- Built with Express, Node.js, and React
- AI content generation powered by OpenAI GPT models