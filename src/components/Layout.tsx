import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { FixedSidebarLayout } from "./FixedSidebarLayout";
import { PlaybackLayout } from "./PlaybackLayout";
import { useLayout } from "../hooks/useLayout";

// Create a layout context to provide state to components
const LayoutContext = createContext<ReturnType<typeof useLayout> | null>(null);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  return context;
};

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const layoutState = useLayout();

  const { isPlaying } = layoutState;

  return (
    <LayoutContext.Provider value={layoutState}>
      {isPlaying ? (
        <PlaybackLayout>{children}</PlaybackLayout>
      ) : (
        <FixedSidebarLayout>{children}</FixedSidebarLayout>
      )}
    </LayoutContext.Provider>
  );
};
