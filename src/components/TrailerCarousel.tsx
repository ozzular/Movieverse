import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface Video {
  id: string;
  key: string;
  name: string;
  type: string;
  site: string;
}

interface TrailerCarouselProps {
  movieId: number;
}

export const TrailerCarousel = ({ movieId }: TrailerCarouselProps) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    fetchVideos();
  }, [movieId]);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
      );
      const data = await response.json();
      const trailers = data.results.filter(
        (video: Video) =>
          video.site === "YouTube" &&
          (video.type === "Trailer" || video.type === "Teaser"),
      );
      setVideos(trailers);
      if (trailers.length > 0) {
        setSelectedVideo(trailers[0]);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("trailer-thumbnails");
    if (container) {
      const scrollAmount = 300;
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  if (videos.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Trailers & Videos</h2>

      {/* Main video player */}
      {selectedVideo && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${selectedVideo.key}`}
            title={selectedVideo.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}

      {/* Thumbnail carousel */}
      {videos.length > 1 && (
        <div className="relative group">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div
            id="trailer-thumbnails"
            className="flex gap-3 overflow-x-auto hide-scrollbar pb-2"
          >
            {videos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`flex-shrink-0 cursor-pointer transition-all ${
                  selectedVideo?.id === video.id
                    ? "ring-2 ring-primary scale-105"
                    : "hover:scale-105"
                }`}
              >
                <div className="relative w-48 aspect-video rounded-lg overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                    alt={video.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
                <p className="text-sm mt-2 line-clamp-2">{video.name}</p>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      )}
    </div>
  );
};
