import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { recommendationsApi, type Recommendation } from "@/services/api";
import { GenreTag } from "@/components/zine/GenreTag";

interface WeeklyPick {
  id: number;
  title: string;
  artist: string;
  genre: string;
  album: string;
  reason: string;
  spotifyId: string;
  type: string;
}

const fallbackPicks: WeeklyPick[] = [
  { id: 1, title: "Midnight Drive", artist: "Neon Pulse", genre: "Synthwave", album: "Electric Dreams", reason: "Perfect blend of retro synths and modern production. This track captures the essence of late-night city drives.", spotifyId: "64LkgCfNbLqjclQYCTid8L", type: "album" },
  { id: 2, title: "Golden Hour", artist: "Luna Ray", genre: "Indie Pop", album: "Sunset Stories", reason: "Ethereal vocals meet dreamy instrumentation. A perfect soundtrack for those peaceful moments.", spotifyId: "3NARoU8KzfUJZ6o4mWVIRV", type: "album" },
  { id: 3, title: "Urban Poetry", artist: "The Wordsmith", genre: "Hip-Hop", album: "City Tales", reason: "Raw, honest storytelling over crisp beats. This is hip-hop at its finest.", spotifyId: "79WcTJuCulopfqul1awYJk", type: "album" },
];

const genreList = [
  { name: "Electronic", r: -2 }, { name: "Hip-Hop", r: 1.5 }, { name: "Indie", r: -1 },
  { name: "Jazz", r: 2 }, { name: "R&B", r: -0.5 }, { name: "Rock", r: 1 },
  { name: "Soul", r: -1.5 }, { name: "Afrobeats", r: 2.5 }, { name: "Pop", r: -2.5 },
  { name: "Highlife", r: 0.5 }, { name: "Alternative", r: -1 }, { name: "Ambient", r: 1.5 },
];

const genreVariantList: Array<"outline" | "yellow" | "red" | "ink"> = ["outline", "yellow", "outline", "red", "outline", "ink", "outline", "yellow", "outline", "outline", "red", "outline"];

const Recommendations = () => {
  const [weeklyPicks, setWeeklyPicks] = useState<WeeklyPick[]>(fallbackPicks);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await recommendationsApi.getAll();
        if (data && data.length > 0) {
          const mapped: WeeklyPick[] = data.slice(0, 3).map((item: Recommendation, index: number) => {
            let spotifyType = "track";
            let spotifyId = "64LkgCfNbLqjclQYCTid8L";
            if (item.spotifyUrl) {
              try {
                const url = item.spotifyUrl.replace(/\/$/, "");
                const parts = url.split("/");
                const id = parts.pop();
                const type = parts.pop();
                if (id && type && ["track", "album", "playlist"].includes(type)) {
                  spotifyId = id.split("?")[0];
                  spotifyType = type;
                }
              } catch (e) { console.log("Error parsing Spotify URL:", e); }
            }
            return { id: index + 1, title: item.title, artist: item.artist, genre: item.genre, album: item.album, reason: item.description, spotifyId, type: spotifyType };
          });
          setWeeklyPicks(mapped);
        }
      } catch (error) { console.log("Using fallback recommendations:", error); }
      finally { setIsLoading(false); }
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="bg-paper text-ink overflow-hidden">
      {/* Hero */}
      <section className="pt-16 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <span
            className="inline-block bg-cutout-yellow text-ink font-typewriter text-[11px] uppercase tracking-[3px] px-4 py-1.5 mb-6"
            style={{ transform: "rotate(-2deg)" }}
          >
            Curated Weekly
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-ink mb-6">
            Your Next
            <br />
            <span className="inline-block bg-cutout-red text-paper px-4 py-1 relative cutout-border" style={{ transform: "rotate(-1.5deg)" }}>
              Favorite
            </span>{" "}
            Track
          </h1>
          <p className="font-body text-lg text-ink/60 max-w-xl leading-relaxed border-l-[3px] border-ink pl-4">
            Hand-picked recommendations based on what&apos;s hot, what&apos;s fresh, and what resonates with music lovers like you.
          </p>
        </div>
      </section>

      {/* Weekly Picks */}
      <section className="py-16 px-6 md:px-12 bg-paper-white">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block bg-ink text-paper font-typewriter text-xs uppercase tracking-[3px] px-3 py-1 mb-4" style={{ transform: "rotate(-1deg)" }}>
            Trending Now
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-12">This Week&apos;s Top Picks</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {isLoading
              ? [...Array(3)].map((_, i) => (
                  <div key={i} className="bg-paper border-2 border-ink/10 h-[500px] animate-pulse" />
                ))
              : weeklyPicks.map((pick, i) => (
                  <motion.div
                    key={pick.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.15 }}
                    className="group relative bg-paper p-2 shadow-[3px_3px_0_rgba(0,0,0,0.1)] hover:shadow-hard hover:rotate-0! transition-all duration-300"
                    style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (i + 1) * 0.6}deg)` }}
                  >
                    {/* Rank */}
                    <div className="absolute top-3 right-3 z-10">
                      <div className="w-10 h-10 bg-cutout-red rounded-full flex items-center justify-center font-typewriter text-sm text-paper font-bold shadow-hard" style={{ transform: "rotate(5deg)" }}>
                        #{i + 1}
                      </div>
                    </div>

                    {/* Tape */}
                    <div className="absolute w-14 h-4 bg-cutout-yellow/70 top-[-8px] left-6 z-10" style={{ transform: `rotate(${i % 2 === 0 ? -2 : 3}deg)` }} />

                    {/* Spotify */}
                    <div className="aspect-square bg-ink/5">
                      <iframe
                        title={`Spotify: ${pick.title}`}
                        src={`https://open.spotify.com/embed/${pick.type}/${pick.spotifyId}?utm_source=generator&theme=0`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-4">
                      <span className="inline-block font-typewriter text-[10px] uppercase tracking-wider px-2 py-0.5 border border-ink/20 mb-3" style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}>
                        {pick.genre}
                      </span>
                      <h3 className="font-display text-xl text-ink mb-1">{pick.title}</h3>
                      <p className="font-body text-sm text-ink/50 mb-3">{pick.artist} &bull; {pick.album}</p>

                      <div className="bg-paper-white border border-dashed border-ink/20 p-3 mb-4" style={{ transform: "rotate(-0.5deg)" }}>
                        <p className="font-quote italic text-sm text-ink/60 leading-relaxed">&ldquo;{pick.reason}&rdquo;</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* Browse by Genre */}
      <section className="py-20 px-6 md:px-12 bg-paper">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block bg-cutout-red text-paper font-typewriter text-xs uppercase tracking-[3px] px-3 py-1 mb-6" style={{ transform: "rotate(1deg)" }}>
            Explore
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-10">Browse by Genre</h2>

          <div className="flex flex-wrap justify-center gap-4">
            {genreList.map((g, i) => (
              <GenreTag
                key={g.name}
                label={g.name}
                rotate={g.r}
                variant={genreVariantList[i]}
                className="text-base! px-5! py-2!"
              />
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
            Test Your
            <br />
            <span className="inline-block bg-cutout-red text-paper px-4 py-1 mt-2" style={{ transform: "rotate(-1deg)" }}>
              Music Knowledge
            </span>
          </h2>
          <p className="font-body text-paper/50 text-lg mb-10 max-w-xl mx-auto">
            Think you know your music? Take our trivia challenge and compete on the leaderboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/trivia"
              className="inline-block font-typewriter text-sm uppercase tracking-[2px] px-8 py-4 bg-cutout-red text-paper border-[3px] border-cutout-red shadow-[5px_5px_0_rgba(245,240,232,0.2)] hover:-translate-y-0.5 transition-all duration-200 no-underline"
              style={{ transform: "rotate(-1deg)" }}
            >
              Take Music Quiz
            </Link>
            <Link
              to="/playlists"
              className="inline-block font-typewriter text-sm uppercase tracking-[2px] px-8 py-4 bg-transparent text-paper border-[3px] border-paper/30 hover:border-paper hover:bg-paper/10 transition-all duration-200 no-underline"
              style={{ transform: "rotate(0.5deg)" }}
            >
              Browse Playlists
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recommendations;
