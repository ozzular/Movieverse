import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Genre } from '../types/index'

export interface FilterState {
  genres: number[]
  releaseYearRange: [number, number] | null
  regions: string[]
  sortBy: 'popularity' | 'release_date' | 'rating' | 'title'
}

interface FilterContextType {
  filters: FilterState
  setGenres: (genres: number[]) => void
  setReleaseYearRange: (range: [number, number] | null) => void
  setRegions: (regions: string[]) => void
  setSortBy: (sort: FilterState['sortBy']) => void
  toggleGenre: (genreId: number) => void
  toggleRegion: (region: string) => void
  clearAllFilters: () => void
  clearGenres: () => void
  clearRegions: () => void
  clearReleaseYearRange: () => void
  hasActiveFilters: boolean
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const useFilters = () => {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}

interface FilterProviderProps {
  children: ReactNode
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>({
    genres: [],
    releaseYearRange: null,
    regions: [],
    sortBy: 'popularity'
  })

  const setGenres = (genres: number[]) => {
    setFilters(prev => ({ ...prev, genres }))
  }

  const setReleaseYearRange = (range: [number, number] | null) => {
    setFilters(prev => ({ ...prev, releaseYearRange: range }))
  }

  const setRegions = (regions: string[]) => {
    setFilters(prev => ({ ...prev, regions }))
  }

  const setSortBy = (sort: FilterState['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy: sort }))
  }

  const toggleGenre = (genreId: number) => {
    setFilters(prev => ({
      ...prev,
      genres: prev.genres.includes(genreId)
        ? prev.genres.filter(id => id !== genreId)
        : [...prev.genres, genreId]
    }))
  }

  const toggleRegion = (region: string) => {
    setFilters(prev => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter(r => r !== region)
        : [...prev.regions, region]
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      genres: [],
      releaseYearRange: null,
      regions: [],
      sortBy: 'popularity'
    })
  }

  const clearGenres = () => {
    setFilters(prev => ({ ...prev, genres: [] }))
  }

  const clearRegions = () => {
    setFilters(prev => ({ ...prev, regions: [] }))
  }

  const clearReleaseYearRange = () => {
    setFilters(prev => ({ ...prev, releaseYearRange: null }))
  }

  const hasActiveFilters = filters.genres.length > 0 ||
                          filters.releaseYearRange !== null ||
                          filters.regions.length > 0

  const value: FilterContextType = {
    filters,
    setGenres,
    setReleaseYearRange,
    setRegions,
    setSortBy,
    toggleGenre,
    toggleRegion,
    clearAllFilters,
    clearGenres,
    clearRegions,
    clearReleaseYearRange,
    hasActiveFilters
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}
