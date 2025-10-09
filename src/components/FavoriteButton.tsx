import React from 'react'
import { useFavorites } from '../contexts/FavoritesContext'
import { Movie } from '../types'

interface FavoriteButtonProps {
  movie: Movie
  className?: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie, className = '' }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const favorite = isFavorite(movie.id)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (favorite) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${className} ${
        favorite
          ? 'text-red-500 hover:text-red-400'
          : 'text-gray-400 hover:text-red-500'
      }`}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className="w-6 h-6"
        fill={favorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  )
}

export default FavoriteButton