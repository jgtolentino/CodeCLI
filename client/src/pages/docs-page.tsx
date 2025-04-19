import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import MobileHeader from "@/components/mobile-header";
import FeatureCard from "@/components/feature-card";
import InstallationSteps from "@/components/installation-steps";
import CommandsList from "@/components/commands-list";
import Tabs from "@/components/tabs";
import CodeBlock from "@/components/ui/code-block";
import { ZapIcon, FileTextIcon, CodeIcon, AlertTriangleIcon, InfoIcon, LightbulbIcon } from "lucide-react";

const installationSteps = [
  {
    number: 1,
    title: "Download the starter kit",
    description: "Download the Codex Replit starter kit and extract it.",
    code: "# Download the starter kit\ncurl -L https://example.com/codex_replit_starter.zip -o codex_replit_starter.zip\nunzip codex_replit_starter.zip"
  },
  {
    number: 2,
    title: "Install dependencies",
    description: "Navigate to the project directory and install the required dependencies.",
    code: "cd mysite\nnpm install"
  },
  {
    number: 3,
    title: "Verify the installation",
    description: "Run the build process to confirm everything is set up correctly.",
    code: "npm run build"
  }
];

const commands = [
  {
    title: "Development Mode",
    command: "npm run dev",
    description: "Starts the development server on port 1227 with hot reloading."
  },
  {
    title: "Build for Production",
    command: "npm run build",
    description: "Generates static HTML files in the mysite/out/ directory."
  },
  {
    title: "Serve Production Build",
    command: "npm start",
    description: "Serves the built files using an Express server on port 1227."
  }
];

const exampleTabs = [
  {
    key: "site-json",
    title: "1. Edit site.json",
    content: (
      <CodeBlock code={`{
  "title": "My Awesome Site",
  "message": "Welcome to my static site generated with Codex!",
  "features": [
    "Fast builds",
    "Simple templating",
    "JSON-driven content"
  ]
}`} language="json" />
    )
  },
  {
    key: "index-html",
    title: "2. Edit index.html",
    content: (
      <CodeBlock code={`<!DOCTYPE html>
<html>
<head>
  <title>{{title}}</title>
</head>
<body>
  <h1>{{title}}</h1>
  <p>{{message}}</p>
  
  <h2>Features</h2>
  <ul>
    {{#features}}
    <li>{{.}}</li>
    {{/features}}
  </ul>
</body>
</html>`} language="html" />
    )
  },
  {
    key: "build",
    title: "3. Build",
    content: (
      <CodeBlock code={`npm run build

# Output:
# Codex: Building static site...
# Codex: Reading data from ./data
# Codex: Processing templates from ./template
# Codex: Writing output to ./out
# Codex: Build complete!`} />
    )
  }
];

export default function DocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="bg-gray-50 text-gray-800">
      <MobileHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex min-h-screen pt-[53px] lg:pt-0">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
          {/* Introduction Section */}
          <section id="introduction" className="mb-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Codex Static Site Generator</h2>
              <p className="text-gray-600 text-lg mb-6">
                A lightweight, JSON-driven content management system with Mustache-style template rendering for building static websites.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                <FeatureCard 
                  icon={<ZapIcon className="text-primary" />}
                  title="Lightweight"
                  description="Minimal dependencies ensuring fast build times and small bundle sizes."
                  color="bg-blue-100"
                />
                
                <FeatureCard 
                  icon={<FileTextIcon className="text-secondary" />}
                  title="JSON-Driven"
                  description="Store your content in JSON files for easy editing and management."
                  color="bg-green-100"
                />
                
                <FeatureCard 
                  icon={<CodeIcon className="text-accent" />}
                  title="Templating"
                  description="Mustache-style templating for creating dynamic content with ease."
                  color="bg-purple-100"
                />
              </div>
            </div>
          </section>

          {/* Installation Section */}
          <section id="installation" className="mb-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation</h2>
              <p className="text-gray-600 mb-6">Get started with Codex in just a few steps.</p>
              
              <InstallationSteps steps={installationSteps} />
              
              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangleIcon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Prerequisites:</strong> Node.js v14 or later is required. This project uses npm as the package manager.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Start Section */}
          <section id="quick-start" className="mb-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>
              <p className="text-gray-600 mb-6">Get your first Codex site up and running quickly with these commands.</p>
              
              <CommandsList commands={commands} />
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Example: Creating Your First Page</h3>
                <p className="text-gray-600 mb-4">Create a simple page by updating your content in the JSON file and using a template.</p>
                
                <Tabs tabs={exampleTabs} />
              </div>
            </div>
          </section>

          {/* Configuration Section */}
          <section id="configuration" className="mb-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration</h2>
              <p className="text-gray-600 mb-6">Configure your Codex site using the codex.json file.</p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Configuration File (codex.json)</h3>
                <CodeBlock code={`{
  "site": {
    "name": "My Codex Site",
    "description": "A static site built with Codex",
    "baseUrl": "https://example.com"
  },
  "build": {
    "inputDir": "./template",
    "outputDir": "./out",
    "dataDir": "./data"
  },
  "server": {
    "port": 1227
  }
}`} language="json" />
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Configuration Options</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Option</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">site.name</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Your site's name</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Codex Site</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">site.description</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Your site's description</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">A site built with Codex</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">build.inputDir</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Templates directory</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">./template</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">build.outputDir</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Generated files directory</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">./out</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">server.port</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Development server port</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1227</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <InfoIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Tip:</strong> You can use environment variables in your configuration by using the <code className="bg-blue-100 px-1 py-0.5 rounded">${'${ENV_VAR}'}</code> syntax.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Directory Structure Section */}
          <section id="directory-structure" className="mb-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Directory Structure</h2>
              <p className="text-gray-600 mb-6">Understand the organization of your Codex project.</p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Project Structure</h3>
                <CodeBlock code={`mysite/
├── data/             # JSON data files
│   └── site.json     # Main site content
├── template/         # HTML templates
│   └── index.html    # Main template file
├── out/              # Generated static files (created after build)
├── codex.json        # Configuration file
├── codex.sh          # Helper script
├── server.js         # Express server for hosting
├── package.json      # Project dependencies
└── .env              # Environment variables`} />
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Key Directories and Files</h4>
                  <ul className="space-y-3">
                    <li className="flex">
                      <div className="flex-shrink-0 text-primary">
                        <FolderIcon className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <span className="font-medium">data/</span>
                        <p className="text-gray-600 text-sm mt-1">Contains JSON files with your site's content. Each file can be used as a data source for templates.</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 text-primary">
                        <FolderIcon className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <span className="font-medium">template/</span>
                        <p className="text-gray-600 text-sm mt-1">Contains HTML templates with Mustache-style placeholders that will be populated with data from JSON files.</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 text-primary">
                        <FolderIcon className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <span className="font-medium">out/</span>
                        <p className="text-gray-600 text-sm mt-1">The output directory where static HTML files are generated. This is what gets served in production.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Templates Section */}
          <section id="templates" className="mb-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Templates</h2>
              <p className="text-gray-600 mb-6">Learn how to use Codex's Mustache-style templating system.</p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Basic Templating</h3>
                <p className="text-gray-600 mb-4">
                  Templates use double curly braces <code className="bg-gray-100 px-1 py-0.5 rounded">{'{{variable}}'}</code> to insert data from your JSON files.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Template (index.html)</h4>
                    <CodeBlock code={`<!DOCTYPE html>
<html>
<head>
  <title>{{title}}</title>
</head>
<body>
  <h1>{{title}}</h1>
  <p>{{message}}</p>
  
  <h2>Features</h2>
  <ul>
    {{#features}}
    <li>{{.}}</li>
    {{/features}}
  </ul>
</body>
</html>`} language="html" />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Data (site.json)</h4>
                    <CodeBlock code={`{
  "title": "My Awesome Site",
  "message": "Welcome to my site!",
  "features": [
    "Fast builds",
    "Simple templating",
    "JSON-driven content"
  ]
}`} language="json" />
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium text-gray-900 mb-3">Template Features</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-primary">Variable Replacement</h5>
                      <p className="text-gray-600 text-sm">Use <code className="bg-gray-100 px-1 py-0.5 rounded">{'{{variable}}'}</code> to insert simple values.</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-primary">Loops</h5>
                      <p className="text-gray-600 text-sm">Use <code className="bg-gray-100 px-1 py-0.5 rounded">{'{{#array}} {{.}} {{/array}}'}</code> to iterate over arrays.</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-primary">Conditionals</h5>
                      <p className="text-gray-600 text-sm">Use <code className="bg-gray-100 px-1 py-0.5 rounded">{'{{#variable}} content {{/variable}}'}</code> to conditionally show content when the variable exists or is true.</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-primary">Nested Properties</h5>
                      <p className="text-gray-600 text-sm">Access nested properties with dot notation: <code className="bg-gray-100 px-1 py-0.5 rounded">{'{{site.title}}'}</code>.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Plugins Section */}
          <section id="plugins" className="mb-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Plugins</h2>
              <p className="text-gray-600 mb-6">Extend Codex's functionality with plugins.</p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Using Plugins</h3>
                <p className="text-gray-600 mb-4">Plugins can be added to the plugins array in your codex.json file.</p>
                
                <CodeBlock code={`{
  "site": {
    "name": "My Codex Site"
  },
  "plugins": [
    {
      "name": "codex-markdown",
      "options": {
        "gfm": true
      }
    },
    {
      "name": "codex-sass-compiler",
      "options": {
        "inputDir": "./styles",
        "outputDir": "./out/css"
      }
    }
  ]
}`} language="json" />
                
                <div className="mt-8">
                  <h4 className="font-medium text-gray-900 mb-3">Available Plugins</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-md p-4">
                      <h5 className="font-medium text-primary">codex-markdown</h5>
                      <p className="text-gray-600 text-sm mt-2">Process Markdown files and convert them to HTML.</p>
                      <a href="#" className="text-primary text-sm font-medium mt-2 inline-block">Learn more →</a>
                    </div>
                    
                    <div className="border border-gray-200 rounded-md p-4">
                      <h5 className="font-medium text-primary">codex-sass-compiler</h5>
                      <p className="text-gray-600 text-sm mt-2">Compile SASS/SCSS files to CSS during the build process.</p>
                      <a href="#" className="text-primary text-sm font-medium mt-2 inline-block">Learn more →</a>
                    </div>
                    
                    <div className="border border-gray-200 rounded-md p-4">
                      <h5 className="font-medium text-primary">codex-image-optimizer</h5>
                      <p className="text-gray-600 text-sm mt-2">Automatically optimize and resize images for better performance.</p>
                      <a href="#" className="text-primary text-sm font-medium mt-2 inline-block">Learn more →</a>
                    </div>
                    
                    <div className="border border-gray-200 rounded-md p-4">
                      <h5 className="font-medium text-primary">codex-sitemap</h5>
                      <p className="text-gray-600 text-sm mt-2">Generate a sitemap.xml file for your site automatically.</p>
                      <a href="#" className="text-primary text-sm font-medium mt-2 inline-block">Learn more →</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Deployment Section */}
          <section id="deployment" className="mb-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Deployment</h2>
              <p className="text-gray-600 mb-6">Deploy your Codex site to various hosting platforms.</p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Deployment Options</h3>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center">
                      <div className="text-gray-700 text-xl mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                      </div>
                      <h4 className="font-medium text-gray-900">GitHub Pages</h4>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">Deploy your static site to GitHub Pages.</p>
                    <CodeBlock code={`# Add a deployment script to package.json
"scripts": {
  "deploy": "npm run build && gh-pages -d out"
}`} />
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <div className="text-blue-500 text-xl mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
                      </div>
                      <h4 className="font-medium text-gray-900">Netlify</h4>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">Deploy to Netlify using a netlify.toml configuration file.</p>
                    <CodeBlock code={`# netlify.toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "14"`} />
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <div className="text-black text-xl mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/><path d="M23 14h-3.5a2.5 2.5 0 0 1 0-5H23"/><path d="M23 9V6a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3"/><path d="M9 16a2 2 0 0 1 0-4"/><path d="M9 16a2 2 0 1 1 0-4"/></svg>
                      </div>
                      <h4 className="font-medium text-gray-900">Vercel</h4>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">Deploy to Vercel using a vercel.json configuration file.</p>
                    <CodeBlock code={`# vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "out" }
    }
  ]
}`} />
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <div className="text-gray-700 text-xl mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
                      </div>
                      <h4 className="font-medium text-gray-900">Custom Server</h4>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">Deploy to your own server using the built-in Express server.</p>
                    <CodeBlock code={`# Build your site
npm run build

# Start the server in production mode
NODE_ENV=production npm start`} />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <LightbulbIcon className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      <strong>Tip:</strong> For the best performance, consider using a CDN like Cloudflare in front of your static site to cache content and improve global load times.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center">
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">Documentation</a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">GitHub</a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">Examples</a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">Contributing</a>
            </div>
          </nav>
          <p className="mt-8 text-center text-base text-gray-500">
            &copy; 2023 Codex. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
