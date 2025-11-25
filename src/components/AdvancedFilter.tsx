import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGenres } from "../contexts/GenreContext";
import { useFilters } from "../contexts/FilterContext";

interface AdvancedFilterProps {
  className?: string;
}

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ className = "" }) => {
  const { genres, selectedGenres, toggleGenre, clearFilters, isLoading } =
    useGenres();
  const { filters, toggleRegion, clearAllFilters } = useFilters();
  const [activeFilter, setActiveFilter] = useState<
    "genres" | "dates" | "regions" | null
  >(null);

  const filterCategories = [
    {
      id: "genres",
      label: "Genres",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 010 2h-1v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 010-2h4z"
          />
        </svg>
      ),
      count: selectedGenres.length,
    },
    {
      id: "dates",
      label: "Release Year",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      count: filters.releaseYearRange ? 1 : 0,
    },
    {
      id: "regions",
      label: "Regions",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      count: filters.regions.length,
    },
  ];

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-12 bg-galaxy-gray rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Category Buttons - Improved responsive layout */}
      <div className="flex flex-wrap gap-3">
        {filterCategories.map((category) => (
          <div key={category.id} className="relative">
            <button
              onClick={() =>
                setActiveFilter(
                  activeFilter === category.id ? null : (category.id as any),
                )
              }
              className={`
                flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 glassmorphism
                ${
                  activeFilter === category.id
                    ? "bg-galaxy-purple text-white border-galaxy-purple"
                    : "bg-white/5 text-gray-300 hover:text-white hover:bg-galaxy-purple/20 border-white/10"
                }
              `}
            >
              {category.icon}
              <span className="font-medium">{category.label}</span>
              {category.count > 0 && (
                <span className="bg-galaxy-red text-white text-xs rounded-full px-2 py-1 min-w-[1.5rem] text-center">
                  {category.count}
                </span>
              )}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${activeFilter === category.id ? "rotate-180" : ""}`}
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
            </button>
          </div>
        ))}

        {/* Clear All Button - Enhanced styling */}
        {(selectedGenres.length > 0 ||
          filters.regions.length > 0 ||
          filters.releaseYearRange) && (
          <button
            onClick={clearAllFilters}
            className="px-4 py-3 bg-galaxy-red/20 text-galaxy-red hover:bg-galaxy-red hover:text-white rounded-lg transition-all duration-300 glassmorphism border border-galaxy-red/20 hover:border-galaxy-red"
          >
            <svg
              className="w-4 h-4 mr-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear All
          </button>
        )}
      </div>

      {/* Active Filters Display - Enhanced layout */}
      {selectedGenres.length > 0 && (
        <div className="space-y-3">
          <span className="text-sm text-gray-400 font-medium">
            Active genre filters:
          </span>
          <div className="flex flex-wrap gap-2">
            {genres
              .filter((genre) => selectedGenres.includes(genre.id))
              .map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-2 bg-galaxy-purple/20 text-galaxy-purple text-sm rounded-full flex items-center space-x-2 glassmorphism border border-galaxy-purple/30"
                >
                  <span>{genre.name}</span>
                  <button
                    onClick={() => toggleGenre(genre.id)}
                    className="hover:text-white transition-colors p-1 rounded-full hover:bg-galaxy-purple/20"
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Genre Filter Panel - Enhanced grid layout */}
      {activeFilter === "genres" && (
        <div className="p-6 bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">
            Select Genres
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 max-h-80 overflow-y-auto">
            {genres.map((genre) => (
              <Link
                key={genre.id}
                to={`/genre/${genre.id}`}
                className={`block p-3 text-sm rounded-lg transition-all duration-300 text-center glassmorphism hover:scale-105 ${
                  selectedGenres.includes(genre.id)
                    ? "bg-galaxy-purple text-white border-galaxy-purple"
                    : "bg-white/5 text-gray-300 hover:text-white hover:bg-galaxy-purple/20 border-white/10 hover:border-galaxy-purple/30"
                }`}
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Release Year Filter Panel - Enhanced layout */}
      {activeFilter === "dates" && (
        <div className="p-6 bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">
            Select Release Year
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { label: "2024", range: "2024-2024" },
              { label: "2020-2023", range: "2020-2023" },
              { label: "2010-2019", range: "2010-2019" },
              { label: "2000-2009", range: "2000-2009" },
              { label: "1990-1999", range: "1990-1999" },
              { label: "Before 1990", range: "1900-1989" },
            ].map((period) => (
              <button
                key={period.label}
                className="p-3 text-sm rounded-lg transition-all duration-300 text-center glassmorphism hover:scale-105 bg-white/5 text-gray-300 hover:text-white hover:bg-galaxy-purple/20 border border-white/10 hover:border-galaxy-purple/30"
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Regions Filter Panel - Enhanced grid layout */}
      {activeFilter === "regions" && (
        <div className="p-6 bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">
            Select Regions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              "Hollywood",
              "Bollywood",
              "Europe",
              "Asia",
              "Latin America",
              "Africa",
            ].map((region) => (
              <button
                key={region}
                onClick={() => toggleRegion(region)}
                className={`p-3 text-sm rounded-lg transition-all duration-300 text-center glassmorphism hover:scale-105 ${
                  filters.regions.includes(region)
                    ? "bg-galaxy-purple text-white border-galaxy-purple"
                    : "bg-white/5 text-gray-300 hover:text-white hover:bg-galaxy-purple/20 border-white/10 hover:border-galaxy-purple/30"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilter;
