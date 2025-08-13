const mongoose = require("mongoose");

const login = (req, res) => {
  res.status(200).json({
    status: "loginnn",
  });
};

module.exports = login;
