import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Movie } from "@/types";

interface SelectedMovieContextType {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  isHeroVisible: boolean;
  showHero: (movie: Movie) => void;
  hideHero: () => void;
}

const SelectedMovieContext = createContext<
  SelectedMovieContextType | undefined
>(undefined);

export const useSelectedMovie = () => {
  const context = useContext(SelectedMovieContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedMovie must be used within a SelectedMovieProvider",
    );
  }
  return context;
};

interface SelectedMovieProviderProps {
  children: ReactNode;
}

export const SelectedMovieProvider: React.FC<SelectedMovieProviderProps> = ({
  children,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  const showHero = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsHeroVisible(true);
  };

  const hideHero = () => {
    setIsHeroVisible(false);
    // Keep the movie data for a smooth transition
    setTimeout(() => setSelectedMovie(null), 300);
  };

  const value: SelectedMovieContextType = {
    selectedMovie,
    setSelectedMovie,
    isHeroVisible,
    showHero,
    hideHero,
  };

  return (
    <SelectedMovieContext.Provider value={value}>
      {children}
    </SelectedMovieContext.Provider>
  );
};
