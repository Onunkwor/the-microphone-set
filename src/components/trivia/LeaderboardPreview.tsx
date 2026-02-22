import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, ArrowRight, Loader2, Star, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { leaderboardApi, type LeaderboardEntry } from "@/services/api";

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
      <div className="bg-paper-white p-12 border-2 border-ink/10">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-ink animate-spin mx-auto mb-4" />
          <p className="font-typewriter text-sm uppercase tracking-wider text-ink/60">Loading rankings...</p>
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
        <span
          className="inline-flex items-center gap-2 bg-ink text-paper font-typewriter text-xs uppercase tracking-[3px] px-3 py-1"
          style={{ transform: "rotate(-1deg)" }}
        >
          <Award className="w-3.5 h-3.5" />
          Top Performers
        </span>
        <h3 className="font-display text-3xl text-ink">Current Leaders</h3>
      </div>

      {/* User's ranking callout */}
      {userRanking && userName && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative bg-cutout-yellow/20 p-6 border-2 border-dashed border-ink/20"
          style={{ transform: "rotate(0.3deg)" }}
        >
          <div className="absolute w-12 h-3.5 bg-cutout-yellow/70 top-[-7px] left-6 z-10" style={{ transform: "rotate(-2deg)" }} />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-typewriter text-[10px] text-ink/40 uppercase tracking-wider mb-2">Your Rank</p>
              <p className="font-display text-3xl text-ink">
                <span className="text-cutout-red">#{userRanking}</span>
              </p>
            </div>
            <div
              className="w-16 h-16 border-4 border-cutout-red rounded-full flex items-center justify-center"
              style={{ transform: "rotate(10deg)" }}
            >
              <Trophy className="w-8 h-8 text-cutout-red" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Leaderboard list */}
      <div
        className="bg-paper-white border-2 border-ink/10 overflow-hidden"
        style={{ transform: "rotate(-0.2deg)" }}
      >
        <div className="divide-y divide-ink/5">
          {leaderboard.map((entry, index) => {
            const rank = entry.rank || (index + 1);
            const isCurrentUser = entry.userName === userName;
            const topScoreVal = leaderboard[0]?.percentage || 100;
            const progressWidth = Math.round((entry.percentage / topScoreVal) * 100);

            return (
              <motion.div
                key={entry._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className={`flex items-center gap-4 px-5 py-4 ${
                  isCurrentUser ? 'bg-cutout-yellow/10' : ''
                }`}
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-10">
                  <span className="font-display text-xl text-ink/30">
                    {rank}
                  </span>
                </div>

                {/* Player Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`font-display truncate ${isCurrentUser ? 'text-cutout-red' : 'text-ink'}`}>
                      {entry.userName}
                    </p>
                    {isCurrentUser && (
                      <span className="inline-flex items-center gap-1 bg-cutout-red text-paper font-typewriter text-[9px] uppercase tracking-wider px-2 py-0.5">
                        <Star className="w-3 h-3 fill-current" />
                        You
                      </span>
                    )}
                  </div>
                  <p className="font-body text-sm text-ink/40">
                    {entry.score}/{entry.totalQuestions} correct
                  </p>
                  {/* Progress Bar */}
                  <div className="mt-2 h-1.5 bg-ink/5 overflow-hidden border border-ink/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressWidth}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.03 }}
                      className="h-full bg-cutout-red"
                    />
                  </div>
                </div>

                {/* Score */}
                <div className="flex-shrink-0">
                  <span className="font-display text-2xl text-ink/30">
                    {entry.percentage}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* View full leaderboard button */}
      <Link
        to="/trivia/leaderboard"
        className="flex items-center justify-center gap-2 w-full font-typewriter text-sm uppercase tracking-[2px] px-8 py-4 bg-ink text-paper border-[3px] border-ink shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 transition-all duration-200 no-underline"
        style={{ transform: "rotate(-0.5deg)" }}
      >
        View Full Leaderboard <ArrowRight className="w-5 h-5" />
      </Link>
    </motion.div>
  );
};
