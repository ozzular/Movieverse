import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { tmdbApi } from '../services/tmdbApi'
import type { Movie } from '../types/index'

interface ChatMessage {
  id: string
  text: string
  type: 'user' | 'bot'
  timestamp: Date
  suggestions?: Movie[]
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: "👋 Hey there! I'm your MovieVerse assistant. What kind of movies are you looking for today?",
      type: 'bot',
      timestamp: new Date(),
      suggestions: []
    }
  ])
  const [currentInput, setCurrentInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [suggestedMovies, setSuggestedMovies] = useState<Movie[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const initialDelay = 3000 // Show after 3 seconds
  const typewriterDelay = 2000 // Typewriter effect duration

  // Auto-show after initial delay when user is browsing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem('chatbot-dismissed')) {
        setIsMinimized(true) // Start minimized (just bubble)
      }
    }, initialDelay)

    return () => clearTimeout(timer)
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const addMessage = (text: string, type: 'user' | 'bot' = 'bot', suggestions?: Movie[]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: new Date(),
      suggestions
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleUserInput = (input: string) => {
    if (!input.trim()) return

    addMessage(input, 'user')

    // Process input and generate response
    setIsTyping(true)
    setTimeout(() => generateResponse(input), 1000 + Math.random() * 1000)
  }

  const generateResponse = (userInput: string) => {
    setIsTyping(false)
    const input = userInput.toLowerCase()

    // Movie category detection
    if (input.includes('action') || input.includes('thriller') || input.includes('adventure')) {
      suggestMoviesByGenre(28, 'action movies')
    } else if (input.includes('comedy') || input.includes('funny') || input.includes('laugh')) {
      suggestMoviesByGenre(35, 'comedy movies')
    } else if (input.includes('drama') || input.includes('serious') || input.includes('emotional')) {
      suggestMoviesByGenre(18, 'drama movies')
    } else if (input.includes('science fiction') || input.includes('sci-fi') || input.includes('space') || input.includes('future')) {
      suggestMoviesByGenre(878, 'science fiction movies')
    } else if (input.includes('horror') || input.includes('scary') || input.includes('horror')) {
      suggestMoviesByGenre(27, 'horror movies')
    } else if (input.includes('romance') || input.includes('love') || input.includes('romantic')) {
      suggestMoviesByGenre(10749, 'romance movies')
    } else if (input.includes('trending') || input.includes('popular') || input.includes('latest')) {
      suggestTrendingMovies()
    } else if (input.includes('random') || input.includes('surprise') || input.includes('what should')) {
      suggestRandomMovies()
    } else {
      // Generic response with popular movies
      addMessage("I'd be happy to help you find some great movies! Here are some popular films right now:", 'bot')
      suggestPopularMovies()
    }
  }

  const suggestMoviesByGenre = async (genreId: number, categoryName: string) => {
    try {
      const movies = await tmdbApi.getMoviesByGenre(genreId)
      const topMovies = movies.slice(0, 3)

      setSuggestedMovies(topMovies)
      addMessage(`Great taste! Here are some excellent ${categoryName} you might enjoy:`, 'bot', topMovies)
    } catch (error) {
      console.error('Error fetching genre movies:', error)
      addMessage("Sorry, I'm having trouble finding movies right now. Try searching for specific genres!", 'bot')
    }
  }

  const suggestTrendingMovies = async () => {
    try {
      const movies = await tmdbApi.getTrendingMovies()
      const topMovies = movies.slice(0, 3)

      setSuggestedMovies(topMovies)
      addMessage("Here's what's trending right now in movies:", 'bot', topMovies)
    } catch (error) {
      console.error('Error fetching trending movies:', error)
      addMessage("Sorry, I can't fetch trending movies at the moment. Try again later!", 'bot')
    }
  }

  const suggestPopularMovies = async () => {
    try {
      const movies = await tmdbApi.getPopularMovies()
      const topMovies = movies.slice(0, 3)

      setSuggestedMovies(topMovies)
      addMessage("Here are some of the most popular movies currently:", 'bot', topMovies)
    } catch (error) {
      console.error('Error fetching popular movies:', error)
      addMessage("Sorry, I'm unable to fetch popular movies right now.", 'bot')
    }
  }

  const suggestRandomMovies = async () => {
    try {
      // Get trending movies and pick random ones
      const trending = await tmdbApi.getTrendingMovies()
      const popular = await tmdbApi.getPopularMovies()
      const allMovies = [...trending, ...popular]
      const shuffled = allMovies.sort(() => 0.5 - Math.random())
      const randomMovies = shuffled.slice(0, 2)

      setSuggestedMovies(randomMovies)
      addMessage("Here are some random movie suggestions you might enjoy:", 'bot', randomMovies)
    } catch (error) {
      console.error('Error fetching random movies:', error)
      addMessage("Sorry, I'm having trouble picking random movies. Try again!", 'bot')
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim()) {
      handleUserInput(currentInput)
      setCurrentInput('')
    }
  }

  const dismissChatbot = () => {
    setIsOpen(false)
    setIsMinimized(false)
    localStorage.setItem('chatbot-dismissed', 'true')
  }

  return (
    <>
      {/* Chatbot Bubble (Minimized State) */}
      <AnimatePresence>
        {isMinimized && !isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={() => {
                setIsOpen(true)
                setIsMinimized(false)
              }}
              className="relative bg-galaxy-purple hover:bg-galaxy-red text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl transition-all duration-300 hover:shadow-galaxy-purple/25"
            >
              <span className="text-xl">💬</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Chatbot Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-black/90 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-galaxy-purple/20 px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-galaxy-purple rounded-full flex items-center justify-center">
                  🎬
                </div>
                <div>
                  <h3 className="text-white font-semibold">MovieChat</h3>
                  <p className="text-xs text-gray-400">Your movie assistant</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                <button
                  onClick={dismissChatbot}
                  className="text-gray-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm ${
                        message.type === 'user'
                          ? 'bg-galaxy-purple text-white ml-4'
                          : 'bg-white/10 text-gray-100 mr-4'
                      }`}
                    >
                      {message.text}
                    </div>
                    {/* Movie Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {message.suggestions.map((movie) => (
                          <div
                            key={movie.id}
                            className="bg-white/5 hover:bg-white/10 p-2 rounded-lg cursor-pointer transition-colors"
                            onClick={() => window.open(`/movie/${movie.id}`, '_blank')}
                          >
                            <div className="flex items-center space-x-2">
                              <img
                                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                alt={movie.title}
                                className="w-8 h-12 object-cover rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = '/placeholder-movie.jpg'
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{movie.title}</p>
                                <p className="text-xs text-gray-400">⭐ {movie.vote_average.toFixed(1)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 bg-white/10 text-gray-100 px-4 py-2 rounded-2xl mr-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-xs text-gray-400">MovieChat is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-white/10">
              <form onSubmit={handleFormSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Ask for movie suggestions..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-galaxy-purple"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!currentInput.trim() || isTyping}
                  className="bg-galaxy-purple hover:bg-galaxy-red disabled:bg-gray-600 px-4 py-2 rounded-full text-white transition-colors disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Try: "action movies", "show me trending", "surprise me"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot
