// Movie-related types - Renamed to avoid caching issues
export interface Movie {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  overview: string
  release_date: string
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_title: string
  popularity: number
  video: boolean
  vote_count: number
}

export interface MovieDetails extends Movie {
  runtime: number
  genres: Genre[]
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  homepage: string
  belongs_to_collection?: Collection
  budget: number
  revenue: number
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  iso_639_1: string
  name: string
}

export interface Collection {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}