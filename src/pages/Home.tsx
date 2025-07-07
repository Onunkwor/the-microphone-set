import { BoxReveal } from "@/components/ui/box-reveal";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/ui/text-reveal";
import { cn } from "@/lib/utils";
import { Book, Headphones, Play, Mic, Music } from "lucide-react";
import { Link } from "react-router-dom";
const Home = () => {
  // const featuredPlaylists = [
  //   {
  //     id: 1,
  //     title: "Summer Vibes 2025",
  //     description: "The perfect playlist for sunny days and warm nights",
  //     platform: "Spotify",
  //     image:
  //       "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3270&auto=format&fit=crop",
  //   },
  //   {
  //     id: 2,
  //     title: "Indie Discoveries",
  //     description: "Fresh indie tracks from emerging artists around the globe",
  //     platform: "Apple Music",
  //     image:
  //       "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=3270&auto=format&fit=crop",
  //   },
  //   {
  //     id: 3,
  //     title: "Hip-Hop Essentials",
  //     description: "Classic and contemporary hip-hop tracks you need to hear",
  //     platform: "Spotify",
  //     image:
  //       "https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=3131&auto=format&fit=crop",
  //   },
  // ];
  // const playlistId = "64LkgCfNbLqjclQYCTid8L";

  return (
    <>
      <section className="relative overflow-hidden py-10 lg:py-24 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
        {/* Enhanced abstract decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-8 border-black"></div>
          <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full border-4 border-black"></div>
          <div className="absolute top-40 right-10 w-20 h-20 bg-black rounded-full"></div>
          <div className="absolute bottom-40 left-40 w-96 h-2 bg-black rounded-full transform rotate-45"></div>
          <div className="absolute top-1/4 left-1/3 w-32 h-32 border-2 border-black rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left content column */}
            <div className="space-y-8 pt-8">
              <BoxReveal boxColor="#3b82f6" duration={0.5}>
                <div className="inline-block rounded-full bg-black/5 px-4 py-1.5 text-sm font-medium">
                  <span className="flex items-center">
                    <Music className="h-4 w-4 mr-2" />
                    Music discovery reimagined
                  </span>
                </div>
              </BoxReveal>

              <BoxReveal boxColor="#3b82f6" duration={0.5}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-black">
                  Discover Your Next
                  <span className="relative mx-3">
                    <span className="relative z-10 text-[#3b82f6]">
                      Favorite
                    </span>
                    <span
                      className="absolute bottom-1 left-0 w-full"
                      style={{
                        height: "10px",
                        background:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' width='100%25' height='100%25' preserveAspectRatio='none'%3E%3Cpath d='M0,5 Q10,2 15,5 T30,5 T45,5 T60,5 T75,5 T90,5 T100,5' stroke='%233b82f6' stroke-opacity='0.3' stroke-width='6' fill='none' stroke-linecap='round' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E\")",
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></span>
                  </span>
                  Sound
                </h1>
              </BoxReveal>

              <BoxReveal boxColor="#3b82f6" duration={0.5}>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-lg">
                  We talk about music, share playlists, interview artists, and
                  help you discover new sounds that resonate with your soul.
                </p>
              </BoxReveal>

              <BoxReveal boxColor="#3b82f6" duration={0.5}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-full px-8 py-6"
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
                    className="border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f610] rounded-full px-8 py-6"
                  >
                    <Link to="/blog">
                      <Book className="mr-2 h-5 w-5" />
                      Read Articles
                    </Link>
                  </Button>
                </div>
              </BoxReveal>
            </div>

            {/* Right visual column */}
            <div className="hidden relative lg:block">
              <div className="aspect-square max-w-lg mx-auto relative">
                {/* Glowing circular background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-black/5 to-black/10 shadow-[0_0_30px_#3b82f640]"></div>

                {/* Circular waveform */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-end justify-center w-full h-full">
                    <div className="absolute w-24 h-24 rounded-full bg-black/5 z-0"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 rounded-full flex items-center justify-center">
                        {Array.from({ length: 36 }).map((_, index) => (
                          <div
                            key={`circular-${index}`}
                            className="absolute w-1 bg-black/40 rounded-full"
                            style={{
                              height: `${20 + Math.random() * 15}px`,
                              transform: `rotate(${
                                index * 10
                              }deg) translateY(-120px)`,
                              animation: `pulseCircular ${
                                Math.random() * 1 + 0.5
                              }s ease-in-out infinite alternate`,
                              animationDelay: `${index * 0.02}s`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mic icon with electric blue stroke + glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Mic
                    className="w-32 h-32 md:w-40 md:h-40 text-black opacity-70 drop-shadow-[0_0_8px_#3b82f680]"
                    stroke="#3b82f6"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Play button with border pop */}
                <div className="absolute bottom-6 right-6 bg-black text-white rounded-full p-4 shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 border-2 border-[#3b82f6] hover:shadow-[0_0_12px_#3b82f680]">
                  <Play className="h-8 w-8 fill-current" />
                </div>
              </div>

              {/* Genre bubbles with electric blue pop */}
              <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white border-2 border-[#3b82f6] flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
                <span className="text-sm font-medium text-[#3b82f6]">Jazz</span>
              </div>
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white border-2 border-[#3b82f6] flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
                <span className="text-sm font-medium text-[#3b82f6]">
                  Hip-Hop
                </span>
              </div>
              <div className="absolute top-1/2 -right-10 w-24 h-24 rounded-full bg-white border-2 border-[#3b82f6] flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
                <span className="text-sm font-medium text-[#3b82f6]">
                  Electronic
                </span>
              </div>
              <div className="absolute bottom-1/3 -left-8 w-18 h-18 rounded-full bg-white border-2 border-[#3b82f6] flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
                <span className="text-sm font-medium text-[#3b82f6]">Rock</span>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
    @keyframes pulseWave {
      0% {
        height: 30%;
        opacity: 0.7;
      }
      50% {
        opacity: 1;
      }
      100% {
        height: 100%;
        opacity: 0.9;
      }
    }

    @keyframes pulseCircular {
      0% {
        height: 15px;
        opacity: 0.5;
      }
      100% {
        height: 30px;
        opacity: 0.8;
      }
    }
  `}</style>
      </section>

      <TextReveal>"oh you love music too?"</TextReveal>

      {/* Featured Playlists */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Featured Playlists"
            subtitle="Curated collections to match your mood and vibe"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <iframe
              title="Spotify Embed: Recommendation Playlist "
              src={`https://open.spotify.com/embed/album/64LkgCfNbLqjclQYCTid8L?utm_source=generator&theme=0`}
              width="100%"
              height="100%"
              style={{ minHeight: "360px" }}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
            <iframe
              title="Spotify Embed: Recommendation Playlist "
              src={`https://open.spotify.com/embed/album/3NARoU8KzfUJZ6o4mWVIRV?utm_source=generator&theme=0`}
              width="100%"
              height="100%"
              style={{ minHeight: "360px" }}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
            <iframe
              title="Spotify Embed: Recommendation Playlist "
              src={`https://open.spotify.com/embed/album/79WcTJuCulopfqul1awYJk?utm_source=generator&theme=0`}
              width="100%"
              height="100%"
              style={{ minHeight: "360px" }}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-tms-black hover:bg-tms-black/90">
              <Link to="/playlists">View All Playlists</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeader = ({
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl">{subtitle}</p>
      )}
    </div>
  );
};
