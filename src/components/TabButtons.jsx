import React from 'react';

function TabButtons({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'report', label: 'Report Incident', icon: 'fa-exclamation-triangle' },
    { id: 'innovate', label: 'Innovation Lab', icon: 'fa-lightbulb' },
    { id: 'rewards', label: 'My Rewards', icon: 'fa-trophy' },
  ];

  return (
    <div className="flex justify-center mb-16">
      <div className="inline-flex p-1.5 bg-slate-800/50 rounded-xl border border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'tab-active'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <i className={`fas ${tab.icon}`}></i>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TabButtons;