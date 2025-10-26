import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedMovies from "../components/FeaturedMovies";
import CTASection from "../components/CTASection";
import Footer from "../components/FooterNew";
import MovieCard from "../components/MovieCard";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
          tmdbApi.getTopRatedMovies()
        ]);

        setTrendingMovies(trending.slice(0, 12));
        setPopularMovies(popular.slice(12, 24)); // Different slice for variety
        setTopRatedMovies(topRated.slice(0, 12));
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 via-gray-800/20 to-black">
      <Navbar />
      <Hero />
      <FeaturedMovies />

      {/* Trending Now Section */}
      <section className="py-16 relative rounded-2xl mx-4 md:mx-8 section-transition">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="p-6 border-2 border-red-500/30 bg-red-500/10 backdrop-blur-sm rounded-xl max-w-3xl mx-auto card-glass">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white animate-fade-in">
                Trending Now
              </h2>
              <p className="text-red-300 text-base max-w-xl mx-auto leading-relaxed">
                The hottest movies everyone's talking about
              </p>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto scrollbar-hide">
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
      <section className="py-16 relative rounded-2xl mx-4 md:mx-8 section-transition">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="p-6 border-2 border-yellow-500/30 bg-yellow-500/10 backdrop-blur-sm rounded-xl max-w-3xl mx-auto card-glass">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white animate-fade-in">
                Popular Movies
              </h2>
              <p className="text-yellow-300 text-base max-w-xl mx-auto leading-relaxed">
                The most beloved films of all time
              </p>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto scrollbar-hide">
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
      <section className="py-16 relative rounded-2xl mx-4 md:mx-8 section-transition">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="p-6 border-2 border-green-500/30 bg-green-500/10 backdrop-blur-sm rounded-xl max-w-3xl mx-auto card-glass">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white animate-fade-in">
                Top Rated Movies
              </h2>
              <p className="text-green-300 text-base max-w-xl mx-auto leading-relaxed">
                Critically acclaimed masterpieces
              </p>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto scrollbar-hide">
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
