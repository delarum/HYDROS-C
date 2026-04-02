const mongoose = require("mongoose");

const innovationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    category: String,
    stage: String,
    description: String,
    supportRequired: [String],
    scholarship: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Innovation", innovationSchema);