import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { RegionProvider } from "./contexts/RegionContext";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Trending from "./pages/Trending";
import Settings from "./pages/Settings";
import MovieDetail from "./pages/MovieDetail";
import Actors from "./pages/Actors";
import ActorDetail from "./pages/ActorDetail";
import DirectorDetail from "./pages/DirectorDetail";
import Awards from "./pages/Awards";
import Watchlist from "./pages/Watchlist";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RegionProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/actors" element={<Actors />} />
              <Route path="/actor/:id" element={<ActorDetail />} />
              <Route path="/director/:id" element={<DirectorDetail />} />
              <Route path="/awards" element={<Awards />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </RegionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
