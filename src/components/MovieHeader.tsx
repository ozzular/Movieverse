/**
 * Movie Header Component
 * Displays movie title, rating, runtime, genres, and action buttons
 */

import { Star, Bookmark, BookmarkCheck, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MovieHeaderProps {
  title: string;
  rating: number;
  voteCount: number;
  runtime: number;
  releaseDate: string;
  genres: Array<{ id: number; name: string }>;
  inWatchlist: boolean;
  onWatchlistToggle: () => void;
  onPlayClick: () => void;
  isLoading?: boolean;
}

export const MovieHeader = ({
  title,
  rating,
  voteCount,
  runtime,
  releaseDate,
  genres,
  inWatchlist,
  onWatchlistToggle,
  onPlayClick,
  isLoading,
}: MovieHeaderProps) => {
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  const ratingColor =
    rating >= 7.5
      ? "text-green-400"
      : rating >= 5
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{year}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Star className={`w-5 h-5 ${ratingColor}`} fill="currentColor" />
          <span className={`font-semibold ${ratingColor}`}>
            {rating.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">
            ({voteCount.toLocaleString()} votes)
          </span>
        </div>

        {runtime > 0 && (
          <span className="text-sm px-3 py-1 bg-white/10 rounded-full">
            {runtime} min
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Badge key={genre.id} variant="outline">
            {genre.name}
          </Badge>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          size="lg"
          onClick={onPlayClick}
          disabled={isLoading}
          className="gap-2"
        >
          <Play className="w-5 h-5" fill="currentColor" />
          Play Trailer
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={onWatchlistToggle}
          disabled={isLoading}
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
      </div>
    </div>
  );
};
