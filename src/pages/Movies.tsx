import { useState } from "react";
import { MovieRow } from "@/components/MovieRow";
import { FilterBar, FilterOptions } from "@/components/FilterBar";

const Movies = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    genre: "all",
    yearRange: [1980, 2025],
    minRating: 0,
  });

  const buildFilteredEndpoint = (baseEndpoint: string) => {
    let endpoint = baseEndpoint;
    const params = new URLSearchParams();

    if (filters.genre !== "all") {
      params.append("with_genres", filters.genre);
    }
    params.append("primary_release_date.gte", `${filters.yearRange[0]}-01-01`);
    params.append("primary_release_date.lte", `${filters.yearRange[1]}-12-31`);
    params.append("vote_average.gte", filters.minRating.toString());

    const queryString = params.toString();
    return queryString ? `${endpoint}&${queryString}` : endpoint;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 ml-20">
        <h1 className="text-4xl font-bold mb-8">Movies</h1>
        
        <FilterBar onFilterChange={setFilters} />
        
        <div className="space-y-8">
          <MovieRow title="Trending Now" endpoint={buildFilteredEndpoint("trending/movie/week")} />
          <MovieRow title="Popular" endpoint={buildFilteredEndpoint("discover/movie?sort_by=popularity.desc")} />
          <MovieRow title="Top Rated" endpoint={buildFilteredEndpoint("discover/movie?sort_by=vote_average.desc&vote_count.gte=1000")} />
          <MovieRow title="Now Playing" endpoint={buildFilteredEndpoint("movie/now_playing")} />
          <MovieRow title="Upcoming" endpoint={buildFilteredEndpoint("movie/upcoming")} />
        </div>
      </div>
    </div>
  );
};

export default Movies;
