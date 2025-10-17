import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header-zustand'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import { useMovieStore } from './store/movieStore'
import { tmdbApi } from './services/tmdbApi'
// Global styles are in style.css

function App() {
  const { setGenres, setLoadingGenres } = useMovieStore()

  useEffect(() => {
    // Load genres on app startup
    const loadGenres = async () => {
      try {
        setLoadingGenres(true)
        const genresData = await tmdbApi.getGenres()
        setGenres(genresData.genres)
      } catch (error) {
        console.error('Error loading genres:', error)
      } finally {
        setLoadingGenres(false)
      }
    }

    loadGenres()
  }, [setGenres, setLoadingGenres])

  return (
    <Router>
      <div className="min-h-screen galaxy-gradient">
        <Header />
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App