import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MovieRow from '../components/MovieRow'
import RegionalHighlights from '../components/RegionalHighlights'
import { tmdbApi } from '../services/tmdbApi'
import { useGenres } from '../contexts/GenreContext'
import { useFilters } from '../contexts/FilterContext'
import { useSelectedMovie } from '../contexts/SelectedMovieContext'
import type { Movie } from '../types/index'

const Home: React.FC = () => {
  const { selectedGenres, genres } = useGenres()
  const { filters } = useFilters()
  const { selectedMovie, showHero, hideHero } = useSelectedMovie()
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        setError(null)

        const [trending, topRated, popular] = await Promise.all([
          tmdbApi.getTrendingMovies(),
          tmdbApi.getTopRatedMovies(),
          tmdbApi.getPopularMovies()
        ])

        setTrendingMovies(trending)
        setTopRatedMovies(topRated)
        setPopularMovies(popular)
      } catch (err) {
        console.error('Error fetching movies:', err)
        setError('Failed to load movies. Please check your API key and try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  // Filter movies by selected genres
  const filterMoviesByGenres = (movies: Movie[]) => {
    if (selectedGenres.length === 0) return movies

    return movies.filter(movie =>
      movie.genre_ids.some(genreId => selectedGenres.includes(genreId))
    )
  }

  // Filter movies by regions (simplified - based on original language)
  const filterMoviesByRegions = (movies: Movie[]) => {
    if (filters.regions.length === 0) return movies

    const regionLanguageMap: { [key: string]: string[] } = {
      'Hollywood': ['en'],
      'Bollywood': ['hi', 'ta', 'te'],
      'Europe': ['fr', 'de', 'it', 'es', 'ru', 'sv', 'da', 'no', 'fi', 'nl', 'pl', 'cs', 'hu', 'ro', 'bg', 'hr', 'sk', 'sl', 'et', 'lv', 'lt', 'mt'],
      'Asia': ['ja', 'ko', 'zh', 'th', 'vi', 'id', 'ms', 'tl', 'ur', 'bn', 'gu', 'kn', 'ml', 'mr', 'or', 'pa', 'sd', 'si', 'ne', 'dv'],
      'Latin America': ['es', 'pt'],
      'Africa': ['ar', 'sw', 'am', 'om', 'ti', 'so', 'af', 'zu', 'xh', 'tn', 'st', 'rw', 'rn', 'ny', 'mg', 'ln', 'lg', 'ki', 'ha', 'ff', 'ee']
    }

    return movies.filter(movie => {
      return filters.regions.some(region => {
        const languages = regionLanguageMap[region] || []
        return languages.includes(movie.original_language)
      })
    })
  }

  // Apply all filters
  const applyAllFilters = (movies: Movie[]) => {
    let filteredMovies = filterMoviesByGenres(movies)
    filteredMovies = filterMoviesByRegions(filteredMovies)
    return filteredMovies
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-galaxy-purple mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading movies...</p>
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
                  <button
                    onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedMovie.title)}+trailer`, '_blank')}
                    className="bg-galaxy-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span>Watch Trailer</span>
                  </button>
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

      {/* Movie Sections */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Regional Content */}
          <RegionalHighlights />

          {/* Trending Movies */}
          <MovieRow
            title="Trending Now"
            movies={applyAllFilters(trendingMovies)}
          />

          {/* Top Rated Movies */}
          <MovieRow
            title="Top Rated"
            movies={applyAllFilters(topRatedMovies)}
          />

          {/* Popular Movies */}
          <MovieRow
            title="Popular Movies"
            movies={applyAllFilters(popularMovies)}
          />

          {/* Now Playing Movies */}
          <MovieRow
            title="In Theaters"
            movies={applyAllFilters(trendingMovies)}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
