import React from 'react'

interface MovieVerseLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const MovieVerseLogo: React.FC<MovieVerseLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* White Play Icon */}
          <path
            d="M8 5v14l11-7z"
            fill="white"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className="text-xl font-bold text-white leading-tight">
          MovieVerse
        </span>
      </div>
    </div>
  )
}

export default MovieVerseLogo
