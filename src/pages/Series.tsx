import { MovieRow } from "@/components/MovieRow";

const Series = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">TV Series</h1>

        <div className="space-y-8">
          <MovieRow title="Trending Now" endpoint="trending/tv/week" />
          <MovieRow title="Popular" endpoint="tv/popular" />
          <MovieRow title="Top Rated" endpoint="tv/top_rated" />
          <MovieRow title="On The Air" endpoint="tv/on_the_air" />
          <MovieRow title="Airing Today" endpoint="tv/airing_today" />
        </div>
      </div>
    </div>
  );
};

export default Series;
