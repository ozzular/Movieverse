import { createContext, useContext, useState, useEffect } from 'react'

type ThemeMode = 'day' | 'night' | 'auto'

interface ThemeContextValue {
  themeMode: ThemeMode
  currentTheme: 'day' | 'night'
  sunriseTime: Date | null
  sunsetTime: Date | null
  setThemeMode: (mode: ThemeMode) => void
  isAutoMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

const fetchUserLocation = async () => {
  const url = import.meta.env.VITE_GEOLOCATION_API
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY

  if (!url || !apiKey) {
    console.warn('Geolocation API keys not configured')
    return null
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'ip-geo-location.p.rapidapi.com',
      },
    })

    if (!response.ok) throw new Error('Failed to fetch location')

    const data = await response.json()
    console.log('User location data:', data)

    return {
      timezone: data.time?.timezone || 'UTC',
      longitude: data.location?.longitude || 0,
      latitude: data.location?.latitude || 0,
    }
  } catch (error) {
    console.error('Error fetching geolocation:', error)
    return null
  }
}

const calculateSunriseSunset = (date: Date = new Date()) => {
  // Simplified calculation (in a real app, you'd use a proper astronomical library)
  // For demo purposes, we'll use approximate times based on season

  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
  const seasonOffset = Math.sin((dayOfYear / 365) * 2 * Math.PI)

  const baseSunrise = 6 + seasonOffset * 2 // ~4-8 AM
  const baseSunset = 18 + seasonOffset * 2  // ~16-20 PM

  const sunrise = new Date(date)
  sunrise.setHours(Math.floor(baseSunrise), 0, 0, 0)

  const sunset = new Date(date)
  sunset.setHours(Math.floor(baseSunset), 0, 0, 0)

  return { sunrise, sunset }
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('movieverse-theme-mode')
    return (saved as ThemeMode) || 'auto'
  })

  const [currentTheme, setCurrentTheme] = useState<'day' | 'night'>('day')
  const [sunriseTime, setSunriseTime] = useState<Date | null>(null)
  const [sunsetTime, setSunsetTime] = useState<Date | null>(null)

  // Calculate and update theme based on time/location
  useEffect(() => {
    const updateTheme = async () => {
      const now = new Date()

      if (themeMode === 'auto') {
        const location = await fetchUserLocation()
        if (location) {
          const { sunrise, sunset } = calculateSunriseSunset(now)
          setSunriseTime(sunrise)
          setSunsetTime(sunset)

          const isDay = now >= sunrise && now <= sunset
          setCurrentTheme(isDay ? 'day' : 'night')
        } else {
          // Fallback to default times if location unavailable
          const defaultSunrise = new Date(now)
          defaultSunrise.setHours(6, 0, 0, 0)
          const defaultSunset = new Date(now)
          defaultSunset.setHours(18, 0, 0, 0)

          setSunriseTime(defaultSunrise)
          setSunsetTime(defaultSunset)

          const isDay = now >= defaultSunrise && now <= defaultSunset
          setCurrentTheme(isDay ? 'day' : 'night')
        }
      } else {
        setCurrentTheme(themeMode)
      }
    }

    updateTheme()

    // Update theme every minute when in auto mode
    const interval = themeMode === 'auto' ? setInterval(updateTheme, 60000) : undefined

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [themeMode])

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('movieverse-theme-mode', themeMode)
  }, [themeMode])

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'day' ? 'night' : 'day')
  }

  const value: ThemeContextValue = {
    themeMode,
    currentTheme,
    sunriseTime,
    sunsetTime,
    setThemeMode,
    isAutoMode: themeMode === 'auto',
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
