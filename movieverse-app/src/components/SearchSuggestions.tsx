import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../contexts/SearchContext'

interface SearchSuggestionsProps {
  isVisible: boolean
  onClose: () => void
  className?: string
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  isVisible,
  onClose,
  className = ''
}) => {
  const { searchSuggestions, isLoadingSuggestions, searchQuery } = useSearch()
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible, onClose])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isVisible, onClose])

  const handleSuggestionClick = (movieId: number) => {
    navigate(`/movie/${movieId}`)
    onClose()
  }

  if (!isVisible || searchQuery.length < 3) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={dropdownRef}
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto ${className}`}
      >
        {isLoadingSuggestions && (
          <div className="p-4 text-center">
            <div className="inline-flex items-center space-x-2 text-gray-300">
              <div className="w-4 h-4 border-2 border-galaxy-purple border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Searching...</span>
            </div>
          </div>
        )}

        {!isLoadingSuggestions && searchSuggestions.length === 0 && searchQuery.length >= 3 && (
          <div className="p-4 text-center">
            <p className="text-gray-400 text-sm">No results found for "{searchQuery}"</p>
          </div>
        )}

        {!isLoadingSuggestions && searchSuggestions.length > 0 && (
          <div className="py-2">
            {searchSuggestions.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/5 last:border-b-0"
                onClick={() => handleSuggestionClick(movie.id)}
              >
                <div className="flex items-center space-x-3">
                  {/* Movie Poster Thumbnail */}
                  <div className="flex-shrink-0">
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-12 h-16 object-cover rounded-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/placeholder-movie.jpg'
                      }}
                    />
                  </div>

                  {/* Movie Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm truncate">
                      {movie.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-gray-400 text-xs">
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center space-x-1">
                          <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-galaxy-red text-xs font-medium">
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoadingSuggestions && searchSuggestions.length > 0 && (
          <div className="p-3 border-t border-white/10">
            <p className="text-gray-400 text-xs text-center">
              Press Enter to search for "{searchQuery}"
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default SearchSuggestions