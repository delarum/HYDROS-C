import React, { useState } from 'react';
import "../assets/style.css";
import "../assets/involve.css";

function ReportForm({ showToast }) {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [showCompanyFields, setShowCompanyFields] = useState(false);
  const [files, setFiles] = useState([]);
  const [location, setLocation] = useState('');

  const toggleAnon = () => setIsAnonymous(!isAnonymous);
  
  const toggleCompany = (e) => setShowCompanyFields(e.target.checked);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
        },
        () => {
          showToast('Error', 'Unable to retrieve your location');
        }
      );
    }
  };

  const handleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const submitReport = (e) => {
    e.preventDefault();
    showToast('Success', 'Report submitted successfully!');
    // Reset form logic here
  };

  const saveDraft = () => {
    showToast('Saved', 'Draft saved successfully');
  };

  return (
    <section id="section-report" className="section-fade">
            <div className="grid lg:grid-cols-12 gap-8">

                
                <div className="lg:col-span-8 space-y-8">

                
                    <div className="glass-panel rounded-2xl p-8 lg:p-10">
                        <div className="flex items-start justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-2">Submit Incident Report</h3>
                                <p className="text-slate-400">Help identify toxic waste and illegal dumping activities</p>
                            </div>
                            <div
                                className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium reward-pulse">
                                <i className="fas fa-coins"></i>
                                <span>Reward up to $500</span>
                            </div>
                        </div>

                        
                        <div className="mb-10 p-6 bg-slate-800/30 rounded-xl border border-white/5">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-white">Submit Anonymously</span>
                                <button onClick={toggleAnon} id="anonToggle"
                                    className="w-12 h-6 bg-brand-500 rounded-full relative transition-colors">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all">
                                    </div>
                                </button>
                            </div>
                            <p className="text-sm text-slate-800 leading-relaxed">
                                Your identity is encrypted and protected under our Whistleblower Protection Policy.
                                Anonymous reporters receive rewards via secure payment channels.
                            </p>
                        </div>

                        <form onsubmit="submitReport(event)" className="space-y-8">

                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-800">Incident Type</label>
                                    <select title="report-type" required
                                        className="input-clean w-full px-4 py-3.5 rounded-lg text-gray-800 appearance-none cursor-pointer" >
                                        <option value="" className="bg-slate-300">Select type</option>
                                        <option value="toxic" className="bg-slate-300">Toxic Chemical Spillage</option>
                                        <option value="industrial" className="bg-slate-300">Industrial Waste Dumping
                                        </option>
                                        <option value="plastic" className="bg-slate-300">Plastic/Garbage Accumulation
                                        </option>
                                        <option value="oil" className="bg-slate-300">Oil/Hydrocarbon Leak</option>
                                        <option value="sewage" className="bg-slate-300">Raw Sewage Discharge</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-800">Water Body</label>
                                    <select title="large-waterbody" required
                                        className="input-clean w-full px-4 py-3.5 rounded-lg text-gray-800 appearance-none cursor-pointer" >
                                        <option value="" className="bg-slate-300">Select location</option>
                                        <option value="victoria" className="bg-slate-300">Lake Victoria</option>
                                        <option value="nairobi" className="bg-slate-300">Nairobi River</option>
                                        <option value="congo" className="bg-slate-300">Congo River</option>
                                        <option value="chad" className="bg-slate-300">Lake Chad</option>
                                        <option value="niger" className="bg-slate-300">Niger River</option>
                                        <option value="tanganyika" className="bg-slate-300">Lake Tanganyika</option>
                                        <option value="zambezi" className="bg-slate-300">Zambezi River</option>
                                    </select>
                                </div>
                            </div>

                        
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-800">Specific Location</label>
                                <div className="relative">
                                    <input type="text" required placeholder="Enter address or GPS coordinates"
                                        className="input-clean w-full px-4 py-3.5 pl-11 rounded-lg text-gray-800 placeholder-slate-500" />
                                    <i
                                        className="fas fa-map-marker-alt absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                                    <button type="button" onclick="getLocation()"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-700 hover:bg-slate-600 text-brand-400 px-3 py-1.5 rounded-md transition-colors">
                                        Use GPS
                                    </button>
                                </div>
                            </div>

                        
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-800">Incident Description</label>
                                <textarea required rows="5"
                                    placeholder="Describe what you observed, including approximate time, responsible parties if known, and extent of pollution..."
                                    className="input-clean w-full px-4 py-3.5 rounded-lg text-gray-800 placeholder-slate-500 resize-none"></textarea>
                            </div>

                        
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Evidence Upload</label>
                                <div onclick="document.getElementById('fileInput').click()"
                                    className="border-2 border-dashed border-slate-700 hover:border-brand-500/50 rounded-xl p-10 text-center cursor-pointer transition-colors bg-slate-800/20">
                                    <input title="fileinput" type="file" id="fileInput" multiple
                                        accept="image/*,video/*" className="hidden" onchange="handleFiles(this)" />
                                    <div
                                        className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i className="fas fa-cloud-upload-alt text-2xl text-brand-400"></i>
                                    </div>
                                    <p className="text-white font-medium mb-1">Drop files or click to upload</p>
                                    <p className="text-sm text-slate-500">JPG, PNG, MP4 up to 50MB</p>
                                    <div id="fileList" className="mt-4 space-y-2 hidden text-left"></div>
                                </div>
                            </div>

                            
                            <div className="p-6 bg-slate-800/20 rounded-xl border border-white/5">
                                <label className="flex items-center gap-3 cursor-pointer mb-4">
                                    <input type="checkbox" onchange="toggleCompany(this)"
                                        className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-brand-500 focus:ring-brand-500"/>
                                    <span className="text-sm text-slate-800">I know the responsible
                                        company/individual</span>
                                </label>
                                <div id="companyFields" className="hidden space-y-4 pt-4 border-t border-white/5">
                                    <input type="text" placeholder="Company or individual name"
                                        className="input-clean w-full px-4 py-3 rounded-lg text-gray-800 placeholder-slate-500" />
                                    <input type="text" placeholder="Business registration number (if known)"
                                        className="input-clean w-full px-4 py-3 rounded-lg text-gray-800 placeholder-slate-500" />
                                </div>
                            </div>

                    
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button type="submit"
                                    className="flex-1 bg-brand-500 hover:bg-brand-400 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                    <i className="fas fa-paper-plane"></i>
                                    Submit Secure Report
                                </button>
                                <button type="button" onclick="saveDraft()"
                                    className="px-8 py-4 border border-slate-600 hover:border-slate-500 text-slate-800 rounded-lg transition-colors">
                                    Save Draft
                                </button>
                            </div>

                            
                            <div
                                className="flex flex-wrap justify-center gap-6 pt-6 text-xs text-slate-800 border-t border-white/5">
                                <span className="flex items-center gap-2">
                                    <i className="fas fa-lock text-emerald-400"></i>
                                    256-bit Encrypted
                                </span>
                                <span className="flex items-center gap-2">
                                    <i className="fas fa-user-secret text-brand-400"></i>
                                    Whistleblower Protected
                                </span>
                                <span className="flex items-center gap-2">
                                    <i className="fas fa-check-circle text-purple-400"></i>
                                    Verified in 24-48hrs
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ReportForm;