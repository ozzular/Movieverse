import { useNavigate } from "react-router-dom";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Button } from "@/components/ui/button";
import { Star, Trash2 } from "lucide-react";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 ml-20">
          <h1 className="text-4xl font-bold mb-8">My Watchlist</h1>
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-64 h-64 mb-8 opacity-50">
              <svg viewBox="0 0 200 200" className="w-full h-full text-muted-foreground">
                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5"/>
                <path d="M100 60 L100 140 M60 100 L140 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <text x="100" y="175" textAnchor="middle" fill="currentColor" fontSize="14">Empty Watchlist</text>
              </svg>
            </div>
            <p className="text-muted-foreground text-xl font-medium mb-2">Your watchlist is empty</p>
            <p className="text-muted-foreground text-center max-w-md">
              Start adding movies and TV shows to keep track of what you want to watch
            </p>
            <Button 
              onClick={() => navigate("/")} 
              className="mt-6 hover-lift active-press"
            >
              Browse Movies
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 ml-20">
        <h1 className="text-4xl font-bold mb-8">My Watchlist</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {watchlist.map((item) => (
            <div key={item.id} className="group relative">
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/movie/${item.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  loading="lazy"
                  className="w-full rounded-lg shadow-lg transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center gap-2">
                  <p className="text-white text-center font-semibold px-2">{item.title}</p>
                  <div className="flex items-center gap-1 text-primary">
                    <Star className="w-4 h-4" fill="currentColor" />
                    <span>{item.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hover-lift active-press"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWatchlist(item.id);
                }}
              >
                <Trash2 className="w-4 h-4 animate-scale-in" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
