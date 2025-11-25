import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { Breadcrumb } from "./Breadcrumb";
import { Chatbot } from "./Chatbot";
import { Menu, X } from "lucide-react";

// Create a context for sidebar state
interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a FixedSidebarLayout");
  }
  return context;
};

interface FixedSidebarLayoutProps {
  children: ReactNode;
}

export const FixedSidebarLayout = ({ children }: FixedSidebarLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Fixed Sidebar */}
        <div
          className={`sidebar fixed left-0 top-0 h-full z-40 bg-background text-sidebar-foreground overflow-hidden transition-transform duration-300 ease-in-out w-[220px] ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:block`}
        >
          <div className="h-full flex flex-col">
            <Sidebar />
          </div>
        </div>

        {/* Hamburger Menu Button - Now properly controlling sidebar */}
        <button
          className="hamburger fixed top-4 left-4 z-50 p-3 bg-black/80 hover:bg-black/90 backdrop-blur-sm border border-gray-600 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>

        {/* Main Content Area */}
        <div className="main-content flex flex-col min-h-screen lg:ml-[220px]">
          {/* Top Navigation */}
          <div className="sticky top-0 z-30 bg-background">
            <Navbar />
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <Breadcrumb />

            <main className="flex-1 overflow-auto">
              {children}
            </main>

            <Footer />
          </div>
        </div>

        {/* Chatbot */}
        <Chatbot />

        {/* Overlay for mobile sidebar */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </SidebarContext.Provider>
  );
};