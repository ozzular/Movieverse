import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SearchProvider } from './contexts/SearchContext'
import { GenreProvider } from './contexts/GenreContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import Header from './components/Header'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import './App.css'

function App() {
  return (
    <SearchProvider>
      <GenreProvider>
        <FavoritesProvider>
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
        </FavoritesProvider>
      </GenreProvider>
    </SearchProvider>
  )
}

export default App