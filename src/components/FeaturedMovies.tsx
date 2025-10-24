import { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import { tmdbApi } from '../services/tmdbApi'

// Define Movie interface locally to completely bypass import issues
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
}

const FeaturedMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        setIsLoading(true)
        // Get popular movies for the featured section
        const popularMovies = await tmdbApi.getPopularMovies()
        // Show 6 movies in a grid layout
        setMovies(popularMovies.slice(0, 6))
      } catch (error) {
        console.error('Failed to fetch featured movies:', error)
        setMovies([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedMovies()
  }, [])

  if (isLoading) {
    return (
      <section className="py-24 relative bg-gradient-to-b from-background via-background/95 to-background">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-background/80 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12 glass-card p-6 rounded-xl max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Featured Movies
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
              Discover our handpicked selection of popular movies
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[2/3] bg-muted rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 relative bg-gradient-to-b from-background via-background/95 to-background">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-background/80 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 glass-card p-6 rounded-xl max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Featured Movies
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
            Discover our handpicked selection of popular movies
          </p>
        </div>

        <div className="glass-card p-6 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedMovies