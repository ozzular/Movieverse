import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './i18n'
import { SearchProvider } from './contexts/SearchContext'
import { GenreProvider } from './contexts/GenreContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { FilterProvider } from './contexts/FilterContext'
import { SelectedMovieProvider } from './contexts/SelectedMovieContext'
import { ThemeProvider } from './contexts/ThemeContext'
import ThemeWrapper from './components/ThemeWrapper'
import { RegionProvider } from './contexts/RegionContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Chatbot from './components/Chatbot'
import IndexGlass from './pages/IndexGlass'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import SearchResults from './pages/SearchResults'
import GenresPage from './pages/GenrePage'
import MoviesPage from './pages/MoviesPage'
import SeriesPage from './pages/SeriesPage'
import FiltersPage from './pages/FiltersPage'
import About from './pages/About'
import SettingsPage from './pages/Profile'
import HelpCenter from './pages/HelpCenter'
import PrivacyPolicy from './pages/PrivacyPolicy'

// Netflix-style Layout Component with Sidebar
function NetflixLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900">
      {/* Collapsible Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Sticky Navbar at the top */}
      <div className={isSidebarOpen ? "lg:ml-16" : ""}>
        <Navbar isSidebarOpen={isSidebarOpen} onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Main content area */}
      <main className={`pt-0 ${isSidebarOpen ? "lg:ml-16" : ""}`}>
        {children}
      </main>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  // Landing page has its own layout
  if (isLandingPage) {
    return <IndexGlass />
  }

  // Main app uses Netflix-style layout
  return (
    <NetflixLayout>
      <Routes>
        <Route path="/app" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/filters" element={<FiltersPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/genre/:genreId" element={<GenresPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<SettingsPage />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </NetflixLayout>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <RegionProvider>
          <SearchProvider>
            <GenreProvider>
              <FavoritesProvider>
                <FilterProvider>
                  <SelectedMovieProvider>
                    <Router>
                      <AppRoutes />
                    </Router>
                  </SelectedMovieProvider>
                </FilterProvider>
              </FavoritesProvider>
            </GenreProvider>
          </SearchProvider>
        </RegionProvider>
      </ThemeWrapper>
    </ThemeProvider>
  )
}

export default App
