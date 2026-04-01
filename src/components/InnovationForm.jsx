import React, { useState } from 'react';

function InnovationForm({ showToast }) {
  const [scholarship, setScholarship] = useState(false);

  const submitInnovation = (e) => {
    e.preventDefault();
    showToast('Success', 'Innovation proposal submitted successfully!');
  };

  return (
    <div className="space-y-8">
      <div className="glass-panel rounded-2xl p-8 lg:p-10">
        <div className="flex items-start justify-between mb-10">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Innovation Proposal</h3>
            <p className="text-slate-400">Submit environmental solutions for funding consideration</p>
          </div>
          <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium">
            Grants Available
          </div>
        </div>

        <form onSubmit={submitInnovation} className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Project Title</label>
            <input 
              type="text" 
              required
              placeholder="e.g., Biodegradable Oil Absorbent from Agricultural Waste"
              className="input-clean w-full px-4 py-3.5 rounded-lg text-white placeholder-slate-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Category</label>
              <select required className="input-clean w-full px-4 py-3.5 rounded-lg text-white appearance-none cursor-pointer bg-slate-800/50">
                <option value="" className="bg-slate-800">Select category</option>
                <option value="filtration" className="bg-slate-800">Water Filtration</option>
                <option value="bioremediation" className="bg-slate-800">Bioremediation</option>
                <option value="monitoring" className="bg-slate-800">Monitoring Technology</option>
                <option value="waste" className="bg-slate-800">Waste Management</option>
                <option value="energy" className="bg-slate-800">Clean Energy</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Development Stage</label>
              <select required className="input-clean w-full px-4 py-3.5 rounded-lg text-white appearance-none cursor-pointer bg-slate-800/50">
                <option value="" className="bg-slate-800">Select stage</option>
                <option value="concept" className="bg-slate-800">Concept</option>
                <option value="prototype" className="bg-slate-800">Prototype</option>
                <option value="testing" className="bg-slate-800">Field Testing</option>
                <option value="market" className="bg-slate-800">Market Ready</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Detailed Description</label>
            <textarea 
              required 
              rows="6"
              placeholder="Describe your solution, the problem it addresses, technical approach, and expected impact..."
              className="input-clean w-full px-4 py-3.5 rounded-lg text-white placeholder-slate-500 resize-none"
            ></textarea>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">Support Required</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Funding', 'Mentorship', 'Lab Access', 'Pilot Site'].map((item) => (
                <label key={item} className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-colors">
                  <input 
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-brand-500"
                  />
                  <span className="text-sm text-slate-300">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="p-6 bg-linear-to-r from-purple-500/10 to-brand-500/10 rounded-xl border border-purple-500/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center shrink-0">
                <i className="fas fa-graduation-cap text-purple-400"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-2">Seasonal Scholarship</h4>
                <p className="text-sm text-slate-400 mb-4">Students may apply for research grants up to $5,000 and internship placement.</p>
                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={scholarship}
                    onChange={(e) => setScholarship(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-sm text-slate-300">Apply for student scholarship</span>
                </label>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-500 hover:bg-brand-400 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <i className="fas fa-rocket"></i>
            Submit Proposal
          </button>
        </form>
      </div>

      {/* My Submissions */}
      <div className="glass-panel rounded-2xl p-8">
        <h4 className="text-lg font-semibold text-white mb-6">My Submissions</h4>
        <div className="space-y-4">
          <p className="text-slate-500 text-center py-8">No submissions yet</p>
        </div>
      </div>
    </div>
  );
}

export default InnovationForm;