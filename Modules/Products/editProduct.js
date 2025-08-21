const mongoose = require("mongoose");
const validator = require("validator");

const updateProduct = async (req, res) => {
  const productsModel = mongoose.model("products");
  const { price, rating, stock } = req.body;
  const { productId } = req.params;

  if (!validator.isMongoId(productId)) throw "Invalid Product ID";
  if (!productId) throw "Product ID is required";
  if (!price) throw "Product price is required";
  if (typeof price !== "number") throw "Price must be a number";
  if (!rating) throw "Rating is required";
  if (typeof rating !== "number") throw "Rating must be a number";
  if (!stock) throw "Stock is required";
  if (typeof stock !== "number") throw "Stock must be a number";

  const getProduct = await productsModel.findById(productId);
  if (!getProduct) throw "Product does not exist";

  await productsModel.updateOne(
    {
      _id: productId,
    },
    {
      price: price,
      rating: rating,
      stock: stock,
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "updated successfully",
  });
};

module.exports = updateProduct;
