/**
 * Directors List Component
 * Displays list of directors
 */

import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Director {
  id: number;
  name: string;
  profile_path: string | null;
}

interface DirectorsListProps {
  directors: Director[];
  isLoading?: boolean;
}

export const DirectorsList = ({ directors, isLoading }: DirectorsListProps) => {
  if (isLoading) {
    return (
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Directors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-4 bg-slate-700 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!directors || directors.length === 0) {
    return (
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Directors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No director information available.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Directors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {directors.map((director) => (
            <div key={director.id} className="py-2">
              <p className="font-medium">{director.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
