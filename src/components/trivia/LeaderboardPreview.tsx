import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, ArrowRight, Loader2, Star, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { leaderboardApi, type LeaderboardEntry } from "@/services/api";
import { Button } from "@/components/ui/button";

interface LeaderboardPreviewProps {
  userRanking?: number;
  userName?: string;
}

export const LeaderboardPreview = ({ userRanking, userName }: LeaderboardPreviewProps) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await leaderboardApi.getLeaderboard({ limit: 5, period: 'all-time' });
        setLeaderboard(data.results);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          badge: "bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 shadow-lg shadow-amber-500/30",
          text: "text-amber-900",
          icon: "text-amber-500"
        };
      case 2:
        return {
          badge: "bg-gradient-to-br from-slate-300 via-gray-300 to-slate-400 shadow-lg shadow-gray-400/30",
          text: "text-slate-800",
          icon: "text-gray-400"
        };
      case 3:
        return {
          badge: "bg-gradient-to-br from-orange-400 via-amber-600 to-orange-500 shadow-lg shadow-orange-500/30",
          text: "text-orange-900",
          icon: "text-orange-500"
        };
      default:
        return {
          badge: "bg-gradient-to-br from-[#3b82f6] to-blue-600 shadow-lg shadow-[#3b82f6]/30",
          text: "text-gray-900",
          icon: "text-[#3b82f6]"
        };
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 rounded-3xl bg-white border-2 border-gray-100 shadow-sm">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#3b82f6] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading rankings...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#3b82f6]/10 via-blue-500/10 to-[#3b82f6]/10 border border-[#3b82f6]/20">
          <Award className="w-4 h-4 text-[#3b82f6]" />
          <span className="text-sm font-bold text-[#3b82f6] tracking-wide uppercase">Top Performers</span>
        </div>
        <h3 className="text-3xl font-black text-gray-900">Current Leaders</h3>
      </div>

      {/* User's ranking callout */}
      {userRanking && userName && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3b82f6] via-blue-600 to-[#3b82f6] p-[2px]"
        >
          <div className="bg-white rounded-[22px] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Rank</p>
                <p className="text-3xl font-black text-gray-900">
                  <span className="text-[#3b82f6]">#{userRanking}</span>
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-blue-600 flex items-center justify-center shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Leaderboard list */}
      <div className="space-y-3">
        {leaderboard.map((entry, index) => {
          const rank = entry.rank || (index + 1);
          const style = getRankStyle(rank);
          const isCurrentUser = entry.userName === userName;

          return (
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative"
            >
              {/* Highlight background for current user */}
              {isCurrentUser && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/10 via-purple-500/10 to-[#3b82f6]/10 rounded-2xl" />
              )}
              
              <div className={`relative p-5 rounded-2xl bg-white border-2 transition-all duration-300 ${
                isCurrentUser
                  ? "border-[#3b82f6] shadow-lg shadow-[#3b82f6]/20"
                  : "border-gray-100 hover:border-gray-200 hover:shadow-md"
              }`}>
                {isCurrentUser && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#3b82f6] text-white text-xs font-bold shadow-md">
                      <Star className="w-3 h-3 fill-current" />
                      You
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  {/* Rank badge */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl text-white flex-shrink-0 ${style.badge} transition-transform duration-300 group-hover:scale-105`}>
                    {rank}
                  </div>

                  {/* User info */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-black text-lg truncate mb-1 ${isCurrentUser ? 'text-[#3b82f6]' : 'text-gray-900'}`}>
                      {entry.userName}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-gray-600 bg-gray-50 px-2.5 py-0.5 rounded-lg">
                        {entry.score}/{entry.totalQuestions}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 text-xs">
                        {new Date(entry.completedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Score percentage */}
                  <div className="text-right flex-shrink-0">
                    <div className={`text-3xl font-black ${isCurrentUser ? 'bg-gradient-to-br from-[#3b82f6] to-purple-600 bg-clip-text text-transparent' : 'text-[#3b82f6]'} transition-transform duration-300 group-hover:scale-110`}>
                      {entry.percentage}
                      <span className="text-xl">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View full leaderboard button */}
      <Button
        asChild
        size="lg"
        className="w-full bg-gradient-to-r from-[#3b82f6] to-blue-600 text-white hover:shadow-xl hover:shadow-[#3b82f6]/30 rounded-full py-7 font-bold text-base transition-all duration-300 hover:scale-[1.02] border-0"
      >
        <Link to="/trivia/leaderboard" className="inline-flex items-center justify-center gap-2">
          View Full Leaderboard <ArrowRight className="w-5 h-5" />
        </Link>
      </Button>
    </motion.div>
  );
};

