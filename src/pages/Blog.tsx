import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
 const articles = [
  {
    id: 1,
    title: "The 'Philip Uzo and The Electric Revival' Live Show",
    excerpt:
      "Something inside me was revived at the 'Philip Uzo and The Electric Revival' show. Philip Uzo positively redefined the way I perceive live music.",
    category: "Events",
    author: "Rotimi, The Genius",
    date: "2025-12-13",
    readTime: "5 min read",
    image:
      "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9fc0ad75-f979-4458-8355-dbec838a57fc_4032x3024.jpeg",
    url: "https://themicrophoneset.substack.com/p/the-philip-uzo-and-the-electric-revival",
    featured: true,
  },
  {
    id: 2,
    title: "Lagos is like a Mosquito: A Review of Lagos Shuffle by Ibejii",
    excerpt:
      "Whether you want to call it alternative or Highlife or folk or Afrobeat, the quality of Ibejii's Lagos Shuffle exceeds the constraints of tying it down to a specific genre.",
    category: "Reviews",
    author: "Rotimi, The Genius",
    date: "2025-11-15",
    readTime: "6 min read",
    image:
      "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7f337354-2982-4b04-9e0f-41c2aee213be_800x793.jpeg",
    url: "https://themicrophoneset.substack.com/p/the-city-in-melody-rhythm-and-colors",
    featured: false,
  },
  {
    id: 3,
    title: "The TMS Stock Market Update: Artists to invest in now Vol. 2",
    excerpt:
      "The stock market is going up and you're sleeping? Don't worry though, Rotimi is back to give you a list of the amazing music makers to do some high stakes investing on.",
    category: "Discovery",
    author: "Rotimi, The Genius",
    date: "2025-03-31",
    readTime: "7 min read",
    image:
      "https://substack-post-media.s3.amazonaws.com/public/images/db88d5a5-5b0c-4703-abbd-8c1d2ec796ca_1920x1920.jpeg",
    url: "https://themicrophoneset.substack.com/p/the-tms-stock-market-update-artists-796",
    featured: false,
  },
  {
    id: 4,
    title: "TMS Curated: Kokoroko",
    excerpt:
      "The first time I listened to Kokoroko's music was an absolute trip. I pressed play and went into full out-of-body experience mode. The song; the 7-minute emotional blend of jazz and highlife, Abusey Junction.",
    category: "Curated",
    author: "Rotimi, The Genius",
    date: "2025-03-15",
    readTime: "5 min read",
    image:
      "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5907981a-8e5d-4970-ab4d-43f50ba5b221_1080x864.jpeg",
    url: "https://themicrophoneset.substack.com/p/kokoroko-jazz-afrobeat-highlife",
    featured: false,
  },
  {
    id: 5,
    title: "TMS Curated: Yinka Bernie",
    excerpt:
      "Production, lyricism, melodies, rhythm, emotions. These are usually the things I look out for when listening to music. Yinka Bernie is one artist whose music checks all the boxes.",
    category: "Curated",
    author: "Rotimi, The Genius",
    date: "2025-03-04",
    readTime: "8 min read",
    image:
      "https://substack-post-media.s3.amazonaws.com/public/images/653b39bf-0a13-44ed-ae9e-1b96aebc8795_736x672.jpeg",
    url: "https://themicrophoneset.substack.com/p/tms-curated-yinka-bernie",
    featured: false,
  },
  {
    id: 6,
    title: "The TMS Stock Market Update: Artists to invest in now",
    excerpt:
      "Nigeria is one of the leading hotspots for talents in the global music industry. Let's talk about some undeniable young talents in the Nigerian music space that you should invest in ASAP.",
    category: "Discovery",
    author: "Rotimi, The Genius",
    date: "2025-02-27",
    readTime: "6 min read",
    image:
      "https://substack-post-media.s3.amazonaws.com/public/images/11c8f198-8cee-4f12-af63-bda463139834_1242x1242.jpeg",
    url: "https://themicrophoneset.substack.com/p/the-tms-stock-market-update-artists",
    featured: false,
  },
  {
    id: 7,
    title: "The TMS Project Set Up: 4 Projects You Should Check Out Right Now",
    excerpt:
      "Two things the Dancing In The Desert crew are known for is making incredible music and dropping unique and creative projects. Here are 4 projects you need to hear.",
    category: "Reviews",
    author: "Rotimi, The Genius",
    date: "2025-02-02",
    readTime: "5 min read",
    image:
      "https://substack-post-media.s3.amazonaws.com/public/images/14fa03de-20e5-471b-b95d-f582a81a3114_1598x1594.jpeg",
    url: "https://themicrophoneset.substack.com/p/the-tms-project-set-up-4-projects",
    featured: false,
  },
  {
    id: 8,
    title: "The TMS Set-Up: Just My Luck/Tomorrow Man",
    excerpt:
      "I get excited for all new Obongjayar music the same; running-around-the-streets screaming at the top of my lungs with jazz hands like I'm pumped up on amphetamines excited.",
    category: "Reviews",
    author: "Rotimi, The Genius",
    date: "2024-10-10",
    readTime: "5 min read",
    image:
      "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7c034707-b580-4eb3-bfc7-d4811054ca4c_2048x2048.jpeg",
    url: "https://themicrophoneset.substack.com/p/the-tms-set-up-just-my-lucktomorrow",
    featured: false,
  },
  {
    id: 9,
    title: "The TMS Project Set-Up: 12 Summers Album Review",
    excerpt:
      "Due to his remarkable work in the Nigerian music industry, BOJ has undoubtedly cemented his place as one of the best artists in Nigeria and as a pioneer of one of our most beloved sub-genres.",
    category: "Reviews",
    author: "Rotimi, The Genius",
    date: "2024-07-30",
    readTime: "10 min read",
    image:
      "https://i.scdn.co/image/ab67616d0000b2735609b541fb2c366b315fbf03",
    url: "https://themicrophoneset.substack.com/p/the-tms-project-set-up-12-summers",
    featured: false,
  },
  {
    id: 10,
    title: "HEIS Album Review (Guest Review)",
    excerpt:
      "Rema's sophomore album is a pop assemblage without heart. While catchy and well-produced, it lacks the thematic depth and cohesiveness of Rave & Roses.",
    category: "Reviews",
    author: "Akinola Anuoluwa",
    date: "2024-07-11",
    readTime: "12 min read",
    image:
      "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb5000f97-b704-4f44-907e-7f351bd091cf_800x800.jpeg",
    url: "https://themicrophoneset.substack.com/p/heis-album-review-guest-review",
    featured: false,
  },
  {
    id: 11,
    title: "The TMS Project Set-Up: Ikigai / 生き甲斐, Vol. 1",
    excerpt:
      "When I'm given the responsibility of controlling the aux at a gathering, my immediate go-to is to play Olamide's songs. His latest project has already been widely accepted.",
    category: "Reviews",
    author: "Rotimi, The Genius",
    date: "2024-06-28",
    readTime: "7 min read",
    image:
      "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F19d0c037-047d-41d0-9dac-fe667c72efa7_800x798.jpeg",
    url: "https://themicrophoneset.substack.com/p/the-tms-project-set-up-ikigai-vol",
    featured: false,
  },
  {
    id: 12,
    title: "King Sunny Ade: A Musical Journey",
    excerpt:
      "People say true art is timeless and KSA's music is the perfect example. King Sunny Ade is a Nigerian singer, songwriter, band leader, multi-instrumentalist and music icon.",
    category: "Features",
    author: "Rotimi, The Genius",
    date: "2024-06-18",
    readTime: "10 min read",
    image:
      "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff9ad9ff0-bf1d-4288-88ca-bae302a473f4_960x640.jpeg",
    url: "https://themicrophoneset.substack.com/p/king-sunny-ade-a-musical-journey",
    featured: false,
  },
  {
    id: 13,
    title: "The TMS Project Set-Up: Escape To Paradise",
    excerpt:
      "If you have ever experienced randomly finding a really talented artist on a Spotify or Apple Music curated playlist, then you understand how I felt when I first heard Saezn's 4 Your Eye.",
    category: "Reviews",
    author: "Rotimi, The Genius",
    date: "2024-06-08",
    readTime: "6 min read",
    image:
      "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa67cf772-5e56-401a-8ecc-c80fd3ebf6cc_1125x1151.jpeg",
    url: "https://themicrophoneset.substack.com/p/the-tms-project-set-up-escape-to",
    featured: false,
  },
  {
    id: 14,
    title: "Hits From The 2000's",
    excerpt:
      "Maybe music ages like fine wine, or nostalgia is just the greatest sonic sweetener ever. Either way, no one can deny that old music has a spin to it that may seem inimitable.",
    category: "Features",
    author: "Rotimi, The Genius",
    date: "2024-06-01",
    readTime: "5 min read",
    image:
      "https://substack-post-media.s3.amazonaws.com/public/images/37fdd139-8354-41f0-a8b6-c7bce7e4335d_1750x1158.jpeg",
    url: "https://themicrophoneset.substack.com/p/hits-from-the-2000s",
    featured: false,
  },
  {
    id: 15,
    title: "Five Under-The-Radar Projects",
    excerpt:
      "We have made a list of five amazing Nigerian projects that we think just did not get the hype they deserved.",
    category: "Discovery",
    author: "Rotimi, The Genius",
    date: "2024-05-18",
    readTime: "8 min read",
    image:
      "https://substack-post-media.s3.amazonaws.com/public/images/dee4703b-7484-4af2-9a31-008d0f64eb09_1080x1080.png",
    url: "https://themicrophoneset.substack.com/p/tms-five-under-the-radar-projects",
    featured: false,
  },
];

  const regularArticles = articles;

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-6 md:px-12">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#3b82f6]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-[#3b82f6]/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-8">
              <BookOpen className="w-4 h-4 text-[#3b82f6]" />
              <span className="text-sm text-gray-600 font-medium tracking-wide uppercase">
                Latest Articles
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight text-gray-900 mb-6">
              Stories From
              <br />
              <span className="text-[#3b82f6]">The Scene</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
              Deep dives into music culture, production secrets, artist profiles, and everything in between.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="text-[#3b82f6] text-sm font-semibold uppercase tracking-widest">
                Latest
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
                All Articles
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#3b82f6]/30 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${article.image})` }}
                  />

                  {/* Number badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-5xl font-bold text-white/20">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-semibold text-[#3b82f6] uppercase tracking-wide">
                    {article.category}
                  </span>

                  <h3 className="text-xl font-bold mt-2 mb-3 text-gray-900 group-hover:text-[#3b82f6] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden bg-[#3b82f6]">
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

        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto relative z-10 text-center text-white">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-8">
            <BookOpen className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Stay in
            <br />
            The Loop
          </h2>

          <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto">
            Get weekly music insights, artist interviews, and playlist updates delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30 border-0"
            />
            <Button
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-8 py-4 font-bold shadow-xl hover:scale-105 transition-transform duration-300"
            >
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
