import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MovieRow } from "@/components/MovieRow";
import { Calendar, Award, Film } from "lucide-react";

interface Director {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  profile_path: string;
  known_for_department: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  job: string;
}

const DirectorDetail = () => {
  const { id } = useParams();
  const [director, setDirector] = useState<Director | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDirectorDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        // Fetch director details
        const directorResponse = await fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`,
        );
        const directorData = await directorResponse.json();
        setDirector(directorData);

        // Fetch director's filmography
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}`,
        );
        const creditsData = await creditsResponse.json();

        // Filter for director roles and sort by release date
        const directedMovies = creditsData.crew
          .filter((credit: any) => credit.job === "Director")
          .sort(
            (a: any, b: any) =>
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime(),
          );

        setMovies(directedMovies);
      } catch (error) {
        console.error("Error fetching director details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDirectorDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading director details...</div>
      </div>
    );
  }

  if (!director) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Director not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Director Profile Card */}
          <Card className="glass-effect border-border">
            <CardContent className="p-6">
              {director.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${director.profile_path}`}
                  alt={director.name}
                  className="w-full rounded-lg mb-4"
                />
              )}
              <h1 className="text-3xl font-bold mb-4">{director.name}</h1>

              <div className="space-y-3 mb-4">
                {director.birthday && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(director.birthday).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {director.place_of_birth && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>📍 {director.place_of_birth}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4" />
                  <Badge variant="secondary">
                    {movies.length} Films Directed
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Biography */}
          <div className="md:col-span-2">
            <Card className="glass-effect border-border">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  Biography
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {director.biography || "No biography available."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filmography Grid */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Directed Films</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <Card className="glass-effect border-border hover:border-primary transition-all cursor-pointer group">
                  <CardContent className="p-0">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full aspect-[2/3] bg-muted flex items-center justify-center rounded-t-lg">
                        <Film className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="p-3">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                        {movie.title}
                      </h3>
                      {movie.release_date && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(movie.release_date).getFullYear()}
                        </p>
                      )}
                      {movie.vote_average > 0 && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs">⭐</span>
                          <span className="text-xs font-medium">
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorDetail;
