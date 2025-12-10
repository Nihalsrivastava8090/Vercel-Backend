// backend/routes/journalRoutes.js
import express from "express";
import Journal from "../models/journalModel.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add journal entry
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { emotion, note } = req.body;

    if (!note || !note.trim()) {
      return res.status(400).json({ message: "Note is required" });
    }

    const entry = await Journal.create({
      userId: req.user.id,
      emotion: emotion || "neutral",
      note,
    });

    res.status(201).json({ message: "Journal saved", entry });
  } catch (error) {
    console.error("Journal save error:", error);
    res.status(500).json({ message: "Error saving journal" });
  }
});

// Get history
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(entries);
  } catch (error) {
    console.error("Journal history error:", error);
    res.status(500).json({ message: "Error fetching journal history" });
  }
});

export default router;
