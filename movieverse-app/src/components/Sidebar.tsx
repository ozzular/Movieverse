import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useFavorites } from '../contexts/FavoritesContext'
import MovieVerseLogo from './MovieVerseLogo'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { favorites } = useFavorites()
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved) {
      setIsCollapsed(JSON.parse(saved))
    }
  }, [])

  // Save collapsed state to localStorage
  const saveCollapsedState = (collapsed: boolean) => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed))
  }

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed
    setIsCollapsed(newCollapsed)
    saveCollapsedState(newCollapsed)
  }

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

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:fixed inset-y-0 left-0 z-50 h-full
        bg-galaxy-gray/95 backdrop-blur-lg border-r border-galaxy-purple/20
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isCollapsed ? 'lg:w-16' : 'lg:w-64 lg:translate-x-0'}
      `}>
        <div className={`flex flex-col h-full ${isCollapsed ? 'p-2' : 'p-6'}`}>
          {/* Logo and Collapse Toggle */}
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-8`}>
            {!isCollapsed && <MovieVerseLogo size="md" />}

            {/* Collapse Toggle Button - Always visible */}
            <button
              onClick={toggleCollapse}
              className="p-2 text-gray-400 hover:text-white hover:bg-galaxy-purple/20 rounded-lg transition-all duration-300"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className={isCollapsed ? 'mb-4' : 'mb-8'}>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      // Close mobile sidebar when link is clicked
                      if (window.innerWidth < 1024) {
                        onClose()
                      }
                    }}
                    className={`
                      flex items-center ${isCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg transition-all duration-300 group relative
                      ${location.pathname === item.path
                        ? 'bg-galaxy-purple text-white'
                        : 'text-gray-300 hover:text-white hover:bg-galaxy-purple/20'
                      }
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {item.icon}
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                    {item.path === '/favorites' && favorites.length > 0 && !isCollapsed && (
                      <span className="ml-auto bg-galaxy-red text-white text-xs rounded-full px-2 py-1">
                        {favorites.length}
                      </span>
                    )}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {item.label}
                        {item.path === '/favorites' && favorites.length > 0 && (
                          <span className="ml-1 bg-galaxy-red text-white text-xs rounded-full px-1.5 py-0.5">
                            {favorites.length}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                </li>
              ))}

              {/* Divider */}
              {!isCollapsed && (
                <li className="pt-4">
                  <div className="border-t border-galaxy-purple/20"></div>
                </li>
              )}
            </ul>
          </nav>

          {/* Filters Link */}
          <div className="flex-1">
            <Link
              to="/filters"
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onClose()
                }
              }}
              className={`
                flex items-center ${isCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg transition-all duration-300 group relative
                text-gray-300 hover:text-white hover:bg-galaxy-purple/20
              `}
              title={isCollapsed ? 'Advanced Filters' : undefined}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {!isCollapsed && <span className="font-medium">Advanced Filters</span>}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Advanced Filters
                </div>
              )}
            </Link>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
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