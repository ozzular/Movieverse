import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useSearch } from '../contexts/SearchContext'
import MovieCard from '../components/MovieCard'
import type { Movie } from '../types/index'

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams()
  const { searchQuery, searchResults, isSearching } = useSearch()
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([])

  useEffect(() => {
    const query = searchParams.get('q')
    if (query && query !== searchQuery) {
      // If URL has query but context doesn't, perform search
      // This handles direct URL access and browser refresh
    }
  }, [searchParams, searchQuery])

  useEffect(() => {
    setDisplayedMovies(searchResults)
  }, [searchResults])

  if (isSearching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-galaxy-purple mx-auto mb-4"></div>
          <p className="text-white text-lg">Searching for movies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Search Results
          </h1>
          {searchQuery && (
            <p className="text-gray-400">
              {displayedMovies.length > 0
                ? `Found ${displayedMovies.length} results for "${searchQuery}"`
                : `No results found for "${searchQuery}"`
              }
            </p>
          )}
        </div>

        {/* Search Results Grid */}
        {displayedMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              {searchQuery ? 'No movies found' : 'Search for movies'}
            </h2>
            <p className="text-gray-400 mb-8">
              {searchQuery
                ? `Try searching for a different movie title, actor, or director.`
                : 'Enter a movie title in the search bar above to find movies.'
              }
            </p>
            {searchQuery && (
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-galaxy-purple hover:bg-galaxy-red text-white rounded-lg transition-colors duration-300"
              >
                Back to Home
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults
