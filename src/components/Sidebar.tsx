import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useFavorites } from '../contexts/FavoritesContext'
import AdvancedFilter from './AdvancedFilter'
import MovieVerseLogo from './MovieVerseLogo'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { favorites } = useFavorites()
  const location = useLocation()

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      path: '/movies',
      label: 'Movies',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      path: '/series',
      label: 'Series',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      path: '/genres',
      label: 'Genres',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    }
  ]

  const bottomNavItems: [] = []

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:fixed inset-y-0 left-0 z-50 w-80 lg:w-64 h-full
        bg-galaxy-gray/95 backdrop-blur-lg border-r border-galaxy-purple/20
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-8">
            <MovieVerseLogo size="md" />
          </div>

          {/* Navigation */}
          <nav className="mb-8">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
                      ${location.pathname === item.path
                        ? 'bg-galaxy-purple text-white'
                        : 'text-gray-300 hover:text-white hover:bg-galaxy-purple/20'
                      }
                    `}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                    {item.path === '/favorites' && favorites.length > 0 && (
                      <span className="ml-auto bg-galaxy-red text-white text-xs rounded-full px-2 py-1">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                </li>
              ))}

              {/* Divider */}
              <li className="pt-4">
                <div className="border-t border-galaxy-purple/20"></div>
              </li>

              {/* Bottom Navigation Items */}
              {bottomNavItems.length > 0 && bottomNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
                      ${location.pathname === item.path
                        ? 'bg-galaxy-purple text-white'
                        : 'text-gray-300 hover:text-white hover:bg-galaxy-purple/20'
                      }
                    `}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Advanced Filter */}
          <div className="flex-1">
            <h3 className="text-white text-lg font-semibold mb-4">Filters</h3>
            <AdvancedFilter />
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
