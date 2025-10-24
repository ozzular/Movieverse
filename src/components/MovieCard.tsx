import { Play, Plus, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

// Define Movie interface locally to completely bypass import issues
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
}

interface MovieCardProps {
  movie: Movie;
  title?: string;
  image?: string;
  rating?: string;
  genre?: string;
}

const MovieCard = ({ movie, title, image, rating, genre }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorited) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="aspect-[2/3] relative">
        <img
          src={image || `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={title || movie.title}
          className="w-full h-full object-cover transition-all duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x450/1f2937/ffffff?text=No+Image';
          }}
        />

        {/* Favorite indicator */}
        <div className="absolute top-3 right-3 z-20">
          <Button
            size="icon"
            variant="ghost"
            className={`w-8 h-8 rounded-full transition-all duration-300 ${
              favorited
                ? 'bg-red-500/90 text-white hover:bg-red-600'
                : 'bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm'
            }`}
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />

        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 p-6 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex gap-2 mb-4">
            <Button
              size="icon"
              className="glass-card hover:bg-primary hover:text-primary-foreground"
              onClick={handlePlayClick}
            >
              <Play className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className={`glass-card hover:bg-red-500 hover:text-white transition-colors ${
                favorited ? 'bg-red-500 text-white' : ''
              }`}
              onClick={handleFavoriteClick}
            >
              <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
            </Button>
          </div>
          <h3 className="text-lg font-bold text-center mb-2 text-white">{title}</h3>
          <p className="text-sm text-gray-300">{genre}</p>
          <p className="text-sm text-yellow-400 font-semibold mt-1">⭐ {rating}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;