const mongoose = require("mongoose");
const CaseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Case must have a title"],
    },
    description: {
      type: String,
      required: [true, "Case must have a description"],
    },
    images: [String],
    diagnosis: String,
    status: {
      type: String,
      enum: ["open", "in review", "closed"],
      default: "open",
    },
  },
  { timestamps: true }
);

const Case = mongoose.model('Case', CaseSchema);
module.exports = Case;
