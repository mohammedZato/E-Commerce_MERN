const mongoose = require("mongoose");
const validator = require("validator");

const removeFromCart = async (req, res) => {
  const cartsModel = mongoose.model("carts");
  const usersModel = mongoose.model("users");
  const { cartitemId } = req.params;

  if (!validator.isMongoId(cartitemId)) throw "Invalid cart item ID";

  const getCartItem = await cartsModel.findById(cartitemId);
  if (!getCartItem) throw "Cart Item not found";

  const deletedCartItem = await cartsModel.findByIdAndDelete(cartitemId);

  const getUser = await usersModel.findById(req.user._id);
  getUser.cartItems.pull(getCartItem.product);
  await getUser.save();

  res.status(200).json({
    status: "successfully removed from cart",
    deletedCartItem,
  });
};

module.exports = removeFromCart;
