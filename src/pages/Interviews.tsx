import { Mic, Play, Calendar, ArrowRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    },
  ];

  const featuredInterview = interviews.find((interview) => interview.featured);
  const regularInterviews = interviews.filter((interview) => !interview.featured);

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-6 md:px-12">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#3b82f6]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#3b82f6]/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-8">
              <Mic className="w-4 h-4 text-[#3b82f6]" />
              <span className="text-sm text-gray-600 font-medium tracking-wide uppercase">
                Artist Conversations
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight text-gray-900 mb-6">
              Behind The
              <br />
              <span className="text-[#3b82f6]">Music</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
              In-depth conversations with artists, producers, and creators shaping the sound of tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Interview */}
      {featuredInterview && (
        <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#3b82f6] text-sm font-semibold uppercase tracking-widest">
              Featured Interview
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 items-center">
              {/* Left - Visual */}
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${featuredInterview.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />

                  {/* Play button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 border-2 border-white group">
                      <Play className="w-8 h-8 text-white fill-current ml-1 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  {/* Now playing bar */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/90 backdrop-blur-md shadow-lg border border-white">
                      <div className="w-12 h-12 rounded-full bg-[#3b82f6] flex items-center justify-center">
                        <Volume2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full w-1/3 bg-[#3b82f6] rounded-full" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          {featuredInterview.duration} • Interview
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl border-2 border-[#3b82f6]/20 -z-10" />
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border-2 border-[#3b82f6]/10 -z-10" />
              </div>

              {/* Right - Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] text-sm font-medium mb-4">
                  {featuredInterview.genre}
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                  {featuredInterview.artist}
                </h2>

                <h3 className="text-xl md:text-2xl font-semibold text-gray-600 mb-6">
                  {featuredInterview.title}
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {featuredInterview.excerpt}
                </p>

                <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredInterview.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Mic className="w-4 h-4" />
                    {featuredInterview.duration}
                  </span>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="bg-[#3b82f6] text-white hover:bg-[#2563eb] rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_#3b82f640]"
                >
                  <Link to={`/interviews/${featuredInterview.id}`}>
                    <Play className="mr-2 h-5 w-5" />
                    Watch Interview
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* More Interviews Grid */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="text-[#3b82f6] text-sm font-semibold uppercase tracking-widest">
                More Stories
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
                Recent Interviews
              </h2>
            </div>
            <Link
              to="/interviews/all"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#3b82f6] font-semibold transition-colors duration-300"
            >
              View all interviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularInterviews.map((interview, index) => (
              <div
                key={interview.id}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#3b82f6]/30 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${interview.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />

                  {/* Number badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-5xl font-bold text-white/20">
                      0{index + 2}
                    </span>
                  </div>

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer border-2 border-white hover:bg-white/30 transition-all">
                      <Play className="w-6 h-6 text-white fill-current ml-1" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-900">
                      {interview.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-semibold text-[#3b82f6] uppercase tracking-wide">
                    {interview.genre}
                  </span>
                  <h3 className="text-xl font-bold mt-2 mb-2 text-gray-900 group-hover:text-[#3b82f6] transition-colors">
                    {interview.artist}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {interview.title}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(interview.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden bg-gray-900">
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

        <div className="absolute top-0 left-0 w-96 h-96 bg-[#3b82f6]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="w-20 h-20 rounded-full bg-[#3b82f6]/20 flex items-center justify-center mx-auto mb-8">
            <Mic className="w-10 h-10 text-[#3b82f6]" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
            Want to Share
            <br />
            Your Story?
          </h2>

          <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
            We're always looking for talented artists to feature. Share your journey with our community.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-[#3b82f6] text-white hover:bg-[#2563eb] rounded-full px-10 py-7 text-lg font-bold shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <Link to="/contact">
              Submit Your Story
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Interviews;
