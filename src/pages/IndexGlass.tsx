import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedMovies from "../components/FeaturedMovies";
import CTASection from "../components/CTASection";
import Footer from "../components/FooterNew";

const IndexGlass = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      <Navbar />
      <Hero />
      <FeaturedMovies />
      <CTASection />
      <Footer />
    </div>
  );
};

export default IndexGlass;