import React, { useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'

interface ThemeWrapperProps {
  children: React.ReactNode
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const { currentTheme } = useTheme()

  useEffect(() => {
    // Apply theme class to document root element (html) as specified
    const root = document.documentElement

    if (currentTheme === 'night') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Apply theme class to document body for compatibility
    document.body.className = currentTheme === 'day' ? 'day-theme' : 'night-theme'

    // Apply background styles
    const gradient = currentTheme === 'day'
      ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
      : 'linear-gradient(135deg, #0a0a1a 0%, #0f0f23 50%, #2a2235 100%)';

    document.body.style.background = gradient;
    document.body.style.transition = 'background 0.8s ease-in-out';

    // Cleanup function to remove styles when component unmounts
    return () => {
      document.documentElement.classList.remove('dark')
      document.body.className = ''
      document.body.style.background = ''
      document.body.style.transition = ''
    }
  }, [currentTheme])

  return <>{children}</>
}

export default ThemeWrapper