import { useEffect, useState } from "react";
import { getRegionalContent } from "../services/geolocation";
import { useNavigate } from "react-router-dom";
import { useRegion } from "../contexts/RegionContext";
import { tmdbApi } from "../services/tmdbApi";

export const RegionalTrending = () => {
  const { selectedRegion } = useRegion();
  const [movies, setMovies] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const regionCode = selectedRegion?.code || "US";
        const content = await getRegionalContent(regionCode);
        // Use trending content instead of popular for "Trending in Region"
        setMovies(content.trending || []);
      } catch (err) {
        console.error("Regional content error:", err);
        // Fallback to empty array instead of global content
        setMovies([]);
      }
    })();
  }, [selectedRegion.code]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">
          Trending in {selectedRegion?.name}
        </h2>
        <span className="text-sm text-muted-foreground">
          ({selectedRegion?.code})
        </span>
      </div>

      <div className="overflow-hidden">
          <div className="flex items-center gap-2 py-2 px-4">
            {/* Region-specific provider filter chips */}
            {[
              "Netflix",
              "Amazon Prime Video",
              "Disney Plus",
              "Hulu",
              "Apple TV Plus",
              "HBO Max",
            ].map((p) => (
              <button
                key={p}
                onClick={async () => {
                  try {
                    const provMovies = await tmdbApi.getMoviesByProvider(
                      p,
                      selectedRegion?.code,
                    );
                    // Filter by region and only show region-appropriate content
                    setMovies(provMovies || []);
                  } catch (e) {
                    console.error("Provider filter failed", e);
                    setMovies([]);
                  }
                }}
                className="text-sm px-3 py-1 rounded-full bg-secondary/40 hover:bg-secondary/60"
              >
                {p}
              </button>
            ))}
          </div>
        <div className="flex gap-4 py-4 px-4 overflow-x-auto scrollbar-hide">
          {movies.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No regional items found.
            </p>
          )}
          {movies.map((m) => (
            <button
              key={m.id}
              onClick={() => navigate(`/movie/${m.id}`)}
              className="flex-[0_0_200px] cursor-pointer group/item"
            >
              <div className="relative rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95">
                <img
                  src={
                    m.poster_path
                      ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                      : "/movie-1.jpg"
                  }
                  alt={m.title || m.name}
                  loading="lazy"
                  className="w-full h-[300px] object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/movie-1.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-all duration-300">
                  <p className="text-sm font-semibold line-clamp-2 mb-1">
                    {m.title || m.name}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
