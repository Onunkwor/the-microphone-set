import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Crown,
  Calendar,
  Target,
  TrendingUp,
  Loader2,
  ChevronDown,
  Award,
  Star,
} from "lucide-react";
import { leaderboardApi, type LeaderboardEntry } from "@/services/api";
import { Button } from "@/components/ui/button";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [stats, setStats] = useState<any>(null);
  const [userRanking, setUserRanking] = useState<LeaderboardEntry | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);

  // Filters
  const [period, setPeriod] = useState<"all-time" | "monthly" | "weekly">("all-time");

  const limit = 50;

  useEffect(() => {
    // Get user name from localStorage if they've played trivia
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
      console.log('Fetching leaderboard with:', { limit, offset: currentOffset, period });

      const data = await leaderboardApi.getLeaderboard({
        limit,
        offset: currentOffset,
        period,
      });

      console.log('Leaderboard data received:', data);

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

  return (
    <div className="bg-white text-gray-900 overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 px-6 md:px-12 overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #3b82f6 1px, transparent 1px),
                linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              opacity: 0.03
            }}
          />
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#3b82f6]/8 rounded-full blur-[180px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-400/6 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#3b82f6]/10 via-blue-500/10 to-[#3b82f6]/10 border border-[#3b82f6]/20 shadow-lg shadow-[#3b82f6]/5 mb-8"
            >
              <div className="relative">
                <Trophy className="w-5 h-5 text-[#3b82f6]" />
                <motion.div
                  className="absolute -inset-1 bg-[#3b82f6]/20 rounded-full blur-sm"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-sm text-[#3b82f6] font-bold tracking-wider uppercase">
                Global Rankings
              </span>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none text-gray-900 mb-4 sm:mb-6 tracking-tight">
                <span className="inline-block" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Hall of
                </span>
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#3b82f6] via-blue-600 to-[#3b82f6] bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Fame
                  </span>
                  <motion.div
                    className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-3 sm:h-4 bg-[#3b82f6]/10 -rotate-1"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light px-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Where music masters compete and legends are born
            </motion.p>
          </div>

          {/* Stats */}
          {stats && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto px-4"
            >
              {[
                { icon: TrendingUp, value: stats.totalQuizzes.toLocaleString(), label: "Total Quizzes", color: "from-blue-500 to-[#3b82f6]" },
                { icon: Target, value: `${Math.round(stats.averagePercentage)}%`, label: "Average Score", color: "from-[#3b82f6] to-blue-600" },
                { icon: Award, value: `${stats.topScore?.percentage || 0}%`, label: "Top Score", color: "from-blue-600 to-blue-700" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring", bounce: 0.3 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/20 to-blue-600/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                  <div className="relative p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-white border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#3b82f6]/5 to-transparent rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16" />
                    <stat.icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#3b82f6] mb-4 sm:mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    <p className={`text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2 sm:mb-3`}>
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* User's Personal Ranking */}
      {userRanking && currentUserName && (
        <section className="py-6 px-4 sm:px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3b82f6] via-blue-600 to-[#3b82f6] p-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-pulse" style={{ animationDuration: '3s' }} />
              <div className="relative bg-white rounded-[22px] p-6 sm:p-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-blue-600 flex items-center justify-center shadow-lg shadow-[#3b82f6]/30">
                      <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-medium">Your Ranking</p>
                      <h3 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-baseline gap-2">
                        <span className="text-[#3b82f6]">#{userRanking.rank}</span>
                        <span className="text-base sm:text-lg text-gray-500 font-normal">of {stats?.totalPlayers || 'all'} players</span>
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 sm:gap-8">
                    <div className="text-center">
                      <p className="text-3xl sm:text-4xl font-black text-[#3b82f6]">{userRanking.percentage}%</p>
                      <p className="text-xs text-gray-500 font-medium mt-1">Score</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl sm:text-4xl font-black text-gray-900">{userRanking.score}/{userRanking.totalQuestions}</p>
                      <p className="text-xs text-gray-500 font-medium mt-1">Correct</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full bg-white border-2 border-gray-200 shadow-sm w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#3b82f6]" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">Filter:</span>
              </div>
              <div className="flex gap-2 w-full sm:w-auto sm:ml-2">
                {[
                  { value: 'all-time', label: 'All Time' },
                  { value: 'monthly', label: 'Month' },
                  { value: 'weekly', label: 'Week' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPeriod(option.value as any)}
                    className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                      period === option.value
                        ? 'bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/30 scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
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
      <section className="py-12 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {isLoading && offset === 0 ? (
            <div className="text-center py-20">
              <Loader2 className="w-12 h-12 text-[#3b82f6] animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Loading leaderboard...</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-20">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl font-bold text-gray-600 mb-2">No results found</p>
              <p className="text-gray-500">Be the first to take the quiz!</p>
            </div>
          ) : (
            <>
              {/* Top 3 Podium */}
              {offset === limit && leaderboard.length > 0 && (
                <div className="mb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-16"
                  >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-200/50 shadow-xl shadow-amber-500/10">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <span className="text-base font-black text-amber-700 tracking-wide">Champions Podium</span>
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    </div>
                  </motion.div>

                  {/* Podium with actual heights */}
                  <div className="max-w-5xl mx-auto px-4">
                    {/* Mobile: Vertical stack */}
                    <div className="md:hidden space-y-4 mb-8">
                      {leaderboard.slice(0, 3).map((entry, index) => {
                        const displayIndex = index;
                        const rank = index + 1;

                        const colors: {
                          1: { bg: string; text: string; border: string; icon: typeof Crown };
                          2: { bg: string; text: string; border: string; icon: typeof Medal };
                          3: { bg: string; text: string; border: string; icon: typeof Medal };
                        } = {
                          1: { bg: 'from-amber-400 via-yellow-400 to-amber-500', text: 'text-amber-900', border: 'border-amber-300', icon: Crown },
                          2: { bg: 'from-slate-300 via-gray-300 to-slate-400', text: 'text-slate-800', border: 'border-slate-300', icon: Medal },
                          3: { bg: 'from-orange-400 via-amber-600 to-orange-500', text: 'text-orange-900', border: 'border-orange-400', icon: Medal }
                        };

                        const Icon = colors[rank as 1 | 2 | 3].icon;
                        const colorSet = colors[rank as 1 | 2 | 3];

                        return (
                          <motion.div
                            key={entry._id}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: displayIndex * 0.1 }}
                            className="relative"
                          >
                            <div className={`p-6 rounded-2xl bg-gradient-to-r ${colorSet.bg} border-2 ${colorSet.border} shadow-xl`}>
                              <div className="flex items-center gap-4">
                                {/* Medal/Crown */}
                                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border-2 border-white/50">
                                  <Icon className={`w-8 h-8 ${colorSet.text}`} />
                                </div>

                                {/* User info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-2xl font-black ${colorSet.text}`}>#{rank}</span>
                                    <h3 className={`text-lg font-black ${colorSet.text} truncate`}>
                                      {entry.userName}
                                    </h3>
                                  </div>
                                  <p className={`text-sm font-bold ${colorSet.text} opacity-80`}>
                                    {entry.score}/{entry.totalQuestions} correct
                                  </p>
                                </div>

                                {/* Score */}
                                <div className="flex-shrink-0 text-right">
                                  <div className={`text-4xl font-black ${colorSet.text} drop-shadow-md`}>
                                    {entry.percentage}%
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Desktop: Podium */}
                    <div className="hidden md:flex items-end justify-center gap-4 lg:gap-6 mb-8">
                      {/* Reorder: 2nd, 1st, 3rd for podium effect */}
                      {leaderboard.length >= 3 ? (
                        [1, 0, 2].map((index, displayIndex) => {
                          const entry = leaderboard[index];
                          if (!entry) return null;
                          const rank = index + 1;

                        const heights = {
                          1: 'h-72 lg:h-96',
                          2: 'h-60 lg:h-80',
                          3: 'h-52 lg:h-72'
                        };

                        const colors = {
                          1: { bg: 'from-amber-400 via-yellow-400 to-amber-500', text: 'text-amber-900', border: 'border-amber-300' },
                          2: { bg: 'from-slate-300 via-gray-300 to-slate-400', text: 'text-slate-800', border: 'border-slate-300' },
                          3: { bg: 'from-orange-400 via-amber-600 to-orange-500', text: 'text-orange-900', border: 'border-orange-400' }
                        };
                        
                        const heightClass = heights[rank as 1 | 2 | 3];
                        const colorSet = colors[rank as 1 | 2 | 3];

                        return (
                          <motion.div
                            key={entry._id}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.3 + displayIndex * 0.15,
                              type: "spring",
                              bounce: 0.4
                            }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="flex-1 group cursor-pointer max-w-xs"
                          >
                            <div className="relative">
                              {/* Trophy/Medal Icon */}
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.6 + displayIndex * 0.15, type: "spring", bounce: 0.6 }}
                                className="absolute -top-8 lg:-top-12 left-1/2 -translate-x-1/2 z-20"
                              >
                                <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${colorSet.bg} flex items-center justify-center shadow-2xl border-4 border-white group-hover:scale-125 transition-transform duration-300`}>
                                  {rank === 1 && <Crown className="w-6 h-6 lg:w-8 lg:h-8 text-white drop-shadow-lg" />}
                                  {rank === 2 && <Medal className="w-6 h-6 lg:w-8 lg:h-8 text-white drop-shadow-lg" />}
                                  {rank === 3 && <Medal className="w-6 h-6 lg:w-8 lg:h-8 text-white drop-shadow-lg" />}
                                </div>
                              </motion.div>

                              {/* Podium */}
                              <div className={`relative ${heightClass} rounded-t-3xl bg-gradient-to-b ${colorSet.bg} border-4 ${colorSet.border} border-b-0 shadow-2xl overflow-hidden group-hover:shadow-3xl transition-all duration-300`}>
                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/10 to-transparent" />

                                {/* Rank number */}
                                <div className="absolute top-4 lg:top-6 inset-x-0 flex justify-center">
                                  <div className={`text-5xl lg:text-8xl font-black ${colorSet.text} opacity-20 group-hover:opacity-30 transition-opacity`}>
                                    {rank}
                                  </div>
                                </div>

                                {/* User info */}
                                <div className="absolute bottom-0 inset-x-0 p-4 lg:p-6 text-center">
                                  <h3 className={`text-base lg:text-xl font-black ${colorSet.text} mb-1 lg:mb-2 truncate drop-shadow-sm`}>
                                    {entry.userName}
                                  </h3>
                                  <div className={`text-2xl lg:text-4xl font-black ${colorSet.text} mb-1 drop-shadow-md`}>
                                    {entry.percentage}%
                                  </div>
                                  <p className={`text-xs lg:text-sm font-bold ${colorSet.text} opacity-80`}>
                                    {entry.score}/{entry.totalQuestions} correct
                                  </p>
                                </div>
                              </div>

                              {/* Podium base */}
                              <div className={`h-3 lg:h-4 bg-gradient-to-b ${colorSet.bg} border-4 border-t-0 ${colorSet.border} rounded-b-lg shadow-xl`} />
                            </div>
                          </motion.div>
                        );
                      })
                      ) : (
                        // Show entries in order if less than 3
                        leaderboard.slice(0, 3).map((entry, index) => {
                          const displayIndex = index;
                          const rank = index + 1;

                          const heights = {
                            1: 'h-72 lg:h-96',
                            2: 'h-60 lg:h-80',
                            3: 'h-52 lg:h-72'
                          };

                          const colors = {
                            1: { bg: 'from-amber-400 via-yellow-400 to-amber-500', text: 'text-amber-900', border: 'border-amber-300' },
                            2: { bg: 'from-slate-300 via-gray-300 to-slate-400', text: 'text-slate-800', border: 'border-slate-300' },
                            3: { bg: 'from-orange-400 via-amber-600 to-orange-500', text: 'text-orange-900', border: 'border-orange-400' }
                          };
                          
                          const heightClass = heights[rank as 1 | 2 | 3];
                          const colorSet = colors[rank as 1 | 2 | 3];

                          return (
                            <motion.div
                              key={entry._id}
                              initial={{ opacity: 0, y: 100 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.8,
                                delay: 0.3 + displayIndex * 0.15,
                                type: "spring",
                                bounce: 0.4
                              }}
                              whileHover={{ y: -10, transition: { duration: 0.3 } }}
                              className="flex-1 group cursor-pointer max-w-xs"
                            >
                              <div className="relative">
                                {/* Trophy/Medal Icon */}
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ delay: 0.6 + displayIndex * 0.15, type: "spring", bounce: 0.6 }}
                                  className="absolute -top-8 lg:-top-12 left-1/2 -translate-x-1/2 z-20"
                                >
                                  <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${colorSet.bg} flex items-center justify-center shadow-2xl border-4 border-white group-hover:scale-125 transition-transform duration-300`}>
                                    {rank === 1 && <Crown className="w-6 h-6 lg:w-8 lg:h-8 text-white drop-shadow-lg" />}
                                    {rank === 2 && <Medal className="w-6 h-6 lg:w-8 lg:h-8 text-white drop-shadow-lg" />}
                                    {rank === 3 && <Medal className="w-6 h-6 lg:w-8 lg:h-8 text-white drop-shadow-lg" />}
                                  </div>
                                </motion.div>

                                {/* Podium */}
                                <div className={`relative ${heightClass} rounded-t-3xl bg-gradient-to-b ${colorSet.bg} border-4 ${colorSet.border} border-b-0 shadow-2xl overflow-hidden group-hover:shadow-3xl transition-all duration-300`}>
                                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                                  <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/10 to-transparent" />

                                  {/* Rank number */}
                                  <div className="absolute top-4 lg:top-6 inset-x-0 flex justify-center">
                                    <div className={`text-5xl lg:text-8xl font-black ${colorSet.text} opacity-20 group-hover:opacity-30 transition-opacity`}>
                                      {rank}
                                    </div>
                                  </div>

                                  {/* User info */}
                                  <div className="absolute bottom-0 inset-x-0 p-4 lg:p-6 text-center">
                                    <h3 className={`text-base lg:text-xl font-black ${colorSet.text} mb-1 lg:mb-2 truncate drop-shadow-sm`}>
                                      {entry.userName}
                                    </h3>
                                    <div className={`text-2xl lg:text-4xl font-black ${colorSet.text} mb-1 drop-shadow-md`}>
                                      {entry.percentage}%
                                    </div>
                                    <p className={`text-xs lg:text-sm font-bold ${colorSet.text} opacity-80`}>
                                      {entry.score}/{entry.totalQuestions} correct
                                    </p>
                                  </div>
                                </div>

                                {/* Podium base */}
                                <div className={`h-3 lg:h-4 bg-gradient-to-b ${colorSet.bg} border-4 border-t-0 ${colorSet.border} rounded-b-lg shadow-xl`} />
                              </div>
                            </motion.div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Rest of Leaderboard - Table View */}
              {leaderboard.length > 3 && (
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex items-center gap-4 mb-10"
                  >
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-gray-300 to-gray-300" />
                    <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-4 py-2 bg-gray-50 rounded-full">
                      All Rankings
                    </span>
                    <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent via-gray-300 to-gray-300" />
                  </motion.div>

                  {leaderboard.slice(3).map((entry, index) => {
                  // Calculate rank with fallback - entry.rank from backend, or calculate from index
                  const displayRank = entry.rank || (index + 4);
                  const isCurrentUser = entry.userName === currentUserName;

                  return (
                  <motion.div
                    key={entry._id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.03, type: "spring", stiffness: 100 }}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="group relative"
                  >
                    {/* Subtle gradient background on hover or current user */}
                    <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                      isCurrentUser 
                        ? 'bg-gradient-to-r from-[#3b82f6]/10 via-purple-500/10 to-[#3b82f6]/10 opacity-100' 
                        : 'bg-gradient-to-r from-[#3b82f6]/0 via-[#3b82f6]/5 to-[#3b82f6]/0 opacity-0 group-hover:opacity-100'
                    }`} />

                    <div className={`relative p-4 sm:p-6 md:p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 ${
                      isCurrentUser 
                        ? 'border-2 border-[#3b82f6] ring-2 ring-[#3b82f6]/20' 
                        : 'border-2 border-gray-100 hover:border-[#3b82f6]/30'
                    }`}>
                      {isCurrentUser && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#3b82f6] text-white text-xs font-bold shadow-lg">
                            <Star className="w-3 h-3 fill-current" />
                            You
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 sm:gap-4 md:gap-8">
                        {/* Rank Badge */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 rotate-3 group-hover:rotate-0 ${
                              isCurrentUser
                                ? 'bg-gradient-to-br from-purple-500 via-[#3b82f6] to-blue-600 shadow-[#3b82f6]/50 group-hover:shadow-2xl'
                                : 'bg-gradient-to-br from-[#3b82f6] via-blue-600 to-[#2563eb] shadow-[#3b82f6]/30 group-hover:shadow-2xl group-hover:shadow-[#3b82f6]/40'
                            }`}>
                              <span className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                                {displayRank}
                              </span>
                            </div>
                            {/* Decorative corner accent */}
                            <div className={`absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full transition-opacity ${
                              isCurrentUser ? 'bg-purple-400 opacity-100' : 'bg-blue-400 opacity-50 group-hover:opacity-100'
                            }`} />
                          </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-base sm:text-lg md:text-2xl font-black truncate mb-1 md:mb-2 transition-colors duration-300 ${
                            isCurrentUser ? 'text-[#3b82f6]' : 'text-gray-900 group-hover:text-[#3b82f6]'
                          }`}>
                            {entry.userName}
                          </h4>
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-4 text-xs sm:text-sm md:text-base text-gray-600">
                            <span className="font-semibold bg-gray-50 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg">
                              {entry.score}/{entry.totalQuestions} correct
                            </span>
                            <span className="text-gray-300 hidden sm:inline">•</span>
                            <span className="hidden sm:inline text-gray-500 text-xs md:text-sm">
                              {new Date(entry.completedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Score - Large and prominent */}
                        <div className="flex-shrink-0 text-right">
                          <div className="relative">
                            <div className={`text-3xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 ${
                              isCurrentUser
                                ? 'bg-gradient-to-br from-purple-500 via-[#3b82f6] to-blue-600'
                                : 'bg-gradient-to-br from-[#3b82f6] to-blue-600'
                            }`}>
                              {entry.percentage}
                              <span className="text-lg sm:text-2xl md:text-3xl">%</span>
                            </div>
                            {/* Subtle shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 opacity-0 group-hover:opacity-20 group-hover:translate-x-full transition-all duration-700" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
                </div>
              )}

              {/* Load More */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center mt-12 sm:mt-16"
                >
                  <Button
                    onClick={() => fetchLeaderboard(false)}
                    disabled={isLoading}
                    size="lg"
                    className="group relative bg-gradient-to-r from-[#3b82f6] to-blue-600 text-white rounded-full px-8 sm:px-12 py-5 sm:py-7 font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_#3b82f640] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden w-full sm:w-auto max-w-sm"
                  >
                    {/* Animated background shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                          <span className="text-sm sm:text-base">Loading More...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm sm:text-base">Load More Rankings</span>
                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
