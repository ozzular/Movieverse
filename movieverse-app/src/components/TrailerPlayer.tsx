import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { tmdbApi } from '../services/tmdbApi'

interface TrailerPlayerProps {
  movieId: number
  movieTitle: string
  autoPlay?: boolean
  className?: string
}

const TrailerPlayer: React.FC<TrailerPlayerProps> = ({
  movieId,
  movieTitle,
  autoPlay = false,
  className = ''
}) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (autoPlay && movieId) {
      // Auto-fetch and start playing trailer after a delay
      const timer = setTimeout(() => {
        fetchTrailer()
      }, 1500) // Wait for page load transition

      return () => clearTimeout(timer)
    }
  }, [movieId, autoPlay])

  const fetchTrailer = async () => {
    if (!movieId) return

    setLoading(true)
    setError(null)

    try {
      // Use the TMDB API service instead of direct fetch
      const videosData = await tmdbApi.getMovieVideos(movieId)

      // Filter for official trailer from YouTube
      const trailer = videosData.results.find(
        (video) =>
          video.type === 'Trailer' &&
          video.site === 'YouTube' &&
          video.official === true
      )

      if (trailer) {
        setTrailerKey(trailer.key)
      } else {
        // Fallback to any YouTube trailer if no official one found
        const anyTrailer = videosData.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        )

        if (anyTrailer) {
          setTrailerKey(anyTrailer.key)
        } else {
          setError('Trailer not available')
        }
      }
    } catch (err) {
      console.error('Error fetching trailer:', err)
      setError('Unable to load trailer at this time')
    } finally {
      setLoading(false)
    }
  }

  if (!trailerKey && !loading && !error) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 rounded-lg ${className}`}
           style={{ aspectRatio: '16/9' }}>
        <motion.button
          onClick={fetchTrailer}
          className="bg-galaxy-purple hover:bg-galaxy-red text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          <span>Watch Trailer</span>
        </motion.button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 rounded-lg ${className}`}
           style={{ aspectRatio: '16/9' }}>
        <motion.div
          className="flex flex-col items-center space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-8 h-8 border-4 border-galaxy-purple border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-sm">Loading trailer...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 rounded-lg ${className}`}
           style={{ aspectRatio: '16/9' }}>
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-3 mx-auto">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-red-400 text-sm mb-3">{error}</p>
          <motion.button
            onClick={fetchTrailer}
            className="bg-galaxy-purple hover:bg-galaxy-red text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`bg-black rounded-lg overflow-hidden ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="relative w-full"
          style={{ aspectRatio: '16/9' }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=${autoPlay ? '1' : '0'}&rel=0&modestbranding=1&showinfo=0&fs=1&cc_load_policy=0`}
            title={`${movieTitle} Trailer`}
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TrailerPlayer