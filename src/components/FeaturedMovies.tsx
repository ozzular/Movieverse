import { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tmdbApi } from "../services/tmdbApi";

// Define Movie interface locally to completely bypass import issues
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
}

const FeaturedMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        setIsLoading(true);
        // Get popular movies for the featured section
        const popularMovies = await tmdbApi.getPopularMovies();
        // Show 15 movies in horizontal carousel
        setMovies(popularMovies.slice(0, 15));
      } catch (error) {
        console.error("Failed to fetch featured movies:", error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 relative w-full">
        <div className="w-full px-24 relative z-10">
          <div className="text-center mb-12 p-6 border-2 border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-[24px] rounded-xl w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in text-white">
              Featured Movies
            </h2>
            <p className="text-[var(--text-secondary)] text-base w-full leading-relaxed">
              Discover our handpicked selection of popular movies
            </p>
          </div>

          {/* Carousel Container with Loading Skeletons */}
          <div className="relative">
            {/* Left Navigation Arrow */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm hover:bg-black/70 hover:scale-110 transition-transform text-white rounded-xl"
              disabled={true}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {/* Right Navigation Arrow */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm hover:bg-black/70 hover:scale-110 transition-transform text-white rounded-xl"
              disabled={true}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Carousel Scroll Container */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-6 p-4 min-w-max">
                {[...Array(15)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-[2/3] w-48 bg-gray-700 rounded-xl flex-shrink-0"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative w-full my-8">
      <div className="w-full px-24 relative z-10">
        <div className="text-center mb-12 p-6 border-2 border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-[24px] rounded-xl w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in text-white">
            Featured Movies
          </h2>
          <p className="text-[var(--text-secondary)] text-base w-full leading-relaxed">
            Discover our handpicked selection of popular movies
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Navigation Arrow */}
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm hover:bg-black/70 hover:scale-110 transition-transform text-white rounded-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          {/* Right Navigation Arrow */}
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm hover:bg-black/70 hover:scale-110 transition-transform text-white rounded-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Carousel Scroll Container */}
          <div
            ref={carouselRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex space-x-6 p-4 min-w-max">
              {movies.map((movie, index) => (
                <div
                  key={movie.id}
                  className="animate-scale-in flex-shrink-0 w-48"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovies;
