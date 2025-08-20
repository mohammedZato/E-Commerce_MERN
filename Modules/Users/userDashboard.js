const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const usersModel = mongoose.model("users");
  const ordersModel = mongoose.model("orders");

  const getUser = await usersModel
    .findOne({
      _id: req.user._id,
    })
    .select("-password");

  const getAllOrders = await ordersModel
    .find({
      user: req.user._id,
    })
    .sort("-createdAt");

  res.status(200).json({
    status: "logged in. user dashboard display",
    user: getUser,
    getAllOrders,
  });
};

module.exports = userDashboard;
