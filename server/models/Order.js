const mongoose = require("mongoose");
const { Schema } = mongoose;
const { DateTime } = require("luxon");

const orderSchema = new Schema({
  purchaseDate: {
    type: String,
    default: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  stripeSessionId: {
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
