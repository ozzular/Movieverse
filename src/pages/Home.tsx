import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner'
import MovieRow from '../components/MovieRow'
import { tmdbApi } from '../services/tmdbApi'
import { Movie } from '../types'

const Home: React.FC = () => {
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

  // No movies state
  if (trendingMovies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">No movies found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroBanner movie={trendingMovies[0]} />

      {/* Movie Sections */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Trending Movies */}
          <MovieRow
            title="Trending Now"
            movies={trendingMovies}
          />

          {/* Top Rated Movies */}
          <MovieRow
            title="Top Rated"
            movies={topRatedMovies}
          />

          {/* Popular Movies */}
          <MovieRow
            title="Popular Movies"
            movies={popularMovies}
          />

          {/* Now Playing Movies */}
          <MovieRow
            title="In Theaters"
            movies={trendingMovies}
          />
        </div>
      </div>
    </div>
  )
}

export default Home