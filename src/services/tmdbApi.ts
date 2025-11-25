import axios from "axios";
import type {
  Movie,
  MovieDetails,
  MoviesResponse,
  SearchResponse,
} from "../types/index";

// TMDb API Configuration
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Validate API key
if (!API_KEY) {
  console.error("VITE_TMDB_API_KEY is not defined in environment variables");
}

// API Service Class
class TMDbAPI {
  // Cache for genres to avoid repeated API calls
  private genresCache: { id: number; name: string }[] | null = null;
  // Simple in-memory cache for API responses per-endpoint
  private cache = new Map<string, { data: any; expires: number }>();
  private CACHE_TTL = 1000 * 60; // 60 seconds

  // Common provider ids mapping (may vary by TMDB region)
  private PROVIDER_IDS: Record<string, number> = {
    Netflix: 8,
    "Amazon Prime Video": 119,
    "Prime Video": 119,
    Hulu: 15,
    "Disney Plus": 337,
    "Apple TV Plus": 350,
    "HBO Max": 384,
  };

  private async request<T>(endpoint: string): Promise<T> {
    const cacheKey = endpoint;
    const now = Date.now();
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expires > now) {
      return cached.data as T;
    }

    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params: {
          api_key: API_KEY,
        },
      });
      this.cache.set(cacheKey, {
        data: response.data,
        expires: Date.now() + this.CACHE_TTL,
      });
      return response.data;
    } catch (error) {
      console.error("TMDb API Error:", error);
      throw new Error("Failed to fetch data from TMDb API");
    }
  }

  // Clear cache (useful for testing or manual refresh)
  clearCache() {
    this.cache.clear();
  }

  // Get Nigeria-themed movies for regional content
  private async getNigeriaThemedMovies(): Promise<Movie[]> {
    try {
      // Search for Nigeria, Nollywood, and African-themed content
      const searchTerms = ["nigeria", "nollywood", "african"];
      const allMovies: Movie[] = [];

      for (const term of searchTerms) {
        const data: SearchResponse = await this.request(
          `/search/movie?query=${encodeURIComponent(term)}&page=1`
        );
        // Filter to avoid duplicates and take top 3-5 per term
        const filteredMovies = data.results.filter(movie =>
          movie.overview?.toLowerCase().includes(term) ||
          movie.title?.toLowerCase().includes(term)
        ).slice(0, 3);

        allMovies.push(...filteredMovies);
      }

      // Remove duplicates
      const uniqueMovies = allMovies.filter((movie, index, self) =>
        index === self.findIndex((m) => m.id === movie.id)
      );

      return uniqueMovies.slice(0, 12); // Return up to 12 Nigeria-themed movies
    } catch (error) {
      console.error("Error fetching Nigeria-themed movies:", error);
      return [];
    }
  }

  // Discover movies by provider id or name with proper region filtering
  async getMoviesByProvider(
    provider: number | string,
    region?: string,
  ): Promise<Movie[]> {
    let providerId =
      typeof provider === "number"
        ? provider
        : this.PROVIDER_IDS[provider] || Number(provider);
    const reg = region || "US";
    
    console.log(`Fetching ${provider} movies for region: ${reg}`);
    
    const endpoint = `/discover/movie?api_key=${API_KEY}&with_watch_providers=${providerId}&watch_region=${reg}&with_watch_monetization_types=flatrate|rent|buy&sort_by=popularity.desc&page=1&region=${reg}`;
    
    try {
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_watch_providers: providerId,
          watch_region: reg,
          with_watch_monetization_types: "flatrate|rent|buy",
          sort_by: "popularity.desc",
          page: 1,
          region: reg
        }
      });
      
      const results = response.data.results || [];
      console.log(`Provider ${provider} results for ${reg}:`, results.length, "movies");
      
      return results;
    } catch (error) {
      console.error(`Failed to fetch ${provider} movies for region ${reg}:`, error);
      // Return empty array to ensure no global content leaks through
      return [];
    }
  }

  // Get trending movies
  async getTrendingMovies(region?: string, userLocation?: any): Promise<Movie[]> {
    // For Nigeria, especially Lagos, prioritize Nigerian content
    if (region === "NG" || (userLocation?.isLagosNigeria)) {
      console.log("🎬 Fetching Nigeria-focused content for Lagos user");
      
      const [globalTrending, nigeriaMovies] = await Promise.all([
        this.request("/trending/movie/week"),
        this.getNigeriaThemedMovies()
      ]);

      // For Lagos users, heavily prioritize Nigerian content
      const isLagosUser = userLocation?.isLagosNigeria;
      let prioritizedMovies;
      
      if (isLagosUser) {
        // Lagos users get 60% Nigerian content, 40% global
        const nigeriaMoviesNeeded = Math.ceil(12 * 0.6); // 8 out of 20 movies
        const globalMoviesNeeded = 20 - nigeriaMoviesNeeded; // 12 out of 20 movies
        
        prioritizedMovies = [
          ...nigeriaMovies.slice(0, nigeriaMoviesNeeded),
          ...globalTrending.results.slice(0, globalMoviesNeeded)
        ];
      } else {
        // Regular Nigeria users get 40% Nigerian content, 60% global
        const nigeriaMoviesNeeded = Math.ceil(20 * 0.4); // 8 out of 20 movies
        const globalMoviesNeeded = 20 - nigeriaMoviesNeeded; // 12 out of 20 movies
        
        prioritizedMovies = [
          ...nigeriaMovies.slice(0, nigeriaMoviesNeeded),
          ...globalTrending.results.slice(0, globalMoviesNeeded)
        ];
      }

      const uniqueMovies = prioritizedMovies.filter((movie, index, self) =>
        index === self.findIndex((m) => m.id === movie.id)
      );

      return uniqueMovies.slice(0, 20);
    }

    const endpoint = region
      ? `/trending/movie/week?region=${region}`
      : "/trending/movie/week";
    const data: MoviesResponse = await this.request(endpoint);
    return data.results;
  }

  // Get top rated movies
  async getTopRatedMovies(region?: string): Promise<Movie[]> {
    if (region === "NG") {
      const data: MoviesResponse = await this.request(
        `/discover/movie?region=NG&watch_region=NG&with_watch_monetization_types=flatrate|rent|buy&sort_by=vote_average.desc&page=1`,
      );
      return data.results;
    }

    const endpoint = region
      ? `/movie/top_rated?region=${region}`
      : "/movie/top_rated";
    const data: MoviesResponse = await this.request(endpoint);
    return data.results;
  }

  // Get popular movies
  async getPopularMovies(region?: string): Promise<Movie[]> {
    if (region === "NG") {
      const data: MoviesResponse = await this.request(
        `/discover/movie?region=NG&watch_region=NG&with_watch_monetization_types=flatrate|rent|buy&sort_by=popularity.desc&page=1`,
      );
      return data.results;
    }

    const endpoint = region
      ? `/movie/popular?region=${region}`
      : "/movie/popular";
    const data: MoviesResponse = await this.request(endpoint);
    return data.results;
  }

  // Get now playing movies
  async getNowPlayingMovies(): Promise<Movie[]> {
    const data: MoviesResponse = await this.request("/movie/now_playing");
    return data.results;
  }

  // Search movies
  async searchMovies(query: string): Promise<Movie[]> {
    if (!query.trim()) return [];

    const data: SearchResponse = await this.request(
      `/search/movie?query=${encodeURIComponent(query)}`,
    );
    return data.results;
  }

  // Get movie details
  async getMovieDetails(id: number): Promise<MovieDetails> {
    return await this.request(`/movie/${id}`);
  }

  // Get movie credits (cast and crew)
  async getMovieCredits(id: number) {
    return await this.request(`/movie/${id}/credits`);
  }

  // Get movie videos (trailers, teasers)
  async getMovieVideos(id: number): Promise<any> {
    const data: any = await this.request(`/movie/${id}/videos`);
    return data;
  }

  // Get similar movies
  async getSimilarMovies(id: number): Promise<Movie[]> {
    const data: MoviesResponse = await this.request(`/movie/${id}/similar`);
    return data.results;
  }

  // TV Series methods
  async getPopularTVSeries(): Promise<Movie[]> {
    const data: MoviesResponse = await this.request("/tv/popular");
    return data.results;
  }

  async getTopRatedTV(): Promise<Movie[]> {
    const data: MoviesResponse = await this.request("/tv/top_rated");
    return data.results;
  }

  async getTrendingTV(): Promise<Movie[]> {
    const data: MoviesResponse = await this.request("/trending/tv/week");
    return data.results;
  }

  // Get movies by genre
  async getMoviesByGenre(genreId: number): Promise<Movie[]> {
    const data: MoviesResponse = await this.request(
      `/discover/movie?with_genres=${genreId}`,
    );
    return data.results;
  }

  // Get genres list
  async getGenres() {
    return await this.request("/genre/movie/list");
  }

  // Get genre names from genre IDs
  async getGenreNames(genreIds: number[]): Promise<string[]> {
    if (!this.genresCache) {
      const data = await this.getGenres();
      this.genresCache = data.genres;
    }

    return genreIds.map((id) => {
      const genre = this.genresCache?.find((g) => g.id === id);
      return genre?.name || "Unknown";
    });
  }

  // Utility functions for image URLs
  getImageUrl(
    path: string,
    size: "w200" | "w300" | "w400" | "w500" | "w780" | "original" = "w500",
  ): string {
    return `${IMAGE_BASE_URL}/${size}${path}`;
  }

  getBackdropUrl(
    path: string,
    size: "w300" | "w780" | "w1280" | "original" = "original",
  ): string {
    return `${IMAGE_BASE_URL}/${size}${path}`;
  }
}

// Export singleton instance
export const tmdbApi = new TMDbAPI();
export default tmdbApi;
