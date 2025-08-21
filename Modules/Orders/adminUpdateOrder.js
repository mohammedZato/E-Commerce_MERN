const mongoose = require("mongoose");
const validator = require("validator");

const updateOrderStatus = async (req, res) => {
  const ordersModel = mongoose.model("orders");
  const { orderId } = req.params;
  const { order_status } = req.body;

  if (!order_status)
    return res.status(500).json({ message: "Order Status is Required" });
  if (!validator.isMongoId(orderId))
    return res.status(500).json({ message: "Invalid order ID" });

  const getOrder = await ordersModel.findById(orderId);
  if (!getOrder) return res.status(500).json({ message: "Order not found" });

  await ordersModel.updateOne(
    {
      _id: orderId,
    },
    {
      order_status: order_status,
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "order status updated",
  });
};

module.exports = updateOrderStatus;
