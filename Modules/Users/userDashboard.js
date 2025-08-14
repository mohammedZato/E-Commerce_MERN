const mongoose = require("mongoose");

const userDashboard = (req, res) => {
  res.status(200).json({
    status: "user dashboard",
  });
};

module.exports = userDashboard;
