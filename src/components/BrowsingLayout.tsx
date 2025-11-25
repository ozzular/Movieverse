import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { Breadcrumb } from "./Breadcrumb";
import { Chatbot } from "./Chatbot";
import { useLayoutContext } from "./Layout";

interface BrowsingLayoutProps {
  children: ReactNode;
}

export const BrowsingLayout = ({ children }: BrowsingLayoutProps) => {
  const { collapsed } = useLayoutContext();

  const sidebarWidth = collapsed ? "60px" : "220px";

  return (
    <div className="flex min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-background text-foreground">
      {/* Persistent Sidebar */}
      <div
        className="flex-shrink-0 bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out"
        style={{ width: sidebarWidth }}
      >
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-x-hidden">
        <Navbar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Breadcrumb />

          <main className="flex-1 overflow-auto">
            {children}
          </main>

          <Footer />
        </div>
      </div>

      <Chatbot />
    </div>
  );
};
