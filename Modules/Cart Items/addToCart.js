const mongoose = require("mongoose");
const validator = require("validator");

const addToCart = async (req, res) => {
  const cartsModel = mongoose.model("carts");
  const usersModel = mongoose.model("users");
  const { productId } = req.body;

  if (!validator.isMongoId(productId)) throw "Invalid product ID";

  const newCartItem = await cartsModel.create({
    users: req.user._id,
    product: productId,
  });

  const getUser = await usersModel.findById(req.user._id);

  getUser.cartItems.push(productId);
  await getUser.save();

  res.status(200).json({
    status: "successfully added item to cart",
    newCartItem,
  });
};

module.exports = addToCart;
