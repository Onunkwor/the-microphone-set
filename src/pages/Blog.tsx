import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "The Evolution of Hip-Hop: From Bronx to Global Phenomenon",
      excerpt:
        "Explore how hip-hop transformed from underground street culture to the most influential music genre of our time.",
      category: "Music History",
      author: "Marcus Johnson",
      date: "2025-01-15",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=3270&auto=format&fit=crop",
      featured: true,
    },
    {
      id: 2,
      title: "Behind the Beats: How Modern Producers Shape Sound",
      excerpt:
        "A deep dive into production techniques that define today's music landscape.",
      category: "Production",
      author: "Sarah Chen",
      date: "2025-01-12",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=3270&auto=format&fit=crop",
      featured: false,
    },
    {
      id: 3,
      title: "Vinyl Revival: Why Analog is Making a Comeback",
      excerpt:
        "Understanding the resurgence of vinyl records in the digital age.",
      category: "Culture",
      author: "David Martinez",
      date: "2025-01-10",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=3270&auto=format&fit=crop",
      featured: false,
    },
    {
      id: 4,
      title: "10 Emerging Artists You Need to Hear Right Now",
      excerpt:
        "Discover the next generation of musical talent before they hit mainstream.",
      category: "Discovery",
      author: "Emma Williams",
      date: "2025-01-08",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=3270&auto=format&fit=crop",
      featured: false,
    },
    {
      id: 5,
      title: "The Science of Sound: What Makes a Perfect Mix?",
      excerpt:
        "Breaking down the technical and artistic elements of audio engineering.",
      category: "Production",
      author: "Alex Thompson",
      date: "2025-01-05",
      readTime: "9 min read",
      image:
        "https://images.unsplash.com/photo-1519508234439-4f23643125c1?q=80&w=3270&auto=format&fit=crop",
      featured: false,
    },
    {
      id: 6,
      title: "Music Festivals Post-Pandemic: A New Era",
      excerpt:
        "How live music events are evolving and what to expect in 2025.",
      category: "Culture",
      author: "Jordan Lee",
      date: "2025-01-03",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3270&auto=format&fit=crop",
      featured: false,
    },
  ];

  const featuredArticle = articles.find((article) => article.featured);
  const regularArticles = articles.filter((article) => !article.featured);

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

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#3b82f6] text-sm font-semibold uppercase tracking-widest">
              Featured Story
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-8 rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xl">
              {/* Image */}
              <div
                className="h-80 lg:h-auto bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredArticle.image})` }}
              />

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] text-sm font-medium w-fit mb-4">
                  {featuredArticle.category}
                </span>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredArticle.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="bg-[#3b82f6] text-white hover:bg-[#2563eb] rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_#3b82f640] w-fit"
                >
                  <Link to={`/blog/${featuredArticle.id}`}>
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="text-[#3b82f6] text-sm font-semibold uppercase tracking-widest">
                Latest
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
                Recent Articles
              </h2>
            </div>
            <Link
              to="/blog/all"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#3b82f6] font-semibold transition-colors duration-300"
            >
              View all articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <Link
                key={article.id}
                to={`/blog/${article.id}`}
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
              </Link>
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
