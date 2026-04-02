import React, { useState } from 'react';

function RewardsDashboard() {
  const [stats] = useState({
    earnings: 1250,
    verified: 3,
    impact: 850
  });

  const [history] = useState([
    { id: 1, type: 'Toxic Spillage Report', date: '2026-03-15', amount: 450, status: 'Paid' },
    { id: 2, type: 'Industrial Dumping', date: '2026-02-28', amount: 300, status: 'Paid' },
    { id: 3, type: 'Oil Leak Report', date: '2026-02-10', amount: 400, status: 'Paid' },
    { id: 4, type: 'Plastic Accumulation', date: '2026-01-22', amount: 100, status: 'Paid' },
  ]);

  return (
    <div className="max-w-4xl mx-auto section-fade">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-linear-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-coins text-2xl text-white"></i>
          </div>
          <div className="text-3xl font-bold text-white mb-1">${stats.earnings}</div>
          <div className="text-sm text-slate-400">Total Earnings</div>
        </div>
        <div className="glass-panel rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-linear-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-clipboard-check text-2xl text-white"></i>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{stats.verified}</div>
          <div className="text-sm text-slate-400">Verified Reports</div>
        </div>
        <div className="glass-panel rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-linear-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-star text-2xl text-white"></i>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{stats.impact}</div>
          <div className="text-sm text-slate-400">Impact Score</div>
        </div>
      </div>

      {/* History */}
      <div className="glass-panel rounded-2xl p-8 lg:p-10">
        <h3 className="text-xl font-semibold text-white mb-8">Rewards History</h3>
        <div className="space-y-4">
          {history.length > 0 ? (
            history.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-check-circle text-emerald-400"></i>
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.type}</p>
                    <p className="text-sm text-slate-400">{item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-400">+${item.amount}</p>
                  <span className="text-xs text-slate-500">{item.status}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-slate-600">
              <i className="fas fa-gift text-4xl mb-4 opacity-80"></i>
              <p className="mb-4">Start reporting incidents to earn rewards</p>
              <button className="text-brand-400 hover:text-brand-300 font-medium">
                Submit your first report →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RewardsDashboard;