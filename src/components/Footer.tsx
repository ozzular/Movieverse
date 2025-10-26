import React from 'react'
import {
  Github,
  Mail,
  Twitter,
  Youtube,
  Film,
  Heart,
  Calendar,
  Play,
  Star,
  Globe,
  Shield,
  Zap,
  Code,
  Database,
  Palette
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Movies', href: '/movies' },
    { name: 'TV Series', href: '/series' },
    { name: 'Genres', href: '/genres' },
    { name: 'Popular', href: '/movies' },
    { name: 'Top Rated', href: '/movies?page=top-rated' },
    { name: 'Coming Soon', href: '/movies?page=upcoming' }
  ]

  const exploreLinks = [
    { name: 'Actors', href: '/actors' },
    { name: 'Directors', href: '/directors' },
    { name: 'Collections', href: '/collections' },
    { name: 'Watchlist', href: '/watchlist' },
    { name: 'Favorites', href: '/favorites' },
    { name: 'Recommendations', href: '/recommendations' }
  ]

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact', href: '/contact' },
    { name: 'About', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
    { name: 'API', href: '/api' }
  ]

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/5 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-pink-500/5 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          {/* Feature Highlight */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-white/5 rounded-full px-6 py-3 mb-6">
              <Heart className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-300 font-medium">Made with 💙 for movie lovers</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Discover Your Next Favorite Movie
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore millions of movies, find hidden gems, and create your perfect watchlist
              with our intelligent movie discovery platform.
            </p>
          </div>

          {/* Navigation Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Quick Links */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold">Discover</h3>
              </div>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Film className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold">Explore</h3>
              </div>
              <ul className="space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold">Support</h3>
              </div>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold">Features</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2">
                  <Code className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-400">Personal Recommendations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-400">Regional Content</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-green-400" />
                  <span className="text-gray-400">Offline Sync</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-pink-400" />
                  <span className="text-gray-400">Multiple Themes</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-8 glass-card">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">1M+</div>
              <div className="text-gray-400 text-sm">Movies & TV Shows</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-gray-400 text-sm">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">150+</div>
              <div className="text-gray-400 text-sm">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-white/5 rounded-2xl p-8 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Get weekly recommendations, new release alerts, and exclusive content
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Logo and Copyright */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <div>
                  <div className="text-white font-bold">MovieVerse</div>
                  <div className="text-gray-400 text-xs">© {currentYear} All rights reserved</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass-card flex items-center justify-center hover:bg-white/10 transition-colors group"
                >
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 glass-card flex items-center justify-center hover:bg-white/10 transition-colors group"
                >
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 glass-card flex items-center justify-center hover:bg-white/10 transition-colors group"
                >
                  <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="mailto:contact@movieverse.dev"
                  className="w-10 h-10 glass-card flex items-center justify-center hover:bg-white/10 transition-colors group"
                >
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap items-center space-x-4 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy
                </Link>
                <span className="text-gray-600">•</span>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms
                </Link>
                <span className="text-gray-600">•</span>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookies
                </Link>
              </div>
            </div>

            {/* Educational Note */}
            <div className="text-center mt-8 pt-8 border-t border-white/5">
              <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full">
                <Code className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-400 text-sm">
                  Educational Project • Modern Web Development • React & TypeScript
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-6 z-50">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:bg-white/10 transition-colors group shadow-lg"
        >
          <Zap className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />
        </button>
      </div>
    </footer>
  )
}

export default Footer
