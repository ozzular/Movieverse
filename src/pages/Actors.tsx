import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Actor {
  id: number;
  name: string;
  profile_path: string;
  known_for_department: string;
  popularity: number;
}

const Actors = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredActors, setFilteredActors] = useState<Actor[]>([]);

  useEffect(() => {
    fetchPopularActors();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = actors.filter((actor) =>
        actor.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredActors(filtered);
    } else {
      setFilteredActors(actors);
    }
  }, [searchQuery, actors]);

  const fetchPopularActors = async () => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      if (!apiKey) {
        console.error("TMDB API key is not configured");
        return;
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}`,
      );
      const data = await response.json();
      setActors(data.results || []);
      setFilteredActors(data.results || []);
    } catch (error) {
      console.error("Error fetching actors:", error);
      setActors([]);
      setFilteredActors([]);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 ml-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Popular Actors</h1>

        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search actors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-border"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredActors.map((actor) => (
            <Link
              key={actor.id}
              to={`/actor/${actor.id}`}
              className="group cursor-pointer"
            >
              <div className="aspect-[2/3] rounded-lg overflow-hidden bg-secondary mb-3 relative">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>
              <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                {actor.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {actor.known_for_department}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Actors;
