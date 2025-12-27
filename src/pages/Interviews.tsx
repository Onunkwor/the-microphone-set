import { Mic2, Play, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Interviews = () => {
  const interviews = [
    {
      id: 1,
      artist: "Luna Waves",
      genre: "Electronic / Indie",
      title: "Creating Soundscapes: A Journey Through Electronic Music",
      excerpt:
        "We sit down with Luna Waves to discuss her creative process, influences, and the future of electronic music.",
      date: "2025-01-18",
      duration: "42 min",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=3270&auto=format&fit=crop",
      featured: true,
      videoUrl: "#",
    },
    {
      id: 2,
      artist: "Marcus Stone",
      genre: "Hip-Hop / Rap",
      title: "From the Streets to Stardom: The Marcus Stone Story",
      excerpt:
        "An intimate conversation about authenticity, struggle, and success in hip-hop.",
      date: "2025-01-14",
      duration: "38 min",
      image:
        "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=3270&auto=format&fit=crop",
      featured: false,
      videoUrl: "#",
    },
    {
      id: 3,
      artist: "The Midnight Collective",
      genre: "Jazz / Fusion",
      title: "Keeping Jazz Alive in the Digital Age",
      excerpt:
        "How this collective is bringing jazz to new audiences through innovation and collaboration.",
      date: "2025-01-10",
      duration: "35 min",
      image:
        "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=3270&auto=format&fit=crop",
      featured: false,
      videoUrl: "#",
    },
    {
      id: 4,
      artist: "Aria Chen",
      genre: "R&B / Soul",
      title: "Vulnerability and Strength: The Duality of Soul Music",
      excerpt:
        "Aria Chen opens up about emotional storytelling and connecting with audiences.",
      date: "2025-01-06",
      duration: "45 min",
      image:
        "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=3270&auto=format&fit=crop",
      featured: false,
      videoUrl: "#",
    },
    {
      id: 5,
      artist: "Neon Dreams",
      genre: "Synthwave / Electronic",
      title: "80s Nostalgia Meets Modern Production",
      excerpt:
        "Exploring the synthwave revival and what makes retro-futuristic sounds resonate today.",
      date: "2025-01-02",
      duration: "40 min",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=3270&auto=format&fit=crop",
      featured: false,
      videoUrl: "#",
    },
  ];

  const featuredInterview = interviews.find((interview) => interview.featured);
  const regularInterviews = interviews.filter(
    (interview) => !interview.featured
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-black"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border-8 border-black"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-black/5 rounded-full px-4 py-2 mb-6">
            <Mic2 className="w-5 h-5 text-[var(--electric-blue)]" />
            <span className="text-sm font-medium">Artist Conversations</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Behind The <span className="gradient-text">Music</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In-depth conversations with artists, producers, and creators shaping
            the sound of tomorrow
          </p>
        </div>
      </section>

      {/* Featured Interview */}
      {featuredInterview && (
        <section className="py-16 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4">
              <span className="text-sm font-semibold text-[var(--electric-blue)] uppercase tracking-wide">
                Featured Interview
              </span>
            </div>
            <div className="relative rounded-2xl overflow-hidden hover-lift hover-glow bg-gradient-to-br from-gray-900 to-black text-white">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-96 md:h-auto">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${featuredInterview.image})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white">
                    <Play className="w-8 h-8 text-white fill-current ml-1" />
                  </Button>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {featuredInterview.artist}
                  </h2>
                  <span className="text-[var(--electric-blue-light)] text-sm font-semibold mb-4">
                    {featuredInterview.genre}
                  </span>
                  <h3 className="text-2xl font-semibold mb-4">
                    {featuredInterview.title}
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    {featuredInterview.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredInterview.date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                    <span>{featuredInterview.duration}</span>
                  </div>
                  <Button className="gradient-bg-ocean text-white hover:opacity-90 w-fit">
                    Watch Interview
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interviews Grid */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">More Interviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regularInterviews.map((interview) => (
              <Card
                key={interview.id}
                className="overflow-hidden hover-lift hover-glow border-gray-200 bg-white"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="relative md:col-span-2 h-64 md:h-auto">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${interview.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Button className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/40 border-2 border-white">
                        <Play className="w-6 h-6 text-white fill-current ml-1" />
                      </Button>
                    </div>
                  </div>
                  <div className="md:col-span-3 p-6">
                    <span className="text-xs font-semibold text-[var(--electric-blue)] uppercase tracking-wide">
                      {interview.genre}
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-2">
                      {interview.artist}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {interview.title}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(interview.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span>{interview.duration}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Watch Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Interview Request CTA */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Mic2 className="w-16 h-16 mx-auto mb-6 text-[var(--electric-blue-light)]" />
          <h2 className="text-4xl font-bold mb-4">Want to be interviewed?</h2>
          <p className="text-xl mb-8 text-gray-300">
            We're always looking for talented artists to feature. Share your
            story with our community.
          </p>
          <Button
            size="lg"
            className="gradient-bg-sunset text-white hover:opacity-90 px-8 py-6 text-lg"
          >
            Submit Your Story
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Interviews;
