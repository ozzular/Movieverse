import { MovieRow } from "@/components/MovieRow";
import { TMDB_ENDPOINTS } from "@/constants/tmdbEndpoints";

const Trending = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Trending</h1>

        <div className="space-y-8">
          <MovieRow
            title="Trending Movies This Week"
            endpoint={TMDB_ENDPOINTS.TRENDING_MOVIES_WEEK}
          />
          <MovieRow
            title="Trending TV Shows This Week"
            endpoint={TMDB_ENDPOINTS.TRENDING_TV_WEEK}
          />
          <MovieRow
            title="Trending Movies Today"
            endpoint={TMDB_ENDPOINTS.TRENDING_MOVIES_DAY}
          />
          <MovieRow
            title="Trending TV Shows Today"
            endpoint={TMDB_ENDPOINTS.TRENDING_TV_DAY}
          />
        </div>
      </div>
    </div>
  );
};

export default Trending;
