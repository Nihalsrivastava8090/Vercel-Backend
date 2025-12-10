import express from "express";
import Emotion from "../models/Emotion.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Save Emotion Entry
router.post("/save", authMiddleware, async (req, res) => {
  try {
    const { emotion, confidence } = req.body;

    const entry = await Emotion.create({
      userId: req.user.id,
      emotion,
      confidence,
    });

    res.json({ message: "Emotion saved", entry });
  } catch (error) {
    console.log("Save Emotion Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get Emotion History
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const history = await Emotion.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    console.log("History error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
