import { MovieRow } from "@/components/MovieRow";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Trophy, Star, Film } from "lucide-react";

const Awards = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold">Awards & Achievements</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Discover award-winning films and critically acclaimed cinema
          </p>
        </div>

        {/* Awards Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-effect border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">2,500+</p>
                <p className="text-sm text-muted-foreground">Oscar Winners</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,800+</p>
                <p className="text-sm text-muted-foreground">Emmy Winners</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">10,000+</p>
                <p className="text-sm text-muted-foreground">Nominations</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Film className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">95+</p>
                <p className="text-sm text-muted-foreground">Years of Cinema</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Awards Tabs */}
        <Tabs defaultValue="oscars" className="space-y-8">
          <TabsList className="glass-effect w-full justify-start">
            <TabsTrigger value="oscars" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Academy Awards
            </TabsTrigger>
            <TabsTrigger value="golden-globe" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Golden Globes
            </TabsTrigger>
            <TabsTrigger value="cannes" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Film Festivals
            </TabsTrigger>
            <TabsTrigger value="critics" className="flex items-center gap-2">
              <Film className="w-4 h-4" />
              Critics Choice
            </TabsTrigger>
          </TabsList>

          {/* Oscar Winners Tab */}
          <TabsContent value="oscars" className="space-y-8">
            <MovieRow 
              title={`${currentYear} Oscar Contenders`}
              endpoint={`discover/movie?primary_release_year=${currentYear}&sort_by=vote_average.desc&vote_count.gte=500`}
            />
            <MovieRow 
              title={`${currentYear - 1} Award Winners`}
              endpoint={`discover/movie?primary_release_year=${currentYear - 1}&sort_by=vote_average.desc&vote_count.gte=1000`}
            />
            <MovieRow 
              title="Best Picture Winners (All Time)"
              endpoint="discover/movie?sort_by=vote_average.desc&vote_count.gte=5000&with_keywords=210024"
            />
            <MovieRow 
              title="Oscar-Winning Performances"
              endpoint="discover/movie?sort_by=popularity.desc&with_keywords=158718"
            />
          </TabsContent>

          {/* Golden Globe Tab */}
          <TabsContent value="golden-globe" className="space-y-8">
            <MovieRow 
              title="Golden Globe Drama Winners"
              endpoint="discover/movie?sort_by=vote_average.desc&vote_count.gte=1000&with_genres=18"
            />
            <MovieRow 
              title="Golden Globe Comedy/Musical Winners"
              endpoint="discover/movie?sort_by=vote_average.desc&vote_count.gte=500&with_genres=35"
            />
            <MovieRow 
              title="Foreign Language Film Winners"
              endpoint="discover/movie?sort_by=vote_average.desc&vote_count.gte=300&with_original_language=fr|es|de|it|ja|ko"
            />
          </TabsContent>

          {/* Film Festivals Tab */}
          <TabsContent value="cannes" className="space-y-8">
            <MovieRow 
              title="Cannes Palme d'Or Winners"
              endpoint="discover/movie?sort_by=vote_average.desc&vote_count.gte=500&with_keywords=9714"
            />
            <MovieRow 
              title="Sundance Festival Winners"
              endpoint="discover/movie?sort_by=popularity.desc&vote_count.gte=200&with_keywords=262090"
            />
            <MovieRow 
              title="Venice Film Festival Winners"
              endpoint="discover/movie?sort_by=vote_average.desc&vote_count.gte=300&with_keywords=10028"
            />
            <MovieRow 
              title="Berlin Film Festival Winners"
              endpoint="discover/movie?sort_by=vote_average.desc&vote_count.gte=200&with_keywords=158636"
            />
          </TabsContent>

          {/* Critics Choice Tab */}
          <TabsContent value="critics" className="space-y-8">
            <MovieRow 
              title="Critics' Top Rated Films"
              endpoint="movie/top_rated?vote_count.gte=2000"
            />
            <MovieRow 
              title="Critically Acclaimed Recent Releases"
              endpoint={`discover/movie?primary_release_date.gte=${currentYear - 2}-01-01&sort_by=vote_average.desc&vote_count.gte=500`}
            />
            <MovieRow 
              title="Hidden Gems (High Ratings, Lower Popularity)"
              endpoint="discover/movie?sort_by=vote_average.desc&vote_count.gte=100&vote_count.lte=500"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Awards;
