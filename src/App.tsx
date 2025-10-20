import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { SearchProvider } from './contexts/SearchContext'
import { GenreProvider } from './contexts/GenreContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { FilterProvider } from './contexts/FilterContext'
import { SelectedMovieProvider } from './contexts/SelectedMovieContext'
import { ThemeProvider } from './contexts/ThemeContext'
import ThemeWrapper from './components/ThemeWrapper'
import { RegionProvider } from './contexts/RegionContext'
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

function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="galaxy-gradient flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuClick={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} />
        <main className="pb-20 flex-1">
          {children}
        </main>
      </div>
      <Chatbot />
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  if (isLandingPage) {
    return <LandingPage />
  }

  return (
    <Layout>
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
    </Layout>
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