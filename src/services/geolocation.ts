// Geolocation service for regional movie recommendations

interface LocationData {
  country: string
  region: string
  city: string
  timezone: string
  flag?: string
}

interface RegionalContent {
  trending: any[]
  popular: any[]
  topRated: any[]
  region: string
  countryName: string
}

// Primary geolocation API using ipapi.co (free tier)
export const getUserLocation = async (): Promise<LocationData | null> => {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch location')
    }

    const data = await response.json()

    return {
      country: data.country_name || 'Unknown',
      region: data.country_code || 'US',
      city: data.city || 'Unknown City',
      timezone: data.timezone || 'UTC',
      flag: data.country_calling_code ? getCountryFlag(data.country_code) : undefined
    }
  } catch (error) {
    console.error('Geolocation API failed:', error)
    return getFallbackLocation()
  }
}

// Fallback location service using ipify + different API
export const getFallbackLocation = async (): Promise<LocationData | null> => {
  try {
    // Try alternate free API
    const response = await fetch('http://ip-api.com/json/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error('Fallback geolocation failed')
    }

    const data = await response.json()

    return {
      country: data.country || 'United States',
      region: data.countryCode || 'US',
      city: data.city || 'Unknown City',
      timezone: data.timezone || 'UTC',
      flag: data.countryCode ? getCountryFlag(data.countryCode) : undefined
    }
  } catch (error) {
    console.error('Fallback geolocation failed:', error)
    return {
      country: 'United States',
      region: 'US',
      city: 'New York',
      timezone: 'America/New_York'
    }
  }
}

// Get regional trending movies based on country
export const getRegionalTrending = async (
  countryCode: string = 'US',
  limit: number = 12
): Promise<any[]> => {
  try {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY

    if (!API_KEY) {
      throw new Error('TMDB API key not configured')
    }

    // Use TMDB's region parameter for regional content
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&region=${countryCode}&page=1`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    )

    if (!response.ok) {
      throw new Error('TMDB API request failed')
    }

    const data = await response.json()
    return data.results?.slice(0, limit) || []
  } catch (error) {
    console.error('Regional trending failed:', error)
    // Return global trending as fallback
    return []
  }
}

// Get regional content based on location
export const getRegionalContent = async (
  countryCode: string = 'US'
): Promise<RegionalContent> => {
  try {
    const [trending, popular, topRated] = await Promise.all([
      getRegionalTrending(countryCode, 8),
      fetchRegionalMovies('popular', countryCode),
      fetchRegionalMovies('top_rated', countryCode)
    ])

    const countryName = getCountryName(countryCode)

    return {
      trending: trending.slice(0, 8),
      popular: popular.slice(0, 12),
      topRated: topRated.slice(0, 12),
      region: countryCode,
      countryName
    }
  } catch (error) {
    console.error('Failed to get regional content:', error)
    return {
      trending: [],
      popular: [],
      topRated: [],
      region: countryCode,
      countryName: getCountryName(countryCode)
    }
  }
}

// Helper function to fetch movies with region
export const fetchRegionalMovies = async (
  category: string = 'popular',
  region: string = 'US',
  limit: number = 12
): Promise<any[]> => {
  try {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY

    if (!API_KEY) {
      throw new Error('TMDB API key not configured')
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&region=${region}&page=1`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch ${category} movies`)
    }

    const data = await response.json()
    return data.results?.slice(0, limit) || []
  } catch (error) {
    console.error(`Failed to fetch ${category} movies:`, error)
    return []
  }
}

// Country code to name mapping
export const getCountryName = (countryCode: string): string => {
  const countryMap: { [key: string]: string } = {
    'US': 'United States',
    'GB': 'United Kingdom',
    'CA': 'Canada',
    'AU': 'Australia',
    'DE': 'Germany',
    'FR': 'France',
    'JP': 'Japan',
    'KR': 'South Korea',
    'IN': 'India',
    'BR': 'Brazil',
    'MX': 'Mexico',
    'ES': 'Spain',
    'IT': 'Italy',
    'RU': 'Russia',
    'CN': 'China',
    'ZA': 'South Africa',
    'NG': 'Nigeria',
    'EG': 'Egypt',
    'KE': 'Kenya'
  }

  return countryMap[countryCode] || 'Unknown Country'
}

// Get country flag emoji (simplified, works for most countries)
export const getCountryFlag = (countryCode: string): string => {
  try {
    // Convert country code to flag emoji
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0))

    return String.fromCodePoint(...codePoints)
  } catch (error) {
    return '🌍' // Default globe emoji
  }
}

// Validate country code
export const isValidCountryCode = (countryCode: string): boolean => {
  return countryCode.length === 2 && /^[A-Z]{2}$/.test(countryCode.toUpperCase())
}

// Available regions for user selection
export const getAvailableRegions = () => {
  return [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' },
    { code: 'IN', name: 'India' },
    { code: 'BR', name: 'Brazil' },
    { code: 'MX', name: 'Mexico' },
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' }
  ]
}
