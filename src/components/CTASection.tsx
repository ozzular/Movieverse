import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  const handleEnterTheVerse = () => {
    navigate('/app');
  };

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/90 via-background/95 to-black pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-t from-background/0 via-red-900/40 to-background pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="glass-card p-12 md:p-16 text-center max-w-4xl mx-auto animate-fade-in relative overflow-hidden">
          {/* Netflix-style gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/40 via-red-800/30 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
              Enter the MovieVerse
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Discover endless cinematic possibilities in our curated universe
            </p>
            <Button
              size="lg"
              className="text-lg px-8 py-6 hover:scale-105 transition-transform bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-black"
              onClick={handleEnterTheVerse}
            >
              Start Exploring Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;