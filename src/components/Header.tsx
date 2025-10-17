import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSearch } from '../contexts/SearchContext'
import { useFavorites } from '../contexts/FavoritesContext'
import MovieVerseLogo from './MovieVerseLogo'
import SunMoonSwitch from './SunMoonSwitch'

interface HeaderProps {
  onMenuClick: () => void
  sidebarOpen: boolean
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, sidebarOpen }) => {
  const { searchQuery, setSearchQuery, performSearch } = useSearch()
  const { favorites } = useFavorites()
  const navigate = useNavigate()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      await performSearch(searchQuery)
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 glass-morphism">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Sidebar Toggle */}
          <button
            onClick={onMenuClick}
            className="p-2 text-white hover:text-galaxy-purple transition-colors"
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
            <div className="text-xl font-bold galaxy-purple glow-text">
              MovieVerse
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-galaxy-gray/50 border border-galaxy-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-galaxy-purple focus:ring-1 focus:ring-galaxy-purple"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-galaxy-purple hover:text-galaxy-red transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-galaxy-purple transition-colors">
              Home
            </Link>
            <Link
              to="/favorites"
              className="text-white hover:text-galaxy-purple transition-colors flex items-center space-x-1"
            >
              <span>Favorites</span>
              {favorites.length > 0 && (
                <span className="bg-galaxy-red text-white text-xs rounded-full px-2 py-1">
                  {favorites.length}
                </span>
              )}
            </Link>
            {/* Theme Toggle */}
            <SunMoonSwitch />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
