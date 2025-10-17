import { create } from 'zustand'
import { Movie, Genre } from '../types'

interface MovieState {
  // Search state
  searchQuery: string
  searchResults: Movie[]
  isSearching: boolean

  // Genre filtering
  selectedGenres: number[]
  genres: Genre[]

  // Favorites
  favorites: Movie[]

  // Loading states
  isLoadingMovies: boolean
  isLoadingGenres: boolean

  // Error states
  error: string | null

  // Actions
  setSearchQuery: (query: string) => void
  setSearchResults: (results: Movie[]) => void
  setIsSearching: (searching: boolean) => void
  toggleGenre: (genreId: number) => void
  setGenres: (genres: Genre[]) => void
  addToFavorites: (movie: Movie) => void
  removeFromFavorites: (movieId: number) => void
  setLoadingMovies: (loading: boolean) => void
  setLoadingGenres: (loading: boolean) => void
  setError: (error: string | null) => void
  clearFilters: () => void
  clearError: () => void
}

export const useMovieStore = create<MovieState>((set, get) => ({
  // Initial state
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  selectedGenres: [],
  genres: [],
  favorites: [],
  isLoadingMovies: false,
  isLoadingGenres: false,
  error: null,

  // Actions
  setSearchQuery: (query) => set({ searchQuery: query }),

  setSearchResults: (results) => set({ searchResults: results }),

  setIsSearching: (searching) => set({ isSearching: searching }),

  toggleGenre: (genreId) => set((state) => ({
    selectedGenres: state.selectedGenres.includes(genreId)
      ? state.selectedGenres.filter(id => id !== genreId)
      : [...state.selectedGenres, genreId]
  })),

  setGenres: (genres) => set({ genres }),

  addToFavorites: (movie) => set((state) => {
    const exists = state.favorites.find(fav => fav.id === movie.id)
    if (exists) return state

    const newFavorites = [...state.favorites, movie]
    // Persist to localStorage
    localStorage.setItem('movieverse-favorites', JSON.stringify(newFavorites))

    return { favorites: newFavorites }
  }),

  removeFromFavorites: (movieId) => set((state) => {
    const newFavorites = state.favorites.filter(movie => movie.id !== movieId)
    // Persist to localStorage
    localStorage.setItem('movieverse-favorites', JSON.stringify(newFavorites))

    return { favorites: newFavorites }
  }),

  setLoadingMovies: (loading) => set({ isLoadingMovies: loading }),

  setLoadingGenres: (loading) => set({ isLoadingGenres: loading }),

  setError: (error) => set({ error }),

  clearFilters: () => set({ selectedGenres: [] }),

  clearError: () => set({ error: null }),
}))

// Load favorites from localStorage on store creation
const savedFavorites = localStorage.getItem('movieverse-favorites')
if (savedFavorites) {
  try {
    const favorites = JSON.parse(savedFavorites)
    useMovieStore.setState({ favorites })
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error)
  }
}