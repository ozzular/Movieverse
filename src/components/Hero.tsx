import { useState, useEffect } from 'react'
import HeroCarousel from './HeroCarousel'
import { tmdbApi } from '../services/tmdbApi'

// Define Movie interface locally to avoid import issues
interface Movie {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  overview: string
  release_date: string
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_title: string
  popularity: number
  video: boolean
  vote_count: number
}

const Hero = () => {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        setIsLoading(true)
        // Get trending movies for the carousel
        const trendingMovies = await tmdbApi.getTrendingMovies()
        // Limit to 5 movies for carousel
        setFeaturedMovies(trendingMovies.slice(0, 5))
      } catch (error) {
        console.error('Failed to fetch featured movies:', error)
        // Fallback to empty array - carousel will show loading state
        setFeaturedMovies([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedMovies()
  }, [])

  return <HeroCarousel movies={featuredMovies} />
}

export default Hero