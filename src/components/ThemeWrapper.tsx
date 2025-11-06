import React, { useEffect } from 'react'

interface ThemeWrapperProps {
  children: React.ReactNode
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  useEffect(() => {
    // Force dark theme for the app (Netflix-style single dark theme)
    const root = document.documentElement
    root.classList.add('dark')

    // Ensure body has dark theme class for compatibility
    document.body.classList.add('night-theme')

    // Leave visual styling to CSS variables defined in theme.css
    return () => {
      // cleanup if unmounting
      root.classList.remove('dark')
      document.body.classList.remove('night-theme')
    }
  }, [])

  return <>{children}</>
}

export default ThemeWrapper