import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieRow from '../components/MovieRow'
// Navbar and Sidebar are provided by the app layout; remove local imports to avoid duplication
import type { Movie } from '@/types'

// Netflix-style Series Page
const SeriesPage = () => {
  const navigate = useNavigate()
  // ...existing code...
  const [loading, setLoading] = useState(true)
  const [popularSeries, setPopularSeries] = useState<Movie[]>([])
  const [topRatedSeries, setTopRatedSeries] = useState<Movie[]>([])
  const [trendingSeries, setTrendingSeries] = useState<Movie[]>([])
  const [airingTodaySeries, setAiringTodaySeries] = useState<Movie[]>([])

  useEffect(() => {
    const fetchSeriesData = async () => {
      try {
        setLoading(true)

        const [
          popularResponse,
          topRatedResponse,
          trendingResponse,
          airingTodayResponse
        ] = await Promise.all([
          fetchTVShows('popular'),
          fetchTVShows('top_rated'),
          fetchTVShows('trending'),
          fetchTVShows('airing_today')
        ])

        setPopularSeries(popularResponse.slice(0, 12))
        setTopRatedSeries(topRatedResponse.slice(0, 12))
        setTrendingSeries(trendingResponse.slice(0, 12))
        setAiringTodaySeries(airingTodayResponse.slice(0, 12))
      } catch (error) {
        console.error('Failed to fetch series:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSeriesData()
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
        case 'airing_today':
          url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}`
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
      <div className="min-h-screen">
        <main className="pt-20 px-4">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading TV series...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {trendingSeries.length > 0 && (
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{
                backgroundImage: `url(${trendingSeries[0]?.backdrop_path ?
                  `https://image.tmdb.org/t/p/original${trendingSeries[0].backdrop_path}` :
                  '/public/hero-bg.jpg'})`,
              }}
            >
              {/* Remove per-page gradient overlay; global background is set in ThemeWrapper */}
            </div>
          )}

          <div className="relative z-10 text-center w-full px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              TV Series
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover the best TV series, dramas, comedies, and more from around the world.
              From critically acclaimed shows to binge-worthy series.
            </p>
          </div>
        </section>

        {/* TV Series Categories */}
  <section className="relative z-20">
          <div className="w-full py-8">
            <MovieRow title="Trending TV Shows" movies={trendingSeries} />
            <MovieRow title="Popular TV Shows" movies={popularSeries} />
            <MovieRow title="Top Rated TV Shows" movies={topRatedSeries} />
            <MovieRow title="Airing Today" movies={airingTodaySeries} />
          </div>
        </section>

        {/* Genre Sections */}
  <section className="relative z-10 py-16">
          <div className="w-full px-8">
            <h2 className="text-3xl font-bold text-white mb-8">Browse by Genre</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: 'Action & Adventure', color: 'from-red-500 to-orange-500' },
                { name: 'Comedy', color: 'from-yellow-400 to-orange-500' },
                { name: 'Drama', color: 'from-blue-500 to-purple-500' },
                { name: 'Sci-Fi & Fantasy', color: 'from-purple-500 to-pink-500' },
                { name: 'Crime', color: 'from-gray-600 to-gray-800' },
                { name: 'Mystery', color: 'from-indigo-500 to-purple-500' },
                { name: 'Romance', color: 'from-pink-500 to-red-500' },
                { name: 'Documentary', color: 'from-green-500 to-teal-500' }
              ].map((genre) => (
                <button
                  key={genre.name}
                  onClick={() => navigate(`/search?q=tv+${genre.name.toLowerCase().replace('&', '').replace(' ', '+')}`)}
                  className="relative overflow-hidden rounded-xl p-6 text-left transition-all duration-300 hover:scale-105 group bg-[var(--glass)] backdrop-blur-[24px] border border-[var(--glass-border)]"
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-white font-semibold text-lg mb-2 relative z-10">{genre.name}</h3>
                  <p className="text-[var(--text-secondary)] text-sm relative z-10">Explore {genre.name.toLowerCase()} series</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SeriesPage
