import React, { createContext, useContext, useState, useCallback, useRef } from 'react'
import type { ReactNode } from 'react'
import type { Movie } from '../types/index'

interface SearchSuggestion {
  id: number
  title: string
  release_date: string
  vote_average: number
  poster_path: string | null
}

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: Movie[]
  setSearchResults: (results: Movie[]) => void
  isSearching: boolean
  setIsSearching: (searching: boolean) => void
  performSearch: (query: string) => Promise<void>
  // New suggestions functionality
  searchSuggestions: SearchSuggestion[]
  isLoadingSuggestions: boolean
  showSuggestions: boolean
  setShowSuggestions: (show: boolean) => void
  debouncedSearch: (query: string) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

interface SearchProviderProps {
  children: ReactNode
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Debounce timer ref
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    try {
      setIsSearching(true)
      // Import tmdbApi dynamically to avoid circular imports
      const { tmdbApi } = await import('../services/tmdbApi')
      const results = await tmdbApi.searchMovies(query)
      setSearchResults(results)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const fetchSearchSuggestions = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setSearchSuggestions([])
      setIsLoadingSuggestions(false)
      return
    }

    try {
      setIsLoadingSuggestions(true)
      const { tmdbApi } = await import('../services/tmdbApi')
      const results = await tmdbApi.searchMovies(query)

      // Convert to suggestion format (limit to 5-8 results)
      const suggestions: SearchSuggestion[] = results.slice(0, 6).map(movie => ({
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        poster_path: movie.poster_path
      }))

      setSearchSuggestions(suggestions)
    } catch (error) {
      console.error('Error fetching search suggestions:', error)
      setSearchSuggestions([])
    } finally {
      setIsLoadingSuggestions(false)
    }
  }, [])

  const debouncedSearch = useCallback((query: string) => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set new timer for debounced search
    debounceTimerRef.current = setTimeout(() => {
      if (query.length >= 3) {
        fetchSearchSuggestions(query)
      } else {
        setSearchSuggestions([])
      }
    }, 300) // 300ms debounce delay
  }, [fetchSearchSuggestions])

  // Handle search query changes
  const handleSearchQueryChange = useCallback((query: string) => {
    setSearchQuery(query)

    // Show suggestions dropdown if query has 3+ characters
    if (query.length >= 3) {
      setShowSuggestions(true)
      debouncedSearch(query)
    } else {
      setShowSuggestions(false)
      setSearchSuggestions([])
    }
  }, [debouncedSearch])

  const value: SearchContextType = {
    searchQuery,
    setSearchQuery: handleSearchQueryChange,
    searchResults,
    setSearchResults,
    isSearching,
    setIsSearching,
    performSearch,
    searchSuggestions,
    isLoadingSuggestions,
    showSuggestions,
    setShowSuggestions,
    debouncedSearch,
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}