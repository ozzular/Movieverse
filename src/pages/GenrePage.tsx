import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { tmdbApi } from '../services/tmdbApi'
import { useGenres } from '../contexts/GenreContext'
import { useSelectedMovie } from '../contexts/SelectedMovieContext'
import MovieCard from '../components/MovieCard'
import type { Movie } from '../types/index'

const GenresPage: React.FC = () => {
  const navigate = useNavigate()
  const { genres, isLoading: genresLoading } = useGenres()
  const { selectedMovie, showHero, hideHero } = useSelectedMovie()

  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const [genreMovies, setGenreMovies] = useState<Movie[]>([])
  const [loadingMovies, setLoadingMovies] = useState(false)
  const [movieError, setMovieError] = useState<string | null>(null)

  const handleGenreClick = async (genreId: number) => {
    // If clicking the same genre, collapse it
    if (selectedGenre === genreId) {
      setSelectedGenre(null)
      setGenreMovies([])
      return
    }

    setSelectedGenre(genreId)
    setLoadingMovies(true)
    setMovieError(null)

    try {
      const movies = await tmdbApi.getMoviesByGenre(genreId)
      setGenreMovies(movies)
    } catch (err) {
      console.error(`Error fetching movies for genre ${genreId}:`, err)
      setMovieError('Failed to load movies for this genre')
      setGenreMovies([])
    } finally {
      setLoadingMovies(false)
    }
  }

  // Loading state
  if (genresLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-galaxy-purple mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading genres...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Dynamic Hero Section */}
      {selectedMovie && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
          <img
            src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path || selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-end">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 glow-text">
                  {selectedMovie.title}
                </h1>
                <div className="flex items-center mb-4">
                  <span className="text-galaxy-red text-xl font-semibold mr-2">
                    {selectedMovie.vote_average.toFixed(1)}
                  </span>
                  <div className="flex text-galaxy-red">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(selectedMovie.vote_average / 2) ? 'text-galaxy-red' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-200 text-lg mb-6 line-clamp-3">
                  {selectedMovie.overview}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/movie/${selectedMovie.id}`}
                    className="bg-galaxy-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span>Watch Trailer</span>
                  </Link>
                  <button
                    onClick={hideHero}
                    className="border-2 border-galaxy-purple text-galaxy-purple hover:bg-galaxy-purple hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Genres Page Content */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Genres</h1>
                <p className="text-gray-400">Explore movies by genre</p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back</span>
                </button>
              </div>
            </div>
          </div>

          {/* Genres List - Text Only */}
          <div className="glass-card rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Select a Genre</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.id)}
                  className={`p-4 rounded-lg transition-all duration-300 font-medium text-center ${
                    selectedGenre === genre.id
                      ? 'bg-galaxy-purple text-white shadow-lg transform scale-105'
                      : 'text-gray-300 hover:text-white hover:bg-galaxy-purple/30 border border-galaxy-purple/20 hover:border-galaxy-purple/50'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Genre Movies */}
          {selectedGenre && (
            <div className="glass-card rounded-xl p-6">
              {loadingMovies ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-galaxy-purple mx-auto mb-4"></div>
                  <p className="text-white text-lg">Loading movies...</p>
                </div>
              ) : movieError ? (
                <div className="text-center py-8">
                  <div className="text-red-500 text-4xl mb-4">⚠️</div>
                  <p className="text-white text-lg mb-4">{movieError}</p>
                  <button
                    onClick={() => handleGenreClick(selectedGenre)}
                    className="bg-galaxy-red hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : genreMovies.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-white">
                      {genres.find(g => g.id === selectedGenre)?.name} Movies
                    </h3>
                    <button
                      onClick={() => handleGenreClick(selectedGenre)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {genreMovies.map((movie: Movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GenresPage
