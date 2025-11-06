import { Play, Plus, Heart, Clock, Calendar, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { tmdbApi } from "../services/tmdbApi";

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
  const [genreNames, setGenreNames] = useState<string[]>([]);
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  // Fetch genre names
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const names = await tmdbApi.getGenreNames(movie.genre_ids);
        setGenreNames(names);
      } catch (error) {
        console.error('Failed to fetch genre names:', error);
        setGenreNames([]);
      }
    };
    fetchGenres();
  }, [movie.genre_ids]);

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
      style={{ minWidth: 'var(--card-min-width)', maxWidth: 'var(--card-max-width)' }}
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
            className={`w-8 h-8 rounded-full transition-all duration-300 ${favorited ? 'bg-[var(--accent)] text-white' : 'bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm'}`}
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-4 w-4 ${favorited ? 'text-white' : ''}`} />
          </Button>
        </div>

        {/* Enhanced gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-80'
        }`} />

        {/* Movie metadata overlay - top */}
        <div className={`absolute top-0 left-0 right-0 p-3 transition-transform duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {/* Movie Rating */}
              <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs font-semibold text-white">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>

              {/* Release Year */}
              <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-300" />
                <span className="text-xs text-white">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>
            </div>

            {/* Runtime placeholder - TMDB API doesn't provide runtime in basic calls */}
            <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-300" />
              <span className="text-xs text-white">2h</span>
            </div>
          </div>
        </div>

        {/* Movie title and genre ribbons - bottom */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${
          isHovered ? 'translate-y-0' : 'translate-y-4'
        }`}>
          {/* Movie Title */}
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
            {title || movie.title}
          </h3>

          {/* Genre tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {genreNames.slice(0, 2).map((genreName) => (
              <span
                key={genreName}
                className="bg-white/10 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium border border-white/20"
              >
                {genreName}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                size="sm"
                className="glass-card bg-black/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-full w-8 h-8 p-0 transition-all duration-200 hover:scale-105"
                onClick={handlePlayClick}
              >
                <Play className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="glass-card hover:bg-red-600 hover:text-white rounded-full w-8 h-8 p-0 transition-all duration-200 hover:scale-110"
                onClick={handleFavoriteClick}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Rating display removed - now only shown on detail pages */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
