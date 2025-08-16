const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, "Enter a review"],
      trim: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const reviewsModel = mongoose.model("reviews", reviewsSchema);

module.exports = reviewsModel;
