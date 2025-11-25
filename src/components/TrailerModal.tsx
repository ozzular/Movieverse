import React from "react";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerKey: string | null;
  title: string;
}

const TrailerModal: React.FC<TrailerModalProps> = ({
  isOpen,
  onClose,
  trailerKey,
  title,
}) => {
  if (!isOpen || !trailerKey) return null;

  const trailerUrl = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--glass)] backdrop-blur-[24px]"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-[var(--glass)] hover:bg-[var(--glass-hover)] text-white rounded-full transition-all duration-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Trailer Container */}
        <div className="relative pb-[56.25%]">
          {" "}
          {/* 16:9 aspect ratio */}
          <iframe
            src={trailerUrl}
            title={`${title} - Trailer`}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
