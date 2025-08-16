const mongoose = require("mongoose");

const addProduct = async (req, res) => {
  const productsModel = mongoose.model("products");
  const { name, price, description, category, rating, image, stock } = req.body;

  if (!name) throw "Product name is required";
  if (!price) throw "Product price is required";
  if (typeof price !== "number") throw "Price must be a number";
  if (!description) throw "Description is required";
  if (!category) throw "Category is required";
  if (!rating) throw "Rating is required";
  if (rating < 0 || rating > 10) throw "Rating must be between 0 and 10";
  if (typeof rating !== "number") throw "Rating must be a number";
  if (!image) throw "Product image is required";
  if (!stock) throw "Stock is required";
  if (typeof stock !== "number") throw "Product stock must be a number";

  const newProduct = await productsModel.create({
    name: name,
    price: price,
    description: description,
    category: category,
    rating: rating,
    image: image,
    stock: stock,
  });

  res.status(200).json({
    status: "successfully added new product",
    newProduct,
  });
};

module.exports = addProduct;
