import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGenres } from '../contexts/GenreContext'
import { useFilters } from '../contexts/FilterContext'
import { useSelectedMovie } from '../contexts/SelectedMovieContext'
import MovieCard from '../components/MovieCard'
import type { Movie } from '../types/index'

const FiltersPage: React.FC = () => {
  const navigate = useNavigate()
  const { genres, isLoading: genresLoading } = useGenres()
  const { filters, toggleGenre, toggleRegion, clearAllFilters } = useFilters()
  const { selectedMovie, showHero, hideHero } = useSelectedMovie()

  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([])
  const [isApplyingFilters, setIsApplyingFilters] = useState(false)
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false)

  const handleApplyFilters = async () => {
    setIsApplyingFilters(true)

    try {
      // Get movies based on selected filters
      let movies: Movie[] = []

      if (filters.genres.length > 0) {
        // Get movies from the first selected genre as example
        const firstGenreId = filters.genres[0]
        movies = await import('../services/tmdbApi').then(({ tmdbApi }) =>
          tmdbApi.getMoviesByGenre(firstGenreId)
        )
      } else {
        // Get popular movies as default
        movies = await import('../services/tmdbApi').then(({ tmdbApi }) =>
          tmdbApi.getPopularMovies()
        )
      }

      // Apply region filtering if selected
      if (filters.regions.length > 0) {
        const regionLanguageMap: { [key: string]: string[] } = {
          'Hollywood': ['en'],
          'Bollywood': ['hi', 'ta', 'te'],
          'Europe': ['fr', 'de', 'it', 'es', 'ru', 'sv', 'da', 'no', 'fi', 'nl', 'pl', 'cs', 'hu', 'ro', 'bg', 'hr', 'sk', 'sl', 'et', 'lv', 'lt', 'mt'],
          'Asia': ['ja', 'ko', 'zh', 'th', 'vi', 'id', 'ms', 'tl', 'ur', 'bn', 'gu', 'kn', 'ml', 'mr', 'or', 'pa', 'sd', 'si', 'ne', 'dv'],
          'Latin America': ['es', 'pt'],
          'Africa': ['ar', 'sw', 'am', 'om', 'ti', 'so', 'af', 'zu', 'xh', 'tn', 'st', 'rw', 'rn', 'ny', 'mg', 'ln', 'lg', 'ki', 'ha', 'ff', 'ee']
        }

        movies = movies.filter(movie => {
          return filters.regions.some(region => {
            const languages = regionLanguageMap[region] || []
            return languages.includes(movie.original_language)
          })
        })
      }

      setFilteredMovies(movies)
      setHasAppliedFilters(true)
    } catch (error) {
      console.error('Error applying filters:', error)
    } finally {
      setIsApplyingFilters(false)
    }
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

      {/* Filters Page Content */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Advanced Filters</h1>
                <p className="text-gray-400">Find movies with specific criteria</p>
              </div>

              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Home</span>
              </button>
            </div>
          </div>

          {/* Filter Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-galaxy-gray/50 rounded-lg p-6 border border-galaxy-purple/20">
                <h2 className="text-xl font-semibold text-white mb-6">Filter Options</h2>

                {/* Genres Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-4">Genres</h3>
                  {genresLoading ? (
                    <div className="animate-pulse space-y-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-8 bg-galaxy-gray rounded"></div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                      {genres.map((genre) => (
                        <button
                          key={genre.id}
                          onClick={() => toggleGenre(genre.id)}
                          className={`p-2 text-sm rounded transition-all duration-300 text-left ${
                            filters.genres.includes(genre.id)
                              ? 'bg-galaxy-purple text-white'
                              : 'text-gray-300 hover:text-white hover:bg-galaxy-purple/20'
                          }`}
                        >
                          {genre.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Release Year Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-4">Release Year</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['2024', '2020-2023', '2010-2019', '2000-2009', '1990-1999', 'Before 1990'].map((range) => (
                      <button
                        key={range}
                        className="p-2 text-sm rounded transition-all duration-300 text-left text-gray-300 hover:text-white hover:bg-galaxy-purple/20"
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Regions Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-4">Regions</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {['Hollywood', 'Bollywood', 'Europe', 'Asia', 'Latin America', 'Africa'].map((region) => (
                      <button
                        key={region}
                        onClick={() => toggleRegion(region)}
                        className={`p-3 text-sm rounded-lg transition-all duration-300 text-left ${
                          filters.regions.includes(region)
                            ? 'bg-galaxy-purple text-white'
                            : 'text-gray-300 hover:text-white hover:bg-galaxy-purple/20'
                        }`}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleApplyFilters}
                    disabled={isApplyingFilters}
                    className="w-full bg-galaxy-purple hover:bg-galaxy-red text-white py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isApplyingFilters ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Applying...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Apply Filters</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={clearAllFilters}
                    className="w-full border-2 border-galaxy-red text-galaxy-red hover:bg-galaxy-red hover:text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Clear All</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2">
              {hasAppliedFilters ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-white">
                      Filtered Results ({filteredMovies.length} movies)
                    </h2>

                    {/* Active Filters Display */}
                    {(filters.genres.length > 0 || filters.regions.length > 0) && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Active:</span>
                        {filters.genres.map(genreId => {
                          const genre = genres.find(g => g.id === genreId)
                          return genre ? (
                            <span key={genreId} className="px-2 py-1 bg-galaxy-purple/20 text-galaxy-purple text-sm rounded-full">
                              {genre.name}
                            </span>
                          ) : null
                        })}
                        {filters.regions.map(region => (
                          <span key={region} className="px-2 py-1 bg-galaxy-red/20 text-galaxy-red text-sm rounded-full">
                            {region}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {filteredMovies.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {filteredMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    </div>
                  ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
                  <p className="text-gray-400">Try adjusting your filters to see more results.</p>
                </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold text-white mb-2">Apply Filters</h3>
                  <p className="text-gray-400">Select your preferred genres, release years, and regions to find movies.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FiltersPage
