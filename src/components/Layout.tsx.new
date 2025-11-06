import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { Chatbot } from "./Chatbot";
import { Breadcrumb } from "./Breadcrumb";
import { SidebarProvider } from "./ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col w-full">
          <Navbar />
          
          <main className="flex-1">
            <Breadcrumb />
            {children}
          </main>
          
          <Footer />
        </div>

        <Chatbot />
      </div>
    </SidebarProvider>
  );
};
