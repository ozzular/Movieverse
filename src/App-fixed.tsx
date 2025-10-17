import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
// Global styles are in style.css

function App() {
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