const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseData: {
    type: Date,
    default: Date.now,
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
    default: "Pending",
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  calculatedTotal: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
