import React, { createContext, useContext, useState, useEffect } from "react";
import { tmdbApi } from "../services/tmdbApi";
import { getCountryName, getUserLocation } from "../services/geolocation";
import GeolocationModal from "../components/GeolocationModal";

interface RegionalContent {
  trending: any[];
  popular: any[];
  topRated: any[];
  region: string;
  countryName: string;
}

interface RegionContextValue {
  regionalContent: RegionalContent | null;
  userLocation: {
    country: string;
    region: string;
    city: string;
    timezone: string;
    isLagosNigeria?: boolean;
  } | null;
  isLoading: boolean;
  refreshContent: () => Promise<void>;
  showLocationModal: boolean;
  setShowLocationModal: (show: boolean) => void;
  // selectedRegion stores both code and full country name
  selectedRegion: { code: string; name: string };
  setSelectedRegion: (region: { code: string; name: string } | string) => void;
  restoreAuto: () => Promise<void>;
}

const RegionContext = createContext<RegionContextValue | undefined>(undefined);

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within RegionProvider");
  }
  return context;
};

const getTMDBRegionCode = (country: string): string => {
  const regionMap: { [key: string]: string } = {
    "United States": "US",
    "United Kingdom": "GB",
    Canada: "CA",
    Australia: "AU",
    Germany: "DE",
    France: "FR",
    Japan: "JP",
    "South Korea": "KR",
    India: "IN",
    Brazil: "BR",
    Mexico: "MX",
    Argentina: "AR",
    Spain: "ES",
    Italy: "IT",
    Russia: "RU",
    China: "CN",
    "South Africa": "ZA",
    Nigeria: "NG",
    Egypt: "EG",
    Kenya: "KE",
  };
  return regionMap[country] || "US";
};

const fetchUserLocation = async () => {
  // Use enhanced geolocation service with Lagos detection
  const location = await getUserLocation();
  if (location) {
    console.log("🎯 Enhanced location detected:", location);
    return {
      country: location.country,
      region: location.region,
      city: location.city,
      timezone: location.timezone,
      isLagosNigeria: location.isLagosNigeria || false,
    };
  }
  return null;
};

interface RegionProviderProps {
  children: React.ReactNode;
}

export const RegionProvider: React.FC<RegionProviderProps> = ({ children }) => {
  const [regionalContent, setRegionalContent] =
    useState<RegionalContent | null>(null);
  const [userLocation, setUserLocation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationPermission, setLocationPermission] = useState<
    "granted" | "denied" | "unknown"
  >("unknown");
  const [selectedRegion, setSelectedRegion] = useState<{
    code: string;
    name: string;
  }>(() => {
    // Persisted user override may be stored as JSON {code,name} or just code
    const stored = localStorage.getItem("movieverse-region");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.code && parsed.name) return parsed;
        // fallthrough if parsed is not the expected shape
      } catch {
        // stored is not JSON, treat as code
        return { code: stored, name: getCountryName(stored) };
      }
    }
    return { code: "US", name: "United States" };
  });

  const fetchRegionalContent = async (region: string) => {
    try {
      // Enhanced location-aware content fetching
      const [trending, popular, topRated] = await Promise.all([
        tmdbApi.getTrendingMovies(region, userLocation), // Pass user location for Lagos detection
        tmdbApi.getPopularMovies(region),
        tmdbApi.getTopRatedMovies(region),
      ]);

      return {
        trending,
        popular,
        topRated,
        region,
      };
    } catch (error) {
      console.error("Error fetching regional content:", error);
      return {
        trending: await tmdbApi.getTrendingMovies("US", userLocation), // Fallback to global trending with location context
        popular: await tmdbApi.getPopularMovies("US"),
        topRated: await tmdbApi.getTopRatedMovies("US"),
        region: "US",
      };
    }
  };

  const loadUserLocationAndContent = async (forceLocationRequest = false) => {
    try {
      setIsLoading(true);

      // Check if user has already responded to location permission
      const locationPreference = localStorage.getItem(
        "movieverse-location-permission",
      );

      if (locationPreference === "denied" && !forceLocationRequest) {
        // User previously denied location, use global content
        const defaultContent = await fetchRegionalContent("US");
        setRegionalContent({
          ...defaultContent,
          countryName: "United States",
        });
        setUserLocation({
          country: "United States",
          region: "US",
          city: "Unknown",
          timezone: "UTC",
          isLagosNigeria: false,
        });
        return;
      }

      if (locationPreference === "granted" || forceLocationRequest) {
        // User granted permission, fetch location
        const location = await fetchUserLocation();
        if (location) {
          setUserLocation(location);
          const tmdbRegionCode = getTMDBRegionCode(location.country);
          // If user has selected a region override, prefer that
          const stored = localStorage.getItem("movieverse-region");
          let regionToUse = tmdbRegionCode;
          let regionName = location.country;
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              if (parsed && parsed.code) {
                regionToUse = parsed.code;
                regionName = parsed.name || regionName;
              } else {
                // stored might be plain code string
                regionToUse = stored;
                regionName = getCountryName(stored);
              }
            } catch {
              regionToUse = stored;
              regionName = getCountryName(stored);
            }
          }
          setSelectedRegion({ code: regionToUse, name: regionName });
          const content = await fetchRegionalContent(regionToUse);

          setRegionalContent({
            ...content,
            countryName: regionName,
          });
          setLocationPermission("granted");
        } else {
          // Location fetch failed, fallback to global
          const defaultContent = await fetchRegionalContent("US");
          setRegionalContent({
            ...defaultContent,
            countryName: "United States",
          });
          setUserLocation({
            country: "United States",
            region: "US",
            city: "Unknown",
            timezone: "UTC",
            isLagosNigeria: false,
          });
        }
      } else {
        // First time or unknown preference, show modal
        setShowLocationModal(true);
      }
    } catch (error) {
      console.error("Error loading regional data:", error);
      const defaultContent = await fetchRegionalContent("US");
      setRegionalContent({
        ...defaultContent,
        countryName: "United States",
      });
      setUserLocation({
        country: "United States",
        region: "US",
        city: "Unknown",
        timezone: "UTC",
        isLagosNigeria: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationAllow = async () => {
    setShowLocationModal(false);
    localStorage.setItem("movieverse-location-permission", "granted");
    await loadUserLocationAndContent(true);
  };

  const handleLocationDeny = async () => {
    setShowLocationModal(false);
    localStorage.setItem("movieverse-location-permission", "denied");
    await loadUserLocationAndContent(false);
  };

  const refreshContent = async () => {
    const regionToUse =
      selectedRegion?.code ||
      (userLocation ? getTMDBRegionCode(userLocation.country) : "US");
    const [trending, popular, topRated] = await Promise.all([
      tmdbApi.getTrendingMovies(regionToUse, userLocation),
      tmdbApi.getPopularMovies(regionToUse),
      tmdbApi.getTopRatedMovies(regionToUse),
    ]);
    setRegionalContent({
      trending,
      popular,
      topRated,
      region: regionToUse,
      countryName: userLocation?.country || getCountryName(regionToUse),
    });
  };

  const handleSetSelectedRegion = async (
    region: string | { code: string; name: string },
  ) => {
    let code: string;
    let name: string;
    if (typeof region === "string") {
      code = region;
      name = getCountryName(code);
    } else {
      code = region.code;
      name = region.name;
    }
    setSelectedRegion({ code, name });
    localStorage.setItem("movieverse-region", JSON.stringify({ code, name }));
    // Track analytics
    try {
      const key = "movieverse-region-usage";
      const raw = localStorage.getItem(key);
      const counts = raw ? (JSON.parse(raw) as Record<string, number>) : {};
      counts[code] = (counts[code] || 0) + 1;
      localStorage.setItem(key, JSON.stringify(counts));
    } catch {}
    const content = await fetchRegionalContent(code);
    setRegionalContent({
      ...content,
      countryName: name,
    });
  };

  const restoreAuto = async () => {
    localStorage.removeItem("movieverse-region");
    await loadUserLocationAndContent(true);
  };

  useEffect(() => {
    loadUserLocationAndContent();
  }, []);

  const value: RegionContextValue = {
    regionalContent,
    userLocation,
    isLoading,
    refreshContent,
    showLocationModal,
    setShowLocationModal,
    selectedRegion,
    setSelectedRegion: handleSetSelectedRegion,
    restoreAuto,
  };

  return (
    <RegionContext.Provider value={value}>
      {children}
      <GeolocationModal
        isOpen={showLocationModal}
        onAllow={handleLocationAllow}
        onDeny={handleLocationDeny}
      />
    </RegionContext.Provider>
  );
};
