import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { tmdbApi } from '../services/tmdbApi';
import type { Movie } from '../types/index';

const Hero: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await tmdbApi.getPopularMovies();
        setMovies(popularMovies.slice(0, 5)); // Take top 5
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % movies.length);
    }, 4000); // Slide every 4 seconds
    return () => clearInterval(timer);
  }, [movies]);

  return (
    <div className="hero">
      <div className="hero-carousel">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            className="hero-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === current ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{
              backgroundImage: movie.backdrop_path ? `url(${tmdbApi.getBackdropUrl(movie.backdrop_path)})` : 'none',
            }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-panel hero-content"
      >
        <h1>Welcome to MovieVerse</h1>
        <p>Discover your cinematic universe. Unlimited entertainment at your fingertips.</p>
        <button
          className="cta-btn"
          onClick={() => navigate('/home')}
        >
          Enter MovieVerse
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;
