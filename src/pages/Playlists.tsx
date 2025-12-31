import { Headphones, ExternalLink, Clock, Music, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-6 md:px-12">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#3b82f6]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#3b82f6]/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-8">
              <Headphones className="w-4 h-4 text-[#3b82f6]" />
              <span className="text-sm text-gray-600 font-medium tracking-wide uppercase">
                Curated Collections
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight text-gray-900 mb-6">
              Discover Your
              <br />
              <span className="text-[#3b82f6]">Perfect</span> Playlist
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
              Carefully curated playlists for every mood, moment, and vibe. Updated weekly with fresh tracks.
            </p>
          </div>
        </div>
      </section>

      {/* Playlists Grid */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="text-[#3b82f6] text-sm font-semibold uppercase tracking-widest">
                Browse
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
                All Playlists
              </h2>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="px-4 py-2 rounded-full bg-[#3b82f6] text-white font-medium">All</span>
              <span className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 font-medium hover:border-[#3b82f6] hover:text-[#3b82f6] cursor-pointer transition-colors">Chill</span>
              <span className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 font-medium hover:border-[#3b82f6] hover:text-[#3b82f6] cursor-pointer transition-colors">Energy</span>
              <span className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 font-medium hover:border-[#3b82f6] hover:text-[#3b82f6] cursor-pointer transition-colors">Focus</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {playlists.map((playlist, index) => (
              <div
                key={playlist.id}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#3b82f6]/30 transition-all duration-500"
              >
                {/* Spotify Embed */}
                <div className="aspect-square relative">
                  <iframe
                    title={`Spotify Embed: ${playlist.title}`}
                    src={`https://open.spotify.com/embed/${playlist.type}/${playlist.id}?utm_source=generator&theme=0`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />

                  {/* Number overlay */}
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <span className="text-6xl font-bold text-white/10">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 border-t border-gray-100">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{playlist.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {playlist.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
                    <span className="flex items-center gap-2">
                      <Music className="w-4 h-4" />
                      {playlist.tracks} tracks
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {playlist.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      className="flex-1 bg-[#3b82f6] text-white hover:bg-[#2563eb] rounded-full font-semibold transition-all duration-300 hover:shadow-[0_4px_20px_#3b82f640]"
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

                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-[#3b82f6] group/play transition-colors duration-300">
                      <Play className="w-4 h-4 text-gray-600 group-hover/play:text-white fill-current ml-0.5 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden bg-[#3b82f6]">
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

        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto relative z-10 text-center text-white">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-8">
            <Headphones className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Got a Playlist
            <br />
            Worth Sharing?
          </h2>

          <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto">
            Submit your curated playlists and share your music taste with thousands of listeners.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-white text-[#3b82f6] hover:bg-gray-100 rounded-full px-10 py-7 text-lg font-bold shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <Link to="/contact">
              Submit Your Playlist
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Playlists;
