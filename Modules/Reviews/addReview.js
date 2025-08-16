const mongoose = require("mongoose");
const validator = require("validator");

const addReview = async (req, res) => {
  const reviewsModel = mongoose.model("reviews");
  const { body, productId } = req.body;

  if (!body) throw "Review body is required";
  if (!validator.isMongoId(productId)) throw "Invalid Product ID";

  const newReview = await reviewsModel.create({
    body: body,
    user: req.user._id,
    product: productId,
  });

  res.status(200).json({
    status: "add a review",
    newReview,
  });
};

module.exports = addReview;
