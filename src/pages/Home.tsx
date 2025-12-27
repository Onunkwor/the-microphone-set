import { BoxReveal } from "@/components/ui/box-reveal";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  Book,
  Headphones,
  Play,
  Mic,
  Music,
  Sparkles,
  ArrowRight,
  Volume2,
  Radio,
  Disc3,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-16 lg:py-24 px-6 md:px-12">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#3b82f6]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#3b82f6]/5 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-[#3b82f6]/8 rounded-full blur-[100px]" />
        </div>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating waveform lines */}
        <div className="absolute top-20 left-0 w-full h-32 opacity-20 z-0">
          <svg viewBox="0 0 1200 100" className="w-full h-full">
            <path
              d="M0,50 Q150,20 300,50 T600,50 T900,50 T1200,50"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              className="animate-pulse"
            />
            <path
              d="M0,60 Q150,30 300,60 T600,60 T900,60 T1200,60"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <BoxReveal boxColor="#3b82f6" duration={0.5}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm">
                  <span className="w-2 h-2 bg-[#3b82f6] rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600 font-medium tracking-wide uppercase">
                    Music discovery reimagined
                  </span>
                </div>
              </BoxReveal>

              <BoxReveal boxColor="#3b82f6" duration={0.5}>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-gray-900">
                  Discover
                  <br />
                  Your Next
                  <br />
                  <span className="text-[#3b82f6]">Favorite</span> Sound
                </h1>
              </BoxReveal>

              <BoxReveal boxColor="#3b82f6" duration={0.5}>
                <p className="text-lg md:text-xl text-gray-600 max-w-md leading-relaxed">
                  We talk about music, share playlists, interview artists, and
                  help you discover new sounds that resonate with your soul.
                </p>
              </BoxReveal>

              <BoxReveal boxColor="#3b82f6" duration={0.5}>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#3b82f6] text-white hover:bg-[#2563eb] rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_#3b82f640]"
                  >
                    <Link to="/playlists">
                      <Headphones className="mr-2 h-5 w-5" />
                      Explore Playlists
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-[#3b82f6] rounded-full px-8 py-6 text-base font-semibold transition-all duration-300"
                  >
                    <Link to="/blog">
                      <Book className="mr-2 h-5 w-5" />
                      Read Articles
                    </Link>
                  </Button>
                </div>
              </BoxReveal>

              {/* Stats row */}
              <BoxReveal boxColor="#3b82f6" duration={0.5}>
                <div className="flex gap-12 pt-8 border-t border-gray-200">
                  {[
                    { value: "50K+", label: "Listeners" },
                    { value: "200+", label: "Playlists" },
                    { value: "100+", label: "Artists" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </BoxReveal>
            </div>

            {/* Right visual */}
            <div className="hidden lg:block relative">
              <div className="aspect-square max-w-lg mx-auto relative">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[#3b82f6]/20 animate-pulse" />
                <div className="absolute inset-4 rounded-full border border-[#3b82f6]/15" />
                <div className="absolute inset-8 rounded-full border border-[#3b82f6]/10" />

                {/* Background glow */}
                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-[#3b82f6]/5 to-[#3b82f6]/10" />

                {/* Circular waveform */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-72 h-72">
                    {Array.from({ length: 48 }).map((_, index) => (
                      <div
                        key={`bar-${index}`}
                        className="absolute left-1/2 top-1/2 w-1 bg-[#3b82f6] rounded-full origin-bottom"
                        style={{
                          height: `${20 + Math.sin(index * 0.5) * 15}px`,
                          transform: `rotate(${index * 7.5}deg) translateY(-100px) translateX(-50%)`,
                          opacity: 0.3 + Math.sin(index * 0.3) * 0.3,
                          animation: `waveBar 1.5s ease-in-out infinite`,
                          animationDelay: `${index * 0.03}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Center mic */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center border border-gray-100">
                    <Mic className="w-16 h-16 text-[#3b82f6]" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Play button */}
                <div className="absolute bottom-8 right-8 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-[#3b82f6] flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-[0_8px_30px_#3b82f680]">
                    <Play className="h-6 w-6 text-white fill-current ml-1" />
                  </div>
                </div>

                {/* Floating genre tags */}
                {[
                  { label: "Jazz", top: "-5%", left: "10%" },
                  { label: "Hip-Hop", top: "10%", right: "-5%" },
                  { label: "Electronic", bottom: "30%", right: "-10%" },
                  { label: "Indie", bottom: "-5%", left: "20%" },
                ].map((genre) => (
                  <div
                    key={genre.label}
                    className="absolute px-4 py-2 rounded-full bg-white shadow-md border border-gray-100 text-sm font-medium text-gray-700 hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6] transition-all duration-300 cursor-pointer"
                    style={{
                      top: genre.top,
                      left: genre.left,
                      right: genre.right,
                      bottom: genre.bottom,
                    }}
                  >
                    {genre.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent" />
        </div>
      </section>

      {/* Text Reveal Quote */}
        <TextReveal>"oh you love music too?"</TextReveal>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-12 relative bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4">
            {/* Left intro */}
            <div className="lg:col-span-4 lg:pr-12">
              <div className="sticky top-32">
                <span className="text-[#3b82f6] text-sm font-semibold uppercase tracking-widest">
                  What We Do
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight text-gray-900">
                  Everything for
                  <br />
                  <span className="text-gray-400">music lovers</span>
                </h2>
                <p className="text-gray-600 mt-6 text-lg leading-relaxed">
                  From curated playlists to exclusive artist interviews — your
                  complete music discovery companion.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 mt-8 text-[#3b82f6] font-semibold hover:gap-4 transition-all duration-300"
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right feature cards */}
           <div className="lg:col-span-8 space-y-4 md:space-y-6">
  {[
    {
      icon: Headphones,
      title: "Curated Playlists",
      description:
        "Hand-picked collections for every mood, genre, and moment. Updated weekly with fresh tracks that actually matter.",
      link: "/playlists",
      number: "01",
    },
    {
      icon: Mic,
      title: "Artist Interviews",
      description:
        "Go behind the music with exclusive conversations. Raw, unfiltered stories from the artists shaping sound today.",
      link: "/interviews",
      number: "02",
    },
    {
      icon: Sparkles,
      title: "Smart Recommendations",
      description:
        "Discover new tracks tailored to your taste. Our intelligent system learns what resonates with you.",
      link: "/recommendations",
      number: "03",
    },
    {
      icon: Radio,
      title: "Live Sessions",
      description:
        "Exclusive live performances and listening parties. Experience music the way it's meant to be heard.",
      link: "/live",
      number: "04",
    },
  ].map((feature) => (
    <Link
      key={feature.title}
      to={feature.link}
      className="group block p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#3b82f6]/30 transition-all duration-500"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 md:gap-6">
        {/* Number - hidden on mobile, shown on sm+ */}
        <span className="hidden sm:block text-4xl md:text-5xl font-bold text-gray-100 group-hover:text-[#3b82f6]/20 transition-colors duration-500">
          {feature.number}
        </span>

        <div className="flex-1">
          {/* Icon + Title row */}
          <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#3b82f6]/10 flex items-center justify-center group-hover:bg-[#3b82f6] transition-colors duration-300 flex-shrink-0">
              <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-[#3b82f6] group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="flex items-center gap-2">
              {/* Number badge - shown only on mobile */}
              <span className="sm:hidden text-xs font-semibold text-[#3b82f6] bg-[#3b82f6]/10 px-2 py-0.5 rounded-full">
                {feature.number}
              </span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
            {feature.description}
          </p>

          {/* Mobile CTA - shown only on mobile */}
          <div className="flex items-center gap-1 mt-3 sm:hidden text-[#3b82f6] text-sm font-semibold">
            Learn more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        {/* Arrow - hidden on mobile, shown on sm+ */}
        <ArrowRight className="hidden sm:block w-5 h-5 md:w-6 md:h-6 text-gray-300 group-hover:text-[#3b82f6] group-hover:translate-x-2 transition-all duration-300 mt-1 md:mt-2 flex-shrink-0" />
      </div>
    </Link>
  ))}
</div>
          </div>
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden bg-white">
        {/* Background accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3b82f6]/5 rounded-full blur-[200px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="text-[#3b82f6] text-sm font-semibold uppercase tracking-widest">
                Featured
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mt-4 text-gray-900">
                Trending Playlists
              </h2>
            </div>
            <Link
              to="/playlists"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#3b82f6] font-semibold transition-colors duration-300"
            >
              View all playlists <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: "64LkgCfNbLqjclQYCTid8L",
                title: "Late Night Vibes",
                tracks: "24 tracks",
                duration: "1hr 42min",
              },
              {
                id: "3NARoU8KzfUJZ6o4mWVIRV",
                title: "Morning Coffee",
                tracks: "18 tracks",
                duration: "58min",
              },
              {
                id: "79WcTJuCulopfqul1awYJk",
                title: "Deep Focus",
                tracks: "32 tracks",
                duration: "2hr 15min",
              },
            ].map((playlist) => (
              <div
                key={playlist.id}
                className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#3b82f6]/30 transition-all duration-500"
              >
                {/* Spotify Embed */}
                <div className="aspect-square">
                  <iframe
                    title={`Spotify Embed: ${playlist.title}`}
                    src={`https://open.spotify.com/embed/album/${playlist.id}?utm_source=generator&theme=0`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-t-2xl"
                  />
                </div>

                {/* Info overlay */}
                <div className="p-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{playlist.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {playlist.tracks} • {playlist.duration}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#3b82f6] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:scale-110 shadow-lg">
                      <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Spotlight Section */}
      <section className="py-32 px-6 md:px-12 relative bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Visual */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-[#3b82f6]/10 to-[#3b82f6]/5 overflow-hidden relative shadow-2xl">
                {/* Placeholder for artist image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />

                {/* Floating elements */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/90 backdrop-blur-md shadow-lg border border-white">
                    <div className="w-12 h-12 rounded-full bg-[#3b82f6] flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-[#3b82f6] rounded-full" />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Now Playing • Interview Clip
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl border-2 border-[#3b82f6]/20 -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border-2 border-[#3b82f6]/10 -z-10" />
            </div>

            {/* Right - Content */}
            <div>
              <span className="text-[#3b82f6] text-sm font-semibold uppercase tracking-widest">
                Artist Spotlight
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight text-gray-900">
                Behind the Music
                <br />
                <span className="text-gray-400">Stories that inspire</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mt-6">
                Every week, we sit down with artists who are pushing boundaries
                and redefining what music can be. Unfiltered conversations about
                creativity, struggle, and triumph.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "In-depth artist interviews",
                  "Behind-the-scenes studio sessions",
                  "Exclusive premiere content",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="mt-10 bg-gray-900 text-white hover:bg-gray-800 rounded-full px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/interviews">
                  <Mic className="mr-2 h-5 w-5" />
                  Watch Interviews
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden bg-[#3b82f6]">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-8">
            <Disc3 className="w-4 h-4 animate-spin" style={{ animationDuration: "3s" }} />
            <span className="text-sm font-medium">Join 50,000+ music lovers</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Ready to Discover
            <br />
            Your Next Favorite?
          </h2>

          <p className="text-xl text-white/90 mt-6 max-w-xl mx-auto">
            Join our community and never miss a beat. New playlists, exclusive
            interviews, and personalized recommendations — all for free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#3b82f6] hover:bg-gray-100 rounded-full px-10 py-7 text-lg font-bold shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <Link to="/recommendations">
                <Sparkles className="mr-2 h-5 w-5" />
                Get Started Free
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 hover:border-white rounded-full px-10 py-7 text-lg font-semibold transition-all duration-300"
            >
              <Link to="/trivia">
                <Music className="mr-2 h-5 w-5" />
                Take Music Trivia
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Keyframe animations */}
      <style>{`
        @keyframes waveBar {
          0%, 100% {
            transform: rotate(var(--rotation)) translateY(-100px) translateX(-50%) scaleY(1);
          }
          50% {
            transform: rotate(var(--rotation)) translateY(-100px) translateX(-50%) scaleY(1.5);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;