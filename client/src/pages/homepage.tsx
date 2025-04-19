import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { buildSite } from '@/lib/codex';
import { Download, ArrowRight, Github, Star, GitBranch, FileText, Layout, Code, Server, Settings, UploadCloud, Book } from 'lucide-react';

export default function Homepage() {
  const [buildResult, setBuildResult] = useState<{
    success: boolean;
    pagesGenerated?: number;
    timeInMs?: number;
    error?: string;
  } | null>(null);
  
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "$ npm install",
    "Installing dependencies...",
    "+ codex-generator@1.0.0",
    "Added 42 packages in 2.1s",
    "$ npm run build",
    "Building project...",
    "Codex v1.0.0",
    "✓ Reading data/site.json",
    "✓ Processing templates",
    "✓ Generated 5 pages to /mysite/out/",
    "Build completed in 0.32s",
    "$ npm start",
    "Server running at http://localhost:1227"
  ]);
  
  const handleBuildClick = async () => {
    try {
      setTerminalOutput(prev => [...prev, "$ npm run build", "Building project..."]);
      const result = await buildSite();
      if (result.success) {
        setTerminalOutput(prev => [
          ...prev, 
          "Codex v1.0.0",
          "✓ Reading data/site.json",
          "✓ Processing templates",
          `✓ Generated ${result.pagesGenerated} pages to /mysite/out/`,
          `Build completed in ${(result.timeInMs / 1000).toFixed(2)}s`
        ]);
        setBuildResult(result);
      } else {
        setTerminalOutput(prev => [...prev, `Error: ${result.error}`]);
        setBuildResult({ success: false, error: result.error });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setTerminalOutput(prev => [...prev, `Error: ${errorMessage}`]);
      setBuildResult({ success: false, error: errorMessage });
    }
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <svg className="w-8 h-8 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <h1 className="font-bold text-xl">Codex</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="font-medium text-primary-600 hover:text-primary-800 transition-colors">Documentation</a>
            <a href="#" className="font-medium text-gray-600 hover:text-gray-900 transition-colors">Examples</a>
            <a href="#" className="font-medium text-gray-600 hover:text-gray-900 transition-colors">API</a>
            <a href="#" className="font-medium text-gray-600 hover:text-gray-900 transition-colors">GitHub</a>
          </nav>
          <div className="flex items-center">
            <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 md:hidden">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <a href="#" className="hidden md:inline-flex items-center justify-center rounded-md bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700">Get Started</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block px-3 py-1 text-xs font-semibold text-primary-700 bg-primary-50 rounded-full mb-4">
                Simple & Flexible
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">JSON-driven templates for static site generation</h2>
              <p className="text-lg text-gray-600 mb-6">Codex transforms your data and templates into static HTML with a straightforward build process. Perfect for documentation, landing pages, and more.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700" onClick={handleBuildClick}>
                  Quick Start
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                  View on GitHub
                  <Github className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <span className="flex items-center">
                  <Download className="mr-2 h-4 w-4 text-primary-500" />
                  <span>500+ downloads</span>
                </span>
                <span className="mx-3">•</span>
                <span className="flex items-center">
                  <Star className="mr-2 h-4 w-4 text-yellow-500" />
                  <span>120+ stars</span>
                </span>
                <span className="mx-3">•</span>
                <span className="flex items-center">
                  <GitBranch className="mr-2 h-4 w-4 text-secondary-500" />
                  <span>v1.0.0</span>
                </span>
              </div>
            </div>
            
            <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-xl">
              <div className="flex items-center justify-start space-x-2 px-4 py-2 bg-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-2 text-gray-400 text-sm">Terminal</div>
              </div>
              <div className="p-4 font-mono text-sm text-green-400 leading-relaxed">
                <div className="space-y-1">
                  {terminalOutput.map((line, index) => (
                    <p key={index} className={line.startsWith('$') ? '' : line.startsWith('Error') ? 'text-red-400' : line.startsWith('✓') ? 'text-white' : 'text-gray-400'}>
                      {line}
                    </p>
                  ))}
                  <p className="animate-pulse">█</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Codex Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A lightweight static site generator with a focus on simplicity and flexibility.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="rounded-lg p-6 bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">JSON Data Sources</h3>
                <p className="text-gray-600 mb-4">Store your content as structured JSON in the data directory. Easy to update and version control.</p>
                <div className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  <pre className="text-gray-800"><code>{`{
  "title": "Welcome to Codex",
  "message": "Your content here"
}`}</code></pre>
                </div>
              </CardContent>
            </Card>
            
            <Card className="rounded-lg p-6 bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  <Layout className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">HTML Templates</h3>
                <p className="text-gray-600 mb-4">Create templates with Mustache-style variables for dynamic content insertion.</p>
                <div className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  <pre className="text-gray-800"><code>{`<h1>{{title}}</h1>
<div>{{message}}</div>`}</code></pre>
                </div>
              </CardContent>
            </Card>
            
            <Card className="rounded-lg p-6 bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Build Process</h3>
                <p className="text-gray-600 mb-4">Generate static HTML with a simple build command. No complex configuration needed.</p>
                <div className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  <pre className="text-gray-800"><code>{`$ npm run build
# Generates static HTML to mysite/out/`}</code></pre>
                </div>
              </CardContent>
            </Card>
            
            <Card className="rounded-lg p-6 bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Express Server</h3>
                <p className="text-gray-600 mb-4">Built-in Express server for local development and testing your static site.</p>
                <div className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  <pre className="text-gray-800"><code>{`$ npm start
# Server running at http://localhost:1227`}</code></pre>
                </div>
              </CardContent>
            </Card>
            
            <Card className="rounded-lg p-6 bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Configuration</h3>
                <p className="text-gray-600 mb-4">Simple configuration with codex.json to customize your build process.</p>
                <div className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  <pre className="text-gray-800"><code>{`{
  "templateDir": "template",
  "dataDir": "data",
  "outputDir": "out"
}`}</code></pre>
                </div>
              </CardContent>
            </Card>
            
            <Card className="rounded-lg p-6 bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Easy Deployment</h3>
                <p className="text-gray-600 mb-4">Deploy your static site anywhere - perfect for GitHub Pages, Netlify, or Vercel.</p>
                <div className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  <pre className="text-gray-800"><code>{`# Generate static files
$ npm run build

# Deploy your /out directory`}</code></pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Directory Structure */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Project Structure</h2>
            <p className="text-lg text-gray-600 mb-8">Codex follows a clean, organized directory structure that's easy to understand and maintain.</p>
            
            <Card className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-5 border-b border-gray-200">
                <h3 className="font-medium text-lg">Directory Layout</h3>
              </div>
              <CardContent className="p-5 font-mono text-sm">
                <pre className="text-gray-800"><code className="whitespace-pre">{`mysite/
├── data/              # JSON content files
│   └── site.json      # Main site content
├── template/          # HTML templates 
│   └── index.html     # Main template with {{variables}}
├── out/               # Generated static files
├── codex.json         # Project configuration
├── codex.sh           # Shortcut script
├── server.js          # Express server
└── package.json       # Dependencies and scripts`}</code></pre>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                  <h3 className="font-medium text-gray-700">package.json</h3>
                </div>
                <CardContent className="p-4 text-sm overflow-x-auto">
                  <pre className="text-gray-800"><code>{`{
  "name": "codex-project",
  "version": "1.0.0",
  "scripts": {
    "build": "./codex.sh build",
    "start": "node server.js",
    "dev": "npm run build && npm start"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}`}</code></pre>
                </CardContent>
              </Card>
              
              <Card className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                  <h3 className="font-medium text-gray-700">codex.json</h3>
                </div>
                <CardContent className="p-4 text-sm overflow-x-auto">
                  <pre className="text-gray-800"><code>{`{
  "templateDir": "template",
  "dataDir": "data",
  "outputDir": "out",
  "variables": {
    "siteTitle": "My Codex Site",
    "baseUrl": "https://example.com"
  },
  "plugins": []
}`}</code></pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Quick Start Guide</h2>
            <p className="text-lg text-gray-600 mb-8">Get up and running with Codex in just a few minutes.</p>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">
                    1
                  </div>
                  <h3 className="text-xl font-semibold">Download and Extract</h3>
                </div>
                <p className="text-gray-600 mb-4 pl-11">Download the Codex starter kit and extract it to your project directory.</p>
                <div className="bg-gray-100 rounded p-4 font-mono text-sm overflow-x-auto">
                  <code className="text-gray-800">{`curl -OL https://example.com/codex_replit_starter.zip
unzip codex_replit_starter.zip`}</code>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">
                    2
                  </div>
                  <h3 className="text-xl font-semibold">Install Dependencies</h3>
                </div>
                <p className="text-gray-600 mb-4 pl-11">Navigate to your project directory and install the required dependencies.</p>
                <div className="bg-gray-100 rounded p-4 font-mono text-sm overflow-x-auto">
                  <code className="text-gray-800">{`cd mysite
npm install`}</code>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">
                    3
                  </div>
                  <h3 className="text-xl font-semibold">Edit Content</h3>
                </div>
                <p className="text-gray-600 mb-4 pl-11">Modify the JSON files in the data directory to customize your content.</p>
                <div className="bg-gray-100 rounded p-4 font-mono text-sm overflow-x-auto">
                  <code className="text-gray-800">{`# Edit data/site.json
{
  "title": "My Awesome Site",
  "message": "Welcome to my website built with Codex!"
}`}</code>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">
                    4
                  </div>
                  <h3 className="text-xl font-semibold">Build Your Site</h3>
                </div>
                <p className="text-gray-600 mb-4 pl-11">Generate the static HTML files from your templates and data.</p>
                <div className="bg-gray-100 rounded p-4 font-mono text-sm overflow-x-auto">
                  <code className="text-gray-800">{`npm run build`}</code>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">
                    5
                  </div>
                  <h3 className="text-xl font-semibold">Start the Server</h3>
                </div>
                <p className="text-gray-600 mb-4 pl-11">Launch the development server to preview your site locally.</p>
                <div className="bg-gray-100 rounded p-4 font-mono text-sm overflow-x-auto">
                  <code className="text-gray-800">{`npm start

# Site available at http://localhost:1227`}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build with Codex?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Get started with Codex today and experience the simplicity of JSON-driven static site generation.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700" onClick={handleBuildClick}>
              Download Starter Kit
              <Download className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="secondary" className="inline-flex items-center justify-center rounded-md border border-gray-600 bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700">
              Read Documentation
              <Book className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-6 h-6 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <h3 className="font-bold text-lg text-white">Codex</h3>
              </div>
              <p className="text-gray-400 mb-4">A lightweight static site generator powered by JSON data and HTML templates.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H3a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-7.5"></path><path d="M18 13V2"></path><path d="M2 9h20"></path></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Documentation</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Getting Started</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Configuration</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Data Sources</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Deployment</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Examples</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Plugins</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and news.</p>
              <form className="space-y-2">
                <div>
                  <input type="email" placeholder="Your email" className="w-full px-3 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <Button type="submit" className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
            <p>© 2023 Codex. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
