import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { interviewsApi, type Interview as InterviewType } from "@/services/api";

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
    id: 1, artist: "Syntax The Creator", genre: "Afrofusion",
    title: "Sharing the Space with Syntax The Creator",
    excerpt: "A discussion with Syntax The Creator on his amazing artistry, with co-host EnnytheFairy and speaker tomiyourgee.",
    date: "2026-01-04", duration: "40 min",
    image: "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages211/v4/42/e5/61/42e561ba-9319-9873-9099-26319171fa6b/ami-identity-dbe7b9a2fdc5ea53247dffbbcfd67969-2024-11-30T14-58-04.496Z_cropped.png/1200x630cw.png",
    featured: true, url: "https://x.com/MicrophoneSet/status/2007889837417013498",
  },
  {
    id: 2, artist: "sickoboymp3", genre: "Hip-Hop / Rap",
    title: "Conversation with sickoboymp3 on &WSIC",
    excerpt: "A conversation with sickoboymp3 on his forthcoming project '&WSIC' with contributions from thetodi and nas_mkay.",
    date: "2025-11-03", duration: "40 min",
    image: "https://i.ytimg.com/vi/kMHVWEsuiYs/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGEEgZChlMA8=&rs=AOn4CLDnNAZjEatpGjZo3l4WrC-n6ykUrA",
    featured: false, url: "https://x.com/MicrophoneSet/status/1985451270677664008",
  },
  {
    id: 3, artist: "B4MIDELE", genre: "Indie Soul / R&B",
    title: "Conversation with B4MIDELE on A///G",
    excerpt: "Discussing B4MIDELE's upcoming two-pack 'A///G', his creative process, and music journey.",
    date: "2025-04-11", duration: "35 min",
    image: "https://images.squarespace-cdn.com/content/v1/5a5653aeb7411ce23017e460/008c2f3b-ea5c-4009-bbdb-2d0875db2828/22-11-27+Steven+bamidele+Album+Shoot+Roll+6+Edits+00002.jpeg",
    featured: false, url: "https://x.com/microphoneset/status/1910785025634693244",
  },
  {
    id: 4, artist: "AsaduChinaza", genre: "Afrobeats / Pop",
    title: "Thrilling Conversation with AsaduChinaza",
    excerpt: "An engaging talk with AsaduChinaza about her new release, influences, and other music-related topics.",
    date: "2024-01-13", duration: "45 min",
    image: "https://i.ytimg.com/vi/QLTTGAjRnRQ/sddefault.jpg?sqp=-oaymwEmCIAFEOAD8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFggXChlMA8=&rs=AOn4CLBucB8gn9-AveeUVEUoZBxPKu8ekA",
    featured: false, url: "https://x.com/microphoneset/status/1746260938359988660",
  },
  {
    id: 5, artist: "Fasina", genre: "Afropop / Alt R&B",
    title: "Space with Fasina",
    excerpt: "A fun conversation with Fasina exploring his music, influences, and bridging pop and Afro genres.",
    date: "2023-11-18", duration: "38 min",
    image: "http://thenativemag.com/wp-content/uploads/2017/09/Fasina-1.png",
    featured: false, url: "https://x.com/microphoneset/status/1725969442394210405",
  },
  {
    id: 6, artist: "Emaxee", genre: "Afrobeats / Hip-Hop",
    title: "Sharing the Space with Emaxee",
    excerpt: "A discussion with Emaxee on his music, creative process, and journey as a rapper and songwriter.",
    date: "2023-06-11", duration: "42 min",
    image: "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages221/v4/f1/e7/65/f1e76513-7d30-aecc-adea-8e52ecb57a06/file_cropped.png/1200x630cw.png",
    featured: false, url: "https://x.com/microphoneset/status/1667954745246470152",
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
            id: index + 1, artist: item.artistName, genre: item.platform,
            title: item.title, excerpt: item.description, date: new Date().toISOString(),
            duration: "40 min", image: item.image, featured: item.featured, url: item.externalUrl,
          }));
          setInterviews(mapped);
        }
      } catch (error) { console.log("Using fallback interviews:", error); }
      finally { setIsLoading(false); }
    };
    fetchInterviews();
  }, []);

  const featuredInterview = interviews.find((i) => i.featured);
  const regularInterviews = interviews.filter((i) => !i.featured);

  return (
    <div className="bg-paper text-ink overflow-hidden">
      {/* Hero */}
      <section className="pt-16 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-4 mb-6">
            <span
              className="inline-block bg-ink text-paper font-typewriter text-[11px] uppercase tracking-[3px] px-4 py-1.5"
              style={{ transform: "rotate(-2deg)" }}
            >
              Artist Conversations
            </span>
            <div
              className="hidden md:flex w-16 h-16 border-[3px] border-cutout-red rounded-full items-center justify-center font-typewriter text-[8px] uppercase text-cutout-red text-center leading-tight tracking-wider"
              style={{ transform: "rotate(12deg)" }}
            >
              Live
              <br />
              Talks
            </div>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-ink mb-6">
            Behind The
            <br />
            <span className="inline-block bg-cutout-red text-paper px-4 py-1 relative cutout-border" style={{ transform: "rotate(-1.5deg)" }}>
              Music
            </span>
          </h1>
          <p className="font-body text-lg text-ink/60 max-w-xl leading-relaxed border-l-[3px] border-ink pl-4">
            In-depth conversations with artists, producers, and creators shaping the sound of tomorrow.
          </p>
        </div>
      </section>

      {/* Featured Interview */}
      {featuredInterview && (
        <section className="py-12 px-6 md:px-12 bg-paper-white">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block bg-cutout-yellow text-ink font-typewriter text-xs uppercase tracking-[3px] px-3 py-1 mb-8" style={{ transform: "rotate(-1deg)" }}>
              Featured Interview
            </span>

            <a href={featuredInterview.url} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-1 lg:grid-cols-2 gap-10 no-underline text-ink items-center">
              <div className="relative bg-paper-white p-2 shadow-[3px_3px_0_rgba(0,0,0,0.1)] group-hover:shadow-hard transition-all duration-300" style={{ transform: "rotate(-2deg)" }}>
                <div className="absolute w-16 h-5 bg-cutout-yellow/70 top-[-10px] right-8 z-10" style={{ transform: "rotate(3deg)" }} />
                <div className="absolute w-14 h-4 bg-cutout-yellow/70 bottom-[-8px] left-6 z-10" style={{ transform: "rotate(-2deg)" }} />
                <div className="aspect-[4/3] overflow-hidden bg-ink/10">
                  {featuredInterview.image && (
                    <img src={featuredInterview.image} alt={featuredInterview.artist} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
              </div>

              <div>
                <span className="inline-block font-typewriter text-[10px] uppercase tracking-wider px-2 py-0.5 border border-ink/20 mb-4" style={{ transform: "rotate(1deg)" }}>
                  {featuredInterview.genre}
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-ink mb-3 group-hover:text-cutout-red transition-colors">{featuredInterview.artist}</h2>
                <h3 className="font-body text-lg text-ink/60 mb-4">{featuredInterview.title}</h3>
                <p className="font-body text-ink/50 leading-relaxed mb-6">{featuredInterview.excerpt}</p>
                <div className="flex items-center gap-4 font-typewriter text-[10px] text-ink/30 uppercase tracking-wider mb-6">
                  <span>{new Date(featuredInterview.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span>&bull;</span>
                  <span>{featuredInterview.duration}</span>
                </div>
                <span className="inline-block font-typewriter text-sm uppercase tracking-[2px] px-6 py-3 bg-ink text-paper border-[3px] border-ink shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 transition-all duration-200" style={{ transform: "rotate(-1deg)" }}>
                  Watch Interview
                </span>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Interview Grid */}
      <section className="py-16 px-6 md:px-12 bg-paper">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-10">Recent Interviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? [...Array(5)].map((_, i) => (
                  <div key={i} className="bg-paper-white border-2 border-ink/10 h-96 animate-pulse" />
                ))
              : regularInterviews.map((interview, i) => (
                  <motion.a
                    key={interview.id}
                    href={interview.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                    className="group relative bg-paper-white p-2 shadow-[3px_3px_0_rgba(0,0,0,0.1)] hover:shadow-hard hover:rotate-0! transition-all duration-300 no-underline text-ink block"
                    style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * ((i % 3) + 1) * 0.6}deg)` }}
                  >
                    <div className="absolute w-14 h-4 bg-cutout-yellow/70 top-[-8px] left-1/2 -translate-x-1/2 z-10" style={{ transform: `rotate(${i % 2 === 0 ? 2 : -3}deg)` }} />

                    <div className="relative h-56 overflow-hidden bg-ink/10">
                      {interview.image && (
                        <img src={interview.image} alt={interview.artist} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-ink text-paper font-typewriter text-[10px] uppercase tracking-wider px-2 py-1">{interview.duration}</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <span className="inline-block font-typewriter text-[10px] uppercase tracking-wider text-cutout-red mb-2">{interview.genre}</span>
                      <h3 className="font-display text-xl text-ink mb-1 group-hover:text-cutout-red transition-colors">{interview.artist}</h3>
                      <p className="font-body text-sm text-ink/50 line-clamp-2 mb-3">{interview.title}</p>
                      <span className="font-typewriter text-[10px] text-ink/30 uppercase tracking-wider">
                        {new Date(interview.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </motion.a>
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
          <div className="inline-flex items-center justify-center w-20 h-20 border-[3px] border-cutout-red rounded-full font-typewriter text-[9px] uppercase text-cutout-red text-center leading-tight tracking-wider mb-8" style={{ transform: "rotate(15deg)" }}>
            Share
            <br />Your
            <br />Story
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-paper mb-6">
            Want to Share
            <br />
            <span className="inline-block bg-cutout-red text-paper px-4 py-1 mt-2" style={{ transform: "rotate(-1deg)" }}>
              Your Story?
            </span>
          </h2>
          <p className="font-body text-paper/50 text-lg mb-10 max-w-xl mx-auto">
            We&apos;re always looking for talented artists to feature. Share your journey with our community.
          </p>
          <Link
            to="/contact"
            className="inline-block font-typewriter text-sm uppercase tracking-[2px] px-8 py-4 bg-paper text-ink border-[3px] border-paper shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 transition-all duration-200 no-underline"
            style={{ transform: "rotate(-1deg)" }}
          >
            Submit Your Story
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Interviews;
