import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ZapIcon, FileTextIcon, CodeIcon } from "lucide-react";
import FeatureCard from "@/components/feature-card";

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&w=40&h=40" 
                alt="Codex Logo" 
                className="h-8 w-8" 
              />
              <span className="font-semibold text-xl">Codex</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/docs">
                <a className="text-gray-500 hover:text-gray-900">Documentation</a>
              </Link>
              <a href="https://github.com" className="text-gray-500 hover:text-gray-900">GitHub</a>
              <Button>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Generate Static Sites with Ease
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
                Codex is a lightweight, JSON-driven static site generator that combines your data with beautiful templates.
              </p>
              <div className="mt-10 flex justify-center">
                <Link href="/docs">
                  <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Link>
                <a href="https://github.com" className="ml-4 inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-12">
              <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Everything you need to build static sites
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Codex provides a simple yet powerful way to generate static websites.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
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
              
              <FeatureCard 
                icon={<ZapIcon className="text-yellow-500" />}
                title="Fast Builds"
                description="Efficient build process optimized for speed and performance."
                color="bg-yellow-100"
              />
              
              <FeatureCard 
                icon={<ZapIcon className="text-red-500" />}
                title="Plugin System"
                description="Extend functionality with plugins for markdown, SCSS, and more."
                color="bg-red-100"
              />
              
              <FeatureCard 
                icon={<ZapIcon className="text-indigo-500" />}
                title="Easy Deployment"
                description="Simple deployment to GitHub Pages, Netlify, Vercel, or your own server."
                color="bg-indigo-100"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-200 font-semibold tracking-wide uppercase">Get Started</h2>
              <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                Ready to build your static site?
              </p>
              <p className="mt-4 max-w-2xl text-xl text-blue-200 lg:mx-auto">
                Follow our simple documentation to get up and running in minutes.
              </p>
              <div className="mt-8 flex justify-center">
                <Link href="/docs">
                  <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50">
                    Read the Documentation
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center">
            <div className="px-5 py-2">
              <Link href="/docs">
                <a className="text-base text-gray-500 hover:text-gray-900">Documentation</a>
              </Link>
            </div>
            <div className="px-5 py-2">
              <a href="https://github.com" className="text-base text-gray-500 hover:text-gray-900">GitHub</a>
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
