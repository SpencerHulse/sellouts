const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  items: [{ type: String }],
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  stripeId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  shippingType: {
    type: String,
    required: true,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
  },
  total: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
