import { motion } from "framer-motion";
import { Play, Film, Zap, Sparkles } from "lucide-react";
import Hero from "../components/Hero";
import ThemeToggle from "../components/ThemeToggle";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <ThemeToggle />
      <Hero />

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="features-section"
      >
        <h2
          style={{
            color: "var(--color-text-primary)",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Why Choose MovieVerse?
        </h2>
        <div className="features-grid">
          <div className="feature-card glass">
            <Film className="feature-icon" />
            <h3>Unlimited Movies</h3>
            <p>Access thousands of movies from around the world</p>
          </div>
          <div className="feature-card glass">
            <Zap className="feature-icon" />
            <h3>Instant Streaming</h3>
            <p>Watch trailers and previews instantly</p>
          </div>
          <div className="feature-card glass">
            <Sparkles className="feature-icon" />
            <h3>Personalized</h3>
            <p>Get recommendations based on your taste</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
