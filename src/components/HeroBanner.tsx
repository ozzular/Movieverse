import React from 'react'
import { Link } from 'react-router-dom'

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  overview: string
  backdrop_path?: string
}

interface HeroBannerProps {
  movie: Movie
}

const HeroBanner: React.FC<HeroBannerProps> = ({ movie }) => {
  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/original${movie.poster_path}`

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.jpg'

  return (
    <div className="relative h-96 w-full overflow-hidden">
      {/* Background Poster with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path || '/placeholder-movie.jpg'}`
          }}
        />
        {/* Fallback gradient background */}
        <div className="absolute inset-0 galaxy-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-8 h-full flex items-end">
        <div className="max-w-2xl">
          {/* Movie Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 glow-text">
            {movie.title}
          </h1>

          {/* Movie Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-galaxy-red text-xl font-semibold">
                {movie.vote_average.toFixed(1)}
              </span>
              <div className="flex text-galaxy-red">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(movie.vote_average / 2) ? 'text-galaxy-red' : 'text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Movie Overview */}
          <p className="text-gray-200 text-base md:text-lg mb-6 line-clamp-3 max-w-2xl">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={`/movie/${movie.id}`}
              className="bg-galaxy-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Watch Trailer</span>
            </Link>

            <button className="border-2 border-galaxy-purple text-galaxy-purple hover:bg-galaxy-purple hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Add to Favorites</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
