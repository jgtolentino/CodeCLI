# Codex Static Site Generator

A lightweight, JSON-driven static site generator that combines your data with HTML templates to create static websites.

## 🚀 Features

- **JSON-driven content**: Store all your content in easy-to-edit JSON files
- **Mustache-style templates**: Use simple `{{variable}}` syntax in your HTML templates
- **Fast builds**: Generate your entire site in milliseconds
- **Built-in server**: Preview your site with the included Express server
- **Simple API**: Trigger builds programmatically via HTTP endpoints
- **Environment variable support**: Configure your site using environment variables

## 📋 Quick Start

1. **Clone the repository and install dependencies:**

```bash
git clone https://github.com/yourusername/codex.git
cd codex
npm install
```

2. **Add your content to JSON files in `mysite/data/`:**

```json
// mysite/data/site.json
{
  "title": "My Website",
  "message": "Welcome to my website!"
}
```

3. **Create your template in `mysite/template/`:**

```html
<!-- mysite/template/index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>{{title}}</title>
</head>
<body>
  <h1>{{title}}</h1>
  <p>{{message}}</p>
</body>
</html>
```

4. **Build and serve your site:**

```bash
# Build the site
npm run build

# Start the server
npm start
```

Your site will be available at http://localhost:5000

## 🛠️ Directory Structure

```
mysite/
├── data/             # JSON content files
│   └── site.json     # Main site content
├── template/         # HTML templates 
│   └── index.html    # Main template with {{variables}}
├── out/              # Generated static files
├── codex.json        # Project configuration
├── codex.sh          # Shortcut script
├── server.js         # Express server
└── package.json      # Dependencies and scripts
```

## ⚙️ Configuration

Configure Codex using the `codex.json` file or environment variables:

```json
{
  "templateDir": "template",
  "dataDir": "data", 
  "outputDir": "out",
  "variables": {
    "siteTitle": "My Site",
    "baseUrl": "https://example.com"
  },
  "plugins": []
}
```

Or using `.env`:

```
DATA_DIR=mysite/data
TEMPLATE_DIR=mysite/template
OUTPUT_DIR=mysite/out
PORT=5000
```

## 📡 API Endpoints

Codex provides several API endpoints:

- **GET `/api/config`**: Get the current configuration
- **GET `/api/data`**: Get the current site data
- **POST `/api/build`**: Trigger a site build

Example: Triggering a build

```bash
curl -X POST http://localhost:5000/api/build
```

Response:

```json
{
  "pagesGenerated": 1,
  "timeInMs": 5,
  "success": true
}
```

## 🧪 Development

Start the development server:

```bash
npm run dev
```

This will start both the Express server and watch for file changes.

## 📝 License

This project is MIT licensed.