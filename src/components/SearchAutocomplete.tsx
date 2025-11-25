import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  media_type: string;
  vote_average: number;
}

const highlightMatch = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-primary/30 text-foreground font-semibold">
        {part}
      </mark>
    ) : (
      part
    ),
  );
};

export const SearchAutocomplete = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const debounceTimer = setTimeout(() => {
      searchMovies();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const searchMovies = async () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    if (!apiKey) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}&include_adult=false`,
      );
      const data = await response.json();
      setResults(data.results?.slice(0, 6) || []);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    const path =
      result.media_type === "person"
        ? `/actor/${result.id}`
        : `/movie/${result.id}`;
    navigate(path);
    setQuery("");
    setShowResults(false);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative flex-1 max-w-md" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search movies, series, actors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const q = query.trim();
              if (q) {
                navigate(`/search?q=${encodeURIComponent(q)}`);
                setShowResults(false);
                // keep query so user can edit on results page
              }
            }
          }}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          className="pl-10 pr-10 bg-secondary/50 border-border"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full glass-effect rounded-lg overflow-hidden z-50 backdrop-blur-xl animate-fade-in">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="w-full flex items-center gap-3 p-3 hover:bg-secondary/50 transition-all hover-lift active-press text-left"
            >
              <img
                src={
                  result.poster_path
                    ? `https://image.tmdb.org/t/p/w92${result.poster_path}`
                    : "/placeholder.svg"
                }
                alt={result.title || result.name}
                loading="lazy"
                className="w-12 h-16 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {highlightMatch(result.title || result.name || "", query)}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="capitalize">{result.media_type}</span>
                  {result.vote_average > 0 && (
                    <>
                      <span>•</span>
                      <span>⭐ {result.vote_average.toFixed(1)}</span>
                    </>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showResults && isLoading && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg p-4 text-center text-muted-foreground">
          Loading...
        </div>
      )}
    </div>
  );
};
