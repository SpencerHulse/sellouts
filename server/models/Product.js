const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 500,
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
  if (!this.promotion) return this.price;
  // Process to ensure not round to whole dollar amounts after promotion
  let promotionPrice = this.price * ((100 - this.promotion.percentage) / 100);
  promotionPrice = promotionPrice * 100;
  return Math.trunc(promotionPrice) / 100;
});

productSchema.virtual("rating").get(function () {
  let averageRating = 0;
  // Sums all the ratings for the product
  this.reviews.forEach((review) => {
    averageRating = averageRating + review.rating;
  });
  // Divides the summed ratings by the number of ratings
  averageRating = averageRating / this.reviews?.length;
  // If there is no average (no ratings), return 0
  if (!averageRating) {
    return 0;
  }
  // Returns the average with a fixed two-decimal value
  return averageRating.toFixed(2);
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
