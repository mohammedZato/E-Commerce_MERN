const mongoose = require("mongoose");
const validator = require("validator");

const getSingleProduct = async (req, res) => {
  const productsModel = mongoose.model("products");
  const { productId } = req.params;

  if (!validator.isMongoId(productId)) throw "Invalid product ID";

  const singleProduct = await productsModel
    .findById(productId)
    .populate("reviews");

  res.status(200).json({
    status: "success",
    singleProduct,
  });
};

module.exports = getSingleProduct;
