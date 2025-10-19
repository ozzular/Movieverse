import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { tmdbApi } from '../services/tmdbApi'
import type { Movie } from '../types/index'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0)

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const movies = await tmdbApi.getTrendingMovies('US')
        setTrendingMovies(movies.slice(0, 6))
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch trending movies:', error)
        setIsLoading(false)
      }
    }
    fetchTrendingMovies()
  }, [])

  const handleEnterVerse = () => {
    navigate('/app')
  }

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`)
  }

  // Auto-rotate through movies
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex(prev => (prev + 1) % trendingMovies.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [trendingMovies.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.2),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.2),transparent_50%)]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          className="min-h-screen flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="max-w-7xl w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent leading-tight">
                    MovieVerse
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                    Discover your cinematic universe. Unlimited entertainment at your fingertips.
                  </p>
                </div>

                <motion.button
                  onClick={handleEnterVerse}
                  className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-lg font-semibold text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Enter MovieVerse</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </motion.button>
              </motion.div>

              {/* Right Content - Movie Showcase */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative"
              >
                <div className="relative h-96 w-full">
                  <AnimatePresence mode="wait">
                    {!isLoading && trendingMovies.length > 0 && (
                      <motion.div
                        key={currentMovieIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0 backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8 shadow-2xl"
                      >
                        <div className="h-full flex items-center gap-6">
                          <div className="flex-shrink-0">
                            <img
                              src={trendingMovies[currentMovieIndex]?.backdrop_path
                                ? `https://image.tmdb.org/t/p/w780${trendingMovies[currentMovieIndex].backdrop_path}`
                                : '/placeholder-movie.jpg'
                              }
                              alt={trendingMovies[currentMovieIndex]?.title || 'Movie'}
                              className="w-48 h-32 object-cover rounded-xl shadow-lg"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-movie.jpg'
                              }}
                            />
                          </div>
                          <div className="flex-1 space-y-3">
                            <h3 className="text-xl font-semibold text-white">
                              {trendingMovies[currentMovieIndex]?.title || 'Trending Movie'}
                            </h3>
                            <p className="text-gray-300 text-sm line-clamp-2">
                              {trendingMovies[currentMovieIndex]?.overview || 'Discover amazing movies...'}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-purple-300">
                              <span className="flex items-center gap-1">
                                ⭐ {trendingMovies[currentMovieIndex]?.vote_average?.toFixed(1) || 'N/A'}
                              </span>
                              <span>•</span>
                              <span>{trendingMovies[currentMovieIndex]?.release_date?.split('-')[0] || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Loading state */}
                  {isLoading && (
                    <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8 shadow-2xl h-full flex items-center justify-center">
                      <div className="text-white text-lg">Loading cinematic experiences...</div>
                    </div>
                  )}
                </div>

                {/* Movie indicators */}
                {!isLoading && trendingMovies.length > 0 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {trendingMovies.slice(0, 5).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMovieIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                          index === currentMovieIndex ? 'bg-purple-400' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Featured Movies Section */}
        <motion.section
          className="py-20 px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Trending Now
              </h2>
              <p className="text-xl text-gray-300">
                Discover the latest and most popular movies
              </p>
            </motion.div>

            {!isLoading && trendingMovies.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trendingMovies.slice(0, 6).map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="cursor-pointer"
                    onClick={() => handleMovieClick(movie)}
                  >
                    <div className="backdrop-blur-xl bg-white/10 rounded-2xl overflow-hidden border border-white/20 shadow-xl transform hover:scale-105 transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : '/placeholder-movie.jpg'
                          }
                          alt={movie.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-movie.jpg'
                          }}
                        />
                        <div className="absolute top-3 right-3 backdrop-blur-lg bg-black/50 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full font-medium transition-colors duration-300">
                            View Details
                          </button>
                        </div>
                      </div>
                      <div className="p-6 space-y-2">
                        <h3 className="text-white font-semibold text-lg line-clamp-2">
                          {movie.title}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!isLoading && trendingMovies.length === 0 && (
              <div className="text-center py-16">
                <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 inline-block">
                  <div className="text-gray-300 text-lg">Loading movie recommendations...</div>
                </div>
              </div>
            )}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="py-12 px-6 bg-black/20 backdrop-blur-xl border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Logo & Brand */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  MovieVerse
                </h3>
                <p className="text-gray-400 text-sm">
                  Your cinematic universe awaits
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-2 text-center md:text-left">
                <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                <div className="flex flex-col md:flex-row gap-4 text-gray-400 text-sm">
                  <button
                    onClick={handleEnterVerse}
                    className="hover:text-purple-400 transition-colors duration-300"
                  >
                    Explore Movies
                  </button>
                  <button
                    onClick={handleEnterVerse}
                    className="hover:text-purple-400 transition-colors duration-300"
                  >
                    Trending Now
                  </button>
                </div>
              </div>

              {/* Contact & Credits */}
              <div className="text-right space-y-2">
                <div className="text-gray-400 text-sm">
                  <div className="mb-2">
                    <span className="block font-medium text-white mb-1">Made with ❤️ by</span>
                    <span className="block text-purple-300 font-semibold">Peter Agbo</span>
                  </div>
                  <div className="space-y-1">
                    <a
                      href="https://github.com/ozzular"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-purple-400 transition-colors duration-300"
                    >
                      GitHub: ozzular
                    </a>
                    <a
                      href="mailto:work.peter.louis@gmail.com"
                      className="block hover:text-purple-400 transition-colors duration-300"
                    >
                      work.peter.louis@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 mt-8 pt-8 text-center">
              <div className="text-gray-500 text-sm">
                © {new Date().getFullYear()} MovieVerse. Bringing cinema to your screen.
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}

export default LandingPage
