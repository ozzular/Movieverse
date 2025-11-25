/**
 * Movie Overview Component
 * Displays movie synopsis/overview text
 */

interface MovieOverviewProps {
  overview: string | null;
  isLoading?: boolean;
}

export const MovieOverview = ({ overview, isLoading }: MovieOverviewProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-4 bg-slate-700 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-slate-700 rounded animate-pulse w-5/6"></div>
        <div className="h-4 bg-slate-700 rounded animate-pulse w-4/6"></div>
      </div>
    );
  }

  if (!overview) {
    return (
      <p className="text-muted-foreground italic">
        No synopsis available for this movie.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <p className="text-lg leading-relaxed text-foreground/90">{overview}</p>
    </div>
  );
};
