import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { tmdbApi } from '../services/tmdbApi'

interface MediaItem {
  id: string
  type: 'trailer' | 'poster' | 'backdrop' | 'still'
  key?: string // For trailers (YouTube key)
  url?: string // For images
  thumbnail: string
  title: string
  aspectRatio?: number
}

interface TrailerCarouselProps {
  movieId: number
  movieTitle: string
  className?: string
}

const TrailerCarousel: React.FC<TrailerCarouselProps> = ({
  movieId,
  movieTitle,
  className = ''
}) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchMediaContent()
  }, [movieId])

  const fetchMediaContent = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch videos and images in parallel
      const [videosData, imagesData] = await Promise.all([
        tmdbApi.getMovieVideos(movieId),
        tmdbApi.getMovieImages(movieId)
      ])

      const items: MediaItem[] = []

      // Add official trailer first
      const officialTrailer = videosData.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube' && video.official
      )

      if (officialTrailer) {
        items.push({
          id: officialTrailer.id.toString(),
          type: 'trailer',
          key: officialTrailer.key,
          thumbnail: `https://img.youtube.com/vi/${officialTrailer.key}/maxresdefault.jpg`,
          title: 'Official Trailer'
        })
      }

      // Add movie posters
      const posters = imagesData.posters?.slice(0, 3) || []
      posters.forEach((poster, index) => {
        items.push({
          id: `poster-${poster.file_path}`,
          type: 'poster',
          url: `https://image.tmdb.org/t/p/w500${poster.file_path}`,
          thumbnail: `https://image.tmdb.org/t/p/w300${poster.file_path}`,
          title: `Poster ${index + 1}`,
          aspectRatio: 2/3
        })
      })

      // Add movie stills/backdrops
      const stills = imagesData.backdrops?.slice(0, 3) || []
      stills.forEach((still, index) => {
        items.push({
          id: `still-${still.file_path}`,
          type: 'still',
          url: `https://image.tmdb.org/t/p/original${still.file_path}`,
          thumbnail: `https://image.tmdb.org/t/p/w300${still.file_path}`,
          title: `Scene ${index + 1}`,
          aspectRatio: 16/9
        })
      })

      // Fallback: any trailer if no official one
      if (items.length === 0) {
        const anyTrailer = videosData.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        )
        if (anyTrailer) {
          items.push({
            id: anyTrailer.id.toString(),
            type: 'trailer',
            key: anyTrailer.key,
            thumbnail: `https://img.youtube.com/vi/${anyTrailer.key}/maxresdefault.jpg`,
            title: 'Trailer'
          })
        }
      }

      setMediaItems(items)

      if (items.length === 0) {
        setError('No media content available')
      }
    } catch (err) {
      console.error('Error fetching media content:', err)
      setError('Unable to load media content')
    } finally {
      setLoading(false)
    }
  }

  const currentItem = mediaItems[currentIndex]

  const scrollToThumbnail = (index: number) => {
    if (carouselRef.current) {
      const thumbnail = carouselRef.current.children[index] as HTMLElement
      if (thumbnail) {
        carouselRef.current.scrollTo({
          left: thumbnail.offsetLeft - carouselRef.current.offsetWidth / 2 + thumbnail.offsetWidth / 2,
          behavior: 'smooth'
        })
      }
    }
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
    scrollToThumbnail(index)
  }

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? mediaItems.length - 1 : currentIndex - 1
    handleThumbnailClick(newIndex)
  }

  const handleNext = () => {
    const newIndex = currentIndex === mediaItems.length - 1 ? 0 : currentIndex + 1
    handleThumbnailClick(newIndex)
  }

  if (loading) {
    return (
      <div className={`w-full max-w-4xl mx-auto ${className}`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Trailer & Media</h2>
        </div>

        <div className="aspect-video bg-gray-800 rounded-2xl animate-pulse mb-4"></div>

        <div className="flex gap-3 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-32 h-20 bg-gray-700 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error || mediaItems.length === 0) {
    return (
      <div className={`w-full max-w-4xl mx-auto ${className}`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Trailer & Media</h2>
        </div>

        <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center">
          <div className="text-center text-gray-400">
            <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>{error || 'No media content available'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Trailer & Media</h2>
      </div>

      {/* Main Media Player */}
      <div className="relative bg-black rounded-2xl overflow-hidden mb-4 shadow-2xl">
        <div className="aspect-video">
          <AnimatePresence mode="wait">
            {currentItem.type === 'trailer' ? (
              <motion.div
                key={`trailer-${currentItem.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${currentItem.key}?autoplay=1&rel=0&modestbranding=1&showinfo=0&fs=1&cc_load_policy=0`}
                  title={`${movieTitle} - ${currentItem.title}`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </motion.div>
            ) : (
              <motion.div
                key={`image-${currentItem.id}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${currentItem.url})` }}
              >
                <div className="w-full h-full bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {mediaItems.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
              aria-label="Previous media"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
              aria-label="Next media"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Carousel */}
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {mediaItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 relative rounded-lg overflow-hidden transition-all duration-200 ${
                index === currentIndex
                  ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-gray-900 scale-105'
                  : 'opacity-70 hover:opacity-100 hover:scale-105'
              }`}
              style={{
                width: '160px',
                height: '90px',
                backgroundImage: `url(${item.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Play Icon Overlay for Trailers */}
              {item.type === 'trailer' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" fill="currentColor" />
                </div>
              )}

              {/* Title Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-white text-xs font-medium truncate">{item.title}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Scroll Indicators */}
        {mediaItems.length > 6 && (
          <div className="flex justify-center mt-3 gap-1">
            {Array.from({ length: Math.ceil(mediaItems.length / 6) }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === Math.floor(currentIndex / 6) ? 'bg-cyan-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TrailerCarousel