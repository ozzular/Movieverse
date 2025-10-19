import React, { createContext, useContext, useState, useEffect } from 'react'
import { tmdbApi } from '../services/tmdbApi'

interface RegionalContent {
  trending: any[]
  popular: any[]
  topRated: any[]
  region: string
  countryName: string
}

interface RegionContextValue {
  regionalContent: RegionalContent | null
  userLocation: {
    country: string
    region: string
    city: string
    timezone: string
  } | null
  isLoading: boolean
  refreshContent: () => Promise<void>
}

const RegionContext = createContext<RegionContextValue | undefined>(undefined)

export const useRegion = () => {
  const context = useContext(RegionContext)
  if (!context) {
    throw new Error('useRegion must be used within RegionProvider')
  }
  return context
}

const getTMDBRegionCode = (country: string): string => {
  const regionMap: { [key: string]: string } = {
    'United States': 'US',
    'United Kingdom': 'GB',
    'Canada': 'CA',
    'Australia': 'AU',
    'Germany': 'DE',
    'France': 'FR',
    'Japan': 'JP',
    'South Korea': 'KR',
    'India': 'IN',
    'Brazil': 'BR',
    'Mexico': 'MX',
    'Argentina': 'AR',
    'Spain': 'ES',
    'Italy': 'IT',
    'Russia': 'RU',
    'China': 'CN',
    'South Africa': 'ZA',
    'Nigeria': 'NG',
    'Egypt': 'EG',
    'Kenya': 'KE'
  }
  return regionMap[country] || 'US'
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
      country: data.location?.country?.name || 'Unknown',
      region: data.location?.country?.code || 'US',
      city: data.location?.city?.name || 'Unknown City',
      timezone: data.time?.timezone || 'UTC'
    }
  } catch (error) {
    console.error('Error fetching geolocation:', error)
    return null
  }
}

interface RegionProviderProps {
  children: React.ReactNode
}

export const RegionProvider: React.FC<RegionProviderProps> = ({ children }) => {
  const [regionalContent, setRegionalContent] = useState<RegionalContent | null>(null)
  const [userLocation, setUserLocation] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchRegionalContent = async (region: string) => {
    try {
      const [trending, popular, topRated] = await Promise.all([
        tmdbApi.getTrendingMovies(),
        tmdbApi.getPopularMovies(),
        tmdbApi.getTopRatedMovies()
      ])

      return {
        trending,
        popular,
        topRated,
        region
      }
    } catch (error) {
      console.error('Error fetching regional content:', error)
      return {
        trending: await tmdbApi.getTrendingMovies(),
        popular: await tmdbApi.getPopularMovies(),
        topRated: await tmdbApi.getTopRatedMovies(),
        region: 'US'
      }
    }
  }

  const loadUserLocationAndContent = async () => {
    try {
      setIsLoading(true)
      const location = await fetchUserLocation()
      setUserLocation(location)

      const tmdbRegionCode = getTMDBRegionCode(location?.country || 'United States')
      const content = await fetchRegionalContent(tmdbRegionCode)

      setRegionalContent({
        ...content,
        countryName: location?.country || 'United States'
      })
    } catch (error) {
      console.error('Error loading regional data:', error)
      const defaultContent = await fetchRegionalContent('US')
      setRegionalContent({
        ...defaultContent,
        countryName: 'United States'
      })
      setUserLocation({ country: 'United States', region: 'US', city: 'Unknown', timezone: 'UTC' })
    } finally {
      setIsLoading(false)
    }
  }

  const refreshContent = async () => {
    if (userLocation) {
      const tmdbRegionCode = getTMDBRegionCode(userLocation.country)
      const content = await fetchRegionalContent(tmdbRegionCode)
      setRegionalContent({
        ...content,
        countryName: userLocation.country
      })
    }
  }

  useEffect(() => {
    loadUserLocationAndContent()
  }, [])

  const value: RegionContextValue = {
    regionalContent,
    userLocation,
    isLoading,
    refreshContent
  }

  return (
    <RegionContext.Provider value={value}>
      {children}
    </RegionContext.Provider>
  )
}
