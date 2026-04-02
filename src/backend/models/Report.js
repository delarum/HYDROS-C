const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    incidentType: String,
    waterBody: String,
    location: String,
    description: String,
    anonymous: Boolean,
    responsibleKnown: Boolean,
    companyName: String,
    registrationNumber: String,
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);