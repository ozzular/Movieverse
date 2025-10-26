import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import MovieCard from '../components/MovieCard'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const SearchResults: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get('q') || ''

  const [results, setResults] = useState<any[]>([])
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [suggestionsLoading, setSuggestionsLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalResults, setTotalResults] = useState(0)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [currentQuery, setCurrentQuery] = useState(query)

  const observerRef = useRef<IntersectionObserver>()
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null)

  // Search function
  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      setSuggestions([])
      return
    }

    setCurrentQuery(query)
    setResults([])
    setCurrentPage(1)
    setHasMore(true)
    searchMovies(query, 1)
  }, [query])

  const searchMovies = async (searchQuery: string, page: number) => {
    if (page === 1) {
      setLoading(true)
    } else {
      setIsLoadingMore(true)
    }
    setError('')

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${page}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch search results')
      }

      const data = await response.json()
      setTotalResults(data.total_results)

      if (page === 1) {
        setResults(data.results)
      } else {
        setResults(prev => [...prev, ...data.results])
      }

      setHasMore(data.page < data.total_pages && data.results.length > 0)
    } catch (err) {
      console.error('Search error:', err)
      setError('Failed to search movies. Please try again.')
    } finally {
      setLoading(false)
      setIsLoadingMore(false)
    }
  }

  // Get movie suggestions as user types
  const handleSearchInput = async (searchQuery: string) => {
    if (searchQuery.trim().length === 0) {
      setSuggestions([])
      return
    }

    setSuggestionsLoading(true)
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}&page=1&limit=5`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions')
      }

      const data = await response.json()
      setSuggestions(data.results.slice(0, 5))
    } catch (err) {
      console.error('Suggestions error:', err)
      setSuggestions([])
    } finally {
      setSuggestionsLoading(false)
    }
  }

  // Infinite scroll setup
  const lastMovieElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return
      if (observerRef.current) observerRef.current.disconnect()

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          const nextPage = currentPage + 1
          setCurrentPage(nextPage)
          searchMovies(currentQuery, nextPage)
        }
      })

      if (node) observerRef.current.observe(node)
    },
    [loading, hasMore, isLoadingMore, currentPage, currentQuery]
  )

  const handleSuggestionClick = (suggestion: any) => {
    navigate(`/movie/${suggestion.id}`)
  }

  const SearchSkeleton = () => (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-800 h-64 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Navbar */}
      <div className="lg:ml-16">
        <Navbar />
      </div>

      <main className="lg:ml-16 pt-20 px-4">
        {/* Search Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Search className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Search
              </h1>
              <p className="text-gray-400 mt-1">
                Discover movies, TV shows, and people
                {totalResults > 0 && (
                  <span className="text-cyan-400 ml-1">• {totalResults} results for "{currentQuery}"</span>
                )}
              </p>
            </div>
          </div>

          {/* Enhanced Search input */}
          <div className="relative">
            <input
              id="search-input"
              type="text"
              value={currentQuery}
              onChange={(e) => {
                const q = e.target.value
                setCurrentQuery(q)
                if (q.trim() !== '') {
                  navigate(`/search?q=${encodeURIComponent(q)}`, { replace: true })
                  handleSearchInput(q)
                } else {
                  setSuggestions([])
                }
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && currentQuery.trim() !== '') {
                  navigate(`/search?q=${encodeURIComponent(currentQuery.trim())}`)
                }
              }}
              placeholder="Search for movies, TV shows, people..."
              className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors text-lg"
              autoFocus
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />

            {/* Movie Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-gray-800/95 backdrop-blur-sm border border-white/10 rounded-xl mt-2 z-10 max-h-60 overflow-y-auto">
                {suggestions.map((movie) => (
                  <button
                    key={movie.id}
                    onClick={() => handleSuggestionClick(movie)}
                    className="w-full p-4 text-left hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0 first:rounded-t-xl"
                  >
                    <div className="flex items-center space-x-3">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="w-10 h-15 object-cover rounded"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="w-10 h-15 bg-gray-600 rounded flex items-center justify-center">
                          <Search className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-white font-medium truncate">{movie.title}</p>
                        <p className="text-gray-400 text-sm">
                          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
                {suggestionsLoading && (
                  <div className="p-4 text-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-400 mx-auto"></div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Trending Searches */}
          <div className="mt-6">
            <h3 className="text-white font-semibold mb-3">Trending Searches</h3>
            <div className="flex flex-wrap gap-2">
              {['Action Movies', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Documentary'].map(trending => (
                <button
                  key={trending}
                  onClick={() => {
                    setCurrentQuery(trending)
                    navigate(`/search?q=${encodeURIComponent(trending)}`)
                  }}
                  className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-4 py-2 rounded-full border border-white/10 transition-colors text-sm"
                >
                  {trending}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {error && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="text-red-400 text-lg mb-4">⚠️ {error}</div>
            <button
              onClick={() => searchMovies(currentQuery, 1)}
              className="glass-card hover:bg-white/10 px-6 py-3 rounded-lg transition-colors text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {!error && loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            <SearchSkeleton />
          </div>
        )}

        {!error && !loading && currentQuery.trim() !== '' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {results.map((movie, index) => {
                if (results.length === index + 1) {
                  // This is the last item, attach the observer
                  return (
                    <div ref={lastMovieElementRef} key={movie.id}>
                      <MovieCard movie={movie} />
                    </div>
                  )
                } else {
                  return <MovieCard key={movie.id} movie={movie} />
                }
              })}
            </div>

            {/* Loading indicator for infinite scroll */}
            {isLoadingMore && (
              <div className="text-center mt-8">
                <div className="inline-flex items-center space-x-2 text-cyan-400">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                  <span>Loading more results...</span>
                </div>
              </div>
            )}

            {results.length === 0 && !loading && !error && (
              <div className="max-w-2xl mx-auto text-center py-16">
                <div className="w-16 h-16 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  No results found
                </h2>
                <p className="text-gray-400 mb-8">
                  Try searching with different keywords or check the spelling.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={() => navigate('/genres')}
                    className="glass-card hover:bg-white/10 px-6 py-2 rounded-lg transition-colors text-white"
                  >
                    Browse Genres
                  </button>
                  <button
                    onClick={() => navigate('/app')}
                    className="glass-card hover:bg-white/10 px-6 py-2 rounded-lg transition-colors text-white"
                  >
                    Popular Movies
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Initial state - suggest search */}
        {!error && !loading && currentQuery.trim() === '' && (
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="w-20 h-20 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center mb-8 mx-auto">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-3xl font-semibold text-white mb-4">
              Search for Movies
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Discover new movies to watch from our extensive collection. Start typing in the search bar above.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-3">Popular Searches</h3>
                <div className="space-y-2">
                  {['Avengers', 'Spider-Man', 'Batman', 'Harry Potter'].map(title => (
                    <button
                      key={title}
                      onClick={() => {
                        setCurrentQuery(title)
                        navigate(`/search?q=${encodeURIComponent(title)}`)
                      }}
                      className="block w-full text-left p-2 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-3">By Genre</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Action', query: 'action movies' },
                    { name: 'Comedy', query: 'comedy movies' },
                    { name: 'Drama', query: 'drama movies' }
                  ].map(genre => (
                    <button
                      key={genre.name}
                      onClick={() => {
                        setCurrentQuery(genre.query)
                        navigate(`/search?q=${encodeURIComponent(genre.query)}`)
                      }}
                      className="block w-full text-left p-2 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-3">Quick Browse</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/genres')}
                    className="block w-full text-left p-2 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                  >
                    Browse All Genres
                  </button>
                  <button
                    onClick={() => navigate('/movies')}
                    className="block w-full text-left p-2 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                  >
                    Popular Movies
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default SearchResults
