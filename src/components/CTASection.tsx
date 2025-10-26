import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  const handleEnterTheVerse = () => {
    navigate('/app');
  };

  return (
    <section className="py-32 relative rounded-2xl mx-4 md:mx-8">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in p-8 border-2 border-white/20 bg-white/10 backdrop-blur-sm rounded-2xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Enter the MovieVerse
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Discover endless cinematic possibilities in our curated universe
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-xl bg-red-600 hover:bg-red-700 text-white hover:scale-105 transition-all duration-300 border-0"
            onClick={handleEnterTheVerse}
          >
            Start Exploring Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
