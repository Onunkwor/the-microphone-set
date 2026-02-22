import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="bg-paper text-ink overflow-hidden">
      <section className="pt-16 pb-8 px-6 md:px-12 border-b-[3px] border-ink">
        <div className="max-w-3xl mx-auto">
          <span
            className="inline-block bg-ink text-paper font-typewriter text-[11px] uppercase tracking-[3px] px-4 py-1.5 mb-6"
            style={{ transform: "rotate(-2deg)" }}
          >
            Legal
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-ink mb-2">
            Privacy Policy
          </h1>
          <p className="font-typewriter text-xs text-ink/40 uppercase tracking-wider">
            Last updated: February 2026
          </p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ink">What We Collect</h2>
            <p className="font-body text-ink/60 leading-relaxed">
              We keep things simple. When you use The Microphone Set, we may collect your name
              (if you play trivia), your email (if you subscribe to our newsletter), and basic
              analytics data to understand how people use the site.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ink">How We Use It</h2>
            <p className="font-body text-ink/60 leading-relaxed">
              Your information is used solely to provide and improve our services — displaying
              leaderboard rankings, sending newsletter updates, and making the site better.
              We don't sell your data to third parties. Ever.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ink">Cookies</h2>
            <p className="font-body text-ink/60 leading-relaxed">
              We use minimal cookies and local storage to remember your preferences, like your
              trivia name. No invasive tracking, no creepy ad cookies.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ink">Third-Party Services</h2>
            <p className="font-body text-ink/60 leading-relaxed">
              We embed Spotify players for playlists and link to Substack for articles.
              These services have their own privacy policies that apply when you interact with them.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ink">Contact</h2>
            <p className="font-body text-ink/60 leading-relaxed">
              Questions about your privacy? Reach out through our{" "}
              <Link to="/contact" className="text-cutout-red hover:underline">
                contact page
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
