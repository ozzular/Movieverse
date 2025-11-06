import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Info } from "lucide-react";
import { Button } from "./ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  isLocal?: boolean;
}

const localHeroMovies: Movie[] = [
  {
    id: 1,
    title: "Explosive Action",
    backdrop_path: hero1,
    overview: "Experience heart-pounding action with stunning visual effects and non-stop excitement.",
    vote_average: 8.5,
    isLocal: true,
  },
  {
    id: 2,
    title: "Timeless Romance",
    backdrop_path: hero2,
    overview: "A beautiful love story that transcends time and captures the essence of true connection.",
    vote_average: 8.2,
    isLocal: true,
  },
  {
    id: 3,
    title: "Cyber Future",
    backdrop_path: hero3,
    overview: "Dive into a thrilling cyberpunk world where technology and humanity collide.",
    vote_average: 8.8,
    isLocal: true,
  },
  {
    id: 4,
    title: "Dark Mysteries",
    backdrop_path: hero4,
    overview: "Uncover the secrets hidden in the shadows in this spine-chilling horror experience.",
    vote_average: 7.9,
    isLocal: true,
  },
  {
    id: 5,
    title: "Epic Quest",
    backdrop_path: hero5,
    overview: "Embark on an unforgettable fantasy adventure filled with magic and wonder.",
    vote_average: 8.6,
    isLocal: true,
  },
];

export const HeroCarousel = () => {
  const [movies, setMovies] = useState<Movie[]>(localHeroMovies);
  const [scrollY, setScrollY] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchHeroMovies();
  }, []);

  const fetchHeroMovies = async () => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      if (!apiKey) {
        console.log("Using local hero images");
        return;
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setMovies(data.results.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching hero movies:", error);
    }
  };

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative w-full h-[80vh] overflow-hidden -mt-16 pt-16">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {movies.map((movie) => (
            <div key={movie.id} className="embla__slide flex-[0_0_100%] relative">
              <div 
                className="absolute inset-0"
                style={{
                  transform: `translateY(${scrollY * 0.5}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <img
                  src={
                    movie.isLocal
                      ? movie.backdrop_path
                      : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  }
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, hsl(0 0% 8%) 0%, transparent 60%, hsl(0 0% 8% / 0.6) 100%)",
                  }}
                />
              </div>

              <div className="relative h-full flex items-end">
                <div className="container mx-auto px-4 pb-20 ml-20">
                  <div className="max-w-2xl space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
                    <div className="flex items-center gap-4">
                      <span className="text-primary font-semibold">
                        ⭐ {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-lg text-foreground/90 line-clamp-3">
                      {movie.overview}
                    </p>
                    <div className="flex gap-4 pt-4">
                      <Button 
                        size="lg" 
                        className="gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white hover:scale-105 active:scale-95 transition-all shadow-lg"
                        style={{
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                        }}
                      >
                        <Play className="w-5 h-5" fill="currentColor" />
                        Play
                      </Button>
                      <Button 
                        size="lg" 
                        className="gap-2 bg-black/40 hover:bg-black/50 backdrop-blur-md border border-white/20 text-white hover:scale-105 active:scale-95 transition-all shadow-lg"
                        style={{
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                        }}
                      >
                        <Info className="w-5 h-5" />
                        More Info
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-24 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
        onClick={scrollNext}
      >
        <ChevronRight className="w-8 h-8" />
      </Button>
    </div>
  );
};
