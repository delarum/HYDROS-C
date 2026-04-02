const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  points: { type: Number, default: 0 },
  verifiedReports: { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 },
  rewardsHistory: [
    {
      title: String,
      amount: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);