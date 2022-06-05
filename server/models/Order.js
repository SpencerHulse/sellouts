const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
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
      default: "pending",
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
  },
  {
    toJSON: { virtual: true },
  }
);

orderSchema.virtual("calculatedTotal").get(function () {
  let sum = 0;
  this.products.forEach((product) => (sum = sum + product.price));
  return total;
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
