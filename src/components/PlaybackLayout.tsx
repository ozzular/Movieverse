import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { useLayout } from "../hooks/useLayout";

interface PlaybackLayoutProps {
  children: ReactNode;
}

export const PlaybackLayout = ({ children }: PlaybackLayoutProps) => {
  const { showTempSidebar, setShowTempSidebar, isFullscreen, collapsed } = useLayout();
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);

  const sidebarWidth = collapsed ? "60px" : "220px";

  // Don't render anything in fullscreen mode
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full bg-background text-foreground">
      {/* Invisible hover zone for temp sidebar */}
      <div
        className="absolute left-0 top-0 h-full w-4 z-40 cursor-pointer"
        onMouseEnter={() => setIsHoveringLeft(true)}
        onMouseLeave={() => {
          if (!showTempSidebar) setIsHoveringLeft(false);
        }}
      />

      {/* Temporary Sidebar */}
      {(showTempSidebar || isHoveringLeft) && (
        <div
          className="absolute left-0 top-0 h-full bg-sidebar text-sidebar-foreground z-50 transition-all duration-200 ease-in-out shadow-lg"
          style={{ width: sidebarWidth }}
          onMouseEnter={() => setShowTempSidebar(true)}
          onMouseLeave={() => {
            setShowTempSidebar(false);
            setIsHoveringLeft(false);
          }}
        >
          <Sidebar />
        </div>
      )}

      {/* ESC/Menu Button Overlay */}
      <div className="absolute top-4 left-4 z-30">
        <button
          onClick={() => setShowTempSidebar(!showTempSidebar)}
          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-md transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Main Playback Content - Full Width */}
      <div className="flex-1 bg-black">
        {children}
      </div>
    </div>
  );
};
