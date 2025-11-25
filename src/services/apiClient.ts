/**
 * Generic API Client for TMDB API calls
 * Eliminates duplicate fetch patterns and provides consistent error handling
 *
 * @module services/apiClient
 * @example
 * const movieDetails = await fetchMovieDetails(550);
 * const videos = await fetchMovieVideos(550);
 */

interface ApiOptions {
  region?: string;
  language?: string;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Generic fetch wrapper for TMDB API calls
 * Handles authentication, error checking, and response parsing
 *
 * @template T - The expected response data type
 * @param {string} endpoint - TMDB API endpoint (without base URL)
 * @param {ApiOptions} [options] - Optional parameters (region, language)
 * @returns {Promise<T>} Parsed JSON response data
 * @throws {Error} If API key is missing or request fails
 *
 * @example
 * const data = await fetchTMDbData('/movie/550');
 * const dataWithRegion = await fetchTMDbData('/trending/movie/week', { region: 'US' });
 */
export const fetchTMDbData = async <T>(
  endpoint: string,
  options?: ApiOptions,
): Promise<T> => {
  if (!API_KEY) {
    throw new Error("TMDB API key not configured");
  }

  try {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.append("api_key", API_KEY);

    if (options?.region) {
      url.searchParams.append("region", options.region);
    }
    if (options?.language) {
      url.searchParams.append("language", options.language);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.status_message ||
          `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown API error";
    console.error(`[TMDB API Error] ${endpoint}:`, message);
    throw error;
  }
};

/**
 * Fetch movie details
 * @param {number} movieId - The TMDB movie ID
 * @returns {Promise<any>} Movie details object
 */
export const fetchMovieDetails = async (movieId: number) => {
  return fetchTMDbData(`/movie/${movieId}`);
};

/**
 * Fetch movie videos (trailers, teasers, clips)
 * @param {number} movieId - The TMDB movie ID
 * @returns {Promise<any>} Videos data object with results array
 */
export const fetchMovieVideos = async (movieId: number) => {
  return fetchTMDbData(`/movie/${movieId}/videos`);
};

/**
 * Find the first trailer from a videos array
 * Filters for YouTube trailers only
 *
 * @param {Array<{type: string, site: string, key: string}>} videos - Array of video objects
 * @returns {Object|undefined} Trailer object or undefined if not found
 *
 * @example
 * const videos = await fetchMovieVideos(550);
 * const trailer = findTrailer(videos.results);
 */
export const findTrailer = (
  videos: Array<{ type: string; site: string; key: string }>,
) => {
  return videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
};

/**
 * Fetch movie credits (cast and crew)
 * @param {number} movieId - The TMDB movie ID
 * @returns {Promise<any>} Credits data with cast and crew arrays
 */
export const fetchMovieCredits = async (movieId: number) => {
  return fetchTMDbData(`/movie/${movieId}/credits`);
};

/**
 * Extract directors from crew array
 * Filters crew members by job === "Director"
 *
 * @param {Array<{job: string, [key: string]: any}>} crew - Crew members array
 * @returns {Array} Array of director objects
 *
 * @example
 * const credits = await fetchMovieCredits(550);
 * const directors = getDirectorsFromCrew(credits.crew);
 */
export const getDirectorsFromCrew = (
  crew: Array<{ job: string; [key: string]: any }>,
) => {
  return crew.filter((member) => member.job === "Director");
};

/**
 * Fetch watch providers (streaming services) for a movie
 * Returns US providers by default
 *
 * @param {number} movieId - The TMDB movie ID
 * @returns {Promise<any>} Watch providers object (flatrate, rent, buy)
 */
export const fetchWatchProviders = async (movieId: number) => {
  const data: any = await fetchTMDbData(`/movie/${movieId}/watch/providers`);
  return data.results?.US || {};
};
