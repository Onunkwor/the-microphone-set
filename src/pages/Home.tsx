import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { playlistsApi, type Playlist } from "@/services/api";
import { GenreTag } from "@/components/zine/GenreTag";
import { NewsletterForm } from "@/components/zine/NewsletterForm";

interface FeaturedPlaylist {
  id: string;
  title: string;
  description: string;
  genre: string;
  type: string;
}

interface ArticleDisplay {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  url: string;
  featured: boolean;
}

const fallbackPlaylists: FeaturedPlaylist[] = [
  { id: "64LkgCfNbLqjclQYCTid8L", title: "Late Night Vibes", description: "Perfect for late night listening", genre: "Chill", type: "album" },
  { id: "3NARoU8KzfUJZ6o4mWVIRV", title: "Morning Coffee", description: "Start your day right", genre: "Acoustic", type: "album" },
  { id: "79WcTJuCulopfqul1awYJk", title: "Deep Focus", description: "Music for concentration", genre: "Ambient", type: "album" },
  { id: "37i9dQZF1DXcBWIGoYBM5M", title: "Today's Top Hits", description: "The hottest tracks right now", genre: "Pop", type: "playlist" },
];

const articles: ArticleDisplay[] = [
  {
    id: 1, title: "The 'Philip Uzo and The Electric Revival' Live Show",
    excerpt: "Something inside me was revived at the show. Philip Uzo positively redefined the way I perceive live music.",
    category: "Events", author: "Rotimi, The Genius", date: "2025-12-13",
    image: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9fc0ad75-f979-4458-8355-dbec838a57fc_4032x3024.jpeg",
    url: "https://themicrophoneset.substack.com/p/the-philip-uzo-and-the-electric-revival", featured: true,
  },
  {
    id: 2, title: "Lagos is like a Mosquito: A Review of Lagos Shuffle by Ibejii",
    excerpt: "The quality of Ibejii's Lagos Shuffle exceeds the constraints of tying it down to a specific genre.",
    category: "Reviews", author: "Rotimi, The Genius", date: "2025-11-15",
    image: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7f337354-2982-4b04-9e0f-41c2aee213be_800x793.jpeg",
    url: "https://themicrophoneset.substack.com/p/the-city-in-melody-rhythm-and-colors", featured: false,
  },
  {
    id: 3, title: "The TMS Stock Market Update: Artists to invest in now Vol. 2",
    excerpt: "The stock market is going up and you're sleeping? Don't worry though, Rotimi is back with amazing music makers.",
    category: "Discovery", author: "Rotimi, The Genius", date: "2025-03-31",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/db88d5a5-5b0c-4703-abbd-8c1d2ec796ca_1920x1920.jpeg",
    url: "https://themicrophoneset.substack.com/p/the-tms-stock-market-update-artists-796", featured: false,
  },
];

const genreRotations = [-2, 1, -1, 2, -0.5, 1.5, -1.5, 0.5];
const genres = ["Jazz", "Hip-Hop", "Electronic", "R&B", "Indie", "Afrobeats", "Soul", "Alternative"];
const genreVariants: Array<"outline" | "yellow" | "red" | "ink"> = ["outline", "yellow", "outline", "red", "outline", "ink", "outline", "yellow"];

const Home = () => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState<FeaturedPlaylist[]>(fallbackPlaylists);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await playlistsApi.getAll();
        if (data && data.length > 0) {
          const featuredData = data.filter((item: Playlist) => item.featured);
          const playlistsToShow = featuredData.length >= 4 ? featuredData.slice(0, 4) : data.slice(0, 4);
          const mapped: FeaturedPlaylist[] = playlistsToShow.map((item: Playlist) => {
            let spotifyType = "playlist";
            let spotifyId = item.spotifyId;
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
            return { id: spotifyId, title: item.title, description: item.description || "Curated playlist", genre: item.genre || "Various", type: spotifyType };
          });
          setFeaturedPlaylists(mapped);
        }
      } catch (error) { console.error("Error fetching playlists:", error); }
      finally { setIsLoadingPlaylists(false); }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="bg-paper text-ink overflow-hidden">
      {/* ====== HERO SECTION ====== */}
      <section className="relative min-h-screen px-6 md:px-12 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-ink text-paper font-typewriter text-[11px] uppercase tracking-[3px] px-4 py-1.5 mb-7"
            style={{ transform: "rotate(-2deg)" }}
          >
            Music Discovery Reimagined
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] text-ink mb-8"
          >
            Discover
            <br />
            Your{" "}
            <span
              className="inline-block bg-cutout-red text-paper px-4 py-1 relative cutout-border"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              Next
            </span>
            <br />
            <span className="underline decoration-wavy decoration-cutout-red underline-offset-8">
              Favorite
            </span>
            <br />
            <span
              className="inline-block bg-ink text-paper px-3.5 py-0.5 font-typewriter text-[0.6em] align-middle"
              style={{ transform: "rotate(1deg)" }}
            >
              Sound
            </span>
          </motion.h1>

          {/* Sub text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-base leading-relaxed text-ink/60 max-w-[440px] mb-9 border-l-[3px] border-ink pl-4"
          >
            We talk about music, share playlists, interview artists, and help
            you discover new sounds that resonate with your soul.
          </motion.p>

          {/* Genre Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2.5 mb-9"
          >
            {genres.map((genre, i) => (
              <GenreTag
                key={genre}
                label={genre}
                rotate={genreRotations[i]}
                variant={genreVariants[i]}
              />
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/playlists"
              className="inline-flex items-center gap-2.5 font-typewriter text-sm uppercase tracking-[2px] px-7 py-3.5 bg-ink text-paper border-[3px] border-ink shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 transition-all duration-200 no-underline"
              style={{ transform: "rotate(-1deg)" }}
            >
              Explore Playlists
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2.5 font-typewriter text-sm uppercase tracking-[2px] px-7 py-3.5 bg-transparent text-ink border-[3px] border-ink hover:bg-cutout-yellow hover:-translate-y-0.5 transition-all duration-200 no-underline"
              style={{ transform: "rotate(0.5deg)" }}
            >
              Read Articles
            </Link>
          </motion.div>
        </div>

        {/* ====== COLLAGE ====== */}
        <div className="hidden lg:block relative h-[600px]">
          {/* Item 1 - NEW ISSUE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-[5%] left-[10%] w-60 h-44 bg-cutout-red p-2 shadow-[3px_3px_0_rgba(0,0,0,0.15)] flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            style={{ transform: "rotate(-6deg)" }}
          >
            <div className="font-display text-5xl text-paper text-center leading-none">
              NEW
              <br />
              ISSUE
            </div>
          </motion.div>

          {/* Item 2 - This Week's Picks */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-[20%] right-[5%] w-52 p-4 bg-cutout-yellow border-[3px] border-dashed border-ink shadow-[3px_3px_0_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-300 cursor-pointer"
            style={{ transform: "rotate(4deg)" }}
          >
            <div className="font-display text-lg mb-2">This Week&apos;s Picks</div>
            <div className="font-typewriter text-[11px] leading-relaxed text-ink/70">
              Our editors hand-select the freshest tracks dropping this week
              across every genre.
            </div>
          </motion.div>

          {/* Item 3 - Mic Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-[20%] left-[5%] w-56 h-40 bg-ink p-5 flex flex-col items-center justify-center gap-2 shadow-[3px_3px_0_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-300 cursor-pointer"
            style={{ transform: "rotate(3deg)" }}
          >
            <span className="text-5xl grayscale brightness-200">🎤</span>
            <span className="font-typewriter text-xs text-paper uppercase tracking-[3px]">
              The Mic Set
            </span>
          </motion.div>

          {/* Item 4 - Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-[10%] right-[10%] w-52 p-4 bg-paper border-2 border-ink shadow-[3px_3px_0_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-300 cursor-pointer"
            style={{ transform: "rotate(-3deg)" }}
          >
            {/* Tape */}
            <div
              className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-16 h-5 bg-cutout-yellow/70"
              style={{ transform: "rotate(2deg)" }}
            />
            <p className="font-quote italic text-sm leading-relaxed text-ink/70">
              &ldquo;Music is the shorthand of emotion.&rdquo;
            </p>
          </motion.div>

          {/* Item 5 - Stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute top-[45%] left-[35%] hover:scale-110 transition-transform duration-300 cursor-pointer"
            style={{ transform: "rotate(-8deg)" }}
          >
            <div
              className="w-24 h-24 border-4 border-cutout-red rounded-full flex items-center justify-center font-typewriter text-[11px] uppercase text-cutout-red text-center leading-tight tracking-wider"
              style={{ transform: "rotate(15deg)" }}
            >
              Est.
              <br />
              2024
              <br />
              Sound
              <br />
              Culture
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== OH YOU LIKE MUSIC? — MOTTO COLLAGE ====== */}
      <section className="relative py-24 px-6 md:px-12 bg-ink overflow-hidden">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #f5f0e8 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Image collage grid */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
            {[
              { src: "/merch1.jpg", rot: -3 },
              { src: "/merch2.png", rot: 2 },
              { src: "/merch3.png", rot: -1 },
              { src: "/merch4.jpg", rot: 3 },
              { src: "/merch5.jpg", rot: -2 },
              { src: "/merch6.jpg", rot: 1.5 },
              { src: "/merch7.png", rot: -1.5 },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative bg-paper p-1.5 shadow-[3px_3px_0_rgba(0,0,0,0.3)] hover:scale-105 hover:z-10 transition-all duration-300"
                style={{ transform: `rotate(${img.rot}deg)` }}
              >
                {/* Tape */}
                <div
                  className="absolute w-10 h-3 bg-cutout-yellow/70 top-[-6px] left-1/2 -translate-x-1/2 z-10"
                  style={{ transform: `rotate(${i % 2 === 0 ? 3 : -2}deg)` }}
                />
                <div className="aspect-square overflow-hidden bg-ink/10">
                  <img
                    src={img.src}
                    alt=""
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Motto */}
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl text-paper mb-4"
            >
              Oh, You Like
              <br />
              <span
                className="inline-block bg-cutout-red text-paper px-5 py-2 mt-2 relative cutout-border"
                style={{ transform: "rotate(-1.5deg)" }}
              >
                Music?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-body text-paper/50 text-lg max-w-lg mx-auto mb-8"
            >
              We talk about it, write about it, share it, and live it. This is
              The Microphone Set — where music lovers come to discover, connect,
              and celebrate sound.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div
                className="inline-flex w-24 h-24 border-4 border-cutout-red rounded-full items-center justify-center font-typewriter text-[10px] uppercase text-cutout-red text-center leading-tight tracking-wider"
                style={{ transform: "rotate(12deg)" }}
              >
                Est.
                <br />
                2024
                <br />
                TMS
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== FEATURES SECTION ====== */}
      <section className="py-20 px-6 md:px-12 bg-paper-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left intro */}
            <div className="lg:col-span-4 lg:pr-8">
              <div className="lg:sticky lg:top-32">
                <span
                  className="inline-block bg-cutout-red text-paper font-typewriter text-xs uppercase tracking-[3px] px-3 py-1 mb-4"
                  style={{ transform: "rotate(-1deg)" }}
                >
                  What We Do
                </span>
                <h2 className="font-display text-4xl md:text-5xl leading-tight text-ink mb-4">
                  Everything for
                  <br />
                  <span className="text-ink/30">music lovers</span>
                </h2>
                <p className="font-body text-ink/60 text-base leading-relaxed border-l-[3px] border-ink pl-4">
                  From curated playlists to exclusive artist interviews — your
                  complete music discovery companion.
                </p>
              </div>
            </div>

            {/* Feature cards */}
            <div className="lg:col-span-8 space-y-5">
              {[
                {
                  title: "Curated Playlists",
                  description: "Hand-picked collections for every mood, genre, and moment. Updated weekly with fresh tracks that actually matter.",
                  link: "/playlists",
                  number: "01",
                  rotation: -0.5,
                },
                {
                  title: "Artist Interviews",
                  description: "Go behind the music with exclusive conversations. Raw, unfiltered stories from the artists shaping sound today.",
                  link: "/interviews",
                  number: "02",
                  rotation: 0.5,
                },
                {
                  title: "Smart Recommendations",
                  description: "Discover new tracks tailored to your taste. Our intelligent system learns what resonates with you.",
                  link: "/recommendations",
                  number: "03",
                  rotation: -0.3,
                },
                {
                  title: "Music Trivia",
                  description: "Test your music knowledge with our trivia challenges. Compete on the leaderboard and prove you're the ultimate fan.",
                  link: "/trivia",
                  number: "04",
                  rotation: 0.8,
                },
              ].map((feature) => (
                <Link
                  key={feature.title}
                  to={feature.link}
                  className="group block p-6 md:p-8 bg-paper border-2 border-ink/10 hover:border-ink hover:shadow-hard transition-all duration-300 no-underline text-ink"
                  style={{ transform: `rotate(${feature.rotation}deg)` }}
                >
                  <div className="flex items-start gap-5">
                    <span className="font-display text-4xl text-ink/10 group-hover:text-cutout-red/30 transition-colors duration-300 hidden sm:block">
                      {feature.number}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display text-xl md:text-2xl text-ink mb-2">
                        {feature.title}
                      </h3>
                      <p className="font-body text-sm text-ink/60 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <span className="font-typewriter text-xs text-ink/20 group-hover:text-cutout-red group-hover:translate-x-1 transition-all duration-300 mt-1">
                      &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== FEATURED PLAYLISTS ====== */}
      <section className="py-20 px-6 md:px-12 bg-paper">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span
                className="inline-block bg-ink text-paper font-typewriter text-xs uppercase tracking-[3px] px-3 py-1 mb-4"
                style={{ transform: "rotate(-1deg)" }}
              >
                Featured
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-ink">
                Trending Playlists
              </h2>
            </div>
            <Link
              to="/playlists"
              className="font-typewriter text-sm text-ink/50 hover:text-cutout-red transition-colors uppercase tracking-wider no-underline"
            >
              View all playlists &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoadingPlaylists
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-paper-white border-2 border-ink/10 p-2 h-80 animate-pulse"
                    style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (i + 1) * 0.5}deg)` }}
                  />
                ))
              : featuredPlaylists.map((playlist, i) => (
                  <motion.div
                    key={playlist.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="group relative bg-paper-white p-2 shadow-[3px_3px_0_rgba(0,0,0,0.1)] hover:shadow-hard hover:rotate-0! transition-all duration-300 cursor-pointer"
                    style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (i + 1) * 0.7}deg)` }}
                  >
                    {/* Tape strip */}
                    <div
                      className="absolute w-14 h-4 bg-cutout-yellow/70 top-[-8px] left-1/2 -translate-x-1/2 z-10"
                      style={{ transform: `rotate(${i % 2 === 0 ? 2 : -3}deg)` }}
                    />

                    {/* Spotify embed */}
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

                    <div className="p-3 pt-2">
                      <h3 className="font-display text-lg text-ink truncate">
                        {playlist.title}
                      </h3>
                      <p className="font-body text-xs text-ink/50 line-clamp-1 mb-2">
                        {playlist.description}
                      </p>
                      <span
                        className="inline-block font-typewriter text-[10px] uppercase tracking-wider px-2 py-0.5 border border-ink/20"
                        style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
                      >
                        {playlist.genre}
                      </span>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* ====== LATEST ARTICLES ====== */}
      <section className="py-20 px-6 md:px-12 bg-paper-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span
                className="inline-block bg-cutout-red text-paper font-typewriter text-xs uppercase tracking-[3px] px-3 py-1 mb-4"
                style={{ transform: "rotate(1deg)" }}
              >
                Fresh Off The Press
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-ink">
                Latest Articles
              </h2>
            </div>
            <Link
              to="/blog"
              className="font-typewriter text-sm text-ink/50 hover:text-cutout-red transition-colors uppercase tracking-wider no-underline"
            >
              Read all articles &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-paper p-2 shadow-[3px_3px_0_rgba(0,0,0,0.1)] hover:shadow-hard hover:rotate-0! transition-all duration-300 no-underline text-ink block"
                    style={{ transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i + 1) * 0.5}deg)` }}
                  >
                    {/* Category cutout */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className="inline-block bg-cutout-red text-paper font-typewriter text-[10px] uppercase tracking-wider px-2 py-0.5"
                        style={{ transform: "rotate(-2deg)" }}
                      >
                        {article.category}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="h-48 overflow-hidden bg-ink/10">
                      {article.image && (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-display text-lg text-ink mb-2 line-clamp-2 group-hover:text-cutout-red transition-colors">
                        {article.title}
                      </h3>
                      <p className="font-body text-xs text-ink/50 line-clamp-2 mb-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between font-typewriter text-[10px] text-ink/30 uppercase tracking-wider">
                        <span>{article.author}</span>
                        <span>
                          {new Date(article.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
          </div>
        </div>
      </section>

      {/* ====== GENRE EXPLORER ====== */}
      <section className="py-20 px-6 md:px-12 bg-paper">
        <div className="max-w-5xl mx-auto text-center">
          <span
            className="inline-block bg-ink text-paper font-typewriter text-xs uppercase tracking-[3px] px-3 py-1 mb-6"
            style={{ transform: "rotate(-1deg)" }}
          >
            Explore
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-10">
            Browse by Genre
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Jazz", r: -3, v: "outline" as const },
              { label: "Hip-Hop", r: 2, v: "yellow" as const },
              { label: "Electronic", r: -1, v: "outline" as const },
              { label: "R&B", r: 3, v: "red" as const },
              { label: "Indie", r: -2, v: "outline" as const },
              { label: "Afrobeats", r: 1.5, v: "ink" as const },
              { label: "Soul", r: -0.5, v: "outline" as const },
              { label: "Alternative", r: 2.5, v: "yellow" as const },
              { label: "Pop", r: -1.5, v: "outline" as const },
              { label: "Rock", r: 1, v: "outline" as const },
              { label: "Highlife", r: -2.5, v: "red" as const },
              { label: "Ambient", r: 0.5, v: "outline" as const },
            ].map((g) => (
              <Link key={g.label} to="/recommendations" className="no-underline">
                <GenreTag
                  label={g.label}
                  rotate={g.r}
                  variant={g.v}
                  className="text-base! px-5! py-2!"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== NEWSLETTER ====== */}
      <section className="py-20 px-6 md:px-12 bg-paper-white">
        <NewsletterForm />
      </section>
    </div>
  );
};

export default Home;
