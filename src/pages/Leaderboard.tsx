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

  // Calculate progress percentage relative to top score
  const getProgressWidth = (percentage: number, topPercentage: number) => {
    return Math.round((percentage / topPercentage) * 100);
  };

  const topScore = leaderboard[0]?.percentage || 100;

  return (
    <div className="bg-white text-gray-900 overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 px-6 md:px-12 overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#3b82f6]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#8b5cf6]/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-gray-900 mb-3"
            >
              Top Players
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg text-gray-500 font-light"
            >
              Music trivia champions this month
            </motion.p>
          </div>

          {/* Stats Row */}
          {stats && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl"
            >
              {[
                { icon: TrendingUp, value: stats.totalQuizzes.toLocaleString(), label: "Total Quizzes" },
                { icon: Target, value: `${Math.round(stats.averagePercentage)}%`, label: "Average Score" },
                { icon: Award, value: `${stats.topScore?.percentage || 0}%`, label: "Top Score" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <stat.icon className="w-8 h-8 text-[#3b82f6]" />
                  <div>
                    <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
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
              {/* Top 3 Cards */}
              {offset === limit && leaderboard.length > 0 && (
                <div className="mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {leaderboard.slice(0, 3).map((entry, index) => {
                      const rank = index + 1;
                      const isFirst = rank === 1;

                      return (
                        <motion.div
                          key={entry._id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={`relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-100 shadow-lg overflow-hidden ${isFirst ? 'md:order-first' : ''}`}
                        >

                          {/* Rank badge */}
                          <div className="flex items-center gap-2 mb-6">
                            {rank === 1 ? (
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200">
                                <Crown className="w-4 h-4 text-amber-600" />
                                <span className="text-sm font-bold text-amber-700">#1 CHAMPION</span>
                              </div>
                            ) : (
                              <span className="text-sm font-semibold text-gray-400 tracking-wide">#{rank}</span>
                            )}
                          </div>

                          {/* Player name */}
                          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 truncate">
                            {entry.userName}
                          </h3>

                          {/* Score */}
                          <div className="text-3xl sm:text-4xl font-light text-[#3b82f6] mb-6">
                            {entry.percentage}%
                          </div>

                          {/* Metrics */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Correct</p>
                              <p className="text-lg font-semibold text-gray-900">{entry.score}/{entry.totalQuestions}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Date</p>
                              <p className="text-lg font-semibold text-gray-900">
                                {new Date(entry.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Rest of Leaderboard - Table View */}
              {leaderboard.length > 3 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                  {/* Table Header */}
                  <div className="px-6 sm:px-8 py-5 border-b border-gray-100">
                    <h2 className="text-xl font-black text-gray-900">All Players</h2>
                  </div>

                  {/* Table Rows */}
                  <div className="divide-y divide-gray-50">
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
                          className={`group flex items-center gap-4 sm:gap-6 px-6 sm:px-8 py-5 hover:bg-gray-50 transition-colors duration-200 ${
                            isCurrentUser ? 'bg-[#3b82f6]/5' : ''
                          }`}
                        >
                          {/* Rank */}
                          <div className="flex-shrink-0 w-12 sm:w-16">
                            <span className="text-xl sm:text-2xl font-semibold text-gray-400">
                              {displayRank}
                            </span>
                          </div>

                          {/* Player Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`text-base sm:text-lg font-semibold truncate ${
                                isCurrentUser ? 'text-[#3b82f6]' : 'text-gray-900'
                              }`}>
                                {entry.userName}
                              </h4>
                              {isCurrentUser && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3b82f6] text-white text-xs font-bold">
                                  <Star className="w-3 h-3 fill-current" />
                                  You
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {entry.score}/{entry.totalQuestions} correct
                            </p>
                            {/* Progress Bar */}
                            <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressWidth}%` }}
                                transition={{ duration: 0.8, delay: 0.2 + index * 0.02 }}
                                className="h-full bg-[#3b82f6] rounded-full"
                              />
                            </div>
                          </div>

                          {/* Score */}
                          <div className="flex-shrink-0">
                            <span className="text-2xl sm:text-3xl font-light text-[#3b82f6]">
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
