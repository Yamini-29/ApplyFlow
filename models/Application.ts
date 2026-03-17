import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: {
    type: String,
    enum: ["Applied", "OA", "Interview", "Offer", "Rejected"],
    default: "Applied",
  },
  jobLink: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);