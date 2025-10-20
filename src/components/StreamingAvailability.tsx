import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { justWatchApi } from '../services/justWatchApi'
import type { StreamingProvider } from '../types/index'

interface StreamingAvailabilityProps {
  movieTitle: string
  releaseYear?: number
  className?: string
}

const StreamingAvailability: React.FC<StreamingAvailabilityProps> = ({
  movieTitle,
  releaseYear,
  className = ''
}) => {
  const [providers, setProviders] = useState<StreamingProvider[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (movieTitle) {
      fetchProviders()
    }
  }, [movieTitle, releaseYear])

  const fetchProviders = async () => {
    setLoading(true)
    setError(null)

    try {
      const streamingProviders = await justWatchApi.getStreamingProviders(movieTitle, releaseYear)
      setProviders(streamingProviders)
    } catch (err) {
      console.error('Error fetching streaming providers:', err)
      setError('Unable to load streaming information')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={`glassmorphism p-6 rounded-xl ${className}`}>
        <h3 className="text-xl font-semibold mb-4 text-white">Where to Watch</h3>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-2 border-galaxy-purple border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-300">Loading streaming info...</span>
        </div>
      </div>
    )
  }

  if (error || providers.length === 0) {
    return (
      <div className={`glassmorphism p-6 rounded-xl ${className}`}>
        <h3 className="text-xl font-semibold mb-4 text-white">Where to Watch</h3>
        <p className="text-gray-400">
          {error || 'Not available on major streaming platforms'}
        </p>
      </div>
    )
  }

  return (
    <div className={`glassmorphism p-6 rounded-xl ${className}`}>
      <h3 className="text-xl font-semibold mb-4 text-white">Where to Watch</h3>

      <div className="flex flex-wrap gap-4 items-center">
        {providers.map((provider) => (
          <motion.div
            key={provider.name}
            className="flex flex-col items-center space-y-2 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(provider.url, '_blank')}
          >
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center p-2 group-hover:bg-white/20 transition-colors">
              <img
                src={provider.logo}
                alt={`${provider.name} logo`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  // Show text fallback if image fails to load
                  const parent = target.parentElement
                  if (parent && !parent.querySelector('.fallback-text')) {
                    const fallback = document.createElement('span')
                    fallback.className = 'fallback-text text-white text-xs font-medium'
                    fallback.textContent = provider.name.split(' ')[0] // Show first word only
                    parent.appendChild(fallback)
                  }
                }}
              />
            </div>
            <span className="text-xs text-gray-300 text-center leading-tight group-hover:text-white transition-colors">
              {provider.name}
            </span>
          </motion.div>
        ))}
      </div>

      {providers.length > 0 && (
        <p className="text-xs text-gray-500 mt-3">
          Click on a platform to watch this movie
        </p>
      )}
    </div>
  )
}

export default StreamingAvailability