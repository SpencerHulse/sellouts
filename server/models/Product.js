const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
    required: true,
  },
  details: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  inventory: {
    type: Number,
    min: 0,
    default: 0,
  },
  images: [
    {
      type: String,
    },
  ],
  mainImage: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  // Reviews - Array - ref another model
  // Stars - Maybe a virtual?
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
