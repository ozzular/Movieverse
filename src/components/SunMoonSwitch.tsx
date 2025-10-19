import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

interface SunMoonSwitchProps {
  className?: string
}

const SunMoonSwitch: React.FC<SunMoonSwitchProps> = ({ className = '' }) => {
  const { currentTheme, toggleTheme } = useTheme()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleToggle = () => {
    setIsAnimating(true)
    toggleTheme()

    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 800)
  }

  return (
    <div
      className={`relative inline-flex items-center cursor-pointer ${className}`}
      onClick={handleToggle}
    >
      {/* Background */}
      <motion.div
        className="relative w-20 h-10 rounded-full bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm"
        animate={{
          background: currentTheme === 'day'
            ? 'linear-gradient(to right, rgb(219, 234, 254), rgb(147, 197, 253))' // Blue gradient for day
            : 'linear-gradient(to right, rgb(156, 163, 175), rgb(31, 41, 55))' // Gray gradient for night
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Toggle Button */}
        <motion.div
          className="w-8 h-8 rounded-full shadow-lg flex items-center justify-center"
          animate={{
            x: currentTheme === 'day' ? '4px' : '32px',
            background: currentTheme === 'day'
              ? 'radial-gradient(circle at 30% 30%, #fbbf24, #f59e0b)' // Sun colors
              : 'radial-gradient(circle at 30% 30%, #e5e7eb, #9ca3af)' // Moon colors
          }}
          transition={{
            x: { duration: 0.3, type: "spring", stiffness: 200, damping: 15 },
            background: { duration: 0.5 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Sun Rays */}
          <AnimatePresence>
            {currentTheme === 'day' && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: isAnimating ? 180 : 0
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.4 }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 h-2 bg-yellow-400"
                    style={{
                      transform: `translateX(3px) rotate(${i * 60}deg)`,
                      transformOrigin: '0 12px'
                    }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
                <div className="w-2 h-2 rounded-full bg-yellow-300"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Moon Craters */}
          <AnimatePresence>
            {currentTheme === 'night' && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: isAnimating ? 180 : 0
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-2 h-2 rounded-full bg-slate-200 relative">
                  <div className="absolute w-1 h-1 bg-slate-400 rounded-full top-0 right-0 transform scale-75"></div>
                  <div className="absolute w-0.5 h-0.5 bg-slate-500 rounded-full bottom-0 left-0"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Icon Labels (optional) */}
        <motion.div
          className="absolute left-2 text-xs font-medium text-gray-600"
          animate={{ opacity: currentTheme === 'day' ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          ☀️
        </motion.div>
        <motion.div
          className="absolute right-2 text-xs font-medium text-gray-400"
          animate={{ opacity: currentTheme === 'night' ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          🌙
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SunMoonSwitch
