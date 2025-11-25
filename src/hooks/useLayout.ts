import { useState, useEffect, useCallback } from "react";

interface LayoutState {
  isPlaying: boolean;
  isFullscreen: boolean;
  showTempSidebar: boolean;
  collapsed: boolean;
}

export const useLayout = () => {
  const [state, setState] = useState<LayoutState>({
    isPlaying: false,
    isFullscreen: false,
    showTempSidebar: false,
    collapsed: false,
  });

  const setIsPlaying = useCallback((playing: boolean) => {
    setState(prev => ({
      ...prev,
      isPlaying: playing,
      showTempSidebar: playing ? false : prev.showTempSidebar,
    }));
  }, []);

  const setIsFullscreen = useCallback((fullscreen: boolean) => {
    setState(prev => ({
      ...prev,
      isFullscreen: fullscreen,
    }));
  }, []);

  const setShowTempSidebar = useCallback((show: boolean) => {
    setState(prev => ({
      ...prev,
      showTempSidebar: show,
    }));
  }, []);

  const toggleCollapsed = useCallback(() => {
    setState(prev => ({
      ...prev,
      collapsed: !prev.collapsed,
    }));
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && state.showTempSidebar && state.isPlaying) {
        setShowTempSidebar(false);
      }
    };

    const handleKeyShortcut = (e: KeyboardEvent) => {
      if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (state.isPlaying) {
          setShowTempSidebar(!state.showTempSidebar);
        } else {
          toggleCollapsed();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleKeyShortcut);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleKeyShortcut);
    };
  }, [state.showTempSidebar, state.isPlaying, setShowTempSidebar, toggleCollapsed]);

  return {
    ...state,
    setIsPlaying,
    setIsFullscreen,
    setShowTempSidebar,
    toggleCollapsed,
  };
};
