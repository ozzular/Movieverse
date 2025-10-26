import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { tmdbApi } from '../services/tmdbApi'
import TrailerPlayer from '../components/TrailerPlayer'
import StreamingAvailability from '../components/StreamingAvailability'
import CastMember from '../components/CastMember'
import { useFavorites } from '../contexts/FavoritesContext'
import type { MovieDetails as MovieDetailsType, Cast, Crew } from '@/types'

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()

  const [movie, setMovie] = useState<MovieDetailsType | null>(null)
  const [cast, setCast] = useState<Cast[]>([])
  const [crew, setCrew] = useState<Crew[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return

      try {
        setLoading(true)
        setError(null)

        // Fetch movie details, cast, and crew in parallel
        const [movieData, castCrewData] = await Promise.all([
          tmdbApi.getMovieDetails(parseInt(id)),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
            .then(res => res.json())
        ])

        setMovie(movieData)
        setCast(castCrewData.cast || [])
        setCrew(castCrewData.crew || [])
      } catch (err) {
        console.error('Error fetching movie details:', err)
        setError('Failed to load movie details')
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  const handleActorTap = (personId: number) => {
    navigate(`/person/${personId}`)
  }

  const handleFavoriteToggle = () => {
    if (!movie) return

    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading movie details...</div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error || 'Movie not found'}</div>
      </div>
    )
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`

  return (
    <div className="min-h-screen">
      {/* Backdrop */}
      <div className="relative h-96 w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-64 rounded-lg shadow-2xl"
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1 text-white">
            {/* Title and Year */}
            <h1 className="text-4xl font-bold mb-2">
              {movie.title}
            </h1>
            <p className="text-gray-400 text-lg mb-4">
              {new Date(movie.release_date).getFullYear()} • {movie.runtime} min
            </p>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-red-600/20 border border-red-600/30 rounded-full text-red-400 text-sm"
              >
                {genre.name}
              </span>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-red-500 mr-2">
                {movie.vote_average.toFixed(1)}
              </span>
              <div className="flex text-red-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${i < Math.floor(movie.vote_average / 2) ? 'text-red-400' : 'text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Overview</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {/* Production Companies */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Production</h3>
              <div className="flex flex-wrap gap-4">
                {movie.production_companies.map((company) => (
                  <div key={company.id} className="text-gray-400">
                    {company.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleFavoriteToggle}
                className={`border-2 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isFavorite(movie.id)
                    ? 'bg-red-600 border-red-600 text-white'
                    : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                }`}
              >
                <svg className="w-6 h-6" fill={isFavorite(movie.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Auto Trailer Player */}
        <div className="mb-12">
          <TrailerPlayer
            movieId={movie.id}
            movieTitle={movie.title}
            autoPlay={true}
            className="max-w-4xl mx-auto"
          />
        </div>

        {/* Where to Watch Section */}
        <div className="mb-12">
          <StreamingAvailability
            movieTitle={movie.title}
            releaseYear={new Date(movie.release_date).getFullYear()}
            className="max-w-4xl mx-auto"
          />
        </div>

        {/* Cast & Crew Section */}
        {cast.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 justify-items-center">
              {cast.slice(0, 12).map((person) => (
                <CastMember
                  key={person.id}
                  person={person}
                  onTap={handleActorTap}
                  showRole={false}
                  className="w-20"
                />
              ))}
            </div>

            {/* Show more cast members if available */}
            {cast.length > 12 && (
              <div className="text-center mt-6">
                <button className="text-red-500 hover:text-red-400 transition-colors font-medium">
                  View Full Cast ({cast.length} members)
                </button>
              </div>
            )}
          </section>
        )}

        {/* Director & Key Crew */}
        {crew.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Crew</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {crew
                .filter(member => ['Director', 'Writer', 'Producer', 'Cinematographer'].includes(member.job))
                .slice(0, 4)
                .map((member) => (
                  <div key={member.id} className="bg-glassmorphism rounded-xl p-4 text-center">
                    <h3 className="text-white font-semibold text-sm">{member.name}</h3>
                    <p className="text-gray-400 text-xs">{member.job}</p>
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default MovieDetails
