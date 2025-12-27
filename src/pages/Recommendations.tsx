import { Sparkles, TrendingUp, Heart, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Recommendations = () => {
  const weeklyPicks = [
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

  const genres = [
    {
      name: "Electronic",
      icon: "🎹",
      color: "from-purple-500 to-pink-500",
      count: 234,
    },
    { name: "Hip-Hop", icon: "🎤", color: "from-orange-500 to-red-500", count: 189 },
    { name: "Indie", icon: "🎸", color: "from-blue-500 to-cyan-500", count: 156 },
    { name: "Jazz", icon: "🎺", color: "from-yellow-500 to-orange-500", count: 98 },
    { name: "R&B", icon: "🎵", color: "from-pink-500 to-purple-500", count: 142 },
    { name: "Rock", icon: "🎸", color: "from-red-500 to-orange-500", count: 176 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-[var(--electric-blue)] to-[var(--vibrant-purple)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 rounded-full border-4 border-white"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full border-8 border-white"></div>
          <div className="absolute top-40 right-40 w-24 h-24 bg-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Curated Weekly</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Your Next Favorite Track
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Hand-picked recommendations based on what's hot, what's fresh, and
            what resonates with music lovers like you
          </p>
        </div>
      </section>

      {/* This Week's Picks */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <TrendingUp className="w-8 h-8 text-[var(--electric-blue)]" />
            <h2 className="text-3xl font-bold">This Week's Top Picks</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {weeklyPicks.map((pick, index) => (
              <Card
                key={pick.id}
                className="overflow-hidden hover-lift hover-glow border-gray-200 relative"
              >
                <div className="absolute top-4 right-4 z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--electric-blue)] to-[var(--vibrant-purple)] flex items-center justify-center text-white font-bold shadow-lg">
                    #{index + 1}
                  </div>
                </div>

                <div className="aspect-square relative">
                  <iframe
                    title={`Spotify Embed: ${pick.title}`}
                    src={`https://open.spotify.com/embed/${pick.type}/${pick.spotifyId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-t-lg"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-white bg-gradient-to-r from-[var(--electric-blue)] to-[var(--vibrant-purple)] px-3 py-1 rounded-full">
                      {pick.genre}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{pick.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {pick.artist} • {pick.album}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-700 italic">
                      "{pick.reason}"
                    </p>
                  </div>
                  <Button className="w-full gradient-bg-ocean text-white hover:opacity-90">
                    <Heart className="w-4 h-4 mr-2" />
                    Add to Favorites
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Genre */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Music2 className="w-8 h-8 text-[var(--electric-blue)]" />
            <h2 className="text-3xl font-bold">Browse by Genre</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {genres.map((genre) => (
              <Card
                key={genre.name}
                className={`p-6 hover-lift hover-glow cursor-pointer border-0 bg-gradient-to-br ${genre.color} text-white relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-3">{genre.icon}</div>
                  <h3 className="font-bold text-lg mb-1">{genre.name}</h3>
                  <p className="text-sm opacity-90">{genre.count} tracks</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Recommendations CTA */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-[var(--cyber-yellow)]" />
          <h2 className="text-4xl font-bold mb-4">
            Get Personalized Recommendations
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Tell us what you like and we'll curate a custom playlist just for
            you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Button
              size="lg"
              className="flex-1 gradient-bg-sunset text-white hover:opacity-90 px-8"
            >
              Create My Playlist
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 bg-transparent border-white text-white hover:bg-white/10"
            >
              Take Quiz
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recommendations;
