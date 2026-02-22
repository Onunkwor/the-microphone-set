import { Link } from "react-router-dom";

const Terms = () => {
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
            Terms of Use
          </h1>
          <p className="font-typewriter text-xs text-ink/40 uppercase tracking-wider">
            Last updated: February 2026
          </p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ink">Welcome</h2>
            <p className="font-body text-ink/60 leading-relaxed">
              By using The Microphone Set, you agree to these terms. It's pretty straightforward —
              enjoy the music, be respectful, and have fun.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ink">Content</h2>
            <p className="font-body text-ink/60 leading-relaxed">
              All articles, playlists, and original content on The Microphone Set are our
              intellectual property. You're welcome to share links, but please don't
              reproduce our content without permission.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ink">Trivia & Leaderboard</h2>
            <p className="font-body text-ink/60 leading-relaxed">
              When participating in trivia, use a respectful name. We reserve the right to
              remove any inappropriate entries from the leaderboard without notice.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ink">External Links</h2>
            <p className="font-body text-ink/60 leading-relaxed">
              We link to external services like Spotify and Substack. We're not responsible
              for their content or policies — use them at your own discretion.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ink">Changes</h2>
            <p className="font-body text-ink/60 leading-relaxed">
              We may update these terms from time to time. Continued use of the site means
              you accept any changes. Questions? Hit us up on the{" "}
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

export default Terms;
