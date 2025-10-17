import React from 'react'
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'
import StreamingBadges from './StreamingBadges'
import { useSelectedMovie } from '../contexts/SelectedMovieContext'
import type { Movie } from '../types/index'

interface MovieCardProps {
  movie: Movie
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { showHero } = useSelectedMovie()
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.jpg'

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    showHero(movie)
  }

  return (
    <div className="movie-card cursor-pointer relative" onClick={handleCardClick}>
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-galaxy-gray hover:shadow-lg hover:shadow-galaxy-purple/20 transition-all duration-300">
          {/* Movie Poster */}
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-movie.jpg'
            }}
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 text-center p-4 transform translate-y-4 hover:translate-y-0">
              <p className="text-white text-sm line-clamp-3">
                {movie.overview}
              </p>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-80 rounded-full px-2 py-1 backdrop-blur-sm">
            <span className="text-galaxy-red text-sm font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>

          {/* Favorite Button */}
          <div className="absolute top-2 left-2 opacity-0 hover:opacity-100 transition-all duration-300 transform -translate-y-2 hover:translate-y-0">
            <FavoriteButton movie={movie} />
          </div>
        </div>
      </Link>

      {/* Movie Title */}
      <div className="mt-2">
        <h3 className="text-white text-sm font-medium line-clamp-2 hover:text-galaxy-purple transition-colors duration-300">
          {movie.title}
        </h3>
      </div>

      {/* Streaming Badges */}
      <div className="mt-2">
        <StreamingBadges movieId={movie.id} movieTitle={movie.title} />
      </div>
    </div>
  )
}

export default MovieCard
