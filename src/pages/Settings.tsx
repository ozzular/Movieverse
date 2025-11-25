import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem("language", value);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>

        <div className="bg-card rounded-lg p-6 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Display</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                MovieVerse uses a modern light theme for optimal viewing
                experience.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Language</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label className="text-base">Preferred Language</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred language for the interface
                  </p>
                </div>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="ko">한국어</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <div className="space-y-2">
              <p className="text-muted-foreground">MovieVerse v1.0</p>
              <p className="text-sm text-muted-foreground">
                Powered by The Movie Database (TMDB)
              </p>
              <p className="text-sm text-muted-foreground">
                Discover movies, TV series, and actors from around the world
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
