import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
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
        const data = await leaderboardApi.getLeaderboard({ limit: 10, period: 'all-time' });
        setLeaderboard(data.results);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-orange-600" />;
      default:
        return null;
    }
  };

  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg shadow-yellow-500/50";
      case 2:
        return "bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-lg shadow-gray-500/50";
      case 3:
        return "bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/50";
      default:
        return "bg-[#3b82f6] text-white";
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#3b82f6] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading leaderboard...</p>
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
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] mb-4">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-semibold">Global Rankings</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Top Performers</h3>
        <p className="text-gray-600">See how you stack up against the best!</p>
      </div>

      {/* User's ranking callout */}
      {userRanking && userName && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-[#3b82f6]/10 to-purple-50 border-2 border-[#3b82f6]/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Your Ranking</p>
              <p className="text-2xl font-bold text-gray-900">
                #{userRanking} <span className="text-lg text-gray-600">of all players</span>
              </p>
            </div>
            <Trophy className="w-12 h-12 text-[#3b82f6]" />
          </div>
        </motion.div>
      )}

      {/* Leaderboard list */}
      <div className="space-y-3">
        {leaderboard.map((entry, index) => (
          <motion.div
            key={entry._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`p-4 rounded-xl border transition-all duration-300 ${
              entry.userName === userName
                ? "border-[#3b82f6] bg-[#3b82f6]/5 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Rank badge */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${getRankBadgeStyle(
                  entry.rank || index + 1
                )}`}
              >
                {entry.rank || index + 1}
              </div>

              {/* User info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-gray-900 truncate">{entry.userName}</p>
                  {getMedalIcon(entry.rank || index + 1)}
                  {entry.userName === userName && (
                    <span className="text-xs bg-[#3b82f6] text-white px-2 py-0.5 rounded-full">
                      You
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span>
                    {entry.score}/{entry.totalQuestions} correct
                  </span>
                  <span className="text-gray-300">•</span>
                  <span>{new Date(entry.completedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Score percentage */}
              <div className="text-right flex-shrink-0">
                <p className="text-2xl font-bold text-[#3b82f6]">{entry.percentage}%</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View full leaderboard button */}
      <Button
        asChild
        className="w-full bg-gradient-to-r from-[#3b82f6] to-purple-600 text-white hover:shadow-lg rounded-full py-6 font-semibold transition-all duration-300"
      >
        <Link to="/trivia/leaderboard" className="inline-flex items-center justify-center gap-2">
          View Full Leaderboard <ArrowRight className="w-5 h-5" />
        </Link>
      </Button>
    </motion.div>
  );
};
