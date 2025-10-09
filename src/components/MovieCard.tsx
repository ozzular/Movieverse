import React from 'react'
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  overview: string
}

interface MovieCardProps {
  movie: Movie
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.jpg'

  return (
    <div className="movie-card group cursor-pointer relative">
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-galaxy-gray">
          {/* Movie Poster */}
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-movie.jpg'
            }}
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
              <p className="text-white text-sm line-clamp-3">
                {movie.overview}
              </p>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-75 rounded-full px-2 py-1">
            <span className="text-galaxy-red text-sm font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>

          {/* Favorite Button */}
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FavoriteButton movie={movie} />
          </div>
        </div>
      </Link>

      {/* Movie Title */}
      <div className="mt-2">
        <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-galaxy-purple transition-colors">
          {movie.title}
        </h3>
      </div>
    </div>
  )
}

export default MovieCard