const mongoose = require("mongoose");

const getAllProducts = async (req, res) => {
  const productsModel = mongoose.model("products");

  const allProducts = await productsModel.find({
    ...req.query,
  });
  res.status(200).json({
    status: "all products",
    allProducts,
  });
};

module.exports = getAllProducts;
