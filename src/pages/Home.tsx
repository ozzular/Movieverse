import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroCarousel from '../components/HeroCarousel'
import MovieRow from '../components/MovieRow'
import FooterNew from '../components/FooterNew'
import { tmdbApi } from '../services/tmdbApi'
import type { Movie } from '@/types'

// Netflix-Style Home Page
const Home = () => {
  const navigate = useNavigate()
  const [heroMovies, setHeroMovies] = useState<Movie[]>([])
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
  const [trendingSeries, setTrendingSeries] = useState<Movie[]>([])
  const [popularSeries, setPopularSeries] = useState<Movie[]>([])
  const [topRatedSeries, setTopRatedSeries] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        setLoading(true)

        const [
          heroResponse,
          trendingResponse,
          popularResponse,
          topRatedResponse,
          upcomingResponse,
          trendingSeriesResponse,
          popularSeriesResponse,
          topRatedSeriesResponse
        ] = await Promise.all([
          tmdbApi.getPopularMovies(),
          tmdbApi.getTrendingMovies(),
          tmdbApi.getPopularMovies(),
          tmdbApi.getTopRatedMovies(),
          tmdbApi.getNowPlayingMovies(),
          fetchTVShows('trending'),
          fetchTVShows('popular'),
          fetchTVShows('top_rated')
        ])

        setHeroMovies(heroResponse.slice(0, 10))
        setTrendingMovies(trendingResponse.slice(0, 12))
        setPopularMovies(popularResponse.slice(12, 24))
        setTopRatedMovies(topRatedResponse.slice(0, 12))
        setUpcomingMovies(upcomingResponse.slice(0, 12))
        setTrendingSeries(trendingSeriesResponse.slice(0, 12))
        setPopularSeries(popularSeriesResponse.slice(0, 12))
        setTopRatedSeries(topRatedSeriesResponse.slice(0, 12))
      } catch (error) {
        console.error('Failed to fetch movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMoviesData()
  }, [])

  const fetchTVShows = async (category: string): Promise<Movie[]> => {
    try {
      const API_KEY = import.meta.env.VITE_TMDB_API_KEY

      if (!API_KEY) {
        throw new Error('TMDB API key not configured')
      }

      let url = ''
      switch (category) {
        case 'trending':
          url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`
          break
        case 'popular':
          url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
          break
        case 'top_rated':
          url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`
          break
        default:
          url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
      }

      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch TV shows: ${category}`)
      }

      const data = await response.json()

      // Convert TV show data to match Movie interface format
      return (data.results || []).map((series: any) => ({
        id: series.id,
        title: series.name || series.title,
        poster_path: series.poster_path,
        backdrop_path: series.backdrop_path,
        vote_average: series.vote_average,
        overview: series.overview,
        release_date: series.first_air_date || series.release_date,
        genre_ids: series.genre_ids || [],
        adult: series.adult || false,
        original_language: series.original_language,
        original_title: series.original_name || series.original_title,
        popularity: series.popularity,
        video: false,
        vote_count: series.vote_count
      }))
    } catch (error) {
      console.error(`Failed to fetch TV shows: ${category}`, error)
      return []
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your movies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* 🎬 Hero Section - Netflix-style carousel */}
      <section className="relative">
        <HeroCarousel movies={heroMovies.slice(0, 8)} />
      </section>

      {/* 🎭 Movie Categories - Full width horizontal scrolling rows */}
      <section className="relative z-20 pt-8 bg-gradient-to-b from-transparent via-slate-800/20 to-indigo-900/30">
        <div className="w-full px-0 space-y-8 pb-16 max-w-none">
          {/* Trending Now */}
          <MovieRow
            title="Trending Now"
            movies={trendingMovies}
          />

          {/* Popular on MovieVerse */}
          <MovieRow
            title="Popular on MovieVerse"
            movies={popularMovies}
          />

          {/* Top Rated Movies */}
          <MovieRow
            title="Top Rated"
            movies={topRatedMovies}
          />

          {/* Coming Soon */}
          <MovieRow
            title="Coming Soon"
            movies={upcomingMovies}
          />

          {/* TV Series Sections */}
          <MovieRow
            title="Trending TV Series"
            movies={trendingSeries}
          />

          <MovieRow
            title="Popular TV Series"
            movies={popularSeries}
          />

          <MovieRow
            title="Top Rated TV Series"
            movies={topRatedSeries}
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
