import React from 'react';

function SidebarCards({ type = 'report' }) {
  const recentReports = [
    { type: 'Toxic Spillage', location: 'Lake Victoria', time: '2 hours ago', reward: '$450' },
    { type: 'Industrial Dumping', location: 'Nairobi River', time: '5 hours ago', reward: '$300' },
    { type: 'Oil Leak', location: 'Congo River', time: '1 day ago', reward: '$400' },
  ];

  if (type === 'innovation') {
    return (
      <div className="space-y-8">
        {/* Opportunities */}
        <div className="glass-panel rounded-2xl p-8">
          <h4 className="text-lg font-semibold text-white mb-6">Current Opportunities</h4>
          <div className="space-y-6">
            <div className="p-5 bg-slate-800/30 rounded-xl border-l-4 border-brand-500">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-brand-400 uppercase tracking-wider">Spring 2026</span>
                <span className="text-xs text-slate-500">Mar 30</span>
              </div>
              <h5 className="font-semibold text-white mb-2">Youth Water Innovation</h5>
              <p className="text-sm text-slate-400 mb-3">Grants up to $10,000 for innovators under 30</p>
              <div className="text-xs text-slate-500">142 applications</div>
            </div>

            <div className="p-5 bg-slate-800/30 rounded-xl border-l-4 border-emerald-500">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Rolling</span>
                <span className="text-xs text-slate-500">Open</span>
              </div>
              <h5 className="font-semibold text-white mb-2">Community Solutions</h5>
              <p className="text-sm text-slate-400 mb-3">Micro-grants for local water cleanup tech</p>
              <div className="text-xs text-slate-500">$500 – $2,000</div>
            </div>

            <div className="p-5 bg-slate-800/30 rounded-xl border-l-4 border-purple-500">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">Summer 2026</span>
                <span className="text-xs text-slate-500">May 1</span>
              </div>
              <h5 className="font-semibold text-white mb-2">Research Scholarship</h5>
              <p className="text-sm text-slate-400 mb-3">Full funding for MSc/PhD water research</p>
              <div className="text-xs text-slate-500">Academic partnership</div>
            </div>
          </div>
        </div>

        {/* Success Story */}
        <div className="glass-panel rounded-2xl p-8">
          <h4 className="text-lg font-semibold text-white mb-6">Success Story</h4>
          <div className="flex gap-4 mb-4">
            <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shrink-0 text-white font-bold">
              SK
            </div>
            <div>
              <h5 className="font-semibold text-white">Sarah Kimani</h5>
              <p className="text-sm text-slate-400">Nairobi, Kenya</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            Received $8,000 to develop low-cost water purification using moringa seeds.
            Now serving 5,000+ households across East Africa.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <i className="fas fa-check-circle"></i>
            <span>Funded Spring 2025</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Reward Info */}
      <div className="glass-panel rounded-2xl p-8">
        <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <i className="fas fa-gift text-amber-400"></i>
          Reward Structure
        </h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-white/5">
            <span className="text-slate-300">Toxic Spillage</span>
            <span className="text-emerald-400 font-semibold">$300 – $500</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/5">
            <span className="text-slate-300">Industrial Dumping</span>
            <span className="text-emerald-400 font-semibold">$200 – $400</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/5">
            <span className="text-slate-300">Oil/Hydrocarbon</span>
            <span className="text-emerald-400 font-semibold">$250 – $450</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-slate-300">Garbage/Plastic</span>
            <span className="text-emerald-400 font-semibold">$50 – $150</span>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-6 leading-relaxed">
          Rewards are released upon verification. Anonymous reporters may receive payment via mobile
          money, bank transfer, or cryptocurrency.
        </p>
      </div>

      {/* Recent Activity */}
      <div className="glass-panel rounded-2xl p-8">
        <h4 className="text-lg font-semibold text-white mb-6">Recent Verified Reports</h4>
        <div className="space-y-4">
          {recentReports.map((report, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">{report.type}</p>
                <p className="text-xs text-slate-400">{report.location} • {report.time}</p>
              </div>
              <span className="text-emerald-400 text-sm font-semibold">{report.reward}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Protection Notice */}
      <div className="glass-panel rounded-2xl p-8 border-l-4 border-emerald-500">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
            <i className="fas fa-shield-alt text-emerald-400"></i>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Legal Protection</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              All whistleblowers are protected under the HYDROS-C Environmental Protection Act.
              We provide legal support against retaliation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarCards;