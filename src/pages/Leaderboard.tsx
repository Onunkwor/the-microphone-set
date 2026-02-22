import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Crown,
  Calendar,
  Target,
  TrendingUp,
  Loader2,
  ChevronDown,
  Award,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { leaderboardApi, type LeaderboardEntry } from "@/services/api";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [stats, setStats] = useState<any>(null);
  const [userRanking, setUserRanking] = useState<LeaderboardEntry | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);

  const [period, setPeriod] = useState<"all-time" | "monthly" | "weekly">("all-time");

  const limit = 20;

  useEffect(() => {
    const userName = localStorage.getItem('trivia_user_name');
    if (userName) {
      setCurrentUserName(userName);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard(true);
    fetchStats();
    if (currentUserName) {
      fetchUserRanking();
    }
  }, [period, currentUserName]);

  const fetchUserRanking = async () => {
    if (!currentUserName) return;
    try {
      const data = await leaderboardApi.getPersonalBest(currentUserName);
      setUserRanking(data);
    } catch (error) {
      console.error("Failed to fetch user ranking:", error);
      setUserRanking(null);
    }
  };

  const fetchLeaderboard = async (reset = false) => {
    setIsLoading(true);
    try {
      const currentOffset = reset ? 0 : offset;
      const data = await leaderboardApi.getLeaderboard({
        limit,
        offset: currentOffset,
        period,
      });

      if (reset) {
        setLeaderboard(data.results);
        setOffset(limit);
      } else {
        setLeaderboard([...leaderboard, ...data.results]);
        setOffset(currentOffset + limit);
      }

      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await leaderboardApi.getStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const getProgressWidth = (percentage: number, topPercentage: number) => {
    return Math.round((percentage / topPercentage) * 100);
  };

  const topScore = leaderboard[0]?.percentage || 100;

  return (
    <div className="bg-paper text-ink overflow-hidden min-h-screen">
      {/* Hero */}
      <section className="pt-16 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-4 mb-6">
            <span
              className="inline-block bg-ink text-paper font-typewriter text-[11px] uppercase tracking-[3px] px-4 py-1.5"
              style={{ transform: "rotate(-2deg)" }}
            >
              Hall of Fame
            </span>
            <div
              className="hidden md:flex w-16 h-16 border-[3px] border-cutout-red rounded-full items-center justify-center font-typewriter text-[8px] uppercase text-cutout-red text-center leading-tight tracking-wider"
              style={{ transform: "rotate(12deg)" }}
            >
              Top
              <br />
              Scores
            </div>
          </div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-ink mb-6"
          >
            Top
            <br />
            <span
              className="inline-block bg-cutout-red text-paper px-4 py-1 relative cutout-border"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              Players
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-lg text-ink/60 max-w-xl leading-relaxed border-l-[3px] border-ink pl-4"
          >
            Music trivia champions. See who reigns supreme.
          </motion.p>
        </div>
      </section>

      {/* Stats Row */}
      {stats && (
        <section className="px-6 md:px-12 pb-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: TrendingUp, value: (stats.totalPlayers || stats.totalQuizzes).toLocaleString(), label: "Total Players" },
              { icon: Target, value: `${Math.round(stats.averagePercentage)}%`, label: "Average Score" },
              { icon: Award, value: `${stats.topScore?.percentage || 0}%`, label: "Top Score" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="relative bg-paper-white p-5 border-2 border-ink/10 hover:border-ink hover:shadow-hard transition-all duration-300"
                style={{ transform: `rotate(${i === 0 ? -0.5 : i === 1 ? 0.3 : -0.3}deg)` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-ink flex items-center justify-center shrink-0">
                    <stat.icon className="w-5 h-5 text-paper" />
                  </div>
                  <div>
                    <p className="font-display text-2xl text-ink">{stat.value}</p>
                    <p className="font-typewriter text-[10px] text-ink/40 uppercase tracking-wider">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* User's Personal Ranking */}
      {userRanking && currentUserName && (
        <section className="px-6 md:px-12 pb-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-cutout-yellow/20 p-6 sm:p-8 border-2 border-dashed border-ink/20"
              style={{ transform: "rotate(0.3deg)" }}
            >
              <div className="absolute w-14 h-4 bg-cutout-yellow/70 top-[-8px] left-8 z-10" style={{ transform: "rotate(-2deg)" }} />

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-cutout-red rounded-full flex items-center justify-center"
                    style={{ transform: "rotate(10deg)" }}
                  >
                    <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-cutout-red" />
                  </div>
                  <div>
                    <p className="font-typewriter text-xs text-ink/50 uppercase tracking-wider mb-1">Your Ranking</p>
                    <h3 className="font-display text-2xl sm:text-3xl text-ink">
                      <span className="text-cutout-red">#{userRanking.rank}</span>
                      <span className="font-body text-base sm:text-lg text-ink/50 ml-2">of {stats?.totalPlayers || stats?.totalQuizzes || 'all'} players</span>
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-6 sm:gap-8">
                  <div className="text-center">
                    <p
                      className="inline-block bg-cutout-red text-paper font-display text-2xl sm:text-3xl px-3 py-0.5"
                      style={{ transform: "rotate(-1deg)" }}
                    >
                      {userRanking.percentage}%
                    </p>
                    <p className="font-typewriter text-[10px] text-ink/40 uppercase tracking-wider mt-1">Score</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-2xl sm:text-3xl text-ink">{userRanking.score}/{userRanking.totalQuestions}</p>
                    <p className="font-typewriter text-[10px] text-ink/40 uppercase tracking-wider mt-1">Correct</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="px-6 md:px-12 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 bg-paper-white border-2 border-ink/10 px-4 py-2.5">
              <Calendar className="w-4 h-4 text-ink/40" />
              <span className="font-typewriter text-xs text-ink/50 uppercase tracking-wider">Filter:</span>
              <div className="flex gap-2 ml-1">
                {[
                  { value: 'all-time', label: 'All Time' },
                  { value: 'monthly', label: 'Month' },
                  { value: 'weekly', label: 'Week' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPeriod(option.value as any)}
                    className={`font-typewriter text-xs uppercase tracking-wider px-3 py-1.5 border-2 transition-all duration-200 cursor-pointer ${
                      period === option.value
                        ? 'bg-ink text-paper border-ink'
                        : 'bg-transparent text-ink/50 border-ink/10 hover:border-ink/30'
                    }`}
                    style={{ transform: `rotate(${option.value === 'monthly' ? 0.5 : option.value === 'weekly' ? -0.5 : 0}deg)` }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Content */}
      <section className="py-12 px-6 md:px-12 bg-paper-white">
        <div className="max-w-7xl mx-auto">
          {isLoading && offset === 0 ? (
            <div className="text-center py-20">
              <Loader2 className="w-12 h-12 text-ink animate-spin mx-auto mb-4" />
              <p className="font-typewriter text-sm uppercase tracking-wider text-ink/60">Loading leaderboard...</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-20">
              <Trophy className="w-16 h-16 text-ink/20 mx-auto mb-4" />
              <p className="font-display text-xl text-ink mb-2">No results found</p>
              <p className="font-body text-ink/50">Be the first to take the quiz!</p>
              <Link
                to="/trivia"
                className="inline-block mt-6 font-typewriter text-sm uppercase tracking-[2px] px-8 py-4 bg-ink text-paper border-[3px] border-ink shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 transition-all duration-200 no-underline"
                style={{ transform: "rotate(-0.5deg)" }}
              >
                Take the Quiz
              </Link>
            </div>
          ) : (
            <>
              {/* Top 3 Cards */}
              {offset === limit && leaderboard.length > 0 && (
                <div className="mb-16">
                  <span
                    className="inline-block bg-cutout-yellow text-ink font-typewriter text-xs uppercase tracking-[3px] px-3 py-1 mb-8"
                    style={{ transform: "rotate(-1deg)" }}
                  >
                    Top 3
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {leaderboard.slice(0, 3).map((entry, index) => {
                      const rank = index + 1;

                      return (
                        <motion.div
                          key={entry._id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="group relative bg-paper p-6 sm:p-8 border-2 border-ink/10 hover:border-ink hover:shadow-hard transition-all duration-300"
                          style={{ transform: `rotate(${(index % 2 === 0 ? -1 : 1) * (index + 1) * 0.5}deg)` }}
                        >
                          {/* Tape */}
                          <div
                            className="absolute w-14 h-4 bg-cutout-yellow/70 top-[-8px] left-1/2 -translate-x-1/2 z-10"
                            style={{ transform: `rotate(${index % 2 === 0 ? 2 : -3}deg)` }}
                          />

                          {/* Rank badge */}
                          <div className="mb-6">
                            {rank === 1 ? (
                              <div className="flex items-center gap-2">
                                <div
                                  className="inline-flex items-center gap-2 bg-cutout-yellow text-ink font-typewriter text-xs uppercase tracking-wider px-3 py-1"
                                  style={{ transform: "rotate(-1deg)" }}
                                >
                                  <Crown className="w-4 h-4" />
                                  #1 Champion
                                </div>
                              </div>
                            ) : (
                              <span
                                className="inline-block bg-ink text-paper font-typewriter text-xs uppercase tracking-wider px-2.5 py-1"
                                style={{ transform: "rotate(1deg)" }}
                              >
                                #{rank}
                              </span>
                            )}
                          </div>

                          {/* Player name */}
                          <h3 className="font-display text-xl sm:text-2xl text-ink mb-2 truncate">
                            {entry.userName}
                          </h3>

                          {/* Score */}
                          <div
                            className="inline-block bg-cutout-red text-paper font-display text-3xl sm:text-4xl px-3 py-0.5 mb-6"
                            style={{ transform: "rotate(-1deg)" }}
                          >
                            {entry.percentage}%
                          </div>

                          {/* Metrics */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-paper-white border border-ink/10 p-3">
                              <p className="font-typewriter text-[10px] text-ink/40 uppercase tracking-wider mb-1">Correct</p>
                              <p className="font-display text-lg text-ink">{entry.score}/{entry.totalQuestions}</p>
                            </div>
                            <div className="bg-paper-white border border-ink/10 p-3">
                              <p className="font-typewriter text-[10px] text-ink/40 uppercase tracking-wider mb-1">Attempts</p>
                              <p className="font-display text-lg text-ink">{entry.attemptCount || 1}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Rest of Leaderboard */}
              {leaderboard.length > 3 && (
                <div
                  className="bg-paper border-2 border-ink/10 overflow-hidden"
                  style={{ transform: "rotate(0.1deg)" }}
                >
                  {/* Table Header */}
                  <div className="px-6 sm:px-8 py-5 border-b-2 border-ink/10">
                    <h2 className="font-display text-xl text-ink">All Players</h2>
                  </div>

                  {/* Table Rows */}
                  <div className="divide-y divide-ink/5">
                    {leaderboard.slice(3).map((entry, index) => {
                      const displayRank = entry.rank || (index + 4);
                      const isCurrentUser = entry.userName === currentUserName;
                      const progressWidth = getProgressWidth(entry.percentage, topScore);

                      return (
                        <motion.div
                          key={entry._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.02 }}
                          className={`group flex items-center gap-4 sm:gap-6 px-6 sm:px-8 py-5 hover:bg-paper-white transition-colors duration-200 ${
                            isCurrentUser ? 'bg-cutout-yellow/10' : ''
                          }`}
                        >
                          {/* Rank */}
                          <div className="flex-shrink-0 w-12 sm:w-16">
                            <span className="font-display text-xl sm:text-2xl text-ink/30">
                              {displayRank}
                            </span>
                          </div>

                          {/* Player Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-display text-base sm:text-lg truncate ${
                                isCurrentUser ? 'text-cutout-red' : 'text-ink'
                              }`}>
                                {entry.userName}
                              </h4>
                              {isCurrentUser && (
                                <span className="inline-flex items-center gap-1 bg-cutout-red text-paper font-typewriter text-[9px] uppercase tracking-wider px-2 py-0.5">
                                  <Star className="w-3 h-3 fill-current" />
                                  You
                                </span>
                              )}
                            </div>
                            <p className="font-body text-sm text-ink/40">
                              {entry.score}/{entry.totalQuestions} correct
                              {entry.attemptCount && entry.attemptCount > 1 && (
                                <span className="ml-2 text-ink/30">&middot; {entry.attemptCount} attempts</span>
                              )}
                            </p>
                            {/* Progress Bar */}
                            <div className="mt-2 h-1.5 bg-ink/5 overflow-hidden border border-ink/5">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressWidth}%` }}
                                transition={{ duration: 0.8, delay: 0.2 + index * 0.02 }}
                                className="h-full bg-cutout-red"
                              />
                            </div>
                          </div>

                          {/* Score */}
                          <div className="flex-shrink-0">
                            <span className="font-display text-2xl sm:text-3xl text-ink/30">
                              {entry.percentage}%
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Load More */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center mt-12"
                >
                  <button
                    onClick={() => fetchLeaderboard(false)}
                    disabled={isLoading}
                    className="font-typewriter text-sm uppercase tracking-[2px] px-8 py-4 bg-ink text-paper border-[3px] border-ink shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    style={{ transform: "rotate(-0.5deg)" }}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Loading...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Load More Rankings
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #f5f0e8 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-paper mb-6">
            Think You Can
            <br />
            <span className="inline-block bg-cutout-red text-paper px-4 py-1 mt-2" style={{ transform: "rotate(-1deg)" }}>
              Do Better?
            </span>
          </h2>
          <p className="font-body text-paper/50 text-lg mb-10 max-w-xl mx-auto">
            Take the trivia challenge and claim your spot on the leaderboard.
          </p>
          <Link
            to="/trivia"
            className="inline-block font-typewriter text-sm uppercase tracking-[2px] px-8 py-4 bg-paper text-ink border-[3px] border-paper shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 transition-all duration-200 no-underline"
            style={{ transform: "rotate(-1deg)" }}
          >
            Take Music Quiz
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
