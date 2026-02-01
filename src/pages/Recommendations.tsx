import { useState, useEffect } from "react";
import { Zap, TrendingUp, Heart, Music, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { recommendationsApi, type Recommendation } from "@/services/api";
import { RecommendationSkeleton } from "@/components/ui/skeleton";

interface WeeklyPick {
  id: number;
  title: string;
  artist: string;
  genre: string;
  album: string;
  year: number;
  reason: string;
  spotifyId: string;
  type: string;
}

const fallbackPicks: WeeklyPick[] = [
  {
    id: 1,
    title: "Midnight Drive",
    artist: "Neon Pulse",
    genre: "Synthwave",
    album: "Electric Dreams",
    year: 2025,
    reason:
      "Perfect blend of retro synths and modern production. This track captures the essence of late-night city drives.",
    spotifyId: "64LkgCfNbLqjclQYCTid8L",
    type: "album",
  },
  {
    id: 2,
    title: "Golden Hour",
    artist: "Luna Ray",
    genre: "Indie Pop",
    album: "Sunset Stories",
    year: 2024,
    reason:
      "Ethereal vocals meet dreamy instrumentation. A perfect soundtrack for those peaceful moments.",
    spotifyId: "3NARoU8KzfUJZ6o4mWVIRV",
    type: "album",
  },
  {
    id: 3,
    title: "Urban Poetry",
    artist: "The Wordsmith",
    genre: "Hip-Hop",
    album: "City Tales",
    year: 2025,
    reason:
      "Raw, honest storytelling over crisp beats. This is hip-hop at its finest.",
    spotifyId: "79WcTJuCulopfqul1awYJk",
    type: "album",
  },
];

const fallbackGenres = [
  { name: "Electronic", count: 234 },
  { name: "Hip-Hop", count: 189 },
  { name: "Indie", count: 156 },
  { name: "Jazz", count: 98 },
  { name: "R&B", count: 142 },
  { name: "Rock", count: 176 },
];

const Recommendations = () => {
  const [weeklyPicks, setWeeklyPicks] = useState<WeeklyPick[]>(fallbackPicks);
  const [genres] = useState(fallbackGenres);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await recommendationsApi.getAll();
        if (data && data.length > 0) {
          const mapped: WeeklyPick[] = data.slice(0, 3).map((item: Recommendation, index: number) => {
            // Parse Spotify URL to extract type and ID
            // URL format: https://open.spotify.com/{type}/{id}
            let spotifyType = "track"; // default to track
            let spotifyId = "64LkgCfNbLqjclQYCTid8L"; // fallback ID

            if (item.spotifyUrl) {
              try {
                const url = item.spotifyUrl.replace(/\/$/, ''); // remove trailing slash
                const parts = url.split('/');
                const id = parts.pop();
                const type = parts.pop();

                if (id && type && ['track', 'album', 'playlist'].includes(type)) {
                  spotifyId = id.split('?')[0]; // remove query params if any
                  spotifyType = type;
                }
              } catch (e) {
                console.log('Error parsing Spotify URL:', e);
              }
            }

            return {
              id: index + 1,
              title: item.title,
              artist: item.artist,
              genre: item.genre,
              album: item.album,
              year: new Date().getFullYear(),
              reason: item.description,
              spotifyId,
              type: spotifyType,
            };
          });
          setWeeklyPicks(mapped);
        }
      } catch (error) {
        console.log("Using fallback recommendations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-6 md:px-12">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#3b82f6]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#3b82f6]/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-8">
              <span className="w-2 h-2 bg-[#3b82f6] rounded-full animate-pulse" />
              <span className="text-sm text-gray-600 font-medium tracking-wide uppercase">
                Curated Weekly
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight text-gray-900 mb-6">
              Your Next
              <br />
              <span className="text-[#3b82f6]">Favorite</span> Track
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
              Hand-picked recommendations based on what's hot, what's fresh, and what resonates with music lovers like you.
            </p>
          </div>
        </div>
      </section>

      {/* This Week's Picks */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-[#3b82f6]" />
            <span className="text-[#3b82f6] text-sm font-semibold uppercase tracking-widest">
              Trending Now
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900">
            This Week's Top Picks
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {isLoading ? (
              [...Array(3)].map((_, i) => <RecommendationSkeleton key={i} />)
            ) : weeklyPicks.map((pick, index) => (
              <div
                key={pick.id}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#3b82f6]/30 transition-all duration-500 relative"
              >
                {/* Rank badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="w-12 h-12 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold shadow-lg">
                    #{index + 1}
                  </div>
                </div>

                {/* Spotify Embed */}
                <div className="aspect-square relative">
                  <iframe
                    title={`Spotify Embed: ${pick.title}`}
                    src={`https://open.spotify.com/embed/${pick.type}/${pick.spotifyId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6 border-t border-gray-100">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-semibold mb-3">
                    {pick.genre}
                  </span>

                  <h3 className="text-xl font-bold mb-1 text-gray-900">{pick.title}</h3>
                  <p className="text-gray-500 mb-4">
                    {pick.artist} • {pick.album}
                  </p>

                  <div className="bg-gray-50 rounded-xl p-4 mb-5">
                    <p className="text-sm text-gray-600 italic leading-relaxed">
                      "{pick.reason}"
                    </p>
                  </div>

                  <Button className="w-full bg-[#3b82f6] text-white hover:bg-[#2563eb] rounded-full font-semibold transition-all duration-300 hover:shadow-[0_4px_20px_#3b82f640]">
                    <Heart className="w-4 h-4 mr-2" />
                    Add to Favorites
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Genre */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Music className="w-6 h-6 text-[#3b82f6]" />
                <span className="text-[#3b82f6] text-sm font-semibold uppercase tracking-widest">
                  Explore
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Browse by Genre
              </h2>
            </div>
            <Link
              to="/genres"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#3b82f6] font-semibold transition-colors duration-300"
            >
              View all genres <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {genres.map((genre, index) => (
              <div
                key={genre.name}
                className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#3b82f6]/30 transition-all duration-500 cursor-pointer relative overflow-hidden"
              >
                {/* Background number */}
                <span className="absolute -right-2 -bottom-4 text-8xl font-bold text-gray-50 group-hover:text-[#3b82f6]/5 transition-colors">
                  {index + 1}
                </span>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center group-hover:bg-[#3b82f6] transition-colors duration-300 mb-4">
                    <Music className="w-6 h-6 text-[#3b82f6] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{genre.name}</h3>
                  <p className="text-sm text-gray-500">{genre.count} tracks</p>
                </div>

                <ArrowRight className="absolute bottom-6 right-6 w-5 h-5 text-gray-200 group-hover:text-[#3b82f6] group-hover:translate-x-1 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden bg-gray-900">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="absolute top-0 left-0 w-96 h-96 bg-[#3b82f6]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="w-20 h-20 rounded-full bg-[#3b82f6]/20 flex items-center justify-center mx-auto mb-8">
            <Zap className="w-10 h-10 text-[#3b82f6]" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
            Get Personalized
            <br />
            Recommendations
          </h2>

          <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
            Tell us what you like and we'll curate a custom playlist just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#3b82f6] text-white hover:bg-[#2563eb] rounded-full px-10 py-7 text-lg font-bold shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <Link to="/quiz">
                <Zap className="w-5 h-5 mr-2" />
                Create My Playlist
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-gray-700 text-white hover:bg-white/10 hover:border-gray-500 rounded-full px-10 py-7 text-lg font-semibold transition-all duration-300"
            >
              <Link to="/trivia">
                <Play className="w-5 h-5 mr-2" />
                Take Music Quiz
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recommendations;
