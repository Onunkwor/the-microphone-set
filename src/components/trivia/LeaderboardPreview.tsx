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
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-50">
          {leaderboard.map((entry, index) => {
            const rank = entry.rank || (index + 1);
            const isCurrentUser = entry.userName === userName;
            const topScore = leaderboard[0]?.percentage || 100;
            const progressWidth = Math.round((entry.percentage / topScore) * 100);

            return (
              <motion.div
                key={entry._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className={`flex items-center gap-4 px-5 py-4 ${
                  isCurrentUser ? 'bg-[#3b82f6]/5' : ''
                }`}
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-10">
                  <span className="text-xl font-semibold text-gray-400">
                    {rank}
                  </span>
                </div>

                {/* Player Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`font-semibold truncate ${isCurrentUser ? 'text-[#3b82f6]' : 'text-gray-900'}`}>
                      {entry.userName}
                    </p>
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
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.03 }}
                      className="h-full bg-[#3b82f6] rounded-full"
                    />
                  </div>
                </div>

                {/* Score */}
                <div className="flex-shrink-0">
                  <span className="text-2xl font-light text-[#3b82f6]">
                    {entry.percentage}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
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

