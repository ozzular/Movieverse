import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { Mail, Github } from 'lucide-react'

const Footer = () => {
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    if (path.startsWith('/')) {
      navigate(path)
    } else {
      // For external links or hash links, use window navigation
      window.location.href = path
    }
  }

  return (
    <footer className="relative py-16 bg-gradient-to-b from-background via-background/95 to-black">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                MovieVerse
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your ultimate destination for discovering amazing movies and TV shows.
              Explore the universe of cinema with us.
            </p>
            <Button
              onClick={() => handleNavigation('/app')}
              className="hover:scale-105 transition-transform bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              Enter MovieVerse
            </Button>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold text-lg text-gray-900 dark:text-white">Discover</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavigation('/movies')}
                  className="text-gray-400 hover:text-accent transition-colors text-left"
                >
                  Movies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/series')}
                  className="text-gray-400 hover:text-accent transition-colors text-left"
                >
                  TV Shows
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/genres')}
                  className="text-gray-400 hover:text-accent transition-colors text-left"
                >
                  Genres
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/favorites')}
                  className="text-gray-400 hover:text-accent transition-colors text-left"
                >
                  My Favorites
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold text-lg text-gray-900 dark:text-white">Support</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavigation('/help')}
                  className="text-gray-400 hover:text-accent transition-colors text-left"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/privacy')}
                  className="text-gray-400 hover:text-accent transition-colors text-left block"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold text-lg text-gray-900 dark:text-white">Contact Us</h4>
            <div className="space-y-4">
              <a
                href="mailto:work.peter.louis@gmail.com"
                className="text-gray-400 hover:text-accent transition-colors flex items-start p-3 rounded-lg glass-card hover:scale-105 transition-transform"
              >
                <Mail className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://github.com/ozzular"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors flex items-center gap-3 p-3 rounded-lg glass-card hover:scale-105 transition-transform"
              >
                <Github className="w-5 h-5 text-primary" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              &copy; 2025 MovieVerse. All rights reserved.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
              <span>Made with ❤️ by <a href="https://github.com/ozzular" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ozzular</a> for movie lovers</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-gray-500 text-sm text-center">
              This project uses the <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TMDB API</a> for movie data.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer