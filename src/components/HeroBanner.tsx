import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { tmdbApi } from '../services/tmdbApi'
import type { Movie } from '../types/index'

interface HeroBannerProps {
  className?: string
}

const HeroBanner: React.FC<HeroBannerProps> = ({ className = '' }) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  // Fetch trending movies for hero rotation
  useEffect(() => {
    const fetchHeroMovies = async () => {
      try {
        setIsLoading(true)
        const trendingMovies = await tmdbApi.getTrendingMovies()
        // Get 5-8 movies for rotation
        const heroMovies = trendingMovies.slice(0, 6).filter(movie => movie.backdrop_path)
        setMovies(heroMovies)
      } catch (error) {
        console.error('Error fetching hero movies:', error)
        // Fallback to popular movies if trending fails
        try {
          const popularMovies = await tmdbApi.getPopularMovies()
          const heroMovies = popularMovies.slice(0, 6).filter(movie => movie.backdrop_path)
          setMovies(heroMovies)
        } catch (fallbackError) {
          console.error('Error fetching fallback hero movies:', fallbackError)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchHeroMovies()
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (movies.length === 0 || isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
    }, 6000) // 6 seconds per slide

    return () => clearInterval(interval)
  }, [movies.length, isPaused])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
  }

  if (isLoading || movies.length === 0) {
    return (
      <div className={`relative h-96 w-full overflow-hidden bg-galaxy-gray animate-pulse ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="relative z-20 container mx-auto px-4 py-8 h-full flex items-end">
          <div className="max-w-2xl">
            <div className="h-8 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded mb-4 w-1/2"></div>
            <div className="h-10 bg-gray-700 rounded w-32"></div>
          </div>
        </div>
      </div>
    )
  }

  const currentMovie = movies[currentIndex]
  const backdropUrl = `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`

  return (
    <div
      className={`relative h-[70vh] w-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Smooth Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={backdropUrl}
            alt={currentMovie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://image.tmdb.org/t/p/original${currentMovie.poster_path || '/placeholder-movie.jpg'}`
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-70 hover:opacity-100"
        aria-label="Previous movie"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-70 hover:opacity-100"
        aria-label="Next movie"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-8 h-full flex items-end">
        <motion.div
          key={`content-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl"
        >
          {/* Movie Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 glow-text">
            {currentMovie.title}
          </h1>

          {/* Movie Rating & Year */}
          <div className="flex items-center mb-4 space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-galaxy-red text-xl font-semibold">
                {currentMovie.vote_average.toFixed(1)}
              </span>
              <div className="flex text-galaxy-red">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(currentMovie.vote_average / 2) ? 'text-galaxy-red' : 'text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-gray-300">
              {new Date(currentMovie.release_date).getFullYear()}
            </span>
          </div>

          {/* Movie Overview */}
          <p className="text-gray-200 text-base md:text-lg mb-6 line-clamp-3 max-w-2xl">
            {currentMovie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={`/movie/${currentMovie.id}`}
              className="bg-galaxy-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Watch Trailer</span>
            </Link>

            <Link
              to={`/movie/${currentMovie.id}`}
              className="border-2 border-galaxy-purple text-galaxy-purple hover:bg-galaxy-purple hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>More Info</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 z-30 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {movies.length}
      </div>
    </div>
  )
}

export default HeroBanner