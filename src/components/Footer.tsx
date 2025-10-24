import { Link } from "react-router-dom";
import { GitHub, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex items-start gap-3">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
              Privacy Policy
            </Link>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <span>work.peter.louis@gmail.com</span>
          </div>
          <div className="flex items-start gap-3">
            <GitHub className="w-5 h-5 text-primary" />
            <Link to="https://github.com/peterlouis" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
              GitHub
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-gray-500">
            © 2025 MovieVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;