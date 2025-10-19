import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { tmdbApi } from '../services/tmdbApi'
import { useFavorites } from '../contexts/FavoritesContext'
import { useTheme } from '../contexts/ThemeContext'
import MovieVerseLogo from '../components/MovieVerseLogo'
import SunMoonSwitch from '../components/SunMoonSwitch'
import HeroBanner from '../components/HeroBanner'
import MovieRow from '../components/MovieRow'
import type { Movie } from '../types/index'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { favorites } = useFavorites()
  const { currentTheme } = useTheme()

  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const [trending, popular, topRated] = await Promise.all([
          tmdbApi.getTrendingMovies(),
          tmdbApi.getPopularMovies(),
          tmdbApi.getTopRatedMovies()
        ])

        setTrendingMovies(trending)
        setPopularMovies(popular)
        setTopRatedMovies(topRated)
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <div className={`min-h-screen ${currentTheme === 'day' ? 'day-theme' : 'night-theme'}`}>
      {/* Navigation Bar - Sticky top, glassmorphism */}
      <motion.header
        className="sticky top-0 z-50 glassmorphism"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <MovieVerseLogo size="md" />
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-galaxy-purple focus:ring-1 focus:ring-galaxy-purple"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-galaxy-purple hover:text-galaxy-red transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/app"
                className="text-white hover:text-galaxy-purple transition-colors font-medium"
              >
                Browse
              </Link>
              <Link
                to="/favorites"
                className="text-white hover:text-galaxy-purple transition-colors font-medium flex items-center space-x-1"
              >
                <span>Favorites</span>
                {favorites.length > 0 && (
                  <span className="bg-galaxy-red text-white text-xs rounded-full px-2 py-1">
                    {favorites.length}
                  </span>
                )}
              </Link>
              <SunMoonSwitch />
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative">
        {/* Hero Section - Full width, 70vh */}
        <HeroBanner className="mb-12" />

        {/* Movie Sections */}
        <motion.div
          className="py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container mx-auto px-4">
            {/* Trending Near You Section */}
            <motion.section variants={itemVariants} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-galaxy-purple/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-galaxy-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Trending Now</h2>
                    <p className="text-gray-400 text-sm">Popular movies right now</p>
                  </div>
                </div>
                <Link
                  to="/app"
                  className="text-galaxy-purple hover:text-galaxy-red transition-colors font-medium"
                >
                  See All →
                </Link>
              </div>

              <MovieRow
                title=""
                movies={trendingMovies.slice(0, 8)}
              />
            </motion.section>

            {/* Popular Movies Section */}
            <motion.section variants={itemVariants} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Popular Movies</h2>
                  <p className="text-gray-400 text-sm">Most watched this month</p>
                </div>
                <Link
                  to="/movies"
                  className="text-galaxy-purple hover:text-galaxy-red transition-colors font-medium"
                >
                  See All →
                </Link>
              </div>

              <MovieRow
                title=""
                movies={popularMovies.slice(0, 8)}
              />
            </motion.section>

            {/* Top Rated Movies Section */}
            <motion.section variants={itemVariants} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Top Rated</h2>
                  <p className="text-gray-400 text-sm">Highest rated movies of all time</p>
                </div>
                <Link
                  to="/movies"
                  className="text-galaxy-purple hover:text-galaxy-red transition-colors font-medium"
                >
                  See All →
                </Link>
              </div>

              <MovieRow
                title=""
                movies={topRatedMovies.slice(0, 8)}
              />
            </motion.section>
          </div>
        </motion.div>

        {/* Footer Section */}
        <motion.footer
          className="glassmorphism mt-16"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* About Section */}
              <div>
                <div className="mb-4">
                  <MovieVerseLogo size="sm" />
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Your ultimate movie discovery platform. Find your next favorite film with our curated collections and personalized recommendations.
                </p>
                <p className="text-gray-400 text-xs">
                  Made by [Your Name] • Final Year Project 2025
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/app" className="text-gray-300 hover:text-white transition-colors text-sm">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/movies" className="text-gray-300 hover:text-white transition-colors text-sm">
                      Browse Movies
                    </Link>
                  </li>
                  <li>
                    <Link to="/favorites" className="text-gray-300 hover:text-white transition-colors text-sm">
                      My Favorites
                    </Link>
                  </li>
                  <li>
                    <Link to="/filters" className="text-gray-300 hover:text-white transition-colors text-sm">
                      Advanced Filters
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h4 className="text-white font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-8 h-8 bg-galaxy-purple/20 rounded-full flex items-center justify-center text-galaxy-purple hover:bg-galaxy-purple hover:text-white transition-colors"
                    title="GitHub"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-galaxy-purple/20 rounded-full flex items-center justify-center text-galaxy-purple hover:bg-galaxy-purple hover:text-white transition-colors"
                    title="LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href="mailto:your.email@example.com"
                    className="w-8 h-8 bg-galaxy-purple/20 rounded-full flex items-center justify-center text-galaxy-purple hover:bg-galaxy-purple hover:text-white transition-colors"
                    title="Email"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* API Attribution - REQUIRED */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783784c9200292620.svg"
                    alt="TMDB Logo"
                    className="h-6 brightness-0 invert"
                    onClick={() => window.open('https://www.themoviedb.org', '_blank')}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs text-gray-400">
                    This product uses the TMDB API but is not endorsed or certified by TMDB.
                  </p>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                © 2025 MovieVerse | Made by [Your Name] | Final Year Project - [University Name]
              </p>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}

export default LandingPage