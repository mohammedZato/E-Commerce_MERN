const mongoose = require("mongoose");

const addProduct = (req, res) => {
  res.status(200).json({
    status: "add product",
  });
};

module.exports = addProduct;
