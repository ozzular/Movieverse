import React from "react";

interface MovieCardSkeletonProps {
  className?: string;
}

const MovieCardSkeleton: React.FC<MovieCardSkeletonProps> = ({
  className = "",
}) => {
  return (
    <div className={`movie-card-skeleton ${className}`}>
      {/* Poster Skeleton */}
      <div className="aspect-[2/3] bg-gray-800 rounded-lg mb-3 animate-pulse">
        <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer rounded-lg"></div>
      </div>

      {/* Title Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-3 bg-gray-800 rounded w-3/4 animate-pulse"></div>
      </div>

      {/* Rating and Year Skeleton */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-yellow-400/20 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-700 rounded w-8 animate-pulse"></div>
        </div>
        <div className="h-3 bg-gray-700 rounded w-12 animate-pulse"></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
