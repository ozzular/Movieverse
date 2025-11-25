import { HeroCarousel } from "@/components/HeroCarousel";
import { MovieRow } from "@/components/MovieRow";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroCarousel />

      <div className="py-8 space-y-8">
        <MovieRow title="Coming Soon" endpoint="movie/upcoming" />
        <MovieRow title="Trending Movies" endpoint="trending/movie/week" />
        <MovieRow title="Popular Movies" endpoint="movie/popular" />
        <MovieRow title="Top Rated Movies" endpoint="movie/top_rated" />
        <MovieRow title="Trending TV Series" endpoint="trending/tv/week" />
        <MovieRow title="Popular TV Series" endpoint="tv/popular" />
        <MovieRow title="Top Rated TV Series" endpoint="tv/top_rated" />
      </div>
    </div>
  );
};

export default Home;
