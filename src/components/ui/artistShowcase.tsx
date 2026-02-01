import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { artistsApi, type Artist as ArtistType } from "@/services/api";

interface Artist {
  id: number;
  name: string;
  image: string;
  bio: string;
}

const fallbackArtists: Artist[] = [
  {
    id: 1,
    name: "Velvet Echo",
    image: "/merch1.jpg",
    bio: "Rising from the underground scene, Velvet Echo blends neo-soul with electronic textures. Their debut EP 'Midnight Frequencies' captured hearts worldwide.",
  },
  {
    id: 2,
    name: "Nova Keys",
    image: "/merch2.png",
    bio: "A classically trained pianist turned electronic producer. Known for haunting melodies and bass-heavy drops that pack out dance floors.",
  },
  {
    id: 3,
    name: "The Drift",
    image: "/merch3.png",
    bio: "Four-piece indie collective from Lagos. Their sound fuses Afrobeats rhythms with shoegaze atmospherics for something truly unique.",
  },
  {
    id: 4,
    name: "Solace",
    image: "/merch4.jpg",
    bio: "Bedroom producer turned festival headliner. Solace crafts introspective electronic music that hits different at 2am.",
  },
  {
    id: 5,
    name: "Mira Stone",
    image: "/merch5.jpg",
    bio: "Genre-defying artist pushing the boundaries of R&B. Her raw vocals and honest lyrics have earned her a devoted following.",
  },
  {
    id: 6,
    name: "Pulse Collective",
    image: "/merch6.jpg",
    bio: "Producer duo known for their innovative approach to house music. They've been shaping the sound of underground clubs since 2019.",
  },
  {
    id: 7,
    name: "Azure Dreams",
    image: "/merch7.png",
    bio: "Ambient artist creating soundscapes for the modern age. Perfect for late-night coding sessions or contemplative moments.",
  },
];

const ArtistShowcase = () => {
  const [artists, setArtists] = useState<Artist[]>(fallbackArtists);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await artistsApi.getAll();
        if (data && data.length > 0) {
          const mapped: Artist[] = data.map((item: ArtistType, index: number) => ({
            id: index + 1,
            name: item.name,
            image: item.image,
            bio: item.bio,
          }));
          setArtists(mapped);
        }
      } catch (error) {
        console.log("Using fallback artists:", error);
      }
    };

    fetchArtists();
  }, []);
  const marqueeText = "oh you like music too?";

  const handleCardClick = (id: number) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#3b82f6]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-200/20 rounded-full blur-[120px]" />

      {/* Marquee Section */}
      <div className="relative mb-16 overflow-hidden">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-200 mx-4 select-none">
                {marqueeText}
              </span>
              <span className="text-3xl md:text-5xl text-[#3b82f6] mx-4">•</span>
              <span className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-[#3b82f6] to-orange-400 bg-clip-text text-transparent mx-4 select-none">
                {marqueeText}
              </span>
              <span className="text-3xl md:text-5xl text-orange-400 mx-4">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Artist Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {artists.slice(0, 4).map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="perspective-1000"
            >
              <div
                className={`relative aspect-[3/4] cursor-pointer transition-transform duration-700 transform-style-3d ${
                  flippedCard === artist.id ? "rotate-y-180" : ""
                }`}
                onClick={() => handleCardClick(artist.id)}
              >
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="relative h-full rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    {/* Image */}
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Orange accent border on hover */}
                    <div className="absolute inset-0 rounded-2xl border-4 border-transparent group-hover:border-orange-400 transition-colors duration-300" />

                    {/* Artist name */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        {artist.name}
                      </h3>
                    </div>

                    {/* Tap indicator on mobile */}
                    <div className="absolute top-4 left-4 flex gap-1 md:hidden">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-white/60"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className="h-full rounded-2xl overflow-hidden bg-gray-900 p-6 flex flex-col justify-between shadow-2xl">
                    {/* Close indicator */}
                    <div className="flex justify-between items-start">
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-white/40"
                          />
                        ))}
                      </div>
                      <X className="w-5 h-5 text-white/60" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                        {artist.name}
                      </h3>
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                        {artist.bio}
                      </p>
                    </div>

                    {/* CTA */}
                    <button className="w-full py-3 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors duration-300 border border-white/20">
                      See all our projects
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second row - shown on larger screens */}
        <div className="hidden lg:grid grid-cols-4 gap-6 mt-6">
          {artists.slice(4, 7).map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 4) * 0.1 }}
              className="perspective-1000"
            >
              <div
                className={`relative aspect-[3/4] cursor-pointer transition-transform duration-700 transform-style-3d ${
                  flippedCard === artist.id ? "rotate-y-180" : ""
                }`}
                onClick={() => handleCardClick(artist.id)}
              >
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="relative h-full rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 rounded-2xl border-4 border-transparent group-hover:border-orange-400 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {artist.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className="h-full rounded-2xl overflow-hidden bg-gray-900 p-6 flex flex-col justify-between shadow-2xl">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-white/40"
                          />
                        ))}
                      </div>
                      <X className="w-5 h-5 text-white/60" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {artist.name}
                      </h3>
                      <p className="text-base text-gray-300 leading-relaxed">
                        {artist.bio}
                      </p>
                    </div>
                    <button className="w-full py-3 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors duration-300 border border-white/20">
                      See all our projects
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom CSS for 3D transforms and marquee */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ArtistShowcase;