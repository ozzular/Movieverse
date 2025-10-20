import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import type { Cast, Crew } from '../types/index'

interface CastMemberProps {
  person: Cast | Crew
  role?: string
  showRole?: boolean
  onTap?: (personId: number) => void
  className?: string
}

const CastMember: React.FC<CastMemberProps> = ({
  person,
  role,
  showRole = true,
  onTap,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  // Cast member images from TMDB
  const profileImage = person.profile_path
    ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
    : null

  const characterName = 'character' in person ? person.character : role || person.job

  const handleClick = () => {
    if (onTap) {
      onTap(person.id)
    } else {
      // Default behavior: navigate to person's movie page
      navigate(`/person/${person.id}`)
    }
  }

  return (
    <motion.div
      className={`group cursor-pointer ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Circular Profile Card */}
      <div className="flex flex-col items-center space-y-2">
        {/* Circular Profile Image */}
        <div className="relative">
          <motion.div
            className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-lg"
            whileHover={{ borderColor: 'rgba(147, 51, 234, 0.5)' }}
            transition={{ duration: 0.2 }}
          >
            {profileImage && !imageError ? (
              <img
                src={profileImage}
                alt={person.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="text-center">
                <svg className="w-8 h-8 text-gray-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-gray-500 mt-1">{person.name.split(' ')[0]}</p>
              </div>
            )}
          </motion.div>

          {/* Cute Icon Indicator */}
          {person.popularity && person.popularity > 50 && (
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
            >
              <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </motion.div>
          )}

          {/* Hover Floating Action */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <motion.button
                  className="bg-galaxy-purple hover:bg-galaxy-red text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Movies
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Compact Name */}
        <div className="text-center">
          <h4 className="text-white font-medium text-sm leading-tight line-clamp-1 mb-1">
            {person.name.split(' ')[0]}
          </h4>
          {showRole && characterName && characterName !== person.name && (
            <p className="text-gray-400 text-xs leading-tight">
              {characterName.length > 15 ? `${characterName.substring(0, 12)}...` : characterName}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default CastMember
