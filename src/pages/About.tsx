import React from 'react'
import { Github, Mail, Code, Database, Palette, Globe, Zap } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-gradient">MovieVerse</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            An educational graduation project showcasing modern web development with React, TypeScript, and cutting-edge UI/UX design
          </p>
        </div>

        {/* Project Overview */}
        <div className="glass-card mb-16 p-8 rounded-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Educational Project</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              MovieVerse is a comprehensive movie discovery platform built as a graduation project to demonstrate proficiency in modern web development technologies,
              API integration, responsive design, and user experience optimization.
            </p>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-6 rounded-xl text-center group hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Modern Tech Stack</h3>
            <p className="text-gray-300">Built with React, TypeScript, and Tailwind CSS</p>
          </div>

          <div className="glass-card p-6 rounded-xl text-center group hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">API Integration</h3>
            <p className="text-gray-300">Real-time data from TMDB and JustWatch APIs</p>
          </div>

          <div className="glass-card p-6 rounded-xl text-center group hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Glassmorphism Design</h3>
            <p className="text-gray-300">Modern UI with backdrop blur and transparency effects</p>
          </div>

          <div className="glass-card p-6 rounded-xl text-center group hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Responsive Design</h3>
            <p className="text-gray-300">Mobile-first approach with cross-device compatibility</p>
          </div>

          <div className="glass-card p-6 rounded-xl text-center group hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Performance Optimized</h3>
            <p className="text-gray-300">Lazy loading, code splitting, and optimized bundles</p>
          </div>

          <div className="glass-card p-6 rounded-xl text-center group hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-lg font-bold text-white">●</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Accessible</h3>
            <p className="text-gray-300">WCAG compliant with keyboard navigation support</p>
          </div>
        </div>

        {/* Contact Links */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Connect & Contribute</h2>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/ozzular/Movieverse"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-4 rounded-xl flex items-center space-x-2 hover:scale-105 transition-transform group"
            >
              <Github className="w-6 h-6 text-white group-hover:text-gray-300 transition-colors" />
              <span className="text-white font-medium">GitHub Repository</span>
            </a>

            <a
              href="mailto:contact@movieverse.dev"
              className="glass-card p-4 rounded-xl flex items-center space-x-2 hover:scale-105 transition-transform group"
            >
              <Mail className="w-6 h-6 text-white group-hover:text-gray-300 transition-colors" />
              <span className="text-white font-medium">Contact</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
