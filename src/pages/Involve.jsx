import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import Toast from "../components/Toast";
import ReportForm from "../components/ReportForm";
import InnovationForm from "../components/InnovationForm";
import RewardsDashboard from "../components/RewardsDashboard";
import SidebarCards from "../components/SidebarCards";
import TabButtons from "../components/TabButtons";

function Involve() {
  const [activeTab, setActiveTab] = useState("report");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    title: "",
    message: "",
  });

  function showToast(title, message) {
    setToast({ show: true, title, message });
    setTimeout(() => {
      setToast({ show: false, title: "", message: "" });
    }, 3000);
  }

  return (
    <div className="min-h-screen antialiased bg-ocean-900">
      <Navbar openModal={() => setShowModal(true)} />

      <main className="pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 section-fade">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm mb-8">
            <i className="fas fa-shield-alt text-xs"></i>
            <span>Secure & Anonymous Reporting</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-light text-white mb-6 tracking-tight">
            Be a <span className="gradient-text font-semibold">Water Guardian</span>
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Join thousands of citizens protecting Africa's water bodies. Report
            pollution incidents securely, earn verified rewards, and contribute
            to environmental innovation.
          </p>
        </div>

        <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "report" && (
          <div className="grid lg:grid-cols-12 gap-8 section-fade">
            <div className="lg:col-span-8">
              <ReportForm showToast={showToast} />
            </div>
            <div className="lg:col-span-4">
              <SidebarCards type="report" />
            </div>
          </div>
        )}

        {activeTab === "innovate" && (
          <div className="grid lg:grid-cols-12 gap-8 section-fade">
            <div className="lg:col-span-8">
              <InnovationForm showToast={showToast} />
            </div>
            <div className="lg:col-span-4">
              <SidebarCards type="innovation" />
            </div>
          </div>
        )}

        {activeTab === "rewards" && <RewardsDashboard />}
      </main>

      <Footer />

      {showModal && <LoginModal closeModal={() => setShowModal(false)} />}
      {toast.show && <Toast title={toast.title} message={toast.message} onClose={() => setToast({ ...toast, show: false })} />}
    </div>
  );
}

export default Involve;