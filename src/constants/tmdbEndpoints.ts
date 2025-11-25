/**
 * TMDB API Endpoints
 * Centralized endpoint definitions to avoid hardcoding and improve maintainability
 */

export const TMDB_ENDPOINTS = {
  // Trending
  TRENDING_MOVIES_WEEK: "/trending/movie/week",
  TRENDING_MOVIES_DAY: "/trending/movie/day",
  TRENDING_TV_WEEK: "/trending/tv/week",
  TRENDING_TV_DAY: "/trending/tv/day",

  // Movies
  POPULAR_MOVIES: "/movie/popular",
  TOP_RATED_MOVIES: "/movie/top_rated",
  NOW_PLAYING_MOVIES: "/movie/now_playing",
  UPCOMING_MOVIES: "/movie/upcoming",

  // TV Shows
  POPULAR_TV: "/tv/popular",
  TOP_RATED_TV: "/tv/top_rated",
  AIRING_TODAY_TV: "/tv/airing_today",
  ON_THE_AIR_TV: "/tv/on_the_air",

  // Search
  SEARCH_MOVIES: "/search/movie",
  SEARCH_TV: "/search/tv",
  SEARCH_MULTI: "/search/multi",

  // Details
  MOVIE_DETAILS: (id: number) => `/movie/${id}`,
  TV_DETAILS: (id: number) => `/tv/${id}`,
  PERSON_DETAILS: (id: number) => `/person/${id}`,

  // Media Info
  MOVIE_VIDEOS: (id: number) => `/movie/${id}/videos`,
  MOVIE_CREDITS: (id: number) => `/movie/${id}/credits`,
  MOVIE_WATCH_PROVIDERS: (id: number) => `/movie/${id}/watch/providers`,
  MOVIE_IMAGES: (id: number) => `/movie/${id}/images`,
  MOVIE_REVIEWS: (id: number) => `/movie/${id}/reviews`,
  MOVIE_SIMILAR: (id: number) => `/movie/${id}/similar`,
  MOVIE_RECOMMENDATIONS: (id: number) => `/movie/${id}/recommendations`,

  TV_VIDEOS: (id: number) => `/tv/${id}/videos`,
  TV_CREDITS: (id: number) => `/tv/${id}/credits`,
  TV_WATCH_PROVIDERS: (id: number) => `/tv/${id}/watch/providers`,
  TV_IMAGES: (id: number) => `/tv/${id}/images`,

  PERSON_CREDITS: (id: number) => `/person/${id}/combined_credits`,
  PERSON_IMAGES: (id: number) => `/person/${id}/images`,

  // Discover
  DISCOVER_MOVIES: "/discover/movie",
  DISCOVER_TV: "/discover/tv",

  // Genres
  GENRES_MOVIES: "/genre/movie/list",
  GENRES_TV: "/genre/tv/list",

  // Collections
  COLLECTION_DETAILS: (id: number) => `/collection/${id}`,

  // Networks
  NETWORK_DETAILS: (id: number) => `/network/${id}`,
} as const;

/** Query parameter builders */
export const buildMovieEndpoint = (
  category: "trending" | "popular" | "top_rated" | "now_playing" | "upcoming",
  region?: string,
): string => {
  const endpoints: Record<string, string> = {
    trending: TMDB_ENDPOINTS.TRENDING_MOVIES_WEEK,
    popular: TMDB_ENDPOINTS.POPULAR_MOVIES,
    top_rated: TMDB_ENDPOINTS.TOP_RATED_MOVIES,
    now_playing: TMDB_ENDPOINTS.NOW_PLAYING_MOVIES,
    upcoming: TMDB_ENDPOINTS.UPCOMING_MOVIES,
  };

  let endpoint = endpoints[category];
  if (region && category !== "trending") {
    endpoint += `?region=${region}`;
  }
  return endpoint;
};

export const buildTVEndpoint = (
  category:
    | "trending"
    | "popular"
    | "top_rated"
    | "airing_today"
    | "on_the_air",
): string => {
  const endpoints: Record<string, string> = {
    trending: TMDB_ENDPOINTS.TRENDING_TV_WEEK,
    popular: TMDB_ENDPOINTS.POPULAR_TV,
    top_rated: TMDB_ENDPOINTS.TOP_RATED_TV,
    airing_today: TMDB_ENDPOINTS.AIRING_TODAY_TV,
    on_the_air: TMDB_ENDPOINTS.ON_THE_AIR_TV,
  };

  return endpoints[category];
};

/** Image URL builder */
export const buildImageUrl = (
  path: string,
  size:
    | "w92"
    | "w154"
    | "w185"
    | "w200"
    | "w300"
    | "w342"
    | "w500"
    | "w780"
    | "original" = "w500",
): string => `https://image.tmdb.org/t/p/${size}${path}`;

/** Backdrop URL builder */
export const buildBackdropUrl = (
  path: string,
  size: "w300" | "w780" | "w1280" | "original" = "original",
): string => `https://image.tmdb.org/t/p/${size}${path}`;
