import mongoose from "mongoose";

const emotionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    emotion: {
      type: String,
      required: true,
    },
    confidence: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Emotion", emotionSchema);
