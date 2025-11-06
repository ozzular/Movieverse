import { useEffect, useState } from "react";
import { MovieRow } from "./MovieRow";

export const RegionalTrending = () => {
  const [region, setRegion] = useState<string>("US");

  useEffect(() => {
    detectRegion();
  }, []);

  const detectRegion = async () => {
    try {
      // Using ipapi.co for geolocation (free tier: 1000 requests/day)
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      setRegion(data.country_code || "US");
    } catch (error) {
      console.error("Error detecting region:", error);
      setRegion("US"); // fallback to US
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Trending in Your Region</h2>
        <span className="text-sm text-muted-foreground">({region})</span>
      </div>
      <MovieRow 
        title={`Popular in ${region}`} 
        endpoint={`movie/popular?region=${region}`} 
      />
    </div>
  );
};
