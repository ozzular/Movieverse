import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight, Play, Plus } from 'lucide-react'
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
  const navigate = useNavigate()

  // Auto-slide every 5 seconds when not hovered
  useEffect(() => {
    if (movies.length === 0 || isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading featured movies...</p>
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
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Show main title only on first slide with better positioning */}
          {currentIndex === 0 && (
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                Discover the Universe of Amazing Movies
              </h1>
              <div className="w-24 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>
          )}

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            {currentMovie.overview.length > 150
              ? `${currentMovie.overview.substring(0, 150)}...`
              : currentMovie.overview}
          </p>

          {/* Movie Info */}
          <div className="flex items-center justify-center gap-4 mb-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              ⭐ {currentMovie.vote_average.toFixed(1)}
            </span>
            <span>•</span>
            <span>{new Date(currentMovie.release_date).getFullYear()}</span>
            <span>•</span>
            <span>Featured</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6 hover:scale-105 transition-transform"
              onClick={() => navigate('/app')}
            >
              Enter the Verse
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 hover:scale-105 transition-transform"
              onClick={() => navigate(`/movie/${currentMovie.id}`)}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Trailer
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
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/50 hover:bg-muted-foreground/75'
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
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass-card hover:scale-110 transition-transform"
        onClick={goToPrevious}
        aria-label="Previous movie"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass-card hover:scale-110 transition-transform"
        onClick={goToNext}
        aria-label="Next movie"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Movie Counter */}
      <div className="absolute bottom-4 right-4 z-20 glass-card px-3 py-1 rounded-full">
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {Math.min(movies.length, 5)}
        </span>
      </div>
    </section>
  )
}

export default HeroCarousel