const mongoose = require("mongoose");
const { Schema } = mongoose;
const { DateTime } = require("luxon");

const reviewSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  review: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  createdAt: {
    type: String,
    default: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
