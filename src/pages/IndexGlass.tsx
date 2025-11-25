import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import FeaturedMovies from "../components/FeaturedMovies";
import CTASection from "../components/CTASection";
import Footer from "../components/FooterNew";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
// ...existing code...
import { tmdbApi } from "../services/tmdbApi";

// Movie interface for multiple sections
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

const IndexGlass = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch different movie categories
        const [trending, popular, topRated] = await Promise.all([
          tmdbApi.getPopularMovies(), // Using popular as trending proxy
          tmdbApi.getPopularMovies(),
          tmdbApi.getTopRatedMovies(),
        ]);

        setTrendingMovies(trending.slice(0, 12));
        setPopularMovies(popular.slice(12, 24)); // Different slice for variety
        setTopRatedMovies(topRated.slice(0, 12));
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    // Rely on global landing gradient for consistent background; use full-bleed gradient
    <div
      className="min-h-screen"
      style={{ background: "var(--landing-gradient)" }}
    >
      {/* Restore navbar on landing page (hamburger hidden) */}
      <Navbar
        isSidebarOpen={false}
        onSidebarToggle={() => {}}
        hideHamburger={true}
      />
      <Hero />
      <FeaturedMovies />

      {/* Trending Now Section */}
      <section className="py-16 relative section-transition">
        <div className="w-full px-6 relative z-10 max-w-none">
          <div className="text-center mb-12">
            <div className="p-6 border-2 border-[var(--accent)]/30 bg-[var(--accent)]/10 backdrop-blur-[24px] w-full card-glass">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white animate-fade-in">
                Trending Now
              </h2>
              <p className="text-[var(--accent)] text-base w-full leading-relaxed">
                The hottest movies everyone's talking about
              </p>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto scrollbar-hide w-full">
            <div className="flex space-x-6 pb-4">
              {trendingMovies.map((movie, index) => (
                <div
                  key={`trending-${movie.id}`}
                  className="animate-scale-in flex-shrink-0 w-48"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Movies Section */}
      <section className="py-16 relative section-transition">
        <div className="w-full px-6 relative z-10 max-w-none">
          <div className="text-center mb-12">
            <div className="p-6 border-2 border-[var(--accent)]/30 bg-[var(--accent)]/10 backdrop-blur-[24px] w-full card-glass">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white animate-fade-in">
                Popular Movies
              </h2>
              <p className="text-[var(--accent)] text-base w-full leading-relaxed">
                The most beloved films of all time
              </p>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto scrollbar-hide w-full">
            <div className="flex space-x-6 pb-4">
              {popularMovies.map((movie, index) => (
                <div
                  key={`popular-${movie.id}`}
                  className="animate-scale-in flex-shrink-0 w-48"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Movies Section */}
      <section className="py-16 relative section-transition">
        <div className="w-full px-6 relative z-10 max-w-none">
          <div className="text-center mb-12">
            <div className="p-6 border-2 border-[var(--accent)]/30 bg-[var(--accent)]/10 backdrop-blur-[24px] w-full card-glass">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white animate-fade-in">
                Top Rated Movies
              </h2>
              <p className="text-green-300 text-base max-w-xl mx-auto leading-relaxed">
                Critically acclaimed masterpieces
              </p>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto scrollbar-hide w-full">
            <div className="flex space-x-6 pb-4">
              {topRatedMovies.map((movie, index) => (
                <div
                  key={`toprated-${movie.id}`}
                  className="animate-scale-in flex-shrink-0 w-48"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default IndexGlass;
