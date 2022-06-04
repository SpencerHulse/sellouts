const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
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
    promotion: {
      type: Schema.Types.ObjectId,
      ref: "Promotion",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    toJSON: { virtual: true },
  }
);

productSchema.virtual("promotionPrice").get(function () {
  return this.price * (this.promotion.percentage / 100);
});

productSchema.virtual("rating").get(function () {
  let averageRating = 0;
  // Sums all the ratings for the product
  this.reviews.forEach((review) => {
    averageRating = averageRating + review.rating;
  });
  // Divides the summed ratings by the number of ratings
  averageRating = averageRating / this.review.length;
  // Returns the average with a fixed two-decimal value
  return averageRating.toFixed(2);
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
