import React from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../contexts/FavoritesContext'
import MovieCard from '../components/MovieCard'

const Favorites: React.FC = () => {
  const { favorites, clearFavorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-2xl font-bold text-white mb-4">No Favorite Movies Yet</h2>
          <p className="text-gray-400 mb-8">Start browsing and add movies to your favorites!</p>
          <Link
            to="/"
            className="bg-galaxy-purple hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Browse Movies
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Favorite Movies</h1>
            <p className="text-gray-400">{favorites.length} movie{favorites.length !== 1 ? 's' : ''} saved</p>
          </div>
          <button
            onClick={clearFavorites}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Favorites