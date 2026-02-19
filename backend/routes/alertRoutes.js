const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getAlerts,
  createAlert,
  markAsRead,
  markAllAsRead,
  deleteAlert,
} = require("../controllers/alertController");

const router = express.Router();

router.route("/").get(protect, getAlerts).post(protect, createAlert);
router.patch("/read-all", protect, markAllAsRead);
router.patch("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteAlert);

module.exports = router;
