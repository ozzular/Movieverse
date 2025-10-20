import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GeolocationModalProps {
  isOpen: boolean
  onAllow: () => void
  onDeny: () => void
}

const GeolocationModal: React.FC<GeolocationModalProps> = ({ isOpen, onAllow, onDeny }) => {
  const [hasResponded, setHasResponded] = useState(false)

  useEffect(() => {
    // Mark as responded when modal is closed
    if (!isOpen) {
      setHasResponded(true)
    }
  }, [isOpen])

  const handleAllow = () => {
    setHasResponded(true)
    onAllow()
  }

  const handleDeny = () => {
    setHasResponded(true)
    onDeny()
  }

  return (
    <AnimatePresence>
      {isOpen && !hasResponded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="glassmorphism bg-black/80 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4"
          >
            {/* Icon */}
            <div className="w-16 h-16 bg-galaxy-purple/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-galaxy-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white text-center mb-4">
              Enable Location Access
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-center mb-8 leading-relaxed">
              We'd like to show you trending movies popular in your area. This helps us provide more relevant content recommendations based on your location.
            </p>

            {/* Privacy Note */}
            <div className="bg-white/5 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-400 text-center">
                🔒 Your location data is only used to improve your movie recommendations and is never shared with third parties.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAllow}
                className="flex-1 bg-galaxy-purple hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Allow Location</span>
              </button>

              <button
                onClick={handleDeny}
                className="flex-1 border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
              >
                Not Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GeolocationModal