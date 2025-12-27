import { Music, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Playlists = () => {
  const playlists = [
    {
      id: "64LkgCfNbLqjclQYCTid8L",
      title: "Chill Vibes",
      description: "Perfect for studying, working, or just relaxing",
      duration: "2h 34m",
      tracks: 42,
      type: "album",
    },
    {
      id: "3NARoU8KzfUJZ6o4mWVIRV",
      title: "Energy Boost",
      description: "Get pumped up with these high-energy tracks",
      duration: "1h 52m",
      tracks: 28,
      type: "album",
    },
    {
      id: "79WcTJuCulopfqul1awYJk",
      title: "Late Night Sessions",
      description: "Smooth tracks for those midnight hours",
      duration: "3h 12m",
      tracks: 54,
      type: "album",
    },
    {
      id: "37i9dQZF1DXcBWIGoYBM5M",
      title: "Today's Top Hits",
      description: "The hottest tracks right now",
      duration: "2h 18m",
      tracks: 50,
      type: "playlist",
    },
    {
      id: "37i9dQZF1DX0XUsuxWHRQd",
      title: "RapCaviar",
      description: "New music from Lil Baby, Lil Durk, and more",
      duration: "2h 45m",
      tracks: 55,
      type: "playlist",
    },
    {
      id: "37i9dQZF1DX4dyzvuaRJ0n",
      title: "mint",
      description: "The freshest music, first",
      duration: "1h 30m",
      tracks: 30,
      type: "playlist",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 rounded-full border-4 border-black"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full border-8 border-black"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-black/5 rounded-full px-4 py-2 mb-6">
            <Music className="w-5 h-5 text-[var(--electric-blue)]" />
            <span className="text-sm font-medium">Curated Collections</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover Your{" "}
            <span className="gradient-text">Perfect Playlist</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Carefully curated playlists for every mood, moment, and vibe.
            Updated weekly with fresh tracks.
          </p>
        </div>
      </section>

      {/* Playlists Grid */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {playlists.map((playlist) => (
              <Card
                key={playlist.id}
                className="overflow-hidden hover-lift hover-glow border-gray-200"
              >
                <div className="aspect-square relative">
                  <iframe
                    title={`Spotify Embed: ${playlist.title}`}
                    src={`https://open.spotify.com/embed/${playlist.type}/${playlist.id}?utm_source=generator&theme=0`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{playlist.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {playlist.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Music className="w-4 h-4" />
                      {playlist.tracks} tracks
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {playlist.duration}
                    </span>
                  </div>
                  <Button
                    className="w-full gradient-bg-ocean text-white hover:opacity-90"
                    asChild
                  >
                    <a
                      href={`https://open.spotify.com/${playlist.type}/${playlist.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in Spotify
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Want to see your playlist featured?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Submit your curated playlists and share your music taste with the
            world
          </p>
          <Button
            size="lg"
            className="gradient-bg-sunset text-white hover:opacity-90 px-8 py-6 text-lg"
          >
            Submit Your Playlist
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Playlists;
