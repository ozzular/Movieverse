import { useState, useEffect } from "react";
import HeroCarousel from "./HeroCarousel";
import { tmdbApi } from "../services/tmdbApi";

// Define Movie interface locally to avoid import issues
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

const Hero = () => {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        setIsLoading(true);
        // Get trending movies for the carousel
        const trendingMovies = await tmdbApi.getTrendingMovies();
        // Limit to 5 movies for carousel
        setFeaturedMovies(trendingMovies.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch featured movies:", error);
        // Fallback to empty array - carousel will show loading state
        setFeaturedMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  return (
    <div className="relative w-full min-h-screen -mt-[var(--nav-height)]">
      <div className="absolute inset-0">
        {/* Top gradient overlay for navbar */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent h-[120px]"></div>
        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-gradient-start)]"></div>
      </div>
      <HeroCarousel movies={featuredMovies} />
      {/* Content wrapper - ensures content is below navbar */}
      <div className="absolute inset-0 flex items-end pt-[var(--nav-height)]">
        <div className="w-full px-4 md:px-6 pb-12 md:pb-16">
          {/* Hero content goes here */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
