const mongoose = require("mongoose");
const { Schema } = mongoose;

const promotionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  ends: {
    type: String,
    required: true,
  },
  // Set up for potential memberships
  membersOnly: {
    type: Boolean,
    default: false,
  },
});

const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
