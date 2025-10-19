import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useRegion } from '../contexts/RegionContext'
import MovieCard from './MovieCard'
// Using simple SVG instead of lucide icon

const RegionalHighlights: React.FC = () => {
  const { regionalContent, userLocation, isLoading } = useRegion()

  if (isLoading) {
    return (
      <div className="mb-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-48 mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!regionalContent || !userLocation) return null

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-galaxy-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-white">
              Trending in {userLocation.country}
            </h2>
          </div>
          <p className="text-gray-400 text-sm">
            Popular movies in your region right now
          </p>
        </div>

        <motion.div
          className="flex items-center space-x-2 text-gray-400 text-sm bg-galaxy-purple/10 backdrop-blur px-3 py-1 rounded-full border border-galaxy-purple/20"
          whileHover={{ scale: 1.05 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{userLocation.city}</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {regionalContent.trending.slice(0, 5).map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </div>

      {/* Regional Statistics */}
      <motion.div
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-galaxy-red mb-1">
            {regionalContent.trending.length}
          </div>
          <p className="text-gray-400 text-sm">Trending Movies</p>
        </div>

        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-galaxy-purple mb-1">
            {regionalContent.popular.length}
          </div>
          <p className="text-gray-400 text-sm">Popular Movies</p>
        </div>

        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-galaxy-blue mb-1">
            {regionalContent.topRated.length}
          </div>
          <p className="text-gray-400 text-sm">Top Rated Movies</p>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default RegionalHighlights
