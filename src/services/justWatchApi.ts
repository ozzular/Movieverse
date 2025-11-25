import type { StreamingProvider } from "../types/index";

// JustWatch API Configuration
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = "streaming-availability.p.rapidapi.com";
const BASE_URL = `https://${RAPIDAPI_HOST}`;

// Validate API key
if (!RAPIDAPI_KEY) {
  console.warn("VITE_RAPIDAPI_KEY is not defined in environment variables");
}

// Provider name to logo mapping
export const PROVIDER_LOGOS: Record<string, string> = {
  Netflix:
    "https://cdn.jsdelivr.net/gh/JustWatch/streaming-logos@main/logos/netflix/logo_2.svg",
  "Amazon Prime Video":
    "https://cdn.jsdelivr.net/gh/JustWatch/streaming-logos@main/logos/prime_video/logo_2.svg",
  "Prime Video":
    "https://cdn.jsdelivr.net/gh/JustWatch/streaming-logos@main/logos/prime_video/logo_2.svg",
  Hulu: "https://cdn.jsdelivr.net/gh/JustWatch/streaming-logos@main/logos/hulu/logo_2.svg",
  "Disney Plus":
    "https://cdn.jsdelivr.net/gh/JustWatch/streaming-logos@main/logos/disney_plus/logo_2.svg",
  "Disney+":
    "https://cdn.jsdelivr.net/gh/JustWatch/streaming-logos@main/logos/disney_plus/logo_2.svg",
  "Apple TV Plus":
    "https://cdn.jsdelivr.net/gh/JustWatch/streaming-logos@main/logos/apple_tv_plus/logo_2.svg",
  "Apple TV+":
    "https://cdn.jsdelivr.net/gh/JustWatch/streaming-logos@main/logos/apple_tv_plus/logo_2.svg",
  "HBO Max":
    "https://cdn.jsdelivr.net/gh/JustWatch/streaming-logos@main/logos/hbo_max/logo_2.svg",
  Max: "https://cdn.jsdelivr.net/gh/JustWatch/streaming-logos@main/logos/hbo_max/logo_2.svg",
  Peacock:
    "https://cdn.jsdelivr.net/gh/JustWatch/streaming-logos@main/logos/peacock/logo_2.svg",
  "Paramount Plus":
    "https://cdn.jsdelivr.net/gh/JustWatch/streaming-logos@main/logos/paramount_plus/logo_2.svg",
  "Paramount+":
    "https://cdn.jsdelivr.net/gh/JustWatch/streaming-logos@main/logos/paramount_plus/logo_2.svg",
};

// Cache for API responses (simple in-memory cache)
const cache = new Map<
  string,
  { data: StreamingProvider[]; timestamp: number }
>();
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

class JustWatchAPI {
  private async request<T>(endpoint: string): Promise<T> {
    if (!RAPIDAPI_KEY) {
      throw new Error("JustWatch API key not configured");
    }

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": RAPIDAPI_HOST,
        },
      });

      if (!response.ok) {
        throw new Error(`JustWatch API error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("JustWatch API Error:", error);
      throw new Error("Failed to fetch streaming data");
    }
  }

  // Get streaming providers for a movie
  async getStreamingProviders(
    movieTitle: string,
    releaseYear?: number,
  ): Promise<StreamingProvider[]> {
    if (!movieTitle) return [];

    // Check cache first
    const cacheKey = `${movieTitle}-${releaseYear || ""}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      // Search for the movie first
      const searchResults = await this.request(
        `/search/title?movie=${encodeURIComponent(movieTitle)}&country=US`,
      );

      if (!searchResults.result || searchResults.result.length === 0) {
        throw new Error("Movie not found in JustWatch database");
      }

      // Get the first matching result
      const movie = searchResults.result[0];

      // Get streaming availability
      const availability = await this.request(
        `/get/basic?imdb_id=${movie.imdb_id}&country=US`,
      );

      const providers: StreamingProvider[] = [];

      // Extract streaming providers
      if (availability.streamingInfo && availability.streamingInfo.netflix) {
        providers.push({
          name: "Netflix",
          logo: PROVIDER_LOGOS["Netflix"],
          url: availability.streamingInfo.netflix[0]?.url || "#",
        });
      }

      if (availability.streamingInfo && availability.streamingInfo.prime) {
        providers.push({
          name: "Amazon Prime Video",
          logo: PROVIDER_LOGOS["Amazon Prime Video"],
          url: availability.streamingInfo.prime[0]?.url || "#",
        });
      }

      if (availability.streamingInfo && availability.streamingInfo.hulu) {
        providers.push({
          name: "Hulu",
          logo: PROVIDER_LOGOS["Hulu"],
          url: availability.streamingInfo.hulu[0]?.url || "#",
        });
      }

      if (availability.streamingInfo && availability.streamingInfo.disney) {
        providers.push({
          name: "Disney Plus",
          logo: PROVIDER_LOGOS["Disney Plus"],
          url: availability.streamingInfo.disney[0]?.url || "#",
        });
      }

      if (availability.streamingInfo && availability.streamingInfo.apple) {
        providers.push({
          name: "Apple TV Plus",
          logo: PROVIDER_LOGOS["Apple TV Plus"],
          url: availability.streamingInfo.apple[0]?.url || "#",
        });
      }

      if (availability.streamingInfo && availability.streamingInfo.hbo) {
        providers.push({
          name: "HBO Max",
          logo: PROVIDER_LOGOS["HBO Max"],
          url: availability.streamingInfo.hbo[0]?.url || "#",
        });
      }

      // Cache the results
      cache.set(cacheKey, { data: providers, timestamp: Date.now() });

      return providers;
    } catch (error) {
      console.error("Error fetching JustWatch data:", error);
      return [];
    }
  }

  // Get providers by TMDB movie ID (alternative approach)
  async getProvidersByTMDBId(tmdbId: number): Promise<StreamingProvider[]> {
    // This would require an additional API call to get movie details first
    // For now, we'll use the title-based approach above
    // In a production app, you might want to store/cache TMDB to IMDB ID mappings
    return [];
  }
}

// Export singleton instance
export const justWatchApi = new JustWatchAPI();
export default justWatchApi;
