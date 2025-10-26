import { Button } from "./ui/button";
import { useNavigate } from 'react-router-dom'
import ThemeToggleGlass from "./ThemeToggleGlass"
import MovieVerseLogo from "./MovieVerseLogo"
import { Search, Menu, X, Sun, Moon, Star, Heart, Home, Film, Users, Settings, User } from 'lucide-react'

interface NavbarProps {
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
}

const Navbar = ({ isSidebarOpen, onSidebarToggle }: NavbarProps) => {
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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-white/10 backdrop-blur-2xl bg-black/30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo - Matches landing page exactly */}
          <button
            onClick={() => handleNavigation('/')}
            className="flex items-center space-x-2 hover:scale-105 transition-transform"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-white bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
              MovieVerse
            </span>
          </button>

          {/* Search Bar - Persistent on main app */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value=""
                onChange={() => {}}
                onFocus={() => handleNavigation('/search')}
                className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-all"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors w-5 h-5" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavigation('/app')}
              className="text-white hover:text-gray-300 transition-colors flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-white/10"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => handleNavigation('/movies')}
              className="text-white hover:text-gray-300 transition-colors flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-white/10"
            >
              <Film className="w-4 h-4" />
              <span>Movies</span>
            </button>
            <button
              onClick={() => handleNavigation('/genres')}
              className="text-white hover:text-gray-300 transition-colors flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-white/10"
            >
              <Star className="w-4 h-4" />
              <span>Genres</span>
            </button>
            <button
              onClick={() => handleNavigation('/about')}
              className="text-white hover:text-gray-300 transition-colors flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-white/10"
            >
              <Users className="w-4 h-4" />
              <span>About</span>
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onSidebarToggle}
              className="hover:scale-110 transition-transform text-white hover:bg-white/10 rounded-xl"
              aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Theme Toggle */}
            <ThemeToggleGlass />

            {/* User Profile Icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleNavigation('/profile')}
              className="hover:scale-110 transition-transform text-white hover:bg-white/10 rounded-xl"
              aria-label="User profile"
            >
              <Settings className="w-5 h-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden hover:scale-110 transition-transform text-white rounded-xl">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
