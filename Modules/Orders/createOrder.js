const mongoose = require("mongoose");

const createOrder = async (req, res) => {
  const ordersModel = mongoose.model("orders");

  const {
    orderItems = [],
    shippingAddress = {},
    paymentInfo = {},
    items_price,
    shipping_price,
    total_price,
    order_status,
  } = req.body;

  const { address, city, country } = shippingAddress;
  const { payment_id, payment_status } = paymentInfo;

  if (!orderItems.length)
    return res.status(500).json({ message: "Order Items are required" });
  if (!address || !city || !country)
    return res.status(500).json({ message: "Complete address is required" });
  if (!payment_id || !payment_status)
    return res
      .status(500)
      .json({ message: "Complete payment info is required" });
  if (!items_price || !shipping_price || !total_price)
    return res.status(500).json({ message: "Pricing details are required" });
  if (!order_status) throw "Order Status name is required";

  const newOrder = await ordersModel.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentInfo,
    items_price,
    shipping_price,
    total_price,
    order_status,
  });

  res.status(200).json({
    status: "order created successfully",
    newOrder,
  });
};

module.exports = createOrder;
