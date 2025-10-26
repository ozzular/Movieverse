import React from 'react'
import { Film } from 'lucide-react'

interface MovieVerseLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'hero'
}

const MovieVerseLogo: React.FC<MovieVerseLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    hero: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    hero: 'text-4xl'
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Icon */}
      <div className={`${sizeClasses[size]} relative`}>
        <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
          <Film className="w-1/2 h-1/2 text-white" />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent leading-tight`}>
          MovieVerse
        </span>
      </div>
    </div>
  )
}

export default MovieVerseLogo