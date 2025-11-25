import { useEffect, useState } from "react";

export default function WelcomeBanner() {
  const [greeting, setGreeting] = useState<string>("Welcome");
  const [temp, setTemp] = useState<number | null>(null);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const loadWeather = async () => {
      try {
        // Use ipapi to get approximate location
        const locRes = await fetch("https://ipapi.co/json/");
        if (!locRes.ok) return;
        const loc = await locRes.json();
        const lat = loc.latitude;
        const lon = loc.longitude;
        setCity(loc.city || loc.region || null);

        if (typeof lat === "number" && typeof lon === "number") {
          // Open-Meteo public API
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius`,
          );
          if (!weatherRes.ok) return;
          const w = await weatherRes.json();
          setTemp(Math.round(w.current_weather?.temperature));
        }
      } catch (e) {
        // ignore
      }
    };

    loadWeather();
  }, []);

  return (
    <div className="opacity-100 text-sm text-muted-foreground flex items-center gap-3">
      <div className="font-medium text-foreground">
        {greeting}
        {city ? `, ${city}` : ""}
      </div>
      {temp !== null && (
        <div className="text-xs text-muted-foreground">
          {temp}°C — perfect for a chill movie
        </div>
      )}
    </div>
  );
}
