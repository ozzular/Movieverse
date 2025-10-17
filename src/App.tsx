import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { SearchProvider } from './contexts/SearchContext'
import { GenreProvider } from './contexts/GenreContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { FilterProvider } from './contexts/FilterContext'
import { SelectedMovieProvider } from './contexts/SelectedMovieContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Chatbot from './components/Chatbot'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import SearchResults from './pages/SearchResults'
import GenresPage from './pages/GenrePage'
import MoviesPage from './pages/MoviesPage'
import SeriesPage from './pages/SeriesPage'
import FiltersPage from './pages/FiltersPage'

function AppRoutes() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Show loading indicator while on landing page transition
  if (location.pathname === '/landing' && location.search) {
    // Handle any loading state if needed
  }

  const isLandingPage = location.pathname === '/'

  return (
    <div className="min-h-screen">
      {!isLandingPage && (
        <>
          <div className="galaxy-gradient flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col lg:ml-0">
              <Header onMenuClick={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} />
              <main className="pb-20 flex-1">
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
                </Routes>
              </main>
            </div>
          </div>
          <Chatbot />
        </>
      )}

      {isLandingPage && (
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      )}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}

export default App
