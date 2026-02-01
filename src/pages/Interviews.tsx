import { useState, useEffect } from "react";
import { Mic, Play, Calendar, ArrowRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { interviewsApi, type Interview as InterviewType } from "@/services/api";
import { InterviewSkeleton, FeaturedInterviewSkeleton } from "@/components/ui/skeleton";

interface InterviewDisplay {
  id: number;
  artist: string;
  genre: string;
  title: string;
  excerpt: string;
  date: string;
  duration: string;
  image: string;
  featured: boolean;
  url: string;
}

const fallbackInterviews: InterviewDisplay[] = [
  {
    id: 1,
    artist: "Syntax The Creator",
    genre: "Afrofusion",
    title: "Sharing the Space with Syntax The Creator",
    excerpt:
      "A discussion with Syntax The Creator on his amazing artistry, with co-host EnnytheFairy and speaker tomiyourgee.",
    date: "2026-01-04",
    duration: "40 min",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages211/v4/42/e5/61/42e561ba-9319-9873-9099-26319171fa6b/ami-identity-dbe7b9a2fdc5ea53247dffbbcfd67969-2024-11-30T14-58-04.496Z_cropped.png/1200x630cw.png",
    featured: true,
    url: "https://x.com/MicrophoneSet/status/2007889837417013498",
  },
    {
      id: 2,
      artist: "sickoboymp3",
      genre: "Hip-Hop / Rap",
      title: "Conversation with sickoboymp3 on &WSIC",
      excerpt:
        "A conversation with sickoboymp3 on his forthcoming project “&WSIC” with contributions from thetodi and nas_mkay.",
      date: "2025-11-03",
      duration: "40 min",
      image:
        "https://i.ytimg.com/vi/kMHVWEsuiYs/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGEEgZChlMA8=&rs=AOn4CLDnNAZjEatpGjZo3l4WrC-n6ykUrA",
      featured: false,
      url: "https://x.com/MicrophoneSet/status/1985451270677664008",
    },
    {
      id: 3,
      artist: "B4MIDELE",
      genre: "Indie Soul / R&B",
      title: "Conversation with B4MIDELE on A///G",
      excerpt:
        "Discussing B4MIDELE's upcoming two-pack 'A///G', his creative process, and music journey.",
      date: "2025-04-11",
      duration: "35 min",
      image:
        "https://images.squarespace-cdn.com/content/v1/5a5653aeb7411ce23017e460/008c2f3b-ea5c-4009-bbdb-2d0875db2828/22-11-27+Steven+bamidele+Album+Shoot+Roll+6+Edits+00002.jpeg",
      featured: false,
      url: "https://x.com/microphoneset/status/1910785025634693244",
    },
    {
      id: 4,
      artist: "AsaduChinaza",
      genre: "Afrobeats / Pop",
      title: "Thrilling Conversation with AsaduChinaza",
      excerpt:
        "An engaging talk with AsaduChinaza about her new release, influences, and other music-related topics.",
      date: "2024-01-13",
      duration: "45 min",
      image:
        "https://i.ytimg.com/vi/QLTTGAjRnRQ/sddefault.jpg?sqp=-oaymwEmCIAFEOAD8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFggXChlMA8=&rs=AOn4CLBucB8gn9-AveeUVEUoZBxPKu8ekA",
      featured: false,
      url: "https://x.com/microphoneset/status/1746260938359988660",
    },
    {
      id: 5,
      artist: "Fasina",
      genre: "Afropop / Alternative R&B",
      title: "Space with Fasina",
      excerpt:
        "A fun conversation with Fasina exploring his music, influences, and bridging pop and Afro genres.",
      date: "2023-11-18",
      duration: "38 min",
      image:
        "http://thenativemag.com/wp-content/uploads/2017/09/Fasina-1.png",
      featured: false,
      url: "https://x.com/microphoneset/status/1725969442394210405",
    },
    {
      id: 6,
      artist: "Emaxee",
      genre: "Afrobeats / Hip-Hop / Rap",
      title: "Sharing the Space with Emaxee",
      excerpt:
        "A discussion with Emaxee on his music, creative process, and journey as a rapper and songwriter.",
      date: "2023-06-11",
      duration: "42 min",
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages221/v4/f1/e7/65/f1e76513-7d30-aecc-adea-8e52ecb57a06/file_cropped.png/1200x630cw.png",
      featured: false,
      url: "https://x.com/microphoneset/status/1667954745246470152",
    },
];

const Interviews = () => {
  const [interviews, setInterviews] = useState<InterviewDisplay[]>(fallbackInterviews);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await interviewsApi.getAll();
        if (data && data.length > 0) {
          const mapped: InterviewDisplay[] = data.map((item: InterviewType, index: number) => ({
            id: index + 1,
            artist: item.artistName,
            genre: item.platform,
            title: item.title,
            excerpt: item.description,
            date: new Date().toISOString(),
            duration: "40 min",
            image: item.image,
            featured: item.featured,
            url: item.externalUrl,
          }));
          setInterviews(mapped);
        }
      } catch (error) {
        console.log("Using fallback interviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterviews();
  }, []);

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
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#3b82f6] text-sm font-semibold uppercase tracking-widest">
            Featured Interview
          </span>

          {isLoading ? (
            <div className="mt-8"><FeaturedInterviewSkeleton /></div>
          ) : featuredInterview ? (
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
          ) : null}
        </div>
      </section>

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
            {isLoading ? (
              [...Array(5)].map((_, i) => <InterviewSkeleton key={i} />)
            ) : regularInterviews.map((interview, index) => (
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
