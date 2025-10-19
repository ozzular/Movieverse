import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Movie } from '../types/index'

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: Movie[]
  setSearchResults: (results: Movie[]) => void
  isSearching: boolean
  setIsSearching: (searching: boolean) => void
  performSearch: (query: string) => Promise<void>
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

  const value: SearchContextType = {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isSearching,
    setIsSearching,
    performSearch,
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}
