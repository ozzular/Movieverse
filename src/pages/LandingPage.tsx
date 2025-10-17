import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  const handleEnterVerse = () => {
    navigate('/app')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="apple-landing-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle particle effect */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-1 h-1 bg-blue-400/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-purple-300/30 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-32 w-1 h-1 bg-pink-400/20 rounded-full animate-pulse delay-700"></div>
      </div>

      <motion.div
        className="max-w-lg w-full px-6 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6 tracking-tight">
            MovieVerse
          </h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 font-light leading-relaxed"
          >
            Discover your cinematic universe
          </motion.p>
        </motion.div>

        <motion.button
          variants={itemVariants}
          onClick={handleEnterVerse}
          className="group relative overflow-hidden px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white font-medium text-lg hover:bg-white/15 transition-all duration-300 hover:scale-105 active:scale-95"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Enter the Verse</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center space-x-1"
        >
          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-300"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-700"></div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LandingPage
