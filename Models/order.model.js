const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    paymentInfo: {
      payment_id: {
        type: String, // Stripe or Paypal transaction ID
      },
      payment_status: {
        type: String, // paid failed refunded
      },
    },
    items_price: {
      // total price of items only
      type: String,
      required: true,
    },
    shipping_price: {
      type: String,
      required: true,
    },
    total_price: {
      type: String,
      required: true,
    },
    order_status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const ordersModel = mongoose.model("orders", ordersSchema);

module.exports = ordersModel;
