import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  genre: string;
  yearRange: [number, number];
  minRating: number;
}

const genres = [
  { id: "28", name: "Action" },
  { id: "12", name: "Adventure" },
  { id: "16", name: "Animation" },
  { id: "35", name: "Comedy" },
  { id: "80", name: "Crime" },
  { id: "99", name: "Documentary" },
  { id: "18", name: "Drama" },
  { id: "10751", name: "Family" },
  { id: "14", name: "Fantasy" },
  { id: "36", name: "History" },
  { id: "27", name: "Horror" },
  { id: "10402", name: "Music" },
  { id: "9648", name: "Mystery" },
  { id: "10749", name: "Romance" },
  { id: "878", name: "Science Fiction" },
  { id: "10770", name: "TV Movie" },
  { id: "53", name: "Thriller" },
  { id: "10752", name: "War" },
  { id: "37", name: "Western" },
];

export const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [yearRange, setYearRange] = useState<[number, number]>([1980, 2025]);
  const [minRating, setMinRating] = useState<number>(0);

  const handleApplyFilters = () => {
    onFilterChange({
      genre: selectedGenre,
      yearRange,
      minRating,
    });
  };

  const handleResetFilters = () => {
    setSelectedGenre("all");
    setYearRange([1980, 2025]);
    setMinRating(0);
    onFilterChange({
      genre: "all",
      yearRange: [1980, 2025],
      minRating: 0,
    });
  };

  return (
    <div className="mb-6">
      <Button
        variant="outline"
        onClick={() => setShowFilters(!showFilters)}
        className="gap-2"
      >
        <Filter className="w-4 h-4" />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>

      {showFilters && (
        <div className="mt-4 p-4 glass-effect rounded-lg space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Genre</label>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Year Range: {yearRange[0]} - {yearRange[1]}
            </label>
            <Slider
              min={1980}
              max={2025}
              step={1}
              value={yearRange}
              onValueChange={(value) => setYearRange(value as [number, number])}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Minimum Rating: {minRating.toFixed(1)}
            </label>
            <Slider
              min={0}
              max={10}
              step={0.5}
              value={[minRating]}
              onValueChange={(value) => setMinRating(value[0])}
              className="w-full"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleApplyFilters} className="flex-1">
              Apply Filters
            </Button>
            <Button onClick={handleResetFilters} variant="outline">
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
