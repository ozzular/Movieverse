import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { tmdbApi } from '../services/tmdbApi'
import { useGenres } from '../contexts/GenreContext'
import { useSelectedMovie } from '../contexts/SelectedMovieContext'
import MovieCard from '../components/MovieCard'
import type { Movie, Genre } from '../types/index'

const GenresPage: React.FC = () => {
  const navigate = useNavigate()
  const { genres, isLoading: genresLoading } = useGenres()
  const { selectedMovie, showHero, hideHero } = useSelectedMovie()

  const [genrePreviews, setGenrePreviews] = useState<{ [genreId: number]: Movie[] }>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGenrePreviews = async () => {
      if (genres.length === 0) return

      try {
        setLoading(true)
        setError(null)

        const previewPromises = genres.slice(0, 12).map(async (genre) => {
          try {
            const movies = await tmdbApi.getMoviesByGenre(genre.id)
            return { genreId: genre.id, movies: movies.slice(0, 3) }
          } catch (err) {
            console.error(`Error fetching preview for genre ${genre.id}:`, err)
            return { genreId: genre.id, movies: [] }
          }
        })

        const previews = await Promise.all(previewPromises)
        const previewMap: { [genreId: number]: Movie[] } = {}

        previews.forEach(preview => {
          if (preview.movies.length > 0) {
            previewMap[preview.genreId] = preview.movies
          }
        })

        setGenrePreviews(previewMap)
      } catch (err) {
        console.error('Error fetching genre previews:', err)
        setError('Failed to load genre previews')
      } finally {
        setLoading(false)
      }
    }

    fetchGenrePreviews()
  }, [genres])

  const handleGenreClick = (genreId: number) => {
    navigate(`/genre/${genreId}`)
  }

  // Loading state
  if (loading || genresLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-galaxy-purple mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading genres...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-white text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-galaxy-red hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
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

          {/* Genres Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {genres.map((genre) => {
              const previewMovies = genrePreviews[genre.id] || []

              return (
                <div
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.id)}
                  className="bg-galaxy-gray/50 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:bg-galaxy-purple/20 hover:scale-105 border border-galaxy-purple/20 hover:border-galaxy-purple/50"
                >
                  {/* Genre Title */}
                  <h3 className="text-white text-lg font-semibold mb-3 text-center">
                    {genre.name}
                  </h3>

                  {/* Preview Movies */}
                  {previewMovies.length > 0 && (
                    <div className="space-y-2">
                      {previewMovies.slice(0, 2).map((movie) => (
                        <div key={movie.id} className="relative">
                          <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-24 object-cover rounded"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder-movie.jpg'
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 rounded flex items-center justify-center">
                            <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                              <p className="text-white text-xs text-center px-2 line-clamp-2">
                                {movie.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Show count if more than 2 */}
                      {previewMovies.length > 2 && (
                        <div className="text-center">
                          <span className="text-galaxy-purple text-sm font-medium">
                            +{previewMovies.length - 2} more
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Empty state for genres without previews */}
                  {previewMovies.length === 0 && (
                    <div className="h-24 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No preview</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* View All Genres Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/genres/all')}
              className="bg-galaxy-purple hover:bg-galaxy-red text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>View All Genres</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenresPage
