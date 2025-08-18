const mongoose = require("mongoose");

const cartsSchema = new mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
});

const cartsModel = mongoose.model("carts", cartsSchema);

module.exports = cartsModel;
