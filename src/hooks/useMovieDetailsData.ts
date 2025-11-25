/**
 * Custom hook for fetching movie details
 * Consolidates all data fetching logic from MovieDetail component
 * Fetches movie details, videos, credits, and watch providers in parallel
 *
 * @module hooks/useMovieDetailsData
 * @param {number|undefined} movieId - The TMDB movie ID (if undefined, hook does nothing)
 * @returns {MovieData} Object containing movie data, loading state, and error message
 *
 * @example
 * const { details, trailerKey, directors, error, isLoading } = useMovieDetailsData(550);
 *
 * if (isLoading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage message={error} />;
 * return <MovieDetails movie={details} />;
 */

import { useEffect, useState } from "react";
import {
  fetchMovieDetails,
  fetchMovieVideos,
  fetchMovieCredits,
  fetchWatchProviders,
  findTrailer,
  getDirectorsFromCrew,
} from "@/services/apiClient";

interface MovieData {
  details: any | null;
  trailerKey: string | null;
  directors: any[];
  watchProviders: any;
  isLoading: boolean;
  error: string | null;
}

/**
 * Consolidates all movie detail fetching into a single hook
 * Uses Promise.all for parallel fetching to improve performance
 *
 * @returns {MovieData} Movie data object with loading and error states
 */
export const useMovieDetailsData = (movieId: number | undefined): MovieData => {
  const [details, setDetails] = useState<any>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [directors, setDirectors] = useState<any[]>([]);
  const [watchProviders, setWatchProviders] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const loadMovieData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch all data in parallel
        const [movieData, videosData, creditsData, providersData] =
          await Promise.all([
            fetchMovieDetails(movieId),
            fetchMovieVideos(movieId),
            fetchMovieCredits(movieId),
            fetchWatchProviders(movieId),
          ]);

        setDetails(movieData);

        // Find trailer from videos
        const videosArray = (videosData as any)?.results || [];
        const trailer = findTrailer(videosArray);
        setTrailerKey(trailer?.key || null);

        // Extract directors from crew
        const crewArray = (creditsData as any)?.crew || [];
        const directorsList = getDirectorsFromCrew(crewArray);
        setDirectors(directorsList);

        // Set watch providers
        setWatchProviders(providersData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load movie details";
        setError(errorMessage);
        console.error("Error loading movie data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieData();
  }, [movieId]);

  return {
    details,
    trailerKey,
    directors,
    watchProviders,
    isLoading,
    error,
  };
};
