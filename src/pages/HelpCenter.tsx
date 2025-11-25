import Navbar from "../components/Navbar";
import Footer from "../components/FooterNew";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BookOpen, Code, Database, Users, Mail, Github } from "lucide-react";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Help Center
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Welcome to the MovieVerse Help Center. This is an educational
              project showcasing modern web development techniques and movie
              database integration.
            </p>
          </div>

          {/* Project Information */}
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BookOpen className="w-6 h-6 text-primary" />
                  About MovieVerse
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Understanding this educational project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  MovieVerse is an educational project built to demonstrate
                  modern web development practices including:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>React 18 with TypeScript for type-safe development</li>
                  <li>
                    Vite for fast build tooling and development experience
                  </li>
                  <li>Tailwind CSS for utility-first styling</li>
                  <li>shadcn/ui components for consistent UI elements</li>
                  <li>TMDB API integration for real movie data</li>
                  <li>Responsive design for all screen sizes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Code className="w-6 h-6 text-primary" />
                  Technical Features
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Technologies and features implemented
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Frontend Technologies
                    </h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>• React 18 with hooks</li>
                      <li>• TypeScript for type safety</li>
                      <li>• Tailwind CSS for styling</li>
                      <li>• Lucide React for icons</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Key Features
                    </h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Auto-sliding movie carousel</li>
                      <li>• Real-time movie data from TMDB</li>
                      <li>• Glassmorphism design effects</li>
                      <li>• Responsive layouts</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Database className="w-6 h-6 text-primary" />
                  Data Sources
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Information about the movie data used
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  MovieVerse uses the <strong>The Movie Database (TMDB)</strong>{" "}
                  API to fetch real movie information including:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Movie titles, descriptions, and release dates</li>
                  <li>Poster images and backdrop images</li>
                  <li>User ratings and popularity scores</li>
                  <li>Genre classifications</li>
                </ul>
                <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-400">
                    <strong>Note:</strong> This project is for educational
                    purposes only and is not affiliated with or endorsed by
                    TMDB.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="w-6 h-6 text-primary" />
                  Getting Started
                </CardTitle>
                <CardDescription className="text-gray-400">
                  How to use the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  MovieVerse is designed as a movie discovery platform where you
                  can:
                </p>
                <ol className="list-decimal list-inside text-gray-300 space-y-2 ml-4">
                  <li>Browse featured movies in the hero carousel</li>
                  <li>Explore popular movies in the featured section</li>
                  <li>
                    Navigate through different sections using the top navigation
                  </li>
                  <li>Toggle between day and night themes</li>
                  <li>
                    Click "Enter the Verse" to access the main application
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Mail className="w-6 h-6 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Get in touch with the developer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:work.peter.louis@gmail.com"
                    className="flex items-center gap-3 p-4 glass-card hover:scale-105 transition-transform text-gray-300 hover:text-white"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    <span>work.peter.louis@gmail.com</span>
                  </a>
                  <a
                    href="https://github.com/ozzular"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 glass-card hover:scale-105 transition-transform text-gray-300 hover:text-white"
                  >
                    <Github className="w-5 h-5 text-primary" />
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpCenter;
