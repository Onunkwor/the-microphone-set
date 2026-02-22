import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { playlistsApi, type Playlist } from "@/services/api";
import { GenreTag } from "@/components/zine/GenreTag";

interface PlaylistDisplay {
  id: string;
  title: string;
  description: string;
  genre: string;
  type: "album" | "playlist";
}

const fallbackPlaylists: PlaylistDisplay[] = [
  { id: "64LkgCfNbLqjclQYCTid8L", title: "Chill Vibes", description: "Perfect for studying, working, or just relaxing", genre: "Chill", type: "album" },
  { id: "3NARoU8KzfUJZ6o4mWVIRV", title: "Energy Boost", description: "Get pumped up with these high-energy tracks", genre: "Energy", type: "album" },
  { id: "79WcTJuCulopfqul1awYJk", title: "Late Night Sessions", description: "Smooth tracks for those midnight hours", genre: "Chill", type: "album" },
  { id: "37i9dQZF1DXcBWIGoYBM5M", title: "Today's Top Hits", description: "The hottest tracks right now", genre: "Pop", type: "playlist" },
  { id: "37i9dQZF1DX0XUsuxWHRQd", title: "RapCaviar", description: "New music from Lil Baby, Lil Durk, and more", genre: "Hip-Hop", type: "playlist" },
  { id: "37i9dQZF1DX4dyzvuaRJ0n", title: "mint", description: "The freshest music, first", genre: "Electronic", type: "playlist" },
];

const Playlists = () => {
  const [playlists, setPlaylists] = useState<PlaylistDisplay[]>(fallbackPlaylists);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await playlistsApi.getAll();
        if (data && data.length > 0) {
          const mapped: PlaylistDisplay[] = data.map((item: Playlist) => {
            let spotifyType: "album" | "playlist" = "playlist";
            let spotifyId = item.spotifyId;
            if (item.spotifyUrl) {
              try {
                const url = item.spotifyUrl.replace(/\/$/, "");
                const parts = url.split("/");
                const id = parts.pop();
                const type = parts.pop();
                if (id && type && ["track", "album", "playlist"].includes(type)) {
                  spotifyId = id.split("?")[0];
                  if (type === "album" || type === "playlist") spotifyType = type;
                }
              } catch (e) { console.log("Error parsing Spotify URL:", e); }
            }
            return { id: spotifyId, title: item.title, description: item.description, genre: item.genre || "Various", type: spotifyType };
          });
          setPlaylists(mapped);
        }
      } catch (error) { console.log("Using fallback playlists:", error); }
      finally { setIsLoading(false); }
    };
    fetchPlaylists();
  }, []);

  return (
    <div className="bg-paper text-ink overflow-hidden">
      {/* Hero */}
      <section className="relative pt-16 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <span
            className="inline-block bg-ink text-paper font-typewriter text-[11px] uppercase tracking-[3px] px-4 py-1.5 mb-6"
            style={{ transform: "rotate(-2deg)" }}
          >
            Curated Collections
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-ink mb-6">
            Discover Your
            <br />
            <span className="inline-block bg-cutout-red text-paper px-4 py-1 relative cutout-border" style={{ transform: "rotate(-1.5deg)" }}>
              Perfect
            </span>{" "}
            Playlist
          </h1>
          <p className="font-body text-lg text-ink/60 max-w-xl leading-relaxed border-l-[3px] border-ink pl-4">
            Carefully curated playlists for every mood, moment, and vibe. Updated weekly with fresh tracks.
          </p>
        </div>
      </section>

      {/* Filter Tags */}
      <section className="px-6 md:px-12 pb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
          {["All", "Chill", "Energy", "Focus", "Hip-Hop", "Electronic"].map((tag, i) => (
            <GenreTag
              key={tag}
              label={tag}
              rotate={[-1, 1.5, -0.5, 2, -1.5, 0.5][i]}
              variant={i === 0 ? "ink" : "outline"}
            />
          ))}
        </div>
      </section>

      {/* Playlists Grid */}
      <section className="py-12 px-6 md:px-12 bg-paper-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? [...Array(6)].map((_, i) => (
                  <div key={i} className="bg-paper border-2 border-ink/10 p-2 h-96 animate-pulse" style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1)}deg)` }} />
                ))
              : playlists.map((playlist, i) => (
                  <motion.div
                    key={playlist.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                    className="group relative bg-paper-white p-2 shadow-[3px_3px_0_rgba(0,0,0,0.1)] hover:shadow-hard hover:rotate-0! transition-all duration-300"
                    style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * ((i % 3) + 1) * 0.5}deg)` }}
                  >
                    {/* Tape */}
                    <div
                      className="absolute w-14 h-4 bg-cutout-yellow/70 top-[-8px] left-1/2 -translate-x-1/2 z-10"
                      style={{ transform: `rotate(${i % 2 === 0 ? 2 : -3}deg)` }}
                    />

                    {/* Spotify */}
                    <div className="bg-ink/5" style={{ height: 352 }}>
                      <iframe
                        title={`Spotify: ${playlist.title}`}
                        src={`https://open.spotify.com/embed/${playlist.type}/${playlist.id}?utm_source=generator&theme=0`}
                        width="100%"
                        height="100%"
                        style={{ border: 0, borderRadius: 0 }}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="font-display text-xl text-ink mb-1">{playlist.title}</h3>
                      <p className="font-body text-sm text-ink/50 line-clamp-2 mb-3">{playlist.description}</p>
                      <div className="flex items-center justify-between">
                        <span
                          className="inline-block font-typewriter text-[10px] uppercase tracking-wider px-2 py-0.5 border border-ink/20"
                          style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
                        >
                          {playlist.genre}
                        </span>
                        <a
                          href={`https://open.spotify.com/${playlist.type}/${playlist.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-typewriter text-[10px] uppercase tracking-wider text-ink/30 hover:text-cutout-red transition-colors no-underline"
                        >
                          Open &rarr;
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #f5f0e8 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-paper mb-6">
            Got a Playlist
            <br />
            <span className="inline-block bg-cutout-red text-paper px-4 py-1 mt-2" style={{ transform: "rotate(-1deg)" }}>
              Worth Sharing?
            </span>
          </h2>
          <p className="font-body text-paper/60 text-lg mb-10 max-w-xl mx-auto">
            Submit your curated playlists and share your music taste with thousands of listeners.
          </p>
          <Link
            to="/contact"
            className="inline-block font-typewriter text-sm uppercase tracking-[2px] px-8 py-4 bg-paper text-ink border-[3px] border-paper shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 transition-all duration-200 no-underline"
            style={{ transform: "rotate(-1deg)" }}
          >
            Submit Your Playlist
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Playlists;
