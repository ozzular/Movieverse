import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { tmdbApi } from '../services/tmdbApi'
import { Genre } from '../types'

interface GenreContextType {
  genres: Genre[]
  selectedGenres: number[]
  toggleGenre: (genreId: number) => void
  clearFilters: () => void
  isLoading: boolean
}

const GenreContext = createContext<GenreContextType | undefined>(undefined)

export const useGenres = () => {
  const context = useContext(GenreContext)
  if (context === undefined) {
    throw new Error('useGenres must be used within a GenreProvider')
  }
  return context
}

interface GenreProviderProps {
  children: ReactNode
}

export const GenreProvider: React.FC<GenreProviderProps> = ({ children }) => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await tmdbApi.getGenres()
        setGenres(genresData.genres)
      } catch (error) {
        console.error('Error fetching genres:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGenres()
  }, [])

  const toggleGenre = (genreId: number) => {
    setSelectedGenres(prev =>
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    )
  }

  const clearFilters = () => {
    setSelectedGenres([])
  }

  const value: GenreContextType = {
    genres,
    selectedGenres,
    toggleGenre,
    clearFilters,
    isLoading,
  }

  return (
    <GenreContext.Provider value={value}>
      {children}
    </GenreContext.Provider>
  )
}