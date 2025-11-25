import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Shield, Eye, Database, Cookie, Mail, Github } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <div className="pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              MovieVerse is an educational project. This privacy policy explains
              how we handle information in this non-commercial application.
            </p>
          </div>

          {/* Privacy Information */}
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Eye className="w-6 h-6 text-primary" />
                  Information We Collect
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Understanding what data is used in this educational project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  As an educational project, MovieVerse operates with minimal
                  data collection:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>
                    <strong>Movie Data:</strong> Information displayed is
                    fetched from The Movie Database (TMDB) public API
                  </li>
                  <li>
                    <strong>No Personal Data:</strong> We do not collect, store,
                    or process personal information
                  </li>
                  <li>
                    <strong>No User Accounts:</strong> This is a demonstration
                    project without user registration
                  </li>
                  <li>
                    <strong>No Cookies:</strong> No tracking cookies or
                    persistent identifiers are used
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Database className="w-6 h-6 text-primary" />
                  Data Usage
                </CardTitle>
                <CardDescription className="text-gray-400">
                  How movie data is used in this project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  MovieVerse uses publicly available movie data from TMDB for
                  educational purposes:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>To demonstrate API integration techniques</li>
                  <li>To showcase modern React development patterns</li>
                  <li>To display responsive design implementations</li>
                  <li>To illustrate state management in React applications</li>
                </ul>
                <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-sm text-gray-300">
                    <strong>Educational Purpose:</strong> This project serves as
                    a learning tool and portfolio piece, demonstrating
                    full-stack web development skills.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Cookie className="w-6 h-6 text-primary" />
                  Third-Party Services
                </CardTitle>
                <CardDescription className="text-gray-400">
                  External services used in this educational project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  This project integrates with the following third-party
                  services for educational purposes:
                </p>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-700 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">
                      The Movie Database (TMDB) API
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Provides movie information including titles, descriptions,
                      ratings, and images. All data is publicly available and
                      used strictly for educational purposes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Shield className="w-6 h-6 text-primary" />
                  Data Protection
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Privacy and security considerations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Since this is an educational project with no user data
                  collection:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>No personal information is stored or processed</li>
                  <li>No user accounts or authentication systems</li>
                  <li>No tracking or analytics implementation</li>
                  <li>No data sharing with third parties</li>
                  <li>All movie data comes from public APIs</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Mail className="w-6 h-6 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Get in touch for educational inquiries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  For questions about this educational project:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:work.peter.louis@gmail.com"
                    className="flex items-center gap-3 p-4 glass-effect hover-scale hover-lift text-muted-foreground hover:text-foreground"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    <span>work.peter.louis@gmail.com</span>
                  </a>
                  <a
                    href="https://github.com/ozzular"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 glass-effect hover-scale hover-lift text-muted-foreground hover:text-foreground"
                  >
                    <Github className="w-5 h-5 text-primary" />
                    <span>GitHub Profile</span>
                  </a>
                </div>
                <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-400">
                    <strong>Educational Project:</strong> This application is
                    created for learning purposes and demonstrates web
                    development concepts and techniques.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Last Updated</CardTitle>
                <CardDescription className="text-gray-400">
                  Privacy policy version information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  This privacy policy was last updated on{" "}
                  <strong>January 2025</strong> and applies to the MovieVerse
                  educational project.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
