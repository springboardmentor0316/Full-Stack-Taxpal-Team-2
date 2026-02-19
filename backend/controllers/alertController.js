const Alert = require("../models/Alert");

// create a new alert (used internally and by API if needed)
exports.createAlert = async (req, res) => {
  try {
    const { message, type } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const alert = await Alert.create({
      user: req.user.id,
      message,
      type: type || "info",
    });

    res.status(201).json(alert);
  } catch (err) {
    console.error("[v0] Error creating alert:", err.message);
    res.status(500).json({ message: "Failed to create alert" });
  }
};

// get all alerts for logged in user
exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    // convert _id to id for consistency with frontend
    const normalized = alerts.map((a) => ({
      id: a._id,
      message: a.message,
      type: a.type,
      read: a.read,
      date: a.createdAt,
    }));

    res.status(200).json(normalized);
  } catch (err) {
    console.error("[v0] Error fetching alerts:", err.message);
    res.status(500).json({ message: "Failed to fetch alerts" });
  }
};

// mark a single alert as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const alert = await Alert.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { read: true },
      { new: true }
    );
    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }
    res.status(200).json({ message: "Alert marked as read" });
  } catch (err) {
    console.error("[v0] Error marking alert read:", err.message);
    res.status(500).json({ message: "Failed to mark alert as read" });
  }
};

// mark all alerts as read
exports.markAllAsRead = async (req, res) => {
  try {
    await Alert.updateMany({ user: req.user.id, read: false }, { read: true });
    res.status(200).json({ message: "All alerts marked as read" });
  } catch (err) {
    console.error("[v0] Error marking all alerts read:", err.message);
    res.status(500).json({ message: "Failed to mark alerts as read" });
  }
};

// delete an alert
exports.deleteAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const alert = await Alert.findOneAndDelete({ _id: id, user: req.user.id });
    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }
    res.status(200).json({ message: "Alert deleted" });
  } catch (err) {
    console.error("[v0] Error deleting alert:", err.message);
    res.status(500).json({ message: "Failed to delete alert" });
  }
};
