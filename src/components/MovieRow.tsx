import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import useEmblaCarousel from "embla-carousel-react";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
}

interface MovieRowProps {
  title: string;
  endpoint: string;
}

export const MovieRow = ({ title, endpoint }: MovieRowProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, [endpoint]);

  const fetchMovies = async (pageNum: number = 1) => {
    if (isLoading || (!hasMore && pageNum > 1)) return;

    setIsLoading(true);
    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      if (!apiKey) {
        console.error("TMDB API key is not configured");
        return;
      }

      const sep = endpoint.includes("?") ? "&" : "?";
      const response = await fetch(
        `https://api.themoviedb.org/3/${endpoint}${sep}api_key=${apiKey}&page=${pageNum}`,
      );
      const data = await response.json();

      if (pageNum === 1) {
        setMovies(data.results || []);
      } else {
        setMovies((prev) => [...prev, ...(data.results || [])]);
      }

      setHasMore(pageNum < data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
      if (pageNum === 1) setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies(page);
    }
  }, [page]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleMovieClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="relative group mb-8 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 px-4">{title}</h2>

      <div className="relative">
        {canScrollPrev && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 text-black opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
            onClick={scrollPrev}
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
        )}

        <div className="overflow-x-hidden overflow-y-visible" ref={emblaRef}>
          <div className="flex gap-4 px-4">
            {movies?.map((movie) => (
              <div
                key={movie.id}
                className="flex-[0_0_200px] cursor-pointer group/item"
                onClick={() => handleMovieClick(movie.id)}
              >
                <div className="relative rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    loading="lazy"
                    className="w-full h-[300px] object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/movie-1.jpg"; // fallback to a generic placeholder
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-all duration-300">
                    <p className="text-sm font-semibold line-clamp-2 mb-1">
                      {movie.title || movie.name}
                    </p>
                    <p className="text-xs text-primary font-medium">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <>
                {[...Array(5)].map((_, i) => (
                  <div key={`skeleton-${i}`} className="flex-[0_0_200px]">
                    <Skeleton className="w-full h-[300px] rounded-lg" />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {canScrollNext && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 text-black opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
            onClick={scrollNext}
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        )}
      </div>
    </div>
  );
};
