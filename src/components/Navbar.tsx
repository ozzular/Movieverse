import { Button } from "./ui/button";
import { useNavigate } from 'react-router-dom'
import ThemeToggleGlass from "./ThemeToggleGlass"

const Navbar = () => {
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    if (path.startsWith('/')) {
      navigate(path)
    } else {
      // For hash links, scroll to section
      const element = document.querySelector(path)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-[hsl(var(--glass-border))] backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-[52px]">
          <button
            onClick={() => handleNavigation('/')}
            className="flex items-center space-x-2 hover:scale-105 transition-transform"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              MovieVerse
            </span>
          </button>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavigation('/movies')}
              className="text-gray-700 dark:text-gray-300 hover:text-accent transition-colors relative group py-2"
            >
              Movies
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleNavigation('/genres')}
              className="text-gray-700 dark:text-gray-300 hover:text-accent transition-colors relative group py-2"
            >
              Genres
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleNavigation('/about')}
              className="text-gray-700 dark:text-gray-300 hover:text-accent transition-colors relative group py-2"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </button>
            <div className="flex items-center space-x-3 py-1">
              <ThemeToggleGlass />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigation('/signin')}
                className="hover:scale-105 transition-transform border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-accent"
              >
                Sign In
              </Button>
            </div>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;