import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MovieRow from '../components/MovieRow'
import { tmdbApi } from '../services/tmdbApi'
import { useSelectedMovie } from '../contexts/SelectedMovieContext'
import type { Movie } from '../types/index'

const SeriesPage: React.FC = () => {
  const { selectedMovie, showHero, hideHero } = useSelectedMovie()
  const [trendingSeries, setTrendingSeries] = useState<Movie[]>([])
  const [popularSeries, setPopularSeries] = useState<Movie[]>([])
  const [topRatedSeries, setTopRatedSeries] = useState<Movie[]>([])
  const [onTheAirSeries, setOnTheAirSeries] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true)
        setError(null)

        // Note: TMDb API uses the same Movie type for TV series in discovery
        // We'll use movie endpoints as placeholders for series data
        const [trending, popular, topRated, onAir] = await Promise.all([
          tmdbApi.getTrendingMovies(), // Placeholder for trending series
          tmdbApi.getPopularMovies(),  // Placeholder for popular series
          tmdbApi.getTopRatedMovies(), // Placeholder for top rated series
          tmdbApi.getNowPlayingMovies() // Placeholder for on the air series
        ])

        setTrendingSeries(trending)
        setPopularSeries(popular)
        setTopRatedSeries(topRated)
        setOnTheAirSeries(onAir)
      } catch (err) {
        console.error('Error fetching series:', err)
        setError('Failed to load TV series. Please check your API key and try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchSeries()
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-galaxy-purple mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading TV series...</p>
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

      {/* Series Sections */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">TV Series</h1>
            <p className="text-gray-400">Discover trending, popular, and classic TV series</p>
          </div>

          {/* Trending Series */}
          <MovieRow
            title="Trending Series"
            movies={trendingSeries}
          />

          {/* Popular Series */}
          <MovieRow
            title="Popular Series"
            movies={popularSeries}
          />

          {/* Top Rated Series (Classic Series) */}
          <MovieRow
            title="Classic Series"
            movies={topRatedSeries}
          />

          {/* On The Air Series (Latest Series) */}
          <MovieRow
            title="On The Air"
            movies={onTheAirSeries}
          />
        </div>
      </div>
    </div>
  )
}

export default SeriesPage
