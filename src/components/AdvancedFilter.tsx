import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGenres } from '../contexts/GenreContext'
import { useFilters } from '../contexts/FilterContext'

interface AdvancedFilterProps {
  className?: string
}

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ className = '' }) => {
  const { genres, selectedGenres, toggleGenre, clearFilters, isLoading } = useGenres()
  const { filters, toggleRegion, clearAllFilters } = useFilters()
  const [activeFilter, setActiveFilter] = useState<'genres' | 'dates' | 'regions' | null>(null)

  const filterCategories = [
    {
      id: 'genres',
      label: 'Genres',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 010 2h-1v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 010-2h4z" />
        </svg>
      ),
      count: selectedGenres.length
    },
    {
      id: 'dates',
      label: 'Release Year',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      count: filters.releaseYearRange ? 1 : 0
    },
    {
      id: 'regions',
      label: 'Regions',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      count: filters.regions.length
    }
  ]

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-12 bg-galaxy-gray rounded-lg"></div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Filter Category Buttons */}
      <div className="flex flex-wrap gap-2">
        {filterCategories.map((category) => (
          <div key={category.id} className="relative">
            <button
              onClick={() => setActiveFilter(activeFilter === category.id ? null : category.id as any)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300
                ${activeFilter === category.id
                  ? 'bg-galaxy-purple text-white'
                  : 'bg-galaxy-gray/50 text-gray-300 hover:text-white hover:bg-galaxy-purple/20'
                }
              `}
            >
              {category.icon}
              <span className="font-medium">{category.label}</span>
              {category.count > 0 && (
                <span className="bg-galaxy-red text-white text-xs rounded-full px-2 py-1">
                  {category.count}
                </span>
              )}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${activeFilter === category.id ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        ))}

        {/* Clear All Button */}
        {(selectedGenres.length > 0 || filters.regions.length > 0 || filters.releaseYearRange) && (
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 bg-galaxy-red/20 text-galaxy-red hover:bg-galaxy-red hover:text-white rounded-lg transition-all duration-300"
          >
            <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear All
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {selectedGenres.length > 0 && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {genres
              .filter(genre => selectedGenres.includes(genre.id))
              .map(genre => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-galaxy-purple/20 text-galaxy-purple text-sm rounded-full flex items-center space-x-1"
                >
                  <span>{genre.name}</span>
                  <button
                    onClick={() => toggleGenre(genre.id)}
                    className="hover:text-white transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Genre Filter Panel */}
      {activeFilter === 'genres' && (
        <div className="p-4 bg-galaxy-gray/50 border border-galaxy-purple/30 rounded-lg backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
            {genres.map((genre) => (
              <Link
                key={genre.id}
                to={`/genre/${genre.id}`}
                className={`block p-3 text-sm rounded-lg transition-all duration-300 text-left ${
                  selectedGenres.includes(genre.id)
                    ? 'bg-galaxy-purple text-white'
                    : 'text-gray-300 hover:text-white hover:bg-galaxy-purple/20'
                }`}
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Release Year Filter Panel */}
      {activeFilter === 'dates' && (
        <div className="p-4 bg-galaxy-gray/50 border border-galaxy-purple/30 rounded-lg backdrop-blur-sm">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {['2024', '2020-2023', '2010-2019', '2000-2009', '1990-1999', 'Before 1990'].map((range) => (
              <button
                key={range}
                className="p-3 text-sm rounded-lg transition-all duration-300 text-left text-gray-300 hover:text-white hover:bg-galaxy-purple/20"
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Regions Filter Panel */}
      {activeFilter === 'regions' && (
        <div className="p-4 bg-galaxy-gray/50 border border-galaxy-purple/30 rounded-lg backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {['Hollywood', 'Bollywood', 'Europe', 'Asia', 'Latin America', 'Africa'].map((region) => (
              <button
                key={region}
                onClick={() => toggleRegion(region)}
                className={`p-3 text-sm rounded-lg transition-all duration-300 text-left ${
                  filters.regions.includes(region)
                    ? 'bg-galaxy-purple text-white'
                    : 'text-gray-300 hover:text-white hover:bg-galaxy-purple/20'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdvancedFilter
