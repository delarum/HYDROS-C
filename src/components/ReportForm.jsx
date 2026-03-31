import React, { useState } from "react";
import { submitReport } from "../services/reportService";
import { useUser } from "../context/UserProvider";

function ReportForm({ showToast }) {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    incidentType: "",
    waterBody: "",
    location: "",
    description: "",
    anonymous: true,
    responsibleKnown: false,
    companyName: "",
    registrationNumber: "",
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await submitReport({
        ...formData,
        userId: user?._id,
      });

      showToast("Success", "Report submitted successfully");

      setFormData({
        incidentType: "",
        waterBody: "",
        location: "",
        description: "",
        anonymous: true,
        responsibleKnown: false,
        companyName: "",
        registrationNumber: "",
      });
    } catch (error) {
      showToast("Error", "Failed to submit report");
      console.error(error);
    }
  }

  return (
    <div className="glass-panel rounded-2xl p-8 lg:p-10">
      <h3 className="text-2xl font-semibold text-white mb-6">
        Submit Incident Report
      </h3>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <select
            name="incidentType"
            value={formData.incidentType}
            onChange={handleChange}
            required
            className="input-clean w-full px-4 py-3.5 rounded-lg text-gray-800"
          >
            <option value="">Select type</option>
            <option value="toxic">Toxic Chemical Spillage</option>
            <option value="industrial">Industrial Waste Dumping</option>
            <option value="plastic">Plastic/Garbage Accumulation</option>
            <option value="oil">Oil/Hydrocarbon Leak</option>
            <option value="sewage">Raw Sewage Discharge</option>
          </select>

          <select
            name="waterBody"
            value={formData.waterBody}
            onChange={handleChange}
            required
            className="input-clean w-full px-4 py-3.5 rounded-lg text-gray-800"
          >
            <option value="">Select location</option>
            <option value="victoria">Lake Victoria</option>
            <option value="nairobi">Nairobi River</option>
            <option value="congo">Congo River</option>
            <option value="chad">Lake Chad</option>
          </select>
        </div>

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter address or GPS coordinates"
          required
          className="input-clean w-full px-4 py-3.5 rounded-lg text-gray-800"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          required
          placeholder="Describe what you observed..."
          className="input-clean w-full px-4 py-3.5 rounded-lg text-gray-800 resize-none"
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="anonymous"
            checked={formData.anonymous}
            onChange={handleChange}
          />
          <span className="text-sm text-slate-800">Submit Anonymously</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="responsibleKnown"
            checked={formData.responsibleKnown}
            onChange={handleChange}
          />
          <span className="text-sm text-slate-800">
            I know the responsible company/individual
          </span>
        </label>

        {formData.responsibleKnown && (
          <div className="space-y-4">
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company or individual name"
              className="input-clean w-full px-4 py-3 rounded-lg text-gray-800"
            />

            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="Business registration number"
              className="input-clean w-full px-4 py-3 rounded-lg text-gray-800"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-brand-500 hover:bg-brand-400 text-white font-semibold py-4 rounded-lg transition-colors"
        >
          Submit Secure Report
        </button>
      </form>
    </div>
  );
}

export default ReportForm;