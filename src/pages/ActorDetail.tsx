import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ActorDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  profile_path: string;
  known_for_department: string;
  also_known_as: string[];
}

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  character?: string;
  job?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

interface Credits {
  cast: Movie[];
  crew: Movie[];
}

const ActorDetail = () => {
  const { id } = useParams();
  const [actor, setActor] = useState<ActorDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);

  useEffect(() => {
    if (id) {
      fetchActorDetails(id);
      fetchActorCredits(id);
    }
  }, [id]);

  const fetchActorDetails = async (actorId: string) => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      if (!apiKey) return;

      const response = await fetch(
        `https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}`,
      );
      const data = await response.json();
      setActor(data);
    } catch (error) {
      console.error("Error fetching actor details:", error);
    }
  };

  const fetchActorCredits = async (actorId: string) => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      if (!apiKey) return;

      const response = await fetch(
        `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${apiKey}`,
      );
      const data = await response.json();
      setCredits(data);
    } catch (error) {
      console.error("Error fetching actor credits:", error);
    }
  };

  if (!actor) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center ml-20">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 ml-20">
      <div className="container mx-auto px-4">
        <Link to="/actors">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Actors
          </Button>
        </Link>

        <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-12">
          <div>
            <div className="aspect-[2/3] rounded-lg overflow-hidden bg-secondary mb-4">
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{actor.name}</h1>
              <p className="text-lg text-muted-foreground">
                {actor.known_for_department}
              </p>
            </div>

            <div className="space-y-3">
              {actor.birthday && (
                <div className="flex items-center gap-2 text-foreground/80">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Born: {new Date(actor.birthday).toLocaleDateString()}
                  </span>
                </div>
              )}
              {actor.place_of_birth && (
                <div className="flex items-center gap-2 text-foreground/80">
                  <MapPin className="w-4 h-4" />
                  <span>{actor.place_of_birth}</span>
                </div>
              )}
            </div>

            {actor.biography && (
              <div>
                <h2 className="text-2xl font-semibold mb-3">Biography</h2>
                <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                  {actor.biography}
                </p>
              </div>
            )}

            {actor.also_known_as && actor.also_known_as.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Also Known As</h3>
                <div className="flex flex-wrap gap-2">
                  {actor.also_known_as.map((name, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary rounded-full text-sm"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <Tabs defaultValue="acting" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="acting">Acting</TabsTrigger>
            <TabsTrigger value="crew">Production</TabsTrigger>
          </TabsList>

          <TabsContent value="acting" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Filmography</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {credits?.cast
                ?.sort((a, b) => {
                  const dateA = a.release_date || a.first_air_date || "";
                  const dateB = b.release_date || b.first_air_date || "";
                  return dateB.localeCompare(dateA);
                })
                .map((item) => (
                  <Link
                    key={`${item.id}-${item.character}`}
                    to={`/movie/${item.id}`}
                    className="group"
                  >
                    <div className="aspect-[2/3] rounded-lg overflow-hidden bg-secondary mb-2 relative">
                      {item.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                          alt={item.title || item.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                          No Poster
                        </div>
                      )}
                      {item.vote_average > 0 && (
                        <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">
                          ⭐ {item.vote_average.toFixed(1)}
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {item.title || item.name}
                    </h3>
                    {item.character && (
                      <p className="text-xs text-muted-foreground truncate">
                        as {item.character}
                      </p>
                    )}
                  </Link>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="crew" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Production Work</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {credits?.crew
                ?.sort((a, b) => {
                  const dateA = a.release_date || a.first_air_date || "";
                  const dateB = b.release_date || b.first_air_date || "";
                  return dateB.localeCompare(dateA);
                })
                .map((item, index) => (
                  <Link
                    key={`${item.id}-${item.job}-${index}`}
                    to={`/movie/${item.id}`}
                    className="group"
                  >
                    <div className="aspect-[2/3] rounded-lg overflow-hidden bg-secondary mb-2 relative">
                      {item.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                          alt={item.title || item.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                          No Poster
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {item.title || item.name}
                    </h3>
                    {item.job && (
                      <p className="text-xs text-muted-foreground truncate">
                        {item.job}
                      </p>
                    )}
                  </Link>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ActorDetail;
