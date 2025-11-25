/**
 * Movie Poster Component
 * Displays movie poster image with fallback and loading state
 */

import { useState } from "react";

interface MoviePosterProps {
  src: string | null;
  alt: string;
  isLoading?: boolean;
}

export const MoviePoster = ({ src, alt, isLoading }: MoviePosterProps) => {
  const [imageError, setImageError] = useState(false);

  if (isLoading) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="text-4xl mb-2">🎬</div>
          <p>Loading poster...</p>
        </div>
      </div>
    );
  }

  if (!src || imageError) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-white/10">
        <div className="text-center text-muted-foreground">
          <div className="text-4xl mb-2">🎭</div>
          <p>Poster not available</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={`https://image.tmdb.org/t/p/w500${src}`}
      alt={alt}
      onError={() => setImageError(true)}
      className="w-full h-96 rounded-lg object-cover"
    />
  );
};
