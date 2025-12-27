import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-black/5 rounded-full px-4 py-2 mb-6">
            <BookOpen className="w-5 h-5 text-[var(--electric-blue)]" />
            <span className="text-sm font-medium">Latest Articles</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Stories From <span className="gradient-ocean-text">The Scene</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deep dives into music culture, production secrets, artist profiles,
            and everything in between
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden hover-lift hover-glow">
              <div className="grid md:grid-cols-2 gap-0">
                <div
                  className="h-96 md:h-auto bg-cover bg-center"
                  style={{ backgroundImage: `url(${featuredArticle.image})` }}
                />
                <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white">
                  <span className="inline-block text-sm font-semibold text-[var(--electric-blue)] mb-4">
                    {featuredArticle.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 mb-6 text-lg">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredArticle.date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredArticle.readTime}
                    </span>
                  </div>
                  <Button className="gradient-bg-ocean text-white hover:opacity-90 w-fit">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover-lift hover-glow border-gray-200 bg-white"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <div className="p-6">
                  <span className="text-xs font-semibold text-[var(--electric-blue)] uppercase tracking-wide">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-bold mt-2 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/blog/${article.id}`}>Read More</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-[var(--electric-blue)] to-[var(--vibrant-purple)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-xl mb-8 opacity-90">
            Get weekly music insights, artist interviews, and playlist updates
            delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-[var(--electric-blue)] hover:bg-gray-100 px-8 py-3 rounded-full font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
