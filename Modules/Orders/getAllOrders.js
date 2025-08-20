const mongoose = require("mongoose");

const getAllOrders = async (req, res) => {
  const ordersModel = mongoose.model("orders");

  const getAllOrders = await ordersModel.findOne({
    user: req.user._id,
  });
  if (!getAllOrders)
    return res.status(500).json({ message: "You have no orders at this time" });

  res.status(200).json({
    status: "my orders",
    getAllOrders,
  });
};

module.exports = getAllOrders;
