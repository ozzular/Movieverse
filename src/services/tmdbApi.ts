import axios from 'axios'
import type { Movie, MovieDetails, MoviesResponse, SearchResponse } from '../types/index'

// TMDb API Configuration
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

// Validate API key
if (!API_KEY) {
  console.error('VITE_TMDB_API_KEY is not defined in environment variables')
}

// API Service Class
class TMDbAPI {
  // Cache for genres to avoid repeated API calls
  private genresCache: { id: number; name: string }[] | null = null

  private async request<T>(endpoint: string): Promise<T> {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params: {
          api_key: API_KEY,
        },
      })
      return response.data
    } catch (error) {
      console.error('TMDb API Error:', error)
      throw new Error('Failed to fetch data from TMDb API')
    }
  }

  // Get trending movies
  async getTrendingMovies(region?: string): Promise<Movie[]> {
    const endpoint = region
      ? `/trending/movie/week?region=${region}`
      : '/trending/movie/week'
    const data: MoviesResponse = await this.request(endpoint)
    return data.results
  }

  // Get top rated movies
  async getTopRatedMovies(): Promise<Movie[]> {
    const data: MoviesResponse = await this.request('/movie/top_rated')
    return data.results
  }

  // Get popular movies
  async getPopularMovies(): Promise<Movie[]> {
    const data: MoviesResponse = await this.request('/movie/popular')
    return data.results
  }

  // Get now playing movies
  async getNowPlayingMovies(): Promise<Movie[]> {
    const data: MoviesResponse = await this.request('/movie/now_playing')
    return data.results
  }

  // Search movies
  async searchMovies(query: string): Promise<Movie[]> {
    if (!query.trim()) return []

    const data: SearchResponse = await this.request(`/search/movie?query=${encodeURIComponent(query)}`)
    return data.results
  }

  // Get movie details
  async getMovieDetails(id: number): Promise<MovieDetails> {
    return await this.request(`/movie/${id}`)
  }

  // Get movie credits (cast and crew)
  async getMovieCredits(id: number) {
    return await this.request(`/movie/${id}/credits`)
  }

  // Get movie videos (trailers, teasers)
  async getMovieVideos(id: number) {
    return await this.request(`/movie/${id}/videos`)
  }

  // Get similar movies
  async getSimilarMovies(id: number): Promise<Movie[]> {
    const data: MoviesResponse = await this.request(`/movie/${id}/similar`)
    return data.results
  }

  // Get movies by genre
  async getMoviesByGenre(genreId: number): Promise<Movie[]> {
    const data: MoviesResponse = await this.request(`/discover/movie?with_genres=${genreId}`)
    return data.results
  }

  // Get genres list
  async getGenres() {
    return await this.request('/genre/movie/list')
  }

  // Get genre names from genre IDs
  async getGenreNames(genreIds: number[]): Promise<string[]> {
    if (!this.genresCache) {
      const data = await this.getGenres()
      this.genresCache = data.genres
    }

    return genreIds.map(id => {
      const genre = this.genresCache?.find(g => g.id === id)
      return genre?.name || 'Unknown'
    })
  }

  // Utility functions for image URLs
  getImageUrl(path: string, size: 'w200' | 'w300' | 'w400' | 'w500' | 'w780' | 'original' = 'w500'): string {
    return `${IMAGE_BASE_URL}/${size}${path}`
  }

  getBackdropUrl(path: string, size: 'w300' | 'w780' | 'w1280' | 'original' = 'original'): string {
    return `${IMAGE_BASE_URL}/${size}${path}`
  }
}

// Export singleton instance
export const tmdbApi = new TMDbAPI()
export default tmdbApi
