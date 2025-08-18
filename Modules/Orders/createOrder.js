const mongoose = require("mongoose");

const createOrder = (req, res) => {
  res.status(200).json({
    status: "order",
  });
};

module.exports = createOrder;
