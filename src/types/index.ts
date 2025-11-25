// Movie-related types
export interface Movie {
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

export interface MovieDetails extends Movie {
  runtime: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  homepage: string;
  belongs_to_collection?: Collection;
  budget: number;
  revenue: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

// Cast and Crew types
export interface Cast {
  id: number;
  name: string;
  character: string;
  credit_id: string;
  order: number;
  profile_path: string | null;
  gender: number;
  cast_id?: number;
  adult: boolean;
  popularity: number;
  known_for_department: string;
  original_name: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  credit_id: string;
  profile_path: string | null;
  gender: number;
  adult: boolean;
  popularity: number;
  known_for_department: string;
  original_name: string;
}

export interface CastCrewResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

// API Response types
export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Component Props types
export interface MovieCardProps {
  movie: Movie;
}

export interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export interface HeroBannerProps {
  movie: Movie;
}

// Streaming Provider types
export interface StreamingProvider {
  name: string;
  logo: string;
  url: string;
}

// API Configuration
export interface TMDbConfig {
  apiKey: string;
  baseUrl: string;
  imageBaseUrl: string;
}
