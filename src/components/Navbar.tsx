import { User, Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { SearchAutocomplete } from "./SearchAutocomplete";
import { useNavigate } from "react-router-dom";
import MovieVerseLogo from "./MovieVerseLogo";
import { useRegion } from "../contexts/RegionContext";
import { getAvailableRegions, getCountryFlag } from "../services/geolocation";
import WelcomeBanner from "./WelcomeBanner";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full h-16">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <MovieVerseLogo size="md" />
          </div>
        </div>

        <div className="flex-1 mx-8 flex items-center gap-4">
          <WelcomeBanner />
          <SearchAutocomplete />
        </div>

        <div className="flex items-center gap-2">
          {/* Region selector */}
          <RegionSelector />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/watchlist")}
            className="hover-lift active-press"
          >
            <Bookmark className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="hover-lift active-press"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

function RegionSelector() {
  const { selectedRegion, setSelectedRegion } = useRegion();
  const regions = getAvailableRegions();

  return (
    <select
      aria-label="Select region"
      value={selectedRegion.code}
      onChange={(e) => {
        const code = e.target.value;
        const r = regions.find((x) => x.code === code);
        if (r) setSelectedRegion({ code: r.code, name: r.name });
      }}
      className="bg-secondary/60 text-sm rounded px-2 py-1 border border-border"
    >
      {regions.map((r) => (
        <option key={r.code} value={r.code}>
          {getCountryFlag(r.code)} {r.name}
        </option>
      ))}
    </select>
  );
}

function RegionPill() {
  const { selectedRegion, restoreAuto } = useRegion();

  return (
    <div className="flex items-center gap-2">
      <div className="px-3 py-1 rounded-full bg-secondary/60 text-sm flex items-center gap-2">
        <span className="text-sm">{getCountryFlag(selectedRegion.code)}</span>
        <span className="font-medium">{selectedRegion.name}</span>
      </div>
      <button
        onClick={() => restoreAuto()}
        className="text-xs text-muted-foreground hover:text-foreground"
        aria-label="Restore automatic region"
      >
        Restore auto
      </button>
    </div>
  );
}
