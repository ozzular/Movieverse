import React, { useState } from 'react'
import { useGenres } from '../contexts/GenreContext'

const GenreSelector: React.FC = () => {
  const { genres, selectedGenres, toggleGenre, clearFilters, isLoading } = useGenres()
  const [isOpen, setIsOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="mb-6">
        <div className="animate-pulse">
          <div className="h-10 bg-galaxy-gray rounded-lg"></div>
        </div>
      </div>
    )
  }

  const selectedGenreNames = genres
    .filter(genre => selectedGenres.includes(genre.id))
    .map(genre => genre.name)

  return (
    <div className="mb-6">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-galaxy-gray/50 border border-galaxy-purple/30 rounded-lg text-white hover:border-galaxy-purple transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span>
          {selectedGenres.length > 0
            ? `Filtered by: ${selectedGenreNames.join(', ')}`
            : 'Filter by Genre'
          }
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Selected Genres Display */}
      {selectedGenres.length > 0 && (
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-sm text-gray-400">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {selectedGenreNames.map(name => (
              <span key={name} className="px-2 py-1 bg-galaxy-purple/20 text-galaxy-purple text-xs rounded-full">
                {name}
              </span>
            ))}
          </div>
          <button
            onClick={clearFilters}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Genre Dropdown */}
      {isOpen && (
        <div className="mt-4 p-4 bg-galaxy-gray/50 border border-galaxy-purple/30 rounded-lg backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className={`p-2 text-sm rounded-md transition-all duration-300 text-left ${
                  selectedGenres.includes(genre.id)
                    ? 'bg-galaxy-purple text-white'
                    : 'text-gray-300 hover:text-white hover:bg-galaxy-purple/20'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default GenreSelector