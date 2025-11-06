import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Star, Bookmark, BookmarkCheck, Award, Film, Tv2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrailerCarousel } from "@/components/TrailerCarousel";
import { MovieRow } from "@/components/MovieRow";
import { ShareButtons } from "@/components/ShareButtons";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useToast } from "@/hooks/use-toast";

interface MovieDetails {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
}

interface Video {
  id: string;
  key: string;
  type: string;
  site: string;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string;
}

interface WatchProvider {
  logo_path: string;
  provider_name: string;
  provider_id: number;
}

interface WatchProviders {
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
}

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [trailerKey, setTrailerKey] = useState<string>("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [directors, setDirectors] = useState<CrewMember[]>([]);
  const [watchProviders, setWatchProviders] = useState<WatchProviders>({});
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { toast } = useToast();
  const inWatchlist = movie ? isInWatchlist(movie.id) : false;

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
      fetchTrailer();
      fetchCredits();
      fetchWatchProviders();
    }
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const fetchTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      const data = await response.json();
      const trailer = data.results.find(
        (video: Video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const fetchCredits = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      const data = await response.json();
      const directorsList = data.crew.filter((member: CrewMember) => member.job === "Director");
      setDirectors(directorsList);
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  };

  const fetchWatchProviders = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      const data = await response.json();
      // Get US providers (you can change to detect user region)
      setWatchProviders(data.results?.US || {});
    } catch (error) {
      console.error("Error fetching watch providers:", error);
    }
  };

  const handleWatchlistToggle = () => {
    if (!movie) return;
    
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
      toast({
        title: "Removed from watchlist",
        description: `${movie.title} has been removed from your watchlist`,
      });
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        media_type: "movie",
      });
      toast({
        title: "Added to watchlist",
        description: `${movie.title} has been added to your watchlist`,
      });
    }
  };

  if (!movie) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-[70vh]">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, hsl(0 0% 8%) 0%, transparent 60%)",
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-8 ml-20">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
            <div className="flex items-center gap-6 mb-4">
              <span className="flex items-center gap-1 text-primary font-semibold">
                <Star className="w-5 h-5" fill="currentColor" />
                {movie.vote_average.toFixed(1)}
              </span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>{movie.runtime} min</span>
            </div>
            <div className="flex gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="px-3 py-1 bg-secondary rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {trailerKey && (
                <Button size="lg" onClick={() => setShowTrailer(true)} className="gap-2">
                  <Play className="w-5 h-5" fill="currentColor" />
                  Watch Trailer
                </Button>
              )}
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleWatchlistToggle}
                className="gap-2"
              >
                {inWatchlist ? (
                  <>
                    <BookmarkCheck className="w-5 h-5" />
                    In Watchlist
                  </>
                ) : (
                  <>
                    <Bookmark className="w-5 h-5" />
                    Add to Watchlist
                  </>
                )}
              </Button>
              <ShareButtons title={movie.title} id={movie.id} />
            </div>
          </div>
        </div>
      </div>

      {showTrailer && trailerKey && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl aspect-video">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white text-2xl"
            >
              ✕
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-8 py-12 ml-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-foreground/80 leading-relaxed">{movie.overview}</p>
            </div>

            {/* Directors Section */}
            {directors.length > 0 && (
              <Card className="glass-effect border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Film className="w-5 h-5 text-primary" />
                    {directors.length > 1 ? "Directors" : "Director"}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {directors.map((director) => (
                      <Link
                        key={director.id}
                        to={`/director/${director.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                      >
                        {director.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${director.profile_path}`}
                            alt={director.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                            <Film className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold group-hover:text-primary transition-colors">
                            {director.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{director.job}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Streaming Availability */}
            {(watchProviders.flatrate || watchProviders.rent || watchProviders.buy) && (
              <Card className="glass-effect border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Tv2 className="w-5 h-5 text-primary" />
                    Where to Watch
                  </h3>
                  
                  {watchProviders.flatrate && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Stream</p>
                      <div className="flex flex-wrap gap-3">
                        {watchProviders.flatrate.map((provider) => (
                          <div
                            key={provider.provider_id}
                            className="flex flex-col items-center gap-2"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                              alt={provider.provider_name}
                              className="w-12 h-12 rounded-lg"
                            />
                            <span className="text-xs text-center max-w-[60px] truncate">
                              {provider.provider_name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {watchProviders.rent && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Rent</p>
                      <div className="flex flex-wrap gap-3">
                        {watchProviders.rent.map((provider) => (
                          <div
                            key={provider.provider_id}
                            className="flex flex-col items-center gap-2"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                              alt={provider.provider_name}
                              className="w-12 h-12 rounded-lg"
                            />
                            <span className="text-xs text-center max-w-[60px] truncate">
                              {provider.provider_name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {watchProviders.buy && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Buy</p>
                      <div className="flex flex-wrap gap-3">
                        {watchProviders.buy.map((provider) => (
                          <div
                            key={provider.provider_id}
                            className="flex flex-col items-center gap-2"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                              alt={provider.provider_name}
                              className="w-12 h-12 rounded-lg"
                            />
                            <span className="text-xs text-center max-w-[60px] truncate">
                              {provider.provider_name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground mt-4">
                    Powered by TMDB • Availability varies by region
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Awards Badge */}
            {movie.vote_average >= 8.0 && movie.vote_count > 1000 && (
              <Card className="glass-effect border-primary/30 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Highly Acclaimed</h3>
                      <p className="text-sm text-muted-foreground">
                        This film has received critical acclaim with a {movie.vote_average.toFixed(1)}/10 rating
                        from {movie.vote_count.toLocaleString()} reviews
                      </p>
                      <Link to="/awards">
                        <Badge className="mt-2 cursor-pointer hover:bg-primary/80">
                          Explore More Award Winners →
                        </Badge>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <TrailerCarousel movieId={movie.id} />
          </div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>

        {movie.belongs_to_collection && (
          <div className="mt-12">
            <div className="relative rounded-lg overflow-hidden mb-4">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.belongs_to_collection.backdrop_path}`}
                alt={movie.belongs_to_collection.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-2xl font-bold">{movie.belongs_to_collection.name}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12">
          <MovieRow title="Similar Movies" endpoint={`movie/${movie.id}/similar`} />
        </div>

        <div className="mt-8">
          <MovieRow title="Recommendations" endpoint={`movie/${movie.id}/recommendations`} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
