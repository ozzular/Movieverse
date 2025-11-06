import { MovieRow } from "@/components/MovieRow";

const Trending = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 ml-20">
        <h1 className="text-4xl font-bold mb-8">Trending</h1>
        
        <div className="space-y-8">
          <MovieRow title="Trending Movies This Week" endpoint="trending/movie/week" />
          <MovieRow title="Trending TV Shows This Week" endpoint="trending/tv/week" />
          <MovieRow title="Trending Movies Today" endpoint="trending/movie/day" />
          <MovieRow title="Trending TV Shows Today" endpoint="trending/tv/day" />
        </div>
      </div>
    </div>
  );
};

export default Trending;
