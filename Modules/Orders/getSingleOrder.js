const mongoose = require("mongoose");
const validator = require("validator");

const getSingleOrder = async (req, res) => {
  const ordersModel = mongoose.model("orders");
  const { orderId } = req.params;

  if (!validator.isMongoId(orderId))
    return res.status(500).json({ message: "Invalid order ID" });

  const singleOrder = await ordersModel.findById(orderId);
  if (!singleOrder) return res.status(500).json({ message: "Order not found" });

  res.status(200).json({
    status: "success",
    singleOrder,
  });
};

module.exports = getSingleOrder;
