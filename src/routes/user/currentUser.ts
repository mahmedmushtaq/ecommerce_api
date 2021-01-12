import express from "express";
import { requireAuth } from "../../middlewares";

const router = express.Router();

// currentUser,

router.get("/current-user", requireAuth, async (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export default router;
