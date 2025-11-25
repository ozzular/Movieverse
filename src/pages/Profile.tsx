import React, { useState, useEffect } from "react";
import {
  Settings,
  Sun,
  Moon,
  Globe,
  User,
  Bell,
  Shield,
  Palette,
  Monitor,
  MapPin,
  Sliders,
  Save,
  Edit,
  Languages,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { useRegion } from "../contexts/RegionContext";
import {
  getAvailableRegions,
  getRegionalContent,
} from "../services/geolocation";

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const { themeMode, setThemeMode, currentTheme, sunriseTime, sunsetTime } =
    useTheme();
  const { showLocationModal, setShowLocationModal, refreshContent, setSelectedRegion } =
    useRegion();

  const [selectedRegionLocal, setSelectedRegionLocal] = useState("US");
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language || "en",
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "ja", name: "日本語" },
  ];

  const handleThemeChange = (mode: "day" | "night" | "auto") => {
    setThemeMode(mode);
  };

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setSelectedLanguage(languageCode);
    localStorage.setItem("movieverse-language", languageCode);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegionLocal(region);
    // update context (will persist & refresh)
    setSelectedRegion(region);
  };

  const availableRegions = getAvailableRegions();

  // Load saved preferences on mount
  useEffect(() => {
    const savedRegion = localStorage.getItem("movieverse-region");
    const savedLanguage = localStorage.getItem("movieverse-language");

    if (savedRegion && availableRegions.find((r) => r.code === savedRegion)) {
      setSelectedRegion(savedRegion);
    }

    if (savedLanguage && languages.find((l) => l.code === savedLanguage)) {
      setSelectedLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Settings
          </h1>
          <p className="text-xl text-gray-300">
            Customize your MovieVerse experience
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Appearance Settings */}
          <div className="glass-card p-8 rounded-xl">
            <div className="flex items-center mb-6">
              <Palette className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Appearance</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-white mb-3">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleThemeChange("day")}
                    className={`glass-card p-4 rounded-lg flex items-center space-x-2 transition-all hover:scale-105 ${
                      themeMode === "day" ? "ring-2 ring-white/50" : ""
                    }`}
                  >
                    <Sun className="w-5 h-5 text-yellow-400" />
                    <span className="text-white">Light</span>
                  </button>

                  <button
                    onClick={() => handleThemeChange("night")}
                    className={`glass-card p-4 rounded-lg flex items-center space-x-2 transition-all hover:scale-105 ${
                      themeMode === "night" ? "ring-2 ring-white/50" : ""
                    }`}
                  >
                    <Moon className="w-5 h-5 text-blue-400" />
                    <span className="text-white">Dark</span>
                  </button>

                  <button
                    onClick={() => handleThemeChange("auto")}
                    className={`glass-card p-4 rounded-lg flex items-center space-x-2 transition-all hover:scale-105 ${
                      themeMode === "auto" ? "ring-2 ring-white/50" : ""
                    }`}
                  >
                    <Monitor className="w-5 h-5 text-green-400" />
                    <span className="text-white">Auto</span>
                  </button>
                </div>
              </div>

              {themeMode === "auto" && sunriseTime && sunsetTime && (
                <div className="glass-card p-4 rounded-lg bg-white/5">
                  <h3 className="text-white font-semibold mb-2">
                    Day/Night Schedule
                  </h3>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>🌅 Sunrise: {sunriseTime.toLocaleTimeString()}</span>
                    <span>🌙 Sunset: {sunsetTime.toLocaleTimeString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location Settings */}
          <div className="glass-card p-8 rounded-xl">
            <div className="flex items-center mb-6">
              <Globe className="w-8 h-8 text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Location</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-white mb-3">
                  Region for Trending Content
                </label>
                <select
                  value={selectedRegionLocal}
                  onChange={(e) => handleRegionChange(e.target.value)}
                  className="w-full glass-card px-4 py-3 rounded-lg text-white bg-black/20 border border-white/20 focus:border-white/50 transition-colors"
                >
                  {availableRegions.map(
                    (region: { code: string; name: string }) => (
                      <option
                        key={region.code}
                        value={region.code}
                        className="bg-gray-800 text-white"
                      >
                        {region.name}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <button
                onClick={() => setShowLocationModal(true)}
                className="glass-card p-4 rounded-lg hover:bg-white/10 transition-colors w-full flex items-center space-x-3"
              >
                <MapPin className="w-5 h-5 text-green-400" />
                <span className="text-white">Detect My Location</span>
              </button>
            </div>
          </div>

          {/* Language Settings */}
          <div className="glass-card p-8 rounded-xl">
            <div className="flex items-center mb-6">
              <Languages className="w-8 h-8 text-green-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Language</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-white mb-3">
                  Application Language
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`glass-card p-4 rounded-lg flex items-center justify-center transition-all hover:scale-105 ${
                        selectedLanguage === language.code
                          ? "ring-2 ring-white/50"
                          : ""
                      }`}
                    >
                      <span className="text-white font-medium">
                        {language.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-400">
                <p>
                  Note: Language changes require a page refresh to take full
                  effect.
                </p>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="glass-card p-8 rounded-xl">
            <div className="flex items-center mb-6">
              <Sliders className="w-8 h-8 text-orange-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Preferences</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Notifications</h3>
                  <p className="text-gray-400 text-sm">
                    Get notified about new releases
                  </p>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationsEnabled ? "bg-blue-500" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationsEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">
                    Auto-play Trailers
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Automatically play trailers when available
                  </p>
                </div>
                <button className="glass-card px-3 py-1 rounded-lg text-sm hover:bg-white/10 transition-colors">
                  <span className="text-white">Disabled</span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Content Rating</h3>
                  <p className="text-gray-400 text-sm">Filter mature content</p>
                </div>
                <button className="glass-card px-3 py-1 rounded-lg text-sm hover:bg-white/10 transition-colors">
                  <span className="text-white">PG-13</span>
                </button>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="glass-card p-8 rounded-xl">
            <div className="flex items-center mb-6">
              <User className="w-8 h-8 text-cyan-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Account</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">MovieVerse User</h3>
                  <p className="text-gray-400">user@movieverse.dev</p>
                </div>
                <button className="glass-card p-2 rounded-lg hover:bg-white/10 transition-colors ml-auto">
                  <Edit className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="space-y-3">
                <button className="glass-card p-4 rounded-lg hover:bg-white/10 transition-colors w-full text-left flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-white">Privacy & Security</span>
                </button>

                <button className="glass-card p-4 rounded-lg hover:bg-white/10 transition-colors w-full text-left flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">Notification Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Settings */}
        <div className="text-center mt-12">
          <button className="glass-card px-8 py-4 rounded-xl flex items-center space-x-2 hover:bg-white/10 transition-colors mx-auto">
            <Save className="w-6 h-6 text-green-400" />
            <span className="text-white font-semibold text-lg">
              Save Settings
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
