import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserProvider";
import { getUserStats } from "../services/rewardService";

function RewardsDashboard() {
  const { user } = useUser();
  const [stats, setStats] = useState({
    points: 0,
    totalEarnings: 0,
    verifiedReports: 0,
    rewardsHistory: [],
  });

  useEffect(() => {
    async function loadStats() {
      if (!user?._id) return;

      try {
        const data = await getUserStats(user._id);
        setStats(data);
      } catch (error) {
        console.error("Error loading rewards:", error);
      }
    }

    loadStats();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel rounded-2xl p-8 text-center">
          <div className="text-3xl font-bold text-white mb-1">
            ${stats.totalEarnings}
          </div>
          <div className="text-sm text-white">Total Earnings</div>
        </div>

        <div className="glass-panel rounded-2xl p-8 text-center">
          <div className="text-3xl font-bold text-white mb-1">
            {stats.verifiedReports}
          </div>
          <div className="text-sm text-white">Verified Reports</div>
        </div>

        <div className="glass-panel rounded-2xl p-8 text-center">
          <div className="text-3xl font-bold text-white mb-1">
            {stats.points}
          </div>
          <div className="text-sm text-white">Impact Score</div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-8 lg:p-10">
        <h3 className="text-xl font-semibold text-white mb-8">Rewards History</h3>

        {stats.rewardsHistory.length === 0 ? (
          <p className="text-slate-500 text-center py-8">
            Start reporting incidents to earn rewards
          </p>
        ) : (
          <div className="space-y-4">
            {stats.rewardsHistory.map((reward, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-800/30 border border-white/5 flex justify-between"
              >
                <span className="text-white">{reward.title}</span>
                <span className="text-emerald-400 font-semibold">
                  ${reward.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RewardsDashboard;