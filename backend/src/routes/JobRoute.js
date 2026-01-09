import express from "express";
import JobApplication from "../models/JobApplication.js";
import authMiddleware from "../middleware/authMiddleware.js"; 
const router = express.Router();

// Create new job application
router.post("/", authMiddleware, async (req, res) => {
  const { company, position, status, notes } = req.body;

  try {
    const job = await JobApplication.create({
      user: req.user.id, 
      company,
      position,
      status,
      notes
    });
    res.status(201).json(job);
  } catch (err) {
    console.error("POST /jobs error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all job applications for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const jobs = await JobApplication.find({ user: req.user.id }).sort({ appliedAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("GET /jobs error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Job
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await JobApplication.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// Get single job by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await JobApplication.findOne({ _id: req.params.id, user: req.user.id });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    console.error("GET /jobs/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
})

// Update Job
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const updatedJob = await JobApplication.findOneAndUpdate(
      { _id: id, user: req.user.id }, // user safety check
      req.body,
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (err) {
    console.error("PUT /jobs/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
