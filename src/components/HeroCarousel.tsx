import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
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

interface HeroCarouselProps {
  movies: Movie[]
}

const HeroCarousel = ({ movies }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [genreNames, setGenreNames] = useState<string[]>([])
  const navigate = useNavigate()

  // Fetch genre names for current movie
  useEffect(() => {
    const fetchGenres = async () => {
      if (movies.length === 0) return
      try {
        const names = await tmdbApi.getGenreNames(movies[currentIndex].genre_ids)
        setGenreNames(names)
      } catch (error) {
        console.error('Failed to fetch genre names:', error)
        setGenreNames([])
      }
    }
    fetchGenres()
  }, [movies, currentIndex])

  // Auto-slide every 6 seconds when not hovered
  useEffect(() => {
    if (movies.length === 0 || isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      )
    }, 6000)

    return () => clearInterval(interval)
  }, [movies.length, isHovered])

  // Handle manual navigation
  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? movies.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === movies.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentIndex])

  // Loading state
  if (movies.length === 0) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-purple-900/20" />
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading featured movies...</p>
        </div>
      </section>
    )
  }

  const currentMovie = movies[currentIndex]

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Featured movies carousel"
    >
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${tmdbApi.getBackdropUrl(currentMovie.backdrop_path, 'original')})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

        {/* Reduced blur for cleaner look */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
          style={{
            backdropFilter: 'blur(4px) saturate(1.2)',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(31, 41, 55, 0.15) 40%, rgba(31, 41, 55, 0.3) 100%)'
          }}
        />
      </div>

      {/* Full Width Content */}
      <div className="w-full max-w-none px-8 relative z-10">
        <div className="text-center animate-fade-in">
          {/* Movie Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">
            {currentMovie.title}
          </h1>

          {/* Enhanced Movie Info */}
          <div className="flex items-center justify-center flex-wrap gap-4 mb-6 text-sm md:text-lg">
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-semibold text-white">{currentMovie.vote_average.toFixed(1)}</span>
            </div>

            <span className="text-gray-400 hidden md:block">•</span>

            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-gray-400" />
              <span className="text-white font-semibold">{currentMovie.vote_count.toFixed(0)} ratings</span>
            </div>

            <span className="text-gray-400 hidden md:block">•</span>

            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-gray-400" />
              <span className="text-white font-semibold">{new Date(currentMovie.release_date).getFullYear()}</span>
            </div>

            <span className="text-gray-400 hidden md:block">•</span>

            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-gray-400" />
              <span className="text-white font-semibold">{currentMovie.adult ? '18+' : 'All Ages'}</span>
            </div>
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {genreNames.slice(0, 4).map((genreName, index) => (
              <span
                key={genreName}
                className={`
                  bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full font-medium
                  hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer
                  border border-white/20
                  ${index === 0 ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-transparent' : ''}
                `}
              >
                {genreName}
              </span>
            ))}
          </div>

          {/* Movie Overview */}
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            {currentMovie.overview.length > 200
              ? `${currentMovie.overview.substring(0, 200)}...`
              : currentMovie.overview}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 flex items-center space-x-2 rounded-xl"
              onClick={() => navigate(`/movie/${currentMovie.id}`)}
            >
              <Play className="w-5 h-5" />
              <span>Watch Now</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 flex items-center space-x-2 rounded-xl"
              onClick={() => navigate(`/movie/${currentMovie.id}`)}
            >
              <span>More Info</span>
            </Button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {movies.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm hover:bg-black/70 hover:scale-110 transition-transform text-white"
        onClick={goToPrevious}
        aria-label="Previous movie"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm hover:bg-black/70 hover:scale-110 transition-transform text-white"
        onClick={goToNext}
        aria-label="Next movie"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Movie Counter */}
      <div className="absolute bottom-4 right-4 z-20 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
        <span className="text-sm text-gray-300">
          {currentIndex + 1} / {Math.min(movies.length, 5)}
        </span>
      </div>
    </section>
  )
}

export default HeroCarousel
