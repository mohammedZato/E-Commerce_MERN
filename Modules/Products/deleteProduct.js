const mongoose = require("mongoose");
const validator = require("validator");

const deleteProduct = async (req, res) => {
  const productsModel = mongoose.model("products");
  const { productId } = req.params;

  if (!validator.isMongoId(productId)) throw "Invalid Product ID";

  const getProduct = await productsModel.findById(productId);
  if (!getProduct) throw "Product does not exist";

  const deletedItem = await productsModel.findByIdAndDelete(productId);

  res.status(200).json({
    status: "delete successful",
    deletedItem,
  });
};

module.exports = deleteProduct;
