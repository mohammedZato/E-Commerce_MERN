const mongoose = require("mongoose");

const allOrders = async (req, res) => {
  const ordersModel = mongoose.model("orders");
  try {
    const allOrders = await ordersModel.find({});
    if (!allOrders)
      return res.status(500).json({ message: "No orders at this moment" });

    res.status(200).json({
      status: "success",
      allOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = allOrders;
