const mongoose = require("mongoose");
const validator = require("validator");

const deleteReview = async (req, res) => {
  const reviewsModel = mongoose.model("reviews");
  const productsModel = mongoose.model("products");
  const { reviewId } = req.params;

  if (!validator.isMongoId(reviewId)) throw "Invalid review ID";

  try {
    const getReview = await reviewsModel.findById(reviewId);
    if (!getReview) throw "Review not be found";

    //check if user is owner of review OR admin
    if (
      getReview.user.toString() !== req.user._id &&
      req.user.role !== "admin"
    ) {
      res.status(403).json({
        status: "Failed",
        message: "You are Not Authorized to delete this review",
      });
      return;
    }

    const deletedReview = await reviewsModel.findByIdAndDelete(reviewId);

    const reviewedProduct = await productsModel.findById(getReview.product);

    reviewedProduct.reviews.pull(getReview._id);
    await reviewedProduct.save();

    res.status(200).json({
      status: "deleted review successfully",
      deletedReview,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = deleteReview;
