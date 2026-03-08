import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NewsletterForm } from "@/components/zine/NewsletterForm";
import { blogsApi, type Blog as BlogType } from "@/services/api";

interface Article {
  id: number | string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  url: string;
  featured: boolean;
}

const staticArticles: Article[] = [
  {
    id: 1, title: "The 'Philip Uzo and The Electric Revival' Live Show",
    excerpt: "Something inside me was revived at the 'Philip Uzo and The Electric Revival' show. Philip Uzo positively redefined the way I perceive live music.",
    category: "Events", author: "Rotimi, The Genius", date: "2025-12-13", readTime: "5 min read",
    image: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9fc0ad75-f979-4458-8355-dbec838a57fc_4032x3024.jpeg",
    url: "https://themicrophoneset.substack.com/p/the-philip-uzo-and-the-electric-revival", featured: true,
  },
  {
    id: 2, title: "Lagos is like a Mosquito: A Review of Lagos Shuffle by Ibejii",
    excerpt: "Whether you want to call it alternative or Highlife or folk or Afrobeat, the quality of Ibejii's Lagos Shuffle exceeds the constraints of tying it down to a specific genre.",
    category: "Reviews", author: "Rotimi, The Genius", date: "2025-11-15", readTime: "6 min read",
    image: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7f337354-2982-4b04-9e0f-41c2aee213be_800x793.jpeg",
    url: "https://themicrophoneset.substack.com/p/the-city-in-melody-rhythm-and-colors", featured: false,
  },
  {
    id: 3, title: "The TMS Stock Market Update: Artists to invest in now Vol. 2",
    excerpt: "The stock market is going up and you're sleeping? Don't worry though, Rotimi is back to give you a list of the amazing music makers to do some high stakes investing on.",
    category: "Discovery", author: "Rotimi, The Genius", date: "2025-03-31", readTime: "7 min read",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/db88d5a5-5b0c-4703-abbd-8c1d2ec796ca_1920x1920.jpeg",
    url: "https://themicrophoneset.substack.com/p/the-tms-stock-market-update-artists-796", featured: false,
  },
  {
    id: 4, title: "TMS Curated: Kokoroko",
    excerpt: "The first time I listened to Kokoroko's music was an absolute trip. I pressed play and went into full out-of-body experience mode.",
    category: "Curated", author: "Rotimi, The Genius", date: "2025-03-15", readTime: "5 min read",
    image: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5907981a-8e5d-4970-ab4d-43f50ba5b221_1080x864.jpeg",
    url: "https://themicrophoneset.substack.com/p/kokoroko-jazz-afrobeat-highlife", featured: false,
  },
  {
    id: 5, title: "TMS Curated: Yinka Bernie",
    excerpt: "Production, lyricism, melodies, rhythm, emotions. These are usually the things I look out for when listening to music. Yinka Bernie checks all the boxes.",
    category: "Curated", author: "Rotimi, The Genius", date: "2025-03-04", readTime: "8 min read",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/653b39bf-0a13-44ed-ae9e-1b96aebc8795_736x672.jpeg",
    url: "https://themicrophoneset.substack.com/p/tms-curated-yinka-bernie", featured: false,
  },
  {
    id: 6, title: "The TMS Stock Market Update: Artists to invest in now",
    excerpt: "Nigeria is one of the leading hotspots for talents in the global music industry. Let's talk about some undeniable young talents.",
    category: "Discovery", author: "Rotimi, The Genius", date: "2025-02-27", readTime: "6 min read",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/11c8f198-8cee-4f12-af63-bda463139834_1242x1242.jpeg",
    url: "https://themicrophoneset.substack.com/p/the-tms-stock-market-update-artists", featured: false,
  },
];

const Blog = () => {
  const [serverArticles, setServerArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogsApi.getAll();
        if (data && data.length > 0) {
          const mapped: Article[] = data
            .filter((blog: BlogType) => blog.published)
            .map((blog: BlogType) => ({
              id: blog._id || blog.title,
              title: blog.title,
              excerpt: blog.excerpt,
              category: blog.category,
              author: blog.author,
              date: blog.createdAt || new Date().toISOString(),
              readTime: `${Math.max(3, Math.ceil(blog.content.length / 1000))} min read`,
              image: blog.image,
              url: blog.externalUrl || "#",
              featured: blog.featured,
            }));
          setServerArticles(mapped);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const allArticles = [...serverArticles, ...staticArticles];
  // Deduplicate by title (server blogs take priority)
  const seen = new Set<string>();
  const articles = allArticles.filter((a) => {
    const key = a.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const featuredArticle = articles.find((a) => a.featured) || articles[0];
  const restArticles = articles.filter((a) => a.id !== featuredArticle?.id);

  return (
    <div className="bg-paper text-ink overflow-hidden">
      {/* Masthead */}
      <section className="pt-16 pb-8 px-6 md:px-12 border-b-[3px] border-ink">
        <div className="max-w-7xl mx-auto text-center">
          <div className="font-typewriter text-xs uppercase tracking-[4px] text-ink/40 mb-4">
            Vol. II &mdash; {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl leading-none text-ink mb-4">
            The Microphone Set
          </h1>
          <div className="flex items-center justify-center gap-4 font-typewriter text-xs uppercase tracking-[3px] text-ink/40">
            <span>Music</span>
            <span className="w-1 h-1 bg-cutout-red rounded-full" />
            <span>Culture</span>
            <span className="w-1 h-1 bg-cutout-red rounded-full" />
            <span>Discovery</span>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-12 px-6 md:px-12 bg-paper">
          <div className="max-w-7xl mx-auto">
            <span
              className="inline-block bg-cutout-red text-paper font-typewriter text-xs uppercase tracking-[3px] px-3 py-1 mb-6"
              style={{ transform: "rotate(-1deg)" }}
            >
              Featured
            </span>

            <a
              href={featuredArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 no-underline text-ink"
            >
              <div className="relative bg-paper-white p-2 shadow-[3px_3px_0_rgba(0,0,0,0.1)] group-hover:shadow-hard transition-all duration-300" style={{ transform: "rotate(-1deg)" }}>
                <div className="absolute w-16 h-5 bg-cutout-yellow/70 top-[-10px] left-8 z-10" style={{ transform: "rotate(-2deg)" }} />
                <div className="h-64 md:h-80 overflow-hidden bg-ink/10">
                  {featuredArticle.image && (
                    <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="inline-block w-fit bg-ink text-paper font-typewriter text-[10px] uppercase tracking-wider px-2 py-0.5 mb-4" style={{ transform: "rotate(1deg)" }}>
                  {featuredArticle.category}
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-4 group-hover:text-cutout-red transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="font-body text-ink/60 leading-relaxed mb-6 border-l-[3px] border-ink pl-4">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 font-typewriter text-[10px] text-ink/30 uppercase tracking-wider">
                  <span>{featuredArticle.author}</span>
                  <span>&bull;</span>
                  <span>{new Date(featuredArticle.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span>&bull;</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="py-16 px-6 md:px-12 bg-paper-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-ink">All Articles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restArticles.map((article, i) => (
                  <motion.a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                    className="group relative bg-paper p-2 shadow-[3px_3px_0_rgba(0,0,0,0.1)] hover:shadow-hard hover:rotate-0! transition-all duration-300 no-underline text-ink block"
                    style={{ transform: `rotate(${(i % 2 === 0 ? 1 : -1) * ((i % 3) + 1) * 0.4}deg)` }}
                  >
                    {/* Category */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-block bg-cutout-red text-paper font-typewriter text-[10px] uppercase tracking-wider px-2 py-0.5" style={{ transform: "rotate(-2deg)" }}>
                        {article.category}
                      </span>
                    </div>

                    <div className="h-48 overflow-hidden bg-ink/10">
                      {article.image && (
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-display text-lg text-ink mb-2 line-clamp-2 group-hover:text-cutout-red transition-colors">
                        {article.title}
                      </h3>
                      <p className="font-body text-xs text-ink/50 line-clamp-2 mb-3">{article.excerpt}</p>
                      <div className="flex items-center justify-between font-typewriter text-[10px] text-ink/30 uppercase tracking-wider border-t border-ink/10 pt-3">
                        <span>{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </motion.a>
                ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 md:px-12 bg-paper">
        <NewsletterForm />
      </section>
    </div>
  );
};

export default Blog;
