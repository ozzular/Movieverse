import React, { useState } from 'react'
import { useFavorites } from '../contexts/FavoritesContext'
import type { Movie } from '../types/index'

interface FavoriteButtonProps {
  movie: Movie
  className?: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie, className = '' }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [isAnimating, setIsAnimating] = useState(false)
  const favorite = isFavorite(movie.id)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAnimating(true)

    // Trigger animation
    setTimeout(() => setIsAnimating(false), 600)

    if (favorite) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20 ${className} ${
        favorite
          ? 'text-red-500 hover:text-red-400 bg-red-500/20 shadow-lg shadow-red-500/30'
          : 'text-gray-400 hover:text-red-500 bg-white/10 hover:bg-red-500/20'
      } ${isAnimating ? 'animate-pulse scale-125' : ''}`}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className={`w-6 h-6 transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}
        fill={favorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={favorite ? 0 : 2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  )
}

export default FavoriteButton
