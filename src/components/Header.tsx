import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSearch } from '../contexts/SearchContext'
import { useFavorites } from '../contexts/FavoritesContext'
import MovieVerseLogo from './MovieVerseLogo'
import SunMoonSwitch from './SunMoonSwitch'
import SearchSuggestions from './SearchSuggestions'

interface HeaderProps {
  onMenuClick: () => void
  sidebarOpen: boolean
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, sidebarOpen }) => {
  const {
    searchQuery,
    setSearchQuery,
    performSearch,
    showSuggestions,
    setShowSuggestions
  } = useSearch()
  const { favorites } = useFavorites()
  const navigate = useNavigate()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      await performSearch(searchQuery)
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setShowSuggestions(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleInputFocus = () => {
    if (searchQuery.length >= 3) {
      setShowSuggestions(true)
    }
  }

  const handleSuggestionClose = () => {
    setShowSuggestions(false)
  }

  return (
    <header className="sticky top-0 z-50 glass-morphism bg-gradient-to-r from-red-900/20 via-red-800/20 to-red-900/20 backdrop-blur-lg border-b border-red-800/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Sidebar Toggle */}
          <button
            onClick={onMenuClick}
            className="p-2 text-white hover:text-red-400 transition-colors rounded-lg hover:bg-red-900/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="hidden sm:block">
            <MovieVerseLogo size="sm" />
          </Link>

          {/* Mobile Logo Text */}
          <Link to="/" className="sm:hidden">
            <div className="text-xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              MovieVerse
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="w-full px-4 py-2.5 bg-red-900/30 border border-red-800/40 rounded-xl text-white placeholder-red-300/60 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/home" className="text-white hover:text-red-400 transition-colors font-medium">
              Home
            </Link>
            <Link
              to="/favorites"
              className="text-white hover:text-red-400 transition-colors flex items-center space-x-1 font-medium"
            >
              <span>Favorites</span>
              {favorites.length > 0 && (
                <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1">
                  {favorites.length}
                </span>
              )}
            </Link>
            {/* Theme Toggle */}
            <SunMoonSwitch />
          </nav>
        </div>
      </div>
      {/* Search Suggestions Dropdown */}
      <SearchSuggestions
        isVisible={showSuggestions}
        onClose={handleSuggestionClose}
      />
    </header>
  )
}

export default Header
