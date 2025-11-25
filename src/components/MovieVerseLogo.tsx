import React from "react";
import { Film } from "lucide-react";

interface MovieVerseLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
}

const MovieVerseLogo: React.FC<MovieVerseLogoProps> = ({
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    hero: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    hero: "text-4xl",
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Image */}
      <img
        src="/new-logo.png"
        alt="MovieVerse Logo"
        className={`${sizeClasses[size]} object-contain`}
        onError={(e) => {
          // Fallback to hiding image so text/icon can show
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />

      {/* Text */}
      <div className="flex flex-col">
        <span
          className={`${textSizeClasses[size]} font-bold text-white leading-tight`}
        >
          MovieVerse
        </span>
      </div>
    </div>
  );
};

export default MovieVerseLogo;
