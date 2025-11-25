import { Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import MovieVerseLogo from "./MovieVerseLogo";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <MovieVerseLogo size="md" />
            </div>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for movies and TV series.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Browse</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/movies"
                  className="hover:text-primary transition-colors"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/series"
                  className="hover:text-primary transition-colors"
                >
                  TV Series
                </Link>
              </li>
              <li>
                <Link
                  to="/trending"
                  className="hover:text-primary transition-colors"
                >
                  Trending
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:work.peter.louis@gmail.com"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ozzular"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 MovieVerse. All rights reserved. Powered by TMDB.
          </p>
          <p className="text-sm font-medium text-white">
            Made with ❤️ by Ozzular for movie lovers
          </p>
        </div>
      </div>
    </footer>
  );
};
