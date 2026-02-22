import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { triviaApi } from "@/services/api";
import { AnimatePresence, motion } from "framer-motion";
import { Ticker } from "@/components/zine/Ticker";

const navItems = [
  { name: "Playlists", link: "/playlists" },
  { name: "Blog", link: "/blog" },
  { name: "Interviews", link: "/interviews" },
  { name: "Recommendations", link: "/recommendations" },
  { name: "Trivia", link: "/trivia" },
  { name: "Contact", link: "/contact" },
];

const footerLinks = {
  explore: [
    { name: "Playlists", path: "/playlists" },
    { name: "Blog", path: "/blog" },
    { name: "Interviews", path: "/interviews" },
    { name: "Recommendations", path: "/recommendations" },
  ],
  company: [
    { name: "Contact", path: "/contact" },
    { name: "Trivia", path: "/trivia" },
    { name: "Leaderboard", path: "/trivia/leaderboard" },
  ],
};

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkActiveTrivia = async () => {
      try {
        const data = await triviaApi.getRandom(1);
        setShowBanner(data && data.length > 0);
      } catch {
        setShowBanner(false);
      }
    };

    if (location.pathname === "/") {
      checkActiveTrivia();
    }
  }, [location.pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ====== NAVIGATION ====== */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-ink text-paper px-6 md:px-12 flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="w-2 h-2 bg-cutout-red rounded-full" />
          <span className="font-display text-lg tracking-wide">
            The Microphone Set
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-7 list-none">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className={`font-typewriter text-xs uppercase tracking-[2px] transition-colors duration-200 ${
                  location.pathname === item.link
                    ? "text-cutout-yellow"
                    : "text-paper/60 hover:text-cutout-yellow"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/trivia"
          className="hidden lg:block font-typewriter text-[11px] uppercase tracking-[2px] px-4 py-2 bg-cutout-red text-paper border-none cursor-pointer transition-all duration-200 hover:bg-cutout-yellow hover:text-ink"
          style={{ transform: "rotate(-1deg)" }}
        >
          Play Trivia
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-paper cursor-pointer bg-transparent border-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-14 left-0 right-0 z-[999] bg-ink border-t border-paper/10 px-6 py-6 lg:hidden"
          >
            <ul className="flex flex-col gap-4 list-none">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    className={`font-typewriter text-sm uppercase tracking-[2px] block py-1 ${
                      location.pathname === item.link
                        ? "text-cutout-yellow"
                        : "text-paper/60"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== ANNOUNCEMENT BANNER ====== */}
      <AnimatePresence>
        {location.pathname === "/" && showBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 left-0 right-0 z-[998] bg-cutout-yellow text-ink text-center py-2 px-4 font-typewriter text-[13px] tracking-wider flex items-center justify-center gap-3"
          >
            <span>
              Think you know lyrics? Prove it in our{" "}
              <strong className="bg-ink text-cutout-yellow px-2 py-0.5 inline-block rotate-[-1deg]">
                Trivia Challenge
              </strong>{" "}
              &mdash;{" "}
              <Link
                to="/trivia"
                className="underline decoration-wavy underline-offset-4 hover:text-cutout-red transition-colors"
              >
                Play now
              </Link>
            </span>
            <button
              onClick={() => setShowBanner(false)}
              className="absolute right-4 bg-transparent border-none text-ink/50 hover:text-ink cursor-pointer text-lg"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== MAIN CONTENT ====== */}
      <div className="relative z-[2] pt-14">
        <Outlet />
      </div>

      {/* ====== TICKER ====== */}
      <Ticker />

      {/* ====== FOOTER ====== */}
      <footer className="relative z-[2] bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-5">
              <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
                <span className="w-2 h-2 bg-cutout-red rounded-full" />
                <span className="font-display text-2xl tracking-wide">
                  The Microphone Set
                </span>
              </Link>
              <p className="font-body text-paper/50 text-sm leading-relaxed max-w-sm mb-8 border-l-2 border-cutout-red pl-4">
                Discover your next favorite sound. We talk about music, share
                playlists, interview artists, and help you discover new sounds
                that resonate with your soul.
              </p>
              {/* Stamp */}
              <div
                className="inline-flex items-center justify-center w-20 h-20 border-[3px] border-cutout-red rounded-full font-typewriter text-[9px] uppercase text-cutout-red text-center leading-tight tracking-wider"
                style={{ transform: "rotate(15deg)" }}
              >
                Est.
                <br />
                2024
                <br />
                Sound
                <br />
                Culture
              </div>
            </div>

            {/* Explore */}
            <div className="md:col-span-3">
              <h3
                className="font-typewriter text-xs uppercase tracking-[3px] text-cutout-yellow mb-6 inline-block"
                style={{ transform: "rotate(-1deg)" }}
              >
                Explore
              </h3>
              <ul className="space-y-3 list-none">
                {footerLinks.explore.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="font-typewriter text-sm text-paper/50 hover:text-cutout-yellow transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="md:col-span-2">
              <h3
                className="font-typewriter text-xs uppercase tracking-[3px] text-cutout-yellow mb-6 inline-block"
                style={{ transform: "rotate(1deg)" }}
              >
                More
              </h3>
              <ul className="space-y-3 list-none">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="font-typewriter text-sm text-paper/50 hover:text-cutout-yellow transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter mini */}
            <div className="md:col-span-2">
              <h3
                className="font-typewriter text-xs uppercase tracking-[3px] text-cutout-yellow mb-6 inline-block"
                style={{ transform: "rotate(-0.5deg)" }}
              >
                Subscribe
              </h3>
              <p className="font-body text-paper/40 text-xs mb-4">
                Get weekly updates
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-2"
              >
                <input
                  type="email"
                  placeholder="email@you.com"
                  className="bg-paper/10 border border-paper/20 px-3 py-2 font-typewriter text-xs text-paper placeholder:text-paper/30 focus:outline-none focus:border-cutout-yellow transition-colors"
                />
                <button
                  type="submit"
                  className="bg-cutout-red text-paper font-typewriter text-xs uppercase tracking-wider py-2 border-none cursor-pointer hover:bg-cutout-yellow hover:text-ink transition-colors duration-200"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-paper/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-typewriter text-xs text-paper/30 tracking-wider">
              {new Date().getFullYear()} The Microphone Set. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://onunkwor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-typewriter text-[10px] uppercase tracking-[2px] px-3 py-1.5 border border-cutout-red/40 text-cutout-red/70 hover:bg-cutout-red hover:text-paper transition-all duration-200"
                style={{ transform: "rotate(-1deg)" }}
              >
                Crafted by Raphael
              </a>
              <Link
                to="/privacy"
                className="font-typewriter text-xs text-paper/30 hover:text-paper/60 transition-colors tracking-wider"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="font-typewriter text-xs text-paper/30 hover:text-paper/60 transition-colors tracking-wider"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
