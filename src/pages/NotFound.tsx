import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Home,
  Search,
  RefreshCw,
  Star,
  Play,
  ChevronDown,
  Zap,
  RotateCcw
} from 'lucide-react'

const NotFound: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [popularMovies, setPopularMovies] = useState<any[]>([])

  useEffect(() => {
    // Fetch some popular movies to suggest
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=1`
        )
        const data = await response.json()
        setPopularMovies(data.results?.slice(0, 6) || [])
      } catch (error) {
        console.error('Failed to fetch popular movies:', error)
      }
    }
    fetchPopularMovies()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const suggestedSuggestions = [
    'Action movies',
    'Drama series',
    'Comedy films',
    'Sci-fi adventures',
    'Romance movies'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 opacity-20">
          <div className="w-full h-full bg-cyan-500 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 opacity-20">
          <div className="w-full h-full bg-purple-500 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-white mb-4 relative">
            4
            <span className="inline-block mx-2 animate-bounce">
              <Star className="w-12 h-12 md:w-16 h-16 text-yellow-400 fill-current" />
            </span>
            4
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Looks like the page you're looking for doesn't exist or has been moved to a new location.
          </p>
        </div>

        {/* Search and Navigation */}
        <div className="glass-card p-8 rounded-2xl mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Search for Movies</h2>
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try searching..."
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors pr-10"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Quick Search Suggestions */}
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestedSuggestions.map(suggestion => (
              <button
                key={suggestion}
                onClick={() => navigate(`/search?q=${encodeURIComponent(suggestion)}`)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-full border border-white/10 transition-colors text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/" className="glass-card px-8 py-4 rounded-xl flex items-center space-x-2 hover:bg-white/10 transition-colors group">
            <Home className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="text-white font-medium">Go Home</span>
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="glass-card px-8 py-4 rounded-xl flex items-center space-x-2 hover:bg-white/10 transition-colors group"
          >
            <RotateCcw className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-white font-medium">Go Back</span>
          </button>

          <button
            onClick={() => window.location.reload()}
            className="glass-card px-8 py-4 rounded-xl flex items-center space-x-2 hover:bg-white/10 transition-colors group"
          >
            <RefreshCw className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
            <span className="text-white font-medium">Refresh</span>
          </button>
        </div>

        {/* Popular Movies Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center space-x-3">
            <span>Popular Movies</span>
            <div className="flex space-x-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularMovies.map(movie => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-transform hover:ring-1 hover:ring-white/20 group"
              >
                <div className="aspect-[2/3] relative">
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : '/placeholder-poster.jpg'}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://via.placeholder.com/200x300/1f2937/ffffff?text=No+Image'
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-white font-semibold">{movie.vote_average?.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-white font-medium text-sm line-clamp-2">{movie.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="glass-card p-8 rounded-2xl mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center justify-center space-x-3">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span>Did You Know?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl mb-2">🎬</div>
              <p className="text-gray-400 text-sm">
                The first ever movie was "Roundhay Garden Scene" made in 1888 and lasted only 2.11 seconds!
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">📽️</div>
              <p className="text-gray-400 text-sm">
                "The Shawshank Redemption" was filmed in a real prison still used for inmates before being shut down.
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">🎭</div>
              <p className="text-gray-400 text-sm">
                The most expensive movie ever made is "Avengers: Endgame" costing $356 million!
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-white mb-3">Get Movie Recommendations</h2>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe for weekly movie picks delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-xs mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
            />
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
