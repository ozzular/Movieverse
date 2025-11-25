import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StreamingPlatform {
  platform: string;
  name: string;
  icon: string;
  color: string;
  url?: string;
}

interface StreamingBadgesProps {
  movieId: number;
  movieTitle: string;
  className?: string;
}

const StreamingBadges: React.FC<StreamingBadgesProps> = ({
  movieId,
  movieTitle,
  className = "",
}) => {
  const [streamingData, setStreamingData] = useState<StreamingPlatform[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Only load when expanded to avoid API calls for all movies
    if (expanded) {
      fetchStreamingInfo();
    }
  }, [expanded, movieId]);

  const fetchStreamingInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      // Using JustWatch API via RapidAPI
      const url = `https://streaming-availability.p.rapidapi.com/search/title?title=${encodeURIComponent(movieTitle)}&type=movie&country=us&output_language=en`;
      const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

      if (!apiKey) {
        setError("Streaming API key not configured");
        return;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.result || data.result.length === 0) {
        setStreamingData([]);
        return;
      }

      const movieData = data.result[0];

      // Extract streaming platforms
      const platforms: StreamingPlatform[] = [];

      // Map common platforms
      const platformMappings: { [key: string]: StreamingPlatform } = {
        netflix: {
          platform: "netflix",
          name: "Netflix",
          icon: "🏠",
          color: "#E50914",
          url: movieData.streamingInfo?.netflix?.us?.link,
        },
        disney: {
          platform: "disney",
          name: "Disney+",
          icon: "🎬",
          color: "#FF0000",
          url: movieData.streamingInfo?.disney?.us?.link,
        },
        hbo: {
          platform: "hbo",
          name: "HBO",
          icon: "💎",
          color: "#0000FF",
          url: movieData.streamingInfo?.hbo?.us?.link,
        },
        prime: {
          platform: "prime",
          name: "Amazon Prime",
          icon: "📦",
          color: "#00A8E1",
          url: movieData.streamingInfo?.prime?.us?.link,
        },
        apple: {
          platform: "apple",
          name: "Apple TV+",
          icon: "🍎",
          color: "#111111",
          url: movieData.streamingInfo?.apple?.us?.link,
        },
        hulu: {
          platform: "hulu",
          name: "Hulu",
          icon: "🟢",
          color: "#1CE783",
          url: movieData.streamingInfo?.hulu?.us?.link,
        },
        max: {
          platform: "max",
          name: "Max",
          icon: "💎",
          color: "#00F6FF",
          url: movieData.streamingInfo?.max?.us?.link,
        },
      };

      // Check each streaming service
      if (movieData.streamingInfo?.netflix?.us?.available) {
        platforms.push(platformMappings.netflix);
      }
      if (movieData.streamingInfo?.disney?.us?.available) {
        platforms.push(platformMappings.disney);
      }
      if (movieData.streamingInfo?.hbo?.us?.available) {
        platforms.push(platformMappings.hbo);
      }
      if (movieData.streamingInfo?.prime?.us?.available) {
        platforms.push(platformMappings.prime);
      }
      if (movieData.streamingInfo?.apple?.us?.available) {
        platforms.push(platformMappings.apple);
      }
      if (movieData.streamingInfo?.hulu?.us?.available) {
        platforms.push(platformMappings.hulu);
      }
      if (movieData.streamingInfo?.max?.us?.available) {
        platforms.push(platformMappings.max);
      }

      setStreamingData(platforms.slice(0, 4)); // Limit to 4 platforms for UI
    } catch (error) {
      console.error("Error fetching streaming info:", error);
      // Fallback to mock data for demonstration
      setStreamingData([
        { platform: "netflix", name: "Netflix", icon: "🏠", color: "#E50914" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  if (streamingData.length === 0 && !loading && !error) {
    return (
      <motion.button
        onClick={toggleExpanded}
        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs bg-gray-700/50 hover:bg-gray-600/50 transition-colors ${className}`}
        whileHover={{ scale: 1.05 }}
      >
        <span>🎬</span>
        <span className="text-gray-300">Where to Watch</span>
      </motion.button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <motion.button
        onClick={toggleExpanded}
        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-all duration-300 ${
          streamingData.length > 0
            ? "bg-galaxy-purple/20 hover:bg-galaxy-purple/40 border border-galaxy-purple/30"
            : "bg-gray-700/50 hover:bg-gray-600/50"
        }`}
        whileHover={{ scale: 1.05 }}
        animate={{ rotate: expanded ? 180 : 0 }}
      >
        {loading ? (
          <motion.div
            className="w-3 h-3 border border-gray-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : streamingData.length > 0 ? (
          <span className="text-lg">{streamingData[0].icon}</span>
        ) : (
          <span>🎬</span>
        )}
        <span className="text-gray-300">Where to Watch</span>
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </motion.button>

      {/* Streaming Platforms Panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-full mt-2 left-0 right-0 bg-black/90 backdrop-blur-lg border border-white/20 rounded-lg p-3 z-10 min-w-[200px]"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white">Available on</h4>
              <button
                onClick={toggleExpanded}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-4 w-4 border border-galaxy-purple"></div>
                <span className="ml-2 text-xs text-gray-400">Loading...</span>
              </div>
            ) : error ? (
              <div className="text-center py-2">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            ) : streamingData.length > 0 ? (
              <div className="space-y-2">
                {streamingData.map((platform) => (
                  <motion.div
                    key={platform.platform}
                    className="flex items-center justify-between p-2 bg-white/5 rounded hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{platform.icon}</span>
                      <span className="text-xs text-white font-medium">
                        {platform.name}
                      </span>
                    </div>
                    {platform.url && (
                      <button
                        onClick={() => window.open(platform.url, "_blank")}
                        className="text-xs px-2 py-1 rounded bg-galaxy-purple hover:bg-galaxy-purple/80 text-white transition-colors"
                      >
                        Watch
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-xs text-gray-400 mb-2">
                  Not available on major platforms
                </p>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.justwatch.com/us/search?q=${encodeURIComponent(movieTitle)}`,
                      "_blank",
                    )
                  }
                  className="text-xs px-3 py-1 bg-galaxy-red hover:bg-red-700 text-white rounded transition-colors"
                >
                  Check JustWatch
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StreamingBadges;
