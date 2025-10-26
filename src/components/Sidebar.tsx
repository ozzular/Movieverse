import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Home,
  Film,
  Star,
  Tv,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  User,
} from 'lucide-react'
import { cn } from '../lib/utils'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { icon: Home, label: 'Home', path: '/app' },
    { icon: Film, label: 'Movies', path: '/movies' },
    { icon: Tv, label: 'TV Series', path: '/series' },
    { icon: Star, label: 'Genres', path: '/genres' },
    { icon: User, label: 'About', path: '/about' },
    { icon: Settings, label: 'Settings', path: '/profile' },
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-indigo-950/40 backdrop-blur-md border-r border-indigo-400/20 transition-all duration-300",
          isOpen ? "w-64" : "w-16",
          "hidden lg:flex flex-col"
        )}
      >
        {/* Header with Toggle Switch */}
        <div className="flex items-center justify-between p-4">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <div className="glass-card w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-white font-bold text-lg">MovieVerse</span>
            </div>
          )}

          {/* Prominent Toggle Switch */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="glass-card w-12 h-6 rounded-full flex items-center transition-all duration-300 hover:scale-110 relative ring-1 ring-white/20"
          >
            <div className={cn(
              "w-5 h-5 bg-white rounded-full transition-all duration-300 absolute shadow-lg",
              isOpen ? "translate-x-6" : "translate-x-0.5"
            )} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-6">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path ||
                (item.path === '/app' && (location.pathname === '/' || location.pathname === '/home'))
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "w-full flex items-center rounded-xl transition-all duration-200 hover:scale-105",
                    isOpen
                      ? "px-4 py-3 space-x-3 justify-start"
                      : "px-2 py-3 justify-center",
                    isActive
                      ? "bg-white/10 text-white border border-white/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-white")} />
                  {isOpen && (
                    <span className="font-medium whitespace-nowrap truncate">
                      {item.label}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </nav>

        {/* No footer - clean design */}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-indigo-950/40 backdrop-blur-md border-r border-indigo-400/20 transition-transform duration-300 lg:hidden",
          "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header with Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center space-x-2">
            <div className="glass-card w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-white font-bold text-lg">MovieVerse</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="glass-card w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-6">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path ||
                (item.path === '/app' && (location.pathname === '/' || location.pathname === '/home'))
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    handleNavigation(item.path)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center rounded-xl transition-all duration-200 hover:scale-105 px-4 py-3 space-x-3 justify-start",
                    isActive
                      ? "bg-white/10 text-white border border-white/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-white")} />
                  <span className="font-medium whitespace-nowrap truncate">
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* No footer - clean design */}
      </aside>
    </>
  )
}

export default Sidebar
