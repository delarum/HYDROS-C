import React from "react";

function TabButtons({ activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center mb-16">
      <div className="inline-flex p-1.5 bg-slate-800/50 rounded-xl border border-white/5">
        <button
          onClick={() => setActiveTab("report")}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === "report" ? "tab-active text-white" : "text-white"
          }`}
        >
          Report Incident
        </button>

        <button
          onClick={() => setActiveTab("innovate")}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === "innovate" ? "tab-active text-white" : "text-white"
          }`}
        >
          Innovation Lab
        </button>

        <button
          onClick={() => setActiveTab("rewards")}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === "rewards" ? "tab-active text-white" : "text-white"
          }`}
        >
          My Rewards
        </button>
      </div>
    </div>
  );
}

export default TabButtons;