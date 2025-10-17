import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMovieStore } from '../store/movieStore'

const Header: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    setIsSearching,
    selectedGenres,
    genres,
    toggleGenre,
    clearFilters,
    isLoadingGenres,
    favorites
  } = useMovieStore()

  const navigate = useNavigate()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
      try {
        // Import tmdbApi dynamically to avoid circular imports
        const { tmdbApi } = await import('../services/tmdbApi')
        const results = await tmdbApi.searchMovies(searchQuery)
        // Update search results in store would need to be handled by parent component
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsSearching(false)
      }
    }
  }

  const selectedGenreNames = genres
    .filter(genre => selectedGenres.includes(genre.id))
    .map(genre => genre.name)

  return (
    <header className="sticky top-0 z-50 glass-morphism">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold galaxy-purple glow-text">
              MovieVerse
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-galaxy-gray/50 border border-galaxy-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-galaxy-purple focus:ring-1 focus:ring-galaxy-purple"
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

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-galaxy-purple transition-colors">
              Home
            </Link>
            <Link
              to="/favorites"
              className="text-white hover:text-galaxy-purple transition-colors flex items-center space-x-1"
            >
              <span>Favorites</span>
              {favorites.length > 0 && (
                <span className="bg-galaxy-red text-white text-xs rounded-full px-2 py-1">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>
        </div>

        {/* Genre Filter */}
        <div className="mt-4">
          {isLoadingGenres ? (
            <div className="animate-pulse">
              <div className="h-10 bg-galaxy-gray rounded-lg"></div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm">Filter by genre:</span>
              <div className="flex flex-wrap gap-2">
                {genres.slice(0, 6).map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => toggleGenre(genre.id)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedGenres.includes(genre.id)
                        ? 'bg-galaxy-purple text-white'
                        : 'bg-galaxy-gray/50 text-gray-300 hover:text-white hover:bg-galaxy-purple/30'
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
              {selectedGenres.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header